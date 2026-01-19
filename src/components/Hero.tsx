"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeroSlider() {
    const [slides, setSlides] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                // cache: 'no-store' ekleyerek her seferinde güncel veriyi zorunlu kılıyoruz
                const res = await fetch('/api/slider', { cache: 'no-store' });
                const data = await res.json();
                // Sadece admin panelinde aktif olanları filtrele
                setSlides(data.filter((s: any) => s.isActive));
            } catch (error) {
                console.error("Veri çekme hatası:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSlides();
    }, []);

    if (loading || slides.length === 0) return <div className="h-screen bg-black" />;

    return (
        <section className="relative h-screen overflow-hidden bg-black">
            <AnimatePresence mode="wait">
                {slides.map((slide, index) => (
                    <div key={slide._id || index} className="absolute inset-0">
                        {/* Veritabanından gelen görsel */}
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover opacity-60"
                        />

                        {/* Metin İçerikleri */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                            <motion.span className="text-amber-500 font-black italic tracking-[0.3em] uppercase text-sm mb-4">
                                {slide.subtitle}
                            </motion.span>

                            <motion.h1 className="text-white text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none mb-6">
                                {slide.title}
                            </motion.h1>

                            <motion.p className="text-white/60 max-w-2xl font-medium text-lg mb-10">
                                {slide.description}
                            </motion.p>

                            <a href={slide.buttonLink || "/"} className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-full font-black italic uppercase text-sm tracking-widest transition-all">
                                {slide.buttonText || "İNCELE"}
                            </a>
                        </div>
                    </div>
                ))}
            </AnimatePresence>
        </section>
    );
}