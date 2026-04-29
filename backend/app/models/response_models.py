from pydantic import BaseModel
from typing import List


class Scheme(BaseModel):
    name: str
    reason: str
    benefits: str
    steps: str


class SchemeResponse(BaseModel):
    schemes: List[Scheme]
