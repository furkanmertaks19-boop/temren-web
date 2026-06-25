"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Clock, Inbox, FileText, ArrowUpRight } from "lucide-react";
import { DashboardCard, CardHead } from "./DashboardCard";
import DashboardEmptyState from "./DashboardEmptyState";
import type { BlogPerformanceData } from "@/lib/admin-dashboard-types";

type BlogPerformanceProps = {
    data: BlogPerformanceData;
    loading?: boolean;
};

export default function BlogPerformance({ data, loading }: BlogPerformanceProps) {
    const miniStats = [
        {
            label: "Ort. Okuma",
            value: data.avgReadMinutes !== null ? `${data.avgReadMinutes} dk` : "Veri yok",
            icon: Clock,
            tint: "text-blue-500",
        },
        { label: "Blogdan Teklif", value: data.leadsFromBlog, icon: Inbox, tint: "text-emerald-500" },
        { label: "Yayında", value: data.publishedCount, icon: BookOpen, tint: "text-[#FF6B00]" },
        { label: "Taslak", value: data.draftCount, icon: FileText, tint: "text-slate-400" },
    ];

    if (loading) {
        return (
            <DashboardCard className="p-8 text-center text-sm text-slate-400">Yükleniyor...</DashboardCard>
        );
    }

    return (
        <DashboardCard className="overflow-hidden h-full">
            <CardHead
                title="Blog Performansı"
                description="Yayındaki ve taslak blog yazıları"
                action={
                    <Link
                        href="/admin/blog"
                        className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#FF6B00] hover:text-orange-700"
                    >
                        Yönet <ArrowUpRight size={14} />
                    </Link>
                }
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-5 pb-4">
                {miniStats.map((s) => (
                    <div key={s.label} className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-3">
                        <s.icon size={16} className={s.tint} />
                        <p className="text-lg font-bold text-slate-900 dark:text-white tabular-nums mt-2">{s.value}</p>
                        <p className="text-[11px] text-slate-400">{s.label}</p>
                    </div>
                ))}
            </div>

            {data.recentPosts.length > 0 ? (
                <div className="px-5 pb-5 space-y-2.5">
                    {data.recentPosts.map((post, i) => (
                        <div key={post.id} className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 text-[12px] font-bold text-slate-500 shrink-0">
                                {i + 1}
                            </span>
                            <div className="flex-1 min-w-0">
                                <p className="text-[14px] font-semibold text-slate-800 dark:text-slate-200 truncate">
                                    {post.title}
                                </p>
                                <p className="text-[12px] text-slate-400">
                                    {post.isPublished ? "Yayında" : "Taslak"}
                                    {post.readMinutes !== null ? ` · ${post.readMinutes} dk` : ""}
                                </p>
                            </div>
                            <span className="text-[13px] font-bold text-slate-900 dark:text-white tabular-nums shrink-0">
                                {data.hasViewTracking && post.views > 0
                                    ? post.views.toLocaleString("tr-TR")
                                    : post.views === 0
                                      ? "—"
                                      : post.views.toLocaleString("tr-TR")}
                            </span>
                        </div>
                    ))}
                </div>
            ) : (
                <DashboardEmptyState
                    title="Henüz blog yazısı yok"
                    description="İlk blog yazınızı eklediğinizde burada listelenecek."
                />
            )}
        </DashboardCard>
    );
}
