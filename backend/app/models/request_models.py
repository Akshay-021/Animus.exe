from pydantic import BaseModel
from typing import Optional


class SchemeRequest(BaseModel):
    location: str
    income: str
    land: str
    gender: str
    need: str


class SoilRequest(BaseModel):
    location: str
    current_crop: str
    previous_crop: str
    fertilizer_usage: str
    irrigation_type: str
    soil_type: str
    organic_matter: str
    fertilizer_frequency: str
    years_of_monocropping: Optional[int] = None
    pesticide_usage_level: Optional[str] = None
    yield_trend: Optional[str] = None
