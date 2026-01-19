"use client";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react"; // Detay ikonu eklendi
import Image from "next/image";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 }, // y değerini 50'den 30'a çektik, daha yumuşak gelir
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1] 
    } 
  },
};

const serviceSteps = [
  {
    title: "MÜHENDİSLİK & TASARIM",
    subtitle: "01 / İNOVASYON",
    desc: "En karmaşık sistemleri, ileri düzey CAD/CAM yazılımları ile hatasız bir şekilde dijital dünyada modelliyoruz.",
    image: "/design-process.png" 
  },
  {
    title: "HASSAS ÜRETİM BANDI",
    subtitle: "02 / TEKNOLOJİ",
    desc: "Savunma sanayi toleranslarında, 5 eksenli CNC teknolojisi ile yüksek mukavemetli malzemeleri işliyoruz.",
    image: "/production-process.png" 
  },
  {
    title: "KALİTE & TEST SİSTEMİ",
    subtitle: "03 / GÜVEN",
    desc: "Her bir parça, zorlu saha koşullarına dayanıklılığını kanıtlamak için akredite laboratuvarlarımızda test edilir.",
    image: "/quality-process.png" 
  }
];

export default function Features() {
  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden border-t border-gray-100">
      <div className="container mx-auto px-6">
        
        {/* Başlık Alanı */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8"
        >
          <div className="max-w-2xl">
            <h3 className="text-[#FF4D00] font-black text-xs tracking-[0.5em] mb-6 uppercase">
              NASIL ÜRETİYORUZ?
            </h3>
            <h2 className="text-slate-900 text-5xl md:text-7xl font-black tracking-tighter leading-none uppercase">
              HAYALDEN <br /> 
              <span className="text-gray-300">GERÇEĞE</span> <br />
              ENDÜSTRİYEL GÜÇ
            </h2>
          </div>
          <p className="text-gray-500 max-w-sm text-sm font-medium leading-relaxed border-l border-gray-200 pl-8 italic">
            "Temren Makina olarak, ham maddeden nihai ürüne kadar olan süreçte 
            uluslararası standartları uyguluyoruz."
          </p>
        </motion.div>

        {/* Kartlar */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }} // Sayfanın %10'u göründüğünde başlar
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-100 border border-gray-100"
        >
          {serviceSteps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative bg-white p-10 md:p-14 h-[480px] md:h-[550px] flex flex-col justify-between overflow-hidden"
            >
              {/* Hover PNG Katmanı */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 grayscale">
                <Image 
                  src={step.image} 
                  alt={step.title} 
                  fill 
                  className="object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" 
                />
              </div>

              <div className="relative z-10">
                <span className="text-[#FF4D00] font-black text-[11px] tracking-widest block mb-8 border-b border-gray-100 pb-3">
                  {step.subtitle}
                </span>
                <h4 className="text-2xl font-black text-slate-900 mb-6 uppercase leading-tight group-hover:text-[#FF4D00] transition-colors">
                  {step.title}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-600 transition-colors duration-500">
                  {step.desc}
                </p>
              </div>

              <div className="relative z-10 flex justify-between items-center">
                <span className="text-[10px] font-black tracking-widest text-slate-900 uppercase flex items-center gap-2 group-hover:text-[#FF4D00] transition-colors">
                  İncele <ArrowUpRight size={14} />
                </span>
                <span className="text-gray-100 font-black text-5xl group-hover:text-gray-200 transition-colors">0{index + 1}</span>
              </div>

              {/* Alt Detay Dekor */}
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gray-50 -rotate-45 translate-x-16 translate-y-16 group-hover:bg-[#FF4D00]/5 transition-all duration-700" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}