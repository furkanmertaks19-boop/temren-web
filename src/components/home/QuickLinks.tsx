"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type QuickCard = {
  title: string;
  subtitle: string;
  href: string;
  image: string;
  accent?: "orange" | "slate" | "blue";
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const wrap: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

// ✅ Dosya yolları image_5da148.png hiyerarşisine göre "/" ana dizinine çekildi
const cards: QuickCard[] = [
  {
    title: "PALET SİSTEMLERİ",
    subtitle: "Traktör & araç palet çözümleri",
    href: "/urunler/palet-sistemleri", // ✅ src/app/urunler/palet-sistemleri/page.tsx varsa doğru
    image: "/aracpalet.png",
    accent: "orange",
  },
  {
    title: "TARIM ARACI",
    subtitle: "Uzaktan kumandalı platformlar & ataşmanlar",
    href: "/urunler/tika", // 
    image: "/tarimaraci.png",
    accent: "slate",
  },
  {
    title: "ÜRETİM EKİPMANLARI",
    subtitle: "Vakumlu tabla, takım sıkma, emülsiyon sistemleri",
    href: "/faaliyet/uretim", //  
    image: "/deneme.png",
    accent: "blue",
  },
];

function accentClasses(accent: QuickCard["accent"]) {
  switch (accent) {
    case "blue":
      return {
        border: "group-hover:border-blue-500/30",
        glow: "group-hover:shadow-blue-500/20",
        btn: "group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600",
        overlay: "from-blue-900/80 via-blue-900/40 to-transparent",
        pill: "text-blue-600",
      };
    case "slate":
      return {
        border: "group-hover:border-slate-900/30",
        glow: "group-hover:shadow-slate-900/20",
        btn: "group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900",
        overlay: "from-slate-950/90 via-slate-900/40 to-transparent",
        pill: "text-slate-900",
      };
    case "orange":
    default:
      return {
        border: "group-hover:border-[#FF4D00]/40",
        glow: "group-hover:shadow-orange-500/20",
        btn: "group-hover:bg-[#FF4D00] group-hover:text-white group-hover:border-[#FF4D00]",
        overlay: "from-[#FF4D00]/80 via-[#FF4D00]/30 to-transparent",
        pill: "text-[#FF4D00]",
      };
  }
}

export default function QuickLinks() {
  return (
    <section className="w-full bg-white border-t border-gray-100">
      <div className="relative">
        {/* Sol dikey şerit - image_5166a8.jpg tarzı */}
        <div className="hidden xl:block absolute left-0 top-0 bottom-0 w-[92px] border-r border-gray-100 bg-white z-20">
          <div className="h-full flex items-center justify-center">
            <div className="rotate-[-90deg] text-[12px] font-black tracking-[0.55em] text-slate-900/80 uppercase whitespace-nowrap">
              Hizli Linkler
            </div>
          </div>
        </div>

        <div className="xl:pl-[92px]">
          <div className="container mx-auto px-6 py-24">
            {/* Başlık Bölümü */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
              className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-[2px] w-12 bg-[#FF4D00]" />
                  <span className="text-[#FF4D00] text-[11px] font-black tracking-[0.45em] uppercase">
                    Hizli Erişim
                  </span>
                </div>
                <h2 className="text-slate-900 text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
                  Hızlı <br /> <span className="text-gray-300">Kategori</span>
                </h2>
              </div>
              <p className="max-w-md text-sm text-gray-500 leading-relaxed border-l border-gray-200 pl-8 italic font-medium">
                Sektörel uzmanlığımızı ve teknolojik altyapımızı, her alanda en yüksek hassasiyetle uyguluyoruz.
              </p>
            </motion.div>

            {/* Kartlar Izgarası */}
            <motion.div
              variants={wrap}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-px bg-gray-100 border border-gray-100 shadow-2xl"
            >
              {cards.map((c, idx) => {
                const a = accentClasses(c.accent);
                return (
                  <motion.div
                    key={c.title}
                    variants={item}
                    className="group relative bg-white overflow-hidden min-h-[580px] transition-all duration-700 ease-in-out"
                  >
                    {/* Görsel Katmanı - Grayscale'den Renkli'ye Geçiş */}
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={c.image}
                        alt={c.title}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-1000 ease-in-out"
                        priority={idx === 0}
                      />
                      {/* TUSAŞ stili hafif karartma overlay */}
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-700" />
                      {/* Hover Renk Geçişi */}
                      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-t ${a.overlay}`} />
                    </div>

                    {/* İçerik Katmanı */}
                    <div className="relative z-10 h-full p-10 flex flex-col justify-between">
                      {/* Üst Badge */}
                      <div className="flex justify-between items-start">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md px-4 py-2 transition-all group-hover:border-white/50 group-hover:bg-white/20">
                          <span className="text-[10px] font-black tracking-widest text-white">0{idx + 1}</span>
                          <div className="w-1 h-1 rounded-full bg-white/50" />
                          <span className="text-[10px] font-black tracking-widest text-white uppercase">Temren</span>
                        </div>
                      </div>

                      {/* Alt Bilgiler */}
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <h3 className="text-white text-3xl md:text-4xl font-black tracking-tighter uppercase leading-tight drop-shadow-2xl">
                            {c.title}
                          </h3>
                          <p className="text-white/70 text-sm leading-relaxed max-w-[30ch] group-hover:text-white transition-colors duration-500">
                            {c.subtitle}
                          </p>
                        </div>

                        <div className="flex items-center gap-6 pt-4">
                          <Link
                            href={c.href}
                            className={`inline-flex items-center gap-3 px-8 py-4 border border-white/30 text-[10px] font-black tracking-[0.3em] uppercase text-white bg-white/5 backdrop-blur-sm transition-all duration-500 ${a.btn}`}
                          >
                            İncele <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-500" />
                          </Link>
                          <div className="h-px flex-1 bg-white/20 group-hover:bg-white/40 transition-colors duration-700" />
                        </div>
                      </div>
                    </div>

                    {/* Alt Çizgi Vurgusu */}
                    <div className="absolute bottom-0 left-0 w-0 h-2 bg-[#FF4D00] group-hover:w-full transition-all duration-700" />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
