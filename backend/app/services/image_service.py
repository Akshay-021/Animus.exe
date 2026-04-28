import tensorflow as tf
import numpy as np
from PIL import Image

MODEL_PATH = "backend/models/crop_model.keras"

model = tf.keras.models.load_model(MODEL_PATH)

CLASS_NAMES = [
    "Healthy",
    "Leaf Blight",
    "Powdery Mildew",
    "Rust"
]


def preprocess(image):
    image = image.resize((224, 224))
    image = np.array(image) / 255.0
    return np.expand_dims(image, axis=0)


def predict_image(image_path):
    image = Image.open(image_path).convert("RGB")
    image = preprocess(image)

    preds = model.predict(image)[0]

    predicted_index = np.argmax(preds)
    confidence = float(preds[predicted_index])

    return {
        "prediction": CLASS_NAMES[predicted_index],
        "confidence": round(confidence, 3)
    }