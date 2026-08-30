'use client';

import React from 'react';
import { Car } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-slate-200 py-8 text-xs text-slate-500 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Car className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-bold text-slate-900 font-mono">AUTOVALUATE.AI</span>
          <span className="text-slate-400 text-[11px]">— Python FastAPI & Next.js 16</span>
        </div>

        <p>© 2026 AutoValuate AI. Geliştirici: Tunahan Buçak</p>
      </div>
    </footer>
  );
};
