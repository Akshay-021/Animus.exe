from app.services.ollama_service import ask_ollama
from app.services.prompts import soil_prompt
from app.utils.helpers import safe_json_load


def analyze_soil(user_data, image_features):
    prompt = soil_prompt(user_data, image_features)
    response = ask_ollama(prompt)

    return safe_json_load(response)