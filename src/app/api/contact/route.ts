import { connectDB } from "@/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

const contactSchema = z.object({
  adSoyad: z.string().trim().min(2, "Ad soyad en az 2 karakter olmalı").max(120),
  email: z.string().trim().email("Geçerli bir e-posta girin").max(200),
  telefon: z.string().trim().max(30).optional(),
  mesaj: z.string().trim().min(5, "Mesaj en az 5 karakter olmalı").max(3000),
  secim: z.string().trim().max(200).optional(),
  dosyaAdi: z.string().trim().max(200).optional(),
  konu: z.string().trim().max(200).optional(),
  sourcePage: z.string().trim().max(300).optional(),
  sourceLabel: z.string().trim().max(200).optional(),
});

export async function POST(request: Request) {
    try {
        const ip = getClientIp(request);
        if (!checkRateLimit(`contact:${ip}`, 6, 60_000)) {
            return NextResponse.json(
                { error: "Çok fazla istek. Lütfen bir dakika sonra tekrar deneyin." },
                { status: 429 }
            );
        }

        await connectDB();
        const body = await request.json();
        const parsed = contactSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { error: parsed.error.issues[0]?.message || "Geçersiz form verisi" },
                { status: 400 }
            );
        }

        const { adSoyad, email, telefon, mesaj, secim, dosyaAdi, konu, sourcePage, sourceLabel } =
            parsed.data;

        const db = mongoose.connection.db;
        if (!db) {
            return NextResponse.json({ error: "Veritabanı bağlantısı kurulamadı." }, { status: 500 });
        }

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
            status: "Yeni",
            createdAt: new Date(),
        });

        return NextResponse.json({ success: true, id: result.insertedId });
    } catch (error: unknown) {
        console.error("Form Gönderim Hatası:", error);
        return NextResponse.json({ error: "Mesaj iletilemedi." }, { status: 500 });
    }
}
