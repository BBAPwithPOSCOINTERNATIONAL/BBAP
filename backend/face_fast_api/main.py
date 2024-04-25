from fastapi import FastAPI, APIRouter, File, UploadFile, Form
from face import train, predict

app = FastAPI(swagger_ui=True)

# APIRouter를 사용하여 /api/v1/ 아래에 들어갈 경로를 묶음
router = APIRouter(prefix="/api/v1", tags=["api"])

@router.post("/train",tags=["api"])
async def train_model(faceImage: UploadFile = File(...), empId: int = Form(...)):
 
    return {"message": await train(faceImage, empId)}

@router.post("/predict",tags=["api"])
async def predict_image(faceImage: UploadFile = File(...)):
    
    return {"message":"Success.","data" : {"empId":int(await predict(faceImage))}}

# 앱에 라우터 추가
app.include_router(router)