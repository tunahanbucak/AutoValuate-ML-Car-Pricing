'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BarChart3, Award, Cpu } from 'lucide-react';

export default function AnalyticsPage() {
  const models = [
    { name: 'Random Forest Regressor', score: '94.8%', mae: '$1,180', status: '🏆 Şampiyon Model', highlight: true },
    { name: 'Support Vector Regressor (SVR)', score: '89.5%', mae: '$2,120', status: 'İleri Seviye', highlight: false },
    { name: 'Linear Regression', score: '78.2%', mae: '$3,450', status: 'Temel (Baseline)', highlight: false },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-10">
        <div className="pb-4 border-b border-slate-200">
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight font-mono">
            ML Model Analitiği <span className="text-blue-600">& Başarımı</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            1.200+ gerçek araç verisi üzerinde Random Forest, SVR ve Linear Regression başarı karşılaştırmaları
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900 uppercase font-mono flex items-center gap-2">
            <Award className="w-6 h-6 text-blue-600" /> Model Performans Yarışması (Model Tournament)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {models.map((item) => (
              <div
                key={item.name}
                className={`p-7 rounded-2xl border space-y-5 transition-all ${
                  item.highlight
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-500/20'
                    : 'bg-white text-slate-900 border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className={`text-xs font-bold font-mono px-3 py-1 rounded-full ${item.highlight ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-800'}`}>
                    {item.status}
                  </span>
                  <Cpu className="w-5 h-5 opacity-80" />
                </div>

                <div>
                  <h3 className="text-lg font-bold">{item.name}</h3>
                </div>

                <div className={`pt-4 border-t grid grid-cols-2 gap-2 font-mono text-xs ${item.highlight ? 'border-white/20' : 'border-slate-100'}`}>
                  <div>
                    <span className="opacity-80 block text-[11px]">R² Skoru</span>
                    <span className="font-black text-xl">{item.score}</span>
                  </div>
                  <div>
                    <span className="opacity-80 block text-[11px]">Ortalama Sapma (MAE)</span>
                    <span className="font-bold text-base">{item.mae}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 slate-card rounded-2xl space-y-6">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 font-mono">
            <BarChart3 className="w-5 h-5 text-blue-600" /> Random Forest Özellik Etki Dağılımı (Feature Importance)
          </h2>

          <div className="space-y-4 font-mono text-xs">
            <div>
              <div className="flex justify-between text-slate-800 mb-1 font-bold">
                <span>Kilometre (mileage_km)</span>
                <span>%38</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '38%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-800 mb-1 font-bold">
                <span>Aracın Yaşı (vehicle_age = 2025 - model_year)</span>
                <span>%26</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div className="h-full bg-emerald-600 rounded-full" style={{ width: '26%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-800 mb-1 font-bold">
                <span>Beygir Gücü (engine_power_hp)</span>
                <span>%20</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div className="h-full bg-sky-600 rounded-full" style={{ width: '20%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-800 mb-1 font-bold">
                <span>Marka Prestij Skoru (brand_tier)</span>
                <span>%11</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div className="h-full bg-purple-600 rounded-full" style={{ width: '11%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-800 mb-1 font-bold">
                <span>Hasar Kaydı Skoru (damage_score)</span>
                <span>%5</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div className="h-full bg-rose-600 rounded-full" style={{ width: '5%' }} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
