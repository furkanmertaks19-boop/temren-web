"use client";
import React, { useState, useEffect } from "react";
import PageHeader from "@/components/layout/PageHeader";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle, MessageCircle } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "Ürün kurulumu için destek sağlıyor musunuz?",
    answer: "Evet, teknik ekibimiz yerinde kurulum ve devreye alma desteği sunar. İhtiyaç halinde ekip eğitimleri de veriyoruz."
  },
  {
    id: 2,
    question: "Garanti kapsamında hangi sorunlar yer alıyor?",
    answer: "Garanti; üretim ve malzeme hatalarını kapsar. Yanlış kullanım, darbe, yetkisiz müdahale gibi durumlar kapsam dışıdır."
  },
  {
    id: 3,
    question: "Ürün iadesi mümkün mü?",
    answer: "Ürünler müşteri taleplerine göre özel üretildiğinden iade bulunmamaktadır. Ancak performans ve uygunluk için deneme ve test süreçleri sunuyoruz."
  },
  {
    id: 4,
    question: "Yedek parça ve servis sağlıyor musunuz?",
    answer: "Evet, tüm ürünlerimiz için orijinal yedek parça temini, yerinde servis ve uzaktan teknik destek hizmetleri sunulmaktadır."
  },
  {
    id: 5,
    question: "Ürünleriniz için bakım hizmeti alabilir miyiz?",
    answer: "Evet, ürünlerimiz için periyodik bakım ve kontrol paketlerimiz bulunmaktadır. Bu hizmetler sayesinde performans ve kullanım ömrü maksimum seviyeye çıkarılır."
  }
];

export default function SSS() {
  const [activeId, setActiveId] = useState<number | null>(1);
  const [isMounted, setIsMounted] = useState(false);

  // Hydration hatasını önlemek için mount kontrolü
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <PageHeader title="S.S.S." subtitle="SIKÇA SORULAN SORULAR" />

      <main className="flex-grow py-24">
        <div className="container mx-auto px-8">
          <div className="flex flex-col lg:flex-row gap-20">
            
            {/* Sol: Başlık ve İletişim Yönlendirme */}
            <div className="lg:w-1/3">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 mb-6"
              >
                <div className="w-12 h-[2px] bg-[#FF4D00]" />
                <span className="text-[#FF4D00] font-black text-xs tracking-[0.4em] uppercase">Destek Merkezi</span>
              </motion.div>
              
              <h2 className="text-slate-900 text-6xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
                AKLINIZA <br /> <span className="text-slate-300">TAKILANLAR.</span>
              </h2>
              
              <p className="text-slate-500 font-medium mb-12 leading-relaxed">
                Ürünlerimiz, servis süreçlerimiz ve teknik desteğimiz hakkında merak ettiğiniz temel soruların yanıtlarını burada bulabilirsiniz.
              </p>
              
              {/* İletişim Sayfasına Yönlendiren Kart */}
              <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 italic">
                <HelpCircle className="text-[#FF4D00] mb-4" size={32} />
                <p className="text-slate-600 font-bold mb-4">Başka bir sorunuz mu var?</p>
                <Link 
                  href="/iletisim" 
                  className="flex items-center gap-3 text-slate-900 font-black text-xs tracking-widest uppercase hover:text-[#FF4D00] transition-all group"
                >
                  İletişime Geçin 
                  <MessageCircle size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Sağ: Soru Listesi (Akordiyon) */}
            <div className="lg:w-2/3 space-y-4">
              {faqs.map((faq) => (
                <div 
                  key={faq.id} 
                  className={`border-b border-slate-100 transition-all duration-500 ${
                    activeId === faq.id ? 'bg-slate-50/80 rounded-[32px] p-4 px-8 border-transparent shadow-sm' : 'p-4 px-8'
                  }`}
                >
                  <button 
                    onClick={() => setActiveId(activeId === faq.id ? null : faq.id)}
                    className="w-full flex items-center justify-between py-6 text-left group"
                  >
                    <span className={`text-xl font-black uppercase tracking-tighter transition-all duration-300 ${
                      activeId === faq.id ? 'text-[#FF4D00]' : 'text-slate-900 group-hover:text-[#FF4D00]'
                    }`}>
                      {faq.question}
                    </span>
                    <div className={`flex-shrink-0 ml-4 transition-transform duration-500 ${
                      activeId === faq.id ? 'rotate-180 text-[#FF4D00]' : 'text-slate-300'
                    }`}>
                      {activeId === faq.id ? <Minus size={24} /> : <Plus size={24} />}
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {activeId === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="pb-8 text-slate-500 font-medium leading-relaxed max-w-2xl border-l-2 border-[#FF4D00]/20 pl-6 italic">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}