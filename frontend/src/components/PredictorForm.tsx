'use client';

import React from 'react';
import { CarFeatures, PredictorFormProps } from '@/types';
import { SlidersHorizontal, Check } from 'lucide-react';

const BRANDS = [
  { name: 'BMW', tag: 'Alman Lüks' },
  { name: 'Mercedes-Benz', tag: 'Alman Konfor' },
  { name: 'Audi', tag: 'Quattro Lüks' },
  { name: 'Volkswagen', tag: 'Alman Kalite' },
  { name: 'Toyota', tag: 'Japon Dayanıklı' },
  { name: 'Honda', tag: 'Japon Performans' },
  { name: 'Ford', tag: 'Amerikan Güç' },
  { name: 'Hyundai', tag: 'Kore Modern' },
];

const FUEL_TYPES = [
  { code: 'Gasoline', label: 'Benzin' },
  { code: 'Diesel', label: 'Dizel' },
  { code: 'Hybrid', label: 'Hibrit' },
  { code: 'Electric', label: 'Elektrik' },
];

const TRANSMISSIONS = [
  { code: 'Automatic', label: 'Otomatik' },
  { code: 'Manual', label: 'Manuel' },
];

const DAMAGE_LEVELS = [
  { value: 0, label: '0 — Hatasız Orijinal', desc: 'Boyasız, kazasız garaj aracı' },
  { value: 1, label: '1 — Lokal Boyalı', desc: '1-2 parça çizik boyalı' },
  { value: 2, label: '2 — Parça Değişen', desc: 'Parça değişimi yapılmış' },
  { value: 3, label: '3 — Ağır Hasarlı', desc: 'Pert kaydı / tavan değişen' },
];

export const PredictorForm: React.FC<PredictorFormProps> = ({ features, setFeatures }) => {
  const updateField = <K extends keyof CarFeatures>(key: K, value: CarFeatures[K]) => {
    setFeatures((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="slate-card rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-blue-600" /> Araç Konfigüratörü
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Araç parametrelerini seçerek canlı piyasa değerlemesini görün
          </p>
        </div>
        <span className="text-[11px] font-mono font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-xl">
          Random Forest ML
        </span>
      </div>

      <div className="space-y-2.5">
        <label className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
          1. Marka Seçimi
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {BRANDS.map((b) => (
            <button
              key={b.name}
              type="button"
              onClick={() => updateField('brand', b.name)}
              className={`p-3 rounded-xl text-left transition-all border ${
                features.brand === b.name
                  ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-sm shadow-blue-500/20'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="text-xs font-bold flex items-center justify-between">
                <span>{b.name}</span>
                {features.brand === b.name && <Check className="w-3.5 h-3.5" />}
              </div>
              <div className="text-[10px] opacity-80 mt-0.5 font-mono">{b.tag}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <label className="font-bold text-slate-900">Model Yılı</label>
            <span className="text-blue-700 font-extrabold text-sm">{features.model_year}</span>
          </div>
          <input
            type="range"
            min="2010"
            max="2024"
            step="1"
            value={features.model_year}
            onChange={(e) => updateField('model_year', parseInt(e.target.value))}
            className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <label className="font-bold text-slate-900">Kilometre (km)</label>
            <span className="text-blue-700 font-extrabold text-sm" suppressHydrationWarning>{features.mileage_km.toLocaleString('tr-TR')} km</span>
          </div>
          <input
            type="range"
            min="1000"
            max="250000"
            step="2000"
            value={features.mileage_km}
            onChange={(e) => updateField('mileage_km', parseFloat(e.target.value))}
            className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <label className="font-bold text-slate-900">Beygir Gücü (HP)</label>
            <span className="text-emerald-700 font-extrabold text-sm">{features.engine_power_hp} HP</span>
          </div>
          <input
            type="range"
            min="90"
            max="420"
            step="5"
            value={features.engine_power_hp}
            onChange={(e) => updateField('engine_power_hp', parseFloat(e.target.value))}
            className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <label className="font-bold text-slate-900">Motor Hacmi (Litre)</label>
            <span className="text-sky-700 font-extrabold text-sm">{features.engine_capacity_cc} L</span>
          </div>
          <input
            type="range"
            min="1.0"
            max="4.4"
            step="0.1"
            value={features.engine_capacity_cc}
            onChange={(e) => updateField('engine_capacity_cc', parseFloat(e.target.value))}
            className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-900 block uppercase tracking-wider font-mono">
            Yakıt Tipi
          </label>
          <div className="grid grid-cols-2 gap-2">
            {FUEL_TYPES.map((f) => (
              <button
                key={f.code}
                type="button"
                onClick={() => updateField('fuel_type', f.code)}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                  features.fuel_type === f.code
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/20'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-900 block uppercase tracking-wider font-mono">
            Vites Tipi
          </label>
          <div className="grid grid-cols-2 gap-2">
            {TRANSMISSIONS.map((t) => (
              <button
                key={t.code}
                type="button"
                onClick={() => updateField('transmission', t.code)}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                  features.transmission === t.code
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/20'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2.5">
        <label className="text-xs font-bold text-slate-900 flex items-center justify-between font-mono">
          <span>Hasar & Ekspertiz Durumu</span>
          <span className="text-[10px] text-slate-500">Piyasa değerine etki eder</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {DAMAGE_LEVELS.map((d) => (
            <button
              key={d.value}
              type="button"
              onClick={() => updateField('damage_score', d.value)}
              className={`p-3 rounded-xl text-left transition-all border ${
                features.damage_score === d.value
                  ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-sm shadow-blue-500/20'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="text-xs font-bold">{d.label}</div>
              <div className="text-[10px] opacity-80 mt-1 leading-tight font-mono">{d.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
