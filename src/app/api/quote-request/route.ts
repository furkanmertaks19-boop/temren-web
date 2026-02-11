import { connectDB } from "@/lib/db";
import QuoteRequest from "@/models/QuoteRequest";
import { NextResponse } from "next/server";

// GLOBAL BİR KİLİT (Bellekte tutulur)
let lastSubmissionTime = 0;
let lastEmail = "";

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();
        const now = Date.now();

        // 1. BELLEK SEVİYESİNDE KİLİTLEME (EN ETKİLİ YOL)
        // Eğer son 5 saniye içinde aynı maille bir istek geldiyse ANINDA REDDET
        if (lastEmail === body.email && (now - lastSubmissionTime) < 5000) {
            console.log("⚠️ [DUPLICATE] Bellek kilidi tetiklendi, ikinci istek yakıldı.");
            return NextResponse.json({ success: true, status: "blocked" });
        }

        // Kilidi güncelle
        lastSubmissionTime = now;
        lastEmail = body.email;

        // 2. VERİTABANI KONTROLÜ
        const checkTime = new Date(now - 10000);
        const existing = await QuoteRequest.findOne({
            email: body.email,
            createdAt: { $gt: checkTime }
        });

        if (existing) {
            return NextResponse.json({ success: true, message: "Duplicate" });
        }

        // 3. KAYIT
        const newRequest = await QuoteRequest.create({
            fullName: body.adSoyad,
            phone: body.telefon,
            email: body.email,
            selectedSize: body.olcu,
            message: body.mesaj,
            productName: body.productName || "Vakumlu Tabla",
            isRead: false,
            okundu: false
        });

        return NextResponse.json({ success: true, data: newRequest }, { status: 201 });

    } catch (error: any) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectDB();
        const requests = await QuoteRequest.find().sort({ createdAt: -1 }); 
        return NextResponse.json(requests);
    } catch (error) {
        return NextResponse.json({ error: "Veriler alınamadı" }, { status: 500 });
    }
}