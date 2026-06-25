"use client";

import React from "react";
import { Server } from "lucide-react";
import { DashboardCard, CardHead } from "./DashboardCard";
import DashboardEmptyState from "./DashboardEmptyState";

export default function SystemStatus() {
    return (
        <DashboardCard className="overflow-hidden h-full">
            <CardHead title="Sistem Durumu" description="Sunucu ve servis sağlığı" />
            <DashboardEmptyState
                title="Bu alan için takip sistemi kurulmamış"
                description="Sunucu izleme (CPU, RAM, yedekleme) entegre edildiğinde canlı durum burada görünecek."
                icon={<Server size={28} className="text-slate-300" />}
            />
        </DashboardCard>
    );
}
