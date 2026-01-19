import { connectDB } from "@/lib/db";
import QuoteRequest from "@/models/QuoteRequest";
import { NextResponse, NextRequest } from "next/server";

// Next.js 15+ için params bir Promise olarak tanımlanmalıdır
export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        // params bir Promise olduğu için await ile içindeki veriyi alıyoruz
        const { id } = await params;

        // Hem 'status' hem 'okundu' alanlarını güncelliyoruz
        const updated = await QuoteRequest.findByIdAndUpdate(
            id,
            { status: "Okundu", okundu: true },
            { new: true }
        );

        if (!updated) {
            return NextResponse.json({ error: "Kayıt bulunamadı" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updated });
    } catch (error) {
        console.error("Güncelleme Hatası:", error);
        return NextResponse.json({ error: "Güncellenemedi" }, { status: 500 });
    }
}