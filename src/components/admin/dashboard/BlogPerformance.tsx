"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Clock, Inbox, FileText, ArrowUpRight } from "lucide-react";
import { DashboardCard, CardHead } from "./DashboardCard";
import { blogPerformance } from "@/lib/admin-dashboard-data";

type BlogPerformanceProps = {
    totalBlogs?: number;
    publishedBlogs?: number;
};

export default function BlogPerformance({ totalBlogs = 0, publishedBlogs = 0 }: BlogPerformanceProps) {
    const draftCount = Math.max(totalBlogs - publishedBlogs, 0);

    const miniStats = [
        { label: "Ort. Okuma", value: `${blogPerformance.avgReadMinutes} dk`, icon: Clock, tint: "text-blue-500" },
        { label: "Blogdan Teklif", value: blogPerformance.leadsFromBlog, icon: Inbox, tint: "text-emerald-500" },
        { label: "Yayında", value: publishedBlogs, icon: BookOpen, tint: "text-[#FF6B00]" },
        { label: "Taslak", value: draftCount, icon: FileText, tint: "text-slate-400" },
    ];

    return (
        <DashboardCard className="overflow-hidden">
            <CardHead
                title="Blog Performansı"
                description="En çok okunan yazılar"
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

            <div className="px-5 pb-5 space-y-2.5">
                {blogPerformance.topPosts.map((post, i) => (
                    <div key={post.title} className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 text-[12px] font-bold text-slate-500 shrink-0">
                            {i + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                            <p className="text-[14px] font-semibold text-slate-800 dark:text-slate-200 truncate">{post.title}</p>
                            <p className="text-[12px] text-slate-400">{post.minutes} dk okuma</p>
                        </div>
                        <span className="text-[13px] font-bold text-slate-900 dark:text-white tabular-nums shrink-0">
                            {post.reads.toLocaleString("tr-TR")}
                        </span>
                    </div>
                ))}
            </div>
        </DashboardCard>
    );
}
