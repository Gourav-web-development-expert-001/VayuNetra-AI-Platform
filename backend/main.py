from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from models.predict_sklearn import predict_aqi
from models.predict_tensorflow import forecast
from ai.source_detection import detect_source
from ai.health_advisory import health_advice
from ai.recommendation import recommend
from ai.anomaly import detect_anomaly
from database import insert_record

app = FastAPI(title="VayuNetra AI Engine", description="Environmental backend prediction engine")

# Enable CORS for React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class InputData(BaseModel):
    pm25: float
    pm10: float
    temp: float
    humidity: float
    wind: float
    traffic: float

@app.post("/analyze")
def analyze(data: InputData):
    try:
        values = [
            data.pm25, data.pm10, data.temp,
            data.humidity, data.wind, data.traffic
        ]

        aqi = predict_aqi(values)
        source = detect_source(data.pm25, data.traffic, data.wind)
        health = health_advice(aqi)
        rec = recommend(aqi, source)
        anomaly = detect_anomaly(values)
        forecast_data = forecast(aqi)

        result = {
            "pm25": data.pm25,
            "pm10": data.pm10,
            "temp": data.temp,
            "humidity": data.humidity,
            "wind": data.wind,
            "traffic": data.traffic,
            "aqi": aqi,
            "source": source,
            "health": health,
            "recommendation": rec,
            "anomaly": anomaly,
            "forecast": forecast_data
        }

        try:
            insert_record(result)
        except Exception as e:
            print("Database hook failed (Postgres not running/configured)", e)

        return result

    except Exception as e:
        print("Analysis error:", e)
        raise HTTPException(status_code=500, detail=str(e))
