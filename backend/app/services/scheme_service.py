import json
from app.core.config import SCHEME_PATH
from app.services.ollama_service import ask_ollama
from app.services.prompts import scheme_prompt
from app.utils.helpers import safe_json_load


def load_schemes():
    with open(SCHEME_PATH, "r",encoding="utf-8") as f:
        return json.load(f)


def filter_schemes(schemes, location):
    return [
        s for s in schemes
        if s["state"] == "All" or s["state"] == location
    ]


def get_scheme(user_data):   # ✅ FIXED SIGNATURE
    print("SCHEME PATH :", SCHEME_PATH)
    schemes = load_schemes()

    location = user_data.get("location", "")
    schemes = filter_schemes(schemes, location)

    schemes = schemes[:15]  # limit for LLM

    prompt = scheme_prompt(user_data, schemes)
    response = ask_ollama(prompt)

    return safe_json_load(response)