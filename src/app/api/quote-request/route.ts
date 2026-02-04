import { connectDB } from "@/lib/db";
import QuoteRequest from "@/models/QuoteRequest";
import { NextResponse } from "next/server";

// VERİ KAYDETME (Mevcut olan)
export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();
        const newRequest = await QuoteRequest.create({
            fullName: body.adSoyad,
            phone: body.telefon,
            email: body.email,
            selectedSize: body.olcu,
            message: body.mesaj,
            productName: body.productName || "Vakumlu Tabla"
        });
        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Hata oluştu" }, { status: 500 });
    }
}

// VERİLERİ ADMİN PANELİNE ÇEKME (Yeni ekle)
export async function GET() {
    try {
        await connectDB();
        const requests = await QuoteRequest.find().sort({ createdAt: -1 }); // En yeni en üstte
        return NextResponse.json(requests);
    } catch (error) {
        return NextResponse.json({ error: "Veriler alınamadı" }, { status: 500 });
    }
}