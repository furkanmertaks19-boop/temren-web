"use client";
import React, { useState } from "react";
import PageHeader from "@/components/layout/PageHeader";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Play } from "lucide-react";
import Footer from "@/components/layout/Footer";

export default function Hakkimizda() {
  const [isHovered, setIsHovered] = useState(false);

  const stats = [
    { label: "KURULUŞ", value: "2017'den beri" },
    { label: "STRATEJİK SEKTÖR", value: "4+" },
    { label: "AR-GE", value: "Sürekli İyileştirme" },
    { label: "KALİTE", value: "Standart Uyumlu" }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* ✅ SEO: Kurumsal Şema (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "mainEntity": {
              "@type": "Organization",
              "name": "Temren Makina",
              "url": "https://temrenmakina.com",
              "logo": "https://temrenmakina.com/logo.png",
              "foundingDate": "2017",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Ankara",
                "addressCountry": "TR"
              },
              "description": "2017'den beri Ankara Kahramankazan'da yüksek hassasiyetli talaşlı imalat ve palet sistemleri üreticisi."
            }
          })
        }}
      />

      <PageHeader title="HAKKIMIZDA" subtitle="KURUMSAL VİZYON" />

      <section className="relative py-24 overflow-hidden">
        {/* Sol Dikey Şerit Yazısı */}
        <div className="absolute left-0 top-0 bottom-0 w-24 border-r border-gray-100 hidden xl:flex items-center justify-center bg-gray-50/50">
          <span className="rotate-[-90deg] whitespace-nowrap text-[11px] font-black tracking-[0.8em] text-gray-300 uppercase">
            Geleceğe Güç Kat
          </span>
        </div>

        <div className="container mx-auto px-8 xl:pl-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">

            {/* Sol İçerik Alanı */}
            <div className="lg:col-span-7 space-y-12">
              <div className="flex flex-col md:flex-row md:items-center gap-8">
                {/* Video Butonu */}
                <div
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div className="w-24 h-24 rounded-full border border-slate-200 flex items-center justify-center relative overflow-hidden bg-white transition-all duration-500 group-hover:border-[#FF4D00]">
                    <AnimatePresence>
                      {isHovered ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 z-0"
                        >
                          <iframe
                            src="https://www.youtube.com/embed/EScorn2pkDk?autoplay=1&mute=1&controls=0&loop=1&playlist=EScorn2pkDk"
                            className="w-full h-full object-cover scale-150 pointer-events-none"
                            frameBorder="0"
                            title="Temren Makina Tanıtım Filmi"
                          />
                        </motion.div>
                      ) : (
                        <Play className="text-slate-900 z-10" fill="currentColor" size={24} />
                      )}
                    </AnimatePresence>
                  </div>
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-black tracking-widest uppercase text-slate-400 whitespace-nowrap">Videoyu Oynat</span>
                </div>

                <h2 className="text-slate-900 text-4xl md:text-5xl font-black tracking-tighter uppercase leading-tight">
                  MÜHENDİSLİKTE <span className="text-[#FF4D00]">HASSASİYET</span>, <br />
                  ÜRETİMDE <span className="text-[#FF4D00]">GÜÇ</span>.
                </h2>
              </div>

              {/* Kurumsal Metinler - SEO için anahtar kelimeler optimize edildi */}
              <article className="space-y-6 text-gray-600 text-sm leading-relaxed font-medium">
                <p>
                  <strong>Temren Makina</strong>, 2017 yılında Ankara’da kurulmuş olup, <strong>talaşlı imalat</strong> ve mühendislik alanında yenilikçi çözümler sunan öncü bir teknoloji firmasıdır. Kahramankazan tesislerimizde savunma sanayii ve otomotiv sektörleri için yüksek hassasiyetli üretim yapmaktayız.
                </p>
                <p>
                  Her biri kendi alanında uzman mühendis ve teknisyen kadromuz ile, projelerin başından sonuna kadar tüm süreçlerde müşteri ihtiyaçlarını analiz ederek, özel ve sürdürülebilir <strong>mühendislik çözümleri</strong> üretmekteyiz.
                </p>
                <blockquote className="border-l-4 border-[#FF4D00] pl-8 italic bg-slate-50 py-4 text-slate-800">
                  "Yerli ve milli palet sistemlerimiz başta olmak üzere, tüm ürün gamımız yüksek dayanıklılık, uzun ömür ve yüksek performans kriterlerine göre tasarlanmaktadır."
                </blockquote>
              </article>

              {/* İstatistikler Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-gray-100">
                {stats.map((stat, i) => (
                  <div key={i} className="space-y-1">
                    <div className="text-[#FF4D00] font-black text-xl tracking-tighter">{stat.value}</div>
                    <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sağ Görsel Alanı */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/design-process.png"
                  alt="Temren Makina CNC Mühendislik ve Tasarım Süreci"
                  fill
                  className="object-cover rounded-3xl grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl"
                />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 border-b-2 border-l-2 border-[#FF4D00] opacity-20" />
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}