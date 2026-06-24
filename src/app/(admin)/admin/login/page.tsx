"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  User,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  Loader2,
  AlertTriangle,
  Sparkles,
} from "lucide-react";

const CYAN = "#00d4ff";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.55, ease: "easeOut" as const },
  }),
};

function AnimatedGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-[-50%] opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.07) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          animation: "authGridDrift 20s linear infinite",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, #0a0e1a 100%)",
        }}
      />
    </div>
  );
}

function FloatingOrbs() {
  return (
    <>
      <motion.div
        className="absolute w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{
          top: "-12%",
          left: "-8%",
          background: "radial-gradient(circle, rgba(0,212,255,0.22) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          bottom: "-15%",
          right: "-10%",
          background: "radial-gradient(circle, rgba(0,100,255,0.2) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
        animate={{ x: [0, -35, 0], y: [0, 25, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-2 h-2 rounded-full pointer-events-none"
        style={{ top: "20%", right: "22%", background: CYAN, boxShadow: `0 0 20px ${CYAN}` }}
        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
        style={{ bottom: "30%", left: "18%", background: CYAN, boxShadow: `0 0 16px ${CYAN}` }}
        animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.7, 1.1, 0.7] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      />
    </>
  );
}

export default function AdminLoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    setIsAuthenticating(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        const { setAdminSession } = await import("@/lib/adminPermissions");
        if (data.user) {
          setAdminSession(data.user);
        } else {
          localStorage.setItem("isLoggedIn", "true");
        }
        await new Promise((r) => setTimeout(r, 900));
        router.push("/admin/dashboard");
      } else {
        setIsAuthenticating(false);
        setIsLoading(false);
        setError(data.error || "Kullanıcı adı veya şifre hatalı.");
      }
    } catch {
      setIsAuthenticating(false);
      setIsLoading(false);
      setError("Sunucuya bağlanılamadı. Veritabanını kontrol et.");
    }
  };

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0e1a] px-4 py-10 font-sans text-white">
      <AnimatedGrid />
      <FloatingOrbs />

      {/* Dönen gradient border efekti */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-[min(920px,95vw)] h-[min(540px,90vh)] rounded-[28px] opacity-40"
          style={{
            background: `conic-gradient(from 0deg, transparent, ${CYAN}, transparent, rgba(0,100,255,0.8), transparent)`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-[860px]"
      >
        <motion.div
          animate={error ? { x: [0, -8, 8, -5, 5, 0] } : { x: 0 }}
          transition={{ duration: 0.45 }}
          className={`relative overflow-hidden rounded-[24px] shadow-[0_0_60px_rgba(0,212,255,0.15)] ring-1 ${
            error ? "ring-red-400/60 shadow-[0_0_50px_rgba(255,77,109,0.25)]" : "ring-cyan-400/25"
          }`}
        >
          <div className="flex flex-col lg:flex-row min-h-[520px] bg-[#0d1224]/95 backdrop-blur-xl">
            {/* Sol — Form */}
            <div className="relative flex-1 flex flex-col justify-center px-8 sm:px-11 py-10 lg:w-[52%] z-10">
              <AnimatePresence mode="wait">
                {!isAuthenticating ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40, filter: "blur(6px)" }}
                    transition={{ duration: 0.45 }}
                  >
                    <motion.div
                      custom={0}
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      className="flex items-center gap-4 mb-7"
                    >
                      <motion.div
                        className="w-[60px] h-[60px] rounded-2xl flex items-center justify-center border border-cyan-400/30 bg-cyan-400/10"
                        style={{ boxShadow: "0 0 30px rgba(0,212,255,0.2)" }}
                        whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0,212,255,0.35)" }}
                      >
                        <ShieldCheck size={30} style={{ color: CYAN }} />
                      </motion.div>
                      <div>
                        <h1 className="text-[2rem] sm:text-[2.35rem] font-black tracking-tight leading-none">
                          TEMREN<span style={{ color: CYAN }}>.OS</span>
                        </h1>
                        <p className="text-xs text-white/45 font-medium mt-1.5 tracking-wide">
                          Yönetim paneline güvenli erişim
                        </p>
                      </div>
                    </motion.div>

                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                          animate={{ opacity: 1, height: "auto", marginBottom: 16 }}
                          exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                          className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-red-400/30 bg-red-500/10 text-red-200 text-xs font-semibold overflow-hidden"
                        >
                          <AlertTriangle size={15} className="shrink-0" />
                          {error}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <form onSubmit={handleLogin} className="space-y-5">
                      <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
                        <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
                          Kullanıcı Adı
                        </label>
                        <div
                          className={`relative flex items-center rounded-2xl border transition-all duration-300 ${
                            focusedField === "username"
                              ? "border-cyan-400/60 bg-cyan-400/5 shadow-[0_0_20px_rgba(0,212,255,0.12)]"
                              : "border-white/10 bg-white/[0.03]"
                          }`}
                        >
                          <input
                            type="text"
                            required
                            value={formData.username}
                            disabled={isLoading}
                            onFocus={() => setFocusedField("username")}
                            onBlur={() => setFocusedField(null)}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            className="w-full bg-transparent px-4 py-3.5 text-sm font-semibold text-white outline-none placeholder:text-white/25"
                            placeholder="admin"
                            autoComplete="username"
                          />
                          <User size={17} className="mr-4 text-white/35 shrink-0" />
                        </div>
                      </motion.div>

                      <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
                        <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2">
                          Şifre
                        </label>
                        <div
                          className={`relative flex items-center rounded-2xl border transition-all duration-300 ${
                            focusedField === "password"
                              ? "border-cyan-400/60 bg-cyan-400/5 shadow-[0_0_20px_rgba(0,212,255,0.12)]"
                              : "border-white/10 bg-white/[0.03]"
                          }`}
                        >
                          <input
                            type={showPassword ? "text" : "password"}
                            required
                            value={formData.password}
                            disabled={isLoading}
                            onFocus={() => setFocusedField("password")}
                            onBlur={() => setFocusedField(null)}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full bg-transparent px-4 py-3.5 text-sm font-semibold text-white outline-none placeholder:text-white/25"
                            placeholder="••••••••"
                            autoComplete="current-password"
                          />
                          <button
                            type="button"
                            disabled={isLoading}
                            onClick={() => setShowPassword(!showPassword)}
                            className="mr-2 p-1.5 text-white/35 hover:text-cyan-400 transition-colors"
                          >
                            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                          </button>
                          <Lock size={17} className="mr-3 text-white/35 shrink-0" />
                        </div>
                      </motion.div>

                      <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" className="pt-2">
                        <motion.button
                          type="submit"
                          disabled={isLoading}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="relative w-full overflow-hidden rounded-2xl py-3.5 text-sm font-black uppercase tracking-[0.15em] text-white disabled:opacity-70 disabled:cursor-wait"
                          style={{
                            background: `linear-gradient(135deg, #00b4d8 0%, ${CYAN} 50%, #0096c7 100%)`,
                            boxShadow: "0 4px 30px rgba(0,212,255,0.35)",
                          }}
                        >
                          <motion.span
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                          />
                          <span className="relative flex items-center justify-center gap-2.5">
                            Sisteme Bağlan
                            <ArrowRight size={17} strokeWidth={2.5} />
                          </span>
                        </motion.button>
                      </motion.div>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-8"
                  >
                    <motion.div
                      className="w-24 h-24 rounded-3xl flex items-center justify-center border border-cyan-400/40 bg-cyan-400/10 mb-6"
                      style={{ boxShadow: "0 0 40px rgba(0,212,255,0.3)" }}
                      animate={{
                        boxShadow: [
                          "0 0 30px rgba(0,212,255,0.2)",
                          "0 0 50px rgba(0,212,255,0.45)",
                          "0 0 30px rgba(0,212,255,0.2)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Loader2 size={44} style={{ color: CYAN }} className="animate-spin" />
                    </motion.div>
                    <h2 className="text-2xl font-black tracking-tight">Doğrulanıyor</h2>
                    <p className="text-sm text-white/50 mt-2 font-medium">Bilgiler kontrol ediliyor...</p>
                    <div className="w-full max-w-[220px] h-1.5 rounded-full bg-white/10 mt-8 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: CYAN, boxShadow: `0 0 12px ${CYAN}` }}
                        animate={{ x: ["-100%", "280%"] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sağ — Welcome (diagonal clip) */}
            <div className="hidden lg:block relative lg:w-[48%] overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(145deg, #00b4d8 0%, #00d4ff 40%, #0077b6 100%)",
                  clipPath: "polygon(12% 0, 100% 0, 100% 100%, 0 100%)",
                }}
              />
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `radial-gradient(circle at 30% 40%, rgba(255,255,255,0.4) 0%, transparent 50%)`,
                }}
              />

              <div className="relative h-full flex flex-col justify-center pl-[18%] pr-10 pb-16 z-10">
                <AnimatePresence mode="wait">
                  {!isAuthenticating ? (
                    <motion.div
                      key="welcome"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 40, filter: "blur(4px)" }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white/90 text-[10px] font-bold uppercase tracking-widest mb-5"
                      >
                        <Sparkles size={11} />
                        Admin Panel
                      </motion.div>
                      <h2 className="text-[2.6rem] font-black uppercase leading-[1.05] tracking-tight text-white">
                        Welcome
                        <br />
                        Back!
                      </h2>
                      <p className="mt-5 text-[15px] leading-relaxed text-white/80 font-medium max-w-[280px]">
                        Temren Makina içerik, slider, blog, kampanya ve ürün yönetim sistemine giriş yapın.
                      </p>
                      <div className="mt-10 flex gap-3">
                        {["Blog", "Slider", "Kampanya", "Ürün"].map((tag, i) => (
                          <motion.span
                            key={tag}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + i * 0.08 }}
                            className="px-3 py-1 rounded-lg bg-white/15 text-[11px] font-bold text-white/90 backdrop-blur-sm"
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="welcome-loading"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-left"
                    >
                      <h2 className="text-[2.4rem] font-black uppercase leading-[1.05] tracking-tight text-white">
                        Panel
                        <br />
                        Açılıyor
                      </h2>
                      <p className="mt-5 text-[15px] leading-relaxed text-white/80 font-medium max-w-[280px]">
                        Yetki doğrulaması tamamlandığında yönetim ekranına aktarılacaksınız.
                      </p>
                      <motion.div
                        className="mt-8 flex gap-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full bg-white"
                            animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                          />
                        ))}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-6 text-[10px] font-bold tracking-[0.35em] text-white/15 uppercase z-10"
      >
        Temren Makina Industrial OS • 2026
      </motion.p>

      <style jsx global>{`
        @keyframes authGridDrift {
          0% { transform: translate(0, 0); }
          100% { transform: translate(48px, 48px); }
        }
      `}</style>
    </main>
  );
}
