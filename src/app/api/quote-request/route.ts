import { connectDB } from "@/lib/db";
import QuoteRequest from "@/models/QuoteRequest";
import { NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

const quoteSchema = z.object({
  adSoyad: z.string().trim().min(2).max(120),
  telefon: z.string().trim().min(7).max(30),
  email: z.string().trim().email().max(200),
  olcu: z.string().trim().max(100).optional(),
  mesaj: z.string().trim().max(3000).optional(),
  productName: z.string().trim().max(200).optional(),
  sourcePage: z.string().trim().max(300).optional(),
  sourceLabel: z.string().trim().max(200).optional(),
});

export async function POST(req: Request) {
    try {
        const ip = getClientIp(req);
        if (!checkRateLimit(`quote:${ip}`, 6, 60_000)) {
            return NextResponse.json({ success: false, error: "Çok fazla istek." }, { status: 429 });
        }

        await connectDB();
        const body = await req.json();
        const parsed = quoteSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { success: false, error: parsed.error.issues[0]?.message || "Geçersiz veri" },
                { status: 400 }
            );
        }

        const data = parsed.data;
        const label = data.sourceLabel || data.productName || "Ürün Teklifi";
        const page = data.sourcePage || "/urunler";

        const checkTime = new Date(Date.now() - 15000);
        const existing = await QuoteRequest.findOne({
            email: data.email,
            sourcePage: page,
            createdAt: { $gt: checkTime },
        });

        if (existing) {
            return NextResponse.json({ success: true, message: "Duplicate blocked", data: existing });
        }

        const newRequest = await QuoteRequest.create({
            fullName: data.adSoyad,
            phone: data.telefon,
            email: data.email,
            selectedSize: data.olcu,
            message: data.mesaj,
            productName: data.productName || label,
            formType: "quote",
            sourcePage: page,
            sourceLabel: label,
            isRead: false,
            okundu: false,
            status: "Yeni",
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
