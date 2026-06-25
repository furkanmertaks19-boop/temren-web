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
import { productPerformance } from "@/lib/admin-dashboard-data";

export default function ProductPerformance() {
    const topByOffers = [...productPerformance].sort((a, b) => b.offers - a.offers).slice(0, 5);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <DashboardCard className="overflow-hidden">
                <CardHead title="Ürün Performansı" description="Görüntülenme vs. Teklif" />
                <div className="px-2 pb-4 h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={productPerformance}
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
                                tick={{ fontSize: 12, fill: "#64748b" }}
                                width={70}
                            />
                            <Tooltip
                                cursor={{ fill: "rgba(148,163,184,0.1)" }}
                                contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
                            />
                            <Bar dataKey="views" name="Görüntülenme" radius={[0, 6, 6, 0]} fill="#0B1736" barSize={12} />
                            <Bar dataKey="offers" name="Teklif" radius={[0, 6, 6, 0]} fill="#FF6B00" barSize={12} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </DashboardCard>

            <DashboardCard className="overflow-hidden">
                <CardHead title="En Çok Teklif Alan Ürünler" description="Dönüşüm oranı ile" />
                <div className="px-5 pb-5 space-y-2.5 pt-1">
                    {topByOffers.map((p, i) => (
                        <div
                            key={p.name}
                            className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50"
                        >
                            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-white dark:bg-slate-900 text-[12px] font-bold text-slate-500 shadow-sm shrink-0">
                                {i + 1}
                            </span>
                            <div className="flex-1 min-w-0">
                                <p className="text-[14px] font-semibold text-slate-800 dark:text-slate-200 truncate">{p.name}</p>
                                <p className="text-[12px] text-slate-400">{p.views.toLocaleString("tr-TR")} görüntülenme</p>
                            </div>
                            <div className="text-right shrink-0">
                                <p className="text-[14px] font-bold text-slate-900 dark:text-white tabular-nums">{p.offers}</p>
                                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">%{p.conversion}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </DashboardCard>
        </div>
    );
}
