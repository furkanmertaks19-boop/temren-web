"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronRight, ChevronLeft, ArrowRight, Loader2 } from "lucide-react";

// Bileşen Importları
import Features from "@/components/home/Features";
import QuickLinks from "@/components/home/QuickLinks";
import ExportMap from "@/components/home/ExportMap";
import Footer from "@/components/layout/Footer";
import TrackSystem from "@/components/home/TrackSystem";
import BlogSummary from "@/components/home/BlogSummary";

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer: Variants = {
  animate: { transition: { staggerChildren: 0.2 } },
};

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

const fallbackSlides: SlideItem[] = [
{
  title: "Güçlü İş Birlikleri, Güçlü Yarınlar",
  subtitle: "ROKETSAN STRATEJİK İŞ ORTAKLIĞI ZİRVESİ",
  description: "ROKETSAN tarafından düzenlenen Stratejik İş Ortaklığı Zirvesi’nde yer almaktan büyük gurur duyduk. Temren Makina olarak, yüksek teknoloji, mühendislik gücü ve üretim kabiliyetimizle savunma sanayi ekosistemine katkı sunmaya kararlılıkla devam ediyoruz.",
  image: "/roketsan.jpg",
  isActive: true,
  order: 0,
},
{
  title: "Mini-Tika",
  subtitle: "GÜÇLÜ VE MODERN SİSTEMLER",
  description: "Güçlü Şartların Yeni Nesil Çözümü",
  image: "/tika7.png",
  buttonText: "ÜRÜNLER",
  buttonLink: "/urunler/mini-tika",
  isActive: true,
  order: 1,
},
{
  title: "TİKA",
  subtitle: "UZAKTAN KUMANDALI MODÜLER PLATFORM",
  description: "Zorlu arazi koşullarında maksimum performans sunan TİKA, tarım, belediye ve endüstriyel kullanım için geliştirilmiş yeni nesil çok amaçlı bir platformdur.",
  image: "/tika8.png",
  buttonText: "DETAY",
  buttonLink: "/urunler/tika",
  isActive: true,
  order: 2,
},
];

export default function Home() {
  const [slides, setSlides] = useState<SlideItem[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  // Slider verilerini çek
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch("/api/slider", { cache: "no-store" });
        const data = await res.json();

        const slidesArray: SlideItem[] = Array.isArray(data) ? data : fallbackSlides;

        const activeSlides = slidesArray
          .filter((s) => s && s.isActive !== false)
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

        setSlides(activeSlides.length > 0 ? activeSlides : fallbackSlides);
      } catch (error) {
        console.error("Slider hatası:", error);
        setSlides(fallbackSlides);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  // Güvenlik: current index taşarsa sıfırla
  useEffect(() => {
    if (current >= slides.length && slides.length > 0) {
      setCurrent(0);
    }
  }, [slides, current]);

  // Otomatik geçiş
  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 8000);

    return () => clearInterval(timer);
  }, [slides]);

  const nextSlide = () =>
    setCurrent((p) => (p === slides.length - 1 ? 0 : p + 1));

  const prevSlide = () =>
    setCurrent((p) => (p === 0 ? slides.length - 1 : p - 1));

  if (loading) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center">
        <Loader2 className="text-blue-600 animate-spin" size={40} />
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <main className="w-full bg-white overflow-x-hidden scroll-smooth">
        <section className="relative min-h-screen w-full bg-black flex items-center justify-center px-6 text-center">
          <div>
            <h1 className="text-white text-4xl md:text-6xl font-black uppercase italic mb-6">
              Temren Makina
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              İçerikler geçici olarak yüklenemiyor. Lütfen daha sonra tekrar deneyin.
            </p>
          </div>
        </section>

        <Features />
        <TrackSystem />
        <QuickLinks />
        <ExportMap />
        <BlogSummary />
        <Footer />
      </main>
    );
  }

  const activeSlide = slides[current] || fallbackSlides[0];

  return (
    <main className="w-full bg-white overflow-x-hidden scroll-smooth">
      <section className="relative h-screen w-full overflow-hidden bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 w-full h-full"
          >
            <div className="absolute inset-0 w-full h-full">
              <motion.div
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 10, ease: "linear" }}
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${activeSlide.image})` }}
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
                    className="group relative inline-flex bg-blue-600 text-white px-12 py-5 font-black text-[11px] tracking-widest uppercase overflow-hidden transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      {activeSlide.buttonText || "KEŞFET"} <ArrowRight size={18} />
                    </span>
                    <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500" />
                    <style jsx>{`
                      .group:hover span {
                        color: black;
                      }
                    `}</style>
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
              className="p-5 border border-white/10 text-white hover:bg-blue-600 transition-all rounded-full group outline-none"
            >
              <ChevronLeft size={24} className="group-active:scale-90 transition-transform" />
            </button>
            <button
              onClick={nextSlide}
              className="p-5 border border-white/10 text-white hover:bg-blue-600 transition-all rounded-full group outline-none"
            >
              <ChevronRight size={24} className="group-active:scale-90 transition-transform" />
            </button>
          </div>
        )}
      </section>

      <Features />
      <TrackSystem />
      <QuickLinks />
      <ExportMap />
      <Footer />
    </main>
  );
}