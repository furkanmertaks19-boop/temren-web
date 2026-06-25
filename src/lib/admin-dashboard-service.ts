import connectDB from "@/lib/db";
import { getUnreadCampaignLeadMongoFilter } from "@/lib/campaignStatus";
import { normalizeTeklif } from "@/lib/teklifNormalizer";
import { getUnreadTeklifMongoFilter } from "@/lib/teklifStatus";
import type {
    AdminDashboardData,
    AdminDashboardStats,
    BlogPerformanceData,
    CampaignPerformanceData,
    CityDistributionData,
    OfferByProductItem,
    OfferStatusItem,
    ProductPerformanceItem,
} from "@/lib/admin-dashboard-types";
import mongoose from "mongoose";

const CHART_COLORS = ["#FF6B00", "#0B1736", "#38bdf8", "#a855f7", "#22c55e", "#ef4444", "#f59e0b", "#6366f1"];

const STATUS_COLORS: Record<string, string> = {
    Yeni: "#3b82f6",
    Görüşüldü: "#a855f7",
    "Teklif Verildi": "#f97316",
    Onaylandı: "#22c55e",
    Reddedildi: "#ef4444",
    Tamamlandı: "#64748b",
};

type LeanDoc = Record<string, unknown>;

const getModels = () => {
    const QuoteRequest =
        mongoose.models.QuoteRequest ||
        mongoose.model("QuoteRequest", new mongoose.Schema({}, { strict: false, timestamps: true }), "teklifler");
    const Newsletter =
        mongoose.models.Newsletter ||
        mongoose.model("Newsletter", new mongoose.Schema({}, { strict: false, timestamps: true }));
    const Product =
        mongoose.models.Product ||
        mongoose.model("Product", new mongoose.Schema({}, { strict: false, timestamps: true }));
    const Slider =
        mongoose.models.Slider ||
        mongoose.model("Slider", new mongoose.Schema({}, { strict: false, timestamps: true }));
    const Comment =
        mongoose.models.Comment ||
        mongoose.model("Comment", new mongoose.Schema({}, { strict: false, timestamps: true }));
    const Campaign =
        mongoose.models.Campaign ||
        mongoose.model("Campaign", new mongoose.Schema({}, { strict: false, timestamps: true }));
    const CampaignLead =
        mongoose.models.CampaignLead ||
        mongoose.model("CampaignLead", new mongoose.Schema({}, { strict: false, timestamps: true }));
    const Blog =
        mongoose.models.Blog ||
        mongoose.model("Blog", new mongoose.Schema({}, { strict: false, timestamps: true }));

    return { QuoteRequest, Newsletter, Product, Slider, Comment, Campaign, CampaignLead, Blog };
};

function numField(doc: LeanDoc, ...keys: string[]): number {
    for (const key of keys) {
        const v = doc[key];
        if (typeof v === "number" && Number.isFinite(v)) return v;
    }
    return 0;
}

function strField(doc: LeanDoc, ...keys: string[]): string {
    for (const key of keys) {
        const v = doc[key];
        if (typeof v === "string" && v.trim()) return v.trim();
    }
    return "";
}

function quoteProductKey(doc: LeanDoc): string {
    return strField(doc, "sourceLabel", "productName", "secim", "konu") || "Genel İletişim";
}

function quoteCityKey(doc: LeanDoc): string | null {
    const city = strField(doc, "city", "sehir", "şehir", "il", "City", "Sehir");
    return city || null;
}

async function buildStats(
    models: ReturnType<typeof getModels>,
    now: Date
): Promise<AdminDashboardStats> {
    const { QuoteRequest, Newsletter, Product, Slider, Comment, Campaign, CampaignLead, Blog } = models;
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const [
        totalProducts,
        totalQuotes,
        unreadQuotes,
        activeSliders,
        totalComments,
        pendingComments,
        approvedComments,
        activeCampaigns,
        campaignLeads,
        unreadCampaignLeads,
        totalBlogs,
        publishedBlogs,
        newsletterSubscribers,
        quotesThisMonth,
        quotesLastMonth,
    ] = await Promise.all([
        Product.countDocuments(),
        QuoteRequest.countDocuments(),
        QuoteRequest.countDocuments(getUnreadTeklifMongoFilter()),
        Slider.countDocuments({ isActive: true }),
        Comment.countDocuments(),
        Comment.countDocuments({ isActive: false }),
        Comment.countDocuments({ isActive: true }),
        Campaign.countDocuments({ isActive: true, startDate: { $lte: now }, endDate: { $gte: now } }),
        CampaignLead.countDocuments(),
        CampaignLead.countDocuments(getUnreadCampaignLeadMongoFilter()),
        Blog.countDocuments(),
        Blog.countDocuments({ isActive: true }),
        Newsletter.countDocuments(),
        QuoteRequest.countDocuments({ createdAt: { $gte: startOfThisMonth } }),
        QuoteRequest.countDocuments({ createdAt: { $gte: startOfLastMonth, $lt: startOfThisMonth } }),
    ]);

    const draftBlogs = Math.max(totalBlogs - publishedBlogs, 0);
    const quotesDelta =
        quotesLastMonth > 0
            ? Math.round(((quotesThisMonth - quotesLastMonth) / quotesLastMonth) * 100)
            : quotesThisMonth > 0
              ? 100
              : 0;

    return {
        totalProducts,
        totalBlogs,
        publishedBlogs,
        draftBlogs,
        activeSliders,
        activeCampaigns,
        totalQuotes,
        unreadQuotes,
        campaignLeads,
        unreadCampaignLeads,
        pendingComments,
        approvedComments,
        totalComments,
        newsletterSubscribers,
        quotesThisMonth,
        quotesLastMonth,
        quotesDelta,
        activeSlides: activeSliders,
        totalCampaignLeads: campaignLeads,
    };
}

async function buildProductsPerformance(
    models: ReturnType<typeof getModels>
): Promise<ProductPerformanceItem[]> {
    const { Product, QuoteRequest } = models;

    const [products, quoteAgg] = await Promise.all([
        Product.find().sort({ title: 1 }).lean(),
        QuoteRequest.aggregate<{ _id: string; count: number }>([
            {
                $group: {
                    _id: {
                        $trim: {
                            input: {
                                $ifNull: [
                                    "$sourceLabel",
                                    { $ifNull: ["$productName", { $ifNull: ["$secim", "Genel İletişim"] }] },
                                ],
                            },
                        },
                    },
                    count: { $sum: 1 },
                },
            },
        ]),
    ]);

    const quoteMap = new Map<string, number>();
    for (const row of quoteAgg) {
        if (row._id) quoteMap.set(row._id.toLowerCase(), row.count);
    }

    const items: ProductPerformanceItem[] = (products as LeanDoc[]).map((p) => {
        const name = strField(p, "title") || "İsimsiz Ürün";
        const views = numField(p, "views", "viewCount", "pageViews");
        const quoteCount = quoteMap.get(name.toLowerCase()) ?? 0;
        const conversion = views > 0 ? Math.round((quoteCount / views) * 1000) / 10 : 0;

        return {
            id: String(p._id),
            name,
            category: strField(p, "category") || "—",
            views,
            quoteCount,
            conversion,
        };
    });

    return items.sort((a, b) => b.quoteCount - a.quoteCount || b.views - a.views);
}

async function buildBlogPerformance(models: ReturnType<typeof getModels>): Promise<BlogPerformanceData> {
    const { Blog, QuoteRequest } = models;

    const [blogs, leadsFromBlog] = await Promise.all([
        Blog.find().sort({ createdAt: -1 }).limit(10).lean(),
        QuoteRequest.countDocuments({
            $or: [{ sourcePage: { $regex: /blog/i } }, { sourceLabel: { $regex: /blog/i } }],
        }),
    ]);

    const posts = (blogs as LeanDoc[]).map((b) => {
        const views = numField(b, "views", "viewCount", "reads");
        const readMinutesRaw = b.readTime ?? b.readMinutes ?? b.avgReadMinutes;
        const readMinutes =
            typeof readMinutesRaw === "number" && readMinutesRaw > 0 ? readMinutesRaw : null;

        return {
            id: String(b._id),
            title: strField(b, "title") || "Başlıksız",
            isPublished: b.isActive === true,
            views,
            readMinutes,
            createdAt: b.createdAt ? new Date(b.createdAt as Date).toISOString() : new Date().toISOString(),
        };
    });

    const publishedCount = posts.filter((p) => p.isPublished).length;
    const draftCount = posts.length - publishedCount;
    const withReadTime = posts.filter((p) => p.readMinutes !== null);
    const avgReadMinutes =
        withReadTime.length > 0
            ? Math.round((withReadTime.reduce((s, p) => s + (p.readMinutes ?? 0), 0) / withReadTime.length) * 10) / 10
            : null;
    const hasViewTracking = posts.some((p) => p.views > 0);

    const [publishedTotal, draftTotal] = await Promise.all([
        Blog.countDocuments({ isActive: true }),
        Blog.countDocuments({ isActive: { $ne: true } }),
    ]);

    return {
        publishedCount: publishedTotal,
        draftCount: draftTotal,
        avgReadMinutes,
        leadsFromBlog,
        recentPosts: posts,
        hasViewTracking,
    };
}

async function buildCampaignPerformance(
    models: ReturnType<typeof getModels>,
    now: Date
): Promise<CampaignPerformanceData> {
    const { Campaign, CampaignLead } = models;
    const sevenDaysLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const [campaigns, leadAgg, activeCount, expiringSoonCount, totalLeads] = await Promise.all([
        Campaign.find().sort({ endDate: 1 }).lean(),
        CampaignLead.aggregate<{ _id: mongoose.Types.ObjectId; leadCount: number }>([
            { $group: { _id: "$campaignId", leadCount: { $sum: 1 } } },
        ]),
        Campaign.countDocuments({ isActive: true, startDate: { $lte: now }, endDate: { $gte: now } }),
        Campaign.countDocuments({
            isActive: true,
            endDate: { $gte: now, $lte: sevenDaysLater },
        }),
        CampaignLead.countDocuments(),
    ]);

    const leadMap = new Map<string, number>();
    for (const row of leadAgg) {
        leadMap.set(String(row._id), row.leadCount);
    }

    const items = (campaigns as LeanDoc[]).map((c) => {
        const id = String(c._id);
        const endDate = c.endDate ? new Date(c.endDate as Date) : now;
        const isActive = c.isActive === true && endDate >= now;
        const views = numField(c, "views", "viewCount");
        const conversions = numField(c, "conversions", "conversionCount");

        return {
            id,
            title: strField(c, "title") || "Kampanya",
            leadCount: leadMap.get(id) ?? 0,
            views,
            conversions,
            isActive,
            endDate: endDate.toISOString(),
            expiringSoon: isActive && endDate <= sevenDaysLater,
        };
    });

    return {
        activeCount,
        expiringSoonCount,
        totalLeads,
        campaigns: items.sort((a, b) => b.leadCount - a.leadCount),
        hasViewTracking: items.some((c) => c.views > 0),
    };
}

async function buildOffersByProduct(models: ReturnType<typeof getModels>): Promise<OfferByProductItem[]> {
    const { QuoteRequest } = models;
    const agg = await QuoteRequest.aggregate<{ _id: string; count: number }>([
        {
            $group: {
                _id: {
                    $trim: {
                        input: {
                            $ifNull: [
                                "$sourceLabel",
                                { $ifNull: ["$productName", { $ifNull: ["$secim", "Genel İletişim"] }] },
                            ],
                        },
                    },
                },
                count: { $sum: 1 },
            },
        },
        { $sort: { count: -1 } },
        { $limit: 8 },
    ]);

    return agg.map((row, i) => ({
        name: row._id || "Genel",
        value: row.count,
        color: CHART_COLORS[i % CHART_COLORS.length],
    }));
}

async function buildOfferStatusMix(models: ReturnType<typeof getModels>): Promise<OfferStatusItem[]> {
    const { QuoteRequest } = models;
    const agg = await QuoteRequest.aggregate<{ _id: string; count: number }>([
        {
            $group: {
                _id: {
                    $ifNull: ["$status", "Yeni"],
                },
                count: { $sum: 1 },
            },
        },
        { $sort: { count: -1 } },
    ]);

    const total = agg.reduce((s, r) => s + r.count, 0);
    if (total === 0) return [];

    return agg.map((row, i) => {
        const name = row._id || "Yeni";
        return {
            name,
            count: row.count,
            value: Math.round((row.count / total) * 100),
            color: STATUS_COLORS[name] ?? CHART_COLORS[i % CHART_COLORS.length],
        };
    });
}

async function buildCityDistribution(models: ReturnType<typeof getModels>): Promise<CityDistributionData> {
    const { QuoteRequest } = models;
    const allQuotes = (await QuoteRequest.find().select("city sehir il şehir").lean()) as LeanDoc[];

    const cityCounts = new Map<string, number>();
    for (const q of allQuotes) {
        const city = quoteCityKey(q);
        if (city) {
            const key = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
            cityCounts.set(key, (cityCounts.get(key) ?? 0) + 1);
        }
    }

    if (cityCounts.size === 0) {
        return {
            hasCityData: false,
            cities: [],
            message: "Şehir verisi bulunamadı. Teklif formlarına şehir alanı eklendiğinde burada görünecek.",
        };
    }

    const sorted = [...cityCounts.entries()]
        .map(([city, offers]) => ({ city, offers }))
        .sort((a, b) => b.offers - a.offers)
        .slice(0, 10);

    const max = sorted[0]?.offers ?? 1;
    return {
        hasCityData: true,
        cities: sorted.map((c) => ({
            ...c,
            share: Math.round((c.offers / max) * 100),
        })),
    };
}

export async function fetchAdminDashboardData(): Promise<AdminDashboardData> {
    await connectDB();
    const models = getModels();
    const now = new Date();

    const [
        stats,
        recentRaw,
        productsPerformance,
        blogPerformance,
        campaignPerformance,
        offersByProduct,
        offerStatusMix,
        cityDistribution,
    ] = await Promise.all([
        buildStats(models, now),
        models.QuoteRequest.find().sort({ createdAt: -1 }).limit(8).lean(),
        buildProductsPerformance(models),
        buildBlogPerformance(models),
        buildCampaignPerformance(models, now),
        buildOffersByProduct(models),
        buildOfferStatusMix(models),
        buildCityDistribution(models),
    ]);

    const recentQuotes = (recentRaw as LeanDoc[]).map((q) => normalizeTeklif(q));

    return {
        success: true,
        stats,
        recentQuotes,
        productsPerformance,
        blogPerformance,
        campaignPerformance,
        offersByProduct,
        offerStatusMix,
        cityDistribution,
    };
}

export async function fetchAdminStatsOnly(): Promise<AdminDashboardStats> {
    await connectDB();
    return buildStats(getModels(), new Date());
}
