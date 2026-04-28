import json
import os

from app.services.ollama_service import ask_ollama
from app.services.prompts import scheme_prompt
from app.services.filter_service import filter_schemes

SCHEME_PATH = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "../../../data/schemes/processed_schemes.json")
)


def load_schemes():
    with open(SCHEME_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def safe_json(response):
    try:
        return json.loads(response)
    except:
        return {"raw": response}


def get_scheme(user_data):
    schemes = load_schemes()

    # 🔥 KEY CHANGE: filter before LLM
    filtered_schemes = filter_schemes(schemes, user_data)

    prompt = scheme_prompt(user_data, filtered_schemes)

    response = ask_ollama(prompt)

    return safe_json(response)