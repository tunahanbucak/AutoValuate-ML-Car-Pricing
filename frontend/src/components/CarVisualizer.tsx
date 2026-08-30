'use client';

import React from 'react';
import { VisualizerProps } from '@/types';
import { Gauge, Zap, Flame, ShieldAlert, ShieldCheck, Sparkles } from 'lucide-react';

export const CarVisualizer: React.FC<VisualizerProps> = ({
  brand,
  model_year,
  mileage_km,
  engine_power_hp,
  fuel_type,
  transmission,
  damage_score,
}) => {
  const getBrandDetails = (b: string) => {
    switch (b) {
      case 'BMW':
        return { img: '/images/bmw.jpg', badge: 'M Sport Performance' };
      case 'Mercedes-Benz':
        return { img: '/images/mercedes.jpg', badge: 'AMG Line Luxury' };
      case 'Audi':
        return { img: '/images/audi.jpg', badge: 'V10 Performance Quattro' };
      case 'Toyota':
        return { img: '/images/toyota.jpg', badge: 'GR Sport Performance' };
      case 'Ford':
        return { img: '/images/ford.jpg', badge: 'Mustang GT V8' };
      default:
        return { img: '/images/porsche_gt3.jpg', badge: 'GT3 RS Track Edition' };
    }
  };

  const getFuelTurkish = (f: string) => {
    if (f === 'Gasoline') return 'Benzin';
    if (f === 'Diesel') return 'Dizel';
    if (f === 'Hybrid') return 'Hibrit';
    if (f === 'Electric') return 'Elektrik';
    return f;
  };

  const details = getBrandDetails(brand);
  const damageLabels = ['0 — Hatasız Orijinal Garaj', '1 — Lokal Çizik Boyalı', '2 — Parça Değişen', '3 — Ağır Hasar Kayıtlı'];
  const damageStyles = [
    'border-emerald-200 text-emerald-700 bg-emerald-50',
    'border-amber-200 text-amber-700 bg-amber-50',
    'border-orange-200 text-orange-700 bg-orange-50',
    'border-rose-200 text-rose-700 bg-rose-50'
  ];

  return (
    <div className="slate-card rounded-2xl p-6 flex flex-col items-center justify-between min-h-[380px] relative">
      <div className="w-full flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            <span className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wide">
              {brand} {model_year}
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-mono mt-0.5 block">
            {details.badge}
          </span>
        </div>

        <div className={`px-3 py-1 rounded-xl border text-xs font-bold font-mono flex items-center gap-1.5 ${damageStyles[damage_score] || damageStyles[0]}`}>
          {damage_score === 0 ? <ShieldCheck className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
          {damageLabels[damage_score] || damageLabels[0]}
        </div>
      </div>

      <div className="my-4 relative w-full h-52 rounded-xl overflow-hidden border border-slate-200 shadow-sm group">
        <img
          src={details.img}
          alt={brand}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
          <span className="flex items-center gap-1 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" /> Canlı Araç Sahnesi
          </span>
          <span className="text-slate-300">{brand} Spec</span>
        </div>
      </div>

      <div className="w-full grid grid-cols-3 gap-2.5 pt-4 border-t border-slate-100 text-xs font-mono">
        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center gap-2">
          <Gauge className="w-4 h-4 text-slate-700 shrink-0" />
          <div className="min-w-0">
            <span className="text-[10px] text-slate-500 block truncate">Kilometre</span>
            <span className="font-bold text-slate-900 block truncate">{mileage_km.toLocaleString('tr-TR')} km</span>
          </div>
        </div>

        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center gap-2">
          <Zap className="w-4 h-4 text-emerald-600 shrink-0" />
          <div className="min-w-0">
            <span className="text-[10px] text-slate-500 block truncate">Motor Gücü</span>
            <span className="font-bold text-slate-900 block truncate">{engine_power_hp} HP</span>
          </div>
        </div>

        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center gap-2">
          <Flame className="w-4 h-4 text-sky-600 shrink-0" />
          <div className="min-w-0">
            <span className="text-[10px] text-slate-500 block truncate">Yakıt Tipi</span>
            <span className="font-bold text-slate-900 block truncate">{getFuelTurkish(fuel_type)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
