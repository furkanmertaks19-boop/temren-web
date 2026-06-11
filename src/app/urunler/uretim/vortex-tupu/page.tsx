"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
    ChevronDown, CheckCircle2, FileText, ArrowRight, ShieldCheck,
    Zap, Settings, X, Layers, Loader2, Camera, Maximize2, Send, User, Phone, Mail, MessageSquare, Snowflake
} from 'lucide-react';
import Footer from "@/components/layout/Footer";

// ✅ Tip Tanımlamaları
interface Advantage {
    icon: React.ReactNode;
    title: string;
    desc: string;
}

interface TechDetail {
    l: string;
    v: string;
}

export default function VorteksTupuPage() {
    const { scrollYProgress } = useScroll();
    const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedImg, setSelectedImg] = useState<string | null>(null);

    // --- FORM STATE ---
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [form, setForm] = useState({ adSoyad: "", telefon: "", email: "", mesaj: "" });

    const mainImage = "/image/vortex_1.jpeg";
    const gallery = [
        { src: "/image/vortex_1.jpeg", alt: "Vorteks Tüpü Endüstriyel Soğutma Ünitesi" },
        { src: "/image/vortex_4.jpeg", alt: "Vorteks Tüpü Teknik Detay ve Valf Yapısı" },
        { src: "/image/vortex_3.jpg", alt: "Basınçlı Hava ile Soğutma Sistemi" }
    ];

    const advantages: Advantage[] = [
        { icon: <Snowflake size={32} />, title: "ANINDA SOĞUTMA", desc: "Elektrik ve kimyasal gerektirmeden yalnızca basınçlı hava ile çalışır." },
        { icon: <Zap size={32} />, title: "BAKIM GEREKTİRMEZ", desc: "Hareketli parça içermez, düşük maliyetli ve güvenilirdir." },
        { icon: <Layers size={32} />, title: "GENİŞ KULLANIM", desc: "CNC işlemleri, elektronik bileşenler ve CCTV soğutması için idealdir." },
        { icon: <Settings size={32} />, title: "KOMPAKT YAPI", desc: "Küçük boyutlu ve hafif yapısı sayesinde sistemlere kolayca entegre edilir." }
    ];

    const techDetails: TechDetail[] = [
        { l: "Sıcaklık Kontrolü", v: "Ayarlanabilir Valf Sistemi" },
        { l: "Çalışma Prensibi", v: "Ortamdan ~20°C Düşük Hava" },
        { l: "Güç Kaynağı", v: "Sadece Basınçlı Hava" },
        { l: "Malzeme Yapısı", v: "Dayanıklı Metal Alaşım" }
    ];

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch("/api/quote-request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    productName: "Vorteks Tüpü",
                    olcu: "Standart",
                    sourcePage: "/urunler/uretim/vortex-tupu",
                    sourceLabel: "Vorteks Tüpü",
                }),
            });

            if (response.ok) {
                setSuccess(true);
                setForm({ adSoyad: "", telefon: "", email: "", mesaj: "" });
                setTimeout(() => { setIsModalOpen(false); setSuccess(false); }, 3000);
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
 
            {/* ✅ SEO: Google İçin Ürün + Breadcrumb + FAQ Şemaları */}
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Anasayfa", "item": "https://temrenmakina.com" },
          { "@type": "ListItem", "position": 2, "name": "Ürünler", "item": "https://temrenmakina.com/urunler" },
          { "@type": "ListItem", "position": 3, "name": "Üretim", "item": "https://temrenmakina.com/urunler/uretim" },
          { "@type": "ListItem", "position": 4, "name": "Vorteks Tüpü", "item": "https://temrenmakina.com/urunler/uretim/vortex-tupu" }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Vorteks Tüpü",
        "image": [
          "https://temrenmakina.com/image/vortex_1.jpeg",
          "https://temrenmakina.com/image/vortex_4.jpeg",
          "https://temrenmakina.com/image/vortex_3.jpg"
        ],
        "description": "Hareketli parça içermeyen, basınçlı havayı anında soğuk havaya dönüştüren endüstriyel soğutma çözümü.",
        "brand": { "@type": "Brand", "name": "Temren Makina" },
        "category": "Endüstriyel Soğutma",
        "url": "https://temrenmakina.com/urunler/uretim/vortex-tupu"
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Vorteks tüpü nasıl çalışır?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Basınçlı havayı hareketli parça olmadan soğuk akıma dönüştürerek lokal soğutma sağlar."
            }
          },
          {
            "@type": "Question",
            "name": "Elektrik gerekir mi?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Hayır. Sistem yalnızca basınçlı hava ile çalışır."
            }
          },
          {
            "@type": "Question",
            "name": "Hangi alanlarda kullanılır?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "CNC işlemleri, elektronik bileşenler ve CCTV gibi ekipmanlarda lokal soğutma için uygundur."
            }
          },
          {
            "@type": "Question",
            "name": "Bakım gerektirir mi?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Hareketli parça içermediği için bakım ihtiyacı düşüktür."
            }
          }
        ]
      }
    ]),
  }}
/>
            {/* 1. HERO BACKDROP */}
            <div className="fixed inset-0 w-full h-screen z-0">
                <motion.div style={{ scale }} className="relative w-full h-full">
                    <Image src={mainImage} alt="Vorteks Tüpü Soğutma Teknolojisi" fill className="object-cover opacity-40" priority />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/80" />
                </motion.div>
            </div>

            <div className="relative z-10 w-full">
                {/* HERO CONTENT */}
                <section className="h-screen flex flex-col items-center justify-center text-center px-6">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                        <span className="text-amber-500 font-black tracking-[0.5em] uppercase text-[12px] mb-8 block bg-amber-500/10 px-6 py-2 rounded-full border border-amber-500/20 w-fit mx-auto backdrop-blur-md italic text-white">
                            KOMPAKT GÜÇ TEKNOLOJİSİ
                        </span>
                        <h1 className="text-7xl md:text-[14rem] font-black tracking-tighter leading-[0.75] mb-8 uppercase italic drop-shadow-2xl text-white">
                            VORTEKS <span className="text-amber-500">TÜPÜ</span>
                        </h1>
                        <p className="text-white/80 text-xl md:text-3xl max-w-4xl mx-auto font-black leading-relaxed italic tracking-tight px-6 uppercase">
                            Basınçlı havayı hareketli parça olmadan anında soğuk akıma dönüştüren ileri teknoloji.
                        </p>
                    </motion.div>
                    <ChevronDown className="absolute bottom-10 opacity-30 animate-bounce text-amber-500" size={40} />
                </section>

                {/* AVANTAJLAR */}
                <section className="py-32 px-6 container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {advantages.map((adv, i) => (
                            <div key={i} className="p-12 rounded-[3rem] bg-white/[0.03] border border-white/10 hover:bg-amber-500 transition-all duration-700 group cursor-default">
                                <div className="text-amber-500 group-hover:text-black mb-8 transition-colors">{adv.icon}</div>
                                <h4 className="text-2xl font-black mb-4 uppercase group-hover:text-black italic tracking-tighter">{adv.title}</h4>
                                <p className="text-white/70 group-hover:text-black/90 text-sm font-black uppercase tracking-tight">{adv.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* TEKNİK ANALİZ */}
                <section className="py-32 px-6 container mx-auto max-w-4xl text-white">
                    <div className="flex items-center gap-10 mb-16 font-black italic">
                        <h2 className="text-5xl uppercase tracking-tighter text-amber-500">TEKNİK ANALİZ</h2>
                        <div className="h-1 bg-white/10 flex-grow rounded-full" />
                    </div>
                    <div className="grid grid-cols-1 gap-4 font-sans">
                        {techDetails.map((item, i) => (
                            <div key={i} className="flex justify-between items-center py-10 border-b border-white/10 group transition-all hover:bg-white/[0.02] hover:px-8 rounded-3xl">
                                <span className="text-white/50 font-black uppercase text-xs tracking-[0.3em] group-hover:text-amber-500">{item.l}</span>
                                <span className="text-2xl md:text-4xl font-black italic tracking-tighter">{item.v}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* GALERİ */}
                <section className="py-32 px-6 container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {gallery.map((img, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -15, scale: 1.05 }}
                                onClick={() => setSelectedImg(img.src)}
                                className="relative aspect-video rounded-[2.5rem] overflow-hidden border-2 border-white/5 cursor-zoom-in group shadow-2xl"
                            >
                                <Image src={img.src} alt={img.alt} fill className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                    <Maximize2 size={40} className="text-amber-500" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* FINAL CTA */}
                <section className="py-44 text-center bg-white text-black rounded-t-[6rem] md:rounded-t-[10rem] relative overflow-hidden">
                    <div className="relative z-10 px-6 font-sans">
                        <h2 className="text-7xl md:text-[12rem] font-black uppercase tracking-tighter mb-20 leading-[0.8] italic text-slate-900">VERİMLİ <br /> <span className="text-amber-500">SOĞUTMA.</span></h2>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-4xl mx-auto">
                            <a href="/dokumanlar/vorteks.pdf" target="_blank" className="flex-1 bg-slate-100 text-slate-900 px-12 py-8 rounded-full font-black text-xl hover:bg-slate-200 transition-all flex items-center justify-center gap-4 group italic border border-slate-200 uppercase tracking-widest">
                                KATALOG <FileText size={28} />
                            </a>
                            <button onClick={() => setIsModalOpen(true)} className="flex-1 bg-black text-white px-12 py-8 rounded-full font-black text-xl hover:bg-amber-500 hover:text-black transition-all shadow-2xl uppercase italic flex items-center justify-center gap-4 group">
                                TEKLİF TALEBİ <ArrowRight size={28} />
                            </button>
                        </div>
                    </div>
                </section>
            </div>

            {/* LIGHTBOX */}
            <AnimatePresence>
                {selectedImg && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:p-20">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedImg(null)} className="fixed inset-0 bg-black/98 backdrop-blur-2xl cursor-zoom-out" />
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="relative w-full h-full">
                            <Image src={selectedImg} alt="Vorteks Tüpü Görünümü" fill className="object-contain" />
                            <button onClick={() => setSelectedImg(null)} className="absolute top-0 right-0 p-8 text-white hover:text-amber-500 transition-colors"><X size={60} /></button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* MODAL FORM */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-2xl" />
                        <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-[500px] bg-white rounded-[3rem] shadow-2xl overflow-hidden text-slate-900">
                            {!success && <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-slate-400 hover:text-red-500 transition-all"><X size={24} /></button>}
                            <div className="p-12 md:p-14 font-sans">
                                {success ? (
                                    <div className="text-center py-10">
                                        <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-inner"><CheckCircle2 size={50} /></div>
                                        <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-tight">TALEBİNİZ <br /><span className="text-amber-500 font-light italic text-3xl">KAYDEDİLDİ</span></h2>
                                    </div>
                                ) : (
                                    <>
                                        <div className="mb-10 border-l-8 border-amber-500 pl-6"><h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none">TEKLİF <span className="text-amber-500 font-light">ALIN</span></h2></div>
                                        <form onSubmit={handleFormSubmit} className="space-y-4">
                                            <FormInput icon={<User size={18} />} placeholder="Ad Soyad" value={form.adSoyad} onChange={(v: string) => setForm({ ...form, adSoyad: v })} />
                                            <FormInput icon={<Phone size={18} />} placeholder="Telefon" value={form.telefon} onChange={(v: string) => setForm({ ...form, telefon: v })} type="tel" />
                                            <FormInput icon={<Mail size={18} />} placeholder="E-Posta" value={form.email} onChange={(v: string) => setForm({ ...form, email: v })} type="email" />
                                            <div className="relative group">
                                                <MessageSquare size={18} className="absolute left-6 top-7 text-slate-300 group-focus-within:text-amber-500" />
                                                <textarea rows={2} placeholder="Sistem veya Proje Notlarınız..." value={form.mesaj} onChange={(e) => setForm({ ...form, mesaj: e.target.value })} className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl pl-16 pr-8 py-6 text-slate-900 outline-none focus:bg-white focus:border-amber-500 transition-all font-black resize-none" />
                                            </div>
                                            <button disabled={loading} className="w-full bg-slate-900 text-white py-6 rounded-3xl font-black uppercase tracking-[0.3em] hover:bg-amber-500 hover:text-black transition-all flex items-center justify-center gap-4 active:scale-95 mt-4 shadow-2xl">
                                                {loading ? <Loader2 className="animate-spin text-white" /> : <>GÖNDER <Send size={18} /></>}
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

// ✅ Alt Bileşenler (Tipleştirilmiş)
function FormInput({ icon, placeholder, value, onChange, type = "text" }: { icon: React.ReactNode, placeholder: string, value: string, onChange: (v: string) => void, type?: string }) {
    return (
        <div className="relative group">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-500">{icon}</div>
            <input
                required
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl pl-16 pr-8 py-5 text-slate-900 outline-none focus:bg-white focus:border-amber-500 transition-all font-black"
            />
        </div>
    );
}