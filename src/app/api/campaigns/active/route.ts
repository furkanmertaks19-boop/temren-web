import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Campaign from "@/models/Campaign";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        await connectDB();
        const now = new Date();

        const campaign = await Campaign.findOne({
            isActive: true,
            showPopup: true,
            startDate: { $lte: now },
            endDate: { $gte: now },
        })
            .sort({ createdAt: -1 })
            .lean();

        if (!campaign) {
            return NextResponse.json({ success: true, data: null });
        }

        return NextResponse.json({
            success: true,
            data: {
                id: String(campaign._id),
                title: campaign.title,
                shortDescription: campaign.shortDescription,
                discountLabel: campaign.discountLabel || "",
                description: campaign.description,
                advantages: campaign.advantages || "",
                priceInfo: campaign.priceInfo || "",
                mediaUrl: campaign.mediaUrl,
                mediaType: campaign.mediaType,
                buttonText: campaign.buttonText || "Teklif Al",
                repeatAfterDays: campaign.repeatAfterDays ?? 1,
            },
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Aktif kampanya alınamadı";
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}
