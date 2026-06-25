"use client";

import React from "react";
import Link from "next/link";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { ArrowUpRight, ChevronRight, Inbox } from "lucide-react";
import { DashboardCard, CardHead } from "./DashboardCard";
import TeklifStatusBadge from "@/components/admin/TeklifStatusBadge";
import { offersByProduct, offerStatusMix } from "@/lib/admin-dashboard-data";
import type { NormalizedTeklif } from "@/lib/teklifNormalizer";

type OfferCenterProps = {
    offers: NormalizedTeklif[];
    loading?: boolean;
};

export default function OfferCenter({ offers, loading }: OfferCenterProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Recent offers */}
            <DashboardCard className="lg:col-span-2 overflow-hidden">
                <CardHead
                    title="Teklif Merkezi"
                    description="Son gelen talepler"
                    action={
                        <Link
                            href="/admin/teklifler"
                            className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#FF6B00] hover:text-orange-700"
                        >
                            Tümü <ArrowUpRight size={14} />
                        </Link>
                    }
                />
                {loading ? (
                    <div className="py-16 text-center text-sm text-slate-400">Yükleniyor...</div>
                ) : offers.length > 0 ? (
                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                        {offers.map((offer) => (
                            <Link
                                key={offer._id}
                                href="/admin/teklifler"
                                className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors group"
                            >
                                <div className="flex-1 min-w-0">
                                    <p className="text-[14px] font-semibold text-slate-900 dark:text-white truncate group-hover:text-[#FF6B00] transition-colors">
                                        {offer.adSoyad}
                                    </p>
                                    <p className="text-[13px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                                        {offer.displayProduct}
                                    </p>
                                </div>
                                <p className="text-[12px] text-slate-400 hidden md:block shrink-0">
                                    {new Date(offer.createdAt).toLocaleDateString("tr-TR", { day: "numeric", month: "short" })}
                                </p>
                                <TeklifStatusBadge status={offer.status} />
                                <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-400 shrink-0" />
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center py-16 text-center">
                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 mb-3">
                            <Inbox size={28} className="text-slate-300" />
                        </div>
                        <p className="text-sm text-slate-500">Henüz teklif talebi yok.</p>
                    </div>
                )}
            </DashboardCard>

            <div className="space-y-4">
                {/* Offers by product */}
                <DashboardCard className="overflow-hidden">
                    <CardHead title="Ürün Bazlı Teklif" description="Dağılım" />
                    <div className="px-5 pb-5">
                        <div className="h-[150px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={offersByProduct}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={42}
                                        outerRadius={64}
                                        paddingAngle={3}
                                        stroke="none"
                                    >
                                        {offersByProduct.map((s) => (
                                            <Cell key={s.name} fill={s.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value, name) => [`${value} teklif`, name as string]}
                                        contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="space-y-1.5 mt-2">
                            {offersByProduct.map((s) => (
                                <div key={s.name} className="flex items-center justify-between text-[12px]">
                                    <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                                        <span className="size-2 rounded-full" style={{ backgroundColor: s.color }} />
                                        {s.name}
                                    </span>
                                    <span className="font-semibold text-slate-900 dark:text-white tabular-nums">{s.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </DashboardCard>

                {/* Offer status mix */}
                <DashboardCard className="p-5">
                    <h3 className="text-[15px] font-bold text-slate-900 dark:text-white mb-3">Teklif Durumları</h3>
                    <div className="space-y-2.5">
                        {offerStatusMix.map((s) => (
                            <div key={s.name}>
                                <div className="flex items-center justify-between mb-1 text-[12px]">
                                    <span className="text-slate-600 dark:text-slate-300">{s.name}</span>
                                    <span className="font-semibold text-slate-900 dark:text-white tabular-nums">%{s.value}</span>
                                </div>
                                <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                    <div className="h-full rounded-full" style={{ width: `${s.value}%`, backgroundColor: s.color }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </DashboardCard>
            </div>
        </div>
    );
}
