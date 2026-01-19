"use client";

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, Globe } from "lucide-react";
import { NAV_LINKS } from "@/constants/navigation";

type UnderlinePos = { left: number; width: number; opacity: number };

export default function Header() {
  const pathname = usePathname();

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [pendingMenu, setPendingMenu] = useState<string | null>(null);
  const [isHeaderHover, setIsHeaderHover] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [underlinePos, setUnderlinePos] = useState<UnderlinePos>({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [fillKey, setFillKey] = useState(0);

  const navRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const timerRef = useRef<number | null>(null);

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

  const headerSolid = isScrolled || isHeaderHover || !!activeMenu || !!pendingMenu;

  const setUnderlineTo = (label: string | null) => {
    const navEl = navRef.current;
    if (!navEl || !label) {
      setUnderlinePos((s) => ({ ...s, opacity: 0 }));
      return;
    }
    const el = itemRefs.current[label];
    if (!el) return;

    const navRect = navEl.getBoundingClientRect();
    const r = el.getBoundingClientRect();

    setUnderlinePos({
      left: r.left - navRect.left,
      width: r.width,
      opacity: 1,
    });
  };

  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      setUnderlineTo(activeTopLabel);
      setFillKey((k) => k + 1);
    });
  }, [activeTopLabel]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const resetAll = () => {
    clearTimer();
    setPendingMenu(null);
    setActiveMenu(null);
    setUnderlineTo(activeTopLabel);
    setFillKey((k) => k + 1);
  };

  const handleMenuEnter = (label: string) => {
    clearTimer();
    setUnderlineTo(label);

    if (!isMega(label)) {
      setPendingMenu(null);
      setActiveMenu(null);
      setFillKey((k) => k + 1);
      return;
    }

    setPendingMenu(label);
    setFillKey((k) => k + 1);

    if (activeMenu && activeMenu !== label) {
      setActiveMenu(null);
    }

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

  // Ürünler Render Fonksiyonu
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

  return (
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
      <div className="container mx-auto px-8">
        <div className={["grid items-center", isScrolled ? "h-16" : "h-20"].join(" ")} style={{ gridTemplateColumns: "180px 1fr 280px" }}>
          <div className="flex items-center">
            <Link href="/" className="relative w-40 h-10">
              <Image src="/logo.png" alt="Temren Makina" fill className={`object-contain transition-all ${headerSolid ? 'brightness-100' : 'brightness-0 invert'}`} priority />
            </Link>
          </div>

          <div className="relative">
            <div ref={navRef} className="relative flex items-center justify-end gap-8">
              {NAV_LINKS.map((link: any) => {
                const label = link.label as string;
                const active = activeTopLabel === label;
                return (
                  <div key={label} className="relative" onMouseEnter={() => handleMenuEnter(label)}>
                    <Link
                      ref={(el) => { itemRefs.current[label] = el; }}
                      href={link.href || "#"}
                      className={["flex items-center gap-2 py-2", navBase, active ? navActive : navIdle].join(" ")}
                    >
                      <span>{label}</span>
                      {link.isMega && <ChevronDown size={12} className={`transition-transform ${activeMenu === label ? 'rotate-180' : ''}`} />}
                    </Link>
                  </div>
                );
              })}
              <div className="absolute -bottom-[8px] h-[2px] bg-indigo-600 transition-all duration-300" style={{ left: underlinePos.left, width: underlinePos.width, opacity: underlinePos.opacity }} />
            </div>
          </div>

          <div className="flex justify-end items-center gap-6">
            <Search size={18} className={headerSolid ? "text-slate-600" : "text-white"} />
            <div className={`flex items-center gap-1 text-[11px] font-bold tracking-widest ${headerSolid ? 'text-slate-700' : 'text-white'}`}>
              <Globe size={16} /> TR
            </div>
            <button className={`px-6 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all ${headerSolid ? 'bg-slate-900 text-white hover:bg-indigo-600' : 'bg-white text-slate-900 hover:bg-amber-500'}`}>
              TEKLİF AL
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeMenu && isMega(activeMenu) && (
          <motion.div
            key={activeMenu}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={`absolute left-0 right-0 bg-white border-t border-slate-100 shadow-2xl overflow-hidden ${panelTopClass}`}
          >
            <div className={`mx-auto ${panelMax} flex`}>
              {/* SOL TARAF: DİNAMİK RESİMLİ ALAN */}
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
                        activeMenu === "KURUMSAL" ? "/kurumsal.png" :
                          activeMenu === "FAALİYET ALANLARI" ? "/faaliyet.png" :
                            activeMenu === "ÜRÜNLER" ? "/urunler.png" :
                              activeMenu === "MEDYA" ? "/medya.png" :
                                "/kurumsal.png" // Fallback
                      }
                      alt={activeMenu}
                      fill
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-8 left-8 z-10">
                  <div className="text-3xl font-black italic text-white uppercase tracking-tighter drop-shadow-2xl">
                    TEMREN
                  </div>
                  <div className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.4em] mt-1 drop-shadow-md">
                    {activeMenu}
                  </div>
                </div>
              </div>

              {/* SAĞ TARAF: MENÜ İÇERİĞİ */}
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
  );
}