'use client';

import React from 'react';
import { BarChart3 } from 'lucide-react';

export const FeatureImportance: React.FC = () => {
  const features = [
    { name: 'Kilometre (mileage_km)', weight: 38, color: 'bg-amber-400' },
    { name: 'Aracın Yaşı (vehicle_age)', weight: 26, color: 'bg-emerald-400' },
    { name: 'Beygir Gücü (engine_power_hp)', weight: 20, color: 'bg-sky-400' },
    { name: 'Marka Prestiji (brand_tier)', weight: 11, color: 'bg-indigo-400' },
    { name: 'Hasar Skoru (damage_score)', weight: 5, color: 'bg-rose-400' },
  ];

  return (
    <div className="bg-[#111319] rounded-2xl border border-zinc-800/90 p-6 space-y-4 shadow-xl">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-amber-400" /> Özellik Etki Oranları (Feature Importance)
        </h3>
        <span className="text-[10px] font-mono text-zinc-400">Random Forest Weights</span>
      </div>

      <div className="space-y-3 font-mono text-xs">
        {features.map((item) => (
          <div key={item.name} className="space-y-1">
            <div className="flex justify-between text-zinc-300">
              <span>{item.name}</span>
              <span className="font-bold text-zinc-200">%{item.weight}</span>
            </div>
            <div className="w-full h-2 bg-[#0a0b0e] rounded-full overflow-hidden border border-zinc-800">
              <div
                className={`h-full rounded-full ${item.color}`}
                style={{ width: `${item.weight}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
