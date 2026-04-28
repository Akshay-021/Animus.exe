from app.services.ollama_service import ask_ollama


def translate_text(text, target_language="English"):
    """
    Generic translation function.
    Uses LLM (Ollama) to translate text.
    """

    prompt = f"""
You are a translation assistant.

Translate the following text into {target_language}.
- Keep it simple and natural.
- Make it easy for farmers to understand.
- Do NOT add extra explanation.

Text:
{text}

Return ONLY the translated text.
"""

    response = ask_ollama(prompt)

    return response.strip()


# 🔁 Convenience wrappers (use these directly)

def to_english(text):
    return translate_text(text, "English")


def to_hindi(text):
    return translate_text(text, "Hindi")


def to_kannada(text):
    return translate_text(text, "Kannada")


def to_tamil(text):
    return translate_text(text, "Tamil")


def to_telugu(text):
    return translate_text(text, "Telugu")


def to_marathi(text):
    return translate_text(text, "Marathi")