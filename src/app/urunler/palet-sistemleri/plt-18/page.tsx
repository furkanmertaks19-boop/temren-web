"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  CheckCircle2,
  FileText,
  Zap,
  X,
  Layers,
  Beaker,
  Loader2,
  Maximize2,
  Camera,
  User,
  Phone,
  Mail,
  MessageSquare,
  Send,
} from "lucide-react";

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

export default function PLT18Page() {
  const { scrollYProgress } = useScroll();

  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

  const [imgError, setImgError] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    adSoyad: "",
    telefon: "",
    email: "",
    mesaj: "",
  });

  const mainImage = "/image/plt-18.webp";

  const data = {
    title: "PLT 18",

    fullName: "PLT-18 Palet Sistemi",

    lead:
      "Zorlu arazi koşullarında güç ve hassasiyetin mükemmel dengesi. Geniş temas yüzeyi sayesinde kaymayı minimize eder, en zorlayıcı zeminlerde kesintisiz operasyon sağlar.",

    advantages: [
      {
        icon: <Layers className="w-10 h-10" />,
        title: "Düşük Zemin Basıncı",
        desc:
          "Ağırlığı geniş yüzeye yayarak batmayı azaltır ve toprak sıkışmasını önler.",
      },

      {
        icon: <Zap className="w-10 h-10" />,
        title: "Üstün Çekiş Gücü",
        desc:
          "Patinajı %90 oranında azaltan tutunma yüzeyi ile maksimum güç aktarımı.",
      },

      {
        icon: <Beaker className="w-10 h-10" />,
        title: "Onarılabilir Mimari",
        desc:
          "Modüler parça bazlı bakım sistemi ile minimum duruş süresi.",
      },
    ],

    comparison: {
      wheel: [
        "Yüksek zemin basıncı ve derin batma",
        "Çamurlu arazide yüksek patinaj kaybı",
        "Toprak yapısına zarar veren dar temas alanı",
      ],

      track: [
        "Eşit dağıtılmış ağırlık ve toprak koruma",
        "Eğimli ve ıslak zeminlerde %100 tutuş",
        "Sıfıra yakın patinaj ile %30 yakıt tasarrufu",
      ],
    },

    technical: [
      { l: "Dış Boyutlar", v: "2200 × 1450 × 530 mm" },

      { l: "Net Ağırlık", v: "~800 KG (Birim)" },

      { l: "Malzeme", v: "Ağır Hizmet Kauçuk" },

      { l: "Şasi Yapısı", v: "Güçlendirilmiş Çelik" },

      { l: "Montaj", v: "Hızlı Adaptör" },
    ],

    gallery: [
      "/image/plt018.webp",
      "/image/plt018-t.webp",
      "/image/plt-18-4.png",
      "/image/plt-18-5.png",
      "/image/plt18-dik.png",
    ],
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          ...form,
          secim: "PLT-18 ÜRÜN TALEBİ",
        }),
      });

      if (response.ok) {
        setSuccess(true);

        setTimeout(() => {
          setIsModalOpen(false);

          setSuccess(false);

          setForm({
            adSoyad: "",
            telefon: "",
            email: "",
            mesaj: "",
          });
        }, 3500);
      }
    } catch (error) {
      alert("Bağlantı hatası!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#050505] min-h-screen relative text-white overflow-x-hidden">
      {/* BACKGROUND */}

      <div className="fixed inset-0 w-full h-screen z-0">
        <motion.div
          style={{ scale }}
          className="relative w-full h-full"
        >
          {!imgError && (
            <img
              src={mainImage}
              alt="PLT-18"
              className="absolute inset-0 w-full h-full object-cover opacity-50"
              loading="eager"
              onError={() => setImgError(true)}
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/80" />
        </motion.div>
      </div>

      <div className="relative z-10">
        {/* HERO */}

        <section className="h-screen flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-amber-500 font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs mb-8 block bg-amber-500/10 px-6 py-2 rounded-full border border-amber-500/20 w-fit mx-auto backdrop-blur-md italic font-black">
              TITAN SERIES
            </span>

            <h1 className="text-7xl md:text-[14rem] font-black tracking-tighter leading-[0.8] mb-8 uppercase">
              PLT <span className="text-amber-500 italic">18</span>
            </h1>

            <p className="text-white/70 text-lg md:text-2xl max-w-4xl mx-auto font-bold leading-relaxed px-6 bg-black/20 backdrop-blur-sm py-4 rounded-2xl border border-white/5">
              {data.lead}
            </p>
          </motion.div>

          <ChevronDown
            className="absolute bottom-10 opacity-30 animate-bounce text-amber-500"
            size={40}
          />
        </section>

        {/* GALLERY */}

        <section className="py-32 px-6 container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {data.gallery.map((img, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10, scale: 1.02 }}
                onClick={() => setSelectedImg(img)}
                className="relative aspect-square rounded-[2rem] overflow-hidden border border-white/10 cursor-zoom-in group"
              >
                <img
                  src={img}
                  alt="galeri"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Maximize2 size={32} />
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* LIGHTBOX */}

      <AnimatePresence>
        {selectedImg && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:p-20">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImg(null)}
              className="fixed inset-0 bg-black/95 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative w-full h-full"
            >
              <img
                src={selectedImg}
                alt="Large View"
                className="absolute inset-0 w-full h-full object-contain"
              />

              <button
                onClick={() => setSelectedImg(null)}
                className="absolute top-0 right-0 p-4 text-white hover:text-amber-500"
              >
                <X size={48} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}