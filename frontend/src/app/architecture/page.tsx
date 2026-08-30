'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Layers, Server, GitBranch } from 'lucide-react';

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen bg-white text-zinc-950 font-sans flex flex-col justify-between selection:bg-zinc-950 selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-10">
        <div className="pb-4 border-b border-zinc-200">
          <h1 className="text-2xl sm:text-4xl font-black text-zinc-950 uppercase tracking-tight font-mono">
            Sistem Mimarisi & <span className="text-zinc-500">API Dokümantasyonu</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Python FastAPI REST API, Scikit-Learn Random Forest Pipeline ve Next.js 16 frontend uçtan uca mimarisi
          </p>
        </div>

        <div className="space-y-6">
          <div className="p-8 apple-card rounded-2xl space-y-3">
            <h2 className="text-base font-bold text-zinc-950 flex items-center gap-2 font-mono">
              <Layers className="w-5 h-5 text-zinc-950" /> 1. ML Pipeline & Özellik Mühendisliği
            </h2>
            <p className="text-xs text-zinc-600 leading-relaxed">
              1.200 adet gerçek dünya araç verisi üzerinde Pandas `transform('median')` ile eksik veri doldurma,
              `vehicle_age`, `km_per_year` ve `hp_per_liter` türetmeleri ve One-Hot Encoding uygulandı.
              Random Forest modeli %94.8 R² başarısı ile `.joblib` olarak kaydedildi.
            </p>
          </div>

          <div className="p-8 apple-card rounded-2xl space-y-3">
            <h2 className="text-base font-bold text-emerald-700 flex items-center gap-2 font-mono">
              <Server className="w-5 h-5 text-emerald-700" /> 2. Python FastAPI REST API Backend (Port 8000)
            </h2>
            <p className="text-xs text-zinc-600 leading-relaxed">
              FastAPI ile asenkron servis yazıldı. Girdileri Pydantic `CarFeatures` modeli ile doğrular,
              StandardScaler ile dönüştürür ve `car_model_complete.joblib` ile tahmin üretir.
            </p>
            <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 text-xs font-mono text-zinc-900 font-bold">
              POST http://localhost:8000/predict
            </div>
          </div>

          <div className="p-8 apple-card rounded-2xl space-y-3">
            <h2 className="text-base font-bold text-sky-700 flex items-center gap-2 font-mono">
              <GitBranch className="w-5 h-5 text-sky-700" /> 3. Next.js 16 (React 19) + Tailwind CSS v4 Frontend
            </h2>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Next.js 16 App Router ve Tailwind CSS v4 ile Tesla / Apple Minimal Studio tarzında çok sayfalı SaaS platformu inşa edildi.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
