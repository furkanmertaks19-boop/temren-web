"use client";

import React, { useCallback, useEffect, useState } from "react";
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
import { AlertCircle, Clock, Eye, FileText, RefreshCw, TrendingUp, Users } from "lucide-react";
import { DashboardCard, CardHead } from "./DashboardCard";
import DashboardEmptyState from "./DashboardEmptyState";
import type { GaAnalyticsData } from "@/lib/analytics-types";
import { formatDuration } from "@/lib/analytics-types";
import { cn } from "@/lib/utils";

const ACCENT = "#FF6B00";

export type AnalyticsLoadStatus = "loading" | "success" | "error" | "empty";

type AnalyticsState =
    | { status: "loading" }
    | { status: "error"; message: string }
    | { status: "empty" }
    | { status: "success"; data: GaAnalyticsData };

type AnalyticsChartProps = {
    onStatusChange?: (status: AnalyticsLoadStatus) => void;
};

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
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

function AnalyticsSkeleton() {
    return (
        <div className="space-y-4 animate-pulse">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <DashboardCard key={i} className="p-4 h-[108px]">
                        <div className="h-3 w-20 bg-slate-100 dark:bg-slate-800 rounded mb-4" />
                        <div className="h-7 w-16 bg-slate-100 dark:bg-slate-800 rounded mb-2" />
                        <div className="h-3 w-12 bg-slate-100 dark:bg-slate-800 rounded" />
                    </DashboardCard>
                ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <DashboardCard className="lg:col-span-2 h-[360px]">
                    <div className="h-full bg-slate-50 dark:bg-slate-800/50 m-5 rounded-xl" />
                </DashboardCard>
                <DashboardCard className="h-[360px]">
                    <div className="h-full bg-slate-50 dark:bg-slate-800/50 m-5 rounded-xl" />
                </DashboardCard>
            </div>
            <DashboardCard className="h-[280px]">
                <div className="h-full bg-slate-50 dark:bg-slate-800/50 m-5 rounded-xl" />
            </DashboardCard>
        </div>
    );
}

function buildMiniCards(data: GaAnalyticsData) {
    return [
        { key: "today", label: "Bugün", icon: Users, value: data.todayUsers, suffix: "ziyaretçi" },
        { key: "week", label: "Bu Hafta", icon: TrendingUp, value: data.weekUsers, suffix: "ziyaretçi" },
        { key: "month", label: "Bu Ay", icon: Eye, value: data.monthUsers, suffix: "ziyaretçi" },
        {
            key: "session",
            label: "Ort. Oturum",
            icon: Clock,
            value: formatDuration(data.averageSessionDuration),
            suffix: "süre",
        },
        {
            key: "views",
            label: "Sayfa Görüntüleme",
            icon: FileText,
            value: data.screenPageViews,
            suffix: "son 30 gün",
        },
    ];
}

export default function AnalyticsChart({ onStatusChange }: AnalyticsChartProps) {
    const [range, setRange] = useState<"daily" | "monthly">("monthly");
    const [state, setState] = useState<AnalyticsState>({ status: "loading" });

    const notifyStatus = useCallback(
        (status: AnalyticsLoadStatus) => {
            onStatusChange?.(status);
        },
        [onStatusChange]
    );

    const loadAnalytics = useCallback(async () => {
        setState({ status: "loading" });
        notifyStatus("loading");

        try {
            const res = await fetch("/api/admin/analytics");
            const json = await res.json();

            if (!res.ok || !json.success) {
                throw new Error(json.error || "Analytics verileri alınamadı.");
            }

            if (json.empty) {
                setState({ status: "empty" });
                notifyStatus("empty");
                return;
            }

            setState({ status: "success", data: json.data });
            notifyStatus("success");
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Analytics verileri alınamadı.";
            setState({ status: "error", message });
            notifyStatus("error");
        }
    }, [notifyStatus]);

    useEffect(() => {
        void loadAnalytics();
    }, [loadAnalytics]);

    if (state.status === "loading") {
        return <AnalyticsSkeleton />;
    }

    if (state.status === "error") {
        return (
            <DashboardCard className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                        <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-red-100 dark:bg-red-500/20 text-red-600 shrink-0">
                            <AlertCircle size={18} />
                        </span>
                        <div>
                            <p className="text-[14px] font-semibold text-red-800 dark:text-red-300">
                                Google Analytics bağlantı hatası
                            </p>
                            <p className="text-[13px] text-red-600/90 dark:text-red-400/90">{state.message}</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => void loadAnalytics()}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 text-[13px] font-semibold text-red-700 dark:text-red-300 border border-red-200 dark:border-red-500/30 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors shrink-0"
                    >
                        <RefreshCw size={14} /> Tekrar dene
                    </button>
                </div>
            </DashboardCard>
        );
    }

    if (state.status === "empty") {
        return (
            <DashboardCard>
                <DashboardEmptyState
                    title="Henüz analytics verisi yok"
                    description="Google Analytics property'nizde henüz ziyaretçi verisi bulunmuyor. Trafik geldikçe burada görünecek."
                />
            </DashboardCard>
        );
    }

    const { data } = state;
    const chartData = range === "daily" ? data.dailyUsers : data.monthlyUsers;
    const miniCards = buildMiniCards(data);
    const hasChartData = chartData.some((point) => point.value > 0);

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                {miniCards.map((card) => (
                    <DashboardCard key={card.key} hover className="p-4">
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
                <DashboardCard className="lg:col-span-2 overflow-hidden">
                    <CardHead
                        title="Ziyaretçi Grafiği"
                        description={`Aktif kullanıcı · ${data.activeUsers.toLocaleString("tr-TR")} (son 30 gün)`}
                        action={
                            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800">
                                {(["daily", "monthly"] as const).map((r) => (
                                    <button
                                        key={r}
                                        type="button"
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
                    {hasChartData ? (
                        <div className="px-2 pb-4 h-[280px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
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
                                    <Tooltip
                                        content={<ChartTooltip />}
                                        cursor={{ stroke: ACCENT, strokeWidth: 1, strokeDasharray: "4 4" }}
                                    />
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
                    ) : (
                        <DashboardEmptyState
                            title="Grafik verisi yok"
                            description="Seçilen dönemde ziyaretçi verisi bulunamadı."
                            className="py-8"
                        />
                    )}
                </DashboardCard>

                <DashboardCard className="overflow-hidden">
                    <CardHead title="Trafik Kaynakları" description="Son 30 gün" />
                    {data.trafficSources.length > 0 ? (
                        <div className="px-5 pb-5">
                            <div className="h-[170px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={data.trafficSources}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={48}
                                            outerRadius={72}
                                            paddingAngle={3}
                                            stroke="none"
                                        >
                                            {data.trafficSources.map((s) => (
                                                <Cell key={s.name} fill={s.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            formatter={(value, name) => [`%${value}`, name as string]}
                                            contentStyle={{
                                                borderRadius: 12,
                                                border: "none",
                                                boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                                            }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="space-y-2 mt-3">
                                {data.trafficSources.map((s) => (
                                    <div key={s.name} className="flex items-center justify-between text-[13px]">
                                        <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                                            <span className="size-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                                            {s.name}
                                        </span>
                                        <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                                            %{s.value.toLocaleString("tr-TR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <DashboardEmptyState
                            title="Trafik kaynağı verisi yok"
                            description="Son 30 günde kaynak dağılımı henüz oluşmadı."
                            className="py-8"
                        />
                    )}
                </DashboardCard>
            </div>

            <DashboardCard className="overflow-hidden">
                <CardHead title="En Çok Ziyaret Edilen Sayfalar" description="Son 30 gün" />
                {data.topPages.length > 0 ? (
                    <div className="px-5 pb-5 space-y-3">
                        {data.topPages.map((page) => (
                            <div key={`${page.path}-${page.title}`}>
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
                ) : (
                    <DashboardEmptyState
                        title="Sayfa verisi yok"
                        description="Son 30 günde sayfa görüntüleme verisi bulunamadı."
                        className="py-8"
                    />
                )}
            </DashboardCard>
        </div>
    );
}
