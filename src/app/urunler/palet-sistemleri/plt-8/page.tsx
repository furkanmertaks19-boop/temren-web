"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  ChevronDown, CheckCircle2, FileText, ArrowRight,
  Zap, Settings, X, Snowflake, Wind, Activity, ShieldAlert, Ruler, Weight, Camera, Maximize2, Send, User, Phone, Mail, MessageSquare, Loader2
} from 'lucide-react';

export default function PLT08Page() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
  const [imgError, setImgError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  // --- FORM STATE ---
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ adSoyad: "", telefon: "", email: "", traktor: "", mesaj: "" });

  const mainImage = "/image/plt-08-033.png";

  const data = {
    eyebrow: "Ürün Kodu: PLT-08 SNOWBLOWER",
    title: "PLT 08",
    fullName: "PLT-08 SNOWBLOWER Palet Sistemi",
    lead: "Karla kaplı, buzlu ve zorlu arazilerde maksimum çekiş ve güvenli ilerleme. Hafif ve taşınabilir yapısı sayesinde acil durumlarda hızlı konuşlandırma ve kesintisiz erişim sağlar.",
    chips: ["Kış Şartlarına Dayanıklı", "Hafif & Taşınabilir", "-20°C ve Altı Uyum", "Pratik Entegrasyon"],
    trustLine: "-20°C ve altı senaryolara uygun • Hızlı kurulum • Düşük bakım",
    gallery: [
      "/image/plt08.webp",
      "/image/plt-08-03.webp",
      "/image/plt-08-033.png"
    ],
    valueProps: [
      { title: "Kışa Dayanıklı", desc: "Kar, buz ve don koşullarında stabil tutuş ve güvenli sürüş. Ekstrem soğuklarda bile malzeme bütünlüğünü korur." },
      { title: "Taşınabilir", desc: "Kompakt ve hafif yapı sayesinde sahada hızlı konuşlandırma ve kolay sevkiyat imkanı sunar." },
      { title: "Hızlı Entegrasyon", desc: "Pratik sök-tak sistemi ile kısa sürede kurulum. Operasyonel bekleme sürelerini minimize eder." }
    ],
    advantages: [
      { title: "Montaj Kolaylığı", desc: "Araç tekerlekleri sökülerek çok kısa sürede entegre edilebilir.", icon: <Settings size={32} /> },
      { title: "Lojistik Avantaj", desc: "Kompakt tasarım; sevk ve depolamada benzersiz bir kolaylık sağlar.", icon: <Activity size={32} /> },
      { title: "Hafif Gövde", desc: "Emsallerine göre çok daha hafiftir; hız ve erişim kabiliyetini doğrudan artırır.", icon: <Wind size={32} /> },
      { title: "Kış Odaklı", desc: "Özel diş yapısı ile buzlu satıhlarda dahi güvenli kullanım sağlar.", icon: <Snowflake size={32} /> }
    ],
    technical: [
      { l: "Dış Boyutlar", v: "380 × 850 × 1370 mm", icon: <Ruler size={20} /> },
      { l: "Net Ağırlık", v: "~125 KG", icon: <Weight size={20} /> },
      { l: "Çalışma Şartları", v: "-20°C ve Altı", icon: <Snowflake size={20} /> },
      { l: "Gövde Tipi", v: "Hafif Mukavemetli Kompozit", icon: <ShieldAlert size={20} /> },
      { l: "Uyum", v: "Arazi Araçları & Pick-up", icon: <ArrowRight size={20} /> }
    ]
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, secim: "PLT-08 SNOWBLOWER TALEBİ", sourcePage: "/urunler/palet-sistemleri/plt-8", sourceLabel: "PLT-08 SNOWBLOWER" }),
      });
      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          setIsModalOpen(false);
          setSuccess(false);
          setForm({ adSoyad: "", telefon: "", email: "", traktor: "", mesaj: "" });
        }, 3500);
      }
    } catch (error) { alert("Bağlantı hatası!"); }
    finally { setLoading(false); }
  };

  return (
    <main className="bg-[#050505] min-h-screen relative text-white overflow-x-hidden selection:bg-blue-500 selection:text-white font-sans">

      {/* 1. ARKA PLAN */}
      <div className="fixed inset-0 w-full h-screen z-0">
        <motion.div style={{ scale }} className="relative w-full h-full text-white">
          {!imgError && (
            <Image src={mainImage} alt="PLT-08 SNOWBLOWER" fill className="object-cover opacity-60 md:opacity-80" priority onError={() => setImgError(true)} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
        </motion.div>
      </div>

      <div className="relative z-10 w-full">
        {/* HERO SECTION - DEVASA KALIN YAZI TİPİ */}
        <section className="h-screen flex flex-col items-center justify-center text-center px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <span className="text-blue-400 font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs mb-8 block bg-blue-500/10 px-6 py-2 rounded-full border border-blue-500/20 w-fit mx-auto backdrop-blur-md italic font-black text-white">
              {data.eyebrow}
            </span>
            <h1 className="text-7xl md:text-[14rem] font-black tracking-tighter leading-[0.8] mb-8 drop-shadow-2xl uppercase">
              PLT <span className="text-blue-400 font-light italic">08</span>
            </h1>
            <h2 className="text-white text-2xl md:text-5xl font-black italic uppercase tracking-widest mb-10 drop-shadow-2xl">BUZ KIRAN GÜÇ</h2>
            <p className="text-white text-lg md:text-2xl max-w-4xl mx-auto font-bold leading-relaxed drop-shadow-2xl px-6 bg-black/20 backdrop-blur-sm py-4 rounded-2xl border border-white/5 font-sans italic">
              {data.lead}
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-12 max-w-4xl mx-auto">
              {data.chips.map((chip, i) => (
                <span key={i} className="text-[10px] md:text-xs font-black uppercase tracking-widest bg-blue-900/40 backdrop-blur-2xl border border-blue-500/20 px-6 py-3 rounded-xl text-white">
                  {chip}
                </span>
              ))}
            </div>
          </motion.div>
          <ChevronDown className="absolute bottom-10 opacity-30 animate-bounce text-blue-400" size={40} />
        </section>

        {/* NIÇIN SECTION */}
        <section className="py-32 px-6 container mx-auto">
          <div className="mb-24 text-center">
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6 italic text-white leading-none">Niçin <span className="text-blue-400 font-light italic">PLT-08?</span></h2>
            <p className="text-white/80 text-xl md:text-2xl font-medium italic max-w-3xl mx-auto border-l-4 border-blue-500 pl-8 text-left uppercase tracking-tighter">Kritik Görevlerde Kesintisiz Erişim.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {data.valueProps.map((prop, i) => (
              <div key={i} className="group p-12 rounded-[4rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl hover:border-blue-500 transition-all duration-700">
                <h3 className="text-2xl font-black mb-6 uppercase italic text-blue-400 tracking-tighter leading-none">{prop.title}</h3>
                <p className="text-white/80 leading-relaxed text-lg font-bold tracking-tight group-hover:text-white transition-colors">{prop.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* GÖRSEL DETAYLAR GALERİSİ */}
        <section className="py-32 px-6 container mx-auto">
          <div className="flex items-center gap-6 mb-16 border-l-8 border-blue-500 pl-8 text-left">
            <div>
              <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none text-white uppercase">GÖRSEL <span className="text-blue-400 font-light italic text-4xl md:text-6xl">DETAYLAR</span></h2>
              <p className="text-white/30 uppercase font-black tracking-[0.4em] text-[10px] mt-4 flex items-center gap-2"><Camera size={14} /> Saha Analizi & Teknik Detaylar</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.gallery.map((img, i) => (
              <motion.div key={i} whileHover={{ y: -15, scale: 1.02 }} onClick={() => setSelectedImg(img)} className="relative aspect-video rounded-[2.5rem] overflow-hidden border-2 border-white/5 cursor-zoom-in group shadow-2xl bg-white/5">
                <Image src={img} alt="PLT-08 Galeri" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                <div className="absolute inset-0 bg-blue-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm text-white text-blue-400">
                  <Maximize2 size={40} />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* TEKNİK ANALİZ TABLOSU */}
        <section className="py-32 px-6 container mx-auto max-w-5xl text-left">
          <div className="flex items-center gap-10 mb-16">
            <h2 className="text-5xl font-black uppercase italic tracking-tighter leading-none text-blue-400">TEKNİK ANALİZ</h2>
            <div className="h-px bg-gradient-to-r from-blue-500/50 to-transparent flex-grow" />
          </div>
          <div className="grid grid-cols-1 gap-4 font-sans">
            {data.technical.map((item, i) => (
              <div key={i} className="flex justify-between items-center py-10 border-b border-white/5 group hover:px-8 transition-all duration-500 hover:bg-white/[0.02] rounded-3xl">
                <div className="flex items-center gap-4 text-white/50 uppercase text-xs font-black tracking-[0.3em] group-hover:text-blue-400 transition-colors">
                  {item.icon} {item.l}
                </div>
                <span className="text-2xl md:text-4xl font-black italic tracking-tighter text-white">{item.v}</span>
              </div>
            ))}
          </div>
        </section>

        {/* --- OVAL BEYAZ CTA BÖLGESİ (RESİMDEKİ TASARIM) --- */}
        <section className="py-44 text-center bg-white text-black rounded-t-[5rem] md:rounded-t-[8rem] relative overflow-hidden">
          <div className="relative z-10 px-6">
            <h2 className="text-6xl md:text-[10rem] font-black uppercase tracking-tighter mb-16 leading-[0.9] italic">
              ZİRVEYE <br /> HÜKMET.
            </h2>
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center max-w-4xl mx-auto relative z-20">
              <a href="/dokumanlar/palet.pdf" target="_blank" className="w-full sm:flex-1 bg-black text-white px-10 py-6 md:py-8 rounded-full font-black text-xl hover:bg-slate-800 transition-all duration-500 flex items-center justify-center gap-4 group shadow-xl uppercase italic">
                KATALOG <FileText size={24} className="group-hover:rotate-12 transition-transform" />
              </a>
              <button onClick={() => setIsModalOpen(true)} className="w-full sm:flex-1 bg-blue-500 text-white px-10 py-6 md:py-8 rounded-full font-black text-xl hover:bg-blue-600 transition-all duration-500 shadow-2xl shadow-blue-500/30 uppercase italic">
                TEKLİF TALEBİ
              </button>
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-black text-black/[0.03] select-none pointer-events-none uppercase italic">
            SNOW
          </div>
        </section>
      </div>

      {/* LIGHTBOX GALERİ */}
      <AnimatePresence>
        {selectedImg && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:p-20">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedImg(null)} className="fixed inset-0 bg-black/98 backdrop-blur-2xl cursor-zoom-out" />
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="relative w-full h-full flex items-center justify-center">
              <Image src={selectedImg} alt="Large" fill className="object-contain" />
              <button onClick={() => setSelectedImg(null)} className="absolute top-0 right-0 p-8 text-white hover:text-blue-500 transition-colors drop-shadow-2xl"><X size={60} strokeWidth={3} /></button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODERN WHITE FORM MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-[480px] bg-white rounded-[3rem] shadow-2xl overflow-hidden"
            >
              {!success && <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 p-2 rounded-full hover:bg-slate-100 text-slate-400 z-50 transition-all"><X size={24} /></button>}
              <div className="p-12 md:p-14 text-slate-900 font-sans text-left">
                {success ? (
                  <div className="text-center py-10">
                    <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-inner"><CheckCircle2 size={50} /></div>
                    <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-tight">TALEBİNİZ <br /><span className="text-blue-500 font-light italic">KAYDEDİLDİ</span></h2>
                    <p className="text-slate-600 font-black italic text-lg leading-relaxed mt-4 uppercase text-center">Ekibimiz en kısa sürede sizinle iletişime geçecektir.</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-12 flex items-center gap-4 border-l-8 border-blue-500 pl-6 text-left">
                      <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none text-slate-900 uppercase">TEKLİF <span className="text-blue-500 font-light italic text-white">ALIN</span></h2>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="relative group"><User size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" /><input required type="text" placeholder="Ad Soyad" value={form.adSoyad} onChange={(e) => setForm({ ...form, adSoyad: e.target.value })} className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl pl-16 pr-8 py-5 text-slate-900 outline-none focus:bg-white focus:border-blue-500 transition-all font-black text-md" /></div>
                      <div className="relative group"><Phone size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" /><input required type="tel" placeholder="Telefon" value={form.telefon} onChange={(e) => setForm({ ...form, telefon: e.target.value })} className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl pl-16 pr-8 py-5 text-slate-900 outline-none focus:bg-white focus:border-blue-500 transition-all font-black text-md" /></div>
                      <div className="relative group"><Mail size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" /><input required type="email" placeholder="E-Posta" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl pl-16 pr-8 py-5 text-slate-900 outline-none focus:bg-white focus:border-blue-500 transition-all font-black text-md" /></div>
                      <div className="relative group"><MessageSquare size={18} className="absolute left-6 top-7 text-slate-300 group-focus-within:text-blue-500 transition-colors" /><textarea rows={2} placeholder="Saha Şartları / Notlar..." value={form.mesaj} onChange={(e) => setForm({ ...form, mesaj: e.target.value })} className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl pl-16 pr-8 py-6 text-slate-900 outline-none focus:bg-white focus:border-blue-500 transition-all font-black text-md resize-none" /></div>
                      <button disabled={loading} className="w-full bg-blue-500 text-white py-6 rounded-3xl font-black text-[12px] uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all flex items-center justify-center gap-4 shadow-2xl active:scale-[0.97] mt-4 italic">{loading ? <Loader2 className="animate-spin" size={24} /> : <>GÖNDER <Send size={18} /></>}</button>
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