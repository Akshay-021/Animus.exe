from .prompts import soil_prompt
from .ollama_service import ask_ollama
import json
import time


def safe_json(response):
    try:
        return json.loads(response)
    except json.JSONDecodeError:
        start = response.find("{")
        end = response.rfind("}")

        if start != -1 and end != -1 and start < end:
            try:
                return json.loads(response[start:end + 1])
            except json.JSONDecodeError:
                pass

        return {"raw": response}


def normalize(value):
    return str(value or "").strip().lower()


def quick_soil_analysis(data):
    score = 75
    problems = []
    causes = []
    fertilizer_advice = []
    improvement_steps = []
    precautions = ["Confirm with a soil test before making major fertilizer changes"]

    organic_matter = normalize(data.get("organic_matter"))
    fertilizer_frequency = normalize(data.get("fertilizer_frequency"))
    irrigation_type = normalize(data.get("irrigation_type"))
    soil_type = normalize(data.get("soil_type"))
    pesticide_usage_level = normalize(data.get("pesticide_usage_level"))
    yield_trend = normalize(data.get("yield_trend"))
    current_crop = data.get("current_crop")
    previous_crop = data.get("previous_crop")
    years_of_monocropping = data.get("years_of_monocropping") or 0

    if organic_matter == "low":
        score -= 20
        problems.append("Low organic matter")
        causes.append("Crop residue removal, low compost/FYM use, or repeated chemical fertilizer use")
        improvement_steps.append("Add FYM, compost, green manure, or crop residue after harvest")
    elif organic_matter == "medium":
        score -= 8
        improvement_steps.append("Maintain organic matter with compost and crop residue")

    if years_of_monocropping >= 3:
        score -= 12
        problems.append("Repeated cropping may be reducing soil fertility")
        causes.append("Same crop grown for multiple years without enough rotation")
        improvement_steps.append("Rotate with legumes or a different crop next season")

    if current_crop and previous_crop and normalize(current_crop) == normalize(previous_crop):
        score -= 8
        problems.append("No crop rotation")
        causes.append("Current and previous crop are the same")
        improvement_steps.append("Use crop rotation to break pest cycles and improve nutrient balance")

    if "daily" in fertilizer_frequency or "weekly" in fertilizer_frequency or "often" in fertilizer_frequency:
        score -= 10
        problems.append("Possible overuse of fertilizers")
        causes.append("Fertilizer is being applied very frequently")
        fertilizer_advice.append("Avoid applying urea/DAP too frequently without soil test guidance")
    else:
        fertilizer_advice.append("Use split application and adjust dose after soil testing")

    if pesticide_usage_level == "high":
        score -= 8
        problems.append("High pesticide pressure")
        causes.append("Heavy pesticide use may disturb beneficial soil organisms")
        precautions.append("Use integrated pest management and avoid unnecessary sprays")

    if yield_trend == "decreasing":
        score -= 12
        problems.append("Yield is decreasing")
        causes.append("Possible nutrient imbalance, organic matter decline, pest pressure, or water stress")
        improvement_steps.append("Check soil nutrients, irrigation schedule, and pest history")

    if irrigation_type == "borewell":
        score -= 5
        precautions.append("Check borewell water quality/salinity if crop growth is weak")
    elif irrigation_type == "rainfed":
        improvement_steps.append("Use mulching and moisture conservation practices")

    if soil_type in {"sandy", "red"}:
        improvement_steps.append("Increase organic matter to improve water and nutrient holding capacity")
    elif soil_type == "black":
        precautions.append("Avoid over-irrigation in black soil because drainage can be slow")

    score = max(0, min(100, score))

    if score >= 70:
        condition = "good"
    elif score >= 45:
        condition = "moderate"
    else:
        condition = "poor"

    if not problems:
        problems.append("No major issue detected from the provided farmer inputs")

    if not improvement_steps:
        improvement_steps.append("Maintain balanced fertilizer use, crop rotation, and organic matter")

    return {
        "soil_health_score": score,
        "soil_condition": condition,
        "problems": problems,
        "causes": causes or ["Insufficient evidence for a specific cause without lab testing"],
        "crop_suitability": f"Likely suitable for {current_crop}, but confirm with soil test results",
        "recommended_crops": ["legumes for rotation", current_crop],
        "fertilizer_advice": fertilizer_advice,
        "improvement_steps": improvement_steps,
        "precautions": precautions
    }


def analyze_soil(data, use_llm=True):
    started_at = time.perf_counter()

    if not use_llm:
        return {
            "soil_analysis": quick_soil_analysis(data),
            "input_data": data,
            "mode": "quick",
            "timings": {
                "total_seconds": round(time.perf_counter() - started_at, 3)
            }
        }

    prompt = soil_prompt(data)
    llm_started_at = time.perf_counter()
    response = ask_ollama(prompt, num_predict=240)

    return {
        "soil_analysis": safe_json(response),
        "input_data": data,
        "mode": "llm",
        "timings": {
            "llm_seconds": round(time.perf_counter() - llm_started_at, 3),
            "total_seconds": round(time.perf_counter() - started_at, 3)
        }
    }
