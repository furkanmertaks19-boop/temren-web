export type AnalyticsTrendPoint = { label: string; value: number };

export type TrafficSource = { name: string; value: number; color: string };

export type TopPage = { path: string; title: string; views: number; share: number };

export type GaAnalyticsData = {
    todayUsers: number;
    weekUsers: number;
    monthUsers: number;
    activeUsers: number;
    screenPageViews: number;
    averageSessionDuration: number;
    trafficSources: TrafficSource[];
    topPages: TopPage[];
    dailyUsers: AnalyticsTrendPoint[];
    monthlyUsers: AnalyticsTrendPoint[];
};

export function formatDuration(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = Math.round(seconds % 60);
    return `${m}d ${s}sn`;
}
