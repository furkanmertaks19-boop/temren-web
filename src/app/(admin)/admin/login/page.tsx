"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // SAHTE KONTROL KALDIRILDI, GERÇEK API'YE GİDİLİYOR
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // Tarayıcıya giriş yapıldığını kaydet
        localStorage.setItem("isLoggedIn", "true");
        // Dashboard'a uçur
        router.push('/admin/dashboard');
      } else {
        // Veritabanından gelen hata mesajını göster (Kullanıcı yok veya şifre yanlış)
        setError(data.error || "Giriş başarısız.");
      }
    } catch (err) {
      setError("Sunucuya bağlanılamadı. İnterneti veya veritabanını kontrol et.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Dekoratif Işıklar */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-900/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[440px] relative z-10 text-white"
      >
        <div className="text-center mb-10">
          <div className="inline-flex p-5 rounded-[2rem] bg-amber-500/10 border border-amber-500/20 mb-6">
            <ShieldCheck size={48} className="text-amber-500" />
          </div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter leading-none">
            TEMREN<span className="text-amber-500">.OS</span>
          </h1>
        </div>

        <div className="bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-[2.5rem] backdrop-blur-3xl shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-red-500/10 border border-red-500/20 text-red-500 text-[11px] font-bold uppercase p-3 rounded-xl text-center"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-amber-500/70 ml-1 tracking-widest">Kullanıcı Erişimi</label>
              <div className="relative group">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-amber-500" size={18} />
                <input
                  type="text"
                  required
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4.5 pl-14 pr-4 outline-none focus:border-amber-500 text-white"
                  placeholder="Kullanıcı adı"
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-amber-500/70 ml-1 tracking-widest">Güvenlik Anahtarı</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-amber-500" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4.5 pl-14 pr-14 outline-none focus:border-amber-500 text-white"
                  placeholder="••••••••"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 hover:text-amber-500 transition-colors px-2"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-amber-500 text-black font-black py-5 rounded-2xl hover:bg-white transition-all uppercase tracking-widest flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-3 border-black/20 border-t-black rounded-full animate-spin" />
              ) : (
                <>Sisteme Bağlan <ArrowRight size={18} /></>
              )}
            </button>
          </form>
        </div>
        <p className="text-center text-white/5 text-[9px] mt-10 font-bold uppercase tracking-[0.4em]">
          TEMREN MAKINA INDUSTRIAL OS • 2026
        </p>
      </motion.div>
    </main>
  );
}