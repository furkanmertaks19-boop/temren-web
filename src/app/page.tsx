"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, ArrowRight } from "lucide-react";

const Features = dynamic(() => import("@/components/home/Features"));
const QuickLinks = dynamic(() => import("@/components/home/QuickLinks"));
const ExportMap = dynamic(() => import("@/components/home/ExportMap"), {
  loading: () => <div className="min-h-screen bg-[#020617]" />,
});
const TrackSystem = dynamic(() => import("@/components/home/TrackSystem"));
const BlogSummary = dynamic(() => import("@/components/home/BlogSummary"));
const Footer = dynamic(() => import("@/components/layout/Footer"));

type SlideItem = {
  _id?: string;
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  buttonText?: string;
  buttonLink?: string;
  isActive?: boolean;
  order?: number;
};

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.12 } },
};

function HeroSkeleton() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-900 animate-pulse" />
      <div className="relative z-10 h-full container mx-auto px-8 flex flex-col justify-center">
        <div className="h-3 w-32 bg-white/10 rounded mb-6" />
        <div className="h-16 w-2/3 max-w-xl bg-white/10 rounded mb-8" />
        <div className="h-5 w-full max-w-md bg-white/10 rounded mb-3" />
        <div className="h-5 w-4/5 max-w-sm bg-white/10 rounded" />
      </div>
    </section>
  );
}

export default function Home() {
  const [slides, setSlides] = useState<SlideItem[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchSlides = async () => {
      try {
        const res = await fetch("/api/slider");
        const data = await res.json();
        if (cancelled) return;

        const slidesArray: SlideItem[] = Array.isArray(data) ? data : [];
        const activeSlides = slidesArray
          .filter((s) => s && s.isActive !== false)
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

        setSlides(activeSlides);
      } catch {
        if (!cancelled) setSlides([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchSlides();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (current >= slides.length && slides.length > 0) {
      setCurrent(0);
    }
  }, [slides, current]);

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 8000);

    return () => clearInterval(timer);
  }, [slides]);

  const nextSlide = () => {
    if (slides.length === 0) return;
    setCurrent((p) => (p === slides.length - 1 ? 0 : p + 1));
  };

  const prevSlide = () => {
    if (slides.length === 0) return;
    setCurrent((p) => (p === 0 ? slides.length - 1 : p - 1));
  };

  const renderBelowFold = () => (
    <>
      <Features />
      <TrackSystem />
      <QuickLinks />
      <ExportMap />
      <BlogSummary />
      <Footer />
    </>
  );

  if (loading) {
    return (
      <main className="w-full bg-white overflow-x-hidden">
        <HeroSkeleton />
        {renderBelowFold()}
      </main>
    );
  }

  if (slides.length === 0) {
    return (
      <main className="w-full bg-white overflow-x-hidden">
        {renderBelowFold()}
      </main>
    );
  }

  const activeSlide = slides[current];

  return (
    <main className="w-full bg-white overflow-x-hidden">
      <section className="relative h-screen w-full overflow-hidden bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide._id || current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="absolute inset-0 w-full h-full"
          >
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={activeSlide.image}
                alt={activeSlide.title}
                fill
                priority={current === 0}
                sizes="100vw"
                className="object-cover object-center"
                quality={80}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
            </div>

            <div className="relative z-20 h-full container mx-auto px-8 flex flex-col justify-center">
              <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="max-w-5xl"
              >
                <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-6">
                  <div className="w-16 h-[2px] bg-blue-600" />
                  <span className="text-blue-500 font-black text-xs tracking-[0.5em] uppercase italic">
                    {activeSlide.subtitle || "TEMREN MAKİNA"}
                  </span>
                </motion.div>

                <motion.h1
                  variants={fadeInUp}
                  className="text-white text-6xl md:text-[110px] font-black tracking-tighter leading-[0.85] mb-10 uppercase italic"
                >
                  {activeSlide.title}
                </motion.h1>

                <motion.p
                  variants={fadeInUp}
                  className="text-gray-200 text-lg md:text-xl max-w-2xl font-medium leading-relaxed mb-14 border-l-4 border-blue-600 pl-8 italic"
                >
                  {activeSlide.description || "Temren Makina ürün ve çözümlerini keşfedin."}
                </motion.p>

                <motion.div variants={fadeInUp}>
                  <a
                    href={activeSlide.buttonLink || "/"}
                    className="group relative inline-flex bg-blue-600 text-white px-12 py-5 font-black text-[11px] tracking-widest uppercase overflow-hidden transition-all duration-300 hover:bg-white hover:text-black"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      {activeSlide.buttonText || "KEŞFET"} <ArrowRight size={18} />
                    </span>
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {slides.length > 1 && (
          <div className="absolute bottom-12 right-12 z-30 flex gap-4">
            <button
              onClick={prevSlide}
              aria-label="Önceki slayt"
              className="p-5 border border-white/10 text-white hover:bg-blue-600 transition-all rounded-full group outline-none"
            >
              <ChevronLeft size={24} className="group-active:scale-90 transition-transform" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Sonraki slayt"
              className="p-5 border border-white/10 text-white hover:bg-blue-600 transition-all rounded-full group outline-none"
            >
              <ChevronRight size={24} className="group-active:scale-90 transition-transform" />
            </button>
          </div>
        )}
      </section>

      {renderBelowFold()}
    </main>
  );
}
