"use client";
import React, { useState, useEffect } from "react";
import PageHeader from "@/components/layout/PageHeader";
import Footer from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Youtube, ExternalLink, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Video Veri Seti
const videos = [
  { id: 1, youtubeId: "6vlxv1Vr7Ug", title: "TARMAKBİS TİKA Röportajı", desc: "Uzaktan Kumandalı Modüler Paletli Araç Tanıtımı", badge: "TİKA", category: "PALET" },
  { id: 2, youtubeId: "bekG6AthG44", title: "Erkunt Traktör ile Gerçek Arazi Testi", desc: "Gerçek arazi koşullarında test edildi, farkını ortaya koydu.", badge: "Palet", category: "PALET" },
  { id: 3, youtubeId: "AofiHUGvVMU", title: "TİKA", desc: "Uzaktan Kumandalı Traktör ve Palet Sistemleri", badge: "TİKA", category: "PALET" },
  { id: 4, youtubeId: "7VUhqXtfdBo", title: "Temren Makina Palet Sistemleri", desc: "Ayer Tohumculuk Palet Müşteri Deneyimi", badge: "Palet", category: "MÜŞTERİ" },
  { id: 5, youtubeId: "6ZOyv3LSKbE", title: "Temren Makina Palet Sistemleri", desc: "Mutlular Tarım Palet Müşteri Deneyimi", badge: "Müşteri", category: "MÜŞTERİ" }, 
  { id: 7, youtubeId: "qnnbb51zp4Q", title: "Doğan Kabak ile Test Sürüşü", desc: "Arazide yepyeni bir deneyim", badge: "Test", category: "PALET" },
  { id: 8, youtubeId: "038aEHmegcc", title: "Araç Palet Sistemi", desc: "Arazide yepyeni bir deneyim", badge: "Arazide", category: "PALET" },
  { id: 9, youtubeId: "lq20v0-Nhgo", title: "Doğru Tork ile Sıkma", desc: "Takım Sıkma Mekanizması", badge: "Üretim", category: "ÜRETİM" },
  { id: 10, youtubeId: "lq20v0-Nhgo", title: "Maksimum Vakum Gücü", desc: "Elektronik kontrol paneli ile", badge: "Üretim", category: "ÜRETİM" }
];

const categories = ["HEPSİ", "PALET", "MÜŞTERİ", "ÜRETİM", "TİKA"];

export default function VideoGaleri() {
  const [filter, setFilter] = useState("HEPSİ");
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => { setIsMounted(true); }, []);

  const filteredVideos = filter === "HEPSİ" 
    ? videos 
    : videos.filter(v => v.category === filter);

  if (!isMounted) return null;

  return (
    <div className="bg-white min-h-screen">
      <PageHeader title="VİDEO GALERİ" subtitle="TEKNOLOJİ HAREKET HALİNDE" />

      <main className="py-24">
        <div className="container mx-auto px-8">
          
          {/* Filtreleme Bölümü */}
          <div className="flex flex-wrap justify-center gap-4 mb-20">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-8 py-3 rounded-2xl text-[10px] font-black tracking-[0.2em] uppercase transition-all ${
                  filter === cat 
                  ? "bg-[#FF4D00] text-white shadow-xl shadow-[#FF4D00]/20" 
                  : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Video Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence mode="popLayout">
              {filteredVideos.map((video) => (
                <motion.div
                  key={video.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group relative bg-slate-50 rounded-[40px] overflow-hidden border border-slate-100 transition-all hover:shadow-2xl"
                >
                  {/* Thumbnail Alanı */}
                  <div className="relative aspect-video overflow-hidden bg-slate-200">
                    {video.type === "link" ? (
                      <Link href={video.url || "#"} className="block w-full h-full">
                        <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center text-white gap-4">
                           <Video size={48} className="text-[#FF4D00]" />
                           <span className="text-[10px] font-black tracking-widest uppercase">Sayfaya Git</span>
                        </div>
                      </Link>
                    ) : (
                      <>
                        <Image 
                          src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`} 
                          alt={video.title} 
                          fill 
                          className="object-cover opacity-80 group-hover:scale-110 transition-transform duration-700"
                        />
                        <button 
                          onClick={() => video.youtubeId && setSelectedVideo(video.youtubeId)}
                          className="absolute inset-0 flex items-center justify-center bg-slate-950/20 group-hover:bg-[#FF4D00]/20 transition-colors"
                        >
                          <div className="w-16 h-16 bg-[#FF4D00] rounded-full flex items-center justify-center text-white shadow-2xl scale-90 group-hover:scale-100 transition-transform">
                            <Play fill="white" size={24} className="ml-1" />
                          </div>
                        </button>
                      </>
                    )}
                    
                    <div className="absolute top-6 right-6">
                      <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase text-slate-900 shadow-sm">
                        {video.badge}
                      </span>
                    </div>
                  </div>

                  {/* Detay Alanı */}
                  <div className="p-10">
                    <div className="flex items-center gap-3 mb-4 opacity-40">
                      <Youtube size={16} />
                      <span className="text-[10px] font-black tracking-[0.3em] uppercase">{video.category}</span>
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-4 group-hover:text-[#FF4D00] transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-slate-500 font-medium text-sm italic leading-relaxed">
                      {video.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-6 md:p-12"
          >
            <button onClick={() => setSelectedVideo(null)} className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
              <X size={40} />
            </button>
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="relative w-full max-w-5xl aspect-video rounded-[40px] overflow-hidden shadow-2xl bg-black border border-white/10"
            >
              <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`} allow="autoplay; encrypted-media" allowFullScreen />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}