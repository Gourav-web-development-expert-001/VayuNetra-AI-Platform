import joblib
import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import MODEL_PATHS

try:
    model = joblib.load(MODEL_PATHS["rf"])
except:
    model = None

def predict_aqi(values):
    if model is None:
        raise Exception("Model not loaded")

    if len(values) != 6:
        raise ValueError("Invalid input length")

    try:
        prediction = model.predict([values])[0]
        return float(prediction)
    except Exception as e:
        raise Exception(f"Prediction error: {e}")
