import { connectDB } from "@/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();

        const { adSoyad, email, telefon, mesaj, secim, dosyaAdi, konu, sourcePage, sourceLabel } = body;

        const db: any = mongoose.connection.db;
        const label = sourceLabel || secim || konu || "Genel İletişim";

        const result = await db.collection("teklifler").insertOne({
            adSoyad,
            email,
            telefon: telefon || "—",
            mesaj,
            konu: konu || null,
            secim: secim || label,
            dosya: dosyaAdi || null,
            formType: "contact",
            sourcePage: sourcePage || "/iletisim",
            sourceLabel: label,
            isRead: false,
            okundu: false,
            createdAt: new Date(),
        });

        return NextResponse.json({ success: true, id: result.insertedId });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Bilinmeyen hata";
        console.error("Form Gönderim Hatası:", message);
        return NextResponse.json({ error: "Mesaj iletilemedi." }, { status: 500 });
    }
}
