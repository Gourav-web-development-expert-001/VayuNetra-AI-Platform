import tensorflow as tf
import numpy as np
import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import MODEL_PATHS

try:
    model = tf.keras.models.load_model(MODEL_PATHS["tf"])
except:
    model = None

def forecast(aqi):
    if model is None:
        # Fallback if no model
        # return a flatline
        return [aqi] * 7

    predictions = []
    current = aqi

    try:
        for _ in range(7):
            next_val = model.predict(np.array([[current]]), verbose=0)[0][0]
            predictions.append(float(next_val))
            current = next_val

        return predictions

    except Exception as e:
        print(f"Forecast error: {e}")
        return [aqi] * 7
