import { connectDB } from "@/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();

        // Formdan gelen verileri parçalıyoruz
        const { adSoyad, email, telefon, mesaj, secim, dosyaAdi } = body;

        const db: any = mongoose.connection.db;

        // Veriyi 'teklifler' koleksiyonuna kaydediyoruz
        const result = await db.collection("teklifler").insertOne({
            adSoyad,
            email,
            telefon,
            mesaj,
            secim: secim || "Genel İletişim", // Palet, Vakum Tablası vb.
            dosya: dosyaAdi || null,
            okundu: false, // Yeni gelen her mesaj okunmadı olarak başlar
            createdAt: new Date(),
        });

        return NextResponse.json({ success: true, id: result.insertedId });
    } catch (error: any) {
        console.error("Form Gönderim Hatası:", error);
        return NextResponse.json({ error: "Mesaj iletilemedi." }, { status: 500 });
    }
}