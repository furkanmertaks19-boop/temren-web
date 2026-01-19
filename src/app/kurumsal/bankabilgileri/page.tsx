"use client";
import React, { useState } from "react";
import PageHeader from "@/components/layout/PageHeader";
import Footer from "@/components/layout/Footer";
import { motion, AnimatePresence, Variants } from "framer-motion"; // ✅ Variants import edildi
import { Copy, Check, Landmark } from "lucide-react";
import Image from "next/image";

const bankAccounts = [
  {
    id: 1,
    bankName: "AKBANK",
    currency: "TL",
    iban: "TR94 0004 6001 3988 8000 2443 77",
    branch: "Sincan Şubesi",
    accountNo: "0244377",
    logo: "/banka/akbank.png"
  },
  {
    id: 2,
    bankName: "HALKBANK",
    currency: "USD",
    iban: "TR24 0001 2009 4200 0053 0002 18",
    branch: "Kahramankazan Şubesi",
    accountNo: "53000218",
    logo: "/banka/halkbank.jpg"
  },
  {
    id: 3,
    bankName: "HALKBANK",
    currency: "EUR",
    iban: "TR72 0001 2009 4200 0058 0001 89",
    branch: "Kahramankazan Şubesi",
    accountNo: "58000189",
    logo: "/banka/halkbank.jpg"
  }
];

// ✅ TypeScript Hatası Çözümü: Varyantlar açıkça tiplendirildi
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function BankaHesaplari() {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = (iban: string, id: number) => {
    navigator.clipboard.writeText(iban);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <PageHeader title="BANKA BİLGİLERİ" subtitle="HESAP NUMARALARIMIZ" />

      <main className="flex-grow py-24">
        <div className="container mx-auto px-8">
          
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            viewport={{ once: true }}
            className="max-w-4xl mb-20"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[2px] bg-[#FF4D00]" />
              <span className="text-[#FF4D00] font-black text-xs tracking-[0.4em] uppercase">Ödeme Kanalları</span>
            </div>
            <h2 className="text-slate-900 text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
              BANKA <br /> <span className="text-slate-300">HESAPLARIMIZ.</span>
            </h2>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {bankAccounts.map((account) => (
              <motion.div
                key={account.id}
                variants={cardVariants} // ✅ Artık hata vermeyecektir
                className="group relative bg-slate-50 border border-slate-100 rounded-[40px] p-10 hover:shadow-2xl hover:border-[#FF4D00]/20 transition-all duration-500"
              >
                <div className="flex items-center justify-between mb-10">
                  <motion.div 
                    whileHover={{ rotate: -5, scale: 1.05 }}
                    className="relative w-16 h-16 bg-white rounded-2xl overflow-hidden border border-slate-100 p-2 shadow-sm"
                  >
                    <Image 
                      src={account.logo} 
                      alt={account.bankName} 
                      fill 
                      className="object-contain"
                    />
                  </motion.div>
                  <div className="text-right">
                    <h3 className="text-2xl font-black text-slate-900 leading-none">{account.bankName}</h3>
                    <span className="text-[#FF4D00] font-bold text-[10px] tracking-widest uppercase mt-1 block">{account.currency} HESABI</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Şube Bilgisi</label>
                    <p className="text-slate-900 font-bold">{account.branch}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Hesap Numarası</label>
                    <p className="text-slate-900 font-bold">{account.accountNo}</p>
                  </div>
                  
                  <div className="mt-8 pt-8 border-t border-slate-200/60">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 block">IBAN Numarası</label>
                    <div className="relative flex items-center justify-between bg-white border border-slate-200 rounded-2xl p-4 transition-all hover:border-[#FF4D00] group/iban">
                      <code className="text-[13px] font-bold text-slate-700 tracking-tighter truncate pr-2">
                        {account.iban}
                      </code>
                      <motion.button 
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleCopy(account.iban, account.id)}
                        className="flex-shrink-0 w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:bg-[#FF4D00] hover:text-white transition-all"
                      >
                        {copiedId === account.id ? <Check size={18} /> : <Copy size={18} />}
                      </motion.button>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {copiedId === account.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-2 rounded-full text-[10px] font-black tracking-widest uppercase flex items-center gap-2 shadow-xl z-10 border border-[#FF4D00]/30"
                    >
                      <Check size={12} className="text-[#FF4D00]" /> Kopyalandı ✔
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-20 p-8 bg-slate-900 rounded-[32px] flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="flex items-center gap-6">
              <motion.div 
                animate={{ rotate: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="w-14 h-14 bg-[#FF4D00] rounded-2xl flex items-center justify-center text-white"
              >
                <Landmark size={28} />
              </motion.div>
              <p className="text-white font-medium max-w-md italic">
                Ödemelerinizi yaparken lütfen açıklama kısmına sipariş numaranızı veya fatura bilgilerinizi eklemeyi unutmayınız.
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}