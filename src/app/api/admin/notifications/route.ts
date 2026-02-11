import { connectDB } from "@/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const db: any = mongoose.connection.db;

        /**
         * 1. SAYACIN ÇALIŞMASI İÇİN GEREKLİ SORGU:
         * Yeni modelde 'isRead' alanını tanımladık.
         * Sorgu: isRead'i 'true' OLMAYAN (yani false, null veya hiç yok) her şeyi say.
         */
        const unreadCount = await db.collection("teklifler").countDocuments({
            isRead: { $ne: true }
        });

        /**
         * 2. LİSTEYİ ÇEK:
         * En son gelen 5 teklifi, tarihine göre (en yeni en üstte) listele.
         */
        const latestOffers = await db.collection("teklifler")
            .find({})
            .sort({ createdAt: -1 }) // ID yerine createdAt üzerinden sıralama daha garantidir
            .limit(5)
            .toArray();

        // Terminalden debug yapman için (VS Code terminaline bak)
        console.log(`[DASHBOARD GÜNCELLEME] Okunmamış: ${unreadCount}, Toplam Liste: ${latestOffers.length}`);

        return NextResponse.json({ 
            success: true, 
            unreadCount: unreadCount,
            latestOffers: latestOffers 
        });
    } catch (error: any) {
        console.error("Dashboard API Hatası:", error.message);
        return NextResponse.json({ 
            success: false,
            unreadCount: 0, 
            latestOffers: [] 
        }, { status: 500 });
    }
}