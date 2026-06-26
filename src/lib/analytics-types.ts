export type AnalyticsTrendPoint = { label: string; value: number };

export type TrafficSource = { name: string; value: number; color: string };

export type TopPage = { path: string; title: string; views: number; share: number };

export type WebsiteAnalyticsData = {
    cards: {
        today: number;
        thisWeek: number;
        thisMonth: number;
        avgSessionSeconds: number;
        conversionRate: number;
    };
    dailyVisitors: AnalyticsTrendPoint[];
    monthlyVisitors: AnalyticsTrendPoint[];
    topPages: TopPage[];
    trafficSources: TrafficSource[];
};

export function formatDuration(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = Math.round(seconds % 60);
    return `${m}d ${s}sn`;
}
