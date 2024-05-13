from fastapi import HTTPException
import numpy as np
from PIL import Image
from io import BytesIO
import face_recognition
from sklearn import neighbors
import pickle
import os

MODEL_PATH = 'clf/trained_knn_model.clf'

# 모델이 이미 존재하는지 확인하고 로드하거나 새로운 모델을 생성
if os.path.exists(MODEL_PATH):
    with open(MODEL_PATH, 'rb') as f:
        knn_clf = pickle.load(f)
else:
    knn_clf = neighbors.KNeighborsClassifier(n_neighbors=2, algorithm='ball_tree', weights='distance')

async def train(file, empId):
    # 메모리에서 이미지 처리
    contents = await file.read()
    image_stream = BytesIO(contents)
    image = Image.open(image_stream).convert('RGB')
    image_array = np.array(image)

    face_locations = face_recognition.face_locations(image_array)
    if len(face_locations) != 1:
        raise HTTPException(status_code=422, detail="인식된 얼굴이 없거나 2명 이상입니다.")

    face_encoding = face_recognition.face_encodings(image_array, known_face_locations=face_locations)[0]

    if hasattr(knn_clf, "_fit_X"):
       X_combined = np.concatenate([knn_clf._fit_X, [face_encoding]])
       y_combined = np.concatenate([knn_clf.classes_[knn_clf._y], [empId]])
    else:
        X_combined = np.array([face_encoding])
        y_combined = np.array([empId])

    knn_clf.fit(X_combined, y_combined)
    with open(MODEL_PATH, 'wb') as f:
        pickle.dump(knn_clf, f)
    
    return "Success"

async def predict(file):
    # 메모리에서 이미지 처리
    contents = await file.read()
    image_stream = BytesIO(contents)
    image = Image.open(image_stream).convert('RGB')
    image_array = np.array(image)

    face_locations = face_recognition.face_locations(image_array)
    if len(face_locations) != 1:
        raise HTTPException(status_code=422, detail="인식된 얼굴이 없거나 2명 이상입니다.")

    faces_encodings = face_recognition.face_encodings(image_array, known_face_locations=face_locations)
    closest_distances = knn_clf.kneighbors(faces_encodings, n_neighbors=1)
    print("유사도 거리 :",closest_distances[0][0][0])
    are_matches = [closest_distances[0][i][0] <= 0.32 for i in range(len(face_locations))]
    predictions=[(pred, loc) if rec else (-1, loc) for pred, loc, rec in zip(knn_clf.predict(faces_encodings), face_locations, are_matches)]

    return predictions[0][0]
