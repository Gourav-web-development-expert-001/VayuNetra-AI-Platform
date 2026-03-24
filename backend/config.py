import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DATA_PATH = os.path.join(BASE_DIR, "data/aqi_data.csv")

MODEL_PATHS = {
    "rf": os.path.join(BASE_DIR, "saved_models/rf_model.pkl"),
    "tf": os.path.join(BASE_DIR, "saved_models/tf_model.h5"),
    "torch": os.path.join(BASE_DIR, "saved_models/pytorch_model.pth")
}
