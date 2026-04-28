from fastapi import APIRouter

router = APIRouter(prefix="/soil", tags=["soil"])


@router.post("/")
def soil():
    return {"message": "Soil feature coming soon"}