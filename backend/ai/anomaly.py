import torch
import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from models.train_pytorch import Autoencoder
from config import MODEL_PATHS

model = Autoencoder()

try:
    model.load_state_dict(torch.load(MODEL_PATHS["torch"]))
    model.eval()
except:
    model = None

def detect_anomaly(values):
    if model is None:
        return "Model not loaded"

    try:
        x = torch.tensor(values, dtype=torch.float32)
        recon = model(x)
        loss = torch.mean((x - recon)**2).item()

        if loss > 100:
            return "High Anomaly"
        elif loss > 50:
            return "Moderate Anomaly"
        else:
            return "Normal"
    except:
        return "Error"
