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

    return { QuoteRequest, Newsletter, Product, Slider, Comment, Campaign, CampaignLead };
};

export async function GET() {
    try {
        await connectDB();
        const { QuoteRequest, Newsletter, Product, Slider, Comment, Campaign, CampaignLead } = getModels();

        const now = new Date();
        const [totalProducts, unreadQuotes, sliderCount, commentCount, pendingComments, recentQuotes, activeCampaigns, totalCampaignLeads, unreadCampaignLeads] = await Promise.all([
            Product.countDocuments(),
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
        ]);

        return NextResponse.json({
            success: true,
            stats: {
                totalProducts,
                unreadQuotes,
                activeSlides: sliderCount,
                totalComments: commentCount,
                pendingComments,
                newsletterSubscribers: await Newsletter.countDocuments(),
                activeCampaigns,
                totalCampaignLeads,
                unreadCampaignLeads,
            },
            recentQuotes
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Bilinmeyen hata";
        console.error("Dashboard API Hatası:", message);
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}
