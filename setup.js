const fs = require('fs');
const path = require('path');

const products = [
  "vakum-tablasi",
  "vortex-tupu",
  "takim-sikma",
  "konik-temizleme",
  "mini-takim-boy-olcer",
  "byk1000",
  "byk500"
];

const baseDir = path.join(__dirname, 'src', 'app', 'urunler', 'uretim');

products.forEach(slug => {
  const dirPath = path.join(baseDir, slug);

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const className = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
  const displayName = slug.toUpperCase().replace(/-/g, ' ');

  const content = `"use client";
import React from "react";
import PageHeader from "@/components/layout/PageHeader";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { Settings, ShieldCheck, Zap } from "lucide-react";

export default function ${className}Page() {
    return (
        <div className="bg-white min-h-screen font-sans">
            <PageHeader title="ÜRETİM GRUBU" subtitle="${displayName}" />
            
            <main className="py-24 container mx-auto px-8 lg:px-20">
                <div className="flex flex-col lg:flex-row gap-20 items-center">
                    <div className="lg:w-1/2 relative aspect-square rounded-[80px] overflow-hidden shadow-2xl border-8 border-slate-50 group">
                        <Image 
                            src="/images/uretim/${slug}.jpg" 
                            alt="${slug}" 
                            fill 
                            className="object-cover group-hover:scale-105 transition-transform duration-1000"
                        />
                    </div>

                    <div className="lg:w-1/2">
                        <span className="text-[#FF4D00] font-black uppercase italic tracking-widest text-sm mb-4 block">Hassas Mühendislik</span>
                        <h1 className="text-6xl font-black tracking-tighter uppercase italic text-slate-900 mb-8 leading-none">
                            ${displayName}
                        </h1>
                        <p className="text-slate-500 font-medium italic leading-relaxed text-lg mb-12">
                            Temren Makina güvencesiyle üretilen yüksek performanslı endüstriyel çözüm.
                        </p>

                        <div className="bg-slate-50 rounded-[50px] p-12 border border-slate-100">
                            <h4 className="flex items-center gap-3 font-black italic text-slate-900 uppercase tracking-tight text-xl mb-8">
                                <Settings className="text-[#FF4D00]" size={24} /> TEKNİK ÖZELLİKLER
                            </h4>
                            <div className="space-y-4">
                                <div className="flex justify-between py-4 border-b border-slate-200">
                                    <span className="text-[11px] font-black uppercase italic text-slate-400 tracking-widest">Ürün Kodu</span>
                                    <span className="text-sm font-black uppercase italic text-slate-900">TM-${slug.toUpperCase().substring(0, 3)}</span>
                                </div>
                                <div className="flex justify-between py-4">
                                    <span className="text-[11px] font-black uppercase italic text-slate-400 tracking-widest">Garanti</span>
                                    <span className="text-sm font-black uppercase italic text-slate-900">2 Yıl</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
`;

  fs.writeFileSync(path.join(dirPath, 'page.tsx'), content);
  console.log(`✅ Oluşturuldu: ${slug}`);
});