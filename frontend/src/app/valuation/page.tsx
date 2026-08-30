'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PredictorForm } from '@/components/PredictorForm';
import { PriceDisplay } from '@/components/PriceDisplay';
import { CarVisualizer } from '@/components/CarVisualizer';
import { CarBlueprintInspector } from '@/components/CarBlueprintInspector';
import { MarketBellCurve } from '@/components/MarketBellCurve';
import { CarFeatures, PredictionResult } from '@/types';
import { predictPrice } from '@/lib/api';
import { Sparkles } from 'lucide-react';

export default function ValuationStudioPage() {
  const [features, setFeatures] = useState<CarFeatures>({
    brand: 'BMW',
    model_year: 2022,
    mileage_km: 35000,
    engine_power_hp: 250,
    engine_capacity_cc: 2.0,
    fuel_type: 'Gasoline',
    transmission: 'Automatic',
    damage_score: 0,
  });

  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    predictPrice(features)
      .then((res) => setPrediction(res))
      .finally(() => setLoading(false));
  }, [features]);

  const handleDamageChange = (score: number) => {
    setFeatures((prev: CarFeatures) => ({ ...prev, damage_score: score }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-10">
        <div className="pb-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-mono mb-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
              <span>Yapay Zeka Destekli Ekspertiz & Değerleme Studio</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight font-mono">
              Araç <span className="text-blue-600">Değerleme Studio</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Parametreleri değiştirin veya parçalara tıklayarak canlı ekspertiz haritası üzerinden anlık piyasa fiyatı alın
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-8 min-w-0">
            <PredictorForm features={features} setFeatures={setFeatures} />
            <CarBlueprintInspector onDamageChange={handleDamageChange} />
          </div>

          <div className="lg:col-span-5 space-y-8 min-w-0">
            <CarVisualizer
              brand={features.brand}
              model_year={features.model_year}
              mileage_km={features.mileage_km}
              engine_power_hp={features.engine_power_hp}
              fuel_type={features.fuel_type}
              transmission={features.transmission}
              damage_score={features.damage_score}
            />

            <PriceDisplay prediction={prediction} loading={loading} />

            {prediction && <MarketBellCurve price={prediction.predicted_price} />}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
