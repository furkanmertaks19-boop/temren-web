"use client";
import React, { useState, useEffect } from "react";
import PageHeader from "@/components/layout/PageHeader";
import Footer from "@/components/layout/Footer";
import { motion, Variants } from "framer-motion";
import { 
  ShieldCheck, 
  Construction, 
  Settings, 
  Paintbrush, 
  CheckCircle2, 
  ArrowRight,
  Zap,
  HardHat,
  Factory
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// ✅ Animasyon Varyantları (TypeScript Tipi Güvenli)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

// ✅ Uzmanlık Alanları Veri Seti
const expertiseFields = [
  {
    title: "Beton Santrali İmalatları",
    icon: <Factory size={32} />,
    items: [
      "Yüksek mukavemetli çelik konstrüksiyon kaynaklı imalat",
      "Ağır şartlara dayanıklı, uzun ömürlü endüstriyel boya",
      "Sızdırmazlık ve mukavemet odaklı bunker kapakları"
    ]
  },
  {
    title: "Savunma & Havacılık",
    icon: <ShieldCheck size={32} />,
    items: [
      "AS9100 standartlarına uygun kaynaklı imalat",
      "Kritik parçalarda hassas üretim & yüzey koruma",
      "Uluslararası kalite beklentilerine uygun kaplama"
    ]
  },
  {
    title: "Palet Sistemleri",
    icon: <Settings size={32} />,
    items: [
      "4x4 ve iş makineleri için gelişmiş palet sistemleri",
      "Zorlu araziye uygun dayanıklı kaynaklı yapılar",
      "Korozyona & aşınmaya karşı boya koruması"
    ]
  },
  {
    title: "İş Makineleri ve Ekipmanlar",
    icon: <Construction size={32} />,
    items: [
      "Ağır hizmet ekipmanları (tarım, maden, inşaat)",
      "Hidrolik bağlantılar & ataşman kaynaklı imalat",
      "Darbe & çizilmeye dayanıklı boya çözümleri"
    ]
  },
  {
    title: "Endüstriyel Boya & Yüzey İşlemleri",
    icon: <Paintbrush size={32} />,
    items: [
      "Elektrostatik toz boya uygulamaları",
      "Yüksek korumalı endüstriyel kaplamalar",
      "Estetik ve uzun ömürlü yüzey çözümleri"
    ]
  }
];

export default function YapiInsaat() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);

  if (!isMounted) return null;

  return (
    <div className="bg-white min-h-screen">
      <PageHeader title="YAPI & İNŞAAT" subtitle="MÜHENDİSLİK VE DAYANIKLILIK" />

      <main className="py-24">
        <div className="container mx-auto px-8">
          
          {/* Giriş Bölümü: AS9100 Vurgusu ve Logo */}
          <section className="mb-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-[2px] bg-[#FF4D00]" />
                  <span className="text-[#FF4D00] font-black text-xs tracking-widest uppercase italic">AS9100 Sertifikalı Güven</span>
                </div>
                <h2 className="text-slate-900 text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.85] mb-10">
                  TEMREN MAKİNA <br /> <span className="text-slate-300">KALİTESİ.</span>
                </h2>
                <p className="text-slate-500 text-lg font-medium leading-relaxed mb-12 italic">
                  2017 yılında Ankara’da kurulmuş olup, AS9100 ve ISO 9001 kalite yönetim sistemleri ile uluslararası standartlarda üretim yapmaktayız.
                </p>
                <div className="grid grid-cols-3 gap-8">
                  <div><h3 className="text-4xl font-black text-slate-900 mb-2">2017</h3><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kuruluş</p></div>
                  <div><h3 className="text-4xl font-black text-[#FF4D00] mb-2">250+</h3><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Proje</p></div>
                  <div><h3 className="text-4xl font-black text-slate-900 mb-2">5</h3><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sektör</p></div>
                </div>
              </motion.div>

              {/* Sağ Taraf: Resim yerine Kurumsal Logo Alanı */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: true }}
                className="relative h-[500px] flex items-center justify-center bg-slate-50 rounded-[60px] border border-slate-100 shadow-inner overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF4D00]/5 to-transparent transition-opacity group-hover:opacity-100" />
                <div className="relative w-64 h-64 opacity-20 group-hover:opacity-40 transition-all duration-700">
                  <Image src="/logo.png" alt="Temren Makina Logo" fill className="object-contain" />
                </div>
                <div className="absolute bottom-10 left-10 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-md">
                    <ShieldCheck className="text-[#FF4D00]" />
                  </div>
                  <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">AS9100 & ISO 9001 Kalite</span>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Uzmanlık Alanları: Belirlenen 5 Başlık */}
          <section className="mb-40">
            <div className="flex items-center gap-4 mb-16">
              <div className="w-16 h-[2px] bg-[#FF4D00]" />
              <h2 className="text-slate-900 text-4xl font-black tracking-tighter uppercase italic">UZMANLIK <span className="text-slate-300">ALANLARIMIZ.</span></h2>
            </div>
            <motion.div 
              variants={containerVariants} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }} 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {expertiseFields.map((field, idx) => (
                <motion.div key={idx} variants={cardVariants} className="bg-slate-50 p-10 rounded-[48px] border border-slate-100 transition-all hover:bg-white hover:shadow-2xl group">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#FF4D00] mb-8 shadow-sm group-hover:bg-[#FF4D00] group-hover:text-white transition-colors">{field.icon}</div>
                  <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-6">{field.title}</h4>
                  <ul className="space-y-4">
                    {field.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-500 text-sm font-medium italic leading-tight">
                        <CheckCircle2 size={16} className="text-[#FF4D00] shrink-0 mt-0.5" /> {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* CTA Alanı: İletişim Butonu Yönlendirmesi */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-slate-900 text-5xl font-black tracking-tighter uppercase leading-tight italic">NEDEN <br /> <span className="text-[#FF4D00]">TEMREN MAKİNA?</span></h2>
              <div className="space-y-4">
                {[
                  "AS9100 & ISO 9001 belgeli kalite güvencesi",
                  "Savunma & havacılıkta onaylı tedarikçi deneyimi",
                  "Ağır sanayi, otomotiv, enerji alanlarında iş birlikleri",
                  "Proje bazlı mühendislik, tasarım ve üretim desteği"
                ].map((text, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:bg-[#FF4D00] group transition-all duration-300 shadow-sm"
                  >
                    <Zap size={20} className="text-[#FF4D00] group-hover:text-white" />
                    <span className="text-slate-700 font-bold uppercase tracking-tighter group-hover:text-white">{text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-[#FF4D00] p-16 rounded-[60px] text-white flex flex-col items-center text-center shadow-2xl shadow-orange-500/20"
            >
              <HardHat size={64} className="mb-8" />
              <h3 className="text-4xl font-black uppercase mb-6 leading-tight">PROJENİZİ BİRLİKTE GÜÇLENDİRELİM</h3>
              <p className="text-white/80 font-medium italic mb-10 max-w-sm">
                Şantiye koşullarına uygun, modüler ve dayanıklı çözümleri birlikte tasarlayalım.
              </p>
              
              <Link href="/iletisim">
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-[#FF4D00] px-12 py-5 rounded-full font-black tracking-widest uppercase flex items-center gap-4 hover:bg-slate-900 hover:text-white transition-all shadow-xl"
                >
                  İLETİŞİME GEÇ <ArrowRight size={20} />
                </motion.button>
              </Link>
            </motion.div>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
}