'use client';

import React from 'react';
import { BarChart2 } from 'lucide-react';

interface BellCurveProps {
  price: number;
}

export const MarketBellCurve: React.FC<BellCurveProps> = ({ price }) => {
  const min = Math.round(price * 0.85);
  const max = Math.round(price * 1.15);

  return (
    <div className="slate-card rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-sm font-bold text-slate-900 font-mono flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-blue-600" /> Piyasa Fiyat Dağılım Eğrisi
        </h3>
        <span className="text-[10px] font-mono text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full font-bold">
          1.200 Araç Verisi
        </span>
      </div>

      <div className="relative pt-6 pb-2">
        <svg viewBox="0 0 400 120" className="w-full h-28 overflow-visible">
          <defs>
            <linearGradient id="bellGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          <path
            d="M 10 110 Q 100 110, 150 70 T 200 15 T 250 70 Q 300 110, 390 110 Z"
            fill="url(#bellGrad)"
          />

          <path
            d="M 10 110 Q 100 110, 150 70 T 200 15 T 250 70 Q 300 110, 390 110"
            fill="none"
            stroke="#2563eb"
            strokeWidth="3"
          />

          <line x1="200" y1="15" x2="200" y2="110" stroke="#2563eb" strokeWidth="2" strokeDasharray="4 4" />
          <circle cx="200" cy="15" r="5" fill="#2563eb" />
        </svg>

        <div className="flex justify-between text-xs font-mono text-slate-600 pt-2 border-t border-slate-100">
          <div>
            <span className="text-[10px] block text-slate-400">Min Piyasa</span>
            <span className="font-bold text-slate-900">${min.toLocaleString('tr-TR')}</span>
          </div>
          <div className="text-center">
            <span className="text-[10px] block text-blue-600 font-bold">Hesaplanan Fiyat</span>
            <span className="font-black text-slate-900 text-sm">${price.toLocaleString('tr-TR')}</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] block text-slate-400">Max Piyasa</span>
            <span className="font-bold text-slate-900">${max.toLocaleString('tr-TR')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
