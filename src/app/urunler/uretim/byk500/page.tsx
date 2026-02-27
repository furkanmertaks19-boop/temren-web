"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
    ChevronDown, CheckCircle2, FileText, ArrowRight, ShieldCheck,
    Zap, Gauge, Settings, X, Layers, Loader2, Camera, Maximize2, Send, User, Phone, Mail, MessageSquare, Droplets, PenTool
} from 'lucide-react';
import Footer from "@/components/layout/Footer";

export default function BYK500Page() {
    const { scrollYProgress } = useScroll();
    const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImg, setSelectedImg] = useState<string | null>(null);

    // --- FORM STATE ---
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [form, setForm] = useState({ adSoyad: "", telefon: "", email: "", mesaj: "" });

    const mainImage = "/image/boryag_1.jpg";
    const gallery = ["/image/boryag_1.jpg", "/image/boryag_2.jpg", "/image/boryag_3.jpg"];

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch("/api/quote-request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    productName: "BYK-500 Emülsiyon Cihazı", // Admin panelinde bu isimle düşecek
                    olcu: "%1 - %5 Yoğunluk"
                }),
            });

            if (response.ok) {
                setSuccess(true);
                setForm({ adSoyad: "", telefon: "", email: "", mesaj: "" });
                setTimeout(() => {
                    setIsModalOpen(false);
                    setSuccess(false);
                }, 3000);
            } else {
                alert("Talep gönderilirken bir hata oluştu.");
            }
        } catch (error) {
            alert("Bağlantı hatası!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="bg-[#050505] min-h-screen relative text-white selection:bg-amber-500 selection:text-black font-sans overflow-x-hidden">

            {/* 1. HERO BACKDROP */}
            <div className="fixed inset-0 w-full h-screen z-0">
                <motion.div style={{ scale }} className="relative w-full h-full">
                    <Image src={mainImage} alt="BYK-500" fill className="object-cover opacity-40" priority />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/80" />
                </motion.div>
            </div>
{/* ✅ SEO: BYK500 - Product + Breadcrumb + FAQ */}
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
          { "@type": "ListItem", "position": 3, "name": "Üretim", "item": "https://temrenmakina.com/urunler/uretim" },
          { "@type": "ListItem", "position": 4, "name": "BYK500", "item": "https://temrenmakina.com/urunler/uretim/byk500" }
        ]
      },

      // 2) Product
      {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "BYK500",
        "image": [
          "https://temrenmakina.com/og/byk500_1.jpg"
        ],
        "description": "BYK500; üretim süreçlerinde verimlilik ve dayanıklılık odaklı endüstriyel çözüm.",
        "brand": { "@type": "Brand", "name": "Temren Makina" },
        "category": "Üretim Ekipmanları",
        "url": "https://temrenmakina.com/urunler/uretim/byk500"
      },

      // 3) FAQ
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "BYK500 ne işe yarar?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Üretim süreçlerinde verimliliği artırmaya yönelik, endüstriyel kullanıma uygun bir çözümdür."
            }
          },
          {
            "@type": "Question",
            "name": "Hangi alanlarda kullanılır?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "İmalat/üretim hatlarında ve endüstriyel süreçlerde, uygulamaya göre farklı senaryolarda kullanılabilir."
            }
          },
          {
            "@type": "Question",
            "name": "Özelleştirilebilir mi?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Evet, kullanım ihtiyacına göre ölçü ve uygulama detayları Temren Makina tarafından uyarlanabilir."
            }
          },
          {
            "@type": "Question",
            "name": "Teklif nasıl alınır?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sayfadaki teklif formundan veya iletişim sayfası üzerinden BYK500 için teklif talep edebilirsiniz."
            }
          }
        ]
      }
    ]),
  }}
/>
            <div className="relative z-10 w-full">
                {/* HERO CONTENT */}
                <section className="h-screen flex flex-col items-center justify-center text-center px-6">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                        <span className="text-amber-500 font-black tracking-[0.5em] uppercase text-[12px] mb-8 block bg-amber-500/10 px-6 py-2 rounded-full border border-amber-500/20 w-fit mx-auto backdrop-blur-md italic">
                            PRECISION EMULSION SYSTEMS
                        </span>
                        <h1 className="text-7xl md:text-[14rem] font-black tracking-tighter leading-[0.75] mb-8 uppercase italic drop-shadow-2xl text-white">
                            BYK <span className="text-amber-500">500</span>
                        </h1>
                        <p className="text-white/80 text-xl md:text-3xl max-w-4xl mx-auto font-black leading-relaxed italic tracking-tight px-6 uppercase text-center">
                            Kompakt Tasarım, Maksimum Stabilite. Bor yağı karışımları için hassas yoğunluk çözümü.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 mt-12">
                            {["HASSAS YOĞUNLUK", "KADEMELİ AYAR", "STABİL ÇALIŞMA"].map((chip, i) => (
                                <span key={i} className="text-[10px] md:text-xs font-black uppercase tracking-widest bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-3 rounded-2xl">{chip}</span>
                            ))}
                        </div>
                    </motion.div>
                    <ChevronDown className="absolute bottom-10 opacity-30 animate-bounce text-amber-500" size={40} />
                </section>

                {/* 2. AVANTAJLAR */}
                <section className="py-32 px-6 container mx-auto">
                    <div className="mb-24 text-center">
                        <h2 className="text-6xl md:text-[10rem] font-black uppercase tracking-tighter mb-6 italic leading-none text-white text-center text-white">KULLANIM <span className="text-amber-500 font-light italic">AVANTAJLARI</span></h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: <Settings size={32} />, title: "KOMPAKT YAPI", desc: "Varil kapağına doğrudan sabitlenerek hızlı ve alan tasarruflu kurulum sağlar." },
                            { icon: <Gauge size={32} />, title: "HASSAS AYAR", desc: "Ayar vanası ile yoğunluk oranını kademeli ve güvenli şekilde kontrol edin." },
                            { icon: <PenTool size={32} />, title: "PRATİK MONTAJ", desc: "Teflonlanmış boru sistemi sayesinde sızıntısız ve kolay entegrasyon imkânı." },
                            { icon: <CheckCircle2 size={32} />, title: "STABİLİTE", desc: "Refraktometre ölçümüyle desteklenen sistem, sabit yoğunluklu karışım üretir." }
                        ].map((adv, i) => (
                            <div key={i} className="p-12 rounded-[3rem] bg-white/[0.03] border border-white/10 hover:bg-amber-500 transition-all duration-700 group cursor-default shadow-2xl">
                                <div className="text-amber-500 group-hover:text-black mb-8 transition-colors group-hover:scale-110 origin-left">{adv.icon}</div>
                                <h4 className="text-2xl font-black mb-4 uppercase group-hover:text-black transition-colors italic leading-none tracking-tighter">{adv.title}</h4>
                                <p className="text-white/70 group-hover:text-black/90 text-sm leading-relaxed transition-colors font-black uppercase tracking-tight">{adv.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3. TEKNİK TABLO */}
                <section className="py-32 px-6 container mx-auto max-w-4xl">
                    <div className="flex items-center gap-10 mb-16">
                        <h2 className="text-5xl font-black uppercase italic tracking-tighter leading-none text-amber-500">TEKNİK ANALİZ</h2>
                        <div className="h-1 bg-white/10 flex-grow rounded-full" />
                    </div>
                    <div className="grid grid-cols-1 gap-4 font-sans text-white">
                        {[
                            { l: "Yoğunluk Aralığı", v: "%1 – %5 Ayarlanabilir" },
                            { l: "Uygulama Alanı", v: "Endüstriyel Bor Yağı Sistemleri" },
                            { l: "Bağlantı Sistemi", v: "Şebeke Suyu & Karışım Çıkışı" },
                            { l: "Ölçüm Metodu", v: "Hassas Refraktometre Kontrolü" }
                        ].map((item, i) => (
                            <div key={i} className="flex justify-between items-center py-10 border-b border-white/10 group transition-all hover:bg-white/[0.02] hover:px-8 rounded-3xl">
                                <span className="text-white/50 font-black uppercase text-xs tracking-[0.3em] group-hover:text-amber-500 transition-colors text-left">{item.l}</span>
                                <span className="text-2xl md:text-4xl font-black italic tracking-tighter text-right">{item.v}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 4. GALERİ */}
                <section className="py-32 px-6 container mx-auto">
                    <div className="flex items-center gap-6 mb-16">
                        <div className="p-5 bg-amber-500/10 rounded-[2rem] text-amber-500"><Camera size={40} /></div>
                        <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none text-white text-center">GÖRSEL <span className="text-amber-500 font-light italic">DETAYLAR</span></h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {gallery.map((img, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -15, scale: 1.05 }}
                                onClick={() => setSelectedImg(img)}
                                className="relative aspect-video rounded-[2.5rem] overflow-hidden border-2 border-white/5 cursor-zoom-in group shadow-2xl"
                            >
                                <Image src={img} alt="BYK-500 Galeri" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                    <Maximize2 size={40} className="text-amber-500" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 5. FINAL CTA */}
                <section className="py-44 text-center bg-white text-black rounded-t-[6rem] md:rounded-t-[10rem] relative overflow-hidden">
                    <div className="relative z-10 px-6 font-sans">
                        <h2 className="text-7xl md:text-[12rem] font-black uppercase tracking-tighter mb-20 leading-[0.8] italic text-slate-900 text-center uppercase leading-none">HASSAS <br /> <span className="text-amber-500">AKIŞ.</span></h2>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-4xl mx-auto">
                            <a href="/dokumanlar/byk500.pdf" target="_blank" className="flex-1 bg-slate-100 text-slate-900 px-12 py-8 rounded-full font-black text-xl hover:bg-slate-200 transition-all flex items-center justify-center gap-4 group italic border border-slate-200 uppercase tracking-widest leading-none">
                                KATALOG <FileText size={28} className="group-hover:rotate-12 transition-transform" />
                            </a>
                            <button onClick={() => setIsModalOpen(true)} className="flex-1 bg-black text-white px-12 py-8 rounded-full font-black text-xl hover:bg-amber-500 hover:text-black transition-all shadow-2xl uppercase italic flex items-center justify-center gap-4 group leading-none">
                                TEKLİF TALEBİ <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[28vw] font-black text-black/[0.03] select-none pointer-events-none uppercase italic leading-none">EMULSION</div>
                </section>
            </div>

            {/* LIGHTBOX */}
            <AnimatePresence>
                {selectedImg && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-20 bg-black/98 backdrop-blur-2xl">
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="relative w-full h-full">
                            <Image src={selectedImg} alt="Detay" fill className="object-contain" />
                            <button onClick={() => setSelectedImg(null)} className="absolute top-0 right-0 p-8 text-white hover:text-amber-500 transition-colors"><X size={60} strokeWidth={3} /></button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* FORM MODAL */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-2xl" />
                        <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-[500px] bg-white rounded-[3rem] shadow-2xl overflow-hidden">
                            {!success && <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 p-2 rounded-full hover:bg-slate-100 text-slate-400 z-50 transition-all"><X size={24} /></button>}
                            <div className="p-12 md:p-14 text-slate-900 font-sans text-left">
                                {success ? (
                                    <div className="text-center py-10">
                                        <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-inner"><CheckCircle2 size={50} /></div>
                                        <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-tight text-slate-900">TALEBİNİZ <br /><span className="text-amber-500 font-light italic text-3xl">ALINDI</span></h2>
                                    </div>
                                ) : (
                                    <>
                                        <div className="mb-10 border-l-8 border-amber-500 pl-6 text-slate-900"><h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none">TEKLİF <span className="text-amber-500 font-light">ALIN</span></h2></div>
                                        <form onSubmit={handleFormSubmit} className="space-y-4">
                                            <div className="relative group text-slate-900">
                                                <User size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-500 transition-colors" />
                                                <input required type="text" placeholder="Ad Soyad" value={form.adSoyad} onChange={(e) => setForm({ ...form, adSoyad: e.target.value })} className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl pl-16 pr-8 py-5 text-slate-900 outline-none focus:bg-white focus:border-amber-500 transition-all font-black" />
                                            </div>
                                            <div className="relative group text-slate-900">
                                                <Phone size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-500 transition-colors" />
                                                <input required type="tel" placeholder="Telefon" value={form.telefon} onChange={(e) => setForm({ ...form, telefon: e.target.value })} className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl pl-16 pr-8 py-5 text-slate-900 outline-none focus:bg-white focus:border-amber-500 transition-all font-black" />
                                            </div>
                                            <div className="relative group text-slate-900">
                                                <Mail size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-500 transition-colors" />
                                                <input required type="email" placeholder="E-Posta" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl pl-16 pr-8 py-5 text-slate-900 outline-none focus:bg-white focus:border-amber-500 transition-all font-black" />
                                            </div>
                                            <div className="relative group text-slate-900">
                                                <MessageSquare size={18} className="absolute left-6 top-7 text-slate-300 group-focus-within:text-amber-500 transition-colors" />
                                                <textarea rows={2} placeholder="Sistem veya Proje Notlarınız..." value={form.mesaj} onChange={(e) => setForm({ ...form, mesaj: e.target.value })} className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl pl-16 pr-8 py-6 text-slate-900 outline-none focus:bg-white focus:border-amber-500 transition-all font-black resize-none" />
                                            </div>
                                            <button disabled={loading} className="w-full bg-slate-900 text-white py-6 rounded-3xl font-black text-[12px] uppercase tracking-[0.3em] hover:bg-amber-500 hover:text-black transition-all flex items-center justify-center gap-4 shadow-2xl active:scale-95 mt-4">
                                                {loading ? <Loader2 className="animate-spin" /> : <>GÖNDER <Send size={18} /></>}
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