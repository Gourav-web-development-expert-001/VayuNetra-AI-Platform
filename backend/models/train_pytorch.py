import torch
import torch.nn as nn
import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import MODEL_PATHS

class Autoencoder(nn.Module):
    def __init__(self):
        super().__init__()
        self.encoder = nn.Linear(6,3)
        self.decoder = nn.Linear(3,6)

    def forward(self,x):
        x = self.encoder(x)
        x = self.decoder(x)
        return x

def train():
    model = Autoencoder()
    # Dummy training for demonstration
    os.makedirs(os.path.dirname(MODEL_PATHS["torch"]), exist_ok=True)
    torch.save(model.state_dict(), MODEL_PATHS["torch"])
    print("PyTorch model saved")

if __name__ == "__main__":
    train()
