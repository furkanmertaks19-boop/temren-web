"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeroSlider() {
    const [slides, setSlides] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const res = await fetch('/api/slider', { cache: 'no-store' });
                const data = await res.json();
                const activeSlides = data.filter((s: any) => s.isActive);
                setSlides(activeSlides);
            } catch (error) {
                console.error("Slider hatası:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSlides();
    }, []);

    useEffect(() => {
        if (slides.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 8000);
        return () => clearInterval(timer);
    }, [slides]);

    const isVideo = (url: string) => {
        if (!url) return false;
        return url.toLowerCase().includes('.mp4') || 
               url.toLowerCase().includes('.mov') || 
               url.toLowerCase().includes('.webm') ||
               url.includes('/video/upload/');
    };

    if (loading || slides.length === 0) return <div className="h-screen bg-black" />;

    const currentSlide = slides[currentIndex];

    return (
        <section className="relative h-screen overflow-hidden bg-black">
            <AnimatePresence mode="wait">
                <motion.div 
                    key={currentIndex} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 w-full h-full"
                >
                    {/* VİDEO VEYA RESİM KONTROLÜ */}
                    {isVideo(currentSlide.image) ? (
                        <video
                            key={currentSlide.image} // Kaynak değiştiğinde DOM'un yenilenmesi için şart
                            src={currentSlide.image}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="auto"
                            className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
                            onCanPlay={(e) => (e.target as HTMLVideoElement).play()} // Tarayıcıyı oynamaya zorla
                        />
                    ) : (
                        <img
                            src={currentSlide.image}
                            alt={currentSlide.title}
                            className="absolute inset-0 w-full h-full object-cover opacity-60"
                        />
                    )}

                    {/* Metin İçerikleri */}
                    <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
                        <motion.span 
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-amber-500 font-black italic tracking-[0.3em] uppercase text-sm mb-4"
                        >
                            {currentSlide.subtitle || "ALT BAŞLIK"}
                        </motion.span>

                        <motion.h1 
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-white text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-none mb-6"
                        >
                            {currentSlide.title}
                        </motion.h1>

                        <motion.p 
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-white/60 max-w-2xl font-medium text-lg mb-10"
                        >
                            {currentSlide.description}
                        </motion.p>

                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            <a href={currentSlide.buttonLink || "/"} className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-full font-black italic uppercase text-sm tracking-widest transition-all shadow-xl">
                                İNCELE
                            </a>
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigasyon Noktaları */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                {slides.map((_, idx) => (
                    <button 
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-12 h-1 rounded-full transition-all ${idx === currentIndex ? 'bg-amber-500' : 'bg-white/20'}`}
                    />
                ))}
            </div>
        </section>
    );
}