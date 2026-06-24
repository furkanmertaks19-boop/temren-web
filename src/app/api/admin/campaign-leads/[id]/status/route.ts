import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import CampaignLead from "@/models/CampaignLead";
import { isCampaignLeadStatus } from "@/lib/campaignStatus";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, context: RouteContext) {
    try {
        await connectDB();
        const { id } = await context.params;
        const body = await req.json();

        if (!isCampaignLeadStatus(body.status)) {
            return NextResponse.json({ success: false, error: "Geçersiz durum" }, { status: 400 });
        }

        const updated = await CampaignLead.findByIdAndUpdate(
            id,
            { $set: { status: body.status } },
            { new: true }
        ).lean();

        if (!updated) {
            return NextResponse.json({ success: false, error: "Kayıt bulunamadı" }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: {
                id: String(updated._id),
                status: updated.status,
            },
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Durum güncellenemedi";
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}
