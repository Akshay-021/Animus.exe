import re
import json

def extract_json(response: str) -> str:
    response = response.strip()
    response = re.sub(r"```json|```", "", response)

    match = re.search(r"\{.*\}", response, re.DOTALL)
    return match.group(0) if match else response


def safe_json_load(response: str):
    try:
        clean = extract_json(response)
        return json.loads(clean)
    except:
        return {
            "success": False,
            "error": "Invalid JSON from LLM",
            "raw": response
        }