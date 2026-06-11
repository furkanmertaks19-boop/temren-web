"use client";
import React, { useState, useEffect } from "react";
import PageHeader from "@/components/layout/PageHeader";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send, ExternalLink } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

export default function Iletisim() {
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    adSoyad: "",
    email: "",
    konu: "",
    mesaj: ""
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          secim: formData.konu || "Genel İletişim",
          sourcePage: "/iletisim",
          sourceLabel: formData.konu ? `İletişim: ${formData.konu}` : "İletişim Sayfası",
        }),
      });

      const result = await res.json();

      if (result.success) {
        toast.success("Mesajınız başarıyla iletildi!");
        setFormData({ adSoyad: "", email: "", konu: "", mesaj: "" });
      } else {
        toast.error("Bir hata oluştu: " + result.error);
      }
    } catch (error) {
      toast.error("Sunucuya bağlanılamadı.");
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="bg-white min-h-screen">
      {/* ✅ SEO: Yerel İşletme Şeması (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Temren Makina",
            "image": "https://temrenmakina.com/logo.png",
            "telephone": "+903128100230",
            "email": "satis@temrenmakina.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Saray Mah. 100.Yıl Blv. No:75",
              "addressLocality": "Kahramankazan",
              "addressRegion": "Ankara",
              "postalCode": "06980",
              "addressCountry": "TR"
            },
            "url": "https://temrenmakina.com/iletisim",
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "08:30",
              "closes": "18:30"
            }
          })
        }}
      />

      <Toaster position="top-center" />
      <PageHeader
        title="İLETİŞİM"
        subtitle="BİZİMLE ÇÖZÜM ORTAĞI OLUN"
      />

      <main className="pt-24 pb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 skew-x-12 translate-x-1/2 -z-10" />

        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

            {/* Sol Kolon: Bilgiler */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase mb-8 leading-none">
                  Hızlı <span className="text-[#FF4D00]">Erişim</span>
                </h2>
                <p className="text-slate-500 font-medium text-lg leading-relaxed mb-12">
                  <strong>Ankara talaşlı imalat</strong> ve <strong>CNC çözümleri</strong> projeleriniz hakkında bilgi almak için teknik ekibimizle iletişime geçebilirsiniz.
                </p>

                <div className="space-y-10">
                  <address className="not-italic space-y-10">
                    <div className="flex gap-6 group">
                      <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#FF4D00] transition-colors duration-500 shadow-xl">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-400 mb-2">FABRİKA & OFİS</h4>
                        <p className="text-slate-900 font-bold text-lg leading-snug">
                          Saray Mah. 100.Yıl Blv. No:75,<br /> Kahramankazan / Ankara
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-6 group">
                      <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#FF4D00] transition-colors duration-500 shadow-xl">
                        <Phone size={24} />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-400 mb-2">TELEFON</h4>
                        <a href="tel:+903128100230" className="text-slate-900 font-bold text-lg hover:text-[#FF4D00]">0 (312) 810 02 30</a>
                      </div>
                    </div>

                    <div className="flex gap-6 group">
                      <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#FF4D00] transition-colors duration-500 shadow-xl">
                        <Mail size={24} />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-400 mb-2">E-POSTA</h4>
                        <a href="mailto:satis@temrenmakina.com" className="text-slate-900 font-bold text-lg hover:text-[#FF4D00]">satis@temrenmakina.com</a>
                      </div>
                    </div>
                  </address>
                </div>
              </motion.div>
            </div>

            {/* Sağ Kolon: Form */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white p-12 md:p-16 rounded-[48px] shadow-2xl shadow-slate-200/50 border border-slate-100"
              >
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase ml-4">AD SOYAD</label>
                    <input
                      required
                      type="text"
                      value={formData.adSoyad}
                      onChange={(e) => setFormData({ ...formData, adSoyad: e.target.value })}
                      className="bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#FF4D00] transition-all font-bold text-slate-900"
                      placeholder="İsminiz..."
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase ml-4">E-POSTA</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#FF4D00] transition-all font-bold text-slate-900"
                      placeholder="E-posta adresiniz..."
                    />
                  </div>
                  <div className="md:col-span-2 flex flex-col gap-2">
                    <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase ml-4">KONU</label>
                    <input
                      required
                      type="text"
                      value={formData.konu}
                      onChange={(e) => setFormData({ ...formData, konu: e.target.value })}
                      className="bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#FF4D00] transition-all font-bold text-slate-900"
                      placeholder="Hangi konuda bilgi almak istersiniz?"
                    />
                  </div>
                  <div className="md:col-span-2 flex flex-col gap-2">
                    <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase ml-4">MESAJINIZ</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.mesaj}
                      onChange={(e) => setFormData({ ...formData, mesaj: e.target.value })}
                      className="bg-slate-50 border-none rounded-3xl px-6 py-4 focus:ring-2 focus:ring-[#FF4D00] transition-all font-bold text-slate-900"
                      placeholder="Mesajınızı buraya yazın..."
                    ></textarea>
                  </div>
                  <div className="md:col-span-2 pt-4">
                    <motion.button
                      disabled={loading}
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-[#FF4D00] text-white py-5 rounded-2xl font-black tracking-[0.2em] uppercase flex items-center justify-center gap-4 shadow-xl shadow-[#FF4D00]/30 hover:bg-slate-900 transition-colors duration-500 disabled:bg-slate-400 disabled:cursor-not-allowed"
                    >
                      {loading ? "GÖNDERİLİYOR..." : <><Send size={20} /> MESAJI GÖNDER</>}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* ✅ GOOGLE MAPS BÖLÜMÜ */}
      {/* ✅ GOOGLE MAPS BÖLÜMÜ - GÜNCEL KONUM */}
      <section className="container mx-auto px-8 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative w-full h-[500px] rounded-[48px] overflow-hidden shadow-2xl border border-slate-100 group"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12224.225791993215!2d32.5936051!3d40.0542017!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d349e87c8afc45%3A0x5766613456602694!2sTEMREN%20MAK%C4%B0NA!5e0!3m2!1str!2str!4v1715600000000!5m2!1str!2str"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale group-hover:grayscale-0 transition-all duration-700"
          />

          {/* Harita Üzerinde Yüzen Bilgi Kartı */}
          <div className="absolute bottom-8 left-8 bg-slate-900 text-white p-6 rounded-3xl shadow-2xl hidden md:block max-w-xs border border-slate-800">
            <h3 className="text-lg font-black italic mb-2 tracking-tighter uppercase">Temren Makina</h3>
            <p className="text-slate-400 text-xs font-bold leading-relaxed mb-4 uppercase tracking-widest">
              Saray, 100. Yıl Bulvarı No:75,<br /> 06980 Kahramankazan/Ankara
            </p>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=TEMREN+MAKINA+Kahramankazan+Ankara"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#FF4D00] text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors"
            >
              YOL TARİFİ AL <ExternalLink size={14} />
            </a>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}