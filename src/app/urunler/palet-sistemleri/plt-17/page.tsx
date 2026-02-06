"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  ChevronDown, CheckCircle2, FileText, ArrowRight, ShieldCheck,
  Zap, Gauge, Settings, X, Layers, Sprout, Loader2, Send,
  User, Phone, Mail, MessageSquare, Camera, Maximize2
} from 'lucide-react';

export default function PLT17Page() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
  const [imgError, setImgError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  // --- FORM STATE ---
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ adSoyad: "", telefon: "", email: "", traktorModel: "", mesaj: "" });

  const mainImage = "/image/plt-17-2.png";

  const data = {
    eyebrow: "Ürün Kodu: PLT-17 Geniş Model",
    title: "PLT 17",
    fullName: "PLT-17 Geniş Temaslı Palet Sistemi",
    lead: "Geniş temaslı palet yapısı ile kaymayı azaltır; yumuşak-kaygan zeminde dahi yüksek verim sunar. Toprak yapısını koruyan özel mühendislik.",
    chips: ["Geniş temas alanı", "Düşük zemin basıncı", "Modüler taşıyıcı"],
    advantages: [
      { title: "Toprak Koruma", desc: "Geniş temasla sıkışma azalır; drenaj korunur.", icon: <Layers size={32} /> },
      { title: "Çekiş Gücü", desc: "Dengeli ve kontrollü sürüş, yüksek tork aktarımı.", icon: <Zap size={32} /> },
      { title: "Stabilite", desc: "Eğimli/gevşek zeminlerde maksimum denge.", icon: <ShieldCheck size={32} /> },
      { title: "Uzun Ömür", desc: "Dayanıklı kauçuk bileşim ve hızlı bakım.", icon: <Settings size={32} /> }
    ],
    technical: [
      { l: "Dış Boyutlar", v: "1850 × 1200 × 480 mm" },
      { l: "Net Ağırlık", v: "~650 KG (Birim)" },
      { l: "Şasi Yapısı", v: "Yüksek Dayanımlı Çelik" },
      { l: "Uyumluluk", v: "Orta Segment Traktörler" }
    ],
    gallery: [
      "/image/plt017.webp",
      "/image/plt-017-2.webp",
      "/image/plt17.webp",
      "/image/plt-17-2.png",
      "/image/plt-17-3.png",
      "/image/plt17-dik.png"
    ]
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          secim: "PLT-17 GENİŞ MODEL TALEBİ",
          mesaj: `Traktör: ${form.traktorModel} | Not: ${form.mesaj}`
        }),
      });
      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          setIsModalOpen(false);
          setSuccess(false);
          setForm({ adSoyad: "", telefon: "", email: "", traktorModel: "", mesaj: "" });
        }, 3500);
      }
    } catch (error) { alert("Bağlantı hatası!"); }
    finally { setLoading(false); }
  };

  return (
    <main className="bg-[#050505] min-h-screen relative text-white selection:bg-amber-500 selection:text-black font-sans overflow-x-hidden">

      {/* 1. HERO BACKDROP */}
      <div className="fixed inset-0 w-full h-screen z-0">
        <motion.div style={{ scale }} className="relative w-full h-full">
          {!imgError && <Image src={mainImage} alt="PLT-17" fill className="object-cover opacity-50" priority onError={() => setImgError(true)} />}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/80" />
        </motion.div>
      </div>

      <div className="relative z-10 w-full">
        {/* HERO SECTION */}
        <section className="h-screen flex flex-col items-center justify-center text-center px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <span className="text-amber-500 font-bold tracking-[0.4em] uppercase text-[10px] mb-8 block bg-amber-500/10 px-6 py-2 rounded-full border border-amber-500/20 w-fit mx-auto backdrop-blur-md italic font-black">
              {data.eyebrow}
            </span>
            <h1 className="text-7xl md:text-[14rem] font-black tracking-tighter leading-[0.8] mb-8 drop-shadow-2xl uppercase italic">
              PLT <span className="text-amber-500">17</span>
            </h1>
            <p className="text-white/70 text-lg md:text-2xl max-w-4xl mx-auto font-bold leading-relaxed drop-shadow-2xl px-6 bg-black/20 backdrop-blur-sm py-4 rounded-2xl border border-white/5 italic">
              {data.lead}
            </p>
          </motion.div>
          <ChevronDown className="absolute bottom-10 opacity-30 animate-bounce text-amber-500" size={40} />
        </section>

        {/* AVANTAJLAR */}
        <section className="py-32 px-6 container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {data.advantages.map((adv, i) => (
              <div key={i} className="group p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl hover:border-amber-500 transition-all duration-700">
                <div className="text-amber-500 mb-6 group-hover:scale-110 transition-transform origin-left">{adv.icon}</div>
                <h3 className="text-xl font-black mb-4 uppercase italic text-amber-500 leading-tight">{adv.title}</h3>
                <p className="text-white/60 leading-relaxed text-sm font-medium">{adv.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TEKNİK ANALİZ TABLOSU */}
        <section className="py-24 px-6 container mx-auto max-w-4xl">
          <div className="flex items-center gap-8 mb-16">
            <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none text-amber-500">TEKNİK ANALİZ</h2>
            <div className="h-px bg-white/10 flex-grow" />
          </div>
          <div className="grid grid-cols-1 gap-4 font-sans">
            {data.technical.map((item, i) => (
              <div key={i} className="flex justify-between items-center py-8 border-b border-white/5 group transition-all">
                <span className="text-white/40 font-black uppercase text-[10px] tracking-[0.3em] group-hover:text-amber-500 transition-colors">{item.l}</span>
                <span className="text-xl md:text-3xl font-black italic tracking-tighter">{item.v}</span>
              </div>
            ))}
          </div>
        </section>

        {/* --- MODER RESİM GALERİSİ --- */}
        <section className="py-32 px-6 container mx-auto">
          <div className="flex items-center gap-6 mb-16">
            <div className="p-4 bg-amber-500/10 rounded-2xl text-amber-500"><Camera size={32} /></div>
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">GÖRSEL <span className="text-amber-500 font-light italic">DETAYLAR</span></h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {data.gallery.map((img, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedImg(img)}
                className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 cursor-zoom-in group"
              >
                <Image src={img} alt="PLT-17 Galeri" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Maximize2 size={32} />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FINAL CTA & KATALOG */}
        <section className="py-44 text-center bg-white text-black rounded-t-[5rem] md:rounded-t-[8rem] relative overflow-hidden">
          <h2 className="text-6xl md:text-[10rem] font-black uppercase tracking-tighter mb-16 leading-[0.85] italic">SAHANIN <br /> <span className="text-amber-500">HAKİMİSİNİZ.</span></h2>
          <div className="flex flex-col sm:flex-row gap-8 justify-center px-6 max-w-4xl mx-auto relative z-10">
            <a href="/dokumanlar/PLT-17.pdf" target="_blank" className="flex-1 bg-black text-white px-12 py-8 rounded-full font-black text-xl hover:bg-amber-600 transition-all flex items-center justify-center gap-4 group italic">
              KATALOG <FileText size={28} className="group-hover:rotate-12 transition-transform" />
            </a>
            <button onClick={() => setIsModalOpen(true)} className="flex-1 bg-amber-500 text-black px-12 py-8 rounded-full font-black text-xl hover:bg-black hover:text-white transition-all shadow-2xl shadow-amber-500/20 italic font-black uppercase">
              TEKLİF TALEBİ
            </button>
          </div>
        </section>
      </div>

      {/* LIGHTBOX GALERİ (BÜYÜTME) */}
      <AnimatePresence>
        {selectedImg && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:p-20">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedImg(null)} className="fixed inset-0 bg-black/95 backdrop-blur-xl cursor-zoom-out" />
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="relative w-full h-full">
              <Image src={selectedImg} alt="Large View" fill className="object-contain" />
              <button onClick={() => setSelectedImg(null)} className="absolute top-0 right-0 p-4 text-white hover:text-amber-500 transition-colors"><X size={48} /></button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODERN WHITE FORM MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-[480px] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              {!success && (
                <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-50 text-slate-400 z-50"><X size={20} /></button>
              )}
              <div className="p-10 md:p-14 text-slate-900 font-sans">
                {success ? (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-6">
                    <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner"><CheckCircle2 size={40} /></div>
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter leading-tight text-slate-900 uppercase">TALEBİNİZ <br /><span className="text-amber-500">KAYDEDİLDİ</span></h2>
                    <div className="w-12 h-1 bg-slate-100 mx-auto my-6 rounded-full" />
                    <p className="text-slate-500 font-medium italic leading-relaxed">Ekibimiz en kısa sürede sizinle iletişime geçecektir.</p>
                  </motion.div>
                ) : (
                  <>
                    <div className="mb-10 flex items-center gap-3">
                      <div className="w-1.5 h-8 bg-amber-500 rounded-full" />
                      <h2 className="text-3xl font-black uppercase italic tracking-tighter leading-none text-slate-900">TEKLİF <span className="text-amber-500 font-light">ALIN</span></h2>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="relative group">
                        <User size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-500 transition-colors" />
                        <input required type="text" placeholder="Ad Soyad" value={form.adSoyad} onChange={(e) => setForm({ ...form, adSoyad: e.target.value })} className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-14 pr-6 py-4.5 text-slate-900 outline-none focus:bg-white focus:border-amber-500 transition-all font-bold text-sm" />
                      </div>
                      <div className="relative group">
                        <Phone size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-500 transition-colors" />
                        <input required type="tel" placeholder="Telefon" value={form.telefon} onChange={(e) => setForm({ ...form, telefon: e.target.value })} className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-14 pr-6 py-4.5 text-slate-900 outline-none focus:bg-white focus:border-amber-500 transition-all font-bold text-sm" />
                      </div>
                      <div className="relative group">
                        <Mail size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-500 transition-colors" />
                        <input required type="email" placeholder="E-Posta" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-14 pr-6 py-4.5 text-slate-900 outline-none focus:bg-white focus:border-amber-500 transition-all font-bold text-sm" />
                      </div>
                      <div className="relative group">
                        <Settings size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-500 transition-colors" />
                        <input type="text" placeholder="Traktör Marka / Model" value={form.traktorModel} onChange={(e) => setForm({ ...form, traktorModel: e.target.value })} className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-14 pr-6 py-4.5 text-slate-900 outline-none focus:bg-white focus:border-amber-500 transition-all font-bold text-sm" />
                      </div>
                      <div className="relative group">
                        <MessageSquare size={16} className="absolute left-5 top-6 text-slate-300 group-focus-within:text-amber-500 transition-colors" />
                        <textarea rows={2} placeholder="Notlarınız..." value={form.mesaj} onChange={(e) => setForm({ ...form, mesaj: e.target.value })} className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-14 pr-6 py-5 text-slate-900 outline-none focus:bg-white focus:border-amber-500 transition-all font-bold text-sm resize-none" />
                      </div>
                      <button disabled={loading} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-amber-500 hover:text-black transition-all flex items-center justify-center gap-3 shadow-xl active:scale-[0.98]">
                        {loading ? <Loader2 className="animate-spin" size={18} /> : <>GÖNDER <Send size={14} /></>}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}