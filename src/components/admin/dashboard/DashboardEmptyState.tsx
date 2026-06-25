"use client";

import React from "react";
import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

type DashboardEmptyStateProps = {
    title: string;
    description?: string;
    icon?: React.ReactNode;
    className?: string;
};

export default function DashboardEmptyState({
    title,
    description,
    icon,
    className,
}: DashboardEmptyStateProps) {
    return (
        <div className={cn("flex flex-col items-center justify-center py-12 px-4 text-center", className)}>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 mb-3">
                {icon ?? <Inbox size={28} className="text-slate-300" />}
            </div>
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">{title}</p>
            {description && (
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-sm leading-relaxed">
                    {description}
                </p>
            )}
        </div>
    );
}
