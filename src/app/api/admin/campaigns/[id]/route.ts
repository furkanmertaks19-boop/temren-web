import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Campaign from "@/models/Campaign";
import CampaignLead from "@/models/CampaignLead";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

function serializeCampaign(doc: Record<string, unknown>) {
    return {
        id: String(doc._id),
        title: doc.title,
        shortDescription: doc.shortDescription,
        description: doc.description,
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

export async function GET(_req: NextRequest, context: RouteContext) {
    try {
        await connectDB();
        const { id } = await context.params;
        const campaign = await Campaign.findById(id).lean();

        if (!campaign) {
            return NextResponse.json({ success: false, error: "Kampanya bulunamadı" }, { status: 404 });
        }

        const leadCount = await CampaignLead.countDocuments({ campaignId: id });

        return NextResponse.json({
            success: true,
            data: { ...serializeCampaign(campaign as Record<string, unknown>), leadCount },
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Kampanya alınamadı";
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest, context: RouteContext) {
    try {
        await connectDB();
        const { id } = await context.params;
        const body = await req.json();

        const { _id, id: bodyId, leadCount, ...data } = body;

        if (data.startDate) data.startDate = new Date(data.startDate);
        if (data.endDate) data.endDate = new Date(data.endDate);

        const updated = await Campaign.findByIdAndUpdate(id, { $set: data }, { new: true }).lean();

        if (!updated) {
            return NextResponse.json({ success: false, error: "Kampanya bulunamadı" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: serializeCampaign(updated as Record<string, unknown>) });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Kampanya güncellenemedi";
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}

export async function DELETE(_req: NextRequest, context: RouteContext) {
    try {
        await connectDB();
        const { id } = await context.params;

        const deleted = await Campaign.findByIdAndDelete(id);
        if (!deleted) {
            return NextResponse.json({ success: false, error: "Kampanya bulunamadı" }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Kampanya silinemedi";
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}
