"use client";
import React, { useState, useEffect } from "react";
import PageHeader from "@/components/layout/PageHeader";
import Footer from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, ChevronRight, ChevronLeft } from "lucide-react";
import Image from "next/image";

// Sadece sizin resim klasörünüzdeki dosyalarla oluşturulan veri seti
const galleryImages = [
  // Fuar Serisi (image_cee532)
  ...Array.from({ length: 19 }, (_, i) => ({ id: `fuar-${i + 1}`, src: `/galeri/fuar${i + 1}.webp`, category: "FUAR" })),
  // AP Serisi (image_cee532)
  ...Array.from({ length: 4 }, (_, i) => ({ id: `ap-${i + 1}`, src: `/galeri/ap-${i + 1}.webp`, category: "ÜRETİM" })),
  // PLT12 Serisi (image_cee552)
  ...Array.from({ length: 14 }, (_, i) => ({ id: `plt12-${i + 1}`, src: `/galeri/plt12-${i + 1}.${i + 1 === 3 || i + 1 === 9 || i + 1 === 12 ? 'jpg' : 'webp'}`, category: "PALET" })),
  // TİKA Serisi (image_cee552)
  { id: "tika-1", src: "/galeri/tika1.jpg", category: "SAVUNMA" },
  { id: "tika-2", src: "/galeri/tika2.webp", category: "SAVUNMA" },
  { id: "tika-3", src: "/galeri/tika3.jpg", category: "SAVUNMA" },
  { id: "tika-5", src: "/galeri/tika5.jpeg", category: "SAVUNMA" },
  ...Array.from({ length: 4 }, (_, i) => ({ id: `mini-tika-m-${i + 1}`, src: `/galeri/mini_tika_${i + 1}.jpg`, category: "SAVUNMA" })),
  ...Array.from({ length: 5 }, (_, i) => ({ id: `mini-tika-${i + 1}`, src: `/galeri/mini-tika-${i + 1}.jpg`, category: "SAVUNMA" })),
  // TİKA Ataşman ve Görseller (image_cee552)
  ...Array.from({ length: 6 }, (_, i) => ({ id: `tika-at-${i + 1}`, src: `/galeri/tika-atasman-${i + 1}.${i + 1 === 1 || i + 1 === 4 ? 'png' : 'jpg'}`, category: "SAVUNMA" })),
  ...Array.from({ length: 8 }, (_, i) => ({ id: `tika-img-${i + 1}`, src: `/galeri/tika-img${i + 1}.${i + 1 >= 4 && i + 1 <= 7 ? 'jpeg' : i + 1 === 8 ? 'png' : 'jpg'}`, category: "SAVUNMA" })),
  // TP Serisi (image_cee58a)
  ...Array.from({ length: 11 }, (_, i) => ({ id: `tp-${i + 1}`, src: `/galeri/tp-${i + 1}.webp`, category: "ÜRETİM" })),
  // UE Serisi (image_cee58a)
  ...Array.from({ length: 5 }, (_, i) => ({ id: `ue-${i + 1}`, src: `/galeri/ue-${i + 1}.webp`, category: "ÜRETİM" })),
  // Diğer (image_cee532)
  { id: "konik-3", src: "/galeri/konik_3.jpg", category: "ÜRETİM" },
];

const categories = ["HEPSİ", "SAVUNMA", "FUAR", "ÜRETİM", "PALET"];

export default function FotoGaleri() {
  const [filter, setFilter] = useState("HEPSİ");
  const [selectedImg, setSelectedImg] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => { setIsMounted(true); }, []);

  const filteredImages = filter === "HEPSİ" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  if (!isMounted) return null;

  return (
    <div className="bg-white min-h-screen">
      <PageHeader title="FOTO GALERİ" subtitle="ÜRETİM VE ETKİNLİKLER" />

      <main className="py-24">
        <div className="container mx-auto px-8">
          
          {/* Kategori Filtreleri */}
          <div className="flex flex-wrap justify-center gap-4 mb-20">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-8 py-3 rounded-2xl text-[10px] font-black tracking-[0.2em] uppercase transition-all ${
                  filter === cat 
                  ? "bg-[#FF4D00] text-white shadow-lg shadow-[#FF4D00]/20" 
                  : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Galeri Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredImages.map((img) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group relative aspect-square bg-slate-100 rounded-[32px] overflow-hidden cursor-pointer"
                  onClick={() => setSelectedImg(galleryImages.findIndex(i => i.id === img.id))}
                >
                  <Image 
                    src={img.src} 
                    alt={img.id} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-950">
                      <Maximize2 size={20} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg !== null && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <button onClick={() => setSelectedImg(null)} className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-10">
              <X size={40} />
            </button>

            <button 
              onClick={(e) => { e.stopPropagation(); setSelectedImg(prev => prev! > 0 ? prev! - 1 : galleryImages.length - 1)}}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-[#FF4D00] transition-all"
            >
              <ChevronLeft size={48} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); setSelectedImg(prev => prev! < galleryImages.length - 1 ? prev! + 1 : 0)}}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-[#FF4D00] transition-all"
            >
              <ChevronRight size={48} />
            </button>

            <div className="relative w-full h-full max-w-5xl max-h-[70vh]">
              <Image 
                src={galleryImages[selectedImg].src} 
                alt="Galeri Görseli" 
                fill 
                className="object-contain"
                priority
              />
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
                <span className="text-[#FF4D00] font-black text-[10px] tracking-widest uppercase">
                  {galleryImages[selectedImg].category} — {selectedImg + 1} / {galleryImages.length}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}