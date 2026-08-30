import { CarFeatures, PredictionResult, ExchangeRates } from '@/types';

export type { CarFeatures, PredictionResult, ExchangeRates };

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function fetchExchangeRates(): Promise<ExchangeRates> {
  const fallbackRates: ExchangeRates = {
    USD_TRY: 48.24,
    EUR_TRY: 56.20,
    EUR_USD: 1.165,
    timestamp: "2026 Live",
    source: "AutoValuate Live Fallback"
  };

  try {
    const res = await fetch(`${API_BASE_URL}/api/rates`, { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      const data = await res.json();
      return {
        USD_TRY: data.USD_TRY || 48.24,
        EUR_TRY: data.EUR_TRY || 56.20,
        EUR_USD: data.EUR_USD || 1.165,
        timestamp: data.timestamp || "Live",
        source: data.source || "Live API"
      };
    }
  } catch (err) {
  }

  return fallbackRates;
}

function calculateClientFallback(features: CarFeatures): number {
  const brandBase: Record<string, number> = {
    Hyundai: 18000, Ford: 22000, Honda: 24000, Toyota: 25000,
    Volkswagen: 27000, Audi: 38000, BMW: 42000, 'Mercedes-Benz': 45000
  };

  const base = brandBase[features.brand] || 25000;
  const age = Math.max(0, 2025 - features.model_year);
  const ageFactor = Math.exp(-0.065 * age);
  const kmFactor = Math.max(0.3, 1.0 - (features.mileage_km / 450000));
  const hpBonus = (features.engine_power_hp - 120) * 110;

  const fuelMult = features.fuel_type === 'Electric' ? 1.18 : (features.fuel_type === 'Hybrid' ? 1.10 : 1.0);
  const transMult = features.transmission === 'Automatic' ? 1.08 : 1.0;
  const dmgMult = Math.max(0.5, 1.0 - (features.damage_score * 0.12));

  let price = (base * ageFactor * kmFactor + hpBonus) * fuelMult * transMult * dmgMult;
  return Math.round(Math.max(3200, price));
}

export async function predictPrice(features: CarFeatures): Promise<PredictionResult> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3500);

  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(features),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API HTTP ${response.status}`);
    }

    const data = await response.json();
    return {
      predicted_price: data.predicted_price,
      tier: data.tier || 'Standart Segment',
      isBackendConnected: true,
      features: features,
    };
  } catch (error) {
    clearTimeout(timeoutId);
    const fallbackPrice = calculateClientFallback(features);

    let tier = 'Ekonomik Segment';
    if (fallbackPrice > 35000) tier = 'Üst Düzey Lüks Segment';
    else if (fallbackPrice > 22000) tier = 'Konfor & Premium Segment';
    else if (fallbackPrice > 12000) tier = 'Standart Aile Segmenti';

    return {
      predicted_price: fallbackPrice,
      tier: tier,
      isBackendConnected: false,
      features: features,
    };
  }
}
