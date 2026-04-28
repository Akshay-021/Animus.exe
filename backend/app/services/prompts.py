# backend/app/services/prompts.py

def scheme_prompt(user_data, schemes):
    return f"""
You are an expert in Indian agricultural schemes.

Farmer Details:
{user_data}

Available Schemes:
{schemes}

Tasks:
1. Select best 1–2 schemes
2. Explain why they match
3. Explain benefits simply
4. Give steps to apply

Return ONLY valid JSON in this format:
{{
  "schemes": [
    {{
      "name": "",
      "reason": "",
      "benefits": "",
      "steps": ""
    }}
  ]
}}

Rules:
- Use simple language
- Be specific
- Do NOT include any explanation outside JSON
"""


def crop_prompt(prediction, confidence, user_data):
    return f"""
You are an agricultural expert.

Model Prediction:
Disease: {prediction}
Confidence: {confidence}

Farmer Inputs:
{user_data}

Tasks:
1. Confirm or question prediction
2. Explain disease simply
3. Suggest treatment
4. Suggest prevention

Return ONLY valid JSON in this format:
{{
  "disease": "",
  "confidence": "",
  "explanation": "",
  "treatment": [],
  "prevention": []
}}

Rules:
- Use simple language
- Actionable advice
- Do NOT include any explanation outside JSON
"""


def soil_prompt(user_data, image_features):
    return f"""
You are a soil expert.

Farmer Data:
{user_data}

Image Analysis:
{image_features}

Tasks:
1. Soil health score (0–10)
2. Problems
3. Causes
4. Improvements
5. Fertilizer advice
6. Action steps

Return ONLY valid JSON in this format:
{{
  "soil_score": "",
  "problems": [],
  "causes": [],
  "improvements": [],
  "fertilizer_advice": [],
  "actions": []
}}

Rules:
- Use simple farmer-friendly language
- Be practical and specific
- Do NOT include any explanation outside JSON
"""