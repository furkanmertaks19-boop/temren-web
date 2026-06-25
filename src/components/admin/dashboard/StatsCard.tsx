"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type StatsCardProps = {
    label: string;
    value: number | string;
    description?: string;
    icon: LucideIcon;
    gradient: string;
    href?: string;
    delta?: number;
    pulse?: boolean;
    loading?: boolean;
    index?: number;
};

export default function StatsCard({
    label,
    value,
    description,
    icon: Icon,
    gradient,
    href,
    delta,
    pulse,
    loading,
    index = 0,
}: StatsCardProps) {
    const hasDelta = typeof delta === "number" && Number.isFinite(delta);
    const positive = (delta ?? 0) >= 0;

    const content = (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.04, ease: "easeOut" }}
            className={cn(
                "group relative h-full rounded-2xl bg-white dark:bg-slate-900 dark:border dark:border-slate-800 p-5",
                "shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_rgba(15,23,42,0.06)]",
                "transition-all duration-300 hover:shadow-[0_8px_30px_rgba(15,23,42,0.12)] hover:-translate-y-0.5"
            )}
        >
            <div className="flex items-start justify-between mb-4">
                <div
                    className={cn(
                        "flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br text-white shadow-sm",
                        gradient
                    )}
                >
                    <Icon size={20} strokeWidth={2} />
                </div>

                {pulse ? (
                    <span className="relative flex size-2.5 mt-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                        <span className="relative inline-flex rounded-full size-2.5 bg-orange-500" />
                    </span>
                ) : hasDelta ? (
                    <span
                        className={cn(
                            "inline-flex items-center gap-0.5 px-2 py-1 rounded-lg text-[11px] font-bold",
                            positive
                                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                                : "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                        )}
                    >
                        {positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                        {Math.abs(delta as number)}%
                    </span>
                ) : null}
            </div>

            <p className="text-[28px] leading-none font-bold text-slate-900 dark:text-white tabular-nums tracking-tight">
                {loading ? "—" : value}
            </p>
            <p className="text-[13px] font-semibold text-slate-700 dark:text-slate-200 mt-2">{label}</p>
            {description && (
                <p className="text-[12px] text-slate-400 dark:text-slate-500 mt-0.5 leading-relaxed">
                    {description}
                </p>
            )}
        </motion.div>
    );

    if (href) {
        return (
            <Link href={href} className="block h-full">
                {content}
            </Link>
        );
    }
    return content;
}
