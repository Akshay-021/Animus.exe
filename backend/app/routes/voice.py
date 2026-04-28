from fastapi import APIRouter, UploadFile, File
import tempfile
import whisper
import subprocess
import os
import whisper.audio as audio

router = APIRouter(prefix="/voice", tags=["voice"])

# load whisper model once
model = whisper.load_model("base")

# ffmpeg full path (your system)
FFMPEG_PATH = r"C:\Users\joshi\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1-full_build\bin\ffmpeg.exe"


@router.post("/")
async def speech_to_text(file: UploadFile = File(...)):
    input_path = None
    output_path = None

    try:
        print("📁 Saving file...")

        # Save uploaded file (force correct extension for ffmpeg)
        with tempfile.NamedTemporaryFile(delete=False, suffix=".aac") as temp:
            temp.write(await file.read())
            input_path = temp.name

        print("🔄 Converting with ffmpeg...")

        output_path = input_path + ".wav"

        ffmpeg_result = subprocess.run(
            [
                FFMPEG_PATH,
                "-y",
                "-i", input_path,
                output_path
            ],
            capture_output=True,
            text=True,
            timeout=15
        )

        if ffmpeg_result.returncode != 0:
            return {
                "error": "ffmpeg failed",
                "details": ffmpeg_result.stderr
            }

        print("🧠 Running whisper...")

        # 🔥 IMPORTANT: bypass whisper internal ffmpeg
        audio_data = audio.load_audio(output_path)
        audio_data = audio.pad_or_trim(audio_data)

        result = model.transcribe(audio_data)

        print("✅ Done")

        return {"text": result["text"]}

    except subprocess.TimeoutExpired:
        return {"error": "ffmpeg timeout (likely format issue)"}

    except Exception as e:
        return {"error": str(e)}

    finally:
        # cleanup temp files
        if input_path and os.path.exists(input_path):
            os.remove(input_path)
        if output_path and os.path.exists(output_path):
            os.remove(output_path)