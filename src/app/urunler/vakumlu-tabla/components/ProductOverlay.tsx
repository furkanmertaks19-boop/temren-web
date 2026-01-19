"use client";
import { motion } from 'framer-motion';
import { CheckCircle2, Ruler, Box, Settings2, Zap } from 'lucide-react';

const ProductOverlay = () => {
  return (
    <div className="w-screen flex flex-col items-center">
      {/* SECTION 1: GİRİŞ */}
<section className="h-screen w-full flex items-center justify-start px-24">
  <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} className="max-w-4xl">
    {/* Ürün Adı Vurgusu */}
    <span className="text-amber-500 font-black tracking-[0.4em] uppercase text-sm mb-4 block italic">
      VAKUM TABLASI
    </span>
    
    <h1 className="text-[100px] font-black text-white leading-[0.8] mb-6 uppercase italic">
      HASSAS <br /> 
      <span className="text-amber-500 font-normal">SABİTLEME</span>
      <span className="block text-3xl font-bold text-white/90 mt-2 lowercase first-letter:uppercase italic tracking-normal">
        İçin Tasarlandı
      </span>
    </h1>

    <p className="text-xl text-white/50 font-medium max-w-xl mb-10 leading-relaxed">
      Endüstriyel üretim süreçlerinde hassas sabitleme ve güvenli tutuş, maksimum verimlilik için kritik öneme sahiptir.
    </p>

    <div className="flex gap-4">
      <button className="bg-amber-500 text-black px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white transition-colors">
        TEKNİK DOSYA
      </button>
    </div>
  </motion.div>
</section>

      {/* SECTION 2: AVANTAJLAR (MODEL TAM ORTADA DURURKEN YANLARDA BELİRİR) */}
      <section className="h-screen w-full relative flex items-center justify-between px-24">
        <div className="space-y-4 max-w-xs">
          <div className="bg-white/5 backdrop-blur-2xl p-6 rounded-3xl border border-white/10">
            <Zap className="text-amber-500 mb-3" size={32} />
            <h3 className="text-white font-black text-sm uppercase mb-2">Hızlı Sabitleme</h3>
            <p className="text-white/40 text-xs leading-relaxed">Manuel mengene ihtiyacını ortadan kaldırarak üretimde zaman kazandırır.</p>
          </div>
          <div className="bg-white/5 backdrop-blur-2xl p-6 rounded-3xl border border-white/10">
            <CheckCircle2 className="text-amber-500 mb-3" size={32} />
            <h3 className="text-white font-black text-sm uppercase mb-2">Yüzey Koruması</h3>
            <p className="text-white/40 text-xs leading-relaxed">Yumuşak tutuş yüzeyi ile hassas parçalarınızda asla iz bırakmaz.</p>
          </div>
        </div>

        <div className="space-y-4 max-w-xs text-right">
          <div className="bg-white/5 backdrop-blur-2xl p-6 rounded-3xl border border-white/10">
            <Settings2 className="text-amber-500 mb-3 ml-auto" size={32} />
            <h3 className="text-white font-black text-sm uppercase mb-2">Tekrarlanabilirlik</h3>
            <p className="text-white/40 text-xs leading-relaxed">Seri üretim süreçlerinde mikron düzeyinde pozisyonlama hassasiyeti.</p>
          </div>
          <div className="bg-white/5 backdrop-blur-2xl p-6 rounded-3xl border border-white/10">
            <Box className="text-amber-500 mb-3 ml-auto" size={32} />
            <h3 className="text-white font-black text-sm uppercase mb-2">Enerji Tasarrufu</h3>
            <p className="text-white/40 text-xs leading-relaxed">Minimum vakum gücüyle maksimum tutuş sağlayan verimli mühendislik.</p>
          </div>
        </div>
      </section>

      {/* SECTION 3: TEKNİK ÖZELLİKLER VE BOYUTLAR */}
      <section className="h-screen w-full flex flex-col items-center justify-center px-24 bg-gradient-to-t from-black to-transparent">
        <div className="grid grid-cols-3 gap-12 w-full max-w-6xl mb-24">
          <div className="text-center">
            <h4 className="text-amber-500 font-black uppercase text-xs tracking-widest mb-4">Malzeme Yapısı</h4>
            <p className="text-white text-xl font-bold">Alüminyum Gövde & Özel Kanallar</p>
          </div>
          <div className="text-center border-x border-white/10">
            <h4 className="text-amber-500 font-black uppercase text-xs tracking-widest mb-4">Standart Bağlantı</h4>
            <p className="text-white text-xl font-bold">Ø10 mm Vakum Hortum Girişi</p>
          </div>
          <div className="text-center">
            <h4 className="text-amber-500 font-black uppercase text-xs tracking-widest mb-4">Uygulama Alanları</h4>
            <p className="text-white text-xl font-bold">CNC, CMM & Test Sistemleri</p>
          </div>
        </div>

        <div className="bg-amber-500/5 border border-amber-500/20 p-12 rounded-[50px] w-full max-w-4xl text-center backdrop-blur-md">
          <Ruler className="text-amber-500 mx-auto mb-6" size={48} />
          <h3 className="text-white text-3xl font-black uppercase mb-8">Boyut Seçenekleri (mm)</h3>
          <div className="flex justify-around text-2xl font-black text-white/80 italic">
            <span>300 × 400</span>
            <span className="text-amber-500">/</span>
            <span>400 × 600</span>
            <span className="text-amber-500">/</span>
            <span>600 × 600</span>
          </div>
          <button className="mt-12 bg-amber-500 text-black px-16 py-6 rounded-full font-black text-xl hover:scale-110 transition-transform">
            TEKLİF ALIN
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProductOverlay;