'use client';

import React, { useState } from 'react';
import { ShieldCheck, Sparkles, Info } from 'lucide-react';

interface BlueprintProps {
  onDamageChange: (score: number) => void;
}

type PartStatus = 'original' | 'painted' | 'changed';

export const CarBlueprintInspector: React.FC<BlueprintProps> = ({ onDamageChange }) => {
  const [parts, setParts] = useState<Record<string, PartStatus>>({
    hood: 'original',
    roof: 'original',
    trunk: 'original',
    frontBumper: 'original',
    rearBumper: 'original',
    leftFrontDoor: 'original',
    rightFrontDoor: 'original',
    leftRearDoor: 'original',
    rightRearDoor: 'original',
  });

  const partNames: Record<string, string> = {
    hood: 'Ön Kaput',
    roof: 'Tavan (Kritik)',
    trunk: 'Bagaj Kapağı',
    frontBumper: 'Ön Tampon',
    rearBumper: 'Arka Tampon',
    leftFrontDoor: 'Sol Ön Kapı',
    rightFrontDoor: 'Sağ Ön Kapı',
    leftRearDoor: 'Sol Arka Kapı',
    rightRearDoor: 'Sağ Arka Kapı',
  };

  const togglePart = (partKey: string) => {
    setParts((prev) => {
      const current = prev[partKey];
      let next: PartStatus = 'original';
      if (current === 'original') next = 'painted';
      else if (current === 'painted') next = 'changed';
      else next = 'original';

      const updated = { ...prev, [partKey]: next };

      let changedCount = 0;
      let paintedCount = 0;

      Object.values(updated).forEach((status) => {
        if (status === 'changed') changedCount++;
        if (status === 'painted') paintedCount++;
      });

      let score = 0;
      if (changedCount >= 3 || updated.roof === 'changed') score = 3;
      else if (changedCount > 0) score = 2;
      else if (paintedCount > 0) score = 1;
      else score = 0;

      setTimeout(() => onDamageChange(score), 0);
      return updated;
    });
  };

  return (
    <div className="slate-card rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900 font-mono flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" /> İnteraktif Kaporta Hasar Haritası
          </h3>
          <p className="text-[11px] text-slate-500">
            Parçalara tıklayarak durumu değiştirin: <span className="text-emerald-700 font-bold">Orijinal</span> → <span className="text-amber-700 font-bold">Boyalı</span> → <span className="text-rose-700 font-bold">Değişen</span>
          </p>
        </div>

        <div className="flex gap-2 text-[10px] font-mono">
          <span className="px-2 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded font-bold">Orijinal</span>
          <span className="px-2 py-1 bg-amber-50 border border-amber-200 text-amber-700 rounded font-bold">Boyalı</span>
          <span className="px-2 py-1 bg-rose-50 border border-rose-200 text-rose-700 rounded font-bold">Değişen</span>
        </div>
      </div>

      {/* EXPLANATION BADGE FOR ROOF DAMAGE RULE */}
      <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-800 flex items-start gap-2 font-mono">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block">Ekspertiz Bilgilendirmesi:</span>
          Türk oto ekspertiz standartlarında <strong>Tavan değişimi</strong> (takla/tavan sacı değişimi) aracın direk bütünlüğünü etkilediği için otomobili doğrudan <strong>Ağır Hasarlı (Score 3)</strong> sınıfına sokar ve piyasa değerini en çok düşüren faktördür.
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
        {Object.keys(parts).map((key) => {
          const status = parts[key];
          const isRoof = key === 'roof';

          return (
            <button
              key={key}
              type="button"
              onClick={() => togglePart(key)}
              className={`p-3 rounded-xl border text-left transition-all ${
                status === 'changed'
                  ? 'bg-rose-50 border-rose-300 text-rose-800'
                  : status === 'painted'
                  ? 'bg-amber-50 border-amber-300 text-amber-800'
                  : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
              }`}
            >
              <div className="text-xs font-bold font-mono flex items-center justify-between">
                <span>{partNames[key]}</span>
                {isRoof && <span className="text-[9px] px-1.5 py-0.2 bg-rose-100 text-rose-700 rounded font-bold">Kritik</span>}
              </div>
              <div className="text-[10px] uppercase font-mono mt-1 opacity-80">
                {status === 'changed' ? (isRoof ? '🚨 Değişen (Ağır)' : '⚠️ Değişen Parça') : status === 'painted' ? '🎨 Boyalı Parça' : '✓ Hatasız Orijinal'}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
