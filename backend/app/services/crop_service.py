from app.services.ollama_service import ask_ollama
from app.services.prompts import crop_prompt
from app.utils.helpers import safe_json_load


def analyze_crop(prediction, confidence, user_data):
    prompt = crop_prompt(prediction, confidence, user_data)
    response = ask_ollama(prompt)

    return safe_json_load(response)