"use client";
import React, { useState } from "react";
import PageHeader from "@/components/layout/PageHeader";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Target, Briefcase, Mail, ArrowRight, X, CheckCircle2, Upload } from "lucide-react";
import Footer from "@/components/layout/Footer";

export default function InsanKaynaklari() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsModalOpen(false);
    }, 3000);
  };

  return (
    <div className="bg-white min-h-screen">
      <PageHeader title="İNSAN KAYNAKLARI" subtitle="TEMREN'DE KARİYER" />

      <main className="py-24">
        <div className="container mx-auto px-8">
          
          {/* Giriş ve Vizyon Bölümü */}
          <div className="flex flex-col lg:flex-row gap-20 items-center mb-32">
            <div className="lg:w-1/2">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 mb-6"
              >
                <div className="w-12 h-[2px] bg-[#FF4D00]" />
                <span className="text-[#FF4D00] font-black text-xs tracking-[0.4em] uppercase">Yetenek Yönetimi</span>
              </motion.div>
              <h2 className="text-slate-900 text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-10">
                GELECEĞİ <br /> <span className="text-slate-300">BİRLİKTE</span> <br /> İNŞA EDELİM.
              </h2>
            </div>
            
            <div className="lg:w-1/2 space-y-6">
               {[
                 { icon: <Users size={32} />, title: "Ekip Ruhu", desc: "Başarımızın temelinde, birbirini destekleyen uzman kadromuzun ortak sinerjisi yatar." },
                 { icon: <Target size={32} />, title: "Sürekli Gelişim", desc: "Teknolojiye ve çalışanlarımızın eğitimine yatırım yaparak her zaman bir adım önde olmayı hedefliyoruz." }
               ].map((item, i) => (
                 <div key={i} className="p-8 bg-slate-50 border border-slate-100 rounded-[32px] flex items-start gap-6 group hover:border-[#FF4D00]/30 transition-all">
                    <div className="text-[#FF4D00] group-hover:scale-110 transition-transform">{item.icon}</div>
                    <div>
                       <h3 className="text-slate-900 font-black text-xl uppercase tracking-tighter mb-2">{item.title}</h3>
                       <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>

          {/* İlanlar ve Aksiyon Alanı */}
          <div className="bg-slate-950 rounded-[60px] p-12 md:p-24 relative overflow-hidden shadow-2xl">
            <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-16">
              <div className="max-w-2xl text-center lg:text-left">
                <Briefcase className="text-[#FF4D00] mb-8 mx-auto lg:mx-0" size={48} />
                <h4 className="text-white text-4xl md:text-5xl font-black tracking-tighter uppercase mb-6 leading-none">
                  AÇIK POZİSYONLAR VE <br /> <span className="text-[#FF4D00]">GENEL BAŞVURU</span>
                </h4>
                <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-4 px-10 py-5 bg-[#FF4D00] text-white font-black text-xs tracking-widest uppercase rounded-2xl hover:bg-white hover:text-black transition-all shadow-[0_10px_40px_rgba(255,77,0,0.3)]"
                  >
                    <Mail size={18} /> CV GÖNDER
                  </button>
                  <a 
                    href="https://www.kariyer.net/firma-profil/temren-makina-imalat-muhendislik-sanayi-ve-ticaret-416012-480318"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 px-10 py-5 bg-white/5 border border-white/10 text-white font-black text-xs tracking-widest uppercase rounded-2xl hover:bg-white/10 transition-all"
                  >
                    KARİYER.NET <ArrowRight size={18} />
                  </a>
                </div>
              </div>
              <div className="w-full lg:w-1/3">
                <div className="p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px]">
                  <h5 className="text-[#FF4D00] font-black text-xs uppercase tracking-[0.3em] mb-6 text-center">Neden Temren?</h5>
                  <ul className="space-y-4">
                    {["Modern Üretim Parkuru", "Uluslararası Projeler", "Profesyonel Gelişim", "Yenilikçi Kültür"].map((item, i) => (
                      <li key={i} className="flex items-center gap-4 text-slate-300 text-sm font-bold border-b border-white/5 pb-3 last:border-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FF4D00]" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* --- BAŞVURU FORMU MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-6 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden overflow-y-auto max-h-[90vh]"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 transition-colors z-10">
                <X size={24} />
              </button>

              <div className="p-8 md:p-16">
                {isSubmitted ? (
                  <div className="text-center py-12 space-y-6">
                    <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">BAŞVURUNUZ ALINDI</h3>
                    <p className="text-slate-500 font-medium">İnsan kaynakları ekibimiz başvurunuzu en kısa sürede değerlendirecektir.</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-10">
                      <span className="text-[#FF4D00] font-black text-[10px] tracking-[0.3em] uppercase mb-2 block text-center md:text-left">Kariyer Formu</span>
                      <h3 className="text-4xl font-black text-slate-900 uppercase tracking-tighter leading-none text-center md:text-left">İŞ BAŞVURUSU</h3>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 italic">Ad Soyad</label>
                          <input type="text" placeholder="Adınız Soyadınız" required className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:border-[#FF4D00] transition-colors" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 italic">E-Posta</label>
                          <input type="email" placeholder="E-posta Adresiniz" required className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:border-[#FF4D00] transition-colors" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 italic">Telefon</label>
                          <input type="tel" placeholder="05xx xxx xx xx" required className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:border-[#FF4D00] transition-colors" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 italic">Başvurulan Pozisyon</label>
                          <input type="text" placeholder="Örn: CNC Operatörü" required className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:border-[#FF4D00] transition-colors" />
                        </div>
                      </div>
                      
                      <div className="space-y-1.5 italic">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">CV Yükle (PDF, DOC, DOCX • maks. 10 MB)</label>
                        <div className="relative group">
                          <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                          <div className="w-full px-6 py-10 border-2 border-dashed border-slate-100 rounded-2xl flex flex-col items-center justify-center gap-3 group-hover:border-[#FF4D00]/30 transition-colors bg-slate-50/50">
                            <Upload size={24} className="text-slate-400 group-hover:text-[#FF4D00] transition-colors" />
                            <div className="text-center">
                              <span className="text-[11px] font-black text-slate-600 uppercase tracking-widest block">Dosyanızı sürükleyip bırakın veya göz atın.</span>
                              <span className="text-[10px] text-slate-400 font-medium mt-1">Seçilen dosya yok</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center ml-4 italic">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ek Mesaj</label>
                          <span className="text-[10px] text-slate-400 font-bold">({charCount}/500)</span>
                        </div>
                        <textarea 
                          maxLength={500}
                          onChange={(e) => setCharCount(e.target.value.length)}
                          placeholder="Eklemek istediğiniz notlar..." 
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:border-[#FF4D00] transition-colors h-28 resize-none"
                        />
                      </div>

                      <button type="submit" className="w-full py-6 bg-slate-950 text-white font-black text-xs tracking-[0.3em] uppercase rounded-2xl hover:bg-[#FF4D00] transition-all">
                        BAŞVURUYU TAMAMLA
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}