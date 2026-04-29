import tensorflow as tf
import numpy as np
from PIL import Image
from pathlib import Path
import json

MODEL_PATH = Path(__file__).resolve().parents[2] / "models" / "crop_model.keras"
CLASS_NAMES_PATH = Path(__file__).resolve().parents[2] / "models" / "crop_class_names.json"

model = None

DEFAULT_CLASS_NAMES = [
    "Healthy",
    "Leaf Blight",
    "Powdery Mildew",
    "Rust"
]


def load_class_names():
    if not CLASS_NAMES_PATH.exists():
        return DEFAULT_CLASS_NAMES

    with open(CLASS_NAMES_PATH, "r", encoding="utf-8") as f:
        class_names = json.load(f)

    if not isinstance(class_names, list) or not all(isinstance(name, str) for name in class_names):
        raise ValueError("crop_class_names.json must contain a JSON list of class-name strings")

    return class_names


CLASS_NAMES = load_class_names()


def preprocess(image):
    image = image.resize((224, 224))
    image = np.array(image) / 255.0
    return np.expand_dims(image, axis=0)


def predict_image(image_path):
    global model

    if model is None:
        model = tf.keras.models.load_model(MODEL_PATH)

    image = Image.open(image_path).convert("RGB")
    image = preprocess(image)

    preds = model.predict(image)[0]

    predicted_index = int(np.argmax(preds))
    confidence = float(preds[predicted_index])
    output_classes = int(len(preds))
    is_label_configured = predicted_index < len(CLASS_NAMES)
    prediction = CLASS_NAMES[predicted_index] if is_label_configured else f"class_{predicted_index}"

    top_indices = np.argsort(preds)[-5:][::-1]
    top_predictions = []
    for index in top_indices:
        index = int(index)
        top_predictions.append({
            "index": index,
            "label": CLASS_NAMES[index] if index < len(CLASS_NAMES) else f"class_{index}",
            "confidence": round(float(preds[index]), 3)
        })

    return {
        "prediction": prediction,
        "confidence": round(confidence, 3),
        "predicted_index": predicted_index,
        "output_classes": output_classes,
        "configured_labels": len(CLASS_NAMES),
        "label_configured": is_label_configured,
        "top_predictions": top_predictions
    }
