"use client";
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const tractorSlide: Variants = {
    initial: { x: -200, opacity: 0 },
    whileInView: { x: 0, opacity: 1, transition: { duration: 1, ease: "easeOut" } }
};

const textSlide: Variants = {
    initial: { x: 200, opacity: 0 },
    whileInView: { x: 0, opacity: 1, transition: { duration: 1, ease: "easeOut", delay: 0.2 } }
};

export default function TrackSystem() {
    const features = [
        { id: "01", title: "Toprağın Korunması", desc: "Arttırılmış flotasyon ve çekiş, toprak hasarını en aza indirir." },
        { id: "02", title: "Rakipsiz Çekiş Gücü", desc: "Palet sistemleri daha az kayma ve daha fazla zemin temas alanı sunar." },
        { id: "03", title: "Saha Konforu", desc: "Basınç dağılımı, arttırılmış stabilite ve daha geniş zemin teması, eşit veya daha yumuşak sahalarda taşımayı daha konforlu hale getirir." }
    ];

    return (
        <section className="relative w-full py-20 bg-black overflow-hidden border-y border-white/10">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

                    {/* SOL: Traktör Görseli (Boyutu Sınırlandırıldı) */}
                    <motion.div
                        variants={tractorSlide}
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true }}
                        className="lg:w-[45%] flex justify-center items-center relative"
                    >
                        {/* Arkadaki Hafif Mavi Parlama */}
                        <div className="absolute w-[80%] h-[80%] bg-blue-600/10 blur-[100px] rounded-full" />
                        <img
                            src="/traktor.png"
                            alt="PLT-18 Traktör Palet Sistemi"
                            className="relative z-10 w-full max-w-[550px] h-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                        />
                    </motion.div>

                    {/* SAĞ: Yazı Alanı ve Özellikler */}
                    <motion.div
                        variants={textSlide}
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true }}
                        className="lg:w-[50%] text-white"
                    >
                        <span className="text-blue-500 font-black text-xs tracking-[0.4em] uppercase mb-4 block">PLT-18</span>
                        <h2 className="text-4xl md:text-6xl font-black italic uppercase leading-tight mb-6">
                            TRAKTÖR <span className="text-blue-600 italic">PALET</span> SİSTEMİ
                        </h2>
                        <p className="text-gray-400 text-sm md:text-base italic mb-10 leading-relaxed border-l-2 border-blue-600 pl-6">
                            Değerli mahsulleriniz, amansız sıkı çalışma, hassasiyet ve çok yönlülük gerektirir. Temren Palet Sistemleri, daha fazlasını, daha iyisini ve daha verimlisini yapmanızı sağlar. Toprak koşulları, işin yoğunluğu veya zamanı ne olursa olsun, palet sistemleri tarlalarınıza ve ihtiyaçlarınıza uyum sağlayacak şekilde tasarlanmıştır.
                        </p>

                        {/* Özellik Maddeleri (01, 02, 03) */}
                        <div className="space-y-6 mb-12">
                            {features.map((item) => (
                                <div key={item.id} className="flex items-start gap-4 group">
                                    <span className="text-blue-600 font-black text-xl italic leading-none">{item.id}</span>
                                    <div>
                                        <h4 className="font-bold text-white uppercase text-sm tracking-wide mb-1 group-hover:text-blue-500 transition-colors">
                                            {item.title}
                                        </h4>
                                        <p className="text-gray-500 text-xs italic leading-snug max-w-md">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Daha Fazla Bilgi Al Butonu */}
                        <Link
                            href="/urunler/palet-sistemleri/plt-18"
                            className="group relative inline-flex items-center gap-3 bg-white text-black px-8 py-4 font-black text-[10px] tracking-[0.2em] uppercase transition-all hover:bg-blue-600 hover:text-white"
                        >
                            DAHA FAZLA BİLGİ AL <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}