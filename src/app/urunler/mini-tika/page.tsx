"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
    ChevronDown, CheckCircle2, Settings, Zap, Layers,
    Ruler, Weight, BatteryCharging, Factory, ShieldCheck,
    Laptop, Activity, X, Scissors, Camera, Maximize2, Send, User, Phone, Mail, MessageSquare, Loader2
} from 'lucide-react';

export default function MiniTikaPage() {
    const { scrollYProgress } = useScroll();
    const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImg, setSelectedImg] = useState<string | null>(null);

    // --- FORM STATE ---
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [form, setForm] = useState({ adSoyad: "", telefon: "", email: "", uygulama: "", mesaj: "" });

    const mainImage = "/image/mini-tika-1.jpg";

    // Galeri Verileri
    const galleryItems = [
        { src: "/image/mini_tika_1.jpg", title: "Saha Testi 1" },
        { src: "/image/mini_tika_2.jpg", title: "Eğimli Arazi Performansı" },
        { src: "/image/mini_tika_3.jpg", title: "Kompakt Tasarım" },
        { src: "/image/mini_tika_4.jpg", title: "Endüstriyel Kaporta" },
        { src: "/image/mini-tika-1.jpg", title: "Hibrit Motor Yapısı" },
        { src: "/image/mini-tika-2.jpg", title: "Kasnak Teker Sistemi" },
        { src: "/image/mini-tika-3.jpg", title: "Operasyonel Görünüm" },
        { src: "/image/mini-tika-4.jpg", title: "Hassas Kesim" },
        { src: "/image/mini-tika-5.jpg", title: "Modüler Ataşmanlar" },
    ];

    const data = {
        eyebrow: "KOMPAKT HİBRİT TEKNOLOJİSİ",
        title: "MİNİ TİKA",
        lead: "Endüstriyel arazi kaportası ve özel teker yapısı ile zorlu zeminlere hazır kompakt bir platform. Hibrit mimaride bıçak tahriki benzinli motorla, sürüş ise elektrikli motorlarla sağlanır. 60 cm kesim çapı ve 1.5 ton vinç kapasitesi ile saha operasyonlarında yüksek esneklik sunar.",
        chips: ["Hibrit Tahrik", "60 cm Kesim", "1.5 ton Vinç", "Uzaktan Yükseklik Ayarı"],
        trustLine: "Hibrit güç • Hassas kontrol • Durdurulamaz manevra",
        stats: [
            { label: "Kesim Performansı", value: "%98", desc: "Isıl işlemli bıçak teknolojisi" },
            { label: "Tırmanma Kabiliyeti", value: "45°", desc: "Akıllı tork dağılımı" },
            { label: "Saha Dayanımı", value: "7/24", desc: "Endüstriyel kaporta koruması" }
        ],
        features: [
            {
                icon: <BatteryCharging size={36} />,
                title: "Hibrit Tahrik & Kaporta",
                desc: "4 DC elektrikli tahrik motoru + 1 içten yanmalı benzinli motor (10 BG). Benzinli motor aküleri sürekli şarj eder.",
                badge: "🔌 4×DC + 1×ICE • 10 BG"
            },
            {
                icon: <Scissors size={36} />,
                title: "Kesim & Yükseklik Ayarı",
                desc: "60 cm kesim çapı. Kumandadan 20–200 mm aralığında hassas yükseklik ayarı ile zemine anında adaptasyon sağlar.",
                badge: "⚙️ 60 cm • 20–200 mm Ayar"
            },
            {
                icon: <Layers size={36} />,
                title: "Şasi & Modüler Yapı",
                desc: "Eğimli araziler için özel kasnak teker tasarımı. Modüler arayüz ile tırmık, römork ve ilaçlama takılabilir.",
                badge: "🧩 Modüler Arayüz"
            }
        ],
        technical: [
            { l: "Motor", v: "Hibrit (4×DC + 10BG Benzinli)", icon: <Activity size={18} /> },
            { l: "Kesim Çapı", v: "600 mm (60 cm)", icon: <Scissors size={18} /> },
            { l: "Yükseklik Ayarı", v: "20–200 mm (Uzaktan)", icon: <Ruler size={18} /> },
            { l: "Vinç Kapasitesi", v: "1.5 Ton Çekme", icon: <Weight size={18} /> }
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
                    secim: "MİNİ TİKA PROJE TALEBİ",
                    sourcePage: "/urunler/mini-tika",
                    sourceLabel: "MİNİ TİKA PROJE",
                    mesaj: `UYGULAMA: ${form.uygulama} | NOT: ${form.mesaj}`
                }),
            });
            if (response.ok) {
                setSuccess(true);
                setTimeout(() => {
                    setIsModalOpen(false);
                    setSuccess(false);
                    setForm({ adSoyad: "", telefon: "", email: "", uygulama: "", mesaj: "" });
                }, 3500);
            }
        } catch (error) { alert("Hata oluştu!"); }
        finally { setLoading(false); }
    };

    return (
        <main className="bg-[#050505] min-h-screen relative text-white overflow-x-hidden selection:bg-amber-500 selection:text-black font-sans">

            {/* 1. HERO BACKDROP */}
            <div className="fixed inset-0 w-full h-screen z-0">
                <motion.div style={{ scale }} className="relative w-full h-full text-white">
                    <Image src={mainImage} alt="Mini TİKA Hibrit" fill className="object-cover opacity-60 md:opacity-80" priority />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/70" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
                </motion.div>
            </div>

            <div className="relative z-10 w-full">
                {/* HERO SECTION */}
                <section className="h-screen flex flex-col items-center justify-center text-center px-6">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                        <span className="text-amber-500 font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs mb-8 block bg-amber-500/10 px-6 py-2 rounded-full border border-amber-500/20 w-fit mx-auto backdrop-blur-md italic font-black uppercase">
                            {data.eyebrow}
                        </span>
                        <h1 className="text-7xl md:text-[14rem] font-black tracking-tighter leading-[0.8] mb-8 drop-shadow-2xl uppercase italic text-white">
                            MİNİ <span className="text-amber-500 italic">TİKA</span>
                        </h1>
                        <p className="text-white text-lg md:text-2xl max-w-5xl mx-auto font-bold leading-relaxed drop-shadow-md px-6 py-4 rounded-2xl bg-black/20 backdrop-blur-sm italic uppercase">
                            {data.lead}
                        </p>
                        <div className="flex flex-wrap justify-center gap-3 mt-12 max-w-4xl mx-auto">
                            {data.chips.map((chip, i) => (
                                <span key={i} className="text-[10px] md:text-xs font-black uppercase tracking-widest bg-white/10 backdrop-blur-2xl border border-white/20 px-6 py-3 rounded-xl italic">
                                    {chip}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                    <ChevronDown className="absolute bottom-10 opacity-30 animate-bounce text-amber-500" size={40} />
                </section>

                {/* STATS SECTION */}
                <section className="py-20 bg-amber-500 text-black">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                            {data.stats.map((stat, i) => (
                                <div key={i} className="space-y-2">
                                    <h4 className="text-sm font-black uppercase tracking-widest opacity-60">{stat.label}</h4>
                                    <div className="text-7xl md:text-8xl font-black italic tracking-tighter">{stat.value}</div>
                                    <p className="text-sm font-bold uppercase italic">{stat.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ÖNE ÇIKAN ÖZELLİKLER */}
                <section className="py-32 px-6 container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {data.features.map((feature, i) => (
                            <div key={i} className="group p-10 rounded-[3rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl hover:border-amber-500 transition-all duration-700 shadow-2xl">
                                <div className="text-amber-500 mb-6 group-hover:scale-110 transition-transform origin-left">{feature.icon}</div>
                                <h3 className="text-2xl font-black mb-4 uppercase italic tracking-tight text-white leading-tight">{feature.title}</h3>
                                <p className="text-white/80 leading-relaxed text-base font-bold italic tracking-tight mb-8">{feature.desc}</p>
                                <div className="text-amber-500 text-[10px] font-black uppercase tracking-[0.2em] bg-amber-500/10 px-6 py-3 rounded-xl w-fit italic border border-amber-500/20">{feature.badge}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* GALERİ SECTION - LIGHTBOX DESTEKLİ */}
                <section className="py-32 px-6 container mx-auto">
                    <div className="flex items-center gap-6 mb-16 border-l-8 border-amber-500 pl-8 text-left uppercase">
                        <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none text-white italic uppercase">GÖRSEL <span className="text-amber-500 font-light italic text-4xl md:text-6xl">DETAYLAR</span></h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 font-sans">
                        {galleryItems.map((img, i) => (
                            <motion.div key={i} whileHover={{ y: -15, scale: 1.02 }} onClick={() => setSelectedImg(img.src)} className="relative aspect-video rounded-[2.5rem] overflow-hidden border-2 border-white/5 cursor-zoom-in group shadow-2xl bg-white/5">
                                <Image src={img.src} alt={img.title} fill className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                                <div className="absolute inset-0 bg-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm"><Maximize2 size={40} className="text-white" /></div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* TEKNİK ANALİZ TABLOSU */}
                <section className="py-32 px-6 container mx-auto max-w-5xl text-left">
                    <div className="flex items-center gap-10 mb-16">
                        <h2 className="text-5xl font-black uppercase italic tracking-tighter leading-none text-amber-500">TEKNİK ANALİZ</h2>
                        <div className="h-px bg-gradient-to-r from-amber-500/50 to-transparent flex-grow" />
                    </div>
                    <div className="grid grid-cols-1 gap-4 font-sans text-white">
                        {data.technical.map((item, i) => (
                            <div key={i} className="flex justify-between items-center py-10 border-b border-white/5 group hover:px-8 transition-all duration-500 hover:bg-white/[0.02] rounded-3xl">
                                <div className="flex items-center gap-4 text-white/50 uppercase text-xs font-black tracking-[0.3em] group-hover:text-amber-500 transition-colors">
                                    {item.icon} {item.l}
                                </div>
                                <span className="text-2xl md:text-4xl font-black italic tracking-tighter text-white">{item.v}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FINAL CTA (OVAL VE KÜÇÜLTÜLMÜŞ) */}
                <section className="py-24 md:py-32 text-center bg-white text-black rounded-t-[4rem] md:rounded-t-[6rem] relative overflow-hidden font-sans">
                    <div className="relative z-10 px-6">
                        <h2 className="text-5xl md:text-[10rem] font-black uppercase tracking-tighter mb-12 leading-[0.85] italic text-black">ZORLU ZEMİNE <br /> <span className="text-amber-600">HAZIR OLUN.</span></h2>
                        <div className="flex justify-center max-w-lg mx-auto relative z-20">
                            <button onClick={() => setIsModalOpen(true)} className="w-full bg-amber-500 text-black px-14 py-10 rounded-full font-black text-2xl hover:bg-black hover:text-white transition-all shadow-2xl shadow-green-500/30 uppercase italic">PROJE TEKLİFİ ALIN</button>
                        </div>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-black text-black/[0.02] select-none pointer-events-none uppercase italic">MİNİ</div>
                </section>
            </div>

            {/* LIGHTBOX GALERİ */}
            <AnimatePresence>
                {selectedImg && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:p-20">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedImg(null)} className="fixed inset-0 bg-black/98 backdrop-blur-2xl cursor-zoom-out" />
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="relative w-full h-full flex items-center justify-center">
                            <Image src={selectedImg} alt="Large" fill className="object-contain shadow-2xl" />
                            <button onClick={() => setSelectedImg(null)} className="absolute top-0 right-0 p-8 text-white hover:text-amber-500 transition-colors drop-shadow-2xl"><X size={60} strokeWidth={3} /></button>
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
                            {!success && <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 transition-colors z-50"><X size={24} /></button>}
                            <div className="p-12 md:p-14 text-slate-900 font-sans text-left">
                                {success ? (
                                    <div className="text-center py-10">
                                        <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-inner"><CheckCircle2 size={50} /></div>
                                        <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-tight text-slate-900 uppercase italic text-center">KAYDEDİLDİ</h2>
                                        <p className="text-slate-600 font-black italic text-lg mt-4 uppercase text-center italic">En kısa sürede sizinle iletişime geçeceğiz.</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="mb-12 flex items-center gap-4 border-l-8 border-amber-500 pl-6 text-left uppercase italic"><h2 className="text-4xl font-black uppercase italic tracking-tighter text-slate-900 leading-none">MİNİ TİKA <span className="text-amber-500 font-light">PROJESİ</span></h2></div>
                                        <form onSubmit={handleSubmit} className="space-y-5 text-slate-900">
                                            <div className="relative group"><User size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-500 transition-colors" /><input required type="text" placeholder="Ad Soyad" value={form.adSoyad} onChange={(e) => setForm({ ...form, adSoyad: e.target.value })} className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl pl-16 pr-8 py-5 text-slate-900 outline-none focus:bg-white focus:border-amber-500 transition-all font-black text-md" /></div>
                                            <div className="relative group"><Phone size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-500 transition-colors" /><input required type="tel" placeholder="Telefon" value={form.telefon} onChange={(e) => setForm({ ...form, telefon: e.target.value })} className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl pl-16 pr-8 py-5 text-slate-900 outline-none focus:bg-white focus:border-amber-500 transition-all font-black text-md" /></div>
                                            <div className="relative group"><Mail size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-500 transition-colors" /><input required type="email" placeholder="E-Posta" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl pl-16 pr-8 py-5 text-slate-900 outline-none focus:bg-white focus:border-amber-500 transition-all font-black text-md" /></div>
                                            <div className="relative group"><Settings size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-500 transition-colors" /><input type="text" placeholder="Uygulama Alanı (Örn: Bağ-Bahçe)" value={form.uygulama} onChange={(e) => setForm({ ...form, uygulama: e.target.value })} className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl pl-16 pr-8 py-5 text-slate-900 outline-none focus:bg-white focus:border-amber-500 transition-all font-black text-md" /></div>
                                            <div className="relative group"><MessageSquare size={18} className="absolute left-6 top-7 text-slate-300 group-focus-within:text-amber-500 transition-colors" /><textarea rows={3} placeholder="Notlarınız..." value={form.mesaj} onChange={(e) => setForm({ ...form, mesaj: e.target.value })} className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl pl-16 pr-8 py-6 text-slate-900 outline-none focus:bg-white focus:border-amber-500 transition-all font-black text-md resize-none" /></div>
                                            <button disabled={loading} className="w-full bg-amber-500 text-black py-6 rounded-3xl font-black text-[12px] uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all flex items-center justify-center gap-4 shadow-2xl active:scale-[0.97] mt-4 uppercase italic">{loading ? <Loader2 className="animate-spin" size={24} /> : <>GÖNDER <Send size={18} /></>}</button>
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