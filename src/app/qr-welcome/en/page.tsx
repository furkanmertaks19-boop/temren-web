"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  MessageCircle,
  MapPin,
  Mail,
  Clock,
  ArrowRight,
  Image as ImageIcon,
  Share2,
  Play,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const products = [
  {
    id: "tika",
    tag: "TİKA",
    title: "TİKA — Remote Controlled Modular Platform",
    desc: "Attachments for agriculture, municipal, winter, and emergency response.",
    href: "/en/products/tika",
    img: "/galeri/tika_qr.png",
  },
  {
    id: "mini-tika",
    tag: "Mini-TİKA",
    title: "Mini-TİKA — Compact UGV",
    desc: "Lightweight and agile, designed for narrow spaces.",
    href: "/en/products/mini-tika",
    img: "/galeri/mini_tika_3.jpg",
  },
  {
    id: "palet",
    tag: "TRACK",
    title: "Track Systems",
    desc: "Modular structure compatible with challenging terrains.",
    href: "/en/products/track-systems",
    img: "/galeri/plt-18-4.png",
  },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function QRWelcomeDetailEN() {
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState("");

  // Working Hours Calculation
  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const day = now.getDay();
      const totalMinutes = now.getHours() * 60 + now.getMinutes();
      const start = 7 * 60 + 30;
      const end = 17 * 60 + 30;
      setIsOpen(day >= 1 && day <= 5 && totalMinutes >= start && totalMinutes <= end);
    };
    calc();
    const t = setInterval(calc, 60 * 1000);
    return () => clearInterval(t);
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(""), 2000);
  };

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Temren Makina",
          text: "Temren Makina • Quick Contact & Products",
          url,
        });
        return;
      }
    } catch (_) {
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      showToast("Link copied");
    } catch {
      showToast("Copy failed");
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("satis@temrenmakina.com");
      showToast("Email copied");
    } catch {
      showToast("Copy failed");
    }
  };

  const openBadge = useMemo(() => {
    return isOpen
      ? { text: "Open Now", cls: "bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/15" }
      : { text: "Closed", cls: "bg-rose-500/10 text-rose-700 ring-1 ring-rose-500/15" };
  }, [isOpen]);

  return (
    <main className="relative z-[9999] min-h-dvh overflow-x-hidden font-sans text-slate-900">
      {/* Background Decor */}
      <div className="fixed inset-0 bg-[radial-gradient(1200px_circle_at_10%_10%,rgba(255,122,0,0.10),transparent_45%),radial-gradient(900px_circle_at_90%_20%,rgba(59,130,246,0.10),transparent_40%),radial-gradient(900px_circle_at_50%_90%,rgba(16,185,129,0.08),transparent_45%)]" />
      <div className="fixed inset-0 bg-gradient-to-b from-white via-[#F7F9FC] to-white" />
      <div className="fixed inset-0 pointer-events-none opacity-[0.06] [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:18px_18px]" />

      <div className="relative mx-auto max-w-2xl px-5 pb-44">
        {/* Top brand */}
        <header className="pt-10 pb-6">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 backdrop-blur-xl ring-1 ring-black/5 shadow-sm">
              <Sparkles className="text-orange-500" size={16} />
              <span className="text-[10px] font-extrabold tracking-[0.35em] text-slate-600 uppercase">
                Quick Access
              </span>
            </div>

            <h1 className="mt-6 text-[44px] leading-none font-black tracking-tight">
              TEM<span className="text-orange-500">REN</span>
            </h1>
            <p className="mt-2 text-[11px] font-bold tracking-[0.5em] uppercase text-slate-400">
              Industrial Solutions
            </p>
          </motion.div>
        </header>

        {/* HERO */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[32px] bg-white/70 backdrop-blur-xl ring-1 ring-black/5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)]"
        >
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative p-7">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-orange-500/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.25em] text-orange-700 ring-1 ring-orange-500/10">
                Domestic Production
              </span>
              <span className="rounded-full bg-slate-500/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.25em] text-slate-700 ring-1 ring-slate-500/10">
                Modular
              </span>
              <span className={cn("ml-auto rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.25em]", openBadge.cls)}>
                {openBadge.text}
              </span>
            </div>

            <h2 className="mt-6 text-[28px] font-black tracking-tight leading-tight">
              Track Systems &{" "}
              <span className="text-orange-600">TİKA</span>{" "}
              Platform
            </h2>
            <p className="mt-3 text-[13px] leading-relaxed text-slate-600">
              Contact us with a single touch, browse products, and access media content instantly.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <a
                href="tel:+903128100230"
                className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-slate-900 px-4 py-4 text-white shadow-lg shadow-black/10 transition hover:translate-y-[-1px] hover:shadow-xl active:translate-y-[0px]"
              >
                <Phone size={18} className="opacity-90" />
                <span className="text-[12px] font-black uppercase tracking-[0.2em]">Call</span>
                <ChevronRight size={16} className="opacity-60 group-hover:translate-x-0.5 transition" />
              </a>

              <a
                href="https://wa.me/905389733439"
                target="_blank"
                className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#1fb357] px-4 py-4 text-white shadow-lg shadow-green-500/15 transition hover:translate-y-[-1px] hover:shadow-xl active:translate-y-[0px]"
              >
                <MessageCircle size={18} className="opacity-95" />
                <span className="text-[12px] font-black uppercase tracking-[0.2em]">WhatsApp</span>
                <ChevronRight size={16} className="opacity-60 group-hover:translate-x-0.5 transition" />
              </a>
            </div>
          </div>
        </motion.section>

        {/* INFO ROW */}
        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="rounded-[26px] bg-white/65 backdrop-blur-xl ring-1 ring-black/5 shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-orange-500/10 text-orange-700 ring-1 ring-orange-500/10">
                <Clock size={22} />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-slate-400">
                  Business Hours
                </p>
                <p className="mt-1 text-[14px] font-black text-slate-800">07:30 – 17:30</p>
                <p className="text-[10px] text-slate-500 italic">Mon - Fri</p>
              </div>
            </div>
          </div>

          <button
            onClick={copyEmail}
            className="rounded-[26px] bg-white/65 backdrop-blur-xl ring-1 ring-black/5 shadow-sm p-6 text-left transition active:scale-[0.99] hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-500/10 text-blue-700 ring-1 ring-blue-500/10">
                <Mail size={22} />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-slate-400">
                  Email
                </p>
                <p className="mt-1 text-[14px] font-black text-slate-800">satis@temrenmakina.com</p>
                <p className="mt-1 text-[11px] text-slate-500">Tap to copy</p>
              </div>
            </div>
          </button>
        </div>

        {/* PRODUCTS */}
        <section className="mt-10">
          <div className="mb-5 flex items-center gap-4">
            <h3 className="text-[11px] font-extrabold uppercase tracking-[0.35em] text-slate-400">
              Product Portfolio
            </h3>
            <div className="h-px flex-1 bg-black/5" />
          </div>

          <div className="space-y-3">
            {products.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
              >
                <Link
                  href={p.href}
                  className="group block rounded-[26px] bg-white/70 backdrop-blur-xl ring-1 ring-black/5 shadow-sm transition hover:shadow-md hover:translate-y-[-1px]"
                >
                  <div className="flex items-center gap-4 p-4">
                    <div className="relative h-20 w-24 overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-black/5">
                      <img
                        src={p.img}
                        alt={p.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.10]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/10 opacity-60" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <span className="inline-flex items-center rounded-full bg-orange-500/10 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.22em] text-orange-700 ring-1 ring-orange-500/10">
                        {p.tag}
                      </span>
                      <h4 className="mt-2 text-[15px] font-black tracking-tight text-slate-900 line-clamp-2">
                        {p.title}
                      </h4>
                      <p className="mt-1 text-[12px] text-slate-600 line-clamp-2">{p.desc}</p>
                    </div>

                    <div className="grid h-11 w-11 place-items-center rounded-full bg-slate-900 text-white shadow-sm shadow-black/10 transition group-hover:scale-[1.06]">
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* MEDIA */}
        <section className="mt-10">
          <div className="mb-5 flex items-center gap-4">
            <h3 className="text-[11px] font-extrabold uppercase tracking-[0.35em] text-slate-400">
              Media
            </h3>
            <div className="h-px flex-1 bg-black/5" />
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Link
              href="/en/media/photos"
              className="group relative overflow-hidden rounded-[28px] bg-white/70 backdrop-blur-xl ring-1 ring-black/5 shadow-sm transition hover:shadow-md"
            >
              <div className="relative h-60">
                <img
                  src="/aracpalet.png"
                  alt="Temren Photo Gallery"
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute left-6 bottom-6">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-2 backdrop-blur-md ring-1 ring-white/20">
                    <ImageIcon className="text-white" size={18} />
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-white/90">
                      Photo Gallery
                    </span>
                  </div>
                  <p className="text-white text-[20px] font-black tracking-tight">View Gallery</p>
                  <p className="mt-1 text-white/70 text-[11px] font-bold tracking-[0.25em] uppercase">
                    Visual Content
                  </p>
                </div>
              </div>
            </Link>

            <a
              href="https://youtube.com/@temrenmakina"
              target="_blank"
              className="group relative overflow-hidden rounded-[28px] bg-white/70 backdrop-blur-xl ring-1 ring-black/5 shadow-sm transition hover:shadow-md"
            >
              <div className="relative h-60">
                <img
                  src="/youtube.png"
                  alt="Temren YouTube"
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="flex items-center gap-3 rounded-full bg-white/15 px-5 py-3 backdrop-blur-md ring-1 ring-white/20 transition group-hover:scale-[1.03]">
                    <div className="grid h-11 w-11 place-items-center rounded-full bg-white/20 ring-1 ring-white/25">
                      <Play className="text-white fill-white ml-0.5" size={22} />
                    </div>
                    <div>
                      <p className="text-white text-[13px] font-black uppercase tracking-[0.2em]">YouTube</p>
                      <p className="text-white/70 text-[11px] font-semibold">Watch Videos</p>
                    </div>
                  </div>
                </div>

                <div className="absolute left-6 bottom-6">
                  <p className="text-white text-[20px] font-black tracking-tight">Videos</p>
                  <p className="mt-1 text-white/70 text-[11px] font-bold tracking-[0.25em] uppercase">
                    @temrenmakina
                  </p>
                </div>
              </div>
            </a>
          </div>
        </section>
      </div>

      {/* BOTTOM DOCK */}
      <nav className="fixed bottom-5 left-1/2 z-[100] w-[92%] max-w-md -translate-x-1/2">
        <div className="rounded-full bg-white/75 backdrop-blur-xl ring-1 ring-black/5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)] px-2 py-2">
          <div className="grid grid-cols-3 gap-2">
            <a
              href="tel:+903128100230"
              className="group flex flex-col items-center justify-center rounded-full py-3 transition hover:bg-black/5 active:scale-[0.99]"
            >
              <Phone size={18} className="text-slate-900 group-hover:text-orange-600 transition" />
              <span className="mt-1 text-[9px] font-extrabold uppercase tracking-[0.32em] text-slate-500">
                Call
              </span>
            </a>

            <a
              href="https://maps.google.com/?q=Temren+Makina"
              target="_blank"
              className="group flex flex-col items-center justify-center rounded-full py-3 transition hover:bg-black/5 active:scale-[0.99]"
            >
              <MapPin size={18} className="text-slate-900 group-hover:text-orange-600 transition" />
              <span className="mt-1 text-[9px] font-extrabold uppercase tracking-[0.32em] text-slate-500">
                Location
              </span>
            </a>

            <button
              onClick={handleShare}
              className="group flex flex-col items-center justify-center rounded-full py-3 transition hover:bg-black/5 active:scale-[0.99]"
            >
              <Share2 size={18} className="text-slate-900 group-hover:text-orange-600 transition" />
              <span className="mt-1 text-[9px] font-extrabold uppercase tracking-[0.32em] text-slate-500">
                Share
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            className="fixed bottom-28 left-1/2 z-[200] -translate-x-1/2 rounded-2xl bg-slate-900 px-5 py-3 text-white shadow-xl ring-1 ring-white/10"
          >
            <p className="text-[10px] font-extrabold uppercase tracking-[0.22em]">{toast}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}