import { NextResponse } from "next/server";
import type { GaAnalyticsData } from "@/lib/analytics-types";
import { fetchGaAnalytics, isAnalyticsEmpty } from "@/lib/google-analytics";

export const dynamic = "force-dynamic";

export type AdminAnalyticsResponse =
    | { success: true; data: GaAnalyticsData; empty: boolean }
    | { success: false; error: string };

export async function GET(): Promise<NextResponse<AdminAnalyticsResponse>> {
    try {
        const data = await fetchGaAnalytics();
        return NextResponse.json({
            success: true,
            data,
            empty: isAnalyticsEmpty(data),
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Google Analytics verileri alınamadı.";
        console.error("Admin Analytics API Hatası:", message);
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}
