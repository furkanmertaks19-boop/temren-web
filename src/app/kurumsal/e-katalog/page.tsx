"use client";
import React from "react";
import PageHeader from "@/components/layout/PageHeader";
import { motion } from "framer-motion";
import { FileText, Eye, Download, Globe2, ArrowRight } from "lucide-react";
import Footer from "@/components/layout/Footer";

const catalogs = [
  {
    id: 1,
    title: "Palet Sistemleri",
    file: "/dokumanlar/palet.pdf",
    category: "SAVUNMA & LOJİSTİK",
    year: "2024"
  },
  {
    id: 2,
    title: "Üretim Ekipmanlarımız",
    file: "/dokumanlar/uretim.pdf",
    category: "ENDÜSTRİYEL ÜRETİM",
    year: "2024"
  }
];

export default function EKatalog() {
  return (
    <div className="bg-white min-h-screen">
      <PageHeader title="E-KATALOG" subtitle="DİJİTAL DOKÜMANTASYON" />

      <main className="py-24">
        <div className="container mx-auto px-8">
          
          {/* Başlık Alanı */}
          <div className="max-w-4xl mb-20">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-12 h-[2px] bg-[#FF4D00]" />
              <span className="text-[#FF4D00] font-black text-xs tracking-[0.4em] uppercase italic">Yayınlar</span>
            </motion.div>
            <h2 className="text-slate-900 text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
              MÜHENDİSLİĞİ <br /> <span className="text-slate-300">KEŞFEDİN.</span>
            </h2>
            <p className="text-slate-500 text-lg font-medium max-w-2xl leading-relaxed">
              Ürün gruplarımıza ve üretim kabiliyetlerimize ait teknik detayları içeren dijital kataloglarımızı inceleyebilir veya cihazınıza indirebilirsiniz.
            </p>
          </div>

          {/* Katalog Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
            {catalogs.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative flex flex-col md:flex-row bg-slate-50 rounded-[48px] overflow-hidden border border-slate-100 transition-all duration-500 hover:shadow-2xl hover:border-[#FF4D00]/20"
              >
                {/* PDF Önizleme Alanı (Iframe) */}
                <div className="w-full md:w-1/2 aspect-[3/4] md:aspect-auto relative bg-slate-200 overflow-hidden">
                  <iframe 
                    src={`${item.file}#toolbar=0&navpanes=0&scrollbar=0`}
                    className="w-full h-full pointer-events-none scale-110 grayscale group-hover:grayscale-0 transition-all duration-700"
                    title={item.title}
                  />
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors" />
                  <div className="absolute top-8 left-8 bg-[#FF4D00] text-white px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase">
                    PDF
                  </div>
                </div>

                {/* İçerik Alanı */}
                <div className="w-full md:w-1/2 p-12 flex flex-col justify-between">
                  <div>
                    <span className="text-[#FF4D00] font-black text-[10px] tracking-widest uppercase mb-2 block">{item.category}</span>
                    <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-6 group-hover:text-[#FF4D00] transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-4 text-slate-400 text-xs font-bold">
                      <span>REV: {item.year}</span>
                      <div className="w-1 h-1 rounded-full bg-slate-300" />
                      <span>TÜRKÇE</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 mt-12">
                    <a 
                      href={item.file} 
                      target="_blank"
                      className="flex items-center justify-between w-full px-8 py-5 bg-white border border-slate-200 rounded-2xl text-slate-900 font-black text-[10px] tracking-widest uppercase hover:bg-slate-900 hover:text-white transition-all group/btn"
                    >
                      Kataloğu Aç <Eye size={18} className="text-[#FF4D00] group-hover/btn:scale-125 transition-transform" />
                    </a>
                    <a 
                      href={item.file} 
                      download
                      className="flex items-center justify-between w-full px-8 py-5 bg-[#FF4D00] rounded-2xl text-white font-black text-[10px] tracking-widest uppercase hover:bg-slate-900 transition-all"
                    >
                      Dosyayı İndir <Download size={18} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* English Catalog Section - VIP Tasarım */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="absolute -top-10 -left-10 text-slate-50 font-black text-[150px] leading-none select-none pointer-events-none z-0">
              ENG
            </div>
            <a 
              href="/dokumanlar/eng-katalog.pdf" 
              target="_blank"
              className="relative z-10 flex flex-col md:flex-row items-center justify-between p-12 md:p-20 bg-slate-950 rounded-[64px] group overflow-hidden"
            >
              <div className="flex items-center gap-10">
                <div className="w-24 h-24 bg-[#FF4D00] rounded-[28px] flex items-center justify-center text-white shadow-[0_15px_40px_rgba(255,77,0,0.3)] group-hover:rotate-12 transition-transform duration-500">
                  <Globe2 size={48} />
                </div>
                <div>
                  <h4 className="text-white text-5xl font-black uppercase tracking-tighter mb-4">English Catalog</h4>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-[2px] bg-[#FF4D00]" />
                    <p className="text-slate-400 font-bold tracking-widest text-[10px] uppercase group-hover:text-white transition-colors">
                      Click here to access our global documentation
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-10 md:mt-0 flex items-center gap-6">
                 <span className="text-white font-black text-xs tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-all translate-x-10 group-hover:translate-x-0">View Now</span>
                 <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center text-white group-hover:bg-[#FF4D00] group-hover:border-[#FF4D00] transition-all">
                   <ArrowRight size={32} />
                 </div>
              </div>
              
              {/* Dekoratif Işık */}
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#FF4D00]/5 to-transparent pointer-events-none" />
            </a>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
}