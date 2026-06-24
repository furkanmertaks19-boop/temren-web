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
  Sparkles,
  ChevronRight,
  Megaphone,
} from 'lucide-react';
import { getAdminSession, ROLE_LABELS } from '@/lib/adminPermissions';
import { normalizeTeklif } from '@/lib/teklifNormalizer';
import { useAdminNotifications, useAdminStats } from '@/hooks/admin/useAdminData';
import TeklifStatusBadge from '@/components/admin/TeklifStatusBadge';
import AdminCard, { AdminCardDescription, AdminCardHeader, AdminCardTitle } from '@/components/admin/AdminCard';
import { cn } from '@/lib/utils';

const ACCENT = '#FF6B00';

const fade = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut' as const },
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
    activeCampaigns: 0,
    totalCampaignLeads: 0,
    unreadCampaignLeads: 0,
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
      gradient: 'from-blue-500 to-blue-600',
      href: '/admin/urunler',
    },
    {
      label: 'Aktif Slider',
      value: stats.activeSlides,
      icon: SlidersHorizontal,
      gradient: 'from-violet-500 to-violet-600',
      href: '/admin/slider',
    },
    {
      label: 'Okunmamış Teklif',
      value: stats.unreadQuotes,
      icon: MessageSquare,
      gradient: stats.unreadQuotes > 0 ? 'from-orange-500 to-orange-600' : 'from-emerald-500 to-emerald-600',
      href: '/admin/teklifler',
      pulse: stats.unreadQuotes > 0,
    },
    {
      label: 'Bekleyen Yorum',
      value: stats.pendingComments,
      icon: Users,
      gradient: 'from-amber-500 to-amber-600',
      href: '/admin/gorusler',
    },
    {
      label: 'Aktif Kampanya',
      value: stats.activeCampaigns,
      icon: Megaphone,
      gradient: 'from-rose-500 to-rose-600',
      href: '/admin/campaigns',
    },
    {
      label: 'Kampanya Teklifi',
      value: stats.totalCampaignLeads,
      icon: Inbox,
      gradient: 'from-cyan-500 to-cyan-600',
      href: '/admin/campaign-leads',
    },
    {
      label: 'Okunmamış Kampanya Talebi',
      value: stats.unreadCampaignLeads,
      icon: MessageSquare,
      gradient: stats.unreadCampaignLeads > 0 ? 'from-orange-500 to-orange-600' : 'from-emerald-500 to-emerald-600',
      href: '/admin/campaign-leads',
      pulse: stats.unreadCampaignLeads > 0,
    },
  ];

  const quickActions = [
    { label: 'Kampanya Oluştur', href: '/admin/campaigns?create=true', icon: Megaphone, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Yeni Blog Yazısı', href: '/admin/blog', icon: Newspaper, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Ürün Ekle', href: '/admin/urunler', icon: Plus, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Slider Düzenle', href: '/admin/slider', icon: SlidersHorizontal, color: 'text-violet-600', bg: 'bg-violet-50' },
    { label: 'Menü Yönetimi', href: '/admin/nav', icon: Navigation, color: 'text-slate-600', bg: 'bg-slate-100' },
    { label: 'Galeri Yönetimi', href: '/admin/blog', icon: Images, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  const systemItems = [
    { label: 'Veritabanı', value: 'Bağlı', icon: Database, ok: true },
    { label: 'Aktif Kullanıcı', value: session?.displayName || 'Admin', icon: UserCheck, ok: false },
    { label: 'Son Güncelleme', value: lastUpdated ? lastUpdated.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }) : '—', icon: Clock, ok: false },
    { label: 'Sistem Sağlığı', value: 'Sağlıklı', icon: Activity, ok: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="space-y-8"
    >
      {/* Welcome header */}
      <motion.div {...fade} className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-[#FF6B00]">
          <Sparkles size={16} />
          <span className="text-xs font-semibold uppercase tracking-widest">İçerik Yönetimi</span>
        </div>
        <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900 tracking-tight">
          Merhaba, {session?.displayName?.split(' ')[0] || 'Admin'} 👋
        </h1>
        <p className="text-[15px] text-slate-500 max-w-xl leading-relaxed">
          Web sitesi içeriklerinizi buradan yönetin.
          {stats.unreadQuotes > 0 && (
            <Link href="/admin/teklifler" className="ml-1 font-semibold text-[#FF6B00] hover:underline">
              {stats.unreadQuotes} yeni teklif bekliyor.
            </Link>
          )}
        </p>
        {session?.role && (
          <p className="text-xs text-slate-400">{ROLE_LABELS[session.role]}</p>
        )}
      </motion.div>

      {/* Stats */}
      <motion.div
        {...fade}
        transition={{ ...fade.transition, delay: 0.05 }}
        className="grid grid-cols-2 xl:grid-cols-4 gap-4"
      >
        {statCards.map((stat) => (
          <Link key={stat.label} href={stat.href} className="group">
            <AdminCard className="p-5 h-full transition-all duration-300 hover:shadow-[0_4px_20px_rgba(15,23,42,0.1)] hover:-translate-y-0.5">
              <div className="flex items-start justify-between mb-4">
                <div className={cn('p-2.5 rounded-xl bg-gradient-to-br text-white shadow-sm', stat.gradient)}>
                  <stat.icon size={18} strokeWidth={2} />
                </div>
                {stat.pulse && (
                  <span className="relative flex size-2.5 mt-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                    <span className="relative inline-flex rounded-full size-2.5 bg-orange-500" />
                  </span>
                )}
              </div>
              <p className="text-3xl font-bold text-slate-900 tabular-nums tracking-tight">
                {loading ? '—' : stat.value}
              </p>
              <p className="text-[13px] text-slate-500 font-medium mt-1">{stat.label}</p>
            </AdminCard>
          </Link>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent offers */}
        <motion.div {...fade} transition={{ ...fade.transition, delay: 0.1 }} className="lg:col-span-2">
          <AdminCard className="overflow-hidden">
            <AdminCardHeader className="border-b border-slate-100/80">
              <div>
                <AdminCardTitle>Son Gelen Teklifler</AdminCardTitle>
                <AdminCardDescription>En son iletilen talepler</AdminCardDescription>
              </div>
              <Link
                href="/admin/teklifler"
                className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#FF6B00] hover:text-orange-700 transition-colors shrink-0"
              >
                Tümünü gör
                <ArrowUpRight size={14} />
              </Link>
            </AdminCardHeader>

            {loading ? (
              <div className="py-16 text-center text-sm text-slate-400">Yükleniyor...</div>
            ) : latestOffers.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {latestOffers.map((offer) => (
                  <Link
                    key={offer._id}
                    href="/admin/teklifler"
                    className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50/80 transition-colors group"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-semibold text-slate-900 truncate group-hover:text-[#FF6B00] transition-colors">
                        {offer.adSoyad}
                      </p>
                      <p className="text-[13px] text-slate-500 truncate mt-0.5">{offer.displayProduct}</p>
                    </div>
                    <p className="text-[12px] text-slate-400 hidden md:block shrink-0">
                      {new Date(offer.createdAt).toLocaleDateString('tr-TR', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </p>
                    <TeklifStatusBadge status={offer.status} />
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-400 shrink-0" />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center py-16 text-center">
                <div className="p-4 rounded-2xl bg-slate-50 mb-3">
                  <Inbox size={28} className="text-slate-300" />
                </div>
                <p className="text-sm text-slate-500">Henüz teklif talebi yok.</p>
              </div>
            )}
          </AdminCard>
        </motion.div>

        {/* Right column */}
        <div className="space-y-5">
          <motion.div {...fade} transition={{ ...fade.transition, delay: 0.15 }}>
            <AdminCard>
              <AdminCardHeader className="pb-2">
                <div>
                  <AdminCardTitle>Hızlı İşlemler</AdminCardTitle>
                  <AdminCardDescription>Sık kullanılan görevler</AdminCardDescription>
                </div>
              </AdminCardHeader>
              <div className="px-3 pb-3 space-y-1">
                {quickActions.map((action) => (
                  <Link
                    key={action.label}
                    href={action.href}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-slate-50 transition-all group"
                  >
                    <div className={cn('p-2.5 rounded-xl shrink-0', action.bg, action.color)}>
                      <action.icon size={17} strokeWidth={2} />
                    </div>
                    <span className="flex-1 text-[14px] font-medium text-slate-800 group-hover:text-slate-900">
                      {action.label}
                    </span>
                    <ArrowUpRight size={15} className="text-slate-300 group-hover:text-[#FF6B00] transition-colors" />
                  </Link>
                ))}
              </div>
            </AdminCard>
          </motion.div>

          <motion.div {...fade} transition={{ ...fade.transition, delay: 0.2 }}>
            <AdminCard padding="md">
              <div className="flex items-center gap-2 mb-4">
                <span className="relative flex size-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex rounded-full size-2 bg-emerald-500" />
                </span>
                <h3 className="text-[14px] font-semibold text-slate-900">Sistem Durumu</h3>
              </div>
              <div className="space-y-3">
                {systemItems.map((item) => (
                  <div key={item.label} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <item.icon size={15} className={item.ok ? 'text-emerald-500' : 'text-slate-400'} />
                      <span className="text-[13px] text-slate-600">{item.label}</span>
                    </div>
                    <span
                      className={cn(
                        'text-[12px] font-semibold px-2.5 py-1 rounded-lg truncate max-w-[110px]',
                        item.ok ? 'bg-emerald-50 text-emerald-800' : 'bg-slate-100 text-slate-700'
                      )}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </AdminCard>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
