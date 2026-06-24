import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Campaign from "@/models/Campaign";
import CampaignLead from "@/models/CampaignLead";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(req: NextRequest, context: RouteContext) {
    try {
        await connectDB();
        const { id } = await context.params;
        const body = await req.json();

        const campaign = await Campaign.findById(id).lean();
        if (!campaign) {
            return NextResponse.json({ success: false, error: "Kampanya bulunamadı" }, { status: 404 });
        }

        const now = new Date();
        if (!campaign.isActive || campaign.startDate > now || campaign.endDate < now) {
            return NextResponse.json({ success: false, error: "Kampanya aktif değil" }, { status: 400 });
        }

        const name = (body.name || body.adSoyad || "").trim();
        const phone = (body.phone || body.telefon || "").trim();
        const email = (body.email || "").trim();

        if (!name || !phone || !email) {
            return NextResponse.json(
                { success: false, error: "Ad soyad, telefon ve e-posta zorunludur" },
                { status: 400 }
            );
        }

        const checkTime = new Date(Date.now() - 15000);
        const existing = await CampaignLead.findOne({
            campaignId: id,
            email,
            createdAt: { $gt: checkTime },
        });

        if (existing) {
            return NextResponse.json({ success: true, data: existing, message: "Duplicate blocked" });
        }

        const lead = await CampaignLead.create({
            campaignId: id,
            campaignTitle: campaign.title,
            name,
            company: (body.company || body.firma || "").trim(),
            phone,
            email,
            message: (body.message || body.mesaj || "").trim(),
            status: "Yeni",
        });

        return NextResponse.json({ success: true, data: lead }, { status: 201 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Teklif gönderilemedi";
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}
