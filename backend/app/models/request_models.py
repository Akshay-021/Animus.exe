from pydantic import BaseModel
class SchemeRequest(BaseModel):
    location: str
    income: str
    land: str
    gender: str
    need: str