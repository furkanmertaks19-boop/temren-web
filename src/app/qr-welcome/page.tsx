"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Globe, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const languages = [
  { code: 'tr', label: 'TÜRKÇE', gif: '/tr-flag.gif' },
  { code: 'en', label: 'ENGLISH', gif: '/en-flag.gif' },
  { code: 'zh', label: 'CHINESE (中文)', gif: '/cn-flag.gif' },
];

export default function QRWelcome() {
  return (
    // Z-index ve tam ekran izolasyonu ile Header/Footer görünmez hale getirildi
    <main className="fixed inset-0 z-[9999] bg-[#0c0c0c] flex flex-col items-center justify-center p-8 overflow-hidden font-sans">
      
      {/* Arka Plan Modern Blur Efektleri */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-orange-600/20 rounded-full blur-[140px] animate-pulse" />
      <div className="absolute bottom-[-15%] left-[-10%] w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-[100px]" />

      {/* Üst Logo ve Başlık */}
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-20 text-center relative"
      >
        <h2 className="text-white font-black text-6xl italic tracking-tighter mb-4">
          TEM<span className="text-orange-500">REN</span>
        </h2>
        <div className="flex items-center justify-center gap-4">
          <div className="w-10 h-[2px] bg-orange-500" />
          <p className="text-gray-400 text-[10px] tracking-[0.8em] uppercase font-bold italic">Global Engineering</p>
          <div className="w-10 h-[2px] bg-orange-500" />
        </div>
      </motion.div>

      {/* Dil Seçim Butonları */}
      <div className="w-full max-w-[340px] space-y-4">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Globe size={16} className="text-orange-500 animate-spin-slow" />
          <span className="text-gray-500 font-black text-[11px] tracking-[0.3em] uppercase italic">Language Selection</span>
        </div>

        {languages.map((lang, index) => (
          <motion.div
            key={lang.code}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: index * 0.1, ease: "easeOut" }}
          >
            {/* Link rotası /qr-welcome/tr vb. olacak şekilde güncellendi */}
            <Link 
              href={`/qr-welcome/${lang.code}`} 
              className="group relative flex items-center justify-between bg-white/[0.03] border border-white/5 p-5 rounded-xl backdrop-blur-md hover:bg-orange-500/10 hover:border-orange-500/50 transition-all duration-500 shadow-xl"
            >
              <div className="flex items-center gap-6">
                {/* GIF Bayrak Alanı */}
                <div className="relative w-12 h-8 overflow-hidden rounded-md shadow-lg border border-white/10 group-hover:scale-110 group-hover:rotate-2 transition-transform duration-500">
                  <Image
                    src={lang.gif}
                    alt={lang.label}
                    fill
                    className="object-cover"
                    unoptimized // GIF'lerin akıcılığı için önemli
                  />
                </div>
                <span className="font-black italic tracking-[0.1em] text-sm group-hover:text-orange-500 transition-colors text-gray-100 uppercase">
                    {lang.label}
                </span>
              </div>
              
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 group-hover:bg-orange-500 group-hover:rotate-[-45deg] transition-all duration-500">
                <ArrowRight size={18} className="text-gray-400 group-hover:text-white" />
              </div>

              {/* Hover Glow Efekti */}
              <div className="absolute inset-0 rounded-xl bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Alt Bilgi - Küresel Vurgu */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 flex flex-col items-center"
      >
        <p className="text-[11px] text-gray-500 font-black tracking-[0.5em] uppercase italic mb-3">
          ALBANIA • TURKEY • CHINA
        </p>
        <div className="w-12 h-[3px] bg-orange-500 rounded-full" />
      </motion.div>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </main>
  );
}