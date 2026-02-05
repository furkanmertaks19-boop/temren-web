"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
    ChevronDown, CheckCircle2, FileText, ArrowRight,
    Zap, Settings, X, Layers, ShieldCheck, Thermometer, Droplets,
    FlaskConical, Factory, Ruler, Activity, Truck, Tractor, HardHat, Pickaxe
} from 'lucide-react';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CNC Vakum Tablası | Yüksek Hassasiyetli Tutucu Sistemler",
  description: "CNC tezgahlarında seri işler için yüksek tutuculuk ve hassasiyet sağlayan Temren Makina vakum tablaları. Maksimum verimlilik ve tekrarlanabilirlik için tasarlanmıştır.",
  keywords: [
    "vakum tablası", 
    "CNC vakum tablası fiyatları", 
    "hassas tutucu sistemler", 
    "vakumlu tabla çalışma prensibi", 
    "Temren Makina vakum tablası"
  ],
  openGraph: {
    title: "CNC Vakum Tablası - Temren Makina",
    description: "Üretim süreçlerinizde hız ve hassasiyet kazandıran vakum tablası çözümlerimiz.",
    images: [
      {
        url: "/image/vakum_5.jpg", // Ürünün kendi görseli
        width: 1200,
        height: 630,
        alt: "Temren Makina Vakum Tablası",
      },
    ],
  },
};
export default function KaucukSistemleriPage() {
    const { scrollYProgress } = useScroll();
    const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
    const [imgError, setImgError] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Senin klasöründeki dosya adı: kaucuk.png
    const mainImage = "/image/kaucuk.png";

    const data = {
        eyebrow: "Ürün Kodu: KAU-01",
        title: "Kauçuk",
        titleSecond: "Sistemleri",
        fullName: "KAU-01 Endüstriyel Kauçuk Sistemleri",
        lead: "Zorlu koşullara dayanıklı özel bileşimler, yüksek aşınma direnci ve darbe emilimiyle endüstriyel kullanımlarda uzun ömürlü performans sunar. Titreşimi sönümleyen yapısı ekipman ömrünü uzatır.",
        chips: ["Yüksek Kimyasal Direnç", "Düşük Titreşim", "Darbe Emilimi", "Özelleştirilebilir Formül"],
        trustLine: "Aşınmaya dayanıklı • Geniş uygulama alanı • Özelleştirilebilir",

        valueProps: [
            { title: "Aşınma Direnci", desc: "Yoğun kullanımlarda dahi formunu ve performansını koruyan yüksek mukavemetli bileşim.", icon: <Layers size={24} /> },
            { title: "Isı & Kimyasal", desc: "Yağ, asit ve çamur gibi agresif ortamlarda dahi stabiliteyi koruyan özel tolerans.", icon: <Thermometer size={24} /> },
            { title: "Modüler Montaj", desc: "Hızlı kurulum ve kolay bakım için optimize edilmiş, yerinde servis dostu tasarım.", icon: <Settings size={24} /> }
        ],

        sectors: [
            { name: "Tarım", desc: "Palet sistemlerinde kaymayı azaltır, toprağa nazik basınç sağlar.", icon: <Tractor size={30} /> },
            { name: "İnşaat", desc: "Ağır yüklere dayanım ve titreşim sönümleme ile ekipman korunumu.", icon: <HardHat size={30} /> },
            { name: "Otomotiv", desc: "NVH (gürültü & titreşim) optimizasyonu ve sızdırmazlık.", icon: <Truck size={30} /> },
            { name: "Maden", desc: "Kimyasallara dirençli, ağır hizmet şartlarında uzun ömür.", icon: <Pickaxe size={30} /> },
            { name: "Savunma", desc: "Özel bileşimler ve zorlu iklimlere uygun taktik çözümler.", icon: <ShieldCheck size={30} /> }
        ],

        techParams: [
            { l: "Shore A Sertlik", v: "60–80 Shore A", icon: <Activity size={18} /> },
            { l: "Sıcaklık Aralığı", v: "-30°C ~ +90°C", icon: <Thermometer size={18} /> },
            { l: "Kimyasal Dayanım", v: "Yağ / Asit / Çamur (Stabil)", icon: <Droplets size={18} /> },
            { l: "Yoğunluk", v: "1.1 – 1.3 g/cm³", icon: <Ruler size={18} /> },
            { l: "Bileşim", v: "Özel Karışım Kauçuk", icon: <FlaskConical size={18} /> }
        ]
    };

    return (
        <main className="bg-[#050505] min-h-screen relative text-white overflow-x-hidden font-sans selection:bg-amber-500 selection:text-black">

            {/* 1. ARKA PLAN - KAUCUK GÖRSELİ */}
            <div className="fixed inset-0 w-full h-screen z-0">
                <motion.div style={{ scale }} className="relative w-full h-full">
                    {!imgError && (
                        <Image
                            src={mainImage}
                            alt="Temren Kauçuk Sistemleri"
                            fill
                            className="object-cover opacity-60 md:opacity-75"
                            priority
                            onError={() => setImgError(true)}
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/30 to-[#050505]/70" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
                </motion.div>
            </div>

            <div className="relative z-10 w-full">
                {/* HERO SECTION */}
                <section className="h-screen flex flex-col items-center justify-center text-center px-6">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                        <span className="text-amber-500 font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs mb-8 block bg-amber-500/10 px-6 py-2 rounded-full border border-amber-500/20 w-fit mx-auto backdrop-blur-md">
                            {data.eyebrow}
                        </span>
                        <h1 className="text-7xl md:text-[14rem] font-black tracking-tighter leading-[0.8] mb-8 drop-shadow-2xl uppercase">
                            {data.title} <span className="text-amber-500 font-light italic block md:inline md:ml-4">{data.titleSecond}</span>
                        </h1>

                        <p className="text-white text-lg md:text-2xl max-w-4xl mx-auto font-bold leading-relaxed drop-shadow-2xl px-6 bg-black/20 backdrop-blur-sm py-4 rounded-2xl border border-white/5">
                            {data.lead}
                        </p>

                        <div className="flex flex-wrap justify-center gap-3 mt-12 max-w-4xl mx-auto">
                            {data.chips.map((chip, i) => (
                                <span key={i} className="text-[10px] md:text-xs font-black uppercase tracking-widest bg-black/50 backdrop-blur-2xl border border-white/20 px-6 py-3 rounded-xl">
                                    {chip}
                                </span>
                            ))}
                        </div>

                        <p className="text-white/60 text-[10px] md:text-xs tracking-[0.5em] uppercase mt-16 font-black italic">
                            {data.trustLine}
                        </p>
                    </motion.div>
                    <ChevronDown className="absolute bottom-10 opacity-30 animate-bounce text-amber-500" size={40} />
                </section>

                {/* ÖZET SECTION */}
                <section className="py-32 px-6 container mx-auto">
                    <div className="mb-24 text-center">
                        <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6 italic">TEMREN <span className="text-amber-500 font-light italic">STANDARDI</span></h2>
                        <p className="text-white/80 text-xl md:text-2xl font-medium italic max-w-3xl mx-auto border-l-4 border-amber-500 pl-8 text-left">Zorlu çevre koşullarında uzun ömür ve güvenilirliğin simgesi.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {data.valueProps.map((prop, i) => (
                            <div key={i} className="group p-12 rounded-[3.5rem] bg-white/[0.04] border border-white/10 backdrop-blur-3xl hover:border-amber-500 transition-all duration-700">
                                <div className="text-amber-500 mb-6">{prop.icon}</div>
                                <h3 className="text-2xl font-black mb-6 uppercase italic tracking-tight leading-none">{prop.title}</h3>
                                <p className="text-white/80 leading-relaxed text-lg font-medium group-hover:text-white transition-colors">{prop.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* SEKTÖREL KULLANIM ALANLARI SECTION */}
                <section className="py-32 px-6 bg-white/[0.03] border-y border-white/5 backdrop-blur-sm">
                    <div className="container mx-auto">
                        <div className="mb-20 text-center md:text-left">
                            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic text-white leading-none tracking-tight">SEKTÖREL <span className="text-amber-500">ÇÖZÜMLER</span></h2>
                            <p className="text-white/50 uppercase tracking-[0.3em] text-sm mt-6 font-bold font-sans italic">Farklı ihtiyaçlara uygun, özelleştirilebilir çözüm setleri.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 font-sans">
                            {data.sectors.map((sector, i) => (
                                <div key={i} className="p-8 rounded-[2.5rem] bg-black/60 border border-white/5 hover:bg-amber-500 transition-all duration-700 group cursor-default text-center">
                                    <div className="text-amber-500 group-hover:text-black mb-6 transition-colors flex justify-center">{sector.icon}</div>
                                    <h4 className="text-xl font-black mb-4 uppercase group-hover:text-black transition-colors">{sector.name}</h4>
                                    <p className="text-white/60 group-hover:text-black/80 text-sm leading-relaxed transition-colors font-semibold italic">{sector.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* TEKNİK DETAYLAR SECTION */}
                <section className="py-44 px-6 container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                        <div className="space-y-12">
                            <h2 className="text-6xl md:text-[8rem] font-black uppercase tracking-tighter italic leading-[0.8] drop-shadow-xl">TEKNİK <br /><span className="text-amber-500">PARAMETRE</span></h2>
                            <p className="text-white/70 text-xl md:text-2xl font-light italic leading-relaxed">
                                KAU-01, uygulamaya özel sertlik ve yoğunluk seçenekleriyle en yüksek performans/ömür dengesini sağlamak üzere formüle edilmiştir.
                            </p>
                        </div>

                        <div className="p-12 rounded-[4rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl relative overflow-hidden group">
                            <div className="space-y-4 relative z-10">
                                {data.techParams.map((item, i) => (
                                    <div key={i} className="flex justify-between items-center p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-all group/item">
                                        <div className="flex items-center gap-4 text-white/50 uppercase text-[10px] font-black tracking-widest leading-none group-hover/item:text-amber-500 transition-colors">
                                            {item.icon} {item.l}
                                        </div>
                                        <span className="text-xl md:text-2xl font-black text-white">{item.v}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-10 p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 text-sm font-bold italic text-center uppercase tracking-widest">
                                Uygulamaya göre özelleştirilebilir değerler.
                            </div>
                        </div>
                    </div>
                </section>


            </div>

            {/* MODAL */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 overflow-y-auto">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="fixed inset-0 bg-black/98 backdrop-blur-3xl" />
                        <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }} className="relative w-full max-w-5xl bg-[#080808] border border-white/10 rounded-[4rem] p-10 md:p-20 shadow-2xl text-white">
                            <button onClick={() => setIsModalOpen(false)} className="absolute top-12 right-12 text-white/50 hover:text-white transition-colors"><X size={48} /></button>
                            <div className="mb-20 text-center md:text-left">
                                <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">TEKLİF <span className="text-amber-500 font-light italic tracking-widest text-6xl md:text-8xl">FORMU</span></h2>
                                <p className="text-white/40 mt-6 text-2xl font-light uppercase tracking-widest font-sans">KAU-01 Kauçuk çözümleri için detayları iletin.</p>
                            </div>
                            <form className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12">
                                <div className="space-y-12">
                                    {[{ l: "Ad Soyad", t: "text" }, { l: "Telefon", t: "tel" }, { l: "E-posta", t: "email" }].map((f, i) => (
                                        <div key={i} className="border-b border-white/20 focus-within:border-amber-500 transition-colors group">
                                            <label className="text-[10px] font-black uppercase text-amber-500 mb-4 block group-focus-within:translate-x-2 transition-transform">{f.l} *</label>
                                            <input type={f.t} required className="w-full bg-transparent py-4 text-2xl outline-none font-medium text-white placeholder:text-white/10" placeholder="..." />
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-12 text-white">
                                    <div className="border-b border-white/20 focus-within:border-amber-500 transition-colors group text-white">
                                        <label className="text-[10px] font-black uppercase text-amber-500 mb-4 block text-white italic">Uygulama Alanı / Sektör</label>
                                        <input type="text" placeholder="Tarım, Savunma, Otomotiv vb." className="w-full bg-transparent py-4 text-2xl outline-none placeholder:text-white/5 font-medium text-white" />
                                    </div>
                                    <div className="border-b border-white/20 focus-within:border-amber-500 transition-colors group text-white">
                                        <label className="text-[10px] font-black uppercase text-amber-500 mb-4 block italic">İletişim Tercihi *</label>
                                        <select required className="w-full bg-transparent py-4 text-2xl outline-none appearance-none cursor-pointer text-white border-none bg-black">
                                            <option className="bg-black text-white">E-posta</option>
                                            <option className="bg-black text-white">Telefon</option>
                                            <option className="bg-black text-white">WhatsApp</option>
                                        </select>
                                    </div>
                                    <div className="border-b border-white/20 focus-within:border-amber-500 transition-colors group">
                                        <label className="text-[10px] font-black uppercase text-amber-500 mb-4 block italic">Mesajınız *</label>
                                        <textarea required rows={1} placeholder="Teknik ihtiyaçlarınız..." className="w-full bg-transparent py-4 text-2xl outline-none resize-none font-medium text-white placeholder:text-white/5" />
                                    </div>
                                </div>
                                <button className="md:col-span-2 w-full bg-amber-500 text-black py-10 rounded-3xl font-black text-3xl uppercase tracking-widest hover:bg-white transition-all shadow-2xl shadow-amber-500/20 active:scale-95 transition-transform">FORMU GÖNDER</button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </main>
    );
}