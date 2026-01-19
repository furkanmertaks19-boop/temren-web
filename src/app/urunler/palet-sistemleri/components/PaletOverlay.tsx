"use client";
import { motion } from 'framer-motion';
import { ChevronDown, ShieldCheck, Zap, Settings } from 'lucide-react';

export default function PaletOverlay({ title, category, desc, specs }: any) {
    return (
        <div className="relative z-10 w-full">
            {/* GİRİŞ EKRANI */}
            <section className="h-screen flex flex-col items-center justify-center text-center px-6">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <span className="text-amber-500 font-bold tracking-[0.4em] uppercase text-xs mb-4 block">{category}</span>
                    <h1 className="text-7xl md:text-9xl font-black text-white mb-6 uppercase tracking-tighter">{title}</h1>
                    <p className="text-white/60 text-lg md:text-2xl max-w-3xl mx-auto font-light leading-relaxed">{desc}</p>
                </motion.div>
                <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-12">
                    <ChevronDown className="text-white/20" size={40} />
                </motion.div>
            </section>

            {/* ÖZELLİKLER EKRANI */}
            <section className="h-screen flex items-center justify-center px-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl">
                    <FeatureCard icon={<ShieldCheck className="text-amber-500" />} title="Dayanıklılık" text="Ağır hizmet tipi gövde yapısı ile en zorlu arazi şartlarında maksimum direnç." />
                    <FeatureCard icon={<Zap className="text-amber-500" />} title="Yüksek Çekiş" text="Özel palet deseni sayesinde minimum patinaj ve maksimum güç aktarımı." />
                    <FeatureCard icon={<Settings className="text-amber-500" />} title="Teknik Veriler" text={specs} />
                </div>
            </section>

            {/* TEKLİF EKRANI */}
            <section className="h-screen flex items-center justify-center">
                <div className="text-center bg-black/40 backdrop-blur-2xl p-16 rounded-[60px] border border-white/10 mx-6 max-w-4xl shadow-2xl">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-8 italic uppercase leading-none">
                        GÜCÜ <span className="text-amber-500 font-normal">YERE AKTARIN.</span>
                    </h2>
                    <button className="bg-amber-500 hover:bg-amber-400 text-black px-16 py-6 rounded-full font-black text-xl transition-all hover:scale-105 active:scale-95">
                        TEKLİF ALIN
                    </button>
                </div>
            </section>
        </div>
    );
}

function FeatureCard({ icon, title, text }: any) {
    return (
        <motion.div whileHover={{ y: -15 }} className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-[50px] flex flex-col items-center text-center">
            <div className="mb-6 p-4 bg-white/5 rounded-3xl">{icon}</div>
            <h3 className="text-white text-2xl font-bold mb-4">{title}</h3>
            <p className="text-white/40 leading-relaxed whitespace-pre-line">{text}</p>
        </motion.div>
    );
}