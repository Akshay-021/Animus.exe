from prompts import soil_prompt
from utils.ollama_client import call_ollama
import json

def analyze_soil(data):
    prompt = soil_prompt(data)
    response = call_ollama(prompt)
    return json.loads(response)