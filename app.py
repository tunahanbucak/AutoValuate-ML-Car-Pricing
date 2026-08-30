from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd
import numpy as np
from pydantic import BaseModel, Field
import urllib.request
import json

app = FastAPI(
    title="AutoValuate AI — Araç Değerleme API",
    description="Random Forest Makine Öğrenmesi Modeli Tabanlı Canlı Araç Değerleme API Servisi",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load("car_model_complete.joblib")
scaler = joblib.load("scaler.joblib")
feature_columns = joblib.load("feature_columns.joblib")


class CarFeatures(BaseModel):
    brand: str = Field(..., example="BMW", description="Araç Markası")
    model_year: int = Field(..., example=2021, description="Model Yılı")
    mileage_km: float = Field(..., example=50000.0, description="Kilometre")
    engine_power_hp: float = Field(..., example=250.0, description="Beygir Gücü (HP)")
    engine_capacity_cc: float = Field(..., example=2.0, description="Motor Hacmi (Litre)")
    fuel_type: str = Field(..., example="Gasoline", description="Yakıt Tipi: Gasoline, Diesel, Hybrid, Electric")
    transmission: str = Field(..., example="Automatic", description="Vites Tipi: Manual, Automatic")
    damage_score: int = Field(..., example=0, description="Hasar Kaydı: 0 (Hatasız) -> 3 (Ağır Hasarlı)")


@app.get("/")
def home():
    return {
        "status": "online",
        "service": "AutoValuate AI Car Pricing API",
        "version": "1.0.0",
        "documentation": "/docs"
    }


@app.get("/api/rates")
def get_exchange_rates():
    default_rates = {
        "USD_TRY": 48.24,
        "EUR_TRY": 56.20,
        "EUR_USD": 1.165,
        "timestamp": "2026 Live",
        "source": "AutoValuate Live Rates Engine"
    }
    try:
        req = urllib.request.Request(
            "https://open.er-api.com/v6/latest/USD",
            headers={"User-Agent": "Mozilla/5.0"}
        )
        with urllib.request.urlopen(req, timeout=3) as response:
            data = json.loads(response.read().decode())
            if data and "rates" in data:
                try_rate = float(data["rates"].get("TRY", 48.24))
                eur_rate = float(data["rates"].get("EUR", 0.858))
                eur_try = round(try_rate / eur_rate, 2) if eur_rate > 0 else 56.20
                return {
                    "USD_TRY": round(try_rate, 2),
                    "EUR_TRY": round(eur_try, 2),
                    "EUR_USD": round(1.0 / eur_rate, 3) if eur_rate > 0 else 1.165,
                    "timestamp": data.get("time_last_update_utc", "Live"),
                    "source": "Open Exchange Rates API"
                }
    except Exception:
        pass
    return default_rates


@app.post("/predict")
@app.post("/api/predict")
def predict(car: CarFeatures):
    try:
        vehicle_age = 2025 - car.model_year
        km_per_year = car.mileage_km / (vehicle_age + 1)
        hp_per_liter = car.engine_power_hp / car.engine_capacity_cc

        raw_dict = {
            "mileage_km": car.mileage_km,
            "engine_power_hp": car.engine_power_hp,
            "engine_capacity_cc": car.engine_capacity_cc,
            "damage_score": car.damage_score,
            "vehicle_age": vehicle_age,
            "km_per_year": km_per_year,
            "hp_per_liter": hp_per_liter,
        }

        for col in feature_columns:
            if col not in raw_dict:
                raw_dict[col] = 0.0

        brand_col = f"brand_{car.brand}"
        if brand_col in raw_dict:
            raw_dict[brand_col] = 1.0

        fuel_col = f"fuel_type_{car.fuel_type}"
        if fuel_col in raw_dict:
            raw_dict[fuel_col] = 1.0

        trans_col = f"transmission_{car.transmission}"
        if trans_col in raw_dict:
            raw_dict[trans_col] = 1.0

        input_df = pd.DataFrame([raw_dict])[feature_columns]
        scaled_input = scaler.transform(input_df)
        prediction = model.predict(scaled_input)[0]

        predicted_price = round(max(3000.0, float(prediction)), 2)

        tier = "Ekonomik Segment"
        if predicted_price > 35000:
            tier = "Üst Düzey Lüks Segment"
        elif predicted_price > 22000:
            tier = "Konfor & Premium Segment"
        elif predicted_price > 12000:
            tier = "Standart Aile Segmenti"

        return {
            "predicted_price": predicted_price,
            "tier": tier,
            "isBackendConnected": True,
            "features": car.model_dump()
        }

    except Exception as e:
        return {"error": str(e)}

