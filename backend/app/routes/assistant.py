from fastapi import APIRouter, UploadFile, File
import tempfile
import subprocess
import os

from app.services.scheme_service import get_scheme
from app.services.assistant_service import extract_farmer_data

router = APIRouter(prefix="/assistant", tags=["assistant"])

WHISPER_MODEL = "base"


@router.post("/voice-scheme")
async def voice_scheme(file: UploadFile = File(...)):
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

        # 🔥 Extract structured data
        user_data = extract_farmer_data(text)

        print("🧠 Extracted:", user_data)

        # 🔥 Get schemes
        result = get_scheme(user_data)

        return {
            "transcription": text,
            "structured_data": user_data,
            "result": result
        }

    except Exception as e:
        return {"error": str(e)}

    finally:
        if input_path and os.path.exists(input_path):
            os.remove(input_path)
        if output_txt and os.path.exists(output_txt):
            os.remove(output_txt)