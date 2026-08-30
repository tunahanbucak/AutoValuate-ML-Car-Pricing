'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Car, Menu, X, ArrowRight, ArrowLeftRight } from 'lucide-react';

interface NavbarProps {
  isBackendConnected?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isBackendConnected = true }) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Değerleme Studio', href: '/valuation' },
    { name: 'Araç Karşılaştırma', href: '/compare', badge: 'YENİ' },
    { name: 'ML Analitik', href: '/analytics' },
    { name: 'Sistem Mimarisi', href: '/architecture' },
  ];

  return (
    <header className="w-full bg-white/90 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo & Status */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20">
            <Car className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-base font-black tracking-tight text-slate-900 font-mono">
                AUTOVALUATE<span className="text-blue-600">.AI</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                FastAPI Live
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                }`}
              >
                {link.name}
                {link.badge && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${isActive ? 'bg-white text-blue-700 font-extrabold' : 'bg-blue-100 text-blue-800'}`}>
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <Link
            href="/compare"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-md shadow-blue-500/20 font-mono"
          >
            <ArrowLeftRight className="w-4 h-4" />
            <span>Karşılaştır</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-800 shrink-0"
          aria-label="Menüyü Aç"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-5 space-y-3 shadow-xl">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  pathname === link.href
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100">
            <Link
              href="/compare"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-4 py-3.5 bg-blue-600 text-white text-sm font-black rounded-xl shadow-md shadow-blue-500/20 font-mono"
            >
              <ArrowLeftRight className="w-4 h-4" />
              <span>ARAÇLARI KARŞILAŞTIR</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
