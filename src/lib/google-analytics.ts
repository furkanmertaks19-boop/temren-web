import { BetaAnalyticsDataClient } from "@google-analytics/data";
import type { protos } from "@google-analytics/data";
import type { AnalyticsTrendPoint, GaAnalyticsData, TopPage, TrafficSource } from "@/lib/analytics-types";

const TRAFFIC_COLORS = ["#FF6B00", "#0B1736", "#38bdf8", "#a855f7", "#10b981", "#f43f5e", "#eab308"];

const DAY_LABELS = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"] as const;

const MONTH_LABELS = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"] as const;

const CHANNEL_LABELS: Record<string, string> = {
    "Organic Search": "Google",
    Direct: "Direct",
    "Organic Social": "Sosyal",
    Referral: "Referral",
    "Paid Search": "Ücretli Arama",
    "Paid Social": "Ücretli Sosyal",
    Email: "E-posta",
    "Cross-network": "Çapraz Ağ",
    Display: "Görüntülü",
    Affiliates: "Affiliate",
    SMS: "SMS",
    "Organic Video": "Video",
    "Organic Shopping": "Alışveriş",
    Unassigned: "Diğer",
};

type Row = protos.google.analytics.data.v1beta.IRow;

let client: BetaAnalyticsDataClient | null = null;

function getClient(): BetaAnalyticsDataClient {
    if (!client) {
        if (!process.env.GOOGLE_APPLICATION_CREDENTIALS?.trim()) {
            throw new Error("GOOGLE_APPLICATION_CREDENTIALS ortam değişkeni tanımlı değil.");
        }
        client = new BetaAnalyticsDataClient();
    }
    return client;
}

function getPropertyResource(): string {
    const raw = process.env.GA4_PROPERTY_ID?.trim();
    if (!raw) {
        throw new Error("GA4_PROPERTY_ID ortam değişkeni tanımlı değil.");
    }
    const id = raw.replace(/^properties\//, "");
    if (!/^\d+$/.test(id)) {
        throw new Error("GA4_PROPERTY_ID geçerli bir sayısal property ID olmalıdır.");
    }
    return `properties/${id}`;
}

function metricValue(row: Row | undefined, index = 0): number {
    const raw = row?.metricValues?.[index]?.value;
    if (!raw) return 0;
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : 0;
}

function dimensionValue(row: Row | undefined, index = 0): string {
    return row?.dimensionValues?.[index]?.value?.trim() ?? "";
}

function formatDateLabel(yyyymmdd: string): string {
    if (yyyymmdd.length !== 8) return yyyymmdd;
    const year = Number(yyyymmdd.slice(0, 4));
    const month = Number(yyyymmdd.slice(4, 6)) - 1;
    const day = Number(yyyymmdd.slice(6, 8));
    const date = new Date(year, month, day);
    return DAY_LABELS[date.getDay()] ?? yyyymmdd;
}

function formatYearMonthLabel(yearMonth: string): string {
    if (yearMonth.length !== 6) return yearMonth;
    const monthIndex = Number(yearMonth.slice(4, 6)) - 1;
    return MONTH_LABELS[monthIndex] ?? yearMonth;
}

function mapDailyUsers(rows: Row[]): AnalyticsTrendPoint[] {
    return rows.map((row) => ({
        label: formatDateLabel(dimensionValue(row, 0)),
        value: metricValue(row, 0),
    }));
}

function mapMonthlyUsers(rows: Row[]): AnalyticsTrendPoint[] {
    return rows.map((row) => ({
        label: formatYearMonthLabel(dimensionValue(row, 0)),
        value: metricValue(row, 0),
    }));
}

function mapTrafficSources(rows: Row[]): TrafficSource[] {
    const totals = rows
        .map((row) => ({
            name: CHANNEL_LABELS[dimensionValue(row, 0)] ?? dimensionValue(row, 0),
            count: metricValue(row, 0),
        }))
        .filter((item) => item.count > 0);

    const sum = totals.reduce((acc, item) => acc + item.count, 0);
    if (sum === 0) return [];

    return totals.map((item, index) => ({
        name: item.name,
        value: Math.round((item.count / sum) * 1000) / 10,
        color: TRAFFIC_COLORS[index % TRAFFIC_COLORS.length],
    }));
}

function mapTopPages(rows: Row[]): TopPage[] {
    const pages = rows
        .map((row) => ({
            path: dimensionValue(row, 0) || "/",
            title: dimensionValue(row, 1) || dimensionValue(row, 0) || "Sayfa",
            views: metricValue(row, 0),
        }))
        .filter((page) => page.views > 0);

    const maxViews = pages[0]?.views ?? 0;

    return pages.map((page) => ({
        ...page,
        share: maxViews > 0 ? Math.round((page.views / maxViews) * 100) : 0,
    }));
}

export function isAnalyticsEmpty(data: GaAnalyticsData): boolean {
    return (
        data.todayUsers === 0 &&
        data.weekUsers === 0 &&
        data.monthUsers === 0 &&
        data.activeUsers === 0 &&
        data.screenPageViews === 0 &&
        data.averageSessionDuration === 0 &&
        data.dailyUsers.every((point) => point.value === 0) &&
        data.monthlyUsers.every((point) => point.value === 0) &&
        data.topPages.length === 0 &&
        data.trafficSources.length === 0
    );
}

export async function fetchGaAnalytics(): Promise<GaAnalyticsData> {
    const gaClient = getClient();
    const property = getPropertyResource();

    const [batchResponse] = await gaClient.batchRunReports({
        property,
        requests: [
            {
                dateRanges: [{ startDate: "today", endDate: "today" }],
                metrics: [{ name: "activeUsers" }],
            },
            {
                dateRanges: [{ startDate: "thisWeekToDate", endDate: "today" }],
                metrics: [{ name: "activeUsers" }],
            },
            {
                dateRanges: [{ startDate: "thisMonthToDate", endDate: "today" }],
                metrics: [{ name: "activeUsers" }],
            },
            {
                dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
                metrics: [{ name: "activeUsers" }, { name: "screenPageViews" }],
            },
            {
                dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
                metrics: [{ name: "averageSessionDuration" }],
            },
            {
                dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
                dimensions: [{ name: "date" }],
                metrics: [{ name: "activeUsers" }],
                orderBys: [{ dimension: { dimensionName: "date" } }],
            },
            {
                dateRanges: [{ startDate: "12monthsAgo", endDate: "today" }],
                dimensions: [{ name: "yearMonth" }],
                metrics: [{ name: "activeUsers" }],
                orderBys: [{ dimension: { dimensionName: "yearMonth" } }],
            },
            {
                dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
                dimensions: [{ name: "sessionDefaultChannelGroup" }],
                metrics: [{ name: "activeUsers" }],
                orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
                limit: 8,
            },
            {
                dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
                dimensions: [{ name: "pagePath" }, { name: "pageTitle" }],
                metrics: [{ name: "screenPageViews" }],
                orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
                limit: 5,
            },
        ],
    });

    const reports = batchResponse.reports ?? [];
    const summaryRow = reports[3]?.rows?.[0];

    return {
        todayUsers: metricValue(reports[0]?.rows?.[0], 0),
        weekUsers: metricValue(reports[1]?.rows?.[0], 0),
        monthUsers: metricValue(reports[2]?.rows?.[0], 0),
        activeUsers: metricValue(summaryRow, 0),
        screenPageViews: metricValue(summaryRow, 1),
        averageSessionDuration: Math.round(metricValue(reports[4]?.rows?.[0], 0)),
        dailyUsers: mapDailyUsers(reports[5]?.rows ?? []),
        monthlyUsers: mapMonthlyUsers(reports[6]?.rows ?? []),
        trafficSources: mapTrafficSources(reports[7]?.rows ?? []),
        topPages: mapTopPages(reports[8]?.rows ?? []),
    };
}
