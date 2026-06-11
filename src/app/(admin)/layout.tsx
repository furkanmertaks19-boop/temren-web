"use client";
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  MessageSquare,
  LogOut,
  SlidersHorizontal,
  Newspaper,
  Inbox,
  Menu,
  X,
  Navigation,
  Package,
  ExternalLink,
  Bell
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setAuthChecked(true);
      return;
    }
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!loggedIn) {
      router.replace('/admin/login');
    } else {
      setAuthChecked(true);
    }
  }, [isLoginPage, router, pathname]);

  useEffect(() => {
    if (isLoginPage || !authChecked) return;
    const fetchNotifications = async () => {
      try {
        const res = await fetch('/api/admin/notifications', { cache: 'no-store' });
        const data = await res.json();
        setUnreadCount(data.unreadCount || 0);
      } catch {
        /* ignore */
      }
    };
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [isLoginPage, authChecked]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      /* ignore */
    }
    localStorage.removeItem('isLoggedIn');
    router.push('/admin/login');
    router.refresh();
  };

  const navGroups = useMemo(() => [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Slider Ayarları', path: '/admin/slider', icon: SlidersHorizontal },
    { name: 'Blog Yönetimi', path: '/admin/blog', icon: Newspaper },
    { name: 'Müşteri Görüşleri', path: '/admin/gorusler', icon: MessageSquare },
    { name: 'Teklif Talepleri', path: '/admin/teklifler', icon: Inbox, badge: unreadCount },
    { name: 'Menü Yönetimi', path: '/admin/nav', icon: Navigation },
    { name: 'Ürün Yönetimi', path: '/admin/urunler', icon: Package },
  ], [unreadCount]);

  if (isLoginPage) return <>{children}</>;
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center admin-panel">
        <div className="w-8 h-8 border-2 border-slate-200 border-t-[#FF4D00] rounded-full animate-spin" />
      </div>
    );
  }

  const NavContent = () => (
    <>
      <div className="px-5 py-6 border-b border-white/10">
        <Link href="/admin/dashboard" className="flex items-center gap-3" onClick={() => setSidebarOpen(false)}>
          <div className="w-9 h-9 bg-[#FF4D00] rounded-lg flex items-center justify-center text-white font-bold text-sm">T</div>
          <div>
            <p className="text-white font-semibold text-sm leading-tight">TEMREN</p>
            <p className="text-slate-400 text-[11px]">Yönetim Paneli</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto no-scrollbar">
        <p className="px-3 py-2 text-[10px] font-medium uppercase tracking-wider text-slate-500">Menü</p>
        {navGroups.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-white/10 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="flex items-center gap-3">
                <item.icon size={18} className={isActive ? 'text-[#FF4D00]' : ''} />
                {item.name}
              </span>
              {item.badge ? (
                <span className="min-w-[20px] h-5 px-1.5 flex items-center justify-center rounded-full bg-[#FF4D00] text-white text-[10px] font-semibold">
                  {item.badge > 99 ? '99+' : item.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-white/10 space-y-1">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <ExternalLink size={18} />
          Siteyi Görüntüle
        </a>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={18} />
          Çıkış Yap
        </button>
      </div>
    </>
  );

  return (
    <div className="admin-panel flex min-h-screen bg-slate-50 text-slate-900">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 bg-slate-900 flex-col fixed inset-y-0 left-0 z-40">
        <NavContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-64 bg-slate-900 flex flex-col h-full">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>
            <NavContent />
          </aside>
        </div>
      )}

      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-6 h-14 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 -ml-2 text-slate-600 hover:text-slate-900"
          >
            <Menu size={20} />
          </button>
          <div className="hidden lg:block text-xs text-slate-400">
            TEMREN Makina · Industrial OS v2.0
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <Link
              href="/admin/teklifler"
              className="relative p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full bg-[#FF4D00] text-white text-[9px] font-bold">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </Link>
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-semibold">
              A
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
