"use client";
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  MessageSquare,
  LogOut,
  SlidersHorizontal,
  Newspaper,
  Inbox,
  Menu,
  X,
  Package,
  ExternalLink,
  Bell,
  Users,
  Settings,
  ChevronDown,
  User,
  type LucideIcon,
} from 'lucide-react';
import { getAdminSession, clearAdminSession, ROLE_LABELS } from '@/lib/adminPermissions';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const ACCENT = '#FF6B00';
const SIDEBAR_BG = '#0B1736';

type NavItem = {
  name: string;
  path: string;
  icon: LucideIcon;
  badge?: number;
};

type NavSection = {
  title?: string;
  items: NavItem[];
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [session, setSession] = useState<ReturnType<typeof getAdminSession>>(null);

  const isLoginPage = pathname === '/admin/login';
  const isDashboard = pathname === '/admin/dashboard';

  useEffect(() => {
    if (isLoginPage) {
      setAuthChecked(true);
      return;
    }
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!loggedIn) {
      router.replace('/admin/login');
    } else {
      setSession(getAdminSession());
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
    clearAdminSession();
    router.push('/admin/login');
    router.refresh();
  };

  const navSections: NavSection[] = useMemo(() => [
    {
      items: [{ name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard }],
    },
    {
      title: 'İçerik Yönetimi',
      items: [
        { name: 'Blog', path: '/admin/blog', icon: Newspaper },
        { name: 'Slider', path: '/admin/slider', icon: SlidersHorizontal },
        { name: 'Müşteri Görüşleri', path: '/admin/gorusler', icon: MessageSquare },
      ],
    },
    {
      title: 'Ürünler',
      items: [
        { name: 'Ürün Yönetimi', path: '/admin/urunler', icon: Package },
      ],
    },
    {
      title: 'Talepler',
      items: [
        { name: 'Teklif Talepleri', path: '/admin/teklifler', icon: Inbox, badge: unreadCount },
      ],
    },
    {
      title: 'Sistem',
      items: [
        { name: 'Kullanıcı Yönetimi', path: '/admin/kullanicilar', icon: Users },
        { name: 'Ayarlar', path: '/admin/nav', icon: Settings },
      ],
    },
  ], [unreadCount]);

  if (isLoginPage) return <>{children}</>;
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center admin-panel">
        <div
          className="w-8 h-8 border-2 border-slate-200 rounded-full animate-spin"
          style={{ borderTopColor: ACCENT }}
        />
      </div>
    );
  }

  const userInitial = (session?.displayName || 'A').charAt(0).toUpperCase();

  const NavLink = ({ item }: { item: NavItem }) => {
    const isActive = pathname === item.path;
    const Icon = item.icon;
    return (
      <Link
        href={item.path}
        onClick={() => setSidebarOpen(false)}
        className={cn(
          'relative flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200',
          isActive
            ? 'bg-white/10 text-white font-medium shadow-sm'
            : 'text-slate-400 hover:text-white hover:bg-white/5'
        )}
      >
        {isActive && (
          <span
            className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full"
            style={{ backgroundColor: ACCENT }}
          />
        )}
        <span className="flex items-center gap-3 pl-1">
          <Icon
            size={17}
            className={cn('shrink-0 transition-colors', isActive ? 'text-[#FF6B00]' : '')}
          />
          {item.name}
        </span>
        {item.badge ? (
          <Badge
            className="h-5 min-w-5 px-1.5 text-[10px] font-semibold border-0 text-white"
            style={{ backgroundColor: ACCENT }}
          >
            {item.badge > 99 ? '99+' : item.badge}
          </Badge>
        ) : null}
      </Link>
    );
  };

  const NavContent = () => (
    <>
      <div className="px-5 py-5 border-b border-white/10">
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-3"
          onClick={() => setSidebarOpen(false)}
        >
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg"
            style={{ backgroundColor: ACCENT }}
          >
            T
          </div>
          <div>
            <p className="text-white font-semibold text-sm leading-tight tracking-wide">TEMREN</p>
            <p className="text-slate-400 text-[11px]">İçerik Yönetim Paneli</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto no-scrollbar">
        {navSections.map((section, idx) => (
          <div key={section.title ?? `section-${idx}`}>
            {section.title && (
              <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                {section.title}
              </p>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <NavLink key={item.path} item={item} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-white/10 space-y-0.5">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <ExternalLink size={17} />
          Siteyi Görüntüle
        </a>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={17} />
          Çıkış Yap
        </button>
      </div>
    </>
  );

  const UserMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-slate-100 transition-colors outline-none">
          <Avatar className="size-8">
            <AvatarFallback
              className="text-xs font-semibold text-white"
              style={{ backgroundColor: SIDEBAR_BG }}
            >
              {userInitial}
            </AvatarFallback>
          </Avatar>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-medium text-slate-900 leading-tight">
              {session?.displayName || 'Admin'}
            </p>
            <p className="text-[10px] text-slate-400 leading-tight">
              {session?.role ? ROLE_LABELS[session.role] : 'Yönetici'}
            </p>
          </div>
          <ChevronDown size={14} className="hidden sm:block text-slate-400" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium">{session?.displayName || 'Admin'}</span>
            {session?.email && (
              <span className="text-xs text-muted-foreground truncate">{session.email}</span>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/admin/dashboard" className="cursor-pointer">
            <User className="mr-2 size-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/admin/kullanicilar" className="cursor-pointer">
            <Users className="mr-2 size-4" />
            Kullanıcılar
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="text-red-600 focus:text-red-600 cursor-pointer"
        >
          <LogOut className="mr-2 size-4" />
          Çıkış Yap
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const NotificationButton = () => (
    <Link
      href="/admin/teklifler"
      className="relative p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
    >
      <Bell size={18} />
      {unreadCount > 0 && (
        <span
          className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full text-white text-[9px] font-bold"
          style={{ backgroundColor: ACCENT }}
        >
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </Link>
  );

  return (
    <div className="admin-panel flex min-h-screen bg-white text-slate-900">
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex w-64 flex-col fixed inset-y-0 left-0 z-40"
        style={{ backgroundColor: SIDEBAR_BG }}
      >
        <NavContent />
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/50"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              className="relative w-64 flex flex-col h-full shadow-2xl"
              style={{ backgroundColor: SIDEBAR_BG }}
            >
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white z-10"
              >
                <X size={20} />
              </button>
              <NavContent />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              <Menu size={20} />
            </button>
            {!isDashboard && (
              <div className="hidden lg:block text-xs text-slate-400 truncate">
                TEMREN Makina · İçerik Yönetim Paneli
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <NotificationButton />
            <UserMenu />
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto bg-slate-50/50">
          {children}
        </main>
      </div>
    </div>
  );
}
