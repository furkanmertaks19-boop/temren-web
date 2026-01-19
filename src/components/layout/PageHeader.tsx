"use client";
import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="relative h-[45vh] min-h-[400px] bg-slate-900 flex items-center overflow-hidden">
      {/* Arka Plan Görseli - public/slider1.jpg */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center grayscale opacity-40 scale-110" 
          style={{ backgroundImage: "url('/slider1.jpg')" }}
        />
        {/* Turuncu ve Siyah Karışımı Sinematik Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/10" />
      </div>
      
      <div className="container mx-auto px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          {/* Turuncu Çizgi ve Slogan Alanı */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-[2px] bg-[#FF4D00]" />
            <span className="text-[#FF4D00] font-black text-xs tracking-[0.5em] uppercase">
              {subtitle}
            </span>
          </div>

          {/* Sayfa Başlığı */}
          <h1 className="text-white text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] drop-shadow-lg">
            {title}
          </h1>

          {/* Dekoratif Alt Şerit */}
          <div className="mt-8 flex items-center gap-6 opacity-30">
             <div className="h-px w-24 bg-white" />
             <span className="text-white text-[9px] font-black tracking-[0.4em] uppercase whitespace-nowrap">
               Temren Makina Precision
             </span>
          </div>
        </motion.div>
      </div>

      {/* TUSAŞ Stili Sağ Alt Arka Plan Yazısı */}
      <div className="absolute bottom-[-20px] right-[-20px] select-none opacity-[0.03] pointer-events-none hidden lg:block">
        <span className="text-white text-[250px] font-black leading-none uppercase tracking-tighter">
          {title.split(' ')[0]}
        </span>
      </div>
    </section>
  );
}