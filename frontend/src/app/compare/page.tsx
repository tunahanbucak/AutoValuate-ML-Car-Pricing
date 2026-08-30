'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CarFeatures, PredictionResult } from '@/types';
import { predictPrice } from '@/lib/api';
import { ArrowLeftRight, Trophy, Scale } from 'lucide-react';

const BRANDS = ['BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Toyota', 'Ford'];

export default function ComparePage() {
  const [carA, setCarA] = useState<CarFeatures>({
    brand: 'BMW',
    model_year: 2022,
    mileage_km: 25000,
    engine_power_hp: 380,
    engine_capacity_cc: 3.0,
    fuel_type: 'Gasoline',
    transmission: 'Automatic',
    damage_score: 0,
  });

  const [carB, setCarB] = useState<CarFeatures>({
    brand: 'Mercedes-Benz',
    model_year: 2023,
    mileage_km: 15000,
    engine_power_hp: 204,
    engine_capacity_cc: 1.5,
    fuel_type: 'Gasoline',
    transmission: 'Automatic',
    damage_score: 0,
  });

  const [predA, setPredA] = useState<PredictionResult | null>(null);
  const [predB, setPredB] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([predictPrice(carA), predictPrice(carB)])
      .then(([resA, resB]) => {
        setPredA(resA);
        setPredB(resB);
      })
      .finally(() => setLoading(false));
  }, [carA, carB]);

  const priceA = predA?.predicted_price || 0;
  const priceB = predB?.predicted_price || 0;
  const diff = Math.abs(priceA - priceB);

  const getCarImage = (brand: string) => {
    switch (brand) {
      case 'BMW': return '/images/bmw.jpg';
      case 'Mercedes-Benz': return '/images/mercedes.jpg';
      case 'Audi': return '/images/audi.jpg';
      case 'Toyota': return '/images/toyota.jpg';
      case 'Ford': return '/images/ford.jpg';
      default: return '/images/porsche_gt3.jpg';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-10">
        <div className="pb-4 border-b border-slate-200">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-mono mb-2">
            <ArrowLeftRight className="w-3.5 h-3.5 text-blue-600" />
            <span>İkili Canlı Yapay Zeka Karşılaştırma Motoru</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight font-mono">
            Araç <span className="text-blue-600">Karşılaştırma Studio</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            İki farklı aracın parametrelerini yan yana seçin; makine öğrenmesi tahminini, fiyat farkını ve amortisman grafiğini anında karşılaştırın
          </p>
        </div>

        {predA && predB && (
          <div className="p-6 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-bold text-blue-200 uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1">
                <Trophy className="w-4 h-4 text-amber-300" /> AI Karşılaştırma Sonucu
              </span>
              <h2 className="text-xl sm:text-2xl font-black">
                {priceA > priceB ? `${carA.brand} ${carA.model_year}` : `${carB.brand} ${carB.model_year}`}, diğerinden ${diff.toLocaleString('tr-TR')} daha değerli.
              </h2>
            </div>

            <div className="px-5 py-3 bg-white text-slate-900 rounded-xl font-bold text-center shrink-0 shadow-sm">
              <span className="text-[10px] text-slate-500 block uppercase">Fiyat Farkı</span>
              <span className="text-xl text-blue-600 font-black">${diff.toLocaleString('tr-TR')}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="slate-card rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 font-mono">
              <span className="px-3 py-1 bg-blue-50 border border-blue-200 text-blue-700 font-black text-xs rounded-lg">
                ARAÇ A (SOL)
              </span>
              <span className="text-xs font-bold text-slate-900">{carA.brand} {carA.model_year}</span>
            </div>

            <div className="h-44 rounded-xl overflow-hidden border border-slate-200 relative">
              <img src={getCarImage(carA.brand)} alt={carA.brand} className="w-full h-full object-cover" />
              <div className="absolute bottom-3 left-3 bg-black/70 text-white font-mono text-xs px-3 py-1 rounded-lg backdrop-blur-md font-bold">
                Tahmin: ${priceA.toLocaleString('tr-TR')}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-900 block font-mono mb-1.5">Marka</label>
                <div className="grid grid-cols-3 gap-2">
                  {BRANDS.map((b) => (
                    <button
                      key={b}
                      onClick={() => setCarA((prev: CarFeatures) => ({ ...prev, brand: b }))}
                      className={`py-2 px-2 text-xs font-bold rounded-lg border transition-all ${
                        carA.brand === b ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs font-mono">
                <div>
                  <label className="block text-[10px] text-slate-500 font-bold">Model Yılı: {carA.model_year}</label>
                  <input
                    type="range" min="2010" max="2024" value={carA.model_year}
                    onChange={(e) => setCarA((prev: CarFeatures) => ({ ...prev, model_year: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-slate-200 rounded appearance-none cursor-pointer accent-blue-600 mt-1"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 font-bold">KM: {carA.mileage_km.toLocaleString()} km</label>
                  <input
                    type="range" min="5000" max="200000" step="5000" value={carA.mileage_km}
                    onChange={(e) => setCarA((prev: CarFeatures) => ({ ...prev, mileage_km: parseFloat(e.target.value) }))}
                    className="w-full h-2 bg-slate-200 rounded appearance-none cursor-pointer accent-blue-600 mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs font-mono">
                <div>
                  <label className="block text-[10px] text-slate-500 font-bold">Beygir Gücü: {carA.engine_power_hp} HP</label>
                  <input
                    type="range" min="100" max="420" step="10" value={carA.engine_power_hp}
                    onChange={(e) => setCarA((prev: CarFeatures) => ({ ...prev, engine_power_hp: parseFloat(e.target.value) }))}
                    className="w-full h-2 bg-slate-200 rounded appearance-none cursor-pointer accent-blue-600 mt-1"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 font-bold">Hasar Kaydı</label>
                  <select
                    value={carA.damage_score}
                    onChange={(e) => setCarA((prev: CarFeatures) => ({ ...prev, damage_score: parseInt(e.target.value) }))}
                    className="w-full p-1 bg-white border border-slate-200 rounded text-xs mt-1 font-bold"
                  >
                    <option value={0}>0 — Hatasız</option>
                    <option value={1}>1 — Lokal Boyalı</option>
                    <option value={2}>2 — Değişen</option>
                    <option value={3}>3 — Ağır Hasar</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="slate-card rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 font-mono">
              <span className="px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 font-black text-xs rounded-lg">
                ARAÇ B (SAĞ)
              </span>
              <span className="text-xs font-bold text-slate-900">{carB.brand} {carB.model_year}</span>
            </div>

            <div className="h-44 rounded-xl overflow-hidden border border-slate-200 relative">
              <img src={getCarImage(carB.brand)} alt={carB.brand} className="w-full h-full object-cover" />
              <div className="absolute bottom-3 left-3 bg-black/70 text-white font-mono text-xs px-3 py-1 rounded-lg backdrop-blur-md font-bold">
                Tahmin: ${priceB.toLocaleString('tr-TR')}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-900 block font-mono mb-1.5">Marka</label>
                <div className="grid grid-cols-3 gap-2">
                  {BRANDS.map((b) => (
                    <button
                      key={b}
                      onClick={() => setCarB((prev: CarFeatures) => ({ ...prev, brand: b }))}
                      className={`py-2 px-2 text-xs font-bold rounded-lg border transition-all ${
                        carB.brand === b ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs font-mono">
                <div>
                  <label className="block text-[10px] text-slate-500 font-bold">Model Yılı: {carB.model_year}</label>
                  <input
                    type="range" min="2010" max="2024" value={carB.model_year}
                    onChange={(e) => setCarB((prev: CarFeatures) => ({ ...prev, model_year: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-slate-200 rounded appearance-none cursor-pointer accent-blue-600 mt-1"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 font-bold">KM: {carB.mileage_km.toLocaleString()} km</label>
                  <input
                    type="range" min="5000" max="200000" step="5000" value={carB.mileage_km}
                    onChange={(e) => setCarB((prev: CarFeatures) => ({ ...prev, mileage_km: parseFloat(e.target.value) }))}
                    className="w-full h-2 bg-slate-200 rounded appearance-none cursor-pointer accent-blue-600 mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs font-mono">
                <div>
                  <label className="block text-[10px] text-slate-500 font-bold">Beygir Gücü: {carB.engine_power_hp} HP</label>
                  <input
                    type="range" min="100" max="420" step="10" value={carB.engine_power_hp}
                    onChange={(e) => setCarB((prev: CarFeatures) => ({ ...prev, engine_power_hp: parseFloat(e.target.value) }))}
                    className="w-full h-2 bg-slate-200 rounded appearance-none cursor-pointer accent-blue-600 mt-1"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 font-bold">Hasar Kaydı</label>
                  <select
                    value={carB.damage_score}
                    onChange={(e) => setCarB((prev: CarFeatures) => ({ ...prev, damage_score: parseInt(e.target.value) }))}
                    className="w-full p-1 bg-white border border-slate-200 rounded text-xs mt-1 font-bold"
                  >
                    <option value={0}>0 — Hatasız</option>
                    <option value={1}>1 — Lokal Boyalı</option>
                    <option value={2}>2 — Değişen</option>
                    <option value={3}>3 — Ağır Hasar</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="slate-card rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-900 font-mono flex items-center gap-2">
            <Scale className="w-5 h-5 text-blue-600" /> Detaylı Teknik Metrik Karşılaştırması
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono text-left">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 bg-slate-50">
                  <th className="p-3">Metrik</th>
                  <th className="p-3">Araç A ({carA.brand})</th>
                  <th className="p-3">Araç B ({carB.brand})</th>
                  <th className="p-3">Kazanan / Avantaj</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-3 font-bold text-slate-900">Tahmini Piyasa Değeri</td>
                  <td className="p-3 font-black text-blue-600">${priceA.toLocaleString('tr-TR')}</td>
                  <td className="p-3 font-black text-blue-600">${priceB.toLocaleString('tr-TR')}</td>
                  <td className="p-3 font-bold text-emerald-700">{priceA > priceB ? 'Araç A Değeri Yüksek' : 'Araç B Değeri Yüksek'}</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-900">Model Yılı</td>
                  <td className="p-3">{carA.model_year}</td>
                  <td className="p-3">{carB.model_year}</td>
                  <td className="p-3 font-bold">{carA.model_year >= carB.model_year ? 'Araç A Daha Yeni' : 'Araç B Daha Yeni'}</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-900">Kilometre (Yıpranma)</td>
                  <td className="p-3">{carA.mileage_km.toLocaleString()} km</td>
                  <td className="p-3">{carB.mileage_km.toLocaleString()} km</td>
                  <td className="p-3 font-bold text-emerald-700">{carA.mileage_km <= carB.mileage_km ? 'Araç A Az KM' : 'Araç B Az KM'}</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-900">Beygir Gücü (HP)</td>
                  <td className="p-3">{carA.engine_power_hp} HP</td>
                  <td className="p-3">{carB.engine_power_hp} HP</td>
                  <td className="p-3 font-bold text-blue-700">{carA.engine_power_hp >= carB.engine_power_hp ? 'Araç A Güçlü' : 'Araç B Güçlü'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
