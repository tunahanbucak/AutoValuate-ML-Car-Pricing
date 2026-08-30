export interface CarFeatures {
  brand: string;
  model_year: number;
  mileage_km: number;
  engine_power_hp: number;
  engine_capacity_cc: number;
  fuel_type: string;
  transmission: string;
  damage_score: number;
}

export interface PredictionResult {
  predicted_price: number;
  tier: string;
  isBackendConnected: boolean;
  features: CarFeatures;
}

export interface ExchangeRates {
  USD_TRY: number;
  EUR_TRY: number;
  EUR_USD: number;
  timestamp: string;
  source: string;
}

export interface VisualizerProps {
  brand: string;
  model_year: number;
  mileage_km: number;
  engine_power_hp: number;
  fuel_type: string;
  transmission: string;
  damage_score: number;
}

export interface PredictorFormProps {
  features: CarFeatures;
  setFeatures: React.Dispatch<React.SetStateAction<CarFeatures>>;
}

export interface BlueprintProps {
  onDamageChange: (score: number) => void;
}

export interface BellCurveProps {
  price: number;
}

export interface PriceDisplayProps {
  prediction: PredictionResult | null;
  loading: boolean;
}

export interface NavbarProps {
  isBackendConnected?: boolean;
}
