'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Sparkles, ArrowRight, BarChart3, ArrowLeftRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 space-y-20 py-12">
        {/* HERO SECTION */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 pt-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-mono">
            <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
            <span>Random Forest ML Engine %94.8 Doğruluk</span>
          </div>

          <h1 className="text-4xl sm:text-7xl font-black text-slate-900 tracking-tight leading-none max-w-4xl mx-auto">
            İkinci El Araç Değerlemesinde <span className="text-blue-600 font-serif font-normal italic">Yapay Zeka Devrimi.</span>
          </h1>

          <p className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Araç yaşı, kilometre yıpranması ve motor verimliliği parametreleriyle saniyeler içinde şeffaf, yüksek doğrulukta piyasa fiyatı tahmini ve ekspertiz analizi alın.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link
              href="/valuation"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-xs font-mono flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20 scale-105 hover:scale-110"
            >
              <span>DEĞERLEME STUDIO'YU AÇ</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/compare"
              className="px-8 py-4 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-2xl border border-slate-200 text-xs flex items-center gap-2 transition-all shadow-sm"
            >
              <ArrowLeftRight className="w-4 h-4 text-blue-600" />
              <span>ARAÇLARI KARŞILAŞTIR</span>
            </Link>
          </div>

          {/* STATS COUNTER BAR */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-10 font-mono text-xs">
            <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-1 shadow-sm">
              <span className="text-3xl font-black text-blue-600 block">%94.8</span>
              <span className="text-slate-600 font-medium">R² Model Doğruluğu</span>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-1 shadow-sm">
              <span className="text-3xl font-black text-emerald-600 block">1.200+</span>
              <span className="text-slate-600 font-medium">Eğitilmiş Veri Seti</span>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-1 shadow-sm">
              <span className="text-3xl font-black text-sky-600 block">&lt; 0.12s</span>
              <span className="text-slate-600 font-medium">FastAPI API Hızı</span>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-1 shadow-sm">
              <span className="text-3xl font-black text-purple-600 block">$1,180</span>
              <span className="text-slate-600 font-medium">Ortalama MAE Sapma</span>
            </div>
          </div>
        </section>

        {/* 6 UNIQUE VEHICLE SHOWCASE GRID */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 font-mono tracking-tight">
                Model Tarafından Analiz Edilen Araçlar
              </h2>
              <p className="text-xs text-slate-500">8K çözünürlüklü otomobil şablonları</p>
            </div>
            <Link href="/compare" className="text-xs text-blue-600 hover:underline font-mono font-bold">
              Karşılaştırma Studio'yu Aç →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="slate-card slate-card-hover rounded-2xl overflow-hidden p-4 space-y-3">
              <div className="h-48 rounded-xl overflow-hidden relative border border-slate-200">
                <img src="/images/porsche_gt3.jpg" alt="Porsche 911 GT3 RS" className="w-full h-full object-cover" />
                <span className="absolute top-3 right-3 px-2.5 py-1 bg-blue-600 text-white font-bold text-[11px] rounded-lg font-mono">
                  Porsche
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900">2024 Porsche 911 GT3 RS</h3>
                <p className="text-xs text-slate-500">Tahmini değer: <strong className="text-slate-900">$248,000 USD</strong></p>
                <Link href="/valuation" className="text-xs text-blue-600 font-bold hover:underline font-mono inline-block pt-1">
                  Değerleme Studio'da Aç →
                </Link>
              </div>
            </div>

            <div className="slate-card slate-card-hover rounded-2xl overflow-hidden p-4 space-y-3">
              <div className="h-48 rounded-xl overflow-hidden relative border border-slate-200">
                <img src="/images/bmw.jpg" alt="BMW M3" className="w-full h-full object-cover" />
                <span className="absolute top-3 right-3 px-2.5 py-1 bg-blue-600 text-white font-bold text-[11px] rounded-lg font-mono">
                  BMW
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900">2022 BMW M3 Performance</h3>
                <p className="text-xs text-slate-500">Tahmini değer: <strong className="text-slate-900">$42,800 USD</strong></p>
                <Link href="/valuation" className="text-xs text-blue-600 font-bold hover:underline font-mono inline-block pt-1">
                  Değerleme Studio'da Aç →
                </Link>
              </div>
            </div>

            <div className="slate-card slate-card-hover rounded-2xl overflow-hidden p-4 space-y-3">
              <div className="h-48 rounded-xl overflow-hidden relative border border-slate-200">
                <img src="/images/toyota.jpg" alt="Toyota Supra" className="w-full h-full object-cover" />
                <span className="absolute top-3 right-3 px-2.5 py-1 bg-blue-600 text-white font-bold text-[11px] rounded-lg font-mono">
                  Toyota
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900">2023 Toyota GR Supra</h3>
                <p className="text-xs text-slate-500">Tahmini değer: <strong className="text-slate-900">$54,200 USD</strong></p>
                <Link href="/valuation" className="text-xs text-blue-600 font-bold hover:underline font-mono inline-block pt-1">
                  Değerleme Studio'da Aç →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
