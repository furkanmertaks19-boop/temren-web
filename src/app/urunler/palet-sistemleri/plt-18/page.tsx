"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  ChevronDown, CheckCircle2, FileText, ArrowRight, ShieldCheck,
  Zap, X, Layers, Beaker, Loader2, Maximize2, Camera,
  User, Phone, Mail, MessageSquare, Send
} from 'lucide-react';

export default function PLT18Page() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
  const [imgError, setImgError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  // --- FORM STATE ---
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ adSoyad: "", telefon: "", email: "", mesaj: "" });

  const mainImage = "/image/plt-18.png";

  const data = {
    title: "PLT 18",
    fullName: "PLT-18 Palet Sistemi",
    lead: "Zorlu arazi koşullarında güç ve hassasiyetin mükemmel dengesi. Geniş temas yüzeyi sayesinde kaymayı minimize eder, en zorlayıcı zeminlerde kesintisiz operasyon sağlar.",
    advantages: [
      { icon: <Layers className="w-10 h-10" />, title: "Düşük Zemin Basıncı", desc: "Ağırlığı geniş yüzeye yayarak batmayı azaltır ve toprak sıkışmasını önler." },
      { icon: <Zap className="w-10 h-10" />, title: "Üstün Çekiş Gücü", desc: "Patinajı %90 oranında azaltan tutunma yüzeyi ile maksimum güç aktarımı." },
      { icon: <Beaker className="w-10 h-10" />, title: "Onarılabilir Mimari", desc: "Modüler parça bazlı bakım sistemi ile minimum duruş süresi." }
    ],
    comparison: {
      wheel: ["Yüksek zemin basıncı ve derin batma", "Çamurlu arazide yüksek patinaj kaybı", "Toprak yapısına zarar veren dar temas alanı"],
      track: ["Eşit dağıtılmış ağırlık ve toprak koruma", "Eğimli ve ıslak zeminlerde %100 tutuş", "Sıfıra yakın patinaj ile %30 yakıt tasarrufu"]
    },
    technical: [
      { l: "Dış Boyutlar", v: "2200 × 1450 × 530 mm" },
      { l: "Net Ağırlık", v: "~800 KG (Birim)" },
      { l: "Malzeme", v: "Ağır Hizmet Kauçuk" },
      { l: "Şasi Yapısı", v: "Güçlendirilmiş Çelik" },
      { l: "Montaj", v: "Hızlı Adaptör" }
    ],
    gallery: [
      "/image/plt018.webp",
      "/image/plt018-t.webp",
      "/image/plt-18-4.png",
      "/image/plt-18-5.png",
      "/image/plt18-dik.png"
    ]
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, secim: "PLT-18 ÜRÜN TALEBİ" }),
      });
      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          setIsModalOpen(false);
          setSuccess(false);
          setForm({ adSoyad: "", telefon: "", email: "", mesaj: "" });
        }, 3500);
      }
    } catch (error) { alert("Bağlantı hatası!"); }
    finally { setLoading(false); }
  };

  return (
    <main className="bg-[#050505] min-h-screen relative text-white selection:bg-amber-500 selection:text-black font-sans overflow-x-hidden">
{/* ✅ SEO: PLT-18 - Product + Breadcrumb + FAQ */}
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify([
      // 1) Breadcrumb
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Anasayfa", "item": "https://temrenmakina.com" },
          { "@type": "ListItem", "position": 2, "name": "Ürünler", "item": "https://temrenmakina.com/urunler" },
          { "@type": "ListItem", "position": 3, "name": "Palet Sistemleri", "item": "https://temrenmakina.com/urunler/palet-sistemleri" },
          { "@type": "ListItem", "position": 4, "name": "PLT-18", "item": "https://temrenmakina.com/urunler/palet-sistemleri/plt-18" }
        ]
      },

      // 2) Product
      {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "PLT-18 Palet Sistemi",
        "image": [
          "https://temrenmakina.com/og/plt18_1.png"
        ],
        "description": "PLT-18 palet sistemi; zorlu saha koşullarında yüksek çekiş, dayanıklılık ve verim için tasarlanmış endüstriyel çözümdür.",
        "brand": { "@type": "Brand", "name": "Temren Makina" },
        "category": "Palet Sistemleri",
        "url": "https://temrenmakina.com/urunler/palet-sistemleri/plt-18"
      },

      // 3) FAQ
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "PLT-18 palet sistemi nerelerde kullanılır?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Zorlu arazi koşullarında çekiş ve stabilite gereken endüstriyel uygulamalarda kullanılabilir."
            }
          },
          {
            "@type": "Question",
            "name": "PLT-18’in avantajı nedir?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yüksek çekiş, dayanıklı yapı ve saha koşullarına uygun performans sağlar."
            }
          },
          {
            "@type": "Question",
            "name": "Özelleştirilebilir mi?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Evet, kullanım senaryosuna göre bağlantı ve ölçü detayları uyarlanabilir."
            }
          },
          {
            "@type": "Question",
            "name": "Teklif nasıl alabilirim?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sayfadaki teklif formu veya iletişim sayfası üzerinden PLT-18 için teklif talep edebilirsiniz."
            }
          }
        ]
      }
    ]),
  }}
/>
      {/* 1. ARKA PLAN */}
      <div className="fixed inset-0 w-full h-screen z-0">
        <motion.div style={{ scale }} className="relative w-full h-full">
          {!imgError && <Image src={mainImage} alt="PLT-18" fill className="object-cover opacity-50" priority onError={() => setImgError(true)} />}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/80" />
        </motion.div>
      </div>

      <div className="relative z-10 w-full">
        {/* HERO SECTION - PLT 16 STİLİNDE DEVASA BAŞLIKLAR */}
        <section className="h-screen flex flex-col items-center justify-center text-center px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <span className="text-amber-500 font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs mb-8 block bg-amber-500/10 px-6 py-2 rounded-full border border-amber-500/20 w-fit mx-auto backdrop-blur-md italic font-black">
              TITAN SERIES
            </span>
            <h1 className="text-7xl md:text-[14rem] font-black tracking-tighter leading-[0.8] mb-8 drop-shadow-2xl uppercase">
              PLT <span className="text-amber-500 italic">18</span>
            </h1>
            <p className="text-white/70 text-lg md:text-2xl max-w-4xl mx-auto font-bold leading-relaxed drop-shadow-2xl px-6 bg-black/20 backdrop-blur-sm py-4 rounded-2xl border border-white/5 font-sans">
              {data.lead}
            </p>
          </motion.div>
          <ChevronDown className="absolute bottom-10 opacity-30 animate-bounce text-amber-500" size={40} />
        </section>

        {/* 2. AVANTAJLAR */}
        <section className="py-32 px-6 container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {data.advantages.map((adv, i) => (
              <div key={i} className="group p-12 rounded-[3.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl hover:border-amber-500 transition-all duration-700">
                <div className="text-amber-500 mb-6 group-hover:scale-110 transition-transform origin-left">{adv.icon}</div>
                <h3 className="text-2xl font-black mb-6 uppercase italic text-amber-500 tracking-tight leading-none">{adv.title}</h3>
                <p className="text-white/80 leading-relaxed text-lg font-medium group-hover:text-white transition-colors">{adv.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. KARŞILAŞTIRMA */}
        <section className="py-32 px-6 container mx-auto relative overflow-hidden">
          <div className="mb-20 text-center">
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic text-white leading-none tracking-tight">THE <span className="text-amber-500 font-light italic text-6xl md:text-7xl">DIFFERENCE</span></h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 font-sans">
            <div className="p-12 rounded-[3.5rem] bg-white/[0.02] border border-white/5">
              <h4 className="text-white/40 font-black text-xs mb-10 uppercase tracking-widest">Geleneksel Tekerlek</h4>
              <ul className="space-y-6">
                {data.comparison.wheel.map((item, i) => (
                  <li key={i} className="flex gap-4 text-white/40 italic font-medium"><X className="text-red-500 flex-shrink-0" /> {item}</li>
                ))}
              </ul>
            </div>
            <div className="p-12 rounded-[3.5rem] bg-amber-500/[0.05] border border-amber-500/20 shadow-2xl">
              <h4 className="text-amber-500 font-black text-xs mb-10 uppercase tracking-widest font-black">PLT-18 TITAN</h4>
              <ul className="space-y-6">
                {data.comparison.track.map((item, i) => (
                  <li key={i} className="flex gap-4 text-white font-bold"><CheckCircle2 className="text-amber-500 flex-shrink-0" /> {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 4. TEKNİK ANALİZ TABLOSU */}
        <section className="py-44 px-6 container mx-auto max-w-5xl">
          <div className="flex items-center gap-10 mb-16">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic text-amber-500">TEKNİK ANALİZ</h2>
            <div className="h-px bg-gradient-to-r from-amber-500/50 to-transparent flex-grow" />
          </div>
          <div className="grid grid-cols-1 gap-4 font-sans">
            {data.technical.map((item, i) => (
              <div key={i} className="flex justify-between items-center py-8 border-b border-white/5 group hover:px-8 transition-all duration-500 hover:bg-white/[0.02] rounded-2xl">
                <span className="text-white/40 font-black uppercase text-[10px] tracking-[0.3em] group-hover:text-amber-500 transition-colors">{item.l}</span>
                <span className="text-xl md:text-3xl font-black italic tracking-tighter">{item.v}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 5. RESİM GALERİSİ */}
        <section className="py-32 px-6 container mx-auto">
          <div className="flex items-center gap-6 mb-16">
            <div className="p-4 bg-amber-500/10 rounded-2xl text-amber-500"><Camera size={32} /></div>
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">GÖRSEL <span className="text-amber-500 font-light italic">DETAYLAR</span></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {data.gallery.map((img, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10, scale: 1.02 }}
                onClick={() => setSelectedImg(img)}
                className="relative aspect-square rounded-[2rem] overflow-hidden border border-white/10 cursor-zoom-in group"
              >
                <Image src={img} alt="galeri" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Maximize2 size={32} />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 6. FINAL CTA & KATALOG BAĞLANTISI */}
        <section className="py-44 text-center bg-white text-black rounded-t-[5rem] md:rounded-t-[8rem] relative overflow-hidden">
          <h2 className="text-6xl md:text-[10rem] font-black uppercase tracking-tighter mb-16 leading-[0.85] italic">SINIRLARI <br /> <span className="text-amber-500">ZORLAYIN.</span></h2>
          <div className="flex flex-col sm:flex-row gap-8 justify-center px-6 max-w-4xl mx-auto relative z-10">
            <a href="/dokumanlar/PLT-18.pdf" target="_blank" className="flex-1 bg-black text-white px-12 py-8 rounded-full font-black text-xl hover:bg-amber-600 transition-all duration-500 flex items-center justify-center gap-4 group italic">
              KATALOG <FileText size={28} className="group-hover:rotate-12 transition-transform" />
            </a>
            <button onClick={() => setIsModalOpen(true)} className="flex-1 bg-amber-500 text-black px-12 py-8 rounded-full font-black text-xl hover:bg-black hover:text-white transition-all duration-500 shadow-2xl shadow-amber-500/20 uppercase italic font-black">
              TEKLİF TALEBİ
            </button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-black text-black/[0.02] select-none pointer-events-none uppercase italic">
            TITAN
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

      {/* MODERN WHITE FORM MODAL - MODERNİZE EDİLMİŞ VE KÜÇÜLTÜLMÜŞ */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-[480px] bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] overflow-hidden"
            >
              {!success && (
                <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-50 text-slate-400 transition-colors z-50"><X size={20} /></button>
              )}
              <div className="p-10 md:p-14 text-slate-900 font-sans">
                {success ? (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-6">
                    <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner"><CheckCircle2 size={40} /></div>
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter leading-tight text-slate-900">TALEBİNİZ <br /><span className="text-amber-500">KAYDEDİLDİ</span></h2>
                    <div className="w-12 h-1 bg-slate-100 mx-auto my-6 rounded-full" />
                    <p className="text-slate-500 font-medium italic leading-relaxed">"İlginiz için teşekkür ederiz. Ekibimiz en kısa sürede sizinle iletişime geçecektir."</p>
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