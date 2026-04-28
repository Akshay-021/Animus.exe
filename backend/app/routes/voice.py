from fastapi import APIRouter

router = APIRouter(prefix="/voice", tags=["voice"])


@router.post("/")
def voice():
    return {"message": "Voice placeholder"}