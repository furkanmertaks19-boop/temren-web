"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  ChevronDown, CheckCircle2, FileText, ArrowRight, ShieldCheck,
  Zap, Gauge, Settings, X, Layers, Sprout, Loader2, Camera, Maximize2, Send, User, Phone, Mail, MessageSquare
} from 'lucide-react';

export default function PLT16Page() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
  const [imgError, setImgError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  // --- FORM STATE ---
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ adSoyad: "", telefon: "", email: "", traktor: "", mesaj: "" });

  const mainImage = "/image/plt-16-2.png";

  const data = {
    title: "PLT 16",
    fullName: "PLT-16 Palet Sistemi",
    lead: "Geniş temaslı palet yapısı kaymayı azaltır; yumuşak ve kaygan zeminde dahi kontrollü ve verimli ilerleme sağlar.",
    chips: ["Geniş temas & düşük zemin basıncı", "Dayanıklı kauçuk bileşim", "Modüler / onarılabilir taşıyıcı"],
    trustLine: "Toprağa nazik • Yüksek çekiş • Hızlı servis",

    valueProps: [
      { title: "Modüler Mimari", desc: "Parça bazlı servis sayesinde hızlı değişim ve minimum duruş süresi." },
      { title: "Uyarlanabilir Yapı", desc: "Farklı traktör sınıfları ve kullanım senaryolarına esnek uyum." },
      { title: "Yüksek Verim", desc: "Azalan kayma sayesinde yakıt, zaman ve mekanik aşınmada tasarruf." }
    ],

    advantages: [
      { title: "Toprak Koruma", desc: "Geniş temas yüzeyi sayesinde toprak sıkışması azalır; drenaj korunur.", icon: <Layers size={32} /> },
      { title: "Yüksek Çekiş", desc: "Geniş palet yüzeyi kaymayı azaltır, dengeli sürüş sağlar.", icon: <Zap size={32} /> },
      { title: "Stabilite", desc: "Eğimli zeminlerde daha iyi denge ve yönlendirme kabiliyeti.", icon: <ShieldCheck size={32} /> },
      { title: "Uzun Ömür", desc: "Dayanıklı kauçuk bileşim sayesinde uzun kullanım ömrü.", icon: <Settings size={32} /> }
    ],

    technical: [
      { l: "Şasi Yapısı", v: "Güçlendirilmiş Modüler Çelik" },
      { l: "Palet Malzemesi", v: "Yüksek Mukavemetli Kauçuk" },
      { l: "Montaj Süresi", v: "Ortalama 45 Dakika" },
      { l: "Sektör", v: "Tarım ve Endüstriyel Arazi" }
    ],

    gallery: [
      "/image/plt16.webp",
      "/image/plt-16-2.png",
      "/image/plt-16-2.webp",
      "/image/plt-16-3.png",
      "/image/plt16-dik.png"
    ],

    agriculture: [
      { title: "Düşük Zemin Sıkışması", desc: "Bitki kökleri için hava ve su geçirgenliği artar; tarımsal verim desteklenir.", icon: <Sprout size={40} className="text-green-500" /> },
      { title: "Minimal İz • Erişim", desc: "Yağış sonrası arazide çalışmaya olanak tanır, arazi hasarını minimize eder.", icon: <Gauge size={40} className="text-amber-500" /> }
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
          secim: "PLT-16 ÜRÜN TALEBİ",
          sourcePage: "/urunler/palet-sistemleri/plt-16",
          sourceLabel: "PLT-16",
          mesaj: `Traktör: ${form.traktor} | Not: ${form.mesaj}`
        }),
      });
      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          setIsModalOpen(false);
          setSuccess(false);
          setForm({ adSoyad: "", telefon: "", email: "", traktor: "", mesaj: "" });
        }, 3500);
      }
    } catch (error) { alert("Hata oluştu!"); }
    finally { setLoading(false); }
  };

  return (
    <main className="bg-[#050505] min-h-screen relative text-white selection:bg-amber-500 selection:text-black font-sans overflow-x-hidden">

      {/* 1. HERO BACKDROP */}
      <div className="fixed inset-0 w-full h-screen z-0">
        <motion.div style={{ scale }} className="relative w-full h-full">
          {!imgError && <Image src={mainImage} alt="PLT-16" fill className="object-cover opacity-50" priority onError={() => setImgError(true)} />}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/80" />
        </motion.div>
      </div>

      <div className="relative z-10 w-full">
        {/* HERO CONTENT - EN KALIN VE EN BÜYÜK YAZI TİPİ */}
        <section className="h-screen flex flex-col items-center justify-center text-center px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <span className="text-amber-500 font-black tracking-[0.5em] uppercase text-[12px] mb-8 block bg-amber-500/10 px-6 py-2 rounded-full border border-amber-500/20 w-fit mx-auto backdrop-blur-md italic">
              PREMIUM TRACK SOLUTIONS
            </span>
            {/* BURASI: PLT 16 YAZISI DEVASA VE BLACK (900) AĞIRLIĞINDA */}
            <h1 className="text-8xl md:text-[16rem] font-black tracking-tighter leading-[0.75] mb-8 uppercase italic drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
              PLT <span className="text-amber-500">16</span>
            </h1>
            <p className="text-white/80 text-xl md:text-3xl max-w-4xl mx-auto font-black leading-relaxed drop-shadow-2xl px-6 py-4 font-sans italic tracking-tight">
              {data.lead}
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-12">
              {data.chips.map((chip, i) => (
                <span key={i} className="text-[10px] md:text-xs font-black uppercase tracking-widest bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-3 rounded-2xl">{chip}</span>
              ))}
            </div>
          </motion.div>
          <ChevronDown className="absolute bottom-10 opacity-30 animate-bounce text-amber-500" size={40} />
        </section>

        {/* 2. NIÇIN PLT-16? */}
        <section className="py-32 px-6 container mx-auto">
          <div className="mb-24 text-center">
            <h2 className="text-6xl md:text-[11rem] font-black uppercase tracking-tighter mb-6 italic leading-none text-white">Niçin <span className="text-amber-500 font-light italic">PLT-16?</span></h2>
            <p className="text-white/60 text-xl md:text-3xl font-black italic leading-relaxed max-w-3xl mx-auto tracking-tight uppercase">Araziye saygılı – operasyonda güçlü – işletmeye ekonomik.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {data.valueProps.map((prop, i) => (
              <div key={i} className="group p-14 rounded-[4rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl hover:border-amber-500 transition-all duration-700">
                <h3 className="text-3xl font-black mb-6 uppercase italic text-amber-500 tracking-tighter leading-none">{prop.title}</h3>
                <p className="text-white/80 leading-relaxed text-xl font-bold tracking-tight">{prop.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. AVANTAJLAR GRID */}
        <section className="py-32 px-6 bg-white/[0.02] border-y border-white/5 backdrop-blur-sm">
          <div className="container mx-auto">
            <div className="mb-20">
              <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic text-white leading-none">AVANTAJLAR</h2>
              <p className="text-white/40 uppercase tracking-[0.4em] text-sm mt-6 font-black font-sans italic italic">Zorlu arazi şartlarında üstün mühendislik başarısı.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.advantages.map((adv, i) => (
                <div key={i} className="p-12 rounded-[3rem] bg-black/60 border border-white/5 hover:bg-amber-500 transition-all duration-700 group cursor-default shadow-2xl">
                  <div className="text-amber-500 group-hover:text-black mb-8 transition-colors group-hover:scale-110 origin-left">{adv.icon}</div>
                  <h4 className="text-2xl font-black mb-4 uppercase group-hover:text-black transition-colors italic leading-none">{adv.title}</h4>
                  <p className="text-white/70 group-hover:text-black/90 text-sm leading-relaxed transition-colors font-black uppercase tracking-tight">{adv.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. TEKNİK TABLO */}
        <section className="py-32 px-6 container mx-auto max-w-4xl">
          <div className="flex items-center gap-10 mb-16">
            <h2 className="text-5xl font-black uppercase italic tracking-tighter leading-none text-amber-500">TEKNİK ANALİZ</h2>
            <div className="h-1 bg-white/10 flex-grow rounded-full" />
          </div>
          <div className="grid grid-cols-1 gap-4 font-sans">
            {data.technical.map((item, i) => (
              <div key={i} className="flex justify-between items-center py-10 border-b border-white/10 group transition-all hover:bg-white/[0.02] hover:px-8 rounded-3xl">
                <span className="text-white/50 font-black uppercase text-xs tracking-[0.3em] group-hover:text-amber-500 transition-colors">{item.l}</span>
                <span className="text-2xl md:text-4xl font-black italic tracking-tighter">{item.v}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 5. GÖRSEL GALERİ */}
        <section className="py-32 px-6 container mx-auto">
          <div className="flex items-center gap-6 mb-16">
            <div className="p-5 bg-amber-500/10 rounded-[2rem] text-amber-500"><Camera size={40} /></div>
            <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none text-white">GÖRSEL <span className="text-amber-500 font-light italic">DETAYLAR</span></h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {data.gallery.map((img, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -15, scale: 1.05 }}
                onClick={() => setSelectedImg(img)}
                className="relative aspect-square rounded-[2.5rem] overflow-hidden border-2 border-white/5 cursor-zoom-in group shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              >
                <Image src={img} alt="PLT-16 Galeri" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                  <Maximize2 size={40} className="text-amber-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 6. TOPRAK VERİMİ */}
        <section className="py-44 px-6 container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <h2 className="text-7xl md:text-[11rem] font-black uppercase tracking-tighter italic leading-[0.8] drop-shadow-xl text-white">TOPRAK <br /><span className="text-green-500 font-light italic text-6xl md:text-[8rem]">VERİMİ</span></h2>
              <p className="text-white/70 text-2xl md:text-4xl font-black italic leading-tight tracking-tighter uppercase">Sürdürülebilir tarım için toprak yapısını koruyan mühendislik.</p>
            </div>
            <div className="grid grid-cols-1 gap-8 font-sans">
              {data.agriculture.map((item, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-10 p-12 rounded-[4rem] bg-white/[0.03] border border-white/10 hover:border-green-500 transition-all duration-700 group">
                  <div className="flex-shrink-0 bg-white/5 p-8 rounded-[2rem] group-hover:bg-green-500 group-hover:text-black transition-all shadow-2xl">{item.icon}</div>
                  <div>
                    <h4 className="text-3xl font-black uppercase mb-4 italic text-white group-hover:text-green-500 transition-colors leading-none">{item.title}</h4>
                    <p className="text-white/60 text-xl font-bold mt-2 leading-snug tracking-tight">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. FINAL CTA */}
        <section className="py-44 text-center bg-white text-black rounded-t-[6rem] md:rounded-t-[10rem] relative overflow-hidden">
          <div className="relative z-10 px-6 font-sans">
            <h2 className="text-7xl md:text-[13rem] font-black uppercase tracking-[0.02em] mb-20 leading-[0.8] italic">SAHANIN <br /> <span className="text-amber-500">HAKİMİSİNİZ.</span></h2>
            <div className="flex flex-col sm:flex-row gap-10 justify-center px-6 max-w-5xl mx-auto">
              <a href="/dokumanlar/PLT-16.pdf" target="_blank" className="flex-1 bg-black text-white px-14 py-10 rounded-full font-black text-2xl hover:bg-amber-600 transition-all flex items-center justify-center gap-6 group shadow-2xl">
                KATALOG <FileText size={32} className="group-hover:rotate-12 transition-transform" />
              </a>
              <button onClick={() => setIsModalOpen(true)} className="flex-1 bg-amber-500 text-black px-14 py-10 rounded-full font-black text-2xl hover:bg-black hover:text-white transition-all shadow-2xl shadow-amber-500/30 uppercase font-black">
                TEKLİF TALEBİ
              </button>
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[28vw] font-black text-black/[0.03] select-none pointer-events-none uppercase italic">PLT16</div>
        </section>
      </div>

      {/* --- LIGHTBOX GALERİ (BÜYÜTME) --- */}
      <AnimatePresence>
        {selectedImg && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:p-20">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedImg(null)} className="fixed inset-0 bg-black/98 backdrop-blur-2xl cursor-zoom-out" />
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="relative w-full h-full">
              <Image src={selectedImg} alt="Large View" fill className="object-contain shadow-2xl" />
              <button onClick={() => setSelectedImg(null)} className="absolute top-0 right-0 p-8 text-white hover:text-amber-500 transition-colors drop-shadow-2xl"><X size={60} strokeWidth={3} /></button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- MODERN WHITE FORM MODAL (KÜÇÜK VE ŞIK) --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-2xl" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-[480px] bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              {!success && (
                <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 p-2 rounded-full hover:bg-slate-100 text-slate-400 z-50 transition-all"><X size={24} /></button>
              )}
              <div className="p-12 md:p-14 text-slate-900 font-sans">
                {success ? (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-10">
                    <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-inner"><CheckCircle2 size={50} /></div>
                    <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-tight text-slate-900">TALEBİNİZ <br /><span className="text-amber-500 font-light italic">KAYDEDİLDİ</span></h2>
                    <div className="w-16 h-1.5 bg-slate-100 mx-auto my-8 rounded-full" />
                    <p className="text-slate-600 font-black italic text-lg leading-relaxed">Ekibimiz en kısa sürede sizinle iletişime geçecektir.</p>
                  </motion.div>
                ) : (
                  <>
                    <div className="mb-12 flex items-center gap-4 border-l-8 border-amber-500 pl-6">
                      <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none text-slate-900">TEKLİF <span className="text-amber-500 font-light">ALIN</span></h2>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="relative group">
                        <User size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-500 transition-colors" />
                        <input required type="text" placeholder="Ad Soyad" value={form.adSoyad} onChange={(e) => setForm({ ...form, adSoyad: e.target.value })} className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl pl-16 pr-8 py-5 text-slate-900 outline-none focus:bg-white focus:border-amber-500 transition-all font-black text-md" />
                      </div>
                      <div className="relative group">
                        <Phone size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-500 transition-colors" />
                        <input required type="tel" placeholder="Telefon" value={form.telefon} onChange={(e) => setForm({ ...form, telefon: e.target.value })} className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl pl-16 pr-8 py-5 text-slate-900 outline-none focus:bg-white focus:border-amber-500 transition-all font-black text-md" />
                      </div>
                      <div className="relative group">
                        <Mail size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-500 transition-colors" />
                        <input required type="email" placeholder="E-Posta" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl pl-16 pr-8 py-5 text-slate-900 outline-none focus:bg-white focus:border-amber-500 transition-all font-black text-md" />
                      </div>
                      <div className="relative group">
                        <Settings size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-500 transition-colors" />
                        <input type="text" placeholder="Traktör Marka / Model" value={form.traktor} onChange={(e) => setForm({ ...form, traktor: e.target.value })} className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl pl-16 pr-8 py-5 text-slate-900 outline-none focus:bg-white focus:border-amber-500 transition-all font-black text-md" />
                      </div>
                      <div className="relative group">
                        <MessageSquare size={18} className="absolute left-6 top-7 text-slate-300 group-focus-within:text-amber-500 transition-colors" />
                        <textarea rows={2} placeholder="Notlarınız..." value={form.mesaj} onChange={(e) => setForm({ ...form, mesaj: e.target.value })} className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl pl-16 pr-8 py-6 text-slate-900 outline-none focus:bg-white focus:border-amber-500 transition-all font-black text-md resize-none" />
                      </div>
                      <button disabled={loading} className="w-full bg-slate-900 text-white py-6 rounded-3xl font-black text-[12px] uppercase tracking-[0.3em] hover:bg-amber-500 hover:text-black transition-all flex items-center justify-center gap-4 shadow-2xl active:scale-[0.97] mt-4">
                        {loading ? <Loader2 className="animate-spin" size={24} /> : <>GÖNDER <Send size={18} /></>}
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