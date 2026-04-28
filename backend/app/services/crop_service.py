from app.services.image_service import predict_image
from app.services.ollama_service import ask_ollama
from app.services.prompts import crop_prompt
import json


def safe_json(res):
    try:
        return json.loads(res)
    except:
        return {"raw": res}


def analyze_crop(image_path, user_data):
    # 🔥 Step 1: CNN prediction
    prediction = predict_image(image_path)

    # 🔥 Step 2: LLM reasoning with context
    prompt = crop_prompt(
        prediction["prediction"],
        prediction["confidence"],
        user_data
    )

    response = ask_ollama(prompt)

    return {
        "cnn_prediction": prediction,
        "llm_analysis": safe_json(response)
    }