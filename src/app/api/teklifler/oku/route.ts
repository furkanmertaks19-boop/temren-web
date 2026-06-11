import { connectDB } from "@/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
    try {
        await connectDB();
        const { id } = await request.json();
        
        if (!id) {
            return NextResponse.json({ error: "ID belirtilmedi" }, { status: 400 });
        }

        const db: any = mongoose.connection.db;

        /**
         * Veritabanı Senkronizasyonu:
         * Dashboard sayacı 'isRead' alanına bakıyor, 
         * Teklifler listesi 'okundu' alanına bakıyor olabilir.
         * İkisini de true yaparak tüm sistemi senkronize ediyoruz.
         */
        const result = await db.collection("teklifler").updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    isRead: true,
                    okundu: true,
                    status: "Görüşüldü",
                    readAt: new Date(),
                },
            }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ error: "Kayıt bulunamadı" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Teklif okundu olarak işaretlendi" });
    } catch (error: any) {
        console.error("Okundu işaretleme hatası:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}