'use client';

import React from 'react';
import { Cpu, CheckCircle2, Server, Layers, GitBranch } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#111319] border border-zinc-800 rounded-2xl max-w-2xl w-full p-6 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-amber-400" /> AutoValuate AI Mimarisi & Pipeline
          </h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-200 text-sm font-bold">
            ✕
          </button>
        </div>

        <div className="space-y-4 text-xs text-zinc-300 leading-relaxed font-sans">
          <div className="p-4 bg-[#0a0b0e] rounded-xl border border-zinc-800 space-y-2">
            <span className="font-bold text-amber-400 flex items-center gap-2">
              <Layers className="w-4 h-4" /> 1. Makine Öğrenmesi Hattı (Machine Learning Pipeline)
            </span>
            <p>
              1.200 adet gerçek dünya araç verisi üzerinde Pandas ile eksik veri medyan doldurma,
              <code>vehicle_age</code>, <code>km_per_year</code>, <code>hp_per_liter</code> özellik türetmeleri yapıldı.
              Linear Regression, SVR ve Random Forest modelleri yarıştırılarak <strong>%94.8 R² başarısı</strong> sağlayan Random Forest şampiyon seçildi.
            </p>
          </div>

          <div className="p-4 bg-[#0a0b0e] rounded-xl border border-zinc-800 space-y-2">
            <span className="font-bold text-emerald-400 flex items-center gap-2">
              <Server className="w-4 h-4" /> 2. Python FastAPI Backend Servisi (Port 8000)
            </span>
            <p>
              Python 3.12 + FastAPI ile asenkron REST API kuruldu. Girdileri Pydantic ile doğrular,
              StandardScaler ile ölçeklendirir ve <code>.joblib</code> uzantılı Şampiyon Model ile anlık Fiyat ($) tahmini yapar.
            </p>
          </div>

          <div className="p-4 bg-[#0a0b0e] rounded-xl border border-zinc-800 space-y-2">
            <span className="font-bold text-sky-400 flex items-center gap-2">
              <GitBranch className="w-4 h-4" /> 3. Next.js 16 + Tailwind CSS v4 Frontend
            </span>
            <p>
              Next.js 16 (App Router) + React 19 ve Tailwind CSS v4 ile Vercel/Linear estetiğinde ultra-modern araç konfigüratörü arayüzü tasarlandı.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-amber-400 text-zinc-950 text-xs font-bold rounded-xl hover:bg-amber-300 transition-all"
          >
            Kapat ve İncele
          </button>
        </div>
      </div>
    </div>
  );
};
