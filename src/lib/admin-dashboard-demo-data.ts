/**
 * Yalnızca henüz API entegrasyonu olmayan bölümler için demo veriler.
 * Social Media Analytics burada kalır.
 */

export type TrendPoint = { label: string; value: number };

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
