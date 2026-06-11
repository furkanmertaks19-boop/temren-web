"use client";
import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Package,
  MessageSquare,
  SlidersHorizontal,
  Users,
  Plus,
  Newspaper,
  Inbox,
  Navigation,
  Images,
  Database,
  Activity,
  Clock,
  UserCheck,
  ArrowUpRight,
  Circle,
} from 'lucide-react';
import { getAdminSession, ROLE_LABELS } from '@/lib/adminPermissions';
import { normalizeTeklif } from '@/lib/teklifNormalizer';
import { useAdminNotifications, useAdminStats } from '@/hooks/admin/useAdminData';
import TeklifStatusBadge from '@/components/admin/TeklifStatusBadge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

const ACCENT = '#FF6B00';

const fadeIn = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, ease: 'easeOut' as const },
};

export default function DashboardPage() {
  const [session, setSession] = useState<ReturnType<typeof getAdminSession>>(null);
  const { data: statsData, isLoading: statsLoading, dataUpdatedAt: statsUpdatedAt } = useAdminStats();
  const { data: notifications, isLoading: notificationsLoading } = useAdminNotifications();

  useEffect(() => {
    setSession(getAdminSession());
  }, []);

  const stats = statsData?.stats ?? {
    totalProducts: 0,
    unreadQuotes: 0,
    activeSlides: 0,
    pendingComments: 0,
    totalComments: 0,
    newsletterSubscribers: 0,
  };
  const loading = statsLoading || notificationsLoading;
  const lastUpdated = statsUpdatedAt ? new Date(statsUpdatedAt) : null;

  const latestOffers = useMemo(
    () =>
      (notifications?.latestOffers ?? []).map((offer) =>
        normalizeTeklif(offer as Record<string, unknown>)
      ),
    [notifications?.latestOffers]
  );

  const statCards = [
    {
      label: 'Toplam Ürün',
      value: stats.totalProducts,
      icon: Package,
      iconBg: 'bg-blue-50 text-blue-600',
      href: '/admin/urunler',
      indicator: null as string | null,
    },
    {
      label: 'Aktif Slider',
      value: stats.activeSlides,
      icon: SlidersHorizontal,
      iconBg: 'bg-violet-50 text-violet-600',
      href: '/admin/slider',
      indicator: stats.activeSlides > 0 ? 'Aktif' : 'Boş',
    },
    {
      label: 'Okunmamış Teklif',
      value: stats.unreadQuotes,
      icon: MessageSquare,
      iconBg: stats.unreadQuotes > 0 ? 'bg-orange-50 text-[#FF6B00]' : 'bg-emerald-50 text-emerald-600',
      href: '/admin/teklifler',
      indicator: stats.unreadQuotes > 0 ? 'Yeni' : 'Güncel',
      highlight: stats.unreadQuotes > 0,
    },
    {
      label: 'Bekleyen Yorum',
      value: stats.pendingComments,
      icon: Users,
      iconBg: 'bg-amber-50 text-amber-600',
      href: '/admin/gorusler',
      indicator: stats.pendingComments > 0 ? 'Bekliyor' : 'Temiz',
    },
  ];

  const quickActions = [
    {
      label: 'Yeni Blog Yazısı',
      description: 'İçerik oluştur',
      href: '/admin/blog',
      icon: Newspaper,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      label: 'Ürün Ekle',
      description: 'Katalog güncelle',
      href: '/admin/urunler',
      icon: Plus,
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      label: 'Slider Düzenle',
      description: 'Ana sayfa görselleri',
      href: '/admin/slider',
      icon: SlidersHorizontal,
      color: 'text-violet-600 bg-violet-50',
    },
    {
      label: 'Menü Yönetimi',
      description: 'Site navigasyonu',
      href: '/admin/nav',
      icon: Navigation,
      color: 'text-slate-600 bg-slate-100',
    },
    {
      label: 'Galeri Yönetimi',
      description: 'Medya içerikleri',
      href: '/admin/blog',
      icon: Images,
      color: 'text-orange-600 bg-orange-50',
    },
  ];

  const systemItems = [
    {
      label: 'Veritabanı Durumu',
      value: 'Bağlı',
      icon: Database,
      status: 'success' as const,
    },
    {
      label: 'Aktif Kullanıcı',
      value: session?.displayName || 'Admin',
      icon: UserCheck,
      status: 'neutral' as const,
    },
    {
      label: 'Son Güncelleme',
      value: lastUpdated
        ? lastUpdated.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
        : '—',
      icon: Clock,
      status: 'neutral' as const,
    },
    {
      label: 'Sistem Sağlığı',
      value: 'Sağlıklı',
      icon: Activity,
      status: 'success' as const,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Page header */}
      <motion.header
        {...fadeIn}
        className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Dashboard
            </h1>
            {stats.unreadQuotes > 0 && (
              <Badge
                variant="outline"
                className="bg-orange-50 text-[#FF6B00] border-orange-200 font-medium"
              >
                <Circle className="size-1.5 fill-[#FF6B00] text-[#FF6B00] animate-pulse" />
                {stats.unreadQuotes} yeni teklif
              </Badge>
            )}
          </div>
          <p className="text-sm text-slate-500 mt-1.5 max-w-lg">
            Temren Makina web sitesinin içeriklerini yönetin. Ürünler, blog, slider ve
            müşteri taleplerine hızlıca erişin.
          </p>
          {session?.role && (
            <p className="text-xs text-slate-400 mt-1">
              {ROLE_LABELS[session.role]} olarak giriş yapıldı
            </p>
          )}
        </div>
      </motion.header>

      {/* Stat cards */}
      <motion.div
        {...fadeIn}
        transition={{ ...fadeIn.transition, delay: 0.05 }}
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
      >
        {statCards.map((stat) => (
          <Link key={stat.label} href={stat.href} className="group block">
            <Card
              className={cn(
                'h-full shadow-sm border-slate-200/80 hover:shadow-md hover:border-slate-300 transition-all duration-200 py-0 gap-0',
                stat.highlight && 'border-orange-200 ring-1 ring-orange-100'
              )}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className={cn('p-2 rounded-lg shrink-0', stat.iconBg)}>
                    <stat.icon size={18} />
                  </div>
                  {stat.indicator && (
                    <Badge
                      variant="outline"
                      className={cn(
                        'text-[10px] font-medium px-1.5 h-5',
                        stat.indicator === 'Yeni' || stat.indicator === 'Bekliyor'
                          ? 'bg-orange-50 text-[#FF6B00] border-orange-200'
                          : stat.indicator === 'Aktif'
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                            : 'bg-slate-50 text-slate-500 border-slate-200'
                      )}
                    >
                      {stat.indicator}
                    </Badge>
                  )}
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-bold text-slate-900 tabular-nums">
                    {loading ? '—' : stat.value}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent offers table */}
        <motion.div
          {...fadeIn}
          transition={{ ...fadeIn.transition, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Card className="shadow-sm border-slate-200/80 py-0 gap-0 overflow-hidden">
            <CardHeader className="flex-row items-center justify-between border-b border-slate-100 py-4">
              <div>
                <CardTitle className="text-base font-semibold">Son Gelen Teklifler</CardTitle>
                <CardDescription className="text-xs mt-0.5">
                  En son iletilen teklif ve iletişim talepleri
                </CardDescription>
              </div>
              <Link
                href="/admin/teklifler"
                className="text-xs font-medium hover:underline flex items-center gap-1 shrink-0"
                style={{ color: ACCENT }}
              >
                Tümünü gör
                <ArrowUpRight size={13} />
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              {loading ? (
                <div className="p-10 text-center text-sm text-slate-400">Yükleniyor...</div>
              ) : latestOffers.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="pl-6 text-xs font-semibold text-slate-500">
                        Kullanıcı
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-slate-500 hidden sm:table-cell">
                        Talep Konusu
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-slate-500 hidden md:table-cell">
                        Tarih
                      </TableHead>
                      <TableHead className="pr-6 text-xs font-semibold text-slate-500 text-right">
                        Durum
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {latestOffers.map((offer) => (
                        <TableRow key={offer._id} className="cursor-pointer">
                          <TableCell className="pl-6">
                            <Link href="/admin/teklifler" className="block">
                              <p className="text-sm font-medium text-slate-900 truncate max-w-[140px] sm:max-w-none">
                                {offer.adSoyad}
                              </p>
                              <p className="text-xs text-slate-500 truncate sm:hidden mt-0.5">
                                {offer.displayProduct}
                              </p>
                            </Link>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Link href="/admin/teklifler" className="text-sm text-slate-600 truncate block max-w-[200px]">
                              {offer.displayProduct}
                            </Link>
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-sm text-slate-500">
                            <Link href="/admin/teklifler">
                              {new Date(offer.createdAt).toLocaleDateString('tr-TR', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </Link>
                          </TableCell>
                          <TableCell className="pr-6 text-right">
                            <Link href="/admin/teklifler">
                              <TeklifStatusBadge status={offer.status} />
                            </Link>
                          </TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Inbox size={32} className="text-slate-300 mb-3" />
                  <p className="text-sm text-slate-500">Henüz teklif talebi yok.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Quick actions */}
          <motion.div
            {...fadeIn}
            transition={{ ...fadeIn.transition, delay: 0.15 }}
          >
            <Card className="shadow-sm border-slate-200/80 py-0 gap-0">
              <CardHeader className="py-4 border-b border-slate-100">
                <CardTitle className="text-base font-semibold">Hızlı İşlemler</CardTitle>
                <CardDescription className="text-xs">
                  Sık kullanılan içerik yönetim işlemleri
                </CardDescription>
              </CardHeader>
              <CardContent className="p-3">
                <div className="grid grid-cols-1 gap-2">
                  {quickActions.map((action) => (
                    <Link key={action.label} href={action.href} className="group">
                      <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm transition-all duration-200">
                        <div className={cn('p-2 rounded-lg shrink-0', action.color)}>
                          <action.icon size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 group-hover:text-[#FF6B00] transition-colors">
                            {action.label}
                          </p>
                          <p className="text-[11px] text-slate-400 truncate">
                            {action.description}
                          </p>
                        </div>
                        <ArrowUpRight
                          size={14}
                          className="text-slate-300 group-hover:text-[#FF6B00] transition-colors shrink-0"
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* System status */}
          <motion.div
            {...fadeIn}
            transition={{ ...fadeIn.transition, delay: 0.2 }}
          >
            <Card className="shadow-sm border-slate-200/80 py-0 gap-0">
              <CardHeader className="py-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="relative flex size-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full size-2 bg-emerald-500" />
                  </span>
                  <CardTitle className="text-sm font-semibold">Sistem Durumu</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-3">
                <div className="space-y-2">
                  {systemItems.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between gap-3 px-2 py-2 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <item.icon
                          size={14}
                          className={cn(
                            'shrink-0',
                            item.status === 'success' ? 'text-emerald-500' : 'text-slate-400'
                          )}
                        />
                        <span className="text-xs text-slate-500 truncate">{item.label}</span>
                      </div>
                      <Badge
                        variant="outline"
                        className={cn(
                          'text-[10px] font-medium shrink-0 max-w-[120px] truncate',
                          item.status === 'success'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-slate-50 text-slate-600 border-slate-200'
                        )}
                      >
                        {item.value}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
