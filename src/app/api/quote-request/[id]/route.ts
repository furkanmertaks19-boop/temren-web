import { connectDB } from "@/lib/db";
import QuoteRequest from "@/models/QuoteRequest";
import { isTeklifStatus } from "@/lib/teklifStatus";
import { NextResponse, NextRequest } from "next/server";

type RouteContext = {
    params: Promise<{ id: string }>;
};

export async function PATCH(
    req: NextRequest,
    context: RouteContext
) {
    try {
        await connectDB();
        const { id } = await context.params;
        const body = await req.json().catch(() => ({}));
        const requestedStatus = body?.status;

        let update: Record<string, unknown>;

        if (requestedStatus && isTeklifStatus(requestedStatus)) {
            update = { status: requestedStatus };
            if (requestedStatus === "Yeni") {
                update.isRead = false;
                update.okundu = false;
                update.readAt = null;
            } else {
                update.isRead = true;
                update.okundu = true;
                update.readAt = new Date();
            }
        } else {
            update = {
                status: "Görüşüldü",
                okundu: true,
                isRead: true,
                readAt: new Date(),
            };
        }

        const updated = await QuoteRequest.findByIdAndUpdate(id, update, { new: true });

        if (!updated) {
            return NextResponse.json(
                { success: false, error: "Kayıt bulunamadı" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: updated });
    } catch (error: unknown) {
        console.error("Güncelleme Hatası:", error);
        return NextResponse.json(
            { success: false, error: "Güncellenemedi" },
            { status: 500 }
        );
    }
}
