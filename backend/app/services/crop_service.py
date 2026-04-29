from .image_service import predict_image
from .ollama_service import ask_ollama
from .prompts import crop_prompt
import json
import time


def safe_json(res):
    try:
        return json.loads(res)
    except json.JSONDecodeError:
        start = res.find("{")
        end = res.rfind("}")

        if start != -1 and end != -1 and start < end:
            try:
                return json.loads(res[start:end + 1])
            except json.JSONDecodeError:
                pass

        return {"raw": res}


def analyze_crop(image_path, user_data, use_llm=True):
    started_at = time.perf_counter()

    # 🔥 Step 1: CNN prediction
    cnn_started_at = time.perf_counter()
    prediction = predict_image(image_path)
    cnn_seconds = round(time.perf_counter() - cnn_started_at, 3)
    model_prediction = prediction["prediction"]

    result = {
        "cnn_prediction": prediction,
        "timings": {
            "cnn_seconds": cnn_seconds
        }
    }

    if not use_llm:
        result["llm_analysis"] = None
        result["timings"]["total_seconds"] = round(time.perf_counter() - started_at, 3)
        return result

    if not prediction["label_configured"]:
        model_prediction = (
            f"Unmapped model class index {prediction['predicted_index']} "
            f"out of {prediction['output_classes']} classes"
        )

    # 🔥 Step 2: LLM reasoning with context
    prompt = crop_prompt(
        model_prediction,
        prediction["confidence"],
        user_data
    )

    llm_started_at = time.perf_counter()
    response = ask_ollama(prompt, num_predict=240)
    result["timings"]["llm_seconds"] = round(time.perf_counter() - llm_started_at, 3)

    result["llm_analysis"] = safe_json(response)
    result["timings"]["total_seconds"] = round(time.perf_counter() - started_at, 3)

    return result
