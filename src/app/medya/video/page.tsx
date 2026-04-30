"use client";

import React, { useState } from "react";
import Footer from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Youtube, Film, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Keyboard, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

interface VideoItem {
  id: number;
  youtubeId: string;
  title: string;
  desc: string;
  badge: string;
}

const videos: VideoItem[] = [
  {
    id: 1,
    youtubeId: "6vlxv1Vr7Ug",
    title: "TARMAKBİS TİKA Röportajı",
    desc: "Uzaktan Kumandalı Modüler Paletli Araç Tanıtımı",
    badge: "TİKA",
  },
  {
    id: 2,
    youtubeId: "bekG6AthG44",
    title: "Erkunt Traktör ile Gerçek Arazi Testi",
    desc: "Gerçek arazi koşullarında test edildi.",
    badge: "Arazi Testi",
  },
  {
    id: 3,
    youtubeId: "AofiHUGvVMU",
    title: "TİKA Tanıtım",
    desc: "Uzaktan Kumandalı Traktör ve Palet Sistemleri",
    badge: "Tanıtım",
  },
  {
    id: 4,
    youtubeId: "7VUhqXtfdBo",
    title: "Temren Makina Palet Sistemleri",
    desc: "Ayer Tohumculuk müşteri deneyimi",
    badge: "Müşteri",
  },
  {
    id: 5,
    youtubeId: "6ZOyv3LSKbE",
    title: "Mutlular Tarım Palet Deneyimi",
    desc: "Palet sistemleri saha deneyimi",
    badge: "Müşteri",
  },
  {
    id: 6,
    youtubeId: "qnnbb51zp4Q",
    title: "Doğan Kabak ile Test Sürüşü",
    desc: "Arazide yepyeni bir sürüş deneyimi",
    badge: "Test",
  },
  {
    id: 7,
    youtubeId: "038aEHmegcc",
    title: "Araç Palet Sistemi",
    desc: "Zorlu arazi koşullarında yüksek tutuş",
    badge: "Palet",
  },
  {
    id: 8,
    youtubeId: "lq20v0-Nhgo",
    title: "Doğru Tork ile Sıkma",
    desc: "Takım sıkma mekanizması",
    badge: "Üretim",
  },
];

export default function VideoGaleri() {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  return (
    <div className="min-h-screen overflow-hidden bg-[#05070d] text-white">
      <main className="relative min-h-screen pt-28 pb-20 flex items-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,77,0,0.25),transparent_28%),radial-gradient(circle_at_85%_10%,rgba(80,120,255,0.22),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.12),transparent_35%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,13,0.35),rgba(5,7,13,1))]" />
          <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div>

        <div className="relative z-10 w-full">
          <section className="container mx-auto px-5 md:px-8 text-center mb-10 md:mb-14">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-[11px] font-black uppercase tracking-[0.25em] backdrop-blur-xl">
                <Film size={15} />
                Temren Makina Video
              </div>

              <h1 className="text-5xl md:text-7xl font-black tracking-[-0.06em]">
                Video Galeri
              </h1>

              <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg leading-7 text-white/65">
                Ürün tanıtımları, saha testleri, müşteri deneyimleri ve üretim
                süreçlerini modern video deneyimiyle izleyin.
              </p>
            </motion.div>
          </section>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="relative"
          >
            <Swiper
              modules={[EffectCoverflow, Navigation, Keyboard, Autoplay]}
              effect="coverflow"
              grabCursor
              centeredSlides
              loop={videos.length > 3}
              speed={750}
              keyboard={{ enabled: true }}
              autoplay={{
                delay: 3600,
                disableOnInteraction: false,
              }}
              navigation={{
                nextEl: ".video-next",
                prevEl: ".video-prev",
              }}
              slidesPerView={1.04}
              breakpoints={{
                640: { slidesPerView: 1.3 },
                1024: { slidesPerView: 2.15 },
                1440: { slidesPerView: 2.75 },
              }}
              coverflowEffect={{
                rotate: 28,
                stretch: 0,
                depth: 180,
                modifier: 1,
                slideShadows: true,
              }}
              className="!py-10 md:!py-16"
            >
              {videos.map((video, index) => (
                <SwiperSlide
                  key={video.id}
                  className="!w-[330px] sm:!w-[480px] md:!w-[640px]"
                >
                  <div
                    onClick={() => setSelectedVideo(video)}
                    className="group relative h-[230px] sm:h-[320px] md:h-[400px] overflow-hidden rounded-[34px] border border-white/15 bg-white/10 shadow-[0_40px_110px_rgba(0,0,0,0.55)] cursor-pointer"
                  >
                    <Image
                      src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                      alt={video.title}
                      fill
                      sizes="(max-width: 768px) 92vw, 640px"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      priority={index < 2}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/10" />

                    <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-4 py-2 backdrop-blur-xl">
                      <Youtube size={18} className="text-[#ff0033]" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/85">
                        YouTube
                      </span>
                    </div>

                    <div className="absolute right-5 top-5 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-white/80 backdrop-blur-xl">
                      {video.badge}
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#ff0033] text-white shadow-[0_0_50px_rgba(255,0,51,0.45)] transition-all duration-300 group-hover:scale-110">
                        <Play size={32} fill="white" className="ml-1" />
                        <span className="absolute inset-0 rounded-full border border-white/40 animate-ping" />
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <p className="mb-2 text-[10px] font-black uppercase tracking-[0.28em] text-[#ff4d00]">
                        Video #{index + 1}
                      </p>

                      <h3 className="text-2xl md:text-3xl font-black tracking-[-0.05em] leading-tight">
                        {video.title}
                      </h3>

                      <p className="mt-2 max-w-xl text-sm md:text-base text-white/65">
                        {video.desc}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <button className="video-prev absolute left-4 md:left-10 top-1/2 z-20 flex h-[54px] w-[54px] -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-xl transition-all hover:bg-[#ff0033]">
              <ChevronLeft size={30} />
            </button>

            <button className="video-next absolute right-4 md:right-10 top-1/2 z-20 flex h-[54px] w-[54px] -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-xl transition-all hover:bg-[#ff0033]">
              <ChevronRight size={30} />
            </button>
          </motion.div>
        </div>
      </main>

      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95 p-5 backdrop-blur-xl md:p-10"
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute right-6 top-6 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/70 transition-all hover:bg-[#ff0033] hover:text-white md:right-8 md:top-8"
            >
              <X size={26} />
            </button>

            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 18 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 18 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-6xl overflow-hidden rounded-[34px] border border-white/15 bg-black shadow-2xl aspect-video"
            >
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0`}
                title={selectedVideo.title}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}