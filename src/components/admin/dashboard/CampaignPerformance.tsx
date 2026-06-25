"use client";

import React from "react";
import Link from "next/link";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { Megaphone, Eye, Inbox, Clock, ArrowUpRight } from "lucide-react";
import { DashboardCard, CardHead } from "./DashboardCard";
import { campaignPerformance } from "@/lib/admin-dashboard-data";

type CampaignPerformanceProps = {
    activeCampaigns?: number;
    totalLeads?: number;
};

export default function CampaignPerformance({ activeCampaigns = 0, totalLeads = 0 }: CampaignPerformanceProps) {
    const highlights = [
        {
            label: "Aktif Kampanya",
            value: activeCampaigns,
            icon: Megaphone,
            tint: "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400",
        },
        {
            label: "Toplam Talep",
            value: totalLeads,
            icon: Inbox,
            tint: "bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400",
        },
        {
            label: "Süresi Yaklaşan",
            value: 2,
            icon: Clock,
            tint: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
        },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <DashboardCard className="lg:col-span-2 overflow-hidden">
                <CardHead
                    title="Kampanya Performansı"
                    description="Görüntülenme / Talep / Dönüşüm"
                    action={
                        <Link
                            href="/admin/campaigns"
                            className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#FF6B00] hover:text-orange-700"
                        >
                            Tümü <ArrowUpRight size={14} />
                        </Link>
                    }
                />
                <div className="px-2 pb-4 h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={campaignPerformance.funnel} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} dy={8} />
                            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} width={44} />
                            <Tooltip
                                cursor={{ fill: "rgba(148,163,184,0.1)" }}
                                contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
                            />
                            <Legend wrapperStyle={{ fontSize: 12 }} iconType="circle" />
                            <Bar dataKey="views" name="Görüntülenme" radius={[6, 6, 0, 0]} fill="#0B1736" barSize={14} />
                            <Bar dataKey="leads" name="Talep" radius={[6, 6, 0, 0]} fill="#FF6B00" barSize={14} />
                            <Bar dataKey="conversions" name="Dönüşüm" radius={[6, 6, 0, 0]} fill="#22c55e" barSize={14} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
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
                    <div className="flex items-start gap-3">
                        <Eye size={16} className="text-[#FF6B00] mt-0.5 shrink-0" />
                        <div className="min-w-0">
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">En Çok Görüntülenen</p>
                            <p className="text-[13px] font-semibold text-slate-800 dark:text-slate-200 truncate">
                                {campaignPerformance.mostViewed.title}
                            </p>
                            <p className="text-[12px] text-slate-400">
                                {campaignPerformance.mostViewed.views.toLocaleString("tr-TR")} görüntülenme
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                        <Inbox size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                        <div className="min-w-0">
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">En Çok Teklif Getiren</p>
                            <p className="text-[13px] font-semibold text-slate-800 dark:text-slate-200 truncate">
                                {campaignPerformance.mostLeads.title}
                            </p>
                            <p className="text-[12px] text-slate-400">{campaignPerformance.mostLeads.leads} teklif</p>
                        </div>
                    </div>
                </DashboardCard>
            </div>
        </div>
    );
}
