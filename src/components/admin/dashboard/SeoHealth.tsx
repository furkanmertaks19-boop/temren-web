"use client";

import React from "react";
import { CheckCircle2, AlertTriangle, XCircle, Search } from "lucide-react";
import { DashboardCard, CardHead } from "./DashboardCard";
import { seoHealth, type SeoStatus } from "@/lib/admin-dashboard-data";
import { cn } from "@/lib/utils";

const STATUS_CONFIG: Record<SeoStatus, { icon: typeof CheckCircle2; dot: string; text: string }> = {
    good: { icon: CheckCircle2, dot: "bg-emerald-500", text: "text-emerald-600 dark:text-emerald-400" },
    warning: { icon: AlertTriangle, dot: "bg-amber-500", text: "text-amber-600 dark:text-amber-400" },
    error: { icon: XCircle, dot: "bg-red-500", text: "text-red-600 dark:text-red-400" },
};

export default function SeoHealth() {
    const goodCount = seoHealth.filter((s) => s.status === "good").length;
    const score = Math.round((goodCount / seoHealth.length) * 100);

    return (
        <DashboardCard className="overflow-hidden h-full">
            <CardHead
                title="SEO Kontrol Merkezi"
                description="Site sağlık durumu"
                action={
                    <span className="flex items-center gap-1.5 text-[13px] font-bold text-slate-900 dark:text-white">
                        <Search size={14} className="text-[#FF6B00]" />
                        %{score}
                    </span>
                }
            />
            <div className="px-5 pb-5 space-y-2">
                {seoHealth.map((item) => {
                    const cfg = STATUS_CONFIG[item.status];
                    const Icon = cfg.icon;
                    return (
                        <div
                            key={item.label}
                            className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50"
                        >
                            <div className="flex items-center gap-2.5 min-w-0">
                                <Icon size={16} className={cfg.text} />
                                <span className="text-[13px] text-slate-700 dark:text-slate-300 truncate">{item.label}</span>
                            </div>
                            <span className={cn("text-[12px] font-semibold shrink-0", cfg.text)}>{item.value}</span>
                        </div>
                    );
                })}
            </div>
        </DashboardCard>
    );
}
