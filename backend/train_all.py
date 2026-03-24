import os
import sys
import pandas as pd
import numpy as np

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from config import DATA_PATH

def generate_mock_data():
    os.makedirs(os.path.dirname(DATA_PATH), exist_ok=True)
    np.random.seed(42)
    data = {
        'PM2.5': np.random.randint(50, 250, 100),
        'PM10': np.random.randint(80, 300, 100),
        'temperature': np.random.randint(15, 45, 100),
        'humidity': np.random.randint(20, 90, 100),
        'wind_speed': np.random.randint(0, 20, 100),
        'traffic': np.random.randint(20, 100, 100),
    }
    
    df = pd.DataFrame(data)
    df['AQI'] = (df['PM2.5'] * 0.8) + (df['PM10'] * 0.2) + (df['traffic'] * 0.5)
    
    df.to_csv(DATA_PATH, index=False)
    print(f"Generated realistic training data at {DATA_PATH}")

if __name__ == "__main__":
    print("Setting up VayuNetra Backend Architecture...")
    generate_mock_data()
    
    print("\n--- Training Sklearn RF Model ---")
    try:
        from models.train_sklearn import train as train_rf
        train_rf()
    except Exception as e:
        print("Failed to train Sklearn:", e)
        
    print("\n--- Training TensorFlow Sequential Model ---")
    try:
        from models.train_tensorflow import train as train_tf
        train_tf()
    except Exception as e:
        print("Failed to train TF:", e)
        
    print("\n--- Training PyTorch Autoencoder ---")
    try:
        from models.train_pytorch import train as train_torch
        train_torch()
    except Exception as e:
        print("Failed to train PyTorch:", e)

    print("\nBackend environment successfully seeded!")
