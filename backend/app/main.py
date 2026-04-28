from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import scheme, crop, soil, translate, voice

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(scheme.router)
app.include_router(crop.router)
app.include_router(soil.router)
app.include_router(translate.router)
app.include_router(voice.router)