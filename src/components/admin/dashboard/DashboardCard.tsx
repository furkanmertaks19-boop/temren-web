"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type DashboardCardProps = {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    delay?: number;
};

export function DashboardCard({ children, className, hover = false, delay = 0 }: DashboardCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay, ease: "easeOut" }}
            className={cn(
                "rounded-2xl bg-white dark:bg-slate-900 dark:border dark:border-slate-800",
                "shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_rgba(15,23,42,0.06)]",
                hover &&
                    "transition-all duration-300 hover:shadow-[0_8px_30px_rgba(15,23,42,0.12)] hover:-translate-y-0.5",
                className
            )}
        >
            {children}
        </motion.div>
    );
}

type SectionHeadingProps = {
    title: string;
    description?: string;
    icon?: React.ReactNode;
    action?: React.ReactNode;
    className?: string;
};

export function SectionHeading({ title, description, icon, action, className }: SectionHeadingProps) {
    return (
        <div className={cn("flex items-center justify-between gap-4 mb-4", className)}>
            <div className="flex items-center gap-3 min-w-0">
                {icon && (
                    <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#FF6B00]/10 text-[#FF6B00] shrink-0">
                        {icon}
                    </div>
                )}
                <div className="min-w-0">
                    <h2 className="text-[17px] font-bold text-slate-900 dark:text-white tracking-tight truncate">
                        {title}
                    </h2>
                    {description && (
                        <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed truncate">
                            {description}
                        </p>
                    )}
                </div>
            </div>
            {action && <div className="shrink-0">{action}</div>}
        </div>
    );
}

export function CardHead({
    title,
    description,
    action,
    className,
}: {
    title: string;
    description?: string;
    action?: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={cn("flex items-start justify-between gap-4 px-5 pt-5 pb-3", className)}>
            <div className="min-w-0">
                <h3 className="text-[15px] font-bold text-slate-900 dark:text-white tracking-tight">{title}</h3>
                {description && (
                    <p className="text-[13px] text-slate-500 dark:text-slate-400 mt-0.5">{description}</p>
                )}
            </div>
            {action && <div className="shrink-0">{action}</div>}
        </div>
    );
}
