"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Globe as GlobeIcon, MapPin, ArrowUpRight, X, Package, ShieldCheck } from "lucide-react";

const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-[#020617] animate-pulse" />,
});

const EXPORT_DATA = [
  { name: "BELÇİKA", lat: 50.8, lng: 4.3, color: "#FF4D00", product: "PLT-17  Palet Sistemi", desc: "Avrupa standartlarına tam uyumlu palet sistemimiz." },
  { name: "KAZAKİSTAN", lat: 48.0, lng: 66.9, color: "#22c55e", product: "PLT-12 Araç Palet Sistemi", desc: "Zorlu coğrafi şartlarda yüksek performanslı yerli üretim." },
  { name: "İSPANYA", lat: 40.4, lng: -3.7, color: "#38bdf8", product: "Vakumlu Hassas Tabla Sistemleri", desc: "CNC süreçleri için geliştirilmiş vakum teknolojisi." },
  { name: "ALMANYA", lat: 51.1, lng: 10.4, color: "#f97316", product: "Üretim Ekipmanları", desc: "Özel projeler için tasarlanmış, mühendislik harikası üretim destek ekipmanları." },
  { name: "AVUSTURYA", lat: 47.5, lng: 14.5, color: "#fb7185", product: "Üretim Ekipmanları", desc: "Özel projeler için tasarlanmış, mühendislik harikası üretim destek ekipmanları." },
];

const ANKARA = { lat: 39.93, lng: 32.85 };

export default function ExportMap() {
  const globeRef = useRef<any>(null);
  const [mounted, setMounted] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || !globeRef.current) return;
    globeRef.current.pointOfView({ lat: 35, lng: 35, altitude: 2.2 }, 900);
    
    // Yayların hareketi ve akıcılık için kontroller
    const controls = globeRef.current.controls();
    if (controls) {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      controls.enableDamping = true;
    }
  }, [mounted]);

  // Yay verileri ve hareket parametreleri
  const arcsData = useMemo(() => {
    return EXPORT_DATA.map((dest) => ({
      startLat: ANKARA.lat,
      startLng: ANKARA.lng,
      endLat: dest.lat,
      endLng: dest.lng,
      color: dest.color,
      // Hareketli çizgi efektini aktif eden parametreler
      dashLength: 0.5,
      dashGap: 0.2,
      dashAnimateTime: 2000 
    }));
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative w-full min-h-screen bg-[#020617] overflow-hidden flex flex-col lg:flex-row border-t border-white/5">
      
      {/* ŞIK DETAY PANELİ */}
      <AnimatePresence>
        {selectedCountry && (
          <motion.div
            initial={{ x: -500, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -500, opacity: 0 }}
            className="absolute left-0 top-0 bottom-0 w-full lg:w-[450px] bg-slate-950/90 backdrop-blur-3xl z-[100] p-12 flex flex-col justify-center border-r border-white/10"
          >
            <button onClick={() => setSelectedCountry(null)} className="absolute top-12 right-12 text-white/30 hover:text-[#FF4D00] transition-all"><X size={32} /></button>
            <div className="space-y-10">
              <h3 className="text-white text-6xl font-black tracking-tighter uppercase leading-[0.8] mb-4">{selectedCountry.name}</h3>
              <div className="h-1.5 w-24 bg-[#FF4D00] rounded-full" />
              <p className="text-slate-400 leading-relaxed font-medium text-lg italic border-l-2 border-white/5 pl-6">"{selectedCountry.desc}"</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full lg:w-[40%] p-10 lg:p-24 flex flex-col justify-center z-20">
          <h2 className="text-white text-6xl lg:text-8xl font-black tracking-tighter leading-[0.85] uppercase mb-12">ANKARA'DAN <br /> <span className="text-white/20">DÜNYAYA.</span></h2>
          <div className="space-y-3 max-w-sm text-white">
            {EXPORT_DATA.map((country, i) => (
              <button key={i} onClick={() => { setSelectedCountry(country); globeRef.current?.pointOfView({ lat: country.lat, lng: country.lng, altitude: 1.8 }, 1000); }} className="flex items-center justify-between w-full p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-[#FF4D00]/30 transition-all group uppercase tracking-widest font-black text-xs">
                {country.name} <ArrowUpRight size={18} className="text-[#FF4D00]" />
              </button>
            ))}
          </div>
      </div>

      <div className="absolute inset-0 lg:static lg:flex-1 h-screen lg:h-full z-10 lg:-translate-x-32">
        <Globe
          ref={globeRef}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          backgroundColor="rgba(0,0,0,0)"
          atmosphereColor="#FF4D00"
          atmosphereAltitude={0.25}
          // YAY HAREKETİ AYARLARI
          arcsData={arcsData}
          arcColor="color"
          arcDashLength={(d: any) => d.dashLength}
          arcDashGap={(d: any) => d.dashGap}
          arcDashAnimateTime={(d: any) => d.dashAnimateTime}
          arcStroke={1.5}
          // TÜRKÇE KARAKTER İÇİN HTML ELEMENT KULLANIMI
          htmlElementsData={EXPORT_DATA}
          htmlLat={(d: any) => d.lat}
          htmlLng={(d: any) => d.lng}
          htmlElement={(d: any) => {
            const el = document.createElement('div');
            el.innerHTML = `<div class="bg-black/60 backdrop-blur-md px-3 py-1 border border-white/20 rounded-md text-white text-[12px] font-bold uppercase whitespace-nowrap">${d.name}</div>`;
            el.style.pointerEvents = 'auto';
            el.style.cursor = 'pointer';
            el.onclick = () => { setSelectedCountry(d); globeRef.current.pointOfView({ lat: d.lat, lng: d.lng, altitude: 1.8 }, 1000); };
            return el;
          }}
        />
      </div>

      {/* ANKARA HUD */}
      <div className="absolute bottom-12 right-12 z-30 hidden xl:block">
        <div className="bg-black/40 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl flex items-center gap-8 shadow-2xl border-l-4 border-l-[#FF4D00]">
          <MapPin className="text-[#FF4D00]" size={32} />
          <div>
            <div className="text-[10px] font-black text-[#FF4D00] tracking-[0.4em] uppercase mb-1">Operasyon Merkezi</div>
            <div className="text-white font-black text-lg tracking-tight uppercase">KAHRAMANKAZAN / ANKARA</div>
          </div>
        </div>
      </div>
    </section>
  );
}