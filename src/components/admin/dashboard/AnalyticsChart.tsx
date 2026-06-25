"use client";

import React, { useState } from "react";
import {
    Area,
    AreaChart,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { Eye, Clock, TrendingUp, Users, Target } from "lucide-react";
import { DashboardCard, CardHead } from "./DashboardCard";
import { websiteAnalytics, formatDuration } from "@/lib/admin-dashboard-demo-data";
import { cn } from "@/lib/utils";

const ACCENT = "#FF6B00";

const miniCards = [
    { key: "today", label: "Bugün", icon: Users, value: websiteAnalytics.cards.today, suffix: "ziyaretçi" },
    { key: "week", label: "Bu Hafta", icon: TrendingUp, value: websiteAnalytics.cards.thisWeek, suffix: "ziyaretçi" },
    { key: "month", label: "Bu Ay", icon: Eye, value: websiteAnalytics.cards.thisMonth, suffix: "ziyaretçi" },
    {
        key: "session",
        label: "Ort. Oturum",
        icon: Clock,
        value: formatDuration(websiteAnalytics.cards.avgSessionSeconds),
        suffix: "süre",
    },
    {
        key: "conv",
        label: "Teklif Dönüşümü",
        icon: Target,
        value: `%${websiteAnalytics.cards.conversionRate}`,
        suffix: "oran",
    },
];

function ChartTooltip({ active, payload, label }: any) {
    if (!active || !payload?.length) return null;
    return (
        <div className="rounded-xl bg-slate-900 px-3 py-2 shadow-lg">
            <p className="text-[11px] text-slate-400 mb-0.5">{label}</p>
            <p className="text-[13px] font-bold text-white tabular-nums">
                {payload[0].value.toLocaleString("tr-TR")} ziyaretçi
            </p>
        </div>
    );
}

export default function AnalyticsChart() {
    const [range, setRange] = useState<"daily" | "monthly">("monthly");
    const data = range === "daily" ? websiteAnalytics.dailyVisitors : websiteAnalytics.monthlyVisitors;

    return (
        <div className="space-y-4">
            {/* Mini KPI cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                {miniCards.map((card) => (
                    <DashboardCard key={card.key} hover className="p-4 relative">
                        <span className="absolute top-2 right-2 text-[9px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 dark:bg-amber-500/10 px-1.5 py-0.5 rounded">
                            Demo
                        </span>
                        <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 mb-3">
                            <card.icon size={15} />
                            <span className="text-[11px] font-semibold uppercase tracking-wider">{card.label}</span>
                        </div>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums tracking-tight">
                            {typeof card.value === "number" ? card.value.toLocaleString("tr-TR") : card.value}
                        </p>
                        <p className="text-[12px] text-slate-400 dark:text-slate-500 mt-0.5">{card.suffix}</p>
                    </DashboardCard>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Visitor chart */}
                <DashboardCard className="lg:col-span-2 overflow-hidden">
                    <CardHead
                        title="Ziyaretçi Grafiği"
                        description="Site trafiği genel görünümü"
                        action={
                            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800">
                                {(["daily", "monthly"] as const).map((r) => (
                                    <button
                                        key={r}
                                        onClick={() => setRange(r)}
                                        className={cn(
                                            "px-3 py-1.5 text-[12px] font-semibold rounded-lg transition-all",
                                            range === r
                                                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                                                : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                                        )}
                                    >
                                        {r === "daily" ? "Günlük" : "Aylık"}
                                    </button>
                                ))}
                            </div>
                        }
                    />
                    <div className="px-2 pb-4 h-[280px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="visitorFill" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor={ACCENT} stopOpacity={0.35} />
                                        <stop offset="100%" stopColor={ACCENT} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="label"
                                    tickLine={false}
                                    axisLine={false}
                                    tick={{ fontSize: 12, fill: "#94a3b8" }}
                                    dy={8}
                                />
                                <YAxis
                                    tickLine={false}
                                    axisLine={false}
                                    tick={{ fontSize: 12, fill: "#94a3b8" }}
                                    width={44}
                                />
                                <Tooltip content={<ChartTooltip />} cursor={{ stroke: ACCENT, strokeWidth: 1, strokeDasharray: "4 4" }} />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke={ACCENT}
                                    strokeWidth={2.5}
                                    fill="url(#visitorFill)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </DashboardCard>

                {/* Traffic sources */}
                <DashboardCard className="overflow-hidden">
                    <CardHead title="Trafik Kaynakları" description="Ziyaretçi dağılımı" />
                    <div className="px-5 pb-5">
                        <div className="h-[170px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={websiteAnalytics.trafficSources}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={48}
                                        outerRadius={72}
                                        paddingAngle={3}
                                        stroke="none"
                                    >
                                        {websiteAnalytics.trafficSources.map((s) => (
                                            <Cell key={s.name} fill={s.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value, name) => [`%${value}`, name as string]}
                                        contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="space-y-2 mt-3">
                            {websiteAnalytics.trafficSources.map((s) => (
                                <div key={s.name} className="flex items-center justify-between text-[13px]">
                                    <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                                        <span className="size-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                                        {s.name}
                                    </span>
                                    <span className="font-semibold text-slate-900 dark:text-white tabular-nums">%{s.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </DashboardCard>
            </div>

            {/* Top pages */}
            <DashboardCard className="overflow-hidden">
                <CardHead title="En Çok Ziyaret Edilen Sayfalar" description="Son 30 gün" />
                <div className="px-5 pb-5 space-y-3">
                    {websiteAnalytics.topPages.map((page) => (
                        <div key={page.path}>
                            <div className="flex items-center justify-between mb-1.5">
                                <div className="min-w-0">
                                    <p className="text-[13px] font-semibold text-slate-800 dark:text-slate-200 truncate">
                                        {page.title}
                                    </p>
                                    <p className="text-[11px] text-slate-400 truncate">{page.path}</p>
                                </div>
                                <span className="text-[13px] font-bold text-slate-900 dark:text-white tabular-nums shrink-0 ml-3">
                                    {page.views.toLocaleString("tr-TR")}
                                </span>
                            </div>
                            <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-[#FF6B00] to-orange-400"
                                    style={{ width: `${page.share}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </DashboardCard>
        </div>
    );
}
