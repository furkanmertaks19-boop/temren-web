import { connectDB } from "@/lib/db";
import QuoteRequest from "@/models/QuoteRequest";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const { id } = params;

        // Hem 'status' hem 'okundu' alanlarını güncelliyoruz ki iki taraflı garanti olsun
        const updated = await QuoteRequest.findByIdAndUpdate(
            id,
            { status: "Okundu", okundu: true },
            { new: true }
        );

        return NextResponse.json({ success: true, data: updated });
    } catch (error) {
        return NextResponse.json({ error: "Güncellenemedi" }, { status: 500 });
    }
}