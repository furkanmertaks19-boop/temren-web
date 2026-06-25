"use client";

import React from "react";
import Link from "next/link";
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { Megaphone, Inbox, Clock, ArrowUpRight } from "lucide-react";
import { DashboardCard, CardHead } from "./DashboardCard";
import DashboardEmptyState from "./DashboardEmptyState";
import type { CampaignPerformanceData } from "@/lib/admin-dashboard-types";

type CampaignPerformanceProps = {
    data: CampaignPerformanceData;
    loading?: boolean;
};

export default function CampaignPerformance({ data, loading }: CampaignPerformanceProps) {
    const chartData = data.campaigns
        .filter((c) => c.leadCount > 0)
        .slice(0, 8)
        .map((c) => ({
            label: c.title.length > 18 ? `${c.title.slice(0, 18)}…` : c.title,
            leads: c.leadCount,
            views: c.views,
        }));

    const topByLeads = data.campaigns.find((c) => c.leadCount > 0);
    const topByViews = data.campaigns.find((c) => c.views > 0);

    const highlights = [
        {
            label: "Aktif Kampanya",
            value: data.activeCount,
            icon: Megaphone,
            tint: "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400",
        },
        {
            label: "Toplam Talep",
            value: data.totalLeads,
            icon: Inbox,
            tint: "bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400",
        },
        {
            label: "Süresi Yaklaşan",
            value: data.expiringSoonCount,
            icon: Clock,
            tint: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
        },
    ];

    if (loading) {
        return (
            <DashboardCard className="p-8 text-center text-sm text-slate-400">Yükleniyor...</DashboardCard>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <DashboardCard className="lg:col-span-2 overflow-hidden">
                <CardHead
                    title="Kampanya Performansı"
                    description="Kampanya bazlı talep sayıları"
                    action={
                        <Link
                            href="/admin/campaigns"
                            className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#FF6B00] hover:text-orange-700"
                        >
                            Tümü <ArrowUpRight size={14} />
                        </Link>
                    }
                />
                {chartData.length > 0 ? (
                    <div className="px-2 pb-4 h-[280px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} dy={8} />
                                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} width={44} />
                                <Tooltip
                                    cursor={{ fill: "rgba(148,163,184,0.1)" }}
                                    contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
                                />
                                <Bar dataKey="leads" name="Talep" radius={[6, 6, 0, 0]} fill="#FF6B00" barSize={28} />
                                {data.hasViewTracking && (
                                    <Bar dataKey="views" name="Görüntülenme" radius={[6, 6, 0, 0]} fill="#0B1736" barSize={28} />
                                )}
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <DashboardEmptyState
                        title="Henüz kampanya talebi yok"
                        description="Kampanya oluşturup talep aldığınızda grafik burada görünecek."
                    />
                )}
            </DashboardCard>

            <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                    {highlights.map((h) => (
                        <DashboardCard key={h.label} hover className="p-4 flex items-center gap-3">
                            <div className={`flex items-center justify-center w-11 h-11 rounded-xl ${h.tint}`}>
                                <h.icon size={20} />
                            </div>
                            <div>
                                <p className="text-xl font-bold text-slate-900 dark:text-white tabular-nums leading-none">
                                    {h.value}
                                </p>
                                <p className="text-[12px] text-slate-500 dark:text-slate-400 mt-1">{h.label}</p>
                            </div>
                        </DashboardCard>
                    ))}
                </div>

                <DashboardCard className="p-4 space-y-3">
                    {topByLeads ? (
                        <div className="flex items-start gap-3">
                            <Inbox size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                            <div className="min-w-0">
                                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">En Çok Talep</p>
                                <p className="text-[13px] font-semibold text-slate-800 dark:text-slate-200 truncate">
                                    {topByLeads.title}
                                </p>
                                <p className="text-[12px] text-slate-400">{topByLeads.leadCount} talep</p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-[13px] text-slate-400">Henüz kampanya talebi yok.</p>
                    )}
                    {data.hasViewTracking && topByViews && (
                        <div className="flex items-start gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                            <Megaphone size={16} className="text-[#FF6B00] mt-0.5 shrink-0" />
                            <div className="min-w-0">
                                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">En Çok Görüntülenen</p>
                                <p className="text-[13px] font-semibold text-slate-800 dark:text-slate-200 truncate">
                                    {topByViews.title}
                                </p>
                                <p className="text-[12px] text-slate-400">
                                    {topByViews.views.toLocaleString("tr-TR")} görüntülenme
                                </p>
                            </div>
                        </div>
                    )}
                    {!data.hasViewTracking && (
                        <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                            Görüntülenme takibi kurulmamış — yalnızca talep sayıları gösteriliyor.
                        </p>
                    )}
                </DashboardCard>
            </div>
        </div>
    );
}
