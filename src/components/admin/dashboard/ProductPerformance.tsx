"use client";

import React from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { DashboardCard, CardHead } from "./DashboardCard";
import DashboardEmptyState from "./DashboardEmptyState";
import type { ProductPerformanceItem } from "@/lib/admin-dashboard-types";

type ProductPerformanceProps = {
    products: ProductPerformanceItem[];
    loading?: boolean;
};

export default function ProductPerformance({ products, loading }: ProductPerformanceProps) {
    const topByOffers = [...products].sort((a, b) => b.quoteCount - a.quoteCount).slice(0, 5);
    const chartData = products.slice(0, 8);

    if (loading) {
        return (
            <DashboardCard className="p-8 text-center text-sm text-slate-400">Yükleniyor...</DashboardCard>
        );
    }

    if (products.length === 0) {
        return (
            <DashboardCard className="overflow-hidden">
                <CardHead title="Ürün Performansı" description="Katalogdaki ürünler" />
                <DashboardEmptyState
                    title="Henüz ürün kaydı yok"
                    description="Ürün eklediğinizde performans verileri burada görünecek."
                />
            </DashboardCard>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <DashboardCard className="overflow-hidden">
                <CardHead
                    title="Ürün Performansı"
                    description={
                        products.some((p) => p.views > 0)
                            ? "Görüntülenme vs. teklif"
                            : "Teklif sayıları (görüntülenme takibi kurulmamış)"
                    }
                />
                <div className="px-2 pb-4 h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={chartData}
                            layout="vertical"
                            margin={{ top: 4, right: 16, left: 8, bottom: 0 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                            <XAxis type="number" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
                            <YAxis
                                type="category"
                                dataKey="name"
                                tickLine={false}
                                axisLine={false}
                                tick={{ fontSize: 11, fill: "#64748b" }}
                                width={80}
                            />
                            <Tooltip
                                cursor={{ fill: "rgba(148,163,184,0.1)" }}
                                contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
                            />
                            {products.some((p) => p.views > 0) && (
                                <Bar dataKey="views" name="Görüntülenme" radius={[0, 6, 6, 0]} fill="#0B1736" barSize={12} />
                            )}
                            <Bar dataKey="quoteCount" name="Teklif" radius={[0, 6, 6, 0]} fill="#FF6B00" barSize={12} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </DashboardCard>

            <DashboardCard className="overflow-hidden">
                <CardHead title="En Çok Teklif Alan Ürünler" description="Gerçek teklif verileri" />
                <div className="px-5 pb-5 space-y-2.5 pt-1">
                    {topByOffers.map((p, i) => (
                        <div
                            key={p.id}
                            className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50"
                        >
                            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-white dark:bg-slate-900 text-[12px] font-bold text-slate-500 shadow-sm shrink-0">
                                {i + 1}
                            </span>
                            <div className="flex-1 min-w-0">
                                <p className="text-[14px] font-semibold text-slate-800 dark:text-slate-200 truncate">{p.name}</p>
                                <p className="text-[12px] text-slate-400">
                                    {p.views > 0
                                        ? `${p.views.toLocaleString("tr-TR")} görüntülenme`
                                        : "Görüntülenme takibi yok"}
                                </p>
                            </div>
                            <div className="text-right shrink-0">
                                <p className="text-[14px] font-bold text-slate-900 dark:text-white tabular-nums">{p.quoteCount}</p>
                                {p.views > 0 && (
                                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">%{p.conversion}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </DashboardCard>
        </div>
    );
}
