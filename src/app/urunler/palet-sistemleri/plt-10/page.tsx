"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  ChevronDown, CheckCircle2, FileText, ArrowRight,
  Zap, Settings, X, Layers, Wrench, Mountain, Package, Ruler,
  Camera, Maximize2, Send, User, Phone, Mail, MessageSquare, Loader2
} from 'lucide-react';

export default function PLT10Page() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
  const [imgError, setImgError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  // --- FORM STATE ---
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ adSoyad: "", telefon: "", email: "", traktor: "", mesaj: "" });

  const mainImage = "/image/plt-10-2.png";

  const data = {
    eyebrow: "Ürün Kodu: PLT-10 CAT",
    title: "PLT 10",
    fullName: "PLT-10 Palet Sistemi",
    lead: "Kompakt yapısı ve yüksek dayanımlı kauçuk palet sistemi sayesinde dar alanlarda bile yüksek çekiş sunar. Hafif yapısı ile makineyi yormaz; kırsal ve eğimli zeminlerde stabilite sağlar.",
    chips: ["Hafif & sağlam gövde", "Uzun ömürlü kauçuk", "Pratik sök-tak", "Dar alan uyumu"],
    trustLine: "Kırsalda çevik • Zorlu zeminde güçlü • Hızlı kurulum",

    valueProps: [
      { title: "Hafif & Dayanıklı", desc: "Güçlü gövde yapısına rağmen düşük ağırlık. Küçük makinelerde dengeyi bozmaz, uzun süreli kullanıma uygundur." },
      { title: "Hızlı Montaj", desc: "Pratik sök-tak sistemi ile kısa sürede kurulum. Sahada zaman kaybını minimuma indirir." },
      { title: "Yüksek Çekiş", desc: "Kauçuk palet yapısı sayesinde kayma azalır. Kontrollü ve güvenli ilerleme sağlar." }
    ],

    advantages: [
      { title: "Hafif Tasarım", desc: "Kompakt makineler için ideal ağırlık dağılımı. Dar alanlarda çevik kullanım.", icon: <Layers size={32} /> },
      { title: "Uzun Ömür", desc: "Dayanıklı kauçuk bileşimi ve düşük bakım ihtiyacı ile uzun servis ömrü.", icon: <Settings size={32} /> },
      { title: "Kolay Kurulum", desc: "Pratik sök-tak yapısı sayesinde hızlı kurulum. Operatör dostu tasarım.", icon: <Wrench size={32} /> },
      { title: "Stabilite", desc: "Kaygan ve gevşek zeminlerde dahi stabil tutuş ve dengeli sürüş deneyimi.", icon: <Mountain size={32} /> }
    ],

    technical: [
      { l: "Dış Boyutlar", v: "190 × 530 × 1150 mm", icon: <Ruler size={20} /> },
      { l: "Ağırlık", v: "~20 KG", icon: <Package size={20} /> },
      { l: "Gövde Malzemesi", v: "Yüksek Mukavemetli Metal", icon: <Settings size={20} /> },
      { l: "Palet Tipi", v: "Uzun Ömürlü Kauçuk", icon: <Layers size={20} /> },
      { l: "Montaj", v: "Pratik Sök-Tak", icon: <Wrench size={20} /> }
    ],
    gallery: [
      "/image/plt10.WEBP",
      "/image/plt-10.webp",
      "/image/plt-10-2.png"
    ],
    useCases: ["Kompakt tarım makineleri", "Dar tarla ve kırsal alanlar", "Eğimli ve kaygan zeminler", "Geçici saha uygulamaları", "Servis & bakım alanları"]
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, secim: "PLT-10 ÜRÜN TALEBİ", sourcePage: "/urunler/palet-sistemleri/plt-10", sourceLabel: "PLT-10" }),
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
    <main className="bg-[#050505] min-h-screen relative text-white overflow-x-hidden selection:bg-amber-500 selection:text-black font-sans">

      {/* 1. ARKA PLAN */}
      <div className="fixed inset-0 w-full h-screen z-0">
        <motion.div style={{ scale }} className="relative w-full h-full">
          {!imgError && (
            <Image
              src={mainImage}
              alt="PLT-10 CAT"
              fill
              className="object-cover opacity-70 md:opacity-85"
              priority
              onError={() => setImgError(true)}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
        </motion.div>
      </div>

      <div className="relative z-10 w-full">
        {/* HERO SECTION */}
        <section className="h-screen flex flex-col items-center justify-center text-center px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <span className="text-amber-500 font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs mb-8 block bg-amber-500/10 px-6 py-2 rounded-full border border-amber-500/20 w-fit mx-auto backdrop-blur-md italic font-black">
              {data.eyebrow}
            </span>
            <h1 className="text-7xl md:text-[14rem] font-black tracking-tighter leading-[0.8] mb-8 drop-shadow-2xl uppercase">
              PLT <span className="text-amber-500 italic">10</span>
            </h1>
            <p className="text-white text-lg md:text-3xl max-w-4xl mx-auto font-bold leading-relaxed drop-shadow-lg px-4 italic">
              {data.lead}
            </p>

            <div className="flex flex-wrap justify-center gap-3 mt-12 max-w-4xl mx-auto">
              {data.chips.map((chip, i) => (
                <span key={i} className="text-[10px] md:text-xs font-black uppercase tracking-widest bg-black/40 backdrop-blur-2xl border border-white/20 px-6 py-3 rounded-xl">
                  {chip}
                </span>
              ))}
            </div>

            <p className="text-white/80 text-[10px] md:text-xs tracking-[0.5em] uppercase mt-16 font-black italic bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm w-fit mx-auto">
              {data.trustLine}
            </p>
          </motion.div>
          <ChevronDown className="absolute bottom-10 opacity-50 animate-bounce text-amber-500" size={40} />
        </section>

        {/* NIÇIN PLT-10? */}
        <section className="py-32 px-6 container mx-auto">
          <div className="mb-24 text-center">
            <h2 className="text-5xl md:text-[10rem] font-black uppercase tracking-tighter mb-6 italic leading-none">Niçin <span className="text-amber-500 font-light italic">PLT-10?</span></h2>
            <p className="text-white/80 text-xl md:text-2xl font-medium italic max-w-3xl mx-auto border-l-4 border-amber-500 pl-8 text-left uppercase tracking-tight">Kompakt makineler ve dar alan uygulamaları için optimize edildi.</p>
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

        {/* AVANTAJLAR */}
        <section className="py-32 px-6 bg-white/[0.03] border-y border-white/5 backdrop-blur-sm">
          <div className="container mx-auto">
            <div className="mb-20 text-center md:text-left">
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic text-white leading-none">AVANTAJLAR</h2>
              <p className="text-white/50 uppercase tracking-[0.3em] text-sm mt-6 font-black italic">Zorlu şartlarda üstün operasyonel kazanımlar.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.advantages.map((adv, i) => (
                <div key={i} className="p-10 rounded-[2.5rem] bg-black/60 border border-white/5 hover:bg-amber-500 transition-all duration-700 group cursor-default">
                  <div className="text-amber-500 group-hover:text-black mb-8 transition-colors group-hover:scale-110 origin-left">{adv.icon}</div>
                  <h4 className="text-2xl font-black mb-4 uppercase group-hover:text-black transition-colors italic leading-none">{adv.title}</h4>
                  <p className="text-white/70 group-hover:text-black/90 text-sm leading-relaxed transition-colors font-black uppercase tracking-tight">{adv.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GÖRSEL DETAYLAR GALERİSİ */}
        <section className="py-32 px-6 container mx-auto">
          <div className="flex items-center gap-6 mb-16 border-l-8 border-amber-500 pl-8">
            <div>
              <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none text-white">GÖRSEL <span className="text-amber-500 font-light italic text-4xl md:text-6xl">DETAYLAR</span></h2>
              <p className="text-white/30 uppercase font-black tracking-[0.4em] text-[10px] mt-4 flex items-center gap-2"><Camera size={14} /> Kompakt Tasarım & Saha Analizi</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.gallery.map((img, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedImg(img)}
                className="relative aspect-video rounded-[2rem] overflow-hidden border border-white/10 cursor-zoom-in group shadow-2xl bg-white/5"
              >
                <Image src={img} alt="PLT-10 Galeri" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Maximize2 size={32} className="text-amber-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* TEKNİK ANALİZ & KULLANIM ALANLARI */}
        <section className="py-44 px-6 container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <div className="space-y-12">
              <h2 className="text-6xl md:text-[8rem] font-black uppercase tracking-tighter italic leading-[0.8] text-white">TEKNİK <br /><span className="text-amber-500 font-light italic">ANALİZ</span></h2>
              <div className="space-y-4">
                {data.technical.map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-8 rounded-3xl bg-white/[0.03] border-b border-white/5 hover:bg-white/10 transition-all group">
                    <div className="flex items-center gap-4 text-white/50 uppercase text-[10px] font-black tracking-widest leading-none group-hover:text-amber-500 transition-colors">
                      {item.icon} {item.l}
                    </div>
                    <span className="text-xl md:text-3xl font-black italic tracking-tighter text-white">{item.v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-12 rounded-[4rem] bg-amber-500/[0.03] border border-amber-500/20 backdrop-blur-xl relative overflow-hidden group min-h-[500px] flex flex-col justify-center shadow-2xl">
              <div className="absolute -top-10 -right-10 text-[15rem] font-black text-amber-500/[0.04] italic pointer-events-none select-none group-hover:scale-110 transition-transform duration-1000 uppercase">CAT</div>
              <h3 className="text-4xl md:text-5xl font-black mb-12 uppercase italic tracking-tight text-amber-500">KULLANIM ALANLARI</h3>
              <ul className="space-y-6 relative z-10">
                {data.useCases.map((use, i) => (
                  <li key={i} className="flex gap-6 items-center text-white/90 text-xl md:text-2xl font-bold hover:translate-x-3 transition-transform italic uppercase tracking-tighter">
                    <CheckCircle2 className="text-amber-500 flex-shrink-0 shadow-lg" size={28} /> {use}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FINAL CTA SECTION */}
        <section className="py-40 text-center bg-white text-black rounded-t-[5rem] md:rounded-t-[8rem] relative overflow-hidden">
          <div className="relative z-10 px-6">
            <h2 className="text-6xl md:text-[10rem] font-black uppercase tracking-tighter mb-16 leading-none italic">PRATİK VE <span className="text-amber-500">ÇEVİK.</span></h2>
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <a href="/dokumanlar/PLT-10.pdf" target="_blank" className="bg-black text-white px-16 py-8 rounded-full font-black text-xl hover:bg-amber-600 transition-all duration-500 flex items-center justify-center gap-4 group shadow-xl italic uppercase">
                KATALOG <FileText size={24} />
              </a>
              <button onClick={() => setIsModalOpen(true)} className="bg-amber-500 text-black px-16 py-8 rounded-full font-black text-xl hover:bg-black hover:text-white transition-all shadow-xl shadow-amber-500/20 italic font-black uppercase">
                TEKLİF TALEBİ
              </button>
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-black text-black/[0.02] select-none pointer-events-none italic uppercase">
            CAT-10
          </div>
        </section>
      </div>

      {/* LIGHTBOX GALERİ */}
      <AnimatePresence>
        {selectedImg && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:p-20">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedImg(null)} className="fixed inset-0 bg-black/95 backdrop-blur-2xl cursor-zoom-out" />
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="relative w-full h-full">
              <Image src={selectedImg} alt="Large View" fill className="object-contain" />
              <button onClick={() => setSelectedImg(null)} className="absolute top-0 right-0 p-8 text-white hover:text-amber-500 transition-colors"><X size={60} strokeWidth={3} /></button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODERN WHITE FORM MODAL (KÜÇÜK VE ŞIK) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-[480px] bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] overflow-hidden"
            >
              {!success && (
                <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-50 text-slate-400 z-50 transition-colors"><X size={20} /></button>
              )}
              <div className="p-10 md:p-14 text-slate-900 font-sans">
                {success ? (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-6 text-slate-900">
                    <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner"><CheckCircle2 size={40} /></div>
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter leading-tight">TALEBİNİZ <br /><span className="text-amber-500 font-light italic">KAYDEDİLDİ</span></h2>
                    <div className="w-12 h-1 bg-slate-100 mx-auto my-6 rounded-full" />
                    <p className="text-slate-500 font-medium italic leading-relaxed">"İlginiz için teşekkür ederiz. Ekibimiz en kısa sürede sizinle iletişime geçecektir."</p>
                  </motion.div>
                ) : (
                  <>
                    <div className="mb-10 flex items-center gap-3">
                      <div className="w-1.5 h-8 bg-amber-500 rounded-full" />
                      <h2 className="text-3xl font-black uppercase italic tracking-tighter leading-none text-slate-900">TEKLİF <span className="text-amber-500 font-light italic">ALIN</span></h2>
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
                        <input type="text" placeholder="Makine / Traktör Model" value={form.traktor} onChange={(e) => setForm({ ...form, traktor: e.target.value })} className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-14 pr-6 py-4.5 text-slate-900 outline-none focus:bg-white focus:border-amber-500 transition-all font-bold text-sm" />
                      </div>
                      <div className="relative group">
                        <MessageSquare size={16} className="absolute left-5 top-6 text-slate-300 group-focus-within:text-amber-500 transition-colors" />
                        <textarea rows={3} placeholder="Notlarınız..." value={form.mesaj} onChange={(e) => setForm({ ...form, mesaj: e.target.value })} className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-14 pr-6 py-5 text-slate-900 outline-none focus:bg-white focus:border-amber-500 transition-all font-bold text-sm resize-none" />
                      </div>
                      <button disabled={loading} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-amber-500 hover:text-black transition-all flex items-center justify-center gap-3 shadow-xl active:scale-[0.98] disabled:opacity-50">
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