import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Campaign from "@/models/Campaign";
import CampaignLead from "@/models/CampaignLead";
import mongoose from "mongoose";

export const dynamic = "force-dynamic";

function serializeCampaign(doc: Record<string, unknown>) {
    return {
        id: String(doc._id),
        title: doc.title,
        shortDescription: doc.shortDescription,
        discountLabel: doc.discountLabel,
        description: doc.description,
        advantages: doc.advantages,
        priceInfo: doc.priceInfo,
        mediaUrl: doc.mediaUrl,
        mediaType: doc.mediaType,
        buttonText: doc.buttonText,
        startDate: doc.startDate,
        endDate: doc.endDate,
        isActive: doc.isActive,
        showPopup: doc.showPopup,
        repeatAfterDays: doc.repeatAfterDays,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
    };
}

async function getLeadCounts(campaignIds: string[]) {
    if (campaignIds.length === 0) return new Map<string, number>();

    const objectIds = campaignIds
        .filter((id) => mongoose.Types.ObjectId.isValid(id))
        .map((id) => new mongoose.Types.ObjectId(id));

    const counts = await CampaignLead.aggregate([
        { $match: { campaignId: { $in: objectIds } } },
        { $group: { _id: "$campaignId", count: { $sum: 1 } } },
    ]);

    return new Map(counts.map((c) => [String(c._id), c.count as number]));
}

export async function GET() {
    try {
        await connectDB();
        const campaigns = await Campaign.find().sort({ createdAt: -1 }).lean();
        const ids = campaigns.map((c) => String(c._id));
        const leadCounts = await getLeadCounts(ids);

        const data = campaigns.map((c) => ({
            ...serializeCampaign(c as Record<string, unknown>),
            leadCount: leadCounts.get(String(c._id)) ?? 0,
        }));

        return NextResponse.json({ success: true, data });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Kampanyalar alınamadı";
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();

        const { _id, id, leadCount, ...data } = body;

        if (!data.title?.trim()) {
            return NextResponse.json({ success: false, error: "Kampanya başlığı gerekli" }, { status: 400 });
        }
        if (!data.startDate || !data.endDate) {
            return NextResponse.json({ success: false, error: "Başlangıç ve bitiş tarihi gerekli" }, { status: 400 });
        }

        const campaign = await Campaign.create({
            ...data,
            startDate: new Date(data.startDate),
            endDate: new Date(data.endDate),
        });

        return NextResponse.json({ success: true, data: serializeCampaign(campaign.toObject()) }, { status: 201 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Kampanya oluşturulamadı";
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}
