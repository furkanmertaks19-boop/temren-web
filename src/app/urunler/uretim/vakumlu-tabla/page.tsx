"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
    ChevronDown, CheckCircle2, ArrowRight, ShieldCheck,
    Zap, Settings, Layers, Ruler, Loader2, Camera, Maximize2, Send, User, Phone, Mail, MessageSquare, X
} from 'lucide-react';
import Footer from "@/components/layout/Footer";

// ✅ 1. TypeScript Arayüzleri (Interfaces)
interface GalleryItem {
    src: string;
    alt: string;
}

interface FormState {
    adSoyad: string;
    telefon: string;
    email: string;
    olcu: string;
    mesaj: string;
}

interface StatCardProps {
    icon: React.ReactNode;
    title: string;
    desc: string;
}

interface FormInputProps {
    icon: React.ReactNode;
    placeholder: string;
    value: string;
    onChange: (v: string) => void;
    type?: string;
}

export default function VakumluTablaPage() {
    const { scrollYProgress } = useScroll();
    const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedImg, setSelectedImg] = useState<string | null>(null);

    // --- FORM STATE ---
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [form, setForm] = useState<FormState>({
        adSoyad: "",
        telefon: "",
        email: "",
        olcu: "300 × 400 mm",
        mesaj: ""
    });

    const mainImage = "/image/vakum_4.JPG";
    const gallery: GalleryItem[] = [
        { src: "/image/vakum_1.JPG", alt: "Vakumlu Tabla Teknik Detay 1" },
        { src: "/image/vakum_2.JPG", alt: "Vakumlu Tabla Üretim Aşaması" },
        { src: "/image/vakum_3.JPG", alt: "Hassas Vakum Sabitleme Ünitesi" },
        { src: "/image/vakum_4.JPG", alt: "CNC Vakum Tablası Genel Görünüm" },
        { src: "/image/vakum_5.JPG", alt: "Vakumlu Tabla Arka Bağlantı Portları" }
    ];

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch("/api/quote-request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, productName: "Vakumlu Tabla" }),
            });

            if (response.ok) {
                setSuccess(true);
                setForm({ adSoyad: "", telefon: "", email: "", olcu: "300 × 400 mm", mesaj: "" });
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

            {/* ✅ SEO Şeması */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org/",
                        "@type": "Product",
                        "name": "Vakumlu Tabla Sistemi",
                        "image": `https://temrenmakina.com${mainImage}`,
                        "description": "Hassas yüzeylerde iz ve deformasyon oluşturmadan güçlü sabitleme sağlayan havacılık sınıfı alüminyum vakumlu tabla.",
                        "brand": { "@type": "Brand", "name": "Temren Makina" },
                        "offers": {
                            "@type": "Offer",
                            "availability": "https://schema.org/InStock",
                            "priceCurrency": "TRY"
                        }
                    })
                }}
            />

            {/* HERO BACKDROP */}
            <div className="fixed inset-0 w-full h-screen z-0">
                <motion.div style={{ scale }} className="relative w-full h-full">
                    <Image
                        src={mainImage}
                        alt="Temren Makina Vakumlu Tabla"
                        fill
                        className="object-cover opacity-40"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/80" />
                </motion.div>
            </div>

            <div className="relative z-10 w-full">
                {/* Hero Section */}
                <section className="h-screen flex flex-col items-center justify-center text-center px-6">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                        <span className="text-amber-500 font-black tracking-[0.5em] uppercase text-[12px] mb-8 block bg-amber-500/10 px-6 py-2 rounded-full border border-amber-500/20 w-fit mx-auto backdrop-blur-md italic">
                            PRECISION FIXING SYSTEMS
                        </span>
                        <h1 className="text-7xl md:text-[14rem] font-black tracking-tighter leading-[0.75] mb-8 uppercase italic drop-shadow-2xl text-white">
                            VAKUM <span className="text-amber-500">TABLA</span>
                        </h1>
                        <p className="text-white/80 text-xl md:text-3xl max-w-4xl mx-auto font-black leading-relaxed italic tracking-tight px-6 uppercase">
                            Hassas Sabitleme, Maksimum Verim.
                        </p>
                    </motion.div>
                    <ChevronDown className="absolute bottom-10 opacity-30 animate-bounce text-amber-500" size={40} />
                </section>

                {/* Avantajlar */}
                <section className="py-32 px-6 container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <StatCard icon={<Zap size={32} />} title="ZAMAN KAZANCI" desc="Bağlama-sökme süresi kısalır." />
                        <StatCard icon={<ShieldCheck size={32} />} title="GÜVENLİ TUTUŞ" desc="Deformasyon oluşturmadan sabitleme." />
                        <StatCard icon={<Layers size={32} />} title="TEMİZ ÇALIŞMA" desc="Mekanik aparat kirliliğini ortadan kaldırır." />
                        <StatCard icon={<Settings size={32} />} title="ESNEK YAPI" desc="Karmaşık geometrilere tam uyumlu." />
                    </div>
                </section>

                {/* Teknik Özellikler */}
                <section className="py-32 px-6 container mx-auto max-w-4xl">
                    <div className="flex items-center gap-10 mb-16">
                        <h2 className="text-5xl font-black uppercase italic tracking-tighter leading-none text-amber-500">TEKNİK ANALİZ</h2>
                        <div className="h-1 bg-white/10 flex-grow rounded-full" />
                    </div>
                    <div className="grid grid-cols-1 gap-4 font-sans text-white">
                        {[
                            { l: "Gövde Yapısı", v: "Havacılık Sınıfı Alüminyum" },
                            { l: "Vakum Bağlantısı", v: "Ø10 mm Standart Port" },
                            { l: "Çalışma Prensibi", v: "Yüzeyden Homojen Dağılım" },
                            { l: "Bakım", v: "Sıfır Bakım" }
                        ].map((item, i) => (
                            <div key={i} className="flex justify-between items-center py-10 border-b border-white/10 group transition-all hover:bg-white/[0.02] hover:px-8 rounded-3xl">
                                <span className="text-white/50 font-black uppercase text-xs tracking-[0.3em] group-hover:text-amber-500">{item.l}</span>
                                <span className="text-2xl md:text-4xl font-black italic tracking-tighter">{item.v}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Galeri */}
                <section className="py-32 px-6 container mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                        {gallery.map((img, i) => (
                            <motion.div key={i} whileHover={{ y: -15, scale: 1.05 }} onClick={() => setSelectedImg(img.src)} className="relative aspect-square rounded-[2.5rem] overflow-hidden border-2 border-white/5 cursor-zoom-in group">
                                <Image src={img.src} alt={img.alt} fill className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                    <Maximize2 size={40} className="text-amber-500" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Footer Call to Action */}
                <section className="py-44 text-center bg-white text-black rounded-t-[6rem] md:rounded-t-[10rem] relative overflow-hidden">
                    <div className="relative z-10 px-6 font-sans">
                        <h2 className="text-7xl md:text-[12rem] font-black uppercase tracking-tighter mb-20 leading-[0.8] italic text-black">HASSAS <br /> <span className="text-amber-500">OPERASYON.</span></h2>
                        <div className="flex justify-center">
                            <button onClick={() => setIsModalOpen(true)} className="bg-black text-white px-16 py-10 rounded-full font-black text-3xl hover:bg-amber-500 hover:text-black transition-all shadow-2xl uppercase italic flex items-center gap-6 group">
                                TEKLİF TALEBİ <ArrowRight size={36} className="group-hover:translate-x-4 transition-transform" />
                            </button>
                        </div>
                    </div>
                </section>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImg && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:p-20">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedImg(null)} className="fixed inset-0 bg-black/98 backdrop-blur-2xl cursor-zoom-out" />
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="relative w-full h-full">
                            <Image src={selectedImg} alt="Detay" fill className="object-contain" />
                            <button onClick={() => setSelectedImg(null)} className="absolute top-0 right-0 p-8 text-white hover:text-amber-500 transition-colors">
                                <X size={60} strokeWidth={3} />
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Teklif Formu Modalı */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-2xl" />
                        <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-[500px] bg-white rounded-[3rem] shadow-2xl overflow-hidden">
                            {!success && <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 p-2 rounded-full hover:bg-slate-100 text-slate-400 z-50 transition-all"><X size={24} /></button>}
                            <div className="p-12 md:p-14 text-slate-900 font-sans">
                                {success ? (
                                    <div className="text-center py-10">
                                        <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-inner"><CheckCircle2 size={50} /></div>
                                        <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-tight">TALEBİNİZ ALINDI</h2>
                                    </div>
                                ) : (
                                    <>
                                        <div className="mb-10 border-l-8 border-amber-500 pl-6 text-slate-900">
                                            <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none">TEKLİF ALIN</h2>
                                        </div>
                                        <form onSubmit={handleFormSubmit} className="space-y-4">
                                            <FormInput icon={<User size={18} />} placeholder="Ad Soyad" value={form.adSoyad} onChange={(v) => setForm({ ...form, adSoyad: v })} />
                                            <FormInput icon={<Phone size={18} />} placeholder="Telefon" value={form.telefon} onChange={(v) => setForm({ ...form, telefon: v })} type="tel" />
                                            <FormInput icon={<Mail size={18} />} placeholder="E-Posta" value={form.email} onChange={(v) => setForm({ ...form, email: v })} type="email" />

                                            <div className="relative group text-slate-900">
                                                <Ruler size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" />
                                                <select
                                                    value={form.olcu}
                                                    onChange={(e) => setForm({ ...form, olcu: e.target.value })}
                                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl pl-16 pr-8 py-5 text-slate-900 outline-none focus:border-amber-500 transition-all font-black appearance-none italic uppercase"
                                                >
                                                    <option>300 × 400 mm</option>
                                                    <option>400 × 600 mm</option>
                                                    <option>600 × 600 mm</option>
                                                    <option>ÖZEL ÖLÇÜ</option>
                                                </select>
                                            </div>

                                            <div className="relative group text-slate-900">
                                                <MessageSquare size={18} className="absolute left-6 top-7 text-slate-300" />
                                                <textarea
                                                    rows={2}
                                                    placeholder="Notlarınız..."
                                                    value={form.mesaj}
                                                    onChange={(e) => setForm({ ...form, mesaj: e.target.value })}
                                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl pl-16 pr-8 py-6 text-slate-900 outline-none focus:border-amber-500 transition-all font-black resize-none"
                                                />
                                            </div>

                                            <button disabled={loading} className="w-full bg-slate-900 text-white py-6 rounded-3xl font-black text-[12px] uppercase tracking-[0.3em] hover:bg-amber-500 hover:text-black transition-all flex items-center justify-center gap-4">
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
            <Footer />
        </main>
    );
}

// ✅ Alt Bileşenler (StatCard & FormInput)
function StatCard({ icon, title, desc }: StatCardProps) {
    return (
        <div className="p-12 rounded-[3rem] bg-white/[0.03] border border-white/10 hover:bg-amber-500 transition-all duration-700 group cursor-default">
            <div className="text-amber-500 group-hover:text-black mb-8 transition-colors group-hover:scale-110 origin-left">{icon}</div>
            <h4 className="text-2xl font-black mb-4 uppercase group-hover:text-black transition-colors italic leading-none tracking-tighter">{title}</h4>
            <p className="text-white/70 group-hover:text-black/90 text-sm leading-relaxed transition-colors font-black uppercase tracking-tight">{desc}</p>
        </div>
    );
}

function FormInput({ icon, placeholder, value, onChange, type = "text" }: FormInputProps) {
    return (
        <div className="relative group text-slate-900">
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