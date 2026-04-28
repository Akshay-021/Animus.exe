from fastapi import APIRouter, UploadFile, File
import tempfile
import subprocess
import os

from app.services.assistant_service import extract_farmer_data
from app.services.intent_service import classify_intent
from app.services.scheme_service import get_scheme
from app.services.crop_service import analyze_crop
from app.services.soil_service import analyze_soil
from app.services.translation_service import to_kannada

router = APIRouter(prefix="/assistant", tags=["assistant"])

WHISPER_MODEL = "base"


@router.post("/voice")
async def voice_assistant(file: UploadFile = File(...)):
    input_path = None
    output_txt = None

    try:
        print("📁 Saving audio...")

        with tempfile.NamedTemporaryFile(delete=False, suffix=".aac") as temp:
            temp.write(await file.read())
            input_path = temp.name

        print("🧠 Whisper (translate)...")

        subprocess.run(
            [
                "whisper",
                input_path,
                "--model", WHISPER_MODEL,
                "--task", "translate",
                "--output_format", "txt"
            ],
            check=True
        )

        base_name = os.path.splitext(input_path)[0]
        output_txt = base_name + ".txt"

        if not os.path.exists(output_txt):
            return {"error": "transcription failed"}

        with open(output_txt, "r", encoding="utf-8") as f:
            text = f.read().strip()

        print("📝 Transcription:", text)

        # 🧠 STEP 1: INTENT
        intent = classify_intent(text)
        print("🎯 Intent:", intent)

        # 🔀 STEP 2: ROUTING

        # 🌾 SCHEME
        if intent == "scheme":
            user_data = extract_farmer_data(text)
            result = get_scheme(user_data)

        # 🌿 CROP
        elif intent == "crop":
            return {
                "intent": "crop",
                "message": "Use crop upload endpoint for images"
            }

        # 🌱 SOIL
        elif intent == "soil":
            return {
                "intent": "soil",
                "message": "Use soil form endpoint"
            }

        else:
            return {"error": "Could not classify intent"}

        # 🌐 TRANSLATION
        translated = to_kannada(str(result))

        return {
            "intent": intent,
            "transcription": text,
            "result": result,
            "translated": translated
        }

    except Exception as e:
        return {"error": str(e)}

    finally:
        if input_path and os.path.exists(input_path):
            os.remove(input_path)
        if output_txt and os.path.exists(output_txt):
            os.remove(output_txt)