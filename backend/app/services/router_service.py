# app/services/router_service.py

from .intent_service import classify_intent
from .assistant_service import extract_farmer_data
from .scheme_service import get_scheme
from .crop_service import analyze_crop
from .soil_service import analyze_soil


def route_query(text, extra_inputs=None):
    """
    text: user voice/text input
    extra_inputs: dict (image, crop inputs, soil inputs)
    """

    intent = classify_intent(text)

    # 🧠 SCHEME FLOW
    if intent == "scheme":
        farmer_data = extract_farmer_data(text)
        result = get_scheme(farmer_data)

        return {
            "intent": "scheme",
            "data": result
        }

    # 🌿 CROP FLOW
    elif intent == "crop":
        if not extra_inputs:
            return {"error": "Crop inputs required"}

        result = analyze_crop(
            image=extra_inputs.get("image"),
            user_data=extra_inputs.get("data")
        )

        return {
            "intent": "crop",
            "data": result
        }

    # 🌱 SOIL FLOW
    elif intent == "soil":
        if not extra_inputs:
            return {"error": "Soil inputs required"}

        result = analyze_soil(extra_inputs.get("data"))

        return {
            "intent": "soil",
            "data": result
        }

    # fallback
    return {
        "intent": "unknown",
        "data": "Could not classify"
    }
