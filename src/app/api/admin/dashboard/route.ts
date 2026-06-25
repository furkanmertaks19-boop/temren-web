import { NextResponse } from "next/server";
import { fetchAdminDashboardData } from "@/lib/admin-dashboard-service";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const data = await fetchAdminDashboardData();
        return NextResponse.json(data);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Bilinmeyen hata";
        console.error("Dashboard API Hatası:", message);
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}
