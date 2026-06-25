"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Package,
    MessageSquare,
    SlidersHorizontal,
    Users,
    Newspaper,
    Inbox,
    Megaphone,
    Mail,
    Sparkles,
    BarChart3,
    Share2,
    Globe,
    AlertCircle,
    RefreshCw,
} from "lucide-react";
import { getAdminSession, ROLE_LABELS } from "@/lib/adminPermissions";
import { normalizeTeklif } from "@/lib/teklifNormalizer";
import { useAdminNotifications, useAdminStats } from "@/hooks/admin/useAdminData";
import StatsCard from "@/components/admin/dashboard/StatsCard";
import { SectionHeading } from "@/components/admin/dashboard/DashboardCard";
import AnalyticsChart from "@/components/admin/dashboard/AnalyticsChart";
import SocialMediaSection from "@/components/admin/dashboard/SocialMediaCard";
import CampaignPerformance from "@/components/admin/dashboard/CampaignPerformance";
import ProductPerformance from "@/components/admin/dashboard/ProductPerformance";
import OfferCenter from "@/components/admin/dashboard/OfferCenter";
import BlogPerformance from "@/components/admin/dashboard/BlogPerformance";
import CustomerMap from "@/components/admin/dashboard/CustomerMap";
import SeoHealth from "@/components/admin/dashboard/SeoHealth";
import SystemStatus from "@/components/admin/dashboard/SystemStatus";
import QuickActions from "@/components/admin/dashboard/QuickActions";

export default function DashboardPage() {
    const [session, setSession] = useState<ReturnType<typeof getAdminSession>>(null);
    const {
        data: statsData,
        isLoading: statsLoading,
        isError: statsError,
        refetch: refetchStats,
    } = useAdminStats();
    const { data: notifications, isLoading: notificationsLoading } = useAdminNotifications();

    useEffect(() => {
        setSession(getAdminSession());
    }, []);

    const stats = statsData?.stats ?? {
        totalProducts: 0,
        totalQuotes: 0,
        unreadQuotes: 0,
        activeSlides: 0,
        pendingComments: 0,
        totalComments: 0,
        newsletterSubscribers: 0,
        activeCampaigns: 0,
        totalCampaignLeads: 0,
        unreadCampaignLeads: 0,
        totalBlogs: 0,
        publishedBlogs: 0,
        quotesThisMonth: 0,
        quotesLastMonth: 0,
        quotesDelta: 0,
    };
    const loading = statsLoading || notificationsLoading;

    const latestOffers = useMemo(
        () =>
            (notifications?.latestOffers ?? []).map((offer) =>
                normalizeTeklif(offer as Record<string, unknown>)
            ),
        [notifications?.latestOffers]
    );

    // Not: KPI sayıları /api/admin/stats üzerinden gerçek verilerdir.
    // delta yalnızca gerçek hesaplanan değer (teklif) için gösterilir; uydurma artış/azalış yok.
    const kpiCards: {
        label: string;
        value: number;
        description: string;
        icon: typeof Package;
        gradient: string;
        href: string;
        delta?: number;
        pulse?: boolean;
    }[] = [
        { label: "Toplam Ürün", value: stats.totalProducts, description: "Katalogdaki ürünler", icon: Package, gradient: "from-blue-500 to-blue-600", href: "/admin/urunler" },
        { label: "Aktif Slider", value: stats.activeSlides, description: "Yayındaki görseller", icon: SlidersHorizontal, gradient: "from-violet-500 to-violet-600", href: "/admin/slider" },
        { label: "Aktif Kampanya", value: stats.activeCampaigns, description: "Yayında olan kampanyalar", icon: Megaphone, gradient: "from-rose-500 to-rose-600", href: "/admin/campaigns" },
        { label: "Gelen Teklif", value: stats.totalQuotes, description: "Toplam teklif talebi", icon: Inbox, gradient: "from-cyan-500 to-cyan-600", href: "/admin/teklifler", delta: stats.quotesDelta },
        { label: "Okunmamış Teklif", value: stats.unreadQuotes, description: "Bekleyen talepler", icon: MessageSquare, gradient: stats.unreadQuotes > 0 ? "from-orange-500 to-orange-600" : "from-emerald-500 to-emerald-600", href: "/admin/teklifler", pulse: stats.unreadQuotes > 0 },
        { label: "Kampanya Talepleri", value: stats.totalCampaignLeads, description: `${stats.unreadCampaignLeads} okunmamış`, icon: Mail, gradient: "from-teal-500 to-teal-600", href: "/admin/campaign-leads" },
        { label: "Bekleyen Yorum", value: stats.pendingComments, description: `${stats.totalComments} toplam yorum`, icon: Users, gradient: "from-amber-500 to-amber-600", href: "/admin/gorusler" },
        { label: "Blog Yazısı", value: stats.totalBlogs, description: `${stats.publishedBlogs} yayında`, icon: Newspaper, gradient: "from-indigo-500 to-indigo-600", href: "/admin/blog" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="space-y-10 pb-4"
        >
            {/* Welcome header */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-1"
            >
                <div className="flex items-center gap-2 text-[#FF6B00]">
                    <Sparkles size={16} />
                    <span className="text-xs font-semibold uppercase tracking-widest">Yönetim Merkezi</span>
                </div>
                <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900 dark:text-white tracking-tight">
                    Merhaba, {session?.displayName?.split(" ")[0] || "Admin"} 👋
                </h1>
                <p className="text-[15px] text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
                    Temren Makina kontrol paneline genel bakış.
                    {stats.unreadQuotes > 0 && (
                        <Link href="/admin/teklifler" className="ml-1 font-semibold text-[#FF6B00] hover:underline">
                            {stats.unreadQuotes} yeni teklif bekliyor.
                        </Link>
                    )}
                </p>
                {session?.role && <p className="text-xs text-slate-400">{ROLE_LABELS[session.role]}</p>}
            </motion.div>

            {/* Error state — gerçek veriler çekilemedi (ör. oturum süresi doldu) */}
            {statsError && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-red-200 bg-red-50 dark:border-red-500/30 dark:bg-red-500/10 px-5 py-4">
                    <div className="flex items-start gap-3">
                        <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-red-100 dark:bg-red-500/20 text-red-600 shrink-0">
                            <AlertCircle size={18} />
                        </span>
                        <div>
                            <p className="text-[14px] font-semibold text-red-800 dark:text-red-300">
                                Veriler yüklenemedi
                            </p>
                            <p className="text-[13px] text-red-600/90 dark:text-red-400/90">
                                Oturumunuz sona ermiş olabilir. Tekrar deneyin veya yeniden giriş yapın.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                        <button
                            onClick={() => refetchStats()}
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 text-[13px] font-semibold text-red-700 dark:text-red-300 border border-red-200 dark:border-red-500/30 hover:bg-red-50 transition-colors"
                        >
                            <RefreshCw size={14} /> Tekrar dene
                        </button>
                        <Link
                            href="/admin/login"
                            className="px-3 py-2 rounded-xl bg-red-600 text-white text-[13px] font-semibold hover:bg-red-700 transition-colors"
                        >
                            Giriş yap
                        </Link>
                    </div>
                </div>
            )}

            {/* KPI cards */}
            <section>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {kpiCards.map((card, i) => (
                        <StatsCard
                            key={card.label}
                            label={card.label}
                            value={card.value}
                            description={card.description}
                            icon={card.icon}
                            gradient={card.gradient}
                            href={card.href}
                            delta={card.delta}
                            pulse={card.pulse}
                            loading={loading}
                            index={i}
                        />
                    ))}
                </div>
            </section>

            {/* Website analytics */}
            <section>
                <SectionHeading
                    title="Website Analytics"
                    description="Site trafiği ve ziyaretçi analizi (demo veri)"
                    icon={<BarChart3 size={18} />}
                />
                <AnalyticsChart />
            </section>

            {/* Offer center */}
            <section>
                <SectionHeading
                    title="Teklif Merkezi"
                    description="Gelen talepler ve dağılım"
                    icon={<Inbox size={18} />}
                />
                <OfferCenter offers={latestOffers} loading={loading} />
            </section>

            {/* Campaign performance */}
            <section>
                <SectionHeading
                    title="Kampanya Performansı"
                    description="Görüntülenme, talep ve dönüşüm"
                    icon={<Megaphone size={18} />}
                />
                <CampaignPerformance activeCampaigns={stats.activeCampaigns} totalLeads={stats.totalCampaignLeads} />
            </section>

            {/* Product performance */}
            <section>
                <SectionHeading
                    title="Ürün Performansı"
                    description="En çok görüntülenen ve teklif alan ürünler"
                    icon={<Package size={18} />}
                />
                <ProductPerformance />
            </section>

            {/* Blog + Customer map */}
            <section>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <BlogPerformance totalBlogs={stats.totalBlogs} publishedBlogs={stats.publishedBlogs} />
                    <CustomerMap />
                </div>
            </section>

            {/* Social media */}
            <section>
                <SectionHeading
                    title="Social Media Analytics"
                    description="Platform takipçi ve etkileşim verileri (demo)"
                    icon={<Share2 size={18} />}
                />
                <SocialMediaSection />
            </section>

            {/* SEO + System + Quick actions */}
            <section>
                <SectionHeading
                    title="Sistem & Hızlı İşlemler"
                    description="Site sağlığı, sunucu durumu ve kısayollar"
                    icon={<Globe size={18} />}
                />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <SeoHealth />
                    <SystemStatus />
                    <QuickActions />
                </div>
            </section>
        </motion.div>
    );
}
