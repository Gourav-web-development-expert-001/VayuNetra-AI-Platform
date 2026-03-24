import numpy as np
import tensorflow as tf
import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import MODEL_PATHS

def train():
    X = np.array([[100],[120],[140],[160],[180]])
    y = np.array([120,140,160,180,200])

    model = tf.keras.Sequential([
        tf.keras.layers.Dense(16, activation='relu'),
        tf.keras.layers.Dense(1)
    ])

    model.compile(optimizer='adam', loss='mse')
    model.fit(X, y, epochs=200, verbose=0)

    os.makedirs(os.path.dirname(MODEL_PATHS["tf"]), exist_ok=True)
    model.save(MODEL_PATHS["tf"])
    print("TensorFlow model trained")

if __name__ == "__main__":
    train()
