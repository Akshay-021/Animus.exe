from fastapi import APIRouter

router = APIRouter(prefix="/crop", tags=["crop"])


@router.post("/")
def crop():
    return {"message": "Crop feature coming soon"}