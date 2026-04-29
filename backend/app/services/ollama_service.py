import requests

OLLAMA_URL = "http://localhost:11434/api/generate"


def ask_ollama(prompt, model="llama3", num_predict=220):
    response = requests.post(
        OLLAMA_URL,
        json={
            "model": model,
            "prompt": prompt,
            "stream": False,
            "keep_alive": "10m",
            "options": {
                "temperature": 0.2,
                "num_predict": num_predict
            }
        },
        timeout=120
    )
    response.raise_for_status()
    return response.json()["response"]
