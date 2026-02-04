import { NextResponse } from "next/server";
// Hem default hem named desteklediği için artık hata vermez
import connectDB from "@/lib/db";
import mongoose from "mongoose";
export const dynamic = "force-static";
// Modelleri dinamik olarak başlat (OverwriteModelError önleyici)
const getModels = () => {
    const QuoteRequest = mongoose.models.QuoteRequest || mongoose.model("QuoteRequest", new mongoose.Schema({}, { strict: false, timestamps: true }));
    const Newsletter = mongoose.models.Newsletter || mongoose.model("Newsletter", new mongoose.Schema({}, { strict: false, timestamps: true }));
    const Product = mongoose.models.Product || mongoose.model("Product", new mongoose.Schema({}, { strict: false, timestamps: true }));

    return { QuoteRequest, Newsletter, Product };
};

export async function GET() {
    try {
        await connectDB();
        const { QuoteRequest, Newsletter, Product } = getModels();

        // Verileri paralel çekerek performansı artırıyoruz
        const [totalProducts, unreadQuotes, unreadNews, recentQuotes, recentNews] = await Promise.all([
            Product.countDocuments(),
            QuoteRequest.countDocuments({ status: { $ne: "Okundu" } }),
            Newsletter.countDocuments({ okundu: false }),
            QuoteRequest.find().sort({ createdAt: -1 }).limit(5).lean(),
            Newsletter.find().sort({ createdAt: -1 }).limit(5).lean()
        ]);

        // Verileri birleştirip en yeniden eskiye sıralıyoruz
        const combinedRecent = [...recentQuotes, ...recentNews]
            .sort((a: any, b: any) => {
                const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                return dateB - dateA;
            })
            .slice(0, 6);

        return NextResponse.json({
            success: true,
            stats: {
                totalProducts,
                newMessages: unreadQuotes + unreadNews,
                galleryFiles: 48, // İsteğe bağlı Galeri modelinden de çekilebilir
                monthlyVisits: "1.2k"
            },
            recentRequests: combinedRecent
        });
    } catch (error: any) {
        console.error("Dashboard API Hatası:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}