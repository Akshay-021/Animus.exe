# app/services/intent_service.py

from app.services.ollama_service import ask_ollama
from app.services.prompts import intent_prompt
import json


def safe_json(response):
    try:
        return json.loads(response)
    except:
        return {"intent": "scheme"}  # fallback


def classify_intent(text):
    prompt = intent_prompt(text)

    response = ask_ollama(prompt)

    result = safe_json(response)

    return result.get("intent", "scheme")