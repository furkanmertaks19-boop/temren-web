import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Campaign from "@/models/Campaign";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(_req: NextRequest, context: RouteContext) {
    try {
        await connectDB();
        const { id } = await context.params;

        const campaign = await Campaign.findById(id);
        if (!campaign) {
            return NextResponse.json({ success: false, error: "Kampanya bulunamadı" }, { status: 404 });
        }

        campaign.isActive = !campaign.isActive;
        await campaign.save();

        return NextResponse.json({
            success: true,
            data: { id: String(campaign._id), isActive: campaign.isActive },
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Durum değiştirilemedi";
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}
