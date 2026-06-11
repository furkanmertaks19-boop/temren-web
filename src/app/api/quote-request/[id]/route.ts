import { connectDB } from "@/lib/db";
import QuoteRequest from "@/models/QuoteRequest";
import { NextResponse, NextRequest } from "next/server";

type RouteContext = {
    params: Promise<{ id: string }>;
};

export async function PATCH(
    _req: NextRequest,
    context: RouteContext
) {
    try {
        await connectDB();
        const { id } = await context.params;

        const updated = await QuoteRequest.findByIdAndUpdate(
            id,
            { status: "Okundu", okundu: true, isRead: true, readAt: new Date() },
            { new: true }
        );

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
