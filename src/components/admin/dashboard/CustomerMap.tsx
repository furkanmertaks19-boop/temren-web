"use client";

import React from "react";
import { MapPin } from "lucide-react";
import { DashboardCard, CardHead } from "./DashboardCard";
import { customerCities } from "@/lib/admin-dashboard-data";

export default function CustomerMap() {
    const total = customerCities.reduce((sum, c) => sum + c.offers, 0);

    return (
        <DashboardCard className="overflow-hidden h-full">
            <CardHead title="Müşteri Haritası" description={`Şehir bazlı teklif dağılımı · ${total} teklif`} />
            <div className="px-5 pb-5 space-y-3">
                {customerCities.map((c) => (
                    <div key={c.city}>
                        <div className="flex items-center justify-between mb-1.5">
                            <span className="flex items-center gap-2 text-[13px] font-semibold text-slate-700 dark:text-slate-200">
                                <MapPin size={14} className="text-[#FF6B00]" />
                                {c.city}
                            </span>
                            <span className="text-[13px] font-bold text-slate-900 dark:text-white tabular-nums">
                                {c.offers}
                            </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-[#0B1736] to-[#FF6B00]"
                                style={{ width: `${c.share}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </DashboardCard>
    );
}
