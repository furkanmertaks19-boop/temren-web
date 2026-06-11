"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Package,
  MessageSquare,
  SlidersHorizontal,
  Users,
  ArrowRight,
  Plus,
  Newspaper,
  Inbox,
  Bell
} from 'lucide-react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    unreadQuotes: 0,
    activeSlides: 0,
    pendingComments: 0,
    totalComments: 0,
    newsletterSubscribers: 0
  });
  const [latestOffers, setLatestOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, notifRes] = await Promise.all([
        fetch('/api/admin/stats', { cache: 'no-store' }),
        fetch('/api/admin/notifications', { cache: 'no-store' })
      ]);
      const statsData = await statsRes.json();
      const notifData = await notifRes.json();

      if (statsData.success) {
        setStats(statsData.stats);
      }
      setLatestOffers(notifData.latestOffers || statsData.recentQuotes || []);
    } catch (error) {
      console.error("Veri çekilemedi:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  const statCards = [
    {
      label: "Toplam Ürün",
      value: stats.totalProducts,
      icon: Package,
      color: "text-blue-600 bg-blue-50",
      href: "/admin/urunler"
    },
    {
      label: "Okunmamış Teklif",
      value: stats.unreadQuotes,
      icon: MessageSquare,
      color: stats.unreadQuotes > 0 ? "text-red-600 bg-red-50" : "text-emerald-600 bg-emerald-50",
      href: "/admin/teklifler",
      highlight: stats.unreadQuotes > 0
    },
    {
      label: "Aktif Slider",
      value: stats.activeSlides,
      icon: SlidersHorizontal,
      color: "text-violet-600 bg-violet-50",
      href: "/admin/slider"
    },
    {
      label: "Bekleyen Yorum",
      value: stats.pendingComments,
      icon: Users,
      color: "text-amber-600 bg-amber-50",
      href: "/admin/gorusler"
    },
  ];

  const quickActions = [
    { label: "Yeni Blog Yazısı", href: "/admin/blog", icon: Newspaper },
    { label: "Slider Düzenle", href: "/admin/slider", icon: SlidersHorizontal },
    { label: "Teklifleri Gör", href: "/admin/teklifler", icon: Inbox },
    { label: "Ürün Ekle", href: "/admin/urunler", icon: Plus },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Dashboard"
        description="Sistem özeti ve son aktiviteler"
        badge={
          stats.unreadQuotes > 0 ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 text-red-600 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              {stats.unreadQuotes} yeni teklif
            </span>
          ) : null
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className={`bg-white border rounded-xl p-5 hover:shadow-md transition-all group ${
              stat.highlight ? 'border-red-200 ring-1 ring-red-100' : 'border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2.5 rounded-lg ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <ArrowRight size={16} className="text-slate-300 group-hover:text-slate-600 transition-colors" />
            </div>
            <p className="text-2xl font-semibold text-slate-900">
              {loading ? '—' : stat.value}
            </p>
            <p className="text-sm text-slate-500 mt-0.5">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent offers */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-900">Son Gelen Teklifler</h2>
            <Link
              href="/admin/teklifler"
              className="text-xs font-medium text-[#FF4D00] hover:underline"
            >
              Tümünü gör
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {loading ? (
              <div className="p-8 text-center text-sm text-slate-400">Yükleniyor...</div>
            ) : latestOffers.length > 0 ? (
              latestOffers.map((offer: any, i: number) => {
                const isUnread = offer.isRead !== true && offer.okundu !== true && offer.status !== "Okundu";
                return (
                  <Link
                    key={offer._id || i}
                    href="/admin/teklifler"
                    className={`flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors ${
                      isUnread ? 'bg-orange-50/50' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        isUnread ? 'bg-orange-100 text-[#FF4D00]' : 'bg-slate-100 text-slate-400'
                      }`}>
                        {isUnread ? <Bell size={16} /> : <Inbox size={16} />}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">
                          {offer.fullName || offer.adSoyad || offer.name || "İsimsiz"}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {offer.productName || offer.secim || offer.konu || "Genel talep"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      <p className="text-xs text-slate-400">
                        {offer.createdAt
                          ? new Date(offer.createdAt).toLocaleDateString('tr-TR')
                          : '—'}
                      </p>
                      {isUnread && (
                        <span className="inline-block mt-1 text-[10px] font-medium text-[#FF4D00]">Yeni</span>
                      )}
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="p-8 text-center text-sm text-slate-400">Henüz teklif talebi yok.</div>
            )}
          </div>
        </div>

        {/* Quick actions + system info */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h2 className="text-sm font-semibold text-slate-900 mb-4">Hızlı İşlemler</h2>
            <div className="space-y-2">
              {quickActions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-lg border border-slate-200 text-sm text-slate-700 hover:border-[#FF4D00] hover:text-[#FF4D00] transition-colors group"
                >
                  <span className="flex items-center gap-3">
                    <action.icon size={16} className="text-slate-400 group-hover:text-[#FF4D00]" />
                    {action.label}
                  </span>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 rounded-xl p-6 text-white">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <h2 className="text-sm font-semibold">Sistem Durumu</h2>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Veritabanı</span>
                <span className="text-emerald-400 font-medium">Bağlı</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Bülten Aboneleri</span>
                <span className="font-medium">{loading ? '—' : stats.newsletterSubscribers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Toplam Yorum</span>
                <span className="font-medium">{loading ? '—' : stats.totalComments}</span>
              </div>
              <div className="pt-3 border-t border-white/10 text-xs text-slate-500">
                Son güncelleme: {new Date().toLocaleTimeString('tr-TR')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
