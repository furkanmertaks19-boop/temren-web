"use client";
import React, { useState } from "react";
import PageHeader from "@/components/layout/PageHeader";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Lock, Zap, CheckCircle2 } from "lucide-react";
import Footer from "@/components/layout/Footer"; // Footer import edildi

const policies = [
  {
    id: "kalite",
    title: "Kalite Politikamız",
    icon: <ShieldCheck size={32} />,
    items: [
      "Yenilikçi bakış açısıyla kalite yönetim sistemini sürekli geliştirerek faaliyetlerimizi en üst seviyeye taşımak.",
      "Müşteri memnuniyetini artırmak amacıyla ürün ve hizmet kalitesini sürekli olarak iyileştirmek.",
      "Çalışanların kalite bilincini yükselterek katılım ve gelişimi desteklemek.",
      "Havacılık ve otomotiv sektörlerinde stratejik iş birliklerini güçlendirmek.",
      "Risk ve fırsatları analiz ederek etkin hizmet sunmak.",
      "Çevre, iş güvenliği ve yasal düzenlemelere uygunluğu esas almak.",
      "İhracat faaliyetleriyle ülke ekonomisine katkı sağlamak."
    ]
  },
  {
    id: "bilgi",
    title: "Bilgi Güvenliği Politikamız",
    icon: <Lock size={32} />,
    items: [
      "Bilgi varlıklarının gizliliğini, bütünlüğünü ve erişilebilirliğini korumak.",
      "Risk yönetimi süreçleriyle güvenlik tehditlerini minimuma indirmek.",
      "Yasal düzenlemelere, sözleşmelere ve uluslararası standartlara tam uyum sağlamak.",
      "Olası güvenlik ihlallerine karşı hızlı ve etkili müdahale etmek.",
      "Tedarikçilerin bilgi güvenliği politikalarıyla uyum içinde çalışmasını sağlamak.",
      "Çalışanlara periyodik bilgi güvenliği eğitimi vererek farkındalık oluşturmak.",
      "Bilgi güvenliği yönetim sistemini sürekli gözden geçirerek geliştirmek."
    ]
  },
  {
    id: "enerji",
    title: "Enerji Politikamız",
    icon: <Zap size={32} />,
    items: [
      "Enerji verimliliğini artırmak ve kaynakları etkin kullanmak için teknolojik çözümleri entegre etmek.",
      "Doğal kaynakların korunmasına yönelik sürdürülebilir enerji uygulamaları geliştirmek.",
      "İklim değişikliğinin etkilerini azaltacak önlemler almak ve uygulamak.",
      "Yürürlükteki enerji mevzuatlarına ve düzenlemelere eksiksiz uyum sağlamak.",
      "Çalışanların enerji verimliliği konusundaki farkındalığını artırmak.",
      "Enerji yönetim sistemini sürekli olarak izlemek, analiz etmek ve iyileştirmek."
    ]
  }
];

export default function Politikalarimiz() {
  const [activeTab, setActiveTab] = useState(policies[0]);

  return (
    <div className="bg-white min-h-screen">
      <PageHeader title="POLİTİKALARIMIZ" subtitle="KURUMSAL DEĞERLER" />

      {/* İçerik Bölümü */}
      <section className="py-24">
        <div className="container mx-auto px-8">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Sol - Sekme Menüsü */}
            <div className="lg:w-1/3 space-y-4">
              <div className="mb-10">
                <div className="w-12 h-1 bg-[#FF4D00] mb-4" />
                <h2 className="text-4xl font-black tracking-tighter uppercase text-slate-900 leading-none">
                  SÜRDÜRÜLEBİLİR <br /> <span className="text-[#FF4D00]">VİZYON</span>
                </h2>
              </div>
              
              {policies.map((policy) => (
                <button
                  key={policy.id}
                  onClick={() => setActiveTab(policy)}
                  className={`w-full flex items-center gap-6 p-8 rounded-[32px] transition-all duration-500 text-left border ${
                    activeTab.id === policy.id 
                    ? "bg-slate-950 border-slate-900 shadow-2xl scale-[1.02]" 
                    : "bg-slate-50 border-slate-100 hover:bg-slate-100"
                  }`}
                >
                  <div className={`shrink-0 ${activeTab.id === policy.id ? "text-[#FF4D00]" : "text-slate-400"}`}>
                    {policy.icon}
                  </div>
                  <div>
                    <h3 className={`font-black text-sm uppercase tracking-widest ${activeTab.id === policy.id ? "text-white" : "text-slate-500"}`}>
                      {policy.title}
                    </h3>
                  </div>
                </button>
              ))}
            </div>

            {/* Sağ - Detay Alanı */}
            <div className="lg:w-2/3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-slate-50 border border-slate-100 rounded-[48px] p-8 md:p-16 h-full relative overflow-hidden min-h-[550px]"
                >
                  <div className="absolute -right-10 -bottom-10 opacity-[0.03] text-slate-950 scale-[5] pointer-events-none">
                    {activeTab.icon}
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-10 flex items-center gap-4">
                      <span className="w-8 h-8 rounded-full bg-[#FF4D00] flex items-center justify-center text-white text-[10px] font-bold">
                        {activeTab.items.length}
                      </span>
                      {activeTab.title}
                    </h3>

                    <div className="grid grid-cols-1 gap-4">
                      {activeTab.items.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="group flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-100 hover:border-[#FF4D00]/30 transition-all shadow-sm"
                        >
                          <CheckCircle2 className="text-[#FF4D00] shrink-0 mt-1" size={18} />
                          <p className="text-slate-600 font-medium text-sm leading-relaxed">
                            {item}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Bilgi Banner'ı */}
      <section className="px-8 pb-24">
        <div className="container mx-auto bg-[#FF4D00] rounded-[40px] p-12 text-center relative overflow-hidden shadow-xl">
           <div className="relative z-10">
              <h4 className="text-white text-2xl font-black tracking-tighter uppercase mb-2">
                 ETİK VE ŞEFFAF YÖNETİM ANLAYIŞI
              </h4>
              <p className="text-white/80 text-sm font-medium">
                Tüm faaliyetlerimizde toplumsal değerlere ve yasal mevzuatlara saygıyı temel alıyoruz.
              </p>
           </div>
           <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
        </div>
      </section>

      {/* FOOTER BURAYA EKLENDİ */}
      <Footer />
    </div>
  );
}