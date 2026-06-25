"use client";

import React from "react";
import Link from "next/link";
import {
    Megaphone,
    Newspaper,
    Plus,
    SlidersHorizontal,
    Navigation,
    Images,
    Inbox,
    ExternalLink,
    type LucideIcon,
} from "lucide-react";
import { DashboardCard, CardHead } from "./DashboardCard";

type QuickAction = {
    label: string;
    href: string;
    icon: LucideIcon;
    color: string;
    bg: string;
    external?: boolean;
};

const ACTIONS: QuickAction[] = [
    { label: "Kampanya Oluştur", href: "/admin/campaigns?create=true", icon: Megaphone, color: "text-[#FF6B00]", bg: "bg-orange-50 dark:bg-orange-500/10" },
    { label: "Yeni Blog Yazısı", href: "/admin/blog", icon: Newspaper, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-500/10" },
    { label: "Ürün Ekle", href: "/admin/urunler", icon: Plus, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
    { label: "Slider Düzenle", href: "/admin/slider", icon: SlidersHorizontal, color: "text-violet-600", bg: "bg-violet-50 dark:bg-violet-500/10" },
    { label: "Menü Yönetimi", href: "/admin/nav", icon: Navigation, color: "text-slate-600 dark:text-slate-300", bg: "bg-slate-100 dark:bg-slate-800" },
    { label: "Galeri Yönetimi", href: "/admin/blog", icon: Images, color: "text-pink-600", bg: "bg-pink-50 dark:bg-pink-500/10" },
    { label: "Teklifleri Gör", href: "/admin/teklifler", icon: Inbox, color: "text-cyan-600", bg: "bg-cyan-50 dark:bg-cyan-500/10" },
    { label: "Siteyi Görüntüle", href: "/", icon: ExternalLink, color: "text-slate-600 dark:text-slate-300", bg: "bg-slate-100 dark:bg-slate-800", external: true },
];

export default function QuickActions() {
    return (
        <DashboardCard className="overflow-hidden h-full">
            <CardHead title="Hızlı İşlemler" description="Sık kullanılan görevler" />
            <div className="grid grid-cols-2 gap-2.5 px-5 pb-5">
                {ACTIONS.map((action) => {
                    const inner = (
                        <div className="flex flex-col items-start gap-3 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-[#FF6B00]/40 hover:shadow-sm transition-all group h-full">
                            <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${action.bg} ${action.color}`}>
                                <action.icon size={18} strokeWidth={2} />
                            </div>
                            <span className="text-[13px] font-semibold text-slate-700 dark:text-slate-200 group-hover:text-[#FF6B00] transition-colors leading-tight">
                                {action.label}
                            </span>
                        </div>
                    );

                    if (action.external) {
                        return (
                            <a key={action.label} href={action.href} target="_blank" rel="noopener noreferrer">
                                {inner}
                            </a>
                        );
                    }
                    return (
                        <Link key={action.label} href={action.href}>
                            {inner}
                        </Link>
                    );
                })}
            </div>
        </DashboardCard>
    );
}
