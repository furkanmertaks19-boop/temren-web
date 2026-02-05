"use client";
import React, { useState, useEffect } from "react";
import PageHeader from "@/components/layout/PageHeader";
import Footer from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Quote, X, Send, CheckCircle2 } from "lucide-react";
import Image from "next/image";

// Sabit Veri Seti (Videolar ve Özel Yorumlar)
const staticTestimonials = [
  {
    id: "s1",
    type: "video",
    name: "AFAD",
    role: "Röportaj • İş Birliği",
    badge: "Röportaj",
    avatar: "/afad.png",
    youtubeId: "5VmVbUpYeJ4",
    quote: "Gerçek arazi koşullarında gerçekleştirilen testlerde palet sistemi; zorlu zeminlerde yüksek çekiş, dengeli ilerleme ve araçla uyumlu sürüş karakteri sergilemiştir. Sistem, operasyonel kullanım açısından güven verici bulunmuş ve sahada etkin şekilde çalışabileceğini göstermiştir..",
    tags: ["#afad", "#temrenpaletsistemleri", "#plt12"]
  },
  {
    id: "s7",
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
    id: "s3",
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
    id: "s4",
    type: "text",
    name: "Sıddık Güney",
    role: "Üretim Müdürü",
    badge: "Müşteri Yorumu",
    avatar: "/profil.jpg",
    quote: "Gerçekten ürünler kaliteli; ilgili ekip ve hizmet kalitesi harika. İletişimleri de örnek alınacak seviyede.",
    tags: ["#Kalite", "#Hizmet"]
  },
  {
    id: "s5",
    type: "text",
    name: "Ahmet U.",
    role: "Üretim Müdürü",
    badge: "Müşteri Yorumu",
    avatar: "/profil.jpg",
    quote: "Temren Makina’nın vakumlu tablası, üretim süreçlerimizde belirgin bir fark yarattı; verimlilik gözle görülür arttı.",
    tags: ["#VakumluTabla", "#Verimlilik"]
  },
  {
    id: "s6",
    type: "text",
    name: "Ali İ.",
    role: "Operasyon Müdürü",
    badge: "Müşteri Yorumu",
    avatar: "/profil.jpg",
    quote: "Elektronik kontrol paneliyle kompresörlü vakum sistemi, enerji tasarrufunda bize ciddi katkı sağladı.",
    tags: ["#EnerjiTasarrufu", "#Vakum"]
  }
];

export default function MusteriGorusleri() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [dbComments, setDbComments] = useState<any[]>([]);
  
  // Form State
  const [formData, setFormData] = useState({ name: "", quote: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    fetchApprovedComments();
  }, []);

  // Onaylı yorumları veritabanından çek
  const fetchApprovedComments = async () => {
    try {
      const res = await fetch('/api/comments');
      if (res.ok) {
        const data = await res.json();
        setDbComments(data);
      }
    } catch (error) {
      console.error("Yorumlar yüklenirken hata:", error);
    }
  };

  // Yeni yorum gönderimi
 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  try {
    const res = await fetch('/api/comments', { // ❗ Buradaki yol /api/comments olmalı
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setShowSuccess(true);
      setFormData({ name: "", quote: "" });
    } else {
      console.error("API Hatası:", await res.text());
    }
  } catch (error) {
    console.error("Bağlantı Hatası:", error);
  } finally {
    setIsSubmitting(false);
  }
};
  const handleVideoOpen = (id: string | undefined) => {
    if (id) setSelectedVideo(id);
  };

  if (!isMounted) return null;

  // Veritabanı yorumlarını ve statik yorumları birleştir
  const allTestimonials = [...dbComments, ...staticTestimonials];

  return (
    <div className="bg-white min-h-screen">
      <PageHeader title="MÜŞTERİ GÖRÜŞLERİ" subtitle="DENEYİM VE GÜVEN" />

      <main className="py-24">
        <div className="container mx-auto px-8">
          
          <div className="flex flex-col lg:flex-row gap-16 mb-24">
            {/* Başlık Alanı */}
            <div className="lg:w-1/2">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="flex items-center gap-4 mb-6">
                <div className="w-12 h-0.5 bg-[#FF4D00]" />
                <span className="text-[#FF4D00] font-black text-xs tracking-[0.4em] uppercase italic">Geri Bildirimler</span>
              </motion.div>
              <h2 className="text-slate-900 text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
                SİZİN <br /> <span className="text-slate-300">DENEYİMİNİZ.</span>
              </h2>
            </div>

            {/* Yorum Yapma Formu */}
            <div className="lg:w-1/2">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-slate-50 p-8 rounded-[40px] border border-slate-100 shadow-sm"
              >
                <AnimatePresence mode="wait">
                  {!showSuccess ? (
                    <motion.form 
                      key="comment-form"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      onSubmit={handleSubmit} className="space-y-4"
                    >
                      <h3 className="text-xl font-black uppercase italic mb-6">Görüşlerinizi Paylaşın</h3>
                      <input 
                        type="text" 
                        placeholder="Adınız Soyadınız / Firma" 
                        required
                        className="w-full p-4 bg-white rounded-2xl outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-[#FF4D00] transition-all"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                      <textarea 
                        placeholder="Deneyiminizi buraya yazın..." 
                        required
                        rows={3}
                        className="w-full p-4 bg-white rounded-2xl outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-[#FF4D00] transition-all"
                        value={formData.quote}
                        onChange={(e) => setFormData({...formData, quote: e.target.value})}
                      />
                      <button 
                        disabled={isSubmitting}
                        className="w-full py-4 bg-black text-white font-black text-xs tracking-widest uppercase rounded-2xl flex items-center justify-center gap-3 hover:bg-[#FF4D00] transition-all disabled:opacity-50"
                      >
                        {isSubmitting ? "GÖNDERİLİYOR..." : <><Send size={16}/> GÖNDER</>}
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div 
                      key="success-message"
                      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 size={32} />
                      </div>
                      <h3 className="text-xl font-black uppercase mb-2">Teşekkürler!</h3>
                      <p className="text-slate-500 italic text-sm">Yorumunuz yönetici  onayından sonra yayınlanacaktır.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {allTestimonials.map((item, idx) => {
  // Veritabanından gelen veri tipini kontrol et (video mu text mi?)
  const isVideo = item.type === 'video' && item.youtubeId;

  return (
    <motion.div
      key={item._id || idx}
      className={`break-inside-avoid relative p-8 rounded-[40px] border transition-all duration-500 group ${
        isVideo 
        ? 'bg-slate-950 border-slate-800 text-white shadow-2xl' 
        : 'bg-slate-50 border-slate-100 text-slate-900 shadow-sm'
      }`}
    >
      {/* Badge Alanı */}
      <div className="flex justify-between items-start mb-8">
        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase ${
          isVideo ? 'bg-[#FF4D00] text-white' : 'bg-white text-slate-400 border border-slate-100'
        }`}>
          {isVideo ? "Video Yorum" : "Müşteri Yorumu"}
        </span>
        {isVideo ? <Play className="text-[#FF4D00]" size={24} /> : <Quote className="text-slate-200" size={32} />}
      </div>

      <p className={`text-lg font-medium mb-10 italic ${isVideo ? 'text-slate-300' : 'text-slate-600'}`}>
        "{item.quote}"
      </p>

      {/* 🚀 VİDEO ÖNİZLEME ALANI (Eğer Video ise Göster) */}
      {isVideo && (
        <button 
          onClick={() => setSelectedVideo(item.youtubeId)}
          className="w-full mb-8 relative aspect-video rounded-3xl overflow-hidden group/video shadow-lg"
        >
          <Image 
            src={`https://img.youtube.com/vi/${item.youtubeId}/maxresdefault.jpg`} 
            alt={item.name} 
            fill 
            className="object-cover opacity-60 group-hover/video:scale-105 transition-transform duration-700"
            unoptimized // YouTube resimleri için Next.js optimizasyonunu kapatabilirsin
          />
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/20 group-hover/video:bg-[#FF4D00]/20 transition-colors">
            <div className="w-14 h-14 bg-[#FF4D00] rounded-full flex items-center justify-center shadow-2xl">
              <Play size={24} fill="white" className="ml-1" />
            </div>
          </div>
        </button>
      )}

      {/* Profil Bilgisi */}
      <div className="flex items-center gap-4 border-t border-black/5 pt-6">
        <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-[#FF4D00]/20 bg-white">
          <Image src={item.avatar || "/profil.jpg"} alt={item.name} fill className="object-cover" />
        </div>
        <div>
          <h4 className={`font-black text-sm uppercase ${isVideo ? 'text-white' : 'text-slate-900'}`}>{item.name}</h4>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.role || "Müşteri"}</p>
        </div>
      </div>
    </motion.div>
  );
})}
          </div>
        </div>
      </main>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <div className="fixed inset-0 z-1000 flex items-center justify-center p-6 lg:p-24">
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