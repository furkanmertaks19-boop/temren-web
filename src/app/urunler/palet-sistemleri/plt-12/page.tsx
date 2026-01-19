"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  ChevronDown, CheckCircle2, FileText, ArrowRight,
  Zap, Settings, X, ShieldCheck, Crosshair, HardHat, Factory, Camera, Maximize2, Send, User, Phone, Mail, MessageSquare, Loader2
} from 'lucide-react';

export default function PLT12Page() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
  const [imgError, setImgError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  // --- FORM STATE ---
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ adSoyad: "", telefon: "", email: "", sektor: "", mesaj: "" });

  const mainImage = "/image/plt-12-4.png";

  const data = {
    title: "PLT 12",
    fullName: "PLT-12 ASPAR Palet Sistemi",
    lead: "Engebeli, çamurlu ve zorlu arazilerde maksimum çekiş sağlayan PLT-12 ASPAR, ağır yük altında dahi kararlı ve güvenli ilerleme sunar. Endüstriyel, tarımsal ve savunma operasyonları için yüksek dayanım.",
    chips: ["Güçlendirilmiş Gövde", "Yüksek Çekiş & Tork", "Zorlu Arazi Uyumu", "Ağır Yük Stabilitesi"],
    trustLine: "Ağır yükte kararlılık • Optimize tork • Hızlı servis",
    gallery: [
      "/image/plt12aspar.WEBP",
      "/image/plt-12-4.PNG",
      "/image/plt-12-2.webp"
    ],
    valueProps: [
      { title: "Güçlendirilmiş Gövde", desc: "Ağır yük altında dahi formunu koruyan sağlam yapı. Yüksek dayanım gerektiren saha uygulamaları için tasarlandı." },
      { title: "Optimize Tork", desc: "Düşük kayma ile gücü zemine verimli aktarır. Yüksek çekiş sayesinde performans kaybını minimize eder." },
      { title: "Servis Kolaylığı", desc: "Modüler mimari ile hızlı bakım ve parça bazlı servis. Operasyon süresini uzatan düşük duruş süresi." }
    ],

    advantages: [
      { title: "Yüksek Performans", desc: "Ağır yük kapasitesi sayesinde endüstriyel ve savunma amaçlı araçlara tam uygundur.", icon: <ShieldCheck size={32} /> },
      { title: "Uzun Ömür", desc: "Dayanıklı malzeme seçimi ile uzun servis ömrü ve düşük bakım maliyeti.", icon: <Settings size={32} /> },
      { title: "Çok Yönlü Uygulama", desc: "Tarım, inşaat ve savunma gibi farklı sektörlerde etkin kullanım imkanı.", icon: <Factory size={32} /> },
      { title: "Yüksek Erişim", desc: "Çamurlu ve engebeli arazilerde dahi güvenli ve sürekli hareket kabiliyeti.", icon: <ArrowRight size={32} /> }
    ],

    comparison: {
      wheel: ["Kolay Entegrasyon", "Hafif Tasarım", "Düşük Başlangıç Maliyeti", "Temel Zemin Performansı"],
      aspar: ["Özelleştirilebilir Yapı", "Yüksek Çekiş & Minimum Kayma", "Operasyonel Verimlilik", "Dayanıklı Bileşenler"]
    },

    useCases: [
      { title: "Tarım", desc: "Ağır yük taşıyan tarım araçları", icon: <Zap size={24} /> },
      { title: "İnşaat", desc: "İnşaat ve şantiye araçları", icon: <HardHat size={24} /> },
      { title: "Savunma", desc: "Savunma ve taktik saha uygulamaları", icon: <Crosshair size={24} /> }
    ]
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, secim: "PLT-12 ASPAR TALEBİ" }),
      });
      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          setIsModalOpen(false);
          setSuccess(false);
          setForm({ adSoyad: "", telefon: "", email: "", sektor: "", mesaj: "" });
        }, 3500);
      }
    } catch (error) { alert("Bağlantı hatası!"); }
    finally { setLoading(false); }
  };

  return (
    <main className="bg-[#050505] min-h-screen relative text-white overflow-x-hidden selection:bg-amber-500 selection:text-black font-sans">

      {/* 1. ARKA PLAN */}
      <div className="fixed inset-0 w-full h-screen z-0">
        <motion.div style={{ scale }} className="relative w-full h-full">
          {!imgError && (
            <Image
              src={mainImage}
              alt="PLT-12 ASPAR"
              fill
              className="object-cover opacity-70 md:opacity-85"
              priority
              onError={() => setImgError(true)}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
        </motion.div>
      </div>

      <div className="relative z-10 w-full">
        {/* HERO SECTION */}
        <section className="h-screen flex flex-col items-center justify-center text-center px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <span className="text-amber-500 font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs mb-8 block bg-amber-500/10 px-6 py-2 rounded-full border border-amber-500/20 w-fit mx-auto backdrop-blur-md italic font-black">
              Heavy Duty ASPAR Series
            </span>
            <h1 className="text-7xl md:text-[14rem] font-black tracking-tighter leading-[0.8] mb-4 drop-shadow-2xl uppercase">
              ASPAR <span className="text-amber-500 font-light italic text-6xl md:text-[8rem] ml-4">12</span>
            </h1>

            <h2 className="text-amber-500 text-2xl md:text-5xl font-black italic uppercase tracking-widest mb-10 drop-shadow-2xl">
              ARAZİNİN YENİ HAKİMİ
            </h2>

            <p className="text-white text-lg md:text-2xl max-w-4xl mx-auto font-bold leading-relaxed drop-shadow-2xl px-6 bg-black/20 backdrop-blur-sm py-4 rounded-2xl border border-white/5">
              {data.lead}
            </p>

            <div className="flex flex-wrap justify-center gap-3 mt-12 max-w-4xl mx-auto">
              {data.chips.map((chip, i) => (
                <span key={i} className="text-[10px] md:text-xs font-black uppercase tracking-widest bg-black/50 backdrop-blur-2xl border border-white/20 px-6 py-3 rounded-xl text-white">
                  {chip}
                </span>
              ))}
            </div>

            <p className="text-white/80 text-[10px] md:text-xs tracking-[0.5em] uppercase mt-16 font-black italic bg-black/30 px-6 py-2 rounded-full backdrop-blur-sm w-fit mx-auto border border-white/5">
              {data.trustLine}
            </p>
          </motion.div>
          <ChevronDown className="absolute bottom-10 opacity-50 animate-bounce text-amber-500" size={40} />
        </section>

        {/* NIÇIN ASPAR? SECTION */}
        <section className="py-32 px-6 container mx-auto">
          <div className="mb-24 text-center">
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6 italic text-white leading-none">Niçin <span className="text-amber-500 font-light italic">ASPAR?</span></h2>
            <p className="text-white/80 text-xl md:text-2xl font-medium italic max-w-3xl mx-auto border-l-4 border-amber-500 pl-8">Tarım, inşaat ve savunma gibi zorlu görevlerde kesintisiz performans.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {data.valueProps.map((prop, i) => (
              <div key={i} className="group p-12 rounded-[3.5rem] bg-white/[0.04] border border-white/10 backdrop-blur-3xl hover:border-amber-500 transition-all duration-700">
                <h3 className="text-2xl font-black mb-6 uppercase italic text-amber-500 tracking-tight leading-none">{prop.title}</h3>
                <p className="text-white/80 leading-relaxed text-lg font-medium group-hover:text-white transition-colors">{prop.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- GÖRSEL DETAYLAR GALERİSİ --- */}
        <section className="py-32 px-6 container mx-auto">
          <div className="flex items-center gap-6 mb-16 border-l-8 border-amber-500 pl-8 text-left">
            <div>
              <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none text-white">GÖRSEL <span className="text-amber-500 font-light italic text-4xl md:text-6xl">DETAYLAR</span></h2>
              <p className="text-white/30 uppercase font-black tracking-[0.4em] text-[10px] mt-4 flex items-center gap-2"><Camera size={14} /> Saha Analizi & Teknik Detaylar</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.gallery.map((img, i) => (
              <motion.div key={i} whileHover={{ y: -15, scale: 1.02 }} onClick={() => setSelectedImg(img)} className="relative aspect-video rounded-[2.5rem] overflow-hidden border-2 border-white/5 cursor-zoom-in group shadow-2xl bg-white/5">
                <Image src={img} alt="PLT-12 Galeri" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm text-amber-500">
                  <Maximize2 size={40} />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* COMPARISON SECTION */}
        <section className="py-32 px-6 bg-white/[0.03] border-y border-white/5 backdrop-blur-sm">
          <div className="container mx-auto">
            <div className="mb-20 text-center">
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic text-white">SİSTEM <span className="text-amber-500 font-light italic">ANALİZİ</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto font-sans">
              <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5">
                <h4 className="text-white/30 font-bold text-lg mb-8 uppercase tracking-widest italic">Tekerlek Sistemleri</h4>
                <ul className="space-y-6">
                  {data.comparison.wheel.map((item, i) => (
                    <li key={i} className="flex gap-4 items-center text-white/40 font-light text-base md:text-lg italic">
                      <X className="text-red-900 flex-shrink-0" size={20} /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-10 rounded-[3rem] bg-amber-500/[0.05] border border-amber-500/20 shadow-inner relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 text-amber-500/5 font-black text-[12rem] italic select-none group-hover:scale-110 transition-transform duration-1000 uppercase">VS</div>
                <h4 className="text-amber-500 font-bold text-lg mb-8 uppercase tracking-widest italic tracking-tight relative z-10">ASPAR Palet Sistemi</h4>
                <ul className="space-y-6 relative z-10">
                  {data.comparison.aspar.map((item, i) => (
                    <li key={i} className="flex gap-4 items-center text-white font-bold text-base md:text-lg">
                      <CheckCircle2 className="text-amber-500 flex-shrink-0" size={22} /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* KULLANIM ALANLARI SECTION */}
        <section className="py-44 px-6 container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12 text-center lg:text-left">
              <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter italic leading-[0.8]">KULLANIM <br /><span className="text-amber-500">SAHALARI</span></h2>
              <p className="text-white/70 text-xl md:text-2xl font-light italic leading-relaxed">
                ASPAR 12, çamurlu, engebeli ve yumuşak zeminlerden ekstrem iklim koşullarına kadar her ortamda kararlılık sunar.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {data.useCases.map((use, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-8 p-10 rounded-[3rem] bg-white/[0.03] border border-white/10 hover:border-amber-500 transition-all duration-500 group">
                  <div className="flex-shrink-0 bg-white/5 p-6 rounded-2xl group-hover:bg-amber-500 group-hover:text-black transition-all">
                    {use.icon}
                  </div>
                  <div className="text-center md:text-left">
                    <h4 className="text-2xl font-black uppercase mb-2 italic tracking-tight text-white group-hover:text-amber-500 transition-colors">{use.title}</h4>
                    <p className="text-white/50 text-lg font-medium leading-relaxed">{use.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA SECTION */}
        <section className="py-40 text-center bg-white text-black rounded-t-[4rem] md:rounded-t-[6rem] relative overflow-hidden">
          <div className="relative z-10 px-6">
            <h2 className="text-6xl md:text-[9rem] font-black uppercase tracking-tighter mb-16 leading-[0.9] italic">
              ARAZİNİN <br /> YENİ HAKİMİ.
            </h2>
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <a href="/dokumanlar/plt-12.pdf" target="_blank" className="bg-black text-white px-16 py-8 rounded-full font-black text-xl hover:bg-amber-500 transition-all duration-500 flex items-center justify-center gap-4 group shadow-xl">
                KATALOG <FileText size={24} />
              </a>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-amber-500 text-black px-16 py-8 rounded-full font-black text-xl hover:bg-black hover:text-white transition-all duration-500 border-none shadow-xl shadow-amber-500/10 active:scale-95"
              >
                TEKLİF TALEBİ
              </button>
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-black text-black/[0.01] select-none pointer-events-none uppercase italic">
            ASPAR
          </div>
        </section>
      </div>

      {/* LIGHTBOX GALERİ */}
      <AnimatePresence>
        {selectedImg && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:p-20">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedImg(null)} className="fixed inset-0 bg-black/98 backdrop-blur-2xl cursor-zoom-out" />
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="relative w-full h-full flex items-center justify-center">
              <Image src={selectedImg} alt="Large View" fill className="object-contain" />
              <button onClick={() => setSelectedImg(null)} className="absolute top-0 right-0 p-8 text-white hover:text-amber-500 transition-colors drop-shadow-2xl"><X size={60} strokeWidth={3} /></button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL */}
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
                    <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-tight text-slate-900">TALEBİNİZ <br /><span className="text-amber-500 font-light italic">KAYDEDİLDİ</span></h2>
                    <p className="text-slate-600 font-black italic text-lg leading-relaxed mt-4 uppercase">Ekibimiz en kısa sürede sizinle iletişime geçecektir.</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-12 flex items-center gap-4 border-l-8 border-amber-500 pl-6 text-left uppercase italic">
                      <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none text-slate-900">TEKLİF <span className="text-amber-500 font-light italic">ALIN</span></h2>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="relative group"><User size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-500 transition-colors" /><input required type="text" placeholder="Ad Soyad" value={form.adSoyad} onChange={(e) => setForm({ ...form, adSoyad: e.target.value })} className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl pl-16 pr-8 py-5 text-slate-900 outline-none focus:bg-white focus:border-amber-500 transition-all font-black text-md" /></div>
                      <div className="relative group"><Phone size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-500 transition-colors" /><input required type="tel" placeholder="Telefon" value={form.telefon} onChange={(e) => setForm({ ...form, telefon: e.target.value })} className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl pl-16 pr-8 py-5 text-slate-900 outline-none focus:bg-white focus:border-amber-500 transition-all font-black text-md" /></div>
                      <div className="relative group"><Mail size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-500 transition-colors" /><input required type="email" placeholder="E-Posta" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl pl-16 pr-8 py-5 text-slate-900 outline-none focus:bg-white focus:border-amber-500 transition-all font-black text-md" /></div>
                      <div className="relative group"><Factory size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-500 transition-colors" /><input type="text" placeholder="Sektör / Araç Tipi" value={form.sektor} onChange={(e) => setForm({ ...form, sektor: e.target.value })} className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl pl-16 pr-8 py-5 text-slate-900 outline-none focus:bg-white focus:border-amber-500 transition-all font-black text-md" /></div>
                      <div className="relative group"><MessageSquare size={18} className="absolute left-6 top-7 text-slate-300 group-focus-within:text-amber-500 transition-colors" /><textarea rows={2} placeholder="Saha Şartları / Notlar..." value={form.mesaj} onChange={(e) => setForm({ ...form, mesaj: e.target.value })} className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl pl-16 pr-8 py-6 text-slate-900 outline-none focus:bg-white focus:border-amber-500 transition-all font-black text-md resize-none" /></div>
                      <button disabled={loading} className="w-full bg-slate-900 text-white py-6 rounded-3xl font-black text-[12px] uppercase tracking-[0.3em] hover:bg-amber-500 hover:text-black transition-all flex items-center justify-center gap-4 shadow-2xl active:scale-[0.97] mt-4 italic">{loading ? <Loader2 className="animate-spin" size={24} /> : <>GÖNDER <Send size={18} /></>}</button>
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