/**
 * Admin dashboard demo/mock verileri.
 * Google Analytics ve sosyal medya API'leri bağlanana kadar bu veriler kullanılır.
 * Gerçek API bağlanınca yalnızca ilgili fetch fonksiyonu değiştirilir; UI aynı kalır.
 */

export type TrendPoint = { label: string; value: number };
export type DualTrendPoint = { label: string; a: number; b: number };

/* ----------------------------- WEBSITE ANALYTICS ---------------------------- */

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

/* --------------------------- SOCIAL MEDIA ANALYTICS ------------------------- */

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

export const socialFollowerGrowth: { label: string; instagram: number; linkedin: number; facebook: number }[] = [
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

/* ----------------------------- CAMPAIGN PERFORMANCE ------------------------- */

export const campaignPerformance = {
    funnel: [
        { label: "Oca", views: 4200, leads: 180, conversions: 42 },
        { label: "Şub", views: 3900, leads: 160, conversions: 38 },
        { label: "Mar", views: 5100, leads: 220, conversions: 55 },
        { label: "Nis", views: 6200, leads: 280, conversions: 71 },
        { label: "May", views: 5800, leads: 250, conversions: 64 },
        { label: "Haz", views: 7100, leads: 320, conversions: 88 },
    ],
    mostViewed: { title: "Yaz Kampanyası — Palet Sistemleri", views: 7100 },
    mostLeads: { title: "TİKA Özel Fırsat", leads: 142 },
};

/* ------------------------------ PRODUCT PERFORMANCE ------------------------- */

export const productPerformance = [
    { name: "PLT-18", views: 3210, offers: 142, conversion: 4.4 },
    { name: "Mini TİKA", views: 2840, offers: 118, conversion: 4.2 },
    { name: "PLT-12", views: 2410, offers: 96, conversion: 4.0 },
    { name: "PLT-10", views: 1980, offers: 78, conversion: 3.9 },
    { name: "PLT-8", views: 1620, offers: 61, conversion: 3.8 },
    { name: "PLT-7", views: 1340, offers: 48, conversion: 3.6 },
];

/* ----------------------------- OFFERS BY PRODUCT ---------------------------- */

export const offersByProduct = [
    { name: "Mini TİKA", value: 142, color: "#FF6B00" },
    { name: "PLT-7", value: 96, color: "#0B1736" },
    { name: "PLT-8", value: 78, color: "#38bdf8" },
    { name: "PLT-10", value: 64, color: "#a855f7" },
    { name: "PLT-12", value: 51, color: "#22c55e" },
];

/* ------------------------------ BLOG PERFORMANCE ---------------------------- */

export const blogPerformance = {
    topPosts: [
        { title: "Palet sistemlerinde verimlilik", reads: 2140, minutes: 4.2 },
        { title: "CNC vakum tablası rehberi", reads: 1820, minutes: 5.1 },
        { title: "İhracatta kalite standartları", reads: 1460, minutes: 3.8 },
        { title: "Savunma sanayinde TİKA", reads: 1190, minutes: 6.0 },
    ],
    avgReadMinutes: 4.6,
    leadsFromBlog: 38,
};

/* ------------------------------- CUSTOMER MAP ------------------------------- */

export const customerCities = [
    { city: "Ankara", offers: 142, share: 100 },
    { city: "İstanbul", offers: 118, share: 83 },
    { city: "Konya", offers: 76, share: 54 },
    { city: "İzmir", offers: 64, share: 45 },
    { city: "Kayseri", offers: 48, share: 34 },
    { city: "Bursa", offers: 39, share: 27 },
    { city: "Gaziantep", offers: 31, share: 22 },
];

/* ------------------------------- SEO HEALTH --------------------------------- */

export type SeoStatus = "good" | "warning" | "error";

export const seoHealth: { label: string; value: string; status: SeoStatus }[] = [
    { label: "Meta açıklaması eksik sayfalar", value: "3 sayfa", status: "warning" },
    { label: "Alt etiketi eksik görseller", value: "7 görsel", status: "warning" },
    { label: "Kırık link sayısı", value: "0", status: "good" },
    { label: "Sitemap durumu", value: "Aktif", status: "good" },
    { label: "Robots.txt durumu", value: "Aktif", status: "good" },
    { label: "SSL durumu", value: "Geçerli", status: "good" },
];

/* ------------------------------ SYSTEM STATUS ------------------------------- */

export const systemStatus = {
    metrics: [
        { label: "CPU Kullanımı", value: 34, unit: "%" },
        { label: "RAM Kullanımı", value: 58, unit: "%" },
        { label: "Disk Kullanımı", value: 46, unit: "%" },
    ],
    services: [
        { label: "Sunucu", value: "Çevrimiçi", status: "good" as SeoStatus },
        { label: "Veritabanı", value: "Bağlı", status: "good" as SeoStatus },
        { label: "API", value: "Çalışıyor", status: "good" as SeoStatus },
        { label: "SSL", value: "Geçerli", status: "good" as SeoStatus },
    ],
    lastBackup: "Bugün 03:00",
};

/* ----------------------------- OFFER STATUS MIX ----------------------------- */

export const offerStatusMix = [
    { name: "Yeni", value: 34, color: "#3b82f6" },
    { name: "Görüşüldü", value: 28, color: "#a855f7" },
    { name: "Onaylandı", value: 22, color: "#22c55e" },
    { name: "Reddedildi", value: 16, color: "#ef4444" },
];

export function formatDuration(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}d ${s}sn`;
}
