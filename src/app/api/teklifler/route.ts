import { connectDB } from "@/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const db: any = mongoose.connection.db;

        /**
         * Veritabanı Bakımı: 
         * Eğer eski sistemden kalan 'okundu: true' verileri varsa, 
         * bunları sayaçla uyumlu 'isRead: true' haline getirir.
         */
        await db.collection("teklifler").updateMany(
            { okundu: true, isRead: { $exists: false } },
            { $set: { isRead: true } }
        );

        // Tüm teklifleri en yeni en üstte olacak şekilde çek
        const teklifler = await db.collection("teklifler")
            .find({})
            .sort({ _id: -1 })
            .toArray();

        // VS Code terminalinden takip için
        console.log(`[LİSTELEME] Toplam ${teklifler.length} teklif başarıyla çekildi.`);

        return NextResponse.json({ 
            success: true, 
            data: teklifler 
        });
    } catch (error: any) {
        console.error("Teklif listeleme hatası:", error.message);
        return NextResponse.json({ 
            success: false,
            error: "Veri çekme hatası: " + error.message 
        }, { status: 500 });
    }
}