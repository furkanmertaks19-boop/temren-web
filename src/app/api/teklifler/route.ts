import { connectDB } from "@/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { normalizeTeklif, type NormalizedTeklif } from "@/lib/teklifNormalizer";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        await connectDB();
        const db: any = mongoose.connection.db;

        await db.collection("teklifler").updateMany(
            { okundu: true, isRead: { $ne: true } },
            { $set: { isRead: true } }
        );

        const raw = await db.collection("teklifler")
            .find({})
            .sort({ createdAt: -1, _id: -1 })
            .toArray();

        const seen = new Set<string>();
        const data = raw
            .map((doc: Record<string, unknown>) => normalizeTeklif({ ...doc, _id: String(doc._id) }))
            .filter((item: NormalizedTeklif) => {
                if (seen.has(item._id)) return false;
                seen.add(item._id);
                return true;
            });

        return NextResponse.json({ success: true, data, total: data.length });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Bilinmeyen hata";
        console.error("Teklif listeleme hatası:", message);
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}
