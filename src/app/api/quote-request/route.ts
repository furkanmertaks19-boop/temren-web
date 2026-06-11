import { connectDB } from "@/lib/db";
import QuoteRequest from "@/models/QuoteRequest";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();

        const label = body.sourceLabel || body.productName || "Ürün Teklifi";
        const page = body.sourcePage || "/urunler";

        const checkTime = new Date(Date.now() - 15000);
        const existing = await QuoteRequest.findOne({
            email: body.email,
            sourcePage: page,
            createdAt: { $gt: checkTime },
        });

        if (existing) {
            return NextResponse.json({ success: true, message: "Duplicate blocked", data: existing });
        }

        const newRequest = await QuoteRequest.create({
            fullName: body.adSoyad,
            phone: body.telefon,
            email: body.email,
            selectedSize: body.olcu,
            message: body.mesaj,
            productName: body.productName || label,
            formType: "quote",
            sourcePage: page,
            sourceLabel: label,
            isRead: false,
            okundu: false,
        });

        return NextResponse.json({ success: true, data: newRequest }, { status: 201 });
    } catch (error: unknown) {
        console.error("Quote request error:", error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectDB();
        const requests = await QuoteRequest.find().sort({ createdAt: -1 });
        return NextResponse.json(requests);
    } catch {
        return NextResponse.json({ error: "Veriler alınamadı" }, { status: 500 });
    }
}
