"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Settings,
  Layers,
  Ruler,
  Loader2,
  Maximize2,
  Send,
  User,
  Phone,
  Mail,
  MessageSquare,
  X,
  Factory,
  Gauge,
  Wrench,
} from "lucide-react";
import Footer from "@/components/layout/Footer";

interface GalleryItem {
  src: string;
  alt: string;
}

interface FormState {
  adSoyad: string;
  telefon: string;
  email: string;
  olcu: string;
  mesaj: string;
}

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface FormInputProps {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}

export default function VakumluTablaPage() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const [form, setForm] = useState<FormState>({
    adSoyad: "",
    telefon: "",
    email: "",
    olcu: "300 × 400 mm",
    mesaj: "",
  });

  const mainImage = "/image/vakum_5.JPG";

  const gallery: GalleryItem[] = [
    { src: "/image/vakum_1.JPG", alt: "CNC vakum tablası teknik yüzey detayı" },
    { src: "/image/vakum_2.JPG", alt: "Vakumlu tabla üretim ve işleme detayı" },
    { src: "/image/vakum_4.JPG", alt: "Temren Makina CNC vakum tablası genel görünüm" },
    { src: "/image/vakum_5.JPG", alt: "Vakum tablası bağlantı portları ve gövde yapısı" },
  ];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/quote-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          productName: "CNC Vakum Tablası / Vakumlu Tabla",
          sourcePage: "/urunler/uretim/vakum-tablasi",
          sourceLabel: "CNC Vakum Tablası",
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setForm({
          adSoyad: "",
          telefon: "",
          email: "",
          olcu: "300 × 400 mm",
          mesaj: "",
        });

        setTimeout(() => {
          setIsModalOpen(false);
          setSuccess(false);
        }, 3000);
      } else {
        alert("Talep gönderilirken bir hata oluştu.");
      }
    } catch (error) {
      alert("Bağlantı hatası!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#050505] min-h-screen relative text-white selection:bg-amber-500 selection:text-black font-sans overflow-x-hidden">
      {/* SEO: Product + Breadcrumb + FAQ + Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Anasayfa",
                  item: "https://temrenmakina.com",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Ürünler",
                  item: "https://temrenmakina.com/urunler",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Üretim Ekipmanları",
                  item: "https://temrenmakina.com/faaliyet/uretim",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "CNC Vakum Tablası",
                  item: "https://temrenmakina.com/urunler/uretim/vakum-tablasi",
                },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "Product",
              name: "CNC Vakum Tablası ve Vakumlu Tabla",
              image: [
                "https://temrenmakina.com/image/vakum_1.JPG",
                "https://temrenmakina.com/image/vakum_2.JPG",
                "https://temrenmakina.com/image/vakum_4.JPG",
                "https://temrenmakina.com/image/vakum_5.JPG",
              ],
              description:
                "Temren Makina CNC vakum tablası ve vakumlu tabla çözümleri; CNC işleme, talaşlı imalat ve hassas üretim süreçlerinde yüksek tutuş gücü, stabil sabitleme ve pratik kullanım avantajı sunar.",
              brand: {
                "@type": "Brand",
                name: "Temren Makina",
              },
              manufacturer: {
                "@type": "Organization",
                name: "Temren Makina",
                url: "https://temrenmakina.com",
              },
              category: "CNC Bağlama Sistemleri / Vakumlu Tabla Sistemleri",
              url: "https://temrenmakina.com/urunler/uretim/vakum-tablasi",
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "CNC vakum tablası nedir?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "CNC vakum tablası, iş parçasını vakum basıncı ile yüzeye sabitleyen ve işleme sırasında stabil tutuş sağlayan bağlama sistemidir.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Vakum tablası ile vakumlu tabla aynı ürün müdür?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Evet, sektörde vakum tablası ve vakumlu tabla ifadeleri aynı ürün grubu için kullanılabilir. Her iki ifade de vakumla sabitleme yapan tabla sistemlerini anlatır.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Vakumlu tabla hangi alanlarda kullanılır?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "CNC işleme, frezeleme, hassas bağlama, alüminyum işleme, kompozit, plastik, ahşap ve talaşlı imalat süreçlerinde kullanılır.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Özel ölçü vakum tablası üretimi yapılır mı?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Evet, Temren Makina uygulama ihtiyacına göre özel ölçü CNC vakum tablası ve vakumlu tabla üretimi yapabilir.",
                  },
                },
              ],
            },
          ]),
        }}
      />

      {/* HERO BACKDROP */}
      <div className="fixed inset-0 w-full h-screen z-0">
        <motion.div style={{ scale }} className="relative w-full h-full">
          <Image
            src={mainImage}
            alt="Temren Makina CNC vakum tablası ve vakumlu tabla"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/30 to-[#050505]/90" />
        </motion.div>
      </div>

      <div className="relative z-10 w-full">
        {/* HERO */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-amber-500 font-black tracking-[0.45em] uppercase text-[11px] mb-8 block bg-amber-500/10 px-6 py-2 rounded-full border border-amber-500/20 w-fit mx-auto backdrop-blur-md italic">
              CNC BAĞLAMA VE HASSAS SABİTLEME SİSTEMLERİ
            </span>

            <h1 className="text-6xl md:text-[11rem] lg:text-[13rem] font-black tracking-tighter leading-[0.78] mb-8 uppercase italic drop-shadow-2xl text-white">
              CNC <span className="text-amber-500">VAKUM TABLASI</span>
            </h1>

            <p className="text-white/85 text-lg md:text-2xl max-w-5xl mx-auto font-bold leading-relaxed tracking-tight px-4">
              Temren Makina; CNC vakum tablası, vakumlu tabla ve özel ölçü vakum
              tabla çözümleriyle hassas sabitleme, yüksek tutuş gücü ve stabil
              işleme avantajı sunar.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-amber-500 text-black px-9 py-4 rounded-full font-black uppercase tracking-[0.2em] text-xs hover:bg-white transition-all shadow-2xl"
              >
                Teklif Al
              </button>

              <a
                href="#detay"
                className="border border-white/20 text-white px-9 py-4 rounded-full font-black uppercase tracking-[0.2em] text-xs hover:bg-white hover:text-black transition-all"
              >
                Ürünü İncele
              </a>
            </div>
          </motion.div>

          <ChevronDown
            className="absolute bottom-10 opacity-40 animate-bounce text-amber-500"
            size={40}
          />
        </section>

        {/* SEO DETAY METNİ */}
        <section id="detay" className="py-28 px-6 container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-amber-500 font-black tracking-[0.3em] uppercase text-xs">
                Vakum Tablası Üretimi
              </span>
              <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mt-5 mb-8 leading-none">
                Vakum Tablası ve Vakumlu Tabla Çözümleri
              </h2>
            </div>

            <div className="space-y-6 text-white/75 text-lg leading-relaxed">
              <p>
                <strong className="text-white">CNC vakum tablası</strong>, iş
                parçasını mekanik sıkma aparatlarına ihtiyaç duymadan vakum
                kuvvetiyle sabitleyen profesyonel bir bağlama sistemidir.
                Temren Makina tarafından geliştirilen{" "}
                <strong className="text-white">vakumlu tabla</strong> çözümleri,
                hassas üretim ve talaşlı imalat süreçlerinde güvenli tutuş,
                hızlı kurulum ve tekrarlanabilir işleme performansı sağlar.
              </p>

              <p>
                Özel ölçü üretilebilen vakum tabla sistemleri; alüminyum,
                kompozit, plastik, ahşap ve farklı iş parçalarının CNC
                tezgahlarda stabil şekilde işlenmesine yardımcı olur. Böylece
                parça deformasyonu azalır, bağlama süresi kısalır ve üretim
                verimliliği artar.
              </p>
            </div>
          </div>
        </section>

        {/* AVANTAJLAR */}
        <section className="py-24 px-6 container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCard
              icon={<Zap size={32} />}
              title="Hızlı Bağlama"
              desc="Vakum tablası sayesinde bağlama ve sökme süresi önemli ölçüde azalır."
            />
            <StatCard
              icon={<ShieldCheck size={32} />}
              title="Güvenli Tutuş"
              desc="Vakumlu tabla, iş parçasını yüzeye dengeli şekilde sabitler."
            />
            <StatCard
              icon={<Gauge size={32} />}
              title="Stabil İşleme"
              desc="Titreşim ve oynama riskini azaltarak hassas CNC işleme sağlar."
            />
            <StatCard
              icon={<Settings size={32} />}
              title="Özel Üretim"
              desc="Ölçü, kanal yapısı ve bağlantılar ihtiyaca göre özelleştirilebilir."
            />
          </div>
        </section>

        {/* KULLANIM ALANLARI */}
        <section className="py-28 px-6 container mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <span className="text-amber-500 font-black tracking-[0.3em] uppercase text-xs">
              Kullanım Alanları
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mt-5">
              CNC Vakum Tablası Nerelerde Kullanılır?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoBox
              icon={<Factory size={28} />}
              title="Talaşlı İmalat"
              desc="CNC işleme merkezlerinde parçanın stabil tutulması için kullanılır."
            />
            <InfoBox
              icon={<Layers size={28} />}
              title="Plaka ve Levha İşleme"
              desc="Geniş yüzeyli parçaların mekanik baskı olmadan sabitlenmesini sağlar."
            />
            <InfoBox
              icon={<Wrench size={28} />}
              title="Özel Aparat Sistemleri"
              desc="Üretim hattına ve iş parçasına göre özel vakumlu tabla tasarlanabilir."
            />
          </div>
        </section>

        {/* TEKNİK ÖZELLİKLER */}
        <section className="py-28 px-6 container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row md:items-center gap-8 mb-16">
            <h2 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-none text-amber-500">
              Teknik Özellikler
            </h2>
            <div className="h-1 bg-white/10 flex-grow rounded-full" />
          </div>

          <div className="grid grid-cols-1 gap-4 font-sans text-white">
            {[
              { l: "Ürün Grubu", v: "CNC Vakum Tablası" },
              { l: "Diğer Kullanım Adı", v: "Vakumlu Tabla" },
              { l: "Gövde Yapısı", v: "Alüminyum Gövde" },
              { l: "Çalışma Prensibi", v: "Vakum ile Sabitleme" },
              { l: "Kullanım Alanı", v: "CNC ve Hassas Üretim" },
              { l: "Üretim Tipi", v: "Standart / Özel Ölçü" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 py-8 border-b border-white/10 group transition-all hover:bg-white/[0.03] hover:px-6 rounded-3xl"
              >
                <span className="text-white/50 font-black uppercase text-xs tracking-[0.3em] group-hover:text-amber-500">
                  {item.l}
                </span>
                <span className="text-2xl md:text-4xl font-black italic tracking-tighter">
                  {item.v}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* SEO BLOK */}
        <section className="py-28 px-6 container mx-auto max-w-6xl">
          <div className="bg-white/[0.04] border border-white/10 rounded-[3rem] p-8 md:p-14">
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-8 text-amber-500">
              Vakum Tablası Fiyatları ve Özel Ölçü Üretim
            </h2>

            <div className="space-y-6 text-white/75 text-lg leading-relaxed">
              <p>
                Vakum tablası fiyatları; ölçü, gövde yapısı, kanal tasarımı,
                bağlantı tipi ve uygulama ihtiyacına göre değişebilir. Temren
                Makina, standart çözümlerin yanında projeye özel{" "}
                <strong className="text-white">CNC vakum tablası</strong> ve{" "}
                <strong className="text-white">vakumlu tabla üretimi</strong>{" "}
                yaparak üretim süreçlerine uygun çözümler geliştirir.
              </p>

              <p>
                CNC tezgahınız, iş parçası ölçünüz ve üretim prosesiniz
                değerlendirildikten sonra size uygun vakum tabla tasarımı için
                teknik destek ve teklif sunulabilir.
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-10 bg-amber-500 text-black px-10 py-5 rounded-full font-black uppercase tracking-[0.2em] text-xs hover:bg-white transition-all inline-flex items-center gap-3"
            >
              Vakum Tablası Teklifi Al <ArrowRight size={18} />
            </button>
          </div>
        </section>

        {/* GALERİ */}
        <section className="py-28 px-6 container mx-auto">
          <div className="mb-12">
            <span className="text-amber-500 font-black tracking-[0.3em] uppercase text-xs">
              Ürün Galerisi
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mt-5">
              CNC Vakum Tablası Görselleri
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {gallery.map((img, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -12, scale: 1.03 }}
                onClick={() => setSelectedImg(img.src)}
                className="relative aspect-square rounded-[2.5rem] overflow-hidden border-2 border-white/5 cursor-zoom-in group bg-white/5"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                  <Maximize2 size={40} className="text-amber-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-36 text-center bg-white text-black rounded-t-[5rem] md:rounded-t-[9rem] relative overflow-hidden">
          <div className="relative z-10 px-6 font-sans">
            <span className="text-amber-600 font-black tracking-[0.3em] uppercase text-xs">
              Temren Makina
            </span>
            <h2 className="text-6xl md:text-[10rem] font-black uppercase tracking-tighter mb-14 leading-[0.82] italic text-black mt-6">
              HASSAS <br />
              <span className="text-amber-500">SABİTLEME.</span>
            </h2>

            <p className="max-w-3xl mx-auto text-slate-600 text-lg leading-relaxed font-semibold mb-12">
              CNC vakum tablası ve vakumlu tabla ihtiyaçlarınız için ölçü,
              kullanım alanı ve teknik beklentilerinizi paylaşın; size uygun
              çözüm için teklif hazırlayalım.
            </p>

            <div className="flex justify-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-black text-white px-12 md:px-16 py-7 rounded-full font-black text-lg md:text-2xl hover:bg-amber-500 hover:text-black transition-all shadow-2xl uppercase italic flex items-center gap-6 group"
              >
                Teklif Talebi{" "}
                <ArrowRight
                  size={32}
                  className="group-hover:translate-x-4 transition-transform"
                />
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:p-20">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImg(null)}
              className="fixed inset-0 bg-black/98 backdrop-blur-2xl cursor-zoom-out"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              className="relative w-full h-full"
            >
              <Image
                src={selectedImg}
                alt="CNC vakum tablası detay görseli"
                fill
                className="object-contain"
              />
              <button
                onClick={() => setSelectedImg(null)}
                className="absolute top-0 right-0 p-8 text-white hover:text-amber-500 transition-colors"
              >
                <X size={54} strokeWidth={3} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Teklif Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-2xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-[500px] bg-white rounded-[3rem] shadow-2xl overflow-hidden"
            >
              {!success && (
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-8 right-8 p-2 rounded-full hover:bg-slate-100 text-slate-400 z-50 transition-all"
                >
                  <X size={24} />
                </button>
              )}

              <div className="p-10 md:p-14 text-slate-900 font-sans">
                {success ? (
                  <div className="text-center py-10">
                    <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-inner">
                      <CheckCircle2 size={50} />
                    </div>
                    <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-tight">
                      Talebiniz Alındı
                    </h2>
                    <p className="mt-4 text-slate-500 font-semibold">
                      Ekibimiz en kısa sürede sizinle iletişime geçecektir.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="mb-10 border-l-8 border-amber-500 pl-6 text-slate-900">
                      <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none">
                        Vakum Tablası Teklifi Alın
                      </h2>
                    </div>

                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <FormInput
                        icon={<User size={18} />}
                        placeholder="Ad Soyad"
                        value={form.adSoyad}
                        onChange={(v) => setForm({ ...form, adSoyad: v })}
                      />

                      <FormInput
                        icon={<Phone size={18} />}
                        placeholder="Telefon"
                        value={form.telefon}
                        onChange={(v) => setForm({ ...form, telefon: v })}
                        type="tel"
                      />

                      <FormInput
                        icon={<Mail size={18} />}
                        placeholder="E-Posta"
                        value={form.email}
                        onChange={(v) => setForm({ ...form, email: v })}
                        type="email"
                      />

                      <div className="relative group text-slate-900">
                        <Ruler
                          size={18}
                          className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300"
                        />
                        <select
                          value={form.olcu}
                          onChange={(e) =>
                            setForm({ ...form, olcu: e.target.value })
                          }
                          className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl pl-16 pr-8 py-5 text-slate-900 outline-none focus:border-amber-500 transition-all font-black appearance-none italic uppercase"
                        >
                          <option>300 × 400 mm</option>
                          <option>400 × 600 mm</option>
                          <option>600 × 600 mm</option>
                          <option>Özel ölçü</option>
                        </select>
                      </div>

                      <div className="relative group text-slate-900">
                        <MessageSquare
                          size={18}
                          className="absolute left-6 top-7 text-slate-300"
                        />
                        <textarea
                          rows={3}
                          placeholder="İhtiyacınız olan ölçü, kullanım alanı veya notlarınız..."
                          value={form.mesaj}
                          onChange={(e) =>
                            setForm({ ...form, mesaj: e.target.value })
                          }
                          className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl pl-16 pr-8 py-6 text-slate-900 outline-none focus:border-amber-500 transition-all font-black resize-none"
                        />
                      </div>

                      <button
                        disabled={loading}
                        className="w-full bg-slate-900 text-white py-6 rounded-3xl font-black text-[12px] uppercase tracking-[0.3em] hover:bg-amber-500 hover:text-black transition-all flex items-center justify-center gap-4 disabled:opacity-60"
                      >
                        {loading ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          <>
                            Gönder <Send size={18} />
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

function StatCard({ icon, title, desc }: StatCardProps) {
  return (
    <div className="p-10 md:p-12 rounded-[3rem] bg-white/[0.04] border border-white/10 hover:bg-amber-500 transition-all duration-700 group cursor-default">
      <div className="text-amber-500 group-hover:text-black mb-8 transition-colors group-hover:scale-110 origin-left">
        {icon}
      </div>
      <h3 className="text-2xl font-black mb-4 uppercase group-hover:text-black transition-colors italic leading-none tracking-tighter">
        {title}
      </h3>
      <p className="text-white/70 group-hover:text-black/90 text-sm leading-relaxed transition-colors font-black uppercase tracking-tight">
        {desc}
      </p>
    </div>
  );
}

function InfoBox({ icon, title, desc }: StatCardProps) {
  return (
    <div className="p-8 rounded-[2.5rem] bg-white/[0.04] border border-white/10 hover:border-amber-500/60 transition-all">
      <div className="text-amber-500 mb-6">{icon}</div>
      <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-4">
        {title}
      </h3>
      <p className="text-white/70 leading-relaxed font-semibold">{desc}</p>
    </div>
  );
}

function FormInput({
  icon,
  placeholder,
  value,
  onChange,
  type = "text",
}: FormInputProps) {
  return (
    <div className="relative group text-slate-900">
      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-500">
        {icon}
      </div>
      <input
        required
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl pl-16 pr-8 py-5 text-slate-900 outline-none focus:bg-white focus:border-amber-500 transition-all font-black"
      />
    </div>
  );
}