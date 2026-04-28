from fastapi import APIRouter
from app.models.request_models import SchemeRequest
from app.services.scheme_service import get_scheme

router = APIRouter(prefix="/scheme", tags=["scheme"])


@router.post("/")
def recommend_scheme(request: SchemeRequest):
    return get_scheme(request.dict())