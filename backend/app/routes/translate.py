from fastapi import APIRouter

router = APIRouter(prefix="/translate", tags=["translate"])


@router.post("/")
def translate():
    return {"message": "Translation placeholder"}