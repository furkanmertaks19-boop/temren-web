"use client";

import React, { useMemo, useState } from "react";
import Footer from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, ChevronLeft, ChevronRight, Images } from "lucide-react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Keyboard } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

const galleryImages = [
  ...Array.from({ length: 19 }, (_, i) => ({
    id: `fuar-${i + 1}`,
    src: `/galeri/fuar${i + 1}.webp`,
    category: "FUAR",
  })),

  ...Array.from({ length: 4 }, (_, i) => ({
    id: `ap-${i + 1}`,
    src: `/galeri/ap-${i + 1}.webp`,
    category: "ÜRETİM",
  })),

  ...Array.from({ length: 14 }, (_, i) => ({
    id: `plt12-${i + 1}`,
    src: `/galeri/plt12-${i + 1}.${i + 1 === 3 || i + 1 === 9 || i + 1 === 12 ? "jpg" : "webp"}`,
    category: "PALET",
  })),

  { id: "tika-1", src: "/galeri/tika1.jpg", category: "SAVUNMA" },
  { id: "tika-2", src: "/galeri/tika2.webp", category: "SAVUNMA" },
  { id: "tika-3", src: "/galeri/tika3.jpg", category: "SAVUNMA" },
  { id: "tika-5", src: "/galeri/tika5.jpeg", category: "SAVUNMA" },

  ...Array.from({ length: 4 }, (_, i) => ({
    id: `mini-tika-m-${i + 1}`,
    src: `/galeri/mini_tika_${i + 1}.jpg`,
    category: "SAVUNMA",
  })),

  ...Array.from({ length: 5 }, (_, i) => ({
    id: `mini-tika-${i + 1}`,
    src: `/galeri/mini-tika-${i + 1}.jpg`,
    category: "SAVUNMA",
  })),

  ...Array.from({ length: 6 }, (_, i) => ({
    id: `tika-at-${i + 1}`,
    src: `/galeri/tika-atasman-${i + 1}.${i + 1 === 1 || i + 1 === 4 ? "png" : "jpg"}`,
    category: "SAVUNMA",
  })),

  ...Array.from({ length: 8 }, (_, i) => ({
    id: `tika-img-${i + 1}`,
    src: `/galeri/tika-img${i + 1}.${i + 1 >= 4 && i + 1 <= 7 ? "jpeg" : i + 1 === 8 ? "png" : "jpg"}`,
    category: "SAVUNMA",
  })),

  ...Array.from({ length: 11 }, (_, i) => ({
    id: `tp-${i + 1}`,
    src: `/galeri/tp-${i + 1}.webp`,
    category: "ÜRETİM",
  })),

  ...Array.from({ length: 5 }, (_, i) => ({
    id: `ue-${i + 1}`,
    src: `/galeri/ue-${i + 1}.webp`,
    category: "ÜRETİM",
  })),

  { id: "konik-3", src: "/galeri/konik_3.jpg", category: "ÜRETİM" },
];

const categories = ["HEPSİ", "SAVUNMA", "FUAR", "ÜRETİM", "PALET"];

export default function FotoGaleri() {
  const [filter, setFilter] = useState("HEPSİ");
  const [selectedImg, setSelectedImg] = useState<number | null>(null);

  const filteredImages = useMemo(() => {
    return filter === "HEPSİ"
      ? galleryImages
      : galleryImages.filter((img) => img.category === filter);
  }, [filter]);

  const openImage = (imgId: string) => {
    const realIndex = galleryImages.findIndex((img) => img.id === imgId);
    setSelectedImg(realIndex);
  };

  const nextImage = () => {
    setSelectedImg((prev) =>
      prev !== null ? (prev < galleryImages.length - 1 ? prev + 1 : 0) : null
    );
  };

  const prevImage = () => {
    setSelectedImg((prev) =>
      prev !== null ? (prev > 0 ? prev - 1 : galleryImages.length - 1) : null
    );
  };

return (
  <div className="min-h-screen bg-[#05070d] text-white overflow-hidden">
    <main className="relative min-h-screen flex items-center pt-28 pb-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,77,0,0.25),transparent_28%),radial-gradient(circle_at_85%_10%,rgba(80,120,255,0.22),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.12),transparent_35%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,13,0.35),rgba(5,7,13,1))]" />
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:80px_80px]" />
        <div className="absolute left-1/2 top-[18%] h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-[#ff4d00]/15 blur-[130px]" />
      </div>

      <div className="relative z-10 w-full">
        <div className="container mx-auto px-5 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mx-auto mb-8 max-w-4xl text-center"
          >
            <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-[11px] font-black uppercase tracking-[0.25em] text-white/90 backdrop-blur-xl">
              <Images size={15} className="text-[#FF4D00]" />
              Temren Makina Galeri
            </div>

            <h1 className="text-5xl font-black tracking-[-0.06em] text-white md:text-7xl">
              Görsel Galeri
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-7 text-white/65 md:text-lg">
              Üretim, fuar, savunma ve palet sistemleri görsellerini modern 3D galeri deneyimiyle inceleyin.
            </p>
          </motion.div>

          <div className="mb-8 flex flex-wrap justify-center gap-3 md:mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`rounded-full px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 md:px-8 ${
                  filter === cat
                    ? "bg-[#FF4D00] text-white shadow-2xl shadow-[#FF4D00]/35 scale-105"
                    : "border border-white/15 bg-white/10 text-white/75 backdrop-blur-xl hover:bg-white/20 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, scale: 0.96, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -18 }}
              transition={{ duration: 0.35 }}
              className="relative mx-auto w-full"
            >
              <Swiper
                modules={[EffectCoverflow, Navigation, Keyboard]}
                effect="coverflow"
                grabCursor
                centeredSlides
                loop={filteredImages.length > 3}
                speed={700}
                keyboard={{ enabled: true }}
                navigation={{
                  nextEl: ".gallery-next",
                  prevEl: ".gallery-prev",
                }}
                slidesPerView={1.05}
                breakpoints={{
                  640: { slidesPerView: 1.35 },
                  1024: { slidesPerView: 2.35 },
                  1440: { slidesPerView: 2.85 },
                }}
                coverflowEffect={{
                  rotate: 42,
                  stretch: 0,
                  depth: 160,
                  modifier: 1,
                  slideShadows: true,
                }}
                className="!py-10 md:!py-14"
              >
                {filteredImages.map((img, index) => (
                  <SwiperSlide
                    key={img.id}
                    className="!w-[320px] sm:!w-[440px] md:!w-[560px]"
                  >
                    <div
                      onClick={() => openImage(img.id)}
                      className="group relative h-[320px] overflow-hidden rounded-[34px] border border-white/25 bg-white/15 shadow-[0_35px_90px_rgba(15,23,42,0.35)] cursor-pointer sm:h-[440px] md:h-[540px]"
                    >
                      <Image
                        src={img.src}
                        alt={img.id}
                        fill
                        sizes="(max-width: 768px) 90vw, 560px"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        priority={index < 3}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

                      <div className="absolute left-5 top-5 rounded-full border border-white/25 bg-white/20 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white backdrop-blur-xl">
                        {img.category}
                      </div>

                      <div className="absolute right-5 top-5 rounded-full border border-white/20 bg-black/25 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-white/80 backdrop-blur-xl">
                        {index + 1} / {filteredImages.length}
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
                        <div className="flex h-17 w-17 items-center justify-center rounded-full bg-white text-slate-950 shadow-2xl transition-transform duration-300 group-hover:scale-110">
                          <Maximize2 size={25} />
                        </div>
                      </div>

                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="h-px w-full bg-white/20 mb-4" />
                        <p className="text-[11px] font-black uppercase tracking-[0.25em] text-white/80">
                          Temren Makina
                        </p>
                        <h3 className="mt-1 text-2xl font-black tracking-[-0.04em] text-white">
                          {img.category} Görseli
                        </h3>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <button className="gallery-prev absolute left-4 top-1/2 z-20 flex h-13 w-13 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/20 text-white backdrop-blur-xl transition-all hover:bg-[#FF4D00] md:left-10 md:h-15 md:w-15">
                <ChevronLeft size={30} />
              </button>

              <button className="gallery-next absolute right-4 top-1/2 z-20 flex h-13 w-13 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/20 text-white backdrop-blur-xl transition-all hover:bg-[#FF4D00] md:right-10 md:h-15 md:w-15">
                <ChevronRight size={30} />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <AnimatePresence>
        {selectedImg !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/95 p-5 backdrop-blur-xl md:p-10"
          >
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute right-6 top-6 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/70 transition-all hover:bg-[#FF4D00] hover:text-white md:right-8 md:top-8"
            >
              <X size={26} />
            </button>

            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/70 transition-all hover:bg-[#FF4D00] hover:text-white md:left-8 md:h-14 md:w-14"
            >
              <ChevronLeft size={30} />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/70 transition-all hover:bg-[#FF4D00] hover:text-white md:right-8 md:h-14 md:w-14"
            >
              <ChevronRight size={30} />
            </button>

            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative h-full max-h-[78vh] w-full max-w-7xl"
            >
              <Image
                src={galleryImages[selectedImg].src}
                alt="Galeri Görseli"
                fill
                className="object-contain"
                priority
              />

              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
                <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-5 py-2 text-[10px] font-black uppercase tracking-widest text-[#FF4D00]">
                  {galleryImages[selectedImg].category} — {selectedImg + 1} / {galleryImages.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}