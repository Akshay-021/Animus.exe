from app.services.ollama_service import ask_ollama
import json

def extract_farmer_data(text):
    prompt = f"""
You are an assistant that extracts structured farmer data.

Input:
{text}

Extract:
- location
- land_size
- crop
- income_level
- need

Return JSON:
{{
  "location": "",
  "land_size": "",
  "crop": "",
  "income_level": "",
  "need": ""
}}
"""

    response = ask_ollama(prompt)

    try:
        return json.loads(response)
    except:
        return {"query": text}