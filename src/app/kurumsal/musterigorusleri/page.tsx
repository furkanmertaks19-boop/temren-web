"use client";
import React, { useState, useEffect } from "react";
import PageHeader from "@/components/layout/PageHeader";
import Footer from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Quote, X } from "lucide-react";
import Image from "next/image";

// Veri Seti
const testimonials = [
  {
    id: 1,
    type: "video",
    name: "TARMAKBİS",
    role: "Röportaj • İş Birliği",
    badge: "Röportaj",
    avatar: "/tarmakbis-logo.png",
    youtubeId: "qPWWUNZzz04",
    quote: "Uzaktan kumandalı ve modüler yapısıyla TİKA, farklı uygulamalarda pratik ve güvenli bir çözüm sunuyor.",
    tags: ["#TARMAKBİS", "#UGV", "#PaletliSistem"]
  },
  {
    id: 2,
    type: "video",
    name: "Gürani Ayer",
    role: "Ayer Tohumculuk / Yön. Kur. Bşk. Yrd.",
    badge: "Video Yorum",
    avatar: "/profil.jpg",
    youtubeId: "7VUhqXtfdBo",
    quote: "Palet sistemi tarlada işimizi hızlandırdı, farklı arazi koşullarında da güvenle ilerledik.",
    tags: ["#Palet", "#Tarım"]
  },
  {
    id: 3,
    type: "video",
    name: "Muhittin Hoşgör",
    role: "Mutlular Tarım / Yön. Kur. Bşk. Yrd.",
    badge: "Video Yorum",
    avatar: "/profil.jpg",
    youtubeId: "6ZOyv3LSKbE",
    quote: "Kullandığımız palet tarladaki işlerimizi ciddi şekilde kolaylaştırdı; gönül rahatlığıyla tavsiye ederim.",
    tags: ["#Palet", "#Tavsiye"]
  },
  {
    id: 4,
    type: "text",
    name: "Sıddık Güney",
    role: "Üretim Müdürü",
    badge: "Müşteri Yorumu",
    avatar: "/profil.jpg",
    quote: "Gerçekten ürünler kaliteli; ilgili ekip ve hizmet kalitesi harika. İletişimleri de örnek alınacak seviyede.",
    tags: ["#Kalite", "#Hizmet"]
  },
  {
    id: 5,
    type: "text",
    name: "Ahmet U.",
    role: "Üretim Müdürü",
    badge: "Müşteri Yorumu",
    avatar: "/profil.jpg",
    quote: "Temren Makina’nın vakumlu tablası, üretim süreçlerimizde belirgin bir fark yarattı; verimlilik gözle görülür arttı.",
    tags: ["#VakumluTabla", "#Verimlilik"]
  },
  {
    id: 6,
    type: "text",
    name: "Ali İ.",
    role: "Operasyon Müdürü",
    badge: "Müşteri Yorumu",
    avatar: "/profil.jpg",
    quote: "Elektronik kontrol paneliyle kompresörlü vakum sistemi, enerji tasarrufunda bize ciddi katkı sağladı.",
    tags: ["#EnerjiTasarrufu", "#Vakum"]
  },
  {
    id: 7,
    type: "text",
    name: "Levent D.",
    role: "Proje Yöneticisi",
    badge: "Müşteri Yorumu",
    avatar: "/profil.jpg",
    quote: "Özel üretim taleplerimizde Temren Makina ile çalıştık; sonuçtan ve süreç yönetiminden çok memnun kaldık.",
    tags: ["#ÖzelÜretim", "#Memnuniyet"]
  },
  {
    id: 8,
    type: "text",
    name: "Sezgin K.",
    role: "CNC Atölyesi Sahibi",
    badge: "Müşteri Yorumu",
    avatar: "/profil.jpg",
    quote: "Takım koniği temizleme cihazına geçtikten sonra kesici takımlarımızın performansı belirgin şekilde iyileşti.",
    tags: ["#TakımKoniği", "#Performans"]
  }
];

export default function MusteriGorusleri() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // ✅ Hydration hatasını engellemek için mount kontrolü
  useEffect(() => { 
    setIsMounted(true); 
  }, []);

  // ✅ TS Hatası Çözümü: Video Id kontrolü
  const handleVideoOpen = (id: string | undefined) => {
    if (id) setSelectedVideo(id);
  };

  if (!isMounted) return null;

  return (
    <div className="bg-white min-h-screen">
      <PageHeader title="MÜŞTERİ GÖRÜŞLERİ" subtitle="DENEYİM VE GÜVEN" />

      <main className="py-24">
        <div className="container mx-auto px-8">
          
          <div className="max-w-4xl mb-20">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[2px] bg-[#FF4D00]" />
              <span className="text-[#FF4D00] font-black text-xs tracking-[0.4em] uppercase italic">Geri Bildirimler</span>
            </motion.div>
            <h2 className="text-slate-900 text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
              SİZİN <br /> <span className="text-slate-300">DENEYİMİNİZ.</span>
            </h2>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {testimonials.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`break-inside-avoid relative p-8 rounded-[40px] border transition-all duration-500 group ${
                  item.type === 'video' 
                  ? 'bg-slate-950 border-slate-800 text-white hover:border-[#FF4D00]/50 shadow-2xl' 
                  : 'bg-slate-50 border-slate-100 text-slate-900 hover:border-[#FF4D00]/20 shadow-sm'
                }`}
              >
                <div className="flex justify-between items-start mb-8">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase ${
                    item.type === 'video' ? 'bg-[#FF4D00] text-white' : 'bg-white text-slate-400 border border-slate-100 shadow-sm'
                  }`}>
                    {item.badge}
                  </span>
                  {item.type === 'video' ? <Play className="text-[#FF4D00]" size={24} /> : <Quote className="text-slate-200 group-hover:text-[#FF4D00] transition-colors" size={32} />}
                </div>

                <p className={`text-lg font-medium mb-10 leading-relaxed italic ${item.type === 'video' ? 'text-slate-300' : 'text-slate-600'}`}>
                  "{item.quote}"
                </p>

                {item.type === 'video' && (
                  <button 
                    onClick={() => handleVideoOpen(item.youtubeId)}
                    className="w-full mb-8 relative aspect-video rounded-3xl overflow-hidden group/video shadow-lg"
                  >
                    <Image 
                      src={`https://img.youtube.com/vi/${item.youtubeId}/mqdefault.jpg`} 
                      alt={item.name} 
                      fill 
                      className="object-cover opacity-60 group-hover/video:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-950/20 group-hover/video:bg-[#FF4D00]/20 transition-colors">
                      <div className="w-14 h-14 bg-[#FF4D00] rounded-full flex items-center justify-center shadow-2xl">
                        <Play size={24} fill="white" className="ml-1" />
                      </div>
                    </div>
                  </button>
                )}

                <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                  <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-[#FF4D00]/20 bg-white">
                    <Image src={item.avatar} alt={item.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className={`font-black text-sm uppercase tracking-tighter ${item.type === 'video' ? 'text-white' : 'text-slate-900'}`}>{item.name}</h4>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <AnimatePresence>
        {selectedVideo && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 lg:p-24">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedVideo(null)} className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-5xl aspect-video rounded-[48px] overflow-hidden shadow-2xl bg-black border border-white/10">
              <button onClick={() => setSelectedVideo(null)} className="absolute top-8 right-8 text-white/50 hover:text-white z-10 transition-colors"><X size={32} /></button>
              <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`} allow="autoplay; encrypted-media" allowFullScreen />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}