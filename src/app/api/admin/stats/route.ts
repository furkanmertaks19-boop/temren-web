import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { getUnreadTeklifMongoFilter } from "@/lib/teklifStatus";
import { getUnreadCampaignLeadMongoFilter } from "@/lib/campaignStatus";
import mongoose from "mongoose";

export const dynamic = "force-dynamic";

const getModels = () => {
    const QuoteRequest = mongoose.models.QuoteRequest || mongoose.model("QuoteRequest", new mongoose.Schema({}, { strict: false, timestamps: true }), "teklifler");
    const Newsletter = mongoose.models.Newsletter || mongoose.model("Newsletter", new mongoose.Schema({}, { strict: false, timestamps: true }));
    const Product = mongoose.models.Product || mongoose.model("Product", new mongoose.Schema({}, { strict: false, timestamps: true }));
    const Slider = mongoose.models.Slider || mongoose.model("Slider", new mongoose.Schema({}, { strict: false, timestamps: true }));
    const Comment = mongoose.models.Comment || mongoose.model("Comment", new mongoose.Schema({}, { strict: false, timestamps: true }));
    const Campaign = mongoose.models.Campaign || mongoose.model("Campaign", new mongoose.Schema({}, { strict: false, timestamps: true }));
    const CampaignLead = mongoose.models.CampaignLead || mongoose.model("CampaignLead", new mongoose.Schema({}, { strict: false, timestamps: true }));
    const Blog = mongoose.models.Blog || mongoose.model("Blog", new mongoose.Schema({}, { strict: false, timestamps: true }));

    return { QuoteRequest, Newsletter, Product, Slider, Comment, Campaign, CampaignLead, Blog };
};

export async function GET() {
    try {
        await connectDB();
        const { QuoteRequest, Newsletter, Product, Slider, Comment, Campaign, CampaignLead, Blog } = getModels();

        const now = new Date();
        const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

        const [
            totalProducts,
            totalQuotes,
            unreadQuotes,
            sliderCount,
            commentCount,
            pendingComments,
            recentQuotes,
            activeCampaigns,
            totalCampaignLeads,
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
            QuoteRequest.find().sort({ createdAt: -1 }).limit(5).lean(),
            Campaign.countDocuments({
                isActive: true,
                startDate: { $lte: now },
                endDate: { $gte: now },
            }),
            CampaignLead.countDocuments(),
            CampaignLead.countDocuments(getUnreadCampaignLeadMongoFilter()),
            Blog.countDocuments(),
            Blog.countDocuments({ isActive: true }),
            Newsletter.countDocuments(),
            QuoteRequest.countDocuments({ createdAt: { $gte: startOfThisMonth } }),
            QuoteRequest.countDocuments({ createdAt: { $gte: startOfLastMonth, $lt: startOfThisMonth } }),
        ]);

        const quotesDelta = quotesLastMonth > 0
            ? Math.round(((quotesThisMonth - quotesLastMonth) / quotesLastMonth) * 100)
            : (quotesThisMonth > 0 ? 100 : 0);

        return NextResponse.json({
            success: true,
            stats: {
                totalProducts,
                totalQuotes,
                unreadQuotes,
                activeSlides: sliderCount,
                totalComments: commentCount,
                pendingComments,
                newsletterSubscribers,
                activeCampaigns,
                totalCampaignLeads,
                unreadCampaignLeads,
                totalBlogs,
                publishedBlogs,
                quotesThisMonth,
                quotesLastMonth,
                quotesDelta,
            },
            recentQuotes
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Bilinmeyen hata";
        console.error("Dashboard API Hatası:", message);
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}
