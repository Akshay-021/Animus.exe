from fastapi import APIRouter, UploadFile, File, Form
import tempfile

from app.services.crop_service import analyze_crop

router = APIRouter(prefix="/crop", tags=["crop"])


@router.post("/")
async def crop(
    file: UploadFile = File(...),

    # MUST inputs
    crop_type: str = Form(...),
    location: str = Form(...),
    crop_stage: str = Form(...),

    # HIGH VALUE inputs
    symptoms: str = Form(None),
    fertilizer_usage: str = Form(None),
    pesticide_usage: str = Form(None),

    # OPTIONAL
    previous_crop: str = Form(None),
    irrigation_type: str = Form(None)
):
    with tempfile.NamedTemporaryFile(delete=False) as temp:
        temp.write(await file.read())
        image_path = temp.name

    user_data = {
        "crop_type": crop_type,
        "location": location,
        "crop_stage": crop_stage,
        "symptoms": symptoms,
        "fertilizer_usage": fertilizer_usage,
        "pesticide_usage": pesticide_usage,
        "previous_crop": previous_crop,
        "irrigation_type": irrigation_type
    }

    return analyze_crop(image_path, user_data)