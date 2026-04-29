from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import scheme, crop, soil, translate, voice, assistant

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# include ALL routers
app.include_router(scheme.router)
app.include_router(crop.router)
app.include_router(soil.router)
app.include_router(translate.router)
app.include_router(voice.router)
app.include_router(assistant.router)  # 👈 THIS MUST BE HERE
