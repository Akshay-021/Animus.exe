from fastapi import APIRouter, Query
from ..services.soil_service import analyze_soil

router = APIRouter(prefix="/soil", tags=["soil"])


@router.post("/")
def soil(
    location: str = Query(...),
    current_crop: str = Query(...),
    previous_crop: str = Query(...),
    fertilizer_usage: str = Query(...),
    irrigation_type: str = Query(...),
    soil_type: str = Query(...),
    organic_matter: str = Query(...),
    fertilizer_frequency: str = Query(...),
    years_of_monocropping: int | None = Query(None),
    pesticide_usage_level: str | None = Query(None),
    yield_trend: str | None = Query(None),
    use_llm: bool = Query(True)
):
    data = {
        "location": location,
        "current_crop": current_crop,
        "previous_crop": previous_crop,
        "fertilizer_usage": fertilizer_usage,
        "irrigation_type": irrigation_type,
        "soil_type": soil_type,
        "organic_matter": organic_matter,
        "fertilizer_frequency": fertilizer_frequency,
        "years_of_monocropping": years_of_monocropping,
        "pesticide_usage_level": pesticide_usage_level,
        "yield_trend": yield_trend
    }

    return analyze_soil(data, use_llm=use_llm)
