"use client";

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, Globe, Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/constants/navigation";

type UnderlinePos = { left: number; width: number; opacity: number };

export default function Header() {
  const pathname = usePathname();

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [pendingMenu, setPendingMenu] = useState<string | null>(null);
  const [isHeaderHover, setIsHeaderHover] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // ✅ Mobile menu
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileOpenLabel, setMobileOpenLabel] = useState<string | null>(null);

  // ✅ Portal mount flag
  const [mounted, setMounted] = useState(false);

  const [underlinePos, setUnderlinePos] = useState<UnderlinePos>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const navRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const timerRef = useRef<number | null>(null);

  useEffect(() => setMounted(true), []);

  const megaByLabel = useMemo(() => {
    const map = new Map<string, any>();
    NAV_LINKS.forEach((l: any) => map.set(l.label, l));
    return map;
  }, []);

  const isMega = (label: string) => !!megaByLabel.get(label)?.isMega;

  const activeTopLabel = useMemo(() => {
    const p = pathname || "/";
    if (p === "/") return "ANASAYFA";
    if (p.startsWith("/kurumsal")) return "KURUMSAL";
    if (p.startsWith("/faaliyet")) return "FAALİYET ALANLARI";
    if (p.startsWith("/urunler")) return "ÜRÜNLER";
    if (p.startsWith("/medya")) return "MEDYA";
    if (p.startsWith("/iletisim")) return "İLETİŞİM";

    const found = NAV_LINKS.find((l: any) => l.href && l.href !== "#" && p.startsWith(l.href));
    return found?.label || "ANASAYFA";
  }, [pathname]);

  const clearTimer = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const headerSolid = isScrolled || isHeaderHover || !!activeMenu || !!pendingMenu || mobileOpen;

  const setUnderlineTo = (label: string | null) => {
    const navEl = navRef.current;
    if (!navEl || !label) {
      setUnderlinePos((s) => ({ ...s, opacity: 0 }));
      return;
    }
    const el = itemRefs.current[label];
    if (!el) {
      setUnderlinePos((s) => ({ ...s, opacity: 0 }));
      return;
    }

    const navRect = navEl.getBoundingClientRect();
    const r = el.getBoundingClientRect();

    setUnderlinePos({
      left: r.left - navRect.left,
      width: r.width,
      opacity: 1,
    });
  };

  useLayoutEffect(() => {
    requestAnimationFrame(() => setUnderlineTo(activeTopLabel));
  }, [activeTopLabel]);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrolled = window.scrollY > 10;
        setIsScrolled((prev) => (prev === scrolled ? prev : scrolled));
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => setUnderlineTo(activeTopLabel);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [activeTopLabel]);

  // ✅ mobile açıkken body scroll kapat
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  // ✅ ESC ile kapansın
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const resetAll = () => {
    clearTimer();
    setPendingMenu(null);
    setActiveMenu(null);
    setUnderlineTo(activeTopLabel);
  };

  const handleMenuEnter = (label: string) => {
    clearTimer();
    setUnderlineTo(label);

    if (!isMega(label)) {
      setPendingMenu(null);
      setActiveMenu(null);
      return;
    }

    setPendingMenu(label);

    if (activeMenu && activeMenu !== label) setActiveMenu(null);

    timerRef.current = window.setTimeout(() => {
      setActiveMenu(label);
      setPendingMenu(null);
    }, 220);
  };

  const closeMenusHard = () => {
    clearTimer();
    setPendingMenu(null);
    setActiveMenu(null);
  };

  const navBase = "text-[12px] font-semibold tracking-[0.28em] uppercase";
  const navActive = headerSolid ? "text-slate-900" : "text-white";
  const navIdle = headerSolid ? "text-slate-700 hover:text-slate-900" : "text-white/90 hover:text-white";

  const panelTopClass = isScrolled ? "top-16" : "top-20";
  const panelMax = "max-w-[1400px]";

  // Desktop ürünler
  const renderProductCategories = (data: any) => {
    const cats = data?.categories || [];

    const toLink = (it: any) => {
      if (typeof it === "string") return { name: it, href: "#" };
      const name = it?.name ?? it?.title ?? "";
      const href = it?.href ?? "#";
      return { name, href };
    };

    const ProductLink = ({ name, href }: { name: string; href: string }) => {
      const isReal = href && href !== "#";
      return (
        <Link
          href={href}
          prefetch={true}
          onClick={() => isReal && closeMenusHard()}
          className={[
            "text-[12px] py-1 transition-colors block",
            isReal ? "text-slate-500 hover:text-indigo-600" : "text-slate-400 cursor-not-allowed",
          ].join(" ")}
        >
          {name}
        </Link>
      );
    };

    return (
      <div className="grid grid-cols-3 gap-x-12 gap-y-10">
        {cats.map((cat: any) => {
          const hasSub = Array.isArray(cat.sub) && cat.sub.length > 0;
          const hasItems = Array.isArray(cat.items) && cat.items.length > 0;

          return (
            <div key={cat.title} className="flex flex-col">
              <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-indigo-600 mb-4 border-b border-slate-100 pb-2">
                {cat.title}
              </div>

              {hasSub && (
                <div className="space-y-6">
                  {cat.sub.map((s: any) => (
                    <div key={s.name}>
                      <div className="text-slate-900 font-bold text-[12px] mb-2 uppercase tracking-tight">{s.name}</div>
                      <div className="grid grid-cols-1 gap-y-1">
                        {(s.items || []).map((it: any) => {
                          const { name, href } = toLink(it);
                          if (!name) return null;
                          return <ProductLink key={name} name={name} href={href} />;
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!hasSub && hasItems && (
                <div className="grid grid-cols-1 gap-y-1">
                  {cat.items.map((it: any) => {
                    const { name, href } = toLink(it);
                    if (!name) return null;
                    return <ProductLink key={name} name={name} href={href} />;
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // ✅ Mobile mega içerik (sheet içinde)
  const renderMobileMega = (label: string) => {
    const data = megaByLabel.get(label);
    if (!data) return null;

    if (label === "ÜRÜNLER") {
      const cats = data?.categories || [];
      return (
        <div className="pt-3 space-y-6">
          {cats.map((cat: any) => (
            <div key={cat.title}>
              <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-indigo-600 mb-2 border-b border-slate-100 pb-2">
                {cat.title}
              </div>

              {Array.isArray(cat.sub) && cat.sub.length > 0 ? (
                <div className="space-y-5">
                  {cat.sub.map((s: any) => (
                    <div key={s.name}>
                      <div className="text-slate-900 font-bold text-[12px] mb-2 uppercase tracking-tight">{s.name}</div>
                      <div className="space-y-1">
                        {(s.items || []).map((it: any) => {
                          const name = it?.name ?? it?.title ?? it;
                          const href = it?.href ?? "#";
                          const isReal = href && href !== "#";
                          if (!name) return null;
                          return (
                            <Link
                              key={name}
                              href={href}
                              onClick={() => isReal && setMobileOpen(false)}
                              className={`block py-2 text-[13px] ${
                                isReal ? "text-slate-700 hover:text-indigo-600" : "text-slate-400"
                              }`}
                            >
                              {name}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-1">
                  {(cat.items || []).map((it: any) => {
                    const name = it?.name ?? it?.title ?? it;
                    const href = it?.href ?? "#";
                    const isReal = href && href !== "#";
                    if (!name) return null;
                    return (
                      <Link
                        key={name}
                        href={href}
                        onClick={() => isReal && setMobileOpen(false)}
                        className={`block py-2 text-[13px] ${
                          isReal ? "text-slate-700 hover:text-indigo-600" : "text-slate-400"
                        }`}
                      >
                        {name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }

    const cols = data?.columns || [];
    const items = cols.flatMap((c: any) => c.items || []);
    return (
      <div className="pt-3">
        {items.map((item: any) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className="block py-3 border-b border-slate-100 text-sm text-slate-700 hover:text-indigo-600 font-medium transition-all"
          >
            {item.name}
          </Link>
        ))}
      </div>
    );
  };

  // ✅ Portal ile mobile sheet
  const MobileSheet = mounted
    ? createPortal(
        <AnimatePresence>
          {mobileOpen && (
            <motion.div className="fixed inset-0 z-[9999] lg:hidden">
              {/* Overlay */}
              <motion.div
                className="absolute inset-0 bg-black/45"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileOpen(false)}
              />

              {/* Panel */}
              <motion.aside
                className="absolute right-0 top-0 h-full w-[92%] max-w-[380px] bg-white shadow-2xl overflow-y-auto"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.22 }}
              >
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                  <div className="relative w-28 h-8">
                    <Image src="/logo.png" alt="Temren Makina" fill className="object-contain" />
                  </div>
                  <button className="p-2 rounded-full hover:bg-slate-100" aria-label="Close" onClick={() => setMobileOpen(false)}>
                    <X size={20} />
                  </button>
                </div>

                <div className="p-5 space-y-2">
                  <button className="w-full px-4 py-3 rounded-xl bg-slate-900 text-white font-bold tracking-widest text-[11px] hover:bg-indigo-600 transition">
                    TEKLİF AL
                  </button>

                  <div className="flex items-center justify-between pt-3">
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <Globe size={16} /> TR
                    </div>
                    <Search size={18} className="text-slate-600" />
                  </div>

                  <div className="h-px bg-slate-100 my-4" />

                  {NAV_LINKS.map((link: any) => {
                    const label = link.label as string;

                    if (!isMega(label)) {
                      return (
                        <Link
                          key={label}
                          href={link.href || "#"}
                          onClick={() => setMobileOpen(false)}
                          className="block py-4 border-b border-slate-100 text-sm font-semibold tracking-widest uppercase text-slate-900"
                        >
                          {label}
                        </Link>
                      );
                    }

                    const open = mobileOpenLabel === label;

                    return (
                      <div key={label} className="border-b border-slate-100">
                        <button
                          onClick={() => setMobileOpenLabel((cur) => (cur === label ? null : label))}
                          className="w-full py-4 flex items-center justify-between text-sm font-semibold tracking-widest uppercase text-slate-900"
                        >
                          <span>{label}</span>
                          <ChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
                        </button>

                        <AnimatePresence>
                          {open && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="pb-4"
                            >
                              {renderMobileMega(label)}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.aside>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )
    : null;

  return (
    <>
      <motion.header
        onMouseEnter={() => setIsHeaderHover(true)}
        onMouseLeave={() => {
          setIsHeaderHover(false);
          resetAll();
        }}
        className="fixed top-0 left-0 right-0 z-50 border-b"
        animate={{
          backgroundColor: headerSolid ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0)",
          borderColor: headerSolid ? "rgba(226,232,240,1)" : "rgba(226,232,240,0)",
          boxShadow: headerSolid ? "0 10px 30px -10px rgba(0,0,0,0.1)" : "0 0 0 rgba(0,0,0,0)",
        }}
        style={{ borderBottomWidth: "1px", backdropFilter: headerSolid ? "blur(12px)" : "none" }}
        transition={{ duration: 0.22 }}
      >
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
          {/* ✅ Mobilde flex, desktopta grid (taşma bitiyor) */}
          <div
            className={[
              "flex items-center justify-between gap-3",
              "lg:grid lg:items-center",
              isScrolled ? "h-16" : "h-20",
            ].join(" ")}
            style={{ gridTemplateColumns: "180px 1fr 280px" }}
          >
            <div className="flex items-center">
              <Link href="/" className="relative w-28 h-8 sm:w-36 sm:h-9 lg:w-40 lg:h-10">
                <Image
                  src="/logo.png"
                  alt="Temren Makina"
                  fill
                  className={`object-contain transition-all ${headerSolid ? "brightness-100" : "brightness-0 invert"}`}
                  priority
                />
              </Link>
            </div>

            {/* Desktop nav */}
            <div className="relative hidden lg:block">
              <div ref={navRef} className="relative flex items-center justify-end gap-8">
                {NAV_LINKS.map((link: any) => {
                  const label = link.label as string;
                  const active = activeTopLabel === label;

                  return (
                    <div key={label} className="relative" onMouseEnter={() => handleMenuEnter(label)}>
                      <Link
                        href={link.href || "#"}
                        className={["flex items-center gap-2 py-2", navBase, active ? navActive : navIdle].join(" ")}
                        onClick={(e) => {
                          if (!isMega(label)) return;
                          e.preventDefault();
                          clearTimer();
                          setUnderlineTo(label);
                          setPendingMenu(null);
                          setActiveMenu((cur) => (cur === label ? null : label));
                        }}
                      >
                        <span
  ref={(el) => {
    itemRefs.current[label] = el;
  }}
>
  {label}
</span>
                        {link.isMega && (
                          <ChevronDown size={12} className={`transition-transform ${activeMenu === label ? "rotate-180" : ""}`} />
                        )}
                      </Link>
                    </div>
                  );
                })}

                <div
                  className="absolute -bottom-[8px] h-[2px] bg-indigo-600 transition-all duration-300"
                  style={{ left: underlinePos.left, width: underlinePos.width, opacity: underlinePos.opacity }}
                />
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center justify-end gap-2 sm:gap-6 shrink-0">
              <div className="hidden lg:flex justify-end items-center gap-6">
                <Search size={18} className={headerSolid ? "text-slate-600" : "text-white"} />
                <div className={`flex items-center gap-1 text-[11px] font-bold tracking-widest ${headerSolid ? "text-slate-700" : "text-white"}`}>
                  <Globe size={16} /> TR
                </div>
                <Link href="/iletisim">
      <button
        className={`px-6 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all ${
          headerSolid ? "bg-slate-900 text-white hover:bg-indigo-600" : "bg-white text-slate-900 hover:bg-amber-500"
        }`}
      >
        TEKLİF AL
      </button>
    </Link>
              </div>

              {/* ✅ Mobile hamburger */}
              <button
                className={`lg:hidden p-2 rounded-full transition ${headerSolid ? "text-slate-900 hover:bg-slate-100" : "text-white hover:bg-white/10"}`}
                aria-label="Menu"
                onClick={() => setMobileOpen(true)}
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop mega panel */}
        <AnimatePresence>
          {activeMenu && isMega(activeMenu) && (
            <motion.div
              key={activeMenu}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className={`absolute left-0 right-0 bg-white border-t border-slate-100 shadow-2xl overflow-hidden ${panelTopClass} hidden lg:block`}
            >
              <div className={`mx-auto ${panelMax} flex`}>
                <div className="w-1/4 relative overflow-hidden bg-slate-900">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeMenu}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 0.6, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={
                          activeMenu === "KURUMSAL"
                            ? "/kurumsal.png"
                            : activeMenu === "FAALİYET ALANLARI"
                            ? "/faaliyet.png"
                            : activeMenu === "ÜRÜNLER"
                            ? "/urunler.png"
                            : activeMenu === "MEDYA"
                            ? "/medya.png"
                            : "/kurumsal.png"
                        }
                        alt={activeMenu}
                        fill
                        className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                      />
                    </motion.div>
                  </AnimatePresence>

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                  <div className="absolute bottom-8 left-8 z-10">
                    <div className="text-3xl font-black italic text-white uppercase tracking-tighter drop-shadow-2xl">TEMREN</div>
                    <div className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.4em] mt-1 drop-shadow-md">{activeMenu}</div>
                  </div>
                </div>

                <div className="w-3/4 p-12">
                  {activeMenu === "ÜRÜNLER" ? renderProductCategories(megaByLabel.get("ÜRÜNLER")) : (
                    <div className="grid grid-cols-2 gap-10">
                      {(megaByLabel.get(activeMenu)?.columns || []).map((col: any, idx: number) => (
                        <div key={idx} className="space-y-2">
                          {(col.items || []).map((item: any) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              onClick={closeMenusHard}
                              className="block py-3 border-b border-slate-50 text-sm text-slate-600 hover:text-indigo-600 font-medium transition-all"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ✅ Mobile sheet portal */}
      {MobileSheet}
    </>
  );
}
