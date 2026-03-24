import pandas as pd
import joblib
from sklearn.ensemble import RandomForestRegressor
import os
import sys

# Add parent dir to path so we can import config
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import DATA_PATH, MODEL_PATHS

def train():
    try:
        data = pd.read_csv(DATA_PATH)

        if data.empty:
            raise ValueError("Dataset is empty")

        required_cols = ['PM2.5','PM10','temperature','humidity','wind_speed','traffic','AQI']
        for col in required_cols:
            if col not in data.columns:
                raise ValueError(f"Missing column: {col}")

        X = data[['PM2.5','PM10','temperature','humidity','wind_speed','traffic']]
        y = data['AQI']

        model = RandomForestRegressor(n_estimators=100)
        model.fit(X, y)

        os.makedirs(os.path.dirname(MODEL_PATHS["rf"]), exist_ok=True)
        joblib.dump(model, MODEL_PATHS["rf"])
        print("Sklearn model trained")

    except Exception as e:
        print("Training error:", e)

if __name__ == "__main__":
    train()
