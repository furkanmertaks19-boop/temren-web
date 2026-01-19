"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
    ChevronDown, CheckCircle2, FileText,
    Settings, Layers, ShieldCheck, Tractor, Wrench, Sprout, Building2, Factory, Snowflake,
    TreePine, Forklift, SprayCan, LandPlot, Plus, X, Laptop, Activity, Camera, Maximize2, Send, User, Phone, Mail, MessageSquare, Loader2
} from 'lucide-react';

export default function TikaPage() {
    const { scrollYProgress } = useScroll();
    const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImg, setSelectedImg] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    // --- FORM DURUMLARI ---
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [form, setForm] = useState({ adSoyad: "", telefon: "", email: "", sektor: "", mesaj: "" });

    const mainVideo = "/image/tika-kisa-video.mp4";

    // Galeri Verileri
    const galleryItems = [
        { src: "/image/tika-atasman-1.png", title: "Ataşman Çözümü 1" },
        { src: "/image/tika-atasman-2.jpg", title: "Ataşman Çözümü 2" },
        { src: "/image/tika-atasman-6.jpg", title: "Ataşman Çözümü 3" },
        { src: "/image/tika-atasman-4.png", title: "Ataşman Çözümü 4" },
        { src: "/image/tika-atasman-5.jpg", title: "Ataşman Çözümü 5" },
        { src: "/image/tika-img1.jpg", title: "Saha Uygulaması 1" },
        { src: "/image/tika-img2.jpg", title: "Saha Uygulaması 2" },
        { src: "/image/tika-img3.jpg", title: "Saha Uygulaması 3" },
        { src: "/image/tika-img4.jpeg", title: "Saha Uygulaması 4" },
        { src: "/image/tika-img5.jpeg", title: "Saha Uygulaması 5" },
        { src: "/image/tika-img6.jpeg", title: "Saha Uygulaması 6" },
        { src: "/image/tika-img7.jpeg", title: "Saha Uygulaması 7" },
    ];

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.8;
        }
    }, []);

    const data = {
        eyebrow: "YENİLİKÇİ TARIM & HİZMET ROBOTU",
        title: "TİKA",
        lead: "TİKA; uzaktan kumanda ile yönetilen, güçlü şasi ve dayanıklı palet yapısına sahip, çok amaçlı bir platformdur. Değiştirilebilir ataşmanları sayesinde tek gövde üzerinden çok yönlü çözüm sunar.",
        chips: ["Uzaktan Kumanda", "Modüler Ataşman", "Dayanıklı Palet", "Hızlı Değişim"],
        trustLine: "Güvenlik artışı • Operatör konforu • Maksimum verimlilik",
        features: [
            {
                icon: <Laptop size={36} />,
                title: "Uzaktan Kumanda",
                desc: "Operatörü riskli veya zorlu arazilerde araca doğrudan maruz bırakmadan güvenli çalışma imkanı sunar.",
                benefit: "Sıfır riskli operasyon",
            },
            {
                icon: <Layers size={36} />,
                title: "Modüler Ataşman",
                desc: "Tek platform üzerinden ilaçlama, forklift ve hasat gibi onlarca farklı görev saniyeler içinde yapılandırılabilir.",
                benefit: "Sınırsız çözüm",
            },
            {
                icon: <ShieldCheck size={36} />,
                title: "Dayanıklı Palet",
                desc: "Düşük zemin baskısı ile toprağa nazik temas sağlarken, çamurlu zeminlerde üstün tutuş sunar.",
                benefit: "Ekstrem arazi uyumluluğu",
            }
        ],
        useCases: [
            { category: "Tarım", icon: <Tractor size={24} />, items: ["İlaçlama", "Çapa", "Hasat"] },
            { category: "Belediye", icon: <Building2 size={24} />, items: ["Park Bakımı", "Temizlik"] },
            { category: "Sanayi", icon: <Factory size={24} />, items: ["Lojistik", "Saha Düzenleme"] },
            { category: "Kış", icon: <Snowflake size={24} />, items: ["Kar Küreme", "Tuzlama"] },
            { category: "Acil Durum", icon: <Activity size={24} />, items: ["Arama Kurtarma", "Lojistik"] }
        ]
    };

    // --- FORM GÖNDERME FONKSİYONU ---
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, secim: "TİKA PROJE TALEBİ" }),
            });
            if (response.ok) {
                setSuccess(true);
                setTimeout(() => {
                    setIsModalOpen(false);
                    setSuccess(false);
                    setForm({ adSoyad: "", telefon: "", email: "", sektor: "", mesaj: "" });
                }, 3500);
            }
        } catch (error) { alert("Hata oluştu!"); }
        finally { setLoading(false); }
    };

    return (
        <main className="bg-[#050505] min-h-screen relative text-white overflow-x-hidden selection:bg-green-500 selection:text-black font-sans">

            {/* 1. VİDEO ARKA PLAN KATMANI */}
            <div className="fixed inset-0 w-full h-screen z-0">
                <motion.div style={{ scale }} className="relative w-full h-full">
                    <video
                        ref={videoRef}
                        src={mainVideo}
                        autoPlay loop muted playsInline
                        className="object-cover w-full h-full opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/70" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
                </motion.div>
            </div>

            <div className="relative z-10 w-full">
                {/* HERO SECTION - BRÜTAL KALIN FONT */}
                <section className="h-screen flex flex-col items-center justify-center text-center px-6">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                        <span className="text-green-400 font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs mb-8 block bg-green-500/10 px-6 py-2 rounded-full border border-green-500/20 w-fit mx-auto backdrop-blur-md italic font-black">
                            {data.eyebrow}
                        </span>
                        <h1 className="text-7xl md:text-[16rem] font-black tracking-tighter leading-[0.8] mb-8 drop-shadow-2xl uppercase italic">
                            {data.title}
                        </h1>
                        <p className="text-white text-lg md:text-2xl max-w-5xl mx-auto font-bold leading-relaxed drop-shadow-2xl px-6 bg-black/30 backdrop-blur-md py-4 rounded-2xl border border-white/5 font-sans italic">
                            {data.lead}
                        </p>
                        <div className="flex flex-wrap justify-center gap-3 mt-12 max-w-4xl mx-auto">
                            {data.chips.map((chip, i) => (
                                <span key={i} className="text-[10px] md:text-xs font-black uppercase tracking-widest bg-green-900/40 backdrop-blur-2xl border border-white/20 px-6 py-3 rounded-xl text-white italic">
                                    {chip}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                    <ChevronDown className="absolute bottom-10 opacity-30 animate-bounce text-green-400" size={40} />
                </section>

                {/* 2. ÖZELLİKLER SECTION */}
                <section className="py-32 px-6 container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {data.features.map((feature, i) => (
                            <div key={i} className="group p-12 rounded-[4rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl hover:border-green-500 transition-all duration-700">
                                <div className="text-green-400 mb-6 group-hover:scale-110 transition-transform origin-left">{feature.icon}</div>
                                <h3 className="text-2xl font-black mb-6 uppercase italic text-white tracking-tighter leading-none">{feature.title}</h3>
                                <p className="text-white/80 leading-relaxed text-lg font-bold tracking-tight mb-8">{feature.desc}</p>
                                <div className="text-green-400 text-[10px] font-black uppercase tracking-[0.2em] bg-green-900/20 px-6 py-3 rounded-xl w-fit italic">
                                    {feature.benefit}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3. GÖRSEL DETAYLAR GALERİSİ */}
                <section className="py-32 px-6 container mx-auto text-left">
                    <div className="flex items-center gap-6 mb-16 border-l-8 border-green-500 pl-8">
                        <div>
                            <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none text-white uppercase">GÖRSEL <span className="text-green-400 font-light italic text-4xl md:text-6xl">DETAYLAR</span></h2>
                            <p className="text-white/30 uppercase font-black tracking-[0.4em] text-[10px] mt-4 flex items-center gap-2 font-sans italic"><Camera size={14} /> TİKA Ataşman ve Saha Operasyonları</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {galleryItems.map((img, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -15, scale: 1.02 }}
                                onClick={() => setSelectedImg(img.src)}
                                className="relative aspect-square rounded-[2.5rem] overflow-hidden border-2 border-white/5 cursor-zoom-in group shadow-2xl bg-white/5"
                            >
                                <Image src={img.src} alt={img.title} fill className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                                <div className="absolute inset-0 bg-green-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                    <Maximize2 size={40} className="text-white" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 4. KULLANIM SENARYOLARI */}
                <section className="py-32 px-6 bg-white/[0.03] border-y border-white/5">
                    <div className="container mx-auto">
                        <h2 className="text-5xl md:text-7xl font-black uppercase italic mb-16 italic text-white leading-none">KULLANIM <span className="text-green-400 font-light italic">SENARYOLARI</span></h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 font-sans">
                            {data.useCases.map((useCase, i) => (
                                <div key={i} className="p-8 rounded-3xl bg-black/60 border border-white/5 hover:bg-green-900/30 transition-all group">
                                    <div className="text-green-400 mb-4 group-hover:scale-110 transition-transform">{useCase.icon}</div>
                                    <h4 className="text-xl font-black mb-4 uppercase tracking-tighter text-white italic">{useCase.category}</h4>
                                    <ul className="space-y-2 opacity-50">
                                        {useCase.items.map((item, idx) => (
                                            <li key={idx} className="text-sm font-black italic text-white">• {item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- 5. FINAL CTA SECTION (DÜZELTİLEN VE KÜÇÜLTÜLEN ALAN) --- */}
                <section className="py-24 md:py-32 text-center bg-white text-black rounded-t-[4rem] md:rounded-t-[6rem] relative overflow-hidden font-sans">
                    <div className="relative z-10 px-6">
                        {/* Yazı boyutu md:text-[10rem] olarak dengelendi */}
                        <h2 className="text-5xl md:text-[10rem] font-black uppercase tracking-tighter mb-12 leading-[0.85] italic">
                            TEK PLATFORM, <br /> <span className="text-green-600">SINIRSIZ GÖREV.</span>
                        </h2>
                        <div className="flex justify-center max-w-lg mx-auto relative z-20">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="w-full bg-green-500 text-black px-10 py-6 md:py-8 rounded-full font-black text-xl md:text-2xl hover:bg-black hover:text-white transition-all shadow-2xl shadow-green-500/30 uppercase italic"
                            >
                                PROJE TEKLİFİ ALIN
                            </button>
                        </div>
                    </div>
                    {/* Arka plan TİKA yazısı biraz daha küçültüldü */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-black text-black/[0.02] select-none pointer-events-none uppercase italic">
                        TİKA
                    </div>
                </section>
            </div>

            {/* LIGHTBOX GALERİ (RESİM BÜYÜTME) */}
            <AnimatePresence>
                {selectedImg && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:p-20">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedImg(null)} className="fixed inset-0 bg-black/98 backdrop-blur-2xl cursor-zoom-out" />
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="relative w-full h-full flex items-center justify-center">
                            <Image src={selectedImg} alt="Large" fill className="object-contain shadow-2xl" />
                            <button onClick={() => setSelectedImg(null)} className="absolute top-0 right-0 p-8 text-white hover:text-green-400 transition-colors drop-shadow-2xl"><X size={60} strokeWidth={3} /></button>
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
                            className="relative w-full max-w-[480px] bg-white rounded-[3rem] shadow-2xl overflow-hidden"
                        >
                            {!success && <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 p-2 rounded-full hover:bg-slate-100 text-slate-400 z-50 transition-all"><X size={24} /></button>}
                            <div className="p-12 md:p-14 text-slate-900 font-sans text-left">
                                {success ? (
                                    <div className="text-center py-10">
                                        <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-inner"><CheckCircle2 size={50} /></div>
                                        <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-tight text-slate-900">TALEBİNİZ <br /><span className="text-green-500 font-light italic text-black uppercase">KAYDEDİLDİ</span></h2>
                                        <p className="text-slate-600 font-black italic text-lg leading-relaxed mt-4 uppercase text-center">Ekibimiz en kısa sürede sizinle iletişime geçecektir.</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="mb-12 flex items-center gap-4 border-l-8 border-green-500 pl-6 text-left uppercase italic">
                                            <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none text-slate-900">TİKA <span className="text-green-500 font-light italic">PROJESİ</span></h2>
                                        </div>
                                        <form onSubmit={handleSubmit} className="space-y-5 text-slate-900">
                                            <div className="relative group">
                                                <User size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-green-500 transition-colors" />
                                                <input required type="text" placeholder="Ad Soyad" value={form.adSoyad} onChange={(e) => setForm({ ...form, adSoyad: e.target.value })} className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl pl-16 pr-8 py-5 text-slate-900 outline-none focus:bg-white focus:border-green-500 transition-all font-black text-md" />
                                            </div>
                                            <div className="relative group">
                                                <Phone size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-green-500 transition-colors" />
                                                <input required type="tel" placeholder="Telefon" value={form.telefon} onChange={(e) => setForm({ ...form, telefon: e.target.value })} className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl pl-16 pr-8 py-5 text-slate-900 outline-none focus:bg-white focus:border-green-500 transition-all font-black text-md" />
                                            </div>
                                            <div className="relative group">
                                                <Mail size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-green-500 transition-colors" />
                                                <input required type="email" placeholder="E-Posta" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl pl-16 pr-8 py-5 text-slate-900 outline-none focus:bg-white focus:border-green-500 transition-all font-black text-md" />
                                            </div>
                                            <div className="relative group">
                                                <Factory size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-green-500 transition-colors" />
                                                <input type="text" placeholder="Sektör (Tarım, Belediye vb.)" value={form.sektor} onChange={(e) => setForm({ ...form, sektor: e.target.value })} className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl pl-16 pr-8 py-5 text-slate-900 outline-none focus:bg-white focus:border-green-500 transition-all font-black text-md" />
                                            </div>
                                            <div className="relative group">
                                                <MessageSquare size={18} className="absolute left-6 top-7 text-slate-300 group-focus-within:text-green-500 transition-colors" />
                                                <textarea rows={2} placeholder="İhtiyaçlarınız / Ataşman Talebi..." value={form.mesaj} onChange={(e) => setForm({ ...form, mesaj: e.target.value })} className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl pl-16 pr-8 py-6 text-slate-900 outline-none focus:bg-white focus:border-green-500 transition-all font-black text-md resize-none" />
                                            </div>
                                            <button disabled={loading} className="w-full bg-green-600 text-white py-6 rounded-3xl font-black text-[12px] uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all flex items-center justify-center gap-4 shadow-2xl active:scale-[0.97] mt-4 italic font-black uppercase">
                                                {loading ? <Loader2 className="animate-spin" size={24} /> : <>TALEBİ GÖNDER <Send size={18} /></>}
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