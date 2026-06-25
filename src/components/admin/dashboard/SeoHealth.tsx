"use client";

import React from "react";
import { Search } from "lucide-react";
import { DashboardCard, CardHead } from "./DashboardCard";
import DashboardEmptyState from "./DashboardEmptyState";

export default function SeoHealth() {
    return (
        <DashboardCard className="overflow-hidden h-full">
            <CardHead
                title="SEO Kontrol Merkezi"
                description="Site sağlık durumu"
                action={
                    <span className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-600 bg-amber-50 dark:bg-amber-500/10 px-2 py-1 rounded-lg">
                        <Search size={12} />
                        Bekleniyor
                    </span>
                }
            />
            <DashboardEmptyState
                title="Bu alan için takip sistemi kurulmamış"
                description="SEO taraması entegre edildiğinde meta, alt etiket ve link durumları burada görünecek."
            />
        </DashboardCard>
    );
}
