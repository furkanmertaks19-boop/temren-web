import { connectDB } from "@/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const db: any = mongoose.connection.db;

        const unreadCount = await db.collection("teklifler").countDocuments({
            $and: [
                { isRead: { $ne: true } },
                { okundu: { $ne: true } },
                { status: { $ne: "Okundu" } }
            ]
        });

        const latestOffers = await db.collection("teklifler")
            .find({})
            .sort({ createdAt: -1 })
            .limit(5)
            .toArray();

        return NextResponse.json({ success: true, unreadCount, latestOffers });
    } catch (error: any) {
        return NextResponse.json({ success: false, unreadCount: 0, latestOffers: [] }, { status: 500 });
    }
}