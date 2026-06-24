import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import CampaignLead from "@/models/CampaignLead";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        await connectDB();
        const leads = await CampaignLead.find().sort({ createdAt: -1 }).lean();

        const data = leads.map((lead) => ({
            id: String(lead._id),
            campaignId: String(lead.campaignId),
            campaignTitle: lead.campaignTitle,
            name: lead.name,
            company: lead.company,
            phone: lead.phone,
            email: lead.email,
            message: lead.message,
            status: lead.status,
            createdAt: lead.createdAt,
            updatedAt: lead.updatedAt,
        }));

        return NextResponse.json({ success: true, data });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Teklifler alınamadı";
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}
