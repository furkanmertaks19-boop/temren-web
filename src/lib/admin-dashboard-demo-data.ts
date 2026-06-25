/**
 * Yalnızca henüz API entegrasyonu olmayan bölümler için demo veriler.
 * Website Analytics (Google Analytics) ve Social Media Analytics burada kalır.
 */

export type TrendPoint = { label: string; value: number };

export const websiteAnalytics = {
    cards: {
        today: 412,
        thisWeek: 2840,
        thisMonth: 11920,
        avgSessionSeconds: 184,
        conversionRate: 4.7,
    },
    dailyVisitors: [
        { label: "Pzt", value: 320 },
        { label: "Sal", value: 410 },
        { label: "Çar", value: 380 },
        { label: "Per", value: 520 },
        { label: "Cum", value: 610 },
        { label: "Cmt", value: 430 },
        { label: "Paz", value: 290 },
    ] as TrendPoint[],
    monthlyVisitors: [
        { label: "Oca", value: 8200 },
        { label: "Şub", value: 7600 },
        { label: "Mar", value: 9100 },
        { label: "Nis", value: 10200 },
        { label: "May", value: 9800 },
        { label: "Haz", value: 11920 },
        { label: "Tem", value: 12400 },
        { label: "Ağu", value: 11100 },
        { label: "Eyl", value: 13200 },
        { label: "Eki", value: 14100 },
        { label: "Kas", value: 13800 },
        { label: "Ara", value: 15200 },
    ] as TrendPoint[],
    topPages: [
        { path: "/", title: "Ana Sayfa", views: 5420, share: 100 },
        { path: "/urunler/palet-sistemleri", title: "Palet Sistemleri", views: 3210, share: 59 },
        { path: "/urunler/tika", title: "TİKA", views: 2180, share: 40 },
        { path: "/iletisim", title: "İletişim", views: 1640, share: 30 },
        { path: "/medya/blog", title: "Blog", views: 1120, share: 21 },
    ],
    trafficSources: [
        { name: "Google", value: 52, color: "#FF6B00" },
        { name: "Direct", value: 23, color: "#0B1736" },
        { name: "Social", value: 16, color: "#38bdf8" },
        { name: "Referral", value: 9, color: "#a855f7" },
    ],
};

export type SocialPlatform = {
    key: string;
    name: string;
    followers: number;
    growth30d: number;
    posts: number;
    engagement: number;
    color: string;
};

export const socialPlatforms: SocialPlatform[] = [
    { key: "instagram", name: "Instagram", followers: 12450, growth30d: 5.2, posts: 180, engagement: 7.2, color: "#E1306C" },
    { key: "linkedin", name: "LinkedIn", followers: 4380, growth30d: 2.9, posts: 98, engagement: 6.1, color: "#0A66C2" },
    { key: "youtube", name: "YouTube", followers: 3345, growth30d: 1.0, posts: 120, engagement: 5.2, color: "#FF0000" },
    { key: "facebook", name: "Facebook", followers: 8920, growth30d: 3.4, posts: 240, engagement: 6.3, color: "#1877F2" },
    { key: "twitter", name: "X / Twitter", followers: 6710, growth30d: 4.8, posts: 310, engagement: 4.5, color: "#0f172a" },
];

export const socialFollowerGrowth = [
    { label: "Oca", instagram: 9800, linkedin: 3600, facebook: 7800 },
    { label: "Şub", instagram: 10200, linkedin: 3750, facebook: 8000 },
    { label: "Mar", instagram: 10700, linkedin: 3880, facebook: 8200 },
    { label: "Nis", instagram: 11100, linkedin: 3990, facebook: 8350 },
    { label: "May", instagram: 11600, linkedin: 4120, facebook: 8550 },
    { label: "Haz", instagram: 11900, linkedin: 4210, facebook: 8700 },
    { label: "Tem", instagram: 12450, linkedin: 4380, facebook: 8920 },
];

export const topSocialPosts = [
    { platform: "Instagram", title: "Yeni PLT-18 tanıtımı", reach: 18200, engagement: 9.4 },
    { platform: "LinkedIn", title: "İhracat başarı hikayemiz", reach: 9800, engagement: 7.1 },
    { platform: "YouTube", title: "Vakum tablası montaj videosu", reach: 7400, engagement: 6.3 },
    { platform: "Facebook", title: "Fuar katılım duyurusu", reach: 6100, engagement: 5.5 },
];

export function formatDuration(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}d ${s}sn`;
}
