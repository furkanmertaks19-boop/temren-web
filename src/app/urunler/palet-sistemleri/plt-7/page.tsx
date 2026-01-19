"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  ChevronDown, CheckCircle2, FileText, ArrowRight,
  Zap, Settings, X, Layers, Wrench, ShieldCheck, Share2, Ruler, Weight, Gauge, Loader2
} from 'lucide-react';

export default function PLT07Page() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
  const [imgError, setImgError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- FORM DURUMLARI ---
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    adSoyad: "",
    telefon: "",
    email: "",
    jant: "",
    tercih: "Telefon",
    notlar: ""
  });

  // --- FORM GÖNDERME FONKSİYONU ---
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          adSoyad: form.adSoyad,
          email: form.email,
          telefon: form.telefon,
          secim: "PLT-07 GERRIDAE", // Admin panelinde görünecek etiket
          mesaj: `JANT/ARAÇ: ${form.jant} | TERCİH: ${form.tercih} | NOTLAR: ${form.notlar}`
        }),
      });

      if (response.ok) {
        setSuccess(true);
        // 3 saniye sonra modalı kapat ve formu sıfırla
        setTimeout(() => {
          setIsModalOpen(false);
          setSuccess(false);
          setForm({ adSoyad: "", telefon: "", email: "", jant: "", tercih: "Telefon", notlar: "" });
        }, 3000);
      }
    } catch (error) {
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  const mainImage = "/image/plt07.webp";

  const data = {
    eyebrow: "Ürün Kodu: PLT-7 GERRIDAE",
    title: "PLT 07",
    fullName: "PLT-7 GERRIDAE Çift Palet Sistemi",
    lead: "Tekerlekleri sökmeden, doğrudan janta takılabilen devrim niteliğinde çift palet sistemi. Araçta kalıcı modifikasyon gerektirmeden zorlu zeminlere saniyeler içinde uyum sağlar.",
    chips: ["Çift Palet Mimarisi", "Teker Sökmeden Kurulum", "Sıfır Modifikasyon", "Yüksek Stabilite"],
    trustLine: "Hızlı entegrasyon • Eşit yük dağılımı • Düşük bakım",

    valueProps: [
      { title: "Hızlı Montaj", desc: "Janta takılan özel yapı sayesinde tekerlekleri sökmeden kısa sürede kurulum. Operasyonel hızı iki katına çıkarır." },
      { title: "Üstün Çekiş", desc: "Çift palet mimarisi ile geniş temas yüzeyi. Düşük kayma ve kontrollü ilerleme için optimize edildi." },
      { title: "Denge & Stabilite", desc: "Eşit ağırlık dağılımı sağlayan simetrik yapı sayesinde sarsıntısız ve güvenli hareket kabiliyeti." }
    ],

    advantages: [
      { title: "Maksimum Kontrol", desc: "Çift palet sistemi ile direksiyon hakimiyeti ve frenleme mesafesinde üstün performans.", icon: <ShieldCheck size={32} /> },
      { title: "Pratik Kurulum", desc: "Mevcut tekerlekler üzerine takılır; zaman kaybı ve ağır işçilik ihtiyacı tamamen biter.", icon: <Wrench size={32} /> },
      { title: "Hibrit Uyum", desc: "Kaygan, çamurlu ve engebeli zeminlerde araç yapısını bozmadan profesyonel çözüm.", icon: <Share2 size={32} /> },
      { title: "Düşük Bakım", desc: "Modüler yapısı sayesinde yerinde hızlı servis ve parça değişimi ile düşük duruş süresi.", icon: <Settings size={32} /> }
    ],

    technical: [
      { l: "Dış Boyutlar", v: "870 × 550 × 1300 mm", icon: <Ruler size={20} /> },
      { l: "Birim Ağırlık", v: "~140 KG", icon: <Weight size={20} /> },
      { l: "Montaj Tipi", v: "Jant Üstü (Teker Sökmeden)", icon: <Wrench size={20} /> },
      { l: "Yük Dağılımı", v: "Eşit / Çift Palet", icon: <Layers size={20} /> },
      { l: "Araç Uyumu", v: "Üniversal Jant Adaptörü", icon: <Settings size={20} /> }
    ],

    useCases: [
      "Tarım ve Bağ-Bahçe Uygulamaları",
      "Endüstriyel Saha Araçları",
      "Hafif Off-Road Görevleri",
      "Sık Dönüşüm Gereken Projeler",
      "Yumuşak ve Gevşek Zeminler"
    ]
  };

  return (
    <main className="bg-[#050505] min-h-screen relative text-white overflow-x-hidden selection:bg-amber-500 selection:text-black font-sans">

      {/* 1. ARKA PLAN */}
      <div className="fixed inset-0 w-full h-screen z-0">
        <motion.div style={{ scale }} className="relative w-full h-full">
          {!imgError && (
            <Image
              src={mainImage}
              alt="PLT-7 GERRIDAE"
              fill
              className="object-cover opacity-60 md:opacity-80"
              priority
              onError={() => setImgError(true)}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
        </motion.div>
      </div>

      <div className="relative z-10 w-full">
        {/* HERO SECTION */}
        <section className="h-screen flex flex-col items-center justify-center text-center px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <span className="text-amber-500 font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs mb-8 block bg-amber-500/10 px-6 py-2 rounded-full border border-amber-500/20 w-fit mx-auto backdrop-blur-md italic font-black">
              {data.eyebrow}
            </span>
            <h1 className="text-7xl md:text-[14rem] font-black tracking-tighter leading-[0.8] mb-8 drop-shadow-2xl uppercase">
              PLT <span className="text-amber-500 italic">07</span>
            </h1>

            <h2 className="text-white text-2xl md:text-5xl font-black italic uppercase tracking-widest mb-10 drop-shadow-2xl">
              SİSTEME ANINDA ADAPTE OLUN
            </h2>

            <p className="text-white text-lg md:text-2xl max-w-4xl mx-auto font-bold leading-relaxed drop-shadow-2xl px-6 bg-black/20 backdrop-blur-sm py-4 rounded-2xl border border-white/5 font-sans">
              {data.lead}
            </p>

            <div className="flex flex-wrap justify-center gap-3 mt-12 max-w-4xl mx-auto">
              {data.chips.map((chip, i) => (
                <span key={i} className="text-[10px] md:text-xs font-black uppercase tracking-widest bg-black/50 backdrop-blur-2xl border border-white/20 px-6 py-3 rounded-xl text-white">
                  {chip}
                </span>
              ))}
            </div>

            <p className="text-white/60 text-[10px] md:text-xs tracking-[0.5em] uppercase mt-16 font-black italic bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm w-fit mx-auto border border-white/5">
              {data.trustLine}
            </p>
          </motion.div>
          <ChevronDown className="absolute bottom-10 opacity-30 animate-bounce text-amber-500" size={40} />
        </section>

        {/* NIÇIN PLT-07 SECTION */}
        <section className="py-32 px-6 container mx-auto">
          <div className="mb-24 text-center">
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6 italic text-white leading-none">Niçin <span className="text-amber-500 font-light italic text-6xl md:text-7xl">GERRIDAE?</span></h2>
            <p className="text-white/80 text-xl md:text-2xl font-medium italic max-w-3xl mx-auto border-l-4 border-amber-500 pl-8 text-left">Yüksek denge ve modifikasyon gerektirmeyen hibrit tasarım.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 font-sans">
            {data.valueProps.map((prop, i) => (
              <div key={i} className="group p-12 rounded-[3.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl hover:border-amber-500 transition-all duration-700">
                <h3 className="text-2xl font-black mb-6 uppercase italic text-amber-500 tracking-tight leading-none">{prop.title}</h3>
                <p className="text-white/80 leading-relaxed text-lg font-medium group-hover:text-white transition-colors">{prop.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* OPERASYONEL AVANTAJLAR */}
        <section className="py-32 px-6 bg-white/[0.02] border-y border-white/5 backdrop-blur-sm">
          <div className="container mx-auto">
            <div className="mb-20 text-center md:text-left">
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic text-white leading-none">AVANTAJLAR</h2>
              <p className="text-white/50 uppercase tracking-[0.3em] text-sm mt-6 font-bold">Saha gerçekleri için optimize edilmiş çift palet teknolojisi.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.advantages.map((adv, i) => (
                <div key={i} className="p-10 rounded-[2.5rem] bg-black/60 border border-white/5 hover:bg-amber-500 transition-all duration-700 group cursor-default">
                  <div className="text-amber-500 group-hover:text-black mb-8 transition-colors group-hover:scale-110 origin-left">{adv.icon}</div>
                  <h4 className="text-2xl font-black mb-4 uppercase group-hover:text-black transition-colors">{adv.title}</h4>
                  <p className="text-white/70 group-hover:text-black/90 text-sm leading-relaxed transition-colors font-semibold">{adv.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TEKNİK ANALİZ */}
        <section className="py-44 px-6 container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <div className="space-y-12">
              <h2 className="text-6xl md:text-[8rem] font-black uppercase tracking-tighter italic leading-[0.8] drop-shadow-xl">TEKNİK <br /><span className="text-amber-500">ÖZELLİK</span></h2>
              <p className="text-white/70 text-xl md:text-2xl font-light italic leading-relaxed">
                GERRIDAE, araç yapısını bozmadan paletli sürüş avantajı sunar. Özellikle sık tekerlek-palet dönüşümü gereken işler için idealdir.
              </p>

              <div className="space-y-4">
                {data.technical.map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-all group">
                    <div className="flex items-center gap-4 text-white/50 uppercase text-[10px] font-black tracking-widest leading-none group-hover:text-amber-500 transition-colors">
                      {item.icon} {item.l}
                    </div>
                    <span className="text-xl md:text-2xl font-black text-white">{item.v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-12 rounded-[4rem] bg-amber-500/[0.03] border border-amber-500/20 backdrop-blur-xl relative overflow-hidden group min-h-[500px] flex flex-col justify-center font-sans">
              <div className="absolute -top-10 -right-10 text-[15rem] font-black text-amber-500/[0.04] italic pointer-events-none select-none group-hover:scale-110 transition-transform duration-1000">07</div>
              <h3 className="text-4xl md:text-5xl font-black mb-12 uppercase italic tracking-tight text-amber-500 leading-none">UYGULAMA <br />SAHALARI</h3>
              <ul className="space-y-6 relative z-10">
                {data.useCases.map((use, i) => (
                  <li key={i} className="flex gap-6 items-center text-white/90 text-xl md:text-2xl font-bold group/item hover:translate-x-3 transition-transform">
                    <CheckCircle2 className="text-amber-500 flex-shrink-0 shadow-lg shadow-amber-500/20" size={28} /> {use}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-40 text-center bg-white text-black rounded-t-[4rem] md:rounded-t-[6rem] relative overflow-hidden">
          <div className="relative z-10 px-6">
            <h2 className="text-6xl md:text-[10rem] font-black uppercase tracking-tighter mb-16 leading-[0.9] italic">
              PRATİK <br /> HİBRİT GÜÇ.
            </h2>
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <button className="bg-black text-white px-16 py-8 rounded-full font-black text-xl hover:bg-amber-600 transition-all duration-500 flex items-center justify-center gap-4 group shadow-xl uppercase">
                KATALOG <FileText size={24} />
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-amber-500 text-black px-16 py-8 rounded-full font-black text-xl hover:bg-black hover:text-white transition-all duration-500 border-none shadow-xl shadow-amber-500/10 active:scale-95 uppercase"
              >
                TEKLİF TALEBİ
              </button>
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-black text-black/[0.02] select-none pointer-events-none uppercase italic">
            GERRID
          </div>
        </section>
      </div>

      {/* MODAL / FORM ENTEGRASYONU */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 overflow-y-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="fixed inset-0 bg-black/98 backdrop-blur-3xl" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="relative w-full max-w-5xl bg-[#080808] border border-white/10 rounded-[4rem] p-8 md:p-20 shadow-2xl text-white font-sans max-h-[95vh] overflow-y-auto"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-50"><X size={32} /></button>

              {success ? (
                <div className="text-center py-20">
                  <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-emerald-500/20">
                    <CheckCircle2 size={50} className="text-black" />
                  </div>
                  <h2 className="text-5xl font-black italic uppercase tracking-tighter mb-4">Talep İletildi</h2>
                  <p className="text-white/40 uppercase tracking-[0.2em] font-bold">Operatörlerimiz sizinle kısa süre içinde iletişime geçecektir.</p>
                </div>
              ) : (
                <>
                  <div className="mb-16 text-center md:text-left">
                    <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">TEKLİF <span className="text-amber-500 font-light italic tracking-widest">FORMU</span></h2>
                    <p className="text-white/40 mt-6 text-xl md:text-2xl font-light uppercase tracking-widest leading-relaxed">PLT-7 GERRIDAE hibrit palet çözümü için bilgilerinizi girin.</p>
                  </div>

                  <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
                    <div className="space-y-10">
                      {[
                        { l: "Ad Soyad", id: "adSoyad", t: "text", p: "İsim Soyisim" },
                        { l: "Telefon", id: "telefon", t: "tel", p: "05xx xxx xx xx" },
                        { l: "E-posta", id: "email", t: "email", p: "eposta@adresiniz.com" }
                      ].map((f) => (
                        <div key={f.id} className="border-b border-white/20 focus-within:border-amber-500 transition-colors group">
                          <label className="text-[10px] font-black uppercase text-amber-500 mb-2 block tracking-widest">{f.l} *</label>
                          <input
                            type={f.t}
                            required
                            value={form[f.id as keyof typeof form]}
                            onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
                            className="w-full bg-transparent py-4 text-xl md:text-2xl outline-none font-bold text-white placeholder:text-white/5"
                            placeholder={f.p}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="space-y-10">
                      <div className="border-b border-white/20 focus-within:border-amber-500 transition-colors group">
                        <label className="text-[10px] font-black uppercase text-amber-500 mb-2 block tracking-widest">Jant Ölçüsü / Araç Tipi</label>
                        <input
                          type="text"
                          value={form.jant}
                          onChange={(e) => setForm({ ...form, jant: e.target.value })}
                          placeholder="Örn:Araç Modeli"
                          className="w-full bg-transparent py-4 text-xl md:text-2xl outline-none font-bold text-white placeholder:text-white/5"
                        />
                      </div>

                      <div className="border-b border-white/20 focus-within:border-amber-500 transition-colors group">
                        <label className="text-[10px] font-black uppercase text-amber-500 mb-2 block tracking-widest">İletişim Tercihi</label>
                        <select
                          value={form.tercih}
                          onChange={(e) => setForm({ ...form, tercih: e.target.value })}
                          className="w-full bg-transparent py-4 text-xl md:text-2xl outline-none appearance-none cursor-pointer text-white font-bold"
                        >
                          <option className="bg-[#080808]" value="Telefon">Telefon</option>
                          <option className="bg-[#080808]" value="WhatsApp">WhatsApp</option>
                          <option className="bg-[#080808]" value="E-posta">E-posta</option>
                        </select>
                      </div>

                      <div className="border-b border-white/20 focus-within:border-amber-500 transition-colors group">
                        <label className="text-[10px] font-black uppercase text-amber-500 mb-2 block tracking-widest">Kullanım Amacı / Notlar</label>
                        <textarea
                          rows={1}
                          value={form.notlar}
                          onChange={(e) => setForm({ ...form, notlar: e.target.value })}
                          placeholder="Zemin durumu ve beklentileriniz..."
                          className="w-full bg-transparent py-4 text-xl md:text-2xl outline-none resize-none font-bold text-white placeholder:text-white/5"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="md:col-span-2 w-full bg-amber-500 text-black py-8 md:py-10 rounded-3xl font-black text-2xl md:text-3xl uppercase tracking-widest hover:bg-white transition-all shadow-2xl shadow-amber-500/20 active:scale-95 flex items-center justify-center gap-4"
                    >
                      {loading ? <Loader2 className="animate-spin" size={32} /> : "TALEBİ GÖNDER"}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}