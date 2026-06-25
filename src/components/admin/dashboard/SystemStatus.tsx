"use client";

import React from "react";
import { Server, Cpu, MemoryStick, HardDrive, ShieldCheck, DatabaseZap, Clock } from "lucide-react";
import { DashboardCard, CardHead } from "./DashboardCard";
import { systemStatus, type SeoStatus } from "@/lib/admin-dashboard-data";
import { cn } from "@/lib/utils";

const STATUS_DOT: Record<SeoStatus, string> = {
    good: "bg-emerald-500",
    warning: "bg-amber-500",
    error: "bg-red-500",
};

const METRIC_ICON = [Cpu, MemoryStick, HardDrive];

function barColor(value: number): string {
    if (value >= 80) return "bg-red-500";
    if (value >= 60) return "bg-amber-500";
    return "bg-emerald-500";
}

export default function SystemStatus() {
    return (
        <DashboardCard className="overflow-hidden h-full">
            <CardHead title="Sistem Durumu" description="Sunucu ve servis sağlığı" />
            <div className="px-5 pb-5 space-y-4">
                <div className="space-y-3">
                    {systemStatus.metrics.map((m, i) => {
                        const Icon = METRIC_ICON[i] ?? Cpu;
                        return (
                            <div key={m.label}>
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="flex items-center gap-2 text-[13px] text-slate-600 dark:text-slate-300">
                                        <Icon size={14} className="text-slate-400" />
                                        {m.label}
                                    </span>
                                    <span className="text-[13px] font-bold text-slate-900 dark:text-white tabular-nums">
                                        {m.value}
                                        {m.unit}
                                    </span>
                                </div>
                                <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                    <div className={cn("h-full rounded-full", barColor(m.value))} style={{ width: `${m.value}%` }} />
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                    {systemStatus.services.map((s) => {
                        const iconMap: Record<string, typeof Server> = {
                            Sunucu: Server,
                            Veritabanı: DatabaseZap,
                            API: Server,
                            SSL: ShieldCheck,
                        };
                        const Icon = iconMap[s.label] ?? Server;
                        return (
                            <div
                                key={s.label}
                                className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50"
                            >
                                <Icon size={15} className="text-slate-400 shrink-0" />
                                <div className="min-w-0">
                                    <p className="text-[11px] text-slate-400 leading-none">{s.label}</p>
                                    <p className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-800 dark:text-slate-200 mt-1">
                                        <span className={cn("size-1.5 rounded-full", STATUS_DOT[s.status])} />
                                        {s.value}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="flex items-center gap-2 text-[12px] text-slate-400 pt-1">
                    <Clock size={13} />
                    Son yedekleme: <span className="font-semibold text-slate-600 dark:text-slate-300">{systemStatus.lastBackup}</span>
                </div>
            </div>
        </DashboardCard>
    );
}
