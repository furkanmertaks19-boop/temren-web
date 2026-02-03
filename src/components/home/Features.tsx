"use client";
import { motion, Variants } from "framer-motion";
import { Sparkles } from "lucide-react";
import Image from "next/image";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.16, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};

const serviceSteps = [
  {
    title: "MÜHENDİSLİK & TASARIM",
    subtitle: "01 / İNOVASYON",
    desc: "En karmaşık sistemleri, ileri düzey CAD/CAM yazılımları ile hatasız bir şekilde dijital dünyada modelliyoruz.",
    image: "/design-process.png",
  },
  {
    title: "HASSAS ÜRETİM BANDI",
    subtitle: "02 / TEKNOLOJİ",
    desc: "Savunma sanayi toleranslarında, 5 eksenli CNC teknolojisi ile yüksek mukavemetli malzemeleri işliyoruz.",
    image: "/production-process.png",
  },
  {
    title: "KALİTE & TEST SİSTEMİ",
    subtitle: "03 / GÜVEN",
    desc: "Her bir parça, zorlu saha koşullarına dayanıklılığını kanıtlamak için akredite laboratuvarlarımızda test edilir.",
    image: "/quality-process.png",
  },
];

export default function Features() {
  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden border-t border-gray-100">
      {/* Soft background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-[#FF4D00]/10 blur-3xl" />
        <div className="absolute -bottom-56 -left-44 h-[620px] w-[620px] rounded-full bg-slate-900/5 blur-3xl" />
      </div>

      <div className="relative container mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-10"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF4D00]" />
              <h3 className="text-[#FF4D00] font-black text-[11px] tracking-[0.45em] uppercase">
                NASIL ÜRETİYORUZ?
              </h3>
            </div>

            <h2 className="text-slate-900 text-5xl md:text-7xl font-black tracking-tighter leading-[0.95] uppercase">
              HAYALDEN <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-300">
                GERÇEĞE
              </span>{" "}
              <br />
              ENDÜSTRİYEL GÜÇ
            </h2>
          </div>

          <div className="max-w-md">
            <div className="rounded-2xl border border-gray-200/70 bg-white/70 backdrop-blur-md p-6">
              <p className="text-gray-600 text-sm font-medium leading-relaxed">
                “Temren Makina olarak, ham maddeden nihai ürüne kadar olan süreçte
                uluslararası standartları uyguluyoruz.”
              </p>
              <div className="mt-4 flex items-center gap-2 text-[11px] font-black tracking-widest text-slate-900/70 uppercase">
                <Sparkles size={14} className="text-[#FF4D00]" />
                Süreç disiplin. kalite. güven.
              </div>
            </div>
          </div>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {serviceSteps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              className="group relative rounded-3xl border border-gray-200/70 bg-white/70 backdrop-blur-md overflow-hidden shadow-[0_12px_40px_-28px_rgba(15,23,42,0.35)]"
            >
              {/* Image layer */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover scale-[1.08] group-hover:scale-[1.02] transition-transform duration-1000 grayscale"
                />
                {/* overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/65 to-white/90" />
                <div className="absolute inset-0 opacity-[0.35] bg-[radial-gradient(circle_at_20%_20%,rgba(255,77,0,0.35),transparent_55%)]" />
              </div>

              {/* subtle grain */}
              <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-multiply [background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22120%22 height=%22120%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />

              {/* glow border */}
              <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-[#FF4D00]/25 via-transparent to-slate-900/10" />

              <div className="relative p-10 md:p-12 min-h-[460px] md:min-h-[520px] flex flex-col">
                {/* Top meta */}
                <div className="flex items-start justify-between gap-6">
                  <span className="inline-flex items-center rounded-full border border-gray-200 bg-white/70 px-3 py-1 text-[11px] font-black tracking-widest text-[#FF4D00]">
                    {step.subtitle}
                  </span>

                  {/* Big index */}
                  <span className="select-none text-[56px] md:text-[64px] leading-none font-black text-slate-900/8 group-hover:text-slate-900/12 transition-colors">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Content */}
                <div className="mt-10">
                  <h4 className="text-2xl md:text-[28px] font-black text-slate-900 uppercase leading-tight">
                    <span className="bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent group-hover:from-slate-900 group-hover:to-[#FF4D00] transition-all duration-700">
                      {step.title}
                    </span>
                  </h4>

                  <p className="mt-6 text-[13.5px] leading-relaxed text-gray-600">
                    {step.desc}
                  </p>
                </div>

                {/* Bottom accent (no link) */}
                <div className="mt-auto pt-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[11px] font-black tracking-widest uppercase text-slate-900/70">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#FF4D00]" />
                      Süreç adımı
                    </div>

                    <div className="h-[1px] flex-1 mx-4 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

                    <div className="text-[11px] font-black tracking-widest uppercase text-slate-900">
                      TEMREN
                      <span className="text-[#FF4D00]">.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* corner decor */}
              <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-[#FF4D00]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
