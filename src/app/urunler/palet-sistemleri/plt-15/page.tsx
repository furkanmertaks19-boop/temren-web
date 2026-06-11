"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  ChevronDown, CheckCircle2, FileText, ArrowRight,
  Zap, Gauge, Settings, X, Layers, Sprout, ShieldCheck, Move, Camera, Maximize2, Send, User, Phone, Mail, MessageSquare, Loader2
} from 'lucide-react';

export default function PLT15Page() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
  const [imgError, setImgError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  // --- FORM STATE ---
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ adSoyad: "", telefon: "", email: "", traktor: "", mesaj: "" });

  const mainImage = "/image/plt-015.png";

  const data = {
    title: "PLT 15",
    fullName: "PLT-15 Bahçe & Dar Alan Palet Sistemi",
    lead: "Geniş temaslı kauçuk palet yapısı, bahçe ve dar hatlarda dahi kontrollü, dengeli ve verimli ilerleme sağlar. Yumuşak ve eğimli zeminlerde çekişi artırırken, toprak yapısını titizlikle korur.",
    chips: ["Geniş temas & düşük zemin basıncı", "Dar hatlarda çevik manevra", "Dayanıklı kauçuk bileşim", "Modüler / onarılabilir taşıyıcı"],
    trustLine: "Toprağa nazik • Dar alanda çevik • Hızlı servis",

    valueProps: [
      { title: "Modüler Mimari", desc: "Parça bazlı servis yapısı sayesinde hızlı değişim ve minimum duruş süresi. Yoğun sezonlarda bakımı hızlandırır." },
      { title: "Uyarlanabilir", desc: "Dar hat ve sıra aralığına uygun tasarım; bağ ve bahçe yollarında esnek uyum ve rahat hareket." },
      { title: "Yüksek Verim", desc: "Azalan kayma sayesinde yakıt tüketimi düşer. Daha az aşınma ile uzun vadeli ekonomik çalışma sağlar." }
    ],

    advantages: [
      { title: "Toprak Koruma", desc: "Geniş temas yüzeyi toprağı eşit yükler; sıkışma azalır, bahçe sağlığı korunur.", icon: <Layers size={32} /> },
      { title: "Yüksek Çekiş", desc: "Islak ve gevşek zeminde tutunmayı artırarak kesintisiz operasyon hedefler.", icon: <Zap size={32} /> },
      { title: "Çeviklik", desc: "Sıra aralarında hassas dönüş kabiliyeti. PLT-15'in imzası olan yüksek manevra avantajı.", icon: <Move size={32} /> },
      { title: "Uzun Ömür", desc: "Dayanıklı bileşim ve parça bazlı değişim imkanı ile düşük işletme maliyeti.", icon: <Settings size={32} /> }
    ],

    agriculture: [
      { title: "Düşük Sıkışma", desc: "Kökler için hava ve su geçirgenliği artar; bitki gelişimi ve toprak canlılığı desteklenir.", icon: <Sprout size={40} className="text-green-500" /> },
      { title: "Minimal İz • Erişim", desc: "Yağış sonrası sahaya giriş imkanı sağlar; dar alanlarda iz ve arazi hasarını minimize eder.", icon: <Gauge size={40} className="text-amber-500" /> }
    ],
    gallery: [
      "/image/plt-015-2.webp",
      "/image/plt-15-1.png",
    ]
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, secim: "PLT-15 TALEBİ", sourcePage: "/urunler/palet-sistemleri/plt-15", sourceLabel: "PLT-15" }),
      });
      if (response.ok) {
        setSuccess(true);
        setTimeout(() => { setIsModalOpen(false); setSuccess(false); }, 3500);
      }
    } catch (error) { alert("Hata!"); } finally { setLoading(false); }
  };

  return (
    <main className="bg-[#050505] min-h-screen relative text-white overflow-x-hidden selection:bg-amber-500 selection:text-black">

      {/* 1. PARALLAX ARKA PLAN */}
      <div className="fixed inset-0 w-full h-screen z-0">
        <motion.div style={{ scale }} className="relative w-full h-full">
          {!imgError && <Image src={mainImage} alt="PLT-15" fill className="object-cover opacity-50 md:opacity-65" priority onError={() => setImgError(true)} />}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/30 to-[#050505]/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
        </motion.div>
      </div>

      <div className="relative z-10 w-full font-sans text-white">
        {/* HERO SECTION - TAM SENİN İSTEDİĞİN GİBİ */}
        <section className="h-screen flex flex-col items-center justify-center text-center px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <span className="text-amber-500 font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs mb-8 block bg-amber-500/10 px-6 py-2 rounded-full border border-amber-500/20 w-fit mx-auto backdrop-blur-md">
              COMPACT PERFORMANCE
            </span>
            <h1 className="text-7xl md:text-[14rem] font-black tracking-tighter leading-[0.8] mb-8 drop-shadow-2xl uppercase">
              PLT <span className="text-amber-500 italic">15</span>
            </h1>
            <p className="text-white text-lg md:text-3xl max-w-4xl mx-auto font-semibold leading-relaxed drop-shadow-lg">
              {data.lead}
            </p>

            <div className="flex flex-wrap justify-center gap-3 mt-12 max-w-5xl mx-auto">
              {data.chips.map((chip, i) => (
                <span key={i} className="text-[10px] md:text-xs font-black uppercase tracking-widest bg-white/10 backdrop-blur-2xl border border-white/20 px-6 py-3 rounded-xl text-white">
                  {chip}
                </span>
              ))}
            </div>

            <p className="text-white/60 text-[10px] md:text-xs tracking-[0.5em] uppercase mt-16 font-black italic">
              {data.trustLine}
            </p>
          </motion.div>
          <ChevronDown className="absolute bottom-10 opacity-30 animate-bounce" size={40} />
        </section>

        {/* NIÇIN PLT-15? */}
        <section className="py-32 px-6 container mx-auto">
          <div className="mb-24 text-center">
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6 italic text-white">Niçin <span className="text-amber-500 font-light italic">PLT-15?</span></h2>
            <p className="text-white/80 text-xl md:text-2xl font-medium italic leading-relaxed max-w-3xl mx-auto border-l-4 border-amber-500 pl-8 text-left">
              Bahçede çevik – arazide güçlü – işletmeye ekonomik.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {data.valueProps.map((prop, i) => (
              <div key={i} className="group p-12 rounded-[3.5rem] bg-white/[0.04] border border-white/10 backdrop-blur-3xl hover:border-amber-500 transition-all duration-700">
                <h3 className="text-2xl font-black mb-6 uppercase italic text-amber-500 tracking-tight leading-none">{prop.title}</h3>
                <div className="h-1 w-10 bg-white/10 mb-6 group-hover:w-20 transition-all" />
                <p className="text-white/80 leading-relaxed text-lg font-medium">{prop.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* AVANTAJLAR */}
        <section className="py-32 px-6 bg-white/[0.03] border-y border-white/5 backdrop-blur-sm">
          <div className="container mx-auto">
            <div className="mb-20 text-left">
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic text-white">AVANTAJLAR</h2>
              <p className="text-white/50 uppercase tracking-[0.3em] text-sm mt-4 font-bold">Dar hatlarda hassas manevra, zeminde minimum iz.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.advantages.map((adv, i) => (
                <div key={i} className="p-10 rounded-[2.5rem] bg-black/60 border border-white/5 hover:bg-amber-500 transition-all duration-700 group cursor-default">
                  <div className="text-amber-500 group-hover:text-black mb-8 transition-colors group-hover:scale-110 origin-left">{adv.icon}</div>
                  <h4 className="text-2xl font-black mb-4 uppercase group-hover:text-black transition-colors">{adv.title}</h4>
                  <p className="text-white/70 group-hover:text-black/90 text-sm leading-relaxed transition-colors font-semibold">{adv.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GALERİ - YENİ EKLENDİ */}
        <section className="py-32 px-6 container mx-auto">
          <div className="flex items-center gap-6 mb-16">
            <Camera size={40} className="text-amber-500" />
            <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-white">GÖRSEL DETAYLAR</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {data.gallery.map((img, i) => (
              <motion.div key={i} whileHover={{ scale: 1.02 }} onClick={() => setSelectedImg(img)} className="relative aspect-square rounded-[2rem] overflow-hidden border border-white/10 cursor-zoom-in group shadow-2xl">
                <Image src={img} alt="PLT-15" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><Maximize2 size={32} /></div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* TOPRAK SAĞLIĞI */}
        <section className="py-44 px-6 container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-8">
              <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter italic leading-[0.8] text-white">TOPRAK <br /><span className="text-green-500 drop-shadow-lg">SAĞLIĞI</span></h2>
              <p className="text-white/80 text-xl md:text-3xl font-medium italic leading-relaxed">Toprak verimliliği; uzun vadede bahçe performansının anahtarıdır.</p>
            </div>
            <div className="grid grid-cols-1 gap-8">
              {data.agriculture.map((item, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-10 p-12 rounded-[3.5rem] bg-white/[0.04] border border-white/10 hover:border-green-500/50 transition-all duration-500 group backdrop-blur-md">
                  <div className="flex-shrink-0 group-hover:rotate-6 transition-transform">{item.icon}</div>
                  <div>
                    <h4 className="text-3xl font-black uppercase mb-4 italic tracking-tight text-white">{item.title}</h4>
                    <p className="text-white/70 text-xl font-medium leading-relaxed group-hover:text-white transition-colors">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION - KATALOG EKLENDİ */}
        <section className="py-40 text-center bg-white text-black rounded-t-[4rem] md:rounded-t-[6rem] relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-6xl md:text-[10rem] font-black uppercase tracking-tighter mb-16 leading-none italic">ÇEVİK VE GÜÇLÜ.</h2>
            <div className="flex flex-col sm:flex-row gap-8 justify-center px-6">
              <a href="/dokumanlar/plt-15.pdf" target="_blank" className="bg-black text-white px-16 py-8 rounded-full font-black text-xl hover:bg-amber-600 transition-all duration-500 flex items-center justify-center gap-4 group">
                KATALOG <FileText size={24} />
              </a>
              <button onClick={() => setIsModalOpen(true)} className="bg-amber-500 text-black px-16 py-8 rounded-full font-black text-xl hover:bg-black hover:text-white transition-all duration-500 border-none">
                TEKLİF TALEBİ
              </button>
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-black text-black/[0.03] select-none pointer-events-none uppercase tracking-tighter italic">PLT15</div>
        </section>
      </div>

      {/* LIGHTBOX GALERİ */}
      <AnimatePresence>
        {selectedImg && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:p-20">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedImg(null)} className="fixed inset-0 bg-black/95 backdrop-blur-xl" />
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="relative w-full h-full">
              <Image src={selectedImg} alt="PLT-15" fill className="object-contain" />
              <button onClick={() => setSelectedImg(null)} className="absolute top-0 right-0 p-8 text-white"><X size={48} /></button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL FORM - YENİ MODERN BEYAZ FORM */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-[480px] bg-white rounded-[3rem] shadow-2xl overflow-hidden p-12 text-slate-900">
              {success ? (
                <div className="text-center py-10">
                  <CheckCircle2 size={60} className="mx-auto text-emerald-500 mb-6" />
                  <h2 className="text-3xl font-black uppercase italic tracking-tighter">KAYDEDİLDİ</h2>
                  <p className="text-slate-500 font-bold mt-4">Ekibimiz sizinle iletişime geçecektir.</p>
                </div>
              ) : (
                <>
                  <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-colors"><X size={24} /></button>
                  <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-10 border-l-8 border-amber-500 pl-6">TEKLİF ALIN</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input required type="text" placeholder="Ad Soyad" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-amber-500 font-bold transition-all" value={form.adSoyad} onChange={e => setForm({ ...form, adSoyad: e.target.value })} />
                    <input required type="tel" placeholder="Telefon" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-amber-500 font-bold transition-all" value={form.telefon} onChange={e => setForm({ ...form, telefon: e.target.value })} />
                    <input required type="email" placeholder="E-Posta" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-amber-500 font-bold transition-all" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                    <input type="text" placeholder="Traktör Model" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-amber-500 font-bold transition-all" value={form.traktor} onChange={e => setForm({ ...form, traktor: e.target.value })} />
                    <textarea placeholder="Mesajınız" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-amber-500 font-bold transition-all resize-none" rows={3} value={form.mesaj} onChange={e => setForm({ ...form, mesaj: e.target.value })} />
                    <button disabled={loading} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-amber-500 hover:text-black transition-all flex items-center justify-center gap-3">
                      {loading ? <Loader2 className="animate-spin" /> : <>GÖNDER <Send size={16} /></>}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}