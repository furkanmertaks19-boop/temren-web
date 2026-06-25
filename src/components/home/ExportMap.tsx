"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Globe as GlobeIcon, MapPin, ArrowUpRight } from "lucide-react";

const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-[#020617] animate-pulse" />,
});

type ExportPoint = {
  name: string;
  lat: number;
  lng: number;
  color: string;
};

const EXPORT_DATA: ExportPoint[] = [
  { name: "BELÇİKA", lat: 50.8, lng: 4.3, color: "#FF4D00" },
  { name: "KAZAKİSTAN", lat: 48.0, lng: 66.9, color: "#22c55e" },
  { name: "İSPANYA", lat: 40.4, lng: -3.7, color: "#38bdf8" },
  { name: "ALMANYA", lat: 51.1, lng: 10.4, color: "#f97316" },
  { name: "AVUSTURYA", lat: 47.5, lng: 14.5, color: "#fb7185" },
];

const ANKARA = { lat: 39.93, lng: 32.85 };
const ALTITUDES = [0.18, 0.26, 0.14, 0.22, 0.17];

const GLOBE_TEXTURE =
  "https://cdn.jsdelivr.net/npm/three-globe@2.45.0/example/img/earth-blue-marble.jpg";
const GLOBE_BUMP =
  "https://cdn.jsdelivr.net/npm/three-globe@2.45.0/example/img/earth-topology.png";

export default function ExportMap() {
  const globeRef = useRef<any>(null);
  const [mounted, setMounted] = useState(false);

  const { ref: sectionRef, inView } = useInView({
    rootMargin: "200px 0px",
    triggerOnce: true,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !inView || !globeRef.current) return;

    globeRef.current.pointOfView({ lat: 35, lng: 35, altitude: 2.2 }, 900);

    const controls = globeRef.current.controls();
    if (controls) {
      controls.autoRotate = true;
    }
  }, [mounted, inView]);

  useEffect(() => {
    if (!globeRef.current) return;
    const controls = globeRef.current.controls();
    if (controls) {
      controls.autoRotate = inView;
    }
  }, [inView]);

  const arcsData = useMemo(
    () =>
      EXPORT_DATA.map((dest, i) => ({
        startLat: ANKARA.lat,
        startLng: ANKARA.lng,
        endLat: dest.lat,
        endLng: dest.lng,
        color: dest.color,
        altitude: ALTITUDES[i % ALTITUDES.length],
      })),
    []
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#020617] overflow-hidden flex flex-col lg:flex-row border-t border-white/5"
    >
      <div className="w-full lg:w-[40%] p-10 lg:p-24 flex flex-col justify-center z-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <GlobeIcon className="text-[#FF4D00]" size={18} />
            <span className="text-[#FF4D00] text-[10px] font-black tracking-[0.5em] uppercase">
              Küresel İhracat
            </span>
          </div>

          <h2 className="text-white text-5xl lg:text-8xl font-black tracking-tighter leading-[0.85] uppercase mb-10">
            ANKARA&apos;DAN <br /> <span className="text-gray-600">DÜNYAYA</span>
          </h2>

          <div className="space-y-10 max-w-md">
            <p className="text-gray-400 text-sm leading-relaxed italic border-l-2 border-white/10 pl-6">
              Temren Makina, yerli mühendislik kabiliyetlerini Avrupa ve Asya pazarlarındaki
              stratejik noktalara ihraç etmektedir.
            </p>

            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
              {EXPORT_DATA.map((country) => (
                <div key={country.name} className="flex items-center gap-3 group">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: country.color }}
                  />
                  <span className="text-white font-bold text-[11px] tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                    {country.name}
                  </span>
                </div>
              ))}
            </div>

            <button className="group relative flex items-center gap-6 bg-white text-black px-12 py-6 font-black text-[10px] tracking-widest uppercase transition-all hover:bg-[#FF4D00] hover:text-white">
              DETAYLI HARİTA <ArrowUpRight size={18} className="transition-transform group-hover:rotate-45" />
            </button>
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-0 lg:static lg:flex-1 h-screen lg:h-full z-10 lg:-translate-x-32 xl:-translate-x-48">
        {mounted && inView ? (
          <Globe
            ref={globeRef}
            globeImageUrl={GLOBE_TEXTURE}
            bumpImageUrl={GLOBE_BUMP}
            backgroundColor="rgba(0,0,0,0)"
            atmosphereColor="#3b82f6"
            atmosphereAltitude={0.2}
            arcsData={arcsData}
            arcColor="color"
            arcAltitude={(d: any) => d.altitude}
            arcStroke={1.2}
            arcDashLength={0.5}
            arcDashGap={0.2}
            arcDashAnimateTime={inView ? 2500 : 0}
            labelsData={EXPORT_DATA}
            labelLat={(d: any) => d.lat}
            labelLng={(d: any) => d.lng}
            labelText={(d: any) => d.name}
            labelSize={1.2}
            labelColor={() => "#ffffff"}
            labelDotRadius={0.4}
          />
        ) : (
          <div className="h-full w-full bg-[#020617] animate-pulse" />
        )}
      </div>

      <div className="absolute bottom-12 right-12 z-30 hidden xl:block">
        <div className="bg-black/30 backdrop-blur-xl border border-white/10 p-8 rounded-2xl flex items-center gap-6">
          <div className="relative">
            <MapPin className="text-[#FF4D00]" size={28} />
            <div className="absolute inset-0 bg-[#FF4D00] blur-xl opacity-40 animate-pulse" />
          </div>
          <div>
            <div className="text-[9px] font-black text-[#FF4D00] tracking-[0.3em] uppercase mb-1">
              Operasyon Merkezi
            </div>
            <div className="text-white font-bold text-sm tracking-tight italic">
              Kahramankazan / ANKARA
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
