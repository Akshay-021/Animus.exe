from app.services.ollama_service import ask_ollama
from app.services.prompts import farmer_extraction_prompt
import json


def safe_json(response):
    try:
        return json.loads(response)
    except:
        return {"raw": response}


def extract_farmer_data(text):
    prompt = farmer_extraction_prompt(text)

    response = ask_ollama(prompt)

    return safe_json(response)