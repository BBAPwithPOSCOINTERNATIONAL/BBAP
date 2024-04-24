from fastapi import FastAPI, File, UploadFile, Form
from face import train, predict

app = FastAPI()

@app.post("/train/")
async def train_model(file: UploadFile = File(...), empId: str = Form(...)):

    return {"message": await train(file, empId)}

@app.post("/predict/")
async def predict_image(file: UploadFile = File(...)):
    
    return {"predictions": await predict(file)}