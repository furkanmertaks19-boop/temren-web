import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import mongoose from "mongoose";

export const dynamic = "force-dynamic";

const getModels = () => {
    const QuoteRequest = mongoose.models.QuoteRequest || mongoose.model("QuoteRequest", new mongoose.Schema({}, { strict: false, timestamps: true }), "teklifler");
    const Newsletter = mongoose.models.Newsletter || mongoose.model("Newsletter", new mongoose.Schema({}, { strict: false, timestamps: true }));
    const Product = mongoose.models.Product || mongoose.model("Product", new mongoose.Schema({}, { strict: false, timestamps: true }));
    const Slider = mongoose.models.Slider || mongoose.model("Slider", new mongoose.Schema({}, { strict: false, timestamps: true }));
    const Comment = mongoose.models.Comment || mongoose.model("Comment", new mongoose.Schema({}, { strict: false, timestamps: true }));

    return { QuoteRequest, Newsletter, Product, Slider, Comment };
};

export async function GET() {
    try {
        await connectDB();
        const { QuoteRequest, Newsletter, Product, Slider, Comment } = getModels();

        const [totalProducts, unreadQuotes, sliderCount, commentCount, pendingComments, recentQuotes] = await Promise.all([
            Product.countDocuments(),
            QuoteRequest.countDocuments({
                isRead: { $ne: true },
                okundu: { $ne: true },
                status: { $ne: "Okundu" }
            }),
            Slider.countDocuments({ isActive: true }),
            Comment.countDocuments(),
            Comment.countDocuments({ isActive: false }),
            QuoteRequest.find().sort({ createdAt: -1 }).limit(5).lean()
        ]);

        return NextResponse.json({
            success: true,
            stats: {
                totalProducts,
                unreadQuotes,
                activeSlides: sliderCount,
                totalComments: commentCount,
                pendingComments,
                newsletterSubscribers: await Newsletter.countDocuments()
            },
            recentQuotes
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Bilinmeyen hata";
        console.error("Dashboard API Hatası:", message);
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}
