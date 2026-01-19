"use client";
import React from "react";
import PageHeader from "@/components/layout/PageHeader";
import { motion } from "framer-motion";
import Image from "next/image";
import { ShieldCheck, Eye } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/layout/Footer"; // Footer import edildi

const documents = [
  { id: 1, title: "TOBB ÖDÜLÜ", file: "en-hizli-buyuyen.jpg", cat: "TESCİL" },
  { id: 2, title: "ISO EN 9100 :2018", file: "kalite.png", cat: "KALİTE" },
  { id: 3, title: "ISO EN 9100 :2015", file: "kalite_2.png", cat: "KALİTE" },
  { id: 4, title: "Faydalı Model Belgesi", file: "faydalimodel.png", cat: "PALET" },
  { id: 5, title: "Faydalı Model Belgesi", file: "faydalimodel2.png", cat: "PALET" },
  { id: 6, title: "Roketsan İş Ortaklığı", file: "roketsan.jpeg", cat: "RESMİ" },
  { id: 7, title: "Tasarım Tescil", file: "tasarim_tescil.png", cat: "MARKA" },
  { id: 8, title: "Kar Püskürtme Makinası", file: "uygunluk_sertifika.png", cat: "CE BELGE" },
  { id: 9, title: "Temren Konik Temizleme Makinası", file: "uygunluk_sertifika2.png", cat: "CE BELGE" },
  { id: 10, title: "MSB Onaylı Tedarikçi", file: "uygunluk_sertifika3.png", cat: "RESMİ" },
  { id: 11, title: "Araç Palet CE Belgesi", file: "msbonayli.jpg", cat: "RESMİ" },
  { id: 12, title: "Yerli Malı Belgesi", file: "yerli_mali.jpg", cat: "RESMİ" },
];

export default function Belgelerimiz() {
  return (
    <div className="bg-white min-h-screen">
      <PageHeader title="BELGELERİMİZ" subtitle="KALİTE VE STANDARTLAR" />

      <section className="py-24">
        <div className="container mx-auto px-8">
          
          {/* Başlık Alanı */}
          <div className="max-w-3xl mb-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 mb-4"
            >
              <div className="w-12 h-[2px] bg-[#FF4D00]" />
              <span className="text-[#FF4D00] font-black text-xs tracking-[0.4em] uppercase">Sertifikasyon</span>
            </motion.div>
            <h2 className="text-slate-900 text-5xl font-black tracking-tighter uppercase leading-[0.9]">
              GÜVENİN <span className="text-[#FF4D00]">BELGELENMİŞ</span> <br /> HALİ.
            </h2>
          </div>

          {/* Belge Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {documents.map((doc, index) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                {/* Tıklanabilir Kart */}
                <Link 
                  href={`/belge/${doc.file}`} 
                  target="_blank" 
                  className="relative block aspect-[3/4] bg-slate-50 rounded-[32px] overflow-hidden border border-slate-100 transition-all duration-500 hover:shadow-2xl hover:border-[#FF4D00]/20"
                >
                  <div className="absolute inset-4 bg-white rounded-[24px] overflow-hidden shadow-inner flex items-center justify-center">
                    <Image
                      src={`/belge/${doc.file}`}
                      alt={doc.title}
                      fill
                      className="object-contain p-6 transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  <div className="absolute inset-0 bg-slate-950/90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-14 h-14 bg-[#FF4D00] rounded-full flex items-center justify-center mb-6 -translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <Eye className="text-white" size={24} />
                    </div>
                    <h4 className="text-white font-black text-lg uppercase tracking-tighter mb-2">{doc.title}</h4>
                    <span className="px-6 py-2 border border-[#FF4D00] text-[#FF4D00] text-[10px] font-black tracking-widest uppercase rounded-full group-hover:bg-[#FF4D00] group-hover:text-white transition-colors">
                      BELGEYİ GÖRÜNTÜLE
                    </span>
                  </div>
                </Link>

                <div className="mt-6 px-2">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-[#FF4D00]" />
                    <span className="text-[#FF4D00] font-black text-[9px] tracking-widest uppercase">{doc.cat}</span>
                  </div>
                  <h3 className="text-slate-900 font-black text-sm uppercase tracking-tight group-hover:text-[#FF4D00] transition-colors">
                    {doc.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Alt Banner */}
      <section className="pb-24 px-8">
        <div className="container mx-auto bg-slate-950 rounded-[40px] p-12 md:p-16 relative overflow-hidden shadow-2xl">
           <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
              <div className="max-w-2xl">
                 <ShieldCheck className="text-[#FF4D00] mb-6 mx-auto md:mx-0" size={48} />
                 <h4 className="text-white text-3xl font-black tracking-tighter uppercase mb-4 leading-tight">
                    KALİTE STANDARTLARIMIZ <br /> <span className="text-[#FF4D00]">SÜREKLİ DENETLENMEKTEDİR.</span>
                 </h4>
              </div>
              <button className="px-10 py-5 bg-[#FF4D00] text-white font-black text-xs tracking-[0.3em] uppercase rounded-full hover:bg-white hover:text-black transition-all duration-500">
                BELGE TALEBİ
              </button>
           </div>
        </div>
      </section>

      {/* FOOTER BÖLÜMÜ */}
      <Footer />
    </div>
  );
}