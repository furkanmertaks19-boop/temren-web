'use client';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Instagram, Phone, Globe, MapPin, Linkedin, 
  Youtube, MessageCircle, Send, Music2, UserPlus, ArrowRight
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function TemrenDigitalCard() {
  const [isMounted, setIsMounted] = useState(false);

  // 3D Kart Efekti İçin Değerler
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  useEffect(() => {
    setIsMounted(true);
    // Mobilde parmak hareketine göre kartı oynatmak için
    const handleTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      const xPct = (touch.clientX / window.innerWidth) - 0.5;
      const yPct = (touch.clientY / window.innerHeight) - 0.5;
      x.set(xPct);
      y.set(yPct);
    };
    window.addEventListener('touchmove', handleTouch);
    return () => window.removeEventListener('touchmove', handleTouch);
  }, [x, y]);

  if (!isMounted) return null;

  const socials = [
    { icon: <Phone size={22} />, label: 'ARA', href: 'tel:+903128100230', bg: 'bg-[#10b981]' },
    { icon: <MessageCircle size={22} />, label: 'WHATSAPP', href: 'https://wa.me/903128100230', bg: 'bg-[#25D366]' },
    { icon: <Instagram size={22} />, label: 'INSTAGRAM', href: 'https://instagram.com/temrenmakina', bg: 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]' },
    { icon: <Linkedin size={22} />, label: 'LINKEDIN', href: 'https://linkedin.com/company/temrenmakina', bg: 'bg-[#0077b5]' },
    { icon: <Youtube size={22} />, label: 'YOUTUBE', href: 'https://youtube.com/@temrenmakina', bg: 'bg-[#ff0000]' },
    { icon: <Music2 size={22} />, label: 'TIKTOK', href: 'https://tiktok.com/@temrenmakina', bg: 'bg-black border border-white/20' },
  ];

  return (
    <div className="fixed inset-0 z-[10000] bg-[#050505] overflow-y-auto overflow-x-hidden selection:bg-orange-500/30">
      
      {/* Dinamik Arka Plan Işıkları */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative min-h-screen flex flex-col items-center px-6 py-10">
        
        {/* ANA 3D KART */}
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-full max-w-sm aspect-[1.6/1] mb-12 rounded-[2.5rem] bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] p-1 shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/10 group"
        >
          <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div style={{ transform: "translateZ(50px)" }} className="relative h-full w-full flex flex-col justify-between p-8">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h2 className="text-3xl font-black italic tracking-tighter text-white">
                  TEMREN<span className="text-orange-500">.</span>
                </h2>
                <p className="text-[10px] tracking-[0.4em] text-gray-500 uppercase font-bold">Industrial Solutions</p>
              </div>
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10">
                <Send size={20} className="text-orange-500" />
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-orange-500 font-black tracking-widest uppercase italic">Ankara / Türkiye</p>
              <h3 className="text-lg font-bold text-white tracking-tight leading-none">Temren Makina Sanayi</h3>
            </div>
          </div>
        </motion.div>

        {/* SOSYAL MEDYA GRID */}
        <div className="w-full max-w-md grid grid-cols-2 gap-3 mb-4">
          {socials.map((item, idx) => (
            <motion.a
              key={idx}
              href={item.href}
              target="_blank"
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.05 }}
              className={`${item.bg} flex items-center justify-between p-4 rounded-3xl shadow-xl transition-all group overflow-hidden relative`}
            >
               <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
               <span className="relative z-10 text-[11px] font-black tracking-wider text-white uppercase">{item.label}</span>
               <div className="relative z-10 text-white opacity-80 group-hover:scale-110 transition-transform">{item.icon}</div>
            </motion.a>
          ))}
        </div>

        {/* KONUM BUTONU (Modern Glassmorphism) */}
        <motion.a
          href="https://www.google.com/maps/dir//Saray,+100.+Y%C4%B1l+Blv.+No:75,+06980+Kahramankazan%2FAnkara"
          target="_blank"
          whileTap={{ scale: 0.98 }}
          className="w-full max-w-md p-5 bg-white/5 border border-white/10 rounded-[2rem] flex items-center gap-5 hover:bg-white/10 transition-all mb-4 relative overflow-hidden group"
        >
          <div className="p-4 bg-orange-500 text-black rounded-2xl shadow-[0_0_20px_rgba(249,115,22,0.4)] group-hover:rotate-12 transition-transform">
            <MapPin size={24} />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-1">Fabrika & Ofis</p>
            <p className="text-xs text-gray-300 font-medium leading-relaxed">
              Saray Mah. 100.Yıl Blv. No:75,<br /> Kahramankazan / Ankara
            </p>
          </div>
          <ArrowRight size={20} className="text-gray-600 group-hover:text-orange-500 transition-colors mr-2" />
        </motion.a>

        {/* REHBERE KAYDET (Floating Action) */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          className="w-full max-w-md py-5 bg-orange-500 rounded-[2rem] flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(249,115,22,0.3)] group mt-4"
        >
          <UserPlus size={24} className="text-black group-hover:rotate-12 transition-transform" />
          <span className="text-black font-[900] uppercase tracking-widest italic text-sm">Rehbere Kaydet</span>
        </motion.button>

        <footer className="mt-16 opacity-20 flex flex-col items-center gap-2">
           <div className="h-[1px] w-20 bg-white" />
           <p className="text-[10px] font-bold tracking-[0.5em] uppercase">Temren Makina 2026</p>
        </footer>

      </div>
    </div>
  );
}