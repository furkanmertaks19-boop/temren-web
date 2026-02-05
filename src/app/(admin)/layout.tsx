"use client";
import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  Image as ImageIcon,
  Settings,
  LogOut,
  ChevronRight,
  SlidersHorizontal,
  Menu as MenuIcon,
  ChevronDown,
  MonitorDot,
  Newspaper
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isPagesOpen, setIsPagesOpen] = useState(false);

  // Sayfa yüklendiğinde aktif grubu otomatik açar
  useEffect(() => {
    if (pathname?.includes('/admin/slider') || pathname?.includes('/admin/blog') || pathname?.includes('/admin/nav') || pathname?.includes('/admin/gorusler')) {
      setIsPagesOpen(true);
    }
  }, [pathname]);

  const menuItems = useMemo(() => [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard, isGroup: false },
    { name: 'Ürün Yönetimi', path: '/admin/urunler', icon: Package, isGroup: false },
    {
      name: 'Sayfa Ayarları',
      isGroup: true,
      icon: MonitorDot,
      isOpen: isPagesOpen,
      toggle: () => setIsPagesOpen(!isPagesOpen),
      subItems: [
        { name: 'Slider Ayarları', path: '/admin/slider', icon: SlidersHorizontal },
        { name: 'Blog Yönetimi', path: '/admin/blog', icon: Newspaper },
        { name: 'Navbar Ayarları', path: '/admin/nav', icon: MenuIcon },
        // ✅ Müşteri Görüşleri admin yoluna eklendi
        { name: 'Müşteri Görüşleri', path: '/admin/gorusler', icon: MessageSquare }
      ]
    },
    { name: 'Teklif Talepleri', path: '/admin/teklifler', icon: MessageSquare, isGroup: false },
    { name: 'Galeri', path: '/admin/galeri', icon: ImageIcon, isGroup: false },
    { name: 'Sistem Ayarları', path: '/admin/ayarlar', icon: Settings, isGroup: false },
  ], [isPagesOpen, pathname]);

  if (pathname === '/admin/login') return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] font-sans text-slate-900 selection:bg-amber-500 selection:text-white">
      {/* SIDEBAR */}
      <aside className="w-72 bg-white border-r border-slate-100 flex flex-col sticky top-0 h-screen z-50">
        <div className="p-8 h-full flex flex-col overflow-hidden">

          {/* Logo Alanı */}
          <Link href="/admin/dashboard" className="flex items-center gap-3 mb-10 group">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-amber-500 font-black italic text-xl shadow-lg shadow-slate-200 group-hover:scale-105 transition-transform">T</div>
            <h2 className="font-black italic text-xl tracking-tighter uppercase text-slate-900 leading-none">
              TEMREN<span className="text-amber-500">.OS</span>
            </h2>
          </Link>

          {/* Menü Navigasyonu */}
          <nav className="space-y-1.5 flex-grow overflow-y-auto no-scrollbar pr-1">
            {menuItems.map((item, idx) => {
              if (item.isGroup) {
                const isAnySubActive = item.subItems?.some(sub => pathname === sub.path);

                return (
                  <div key={`group-${idx}`} className="mb-2">
                    <button
                      onClick={item.toggle}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group ${isAnySubActive ? 'bg-slate-50 text-slate-900' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'}`}
                    >
                      <div className="flex items-center gap-4">
                        <item.icon size={20} className={isAnySubActive ? 'text-amber-500' : 'group-hover:text-amber-500 transition-colors'} />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">{item.name}</span>
                      </div>
                      <motion.div animate={{ rotate: item.isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown size={14} />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {item.isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden pl-4 mt-1 space-y-1"
                        >
                          {item.subItems?.map((sub) => {
                            const isSubActive = pathname === sub.path;
                            return (
                              <Link
  key={sub.path}
  href={sub.path || "#"} // ✅ Hata veren kısma || "#" ekleyerek boş kalmamasını sağladık
  className={`flex items-center gap-4 p-3.5 rounded-xl transition-all ${
    isSubActive ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
  }`}
>
  <sub.icon size={16} className={isSubActive ? 'text-amber-500' : ''} />
  <span className="text-[9px] font-bold uppercase tracking-widest">{sub.name}</span>
</Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path || "#"}
                  className={`flex items-center justify-between p-4 rounded-2xl transition-all group ${isActive
                      ? 'bg-slate-900 text-white shadow-xl shadow-slate-200'
                      : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <item.icon size={20} className={isActive ? 'text-amber-500' : 'group-hover:text-amber-500 transition-colors'} />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">{item.name}</span>
                  </div>
                  {isActive && (
                    <motion.div layoutId="activeArrow">
                      <ChevronRight size={14} className="text-amber-500" />
                    </motion.div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Çıkış Butonu */}
          <div className="pt-6 border-t border-slate-100 mt-4">
            <button className="w-full flex items-center gap-4 text-slate-400 hover:text-red-500 transition-all font-black uppercase tracking-widest text-[10px] group px-4 py-2">
              <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
              Güvenli Çıkış
            </button>
          </div>
        </div>
      </aside>

      {/* İÇERİK ALANI */}
      <main className="flex-1 overflow-y-auto relative bg-[#F8F9FA]">
        <div className="p-8 md:p-12 min-h-screen max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}