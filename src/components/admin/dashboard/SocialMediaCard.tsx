"use client";

import React from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { Instagram, Linkedin, Youtube, Facebook, Twitter, ArrowUpRight, type LucideIcon } from "lucide-react";
import { DashboardCard, CardHead } from "./DashboardCard";
import { socialPlatforms, socialFollowerGrowth, topSocialPosts } from "@/lib/admin-dashboard-data";

const PLATFORM_ICON: Record<string, LucideIcon> = {
    instagram: Instagram,
    linkedin: Linkedin,
    youtube: Youtube,
    facebook: Facebook,
    twitter: Twitter,
};

function formatFollowers(n: number): string {
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
    return String(n);
}

export default function SocialMediaSection() {
    const engagementData = socialPlatforms.map((p) => ({ name: p.name.split(" ")[0], value: p.engagement, color: p.color }));

    return (
        <div className="space-y-4">
            {/* Platform cards */}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {socialPlatforms.map((p, i) => {
                    const Icon = PLATFORM_ICON[p.key];
                    return (
                        <DashboardCard key={p.key} hover delay={i * 0.04} className="p-4">
                            <div className="flex items-center justify-between mb-3">
                                <div
                                    className="flex items-center justify-center w-10 h-10 rounded-xl text-white shadow-sm"
                                    style={{ backgroundColor: p.color }}
                                >
                                    {Icon && <Icon size={18} />}
                                </div>
                                <span className="inline-flex items-center gap-0.5 px-2 py-1 rounded-lg text-[11px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                                    <ArrowUpRight size={12} />
                                    {p.growth30d}%
                                </span>
                            </div>
                            <p className="text-xl font-bold text-slate-900 dark:text-white tabular-nums">
                                {formatFollowers(p.followers)}
                            </p>
                            <p className="text-[12px] font-semibold text-slate-600 dark:text-slate-300">{p.name}</p>
                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
                                <span>{p.posts} gönderi</span>
                                <span className="font-semibold text-slate-600 dark:text-slate-300">%{p.engagement} etkileşim</span>
                            </div>
                        </DashboardCard>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Follower growth */}
                <DashboardCard className="overflow-hidden">
                    <CardHead title="Takipçi Büyümesi" description="Son 7 ay (Instagram, LinkedIn, Facebook)" />
                    <div className="px-2 pb-4 h-[260px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={socialFollowerGrowth} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} dy={8} />
                                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} width={44} />
                                <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }} />
                                <Line type="monotone" dataKey="instagram" stroke="#E1306C" strokeWidth={2.5} dot={false} name="Instagram" />
                                <Line type="monotone" dataKey="linkedin" stroke="#0A66C2" strokeWidth={2.5} dot={false} name="LinkedIn" />
                                <Line type="monotone" dataKey="facebook" stroke="#1877F2" strokeWidth={2.5} dot={false} name="Facebook" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </DashboardCard>

                {/* Engagement by platform */}
                <DashboardCard className="overflow-hidden">
                    <CardHead title="Platform Bazlı Etkileşim" description="Ortalama etkileşim oranı (%)" />
                    <div className="px-2 pb-4 h-[260px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={engagementData} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} dy={8} />
                                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} width={36} />
                                <Tooltip
                                    cursor={{ fill: "rgba(148,163,184,0.1)" }}
                                    formatter={(value) => [`%${value}`, "Etkileşim"]}
                                    contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
                                />
                                <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#FF6B00" barSize={34} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </DashboardCard>
            </div>

            {/* Top posts */}
            <DashboardCard className="overflow-hidden">
                <CardHead title="En İyi Performans Gösteren Gönderiler" description="Erişim ve etkileşime göre" />
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {topSocialPosts.map((post) => (
                        <div key={post.title} className="flex items-center gap-4 px-5 py-3.5">
                            <div className="flex-1 min-w-0">
                                <p className="text-[14px] font-semibold text-slate-800 dark:text-slate-200 truncate">{post.title}</p>
                                <p className="text-[12px] text-slate-400">{post.platform}</p>
                            </div>
                            <div className="text-right shrink-0">
                                <p className="text-[13px] font-bold text-slate-900 dark:text-white tabular-nums">
                                    {post.reach.toLocaleString("tr-TR")}
                                </p>
                                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">%{post.engagement} etkileşim</p>
                            </div>
                        </div>
                    ))}
                </div>
            </DashboardCard>
        </div>
    );
}
