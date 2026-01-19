"use client";
import React from "react";
import PageHeader from "@/components/layout/PageHeader";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import { ExternalLink, Handshake } from "lucide-react";

const references = [
  { name: "ADM", logo: "adm.webp", url: "https://www.adm.com.tr/", tags: "enerji" },
  { name: "Bozankaya", logo: "bozankaya.webp", url: "https://www.bozankaya.com/", tags: "rayli otomotiv" },
  { name: "Enerjisa", logo: "enerjisa.webp", url: "https://www.enerjisa.com.tr/", tags: "enerji" },
  { name: "Hidromek", logo: "hidromek.webp", url: "https://www.hidromek.com.tr/", tags: "otomotiv" },
  { name: "İGA Havalimanı", logo: "iga.webp", url: "https://www.istairport.com/", tags: "havacilik altyapi" },
  { name: "TCDD", logo: "tcdd.webp", url: "https://www.tcdd.gov.tr/", tags: "rayli altyapi" },
  { name: "Yapıray", logo: "yapiray.webp", url: "https://www.yapiray.com.tr/", tags: "rayli altyapi" },
  { name: "Mutlular Grup", logo: "mutlular.png", url: "https://www.mutlulargrup.com.tr/", tags: "insaat" },
  { name: "MEKA", logo: "meka.png", url: "https://www.mekaglobal.com/", tags: "insaat" },
  { name: "Erkunt Traktör", logo: "erkunt.png", url: "https://www.erkunttraktor.com.tr/", tags: "otomotiv" },
  { name: "Kazakistan Almatı Havalimanı", logo: "havalimani.png", url: "https://alaport.com/en-EN/", tags: "otomotiv" },
];

export default function Referanslarimiz() {
  return (
    <div className="bg-white min-h-screen">
      <PageHeader title="REFERANSLARIMIZ" subtitle="STRATEJİK İŞ BİRLİKLERİ" />

      <section className="py-24">
        <div className="container mx-auto px-8">
          
          <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 mb-4"
              >
                <div className="w-12 h-[2px] bg-[#FF4D00]" />
                <span className="text-[#FF4D00] font-black text-xs tracking-[0.4em] uppercase">Partnerlik</span>
              </motion.div>
              <h2 className="text-slate-900 text-5xl font-black tracking-tighter uppercase leading-[0.9]">
                GÜÇLÜ <span className="text-[#FF4D00]">REFERANSLAR</span>, <br /> KESİNTİSİZ GÜVEN.
              </h2>
            </div>
          </div>

          {/* Logo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
            {references.map((ref, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link 
                  href={ref.url} 
                  target="_blank" 
                  className="group relative flex flex-col items-center justify-center p-8 bg-slate-50 border border-slate-100 rounded-[32px] aspect-square transition-all duration-500 hover:bg-white hover:shadow-2xl hover:border-[#FF4D00]/20 overflow-hidden"
                >
                  {/* Logo Resim Alanı - public/referanslar/ klasörüne bakar */}
                  <div className="relative w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110">
                    <Image
                      src={`/referanslar/${ref.logo}`}
                      alt={ref.name}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Hover Detay Yazısı */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center gap-2 whitespace-nowrap">
                    <span className="text-[10px] font-black text-[#FF4D00] tracking-widest uppercase">{ref.name}</span>
                    <ExternalLink size={10} className="text-[#FF4D00]" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* İş Birliği Daveti Banner */}
      <section className="px-8 pb-24">
        <div className="container mx-auto bg-slate-950 rounded-[40px] p-12 md:p-20 relative overflow-hidden text-center md:text-left">
           <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
              <div className="max-w-2xl">
                 <Handshake className="text-[#FF4D00] mb-6 mx-auto md:mx-0" size={48} />
                 <h4 className="text-white text-3xl font-black tracking-tighter uppercase mb-4 leading-tight">
                    Sektörünüzde <span className="text-[#FF4D00]">değer katan</span> çözüm ortağınız olalım.
                 </h4>
                 <p className="text-slate-400 font-medium">
                    Savunmadan otomotive kadar geniş bir yelpazede stratejik ortaklıklar kurarak geleceği birlikte inşa ediyoruz.
                 </p>
              </div>
              <Link href="/iletisim" className="px-10 py-5 bg-[#FF4D00] text-white font-black text-xs tracking-[0.3em] uppercase rounded-full hover:bg-white hover:text-black transition-all duration-500 shadow-[0_10px_40px_rgba(255,77,0,0.3)]">
                BİZE ULAŞIN
              </Link>
           </div>
           {/* Arka Plan Dekoratif Yazı */}
           <div className="absolute top-0 right-0 opacity-[0.03] text-white text-[150px] font-black pointer-events-none select-none -translate-y-1/2">
             TRUST
           </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}