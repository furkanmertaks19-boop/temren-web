"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Instagram, 
  Linkedin, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUpRight,
  Globe
} from "lucide-react";

const footerLinks = {
  kurumsal: [
    { name: "Hakkımızda", href: "/kurumsal/hakkimizda" },
    { name: "Vizyon & Misyon", href: "/kurumsal/vizyon-misyon" },
    { name: "Kalite Politikamız", href: "/kurumsal/kalite" },
    { name: "Sertifikalar", href: "/kurumsal/sertifikalar" },
  ],
  urunler: [
    { name: "Palet Sistemleri", href: "/urunler/palet-sistemleri" },
    { name: "Tarım Araçları", href: "/urunler/tarim-araci" },
    { name: "Vakumlu Tablalar", href: "/urunler/uretim-ekipmanlari" },
    { name: "Savunma Çözümleri", href: "/urunler/savunma" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 pt-24 pb-12 overflow-hidden">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          
          {/* Logo ve Şirket Özeti */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-900 flex items-center justify-center">
                <span className="text-white font-black text-xl">T</span>
              </div>
              <span className="text-slate-900 font-black text-2xl tracking-tighter uppercase">
                Temren <span className="text-gray-400 font-light">Makina</span>
              </span>
            </div>
            
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
              Ankara merkezli mühendislik ve üretim gücümüzle, savunma, tarım ve endüstriyel 
              otomasyon alanlarında yüksek hassasiyetli çözümler geliştiriyoruz.
            </p>

            <div className="flex items-center gap-4">
              {[Instagram, Linkedin, Twitter].map((Icon, idx) => (
                <Link 
                  key={idx} 
                  href="#" 
                  className="w-10 h-10 border border-gray-100 flex items-center justify-center text-slate-400 hover:text-[#FF4D00] hover:border-[#FF4D00] transition-all duration-300 rounded-full"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Hızlı Linkler */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-slate-900 font-black text-[10px] tracking-[0.4em] uppercase">Kurumsal</h4>
            <ul className="space-y-4">
              {footerLinks.kurumsal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 text-xs font-bold hover:text-[#FF4D00] transition-colors uppercase tracking-wider">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-slate-900 font-black text-[10px] tracking-[0.4em] uppercase">Ürünler</h4>
            <ul className="space-y-4">
              {footerLinks.urunler.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 text-xs font-bold hover:text-[#FF4D00] transition-colors uppercase tracking-wider">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim Detayları */}
          <div className="lg:col-span-4 space-y-8">
            <h4 className="text-slate-900 font-black text-[10px] tracking-[0.4em] uppercase">Bize Ulaşın</h4>
            <div className="space-y-6">
              <div className="flex gap-4 group">
                <div className="w-10 h-10 border border-gray-100 flex items-center justify-center text-[#FF4D00] shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
  <div className="text-[10px] font-black text-gray-400 tracking-widest uppercase mb-1">
    Fabrika
  </div>
  <p className="text-xs text-slate-700 font-bold leading-relaxed uppercase tracking-tight">
    Saray Mah. 100.Yıl Blv. No: 75 <br />
    Kahramankazan / Ankara
  </p>
</div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 border border-gray-100 flex items-center justify-center text-[#FF4D00] shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-black text-gray-400 tracking-widest uppercase mb-1">Telefon</div>
                  <p className="text-xs text-slate-700 font-bold uppercase">+90 (312) 815 15 15</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 border border-gray-100 flex items-center justify-center text-[#FF4D00] shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-black text-gray-400 tracking-widest uppercase mb-1">E-Posta</div>
                  <p className="text-xs text-slate-700 font-bold uppercase">info@temrenmakina.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alt Kısım */}
        <div className="pt-12 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-400 text-[10px] font-bold tracking-[0.2em] uppercase">
            © {currentYear} TEMREN MAKİNA MÜHENDİSLİK. TÜM HAKLARI SAKLIDIR.
          </div>
          
          <div className="flex items-center gap-8">
            <Link href="/kvkk" className="text-gray-400 text-[9px] font-bold hover:text-slate-900 uppercase tracking-widest transition-colors">KVKK Aydınlatma Metni</Link>
            <Link href="/bilgi-toplumu" className="text-gray-400 text-[9px] font-bold hover:text-slate-900 uppercase tracking-widest transition-colors">Bilgi Toplumu Hizmetleri</Link>
            <div className="flex items-center gap-2 text-[#FF4D00] text-[10px] font-black tracking-widest cursor-pointer">
              <Globe size={14} /> TR / EN
            </div>
          </div>
        </div>
      </div>

      {/* TUSAŞ Stili Dekoratif Arka Plan Yazısı */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 select-none pointer-events-none opacity-[0.02]">
        <span className="text-[180px] font-black text-slate-900 whitespace-nowrap tracking-tighter uppercase">
          Precision Engineering
        </span>
      </div>
    </footer>
  );
}