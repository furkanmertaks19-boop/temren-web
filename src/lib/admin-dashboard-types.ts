import type { NormalizedTeklif } from "@/lib/teklifNormalizer";

export type AdminDashboardStats = {
    totalProducts: number;
    totalBlogs: number;
    publishedBlogs: number;
    draftBlogs: number;
    activeSliders: number;
    activeCampaigns: number;
    totalQuotes: number;
    unreadQuotes: number;
    campaignLeads: number;
    unreadCampaignLeads: number;
    pendingComments: number;
    approvedComments: number;
    totalComments: number;
    newsletterSubscribers: number;
    quotesThisMonth: number;
    quotesLastMonth: number;
    quotesDelta: number;
    /** @deprecated use activeSliders */
    activeSlides: number;
    /** @deprecated use campaignLeads */
    totalCampaignLeads: number;
};

export type ProductPerformanceItem = {
    id: string;
    name: string;
    category: string;
    views: number;
    quoteCount: number;
    conversion: number;
};

export type BlogPerformanceItem = {
    id: string;
    title: string;
    isPublished: boolean;
    views: number;
    readMinutes: number | null;
    createdAt: string;
};

export type BlogPerformanceData = {
    publishedCount: number;
    draftCount: number;
    avgReadMinutes: number | null;
    leadsFromBlog: number;
    recentPosts: BlogPerformanceItem[];
    hasViewTracking: boolean;
};

export type CampaignPerformanceItem = {
    id: string;
    title: string;
    leadCount: number;
    views: number;
    conversions: number;
    isActive: boolean;
    endDate: string;
    expiringSoon: boolean;
};

export type CampaignPerformanceData = {
    activeCount: number;
    expiringSoonCount: number;
    totalLeads: number;
    campaigns: CampaignPerformanceItem[];
    hasViewTracking: boolean;
};

export type OfferByProductItem = {
    name: string;
    value: number;
    color: string;
};

export type OfferStatusItem = {
    name: string;
    value: number;
    count: number;
    color: string;
};

export type CityDistributionItem = {
    city: string;
    offers: number;
    share: number;
};

export type CityDistributionData = {
    hasCityData: boolean;
    cities: CityDistributionItem[];
    message?: string;
};

export type AdminDashboardData = {
    success: boolean;
    stats: AdminDashboardStats;
    recentQuotes: NormalizedTeklif[];
    productsPerformance: ProductPerformanceItem[];
    blogPerformance: BlogPerformanceData;
    campaignPerformance: CampaignPerformanceData;
    offersByProduct: OfferByProductItem[];
    offerStatusMix: OfferStatusItem[];
    cityDistribution: CityDistributionData;
};
