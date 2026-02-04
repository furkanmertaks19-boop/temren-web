import { connectDB } from "@/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const db: any = mongoose.connection.db;

        // Koleksiyon adının MongoDB'deki ile birebir aynı olduğundan emin ol
        const teklifler = await db.collection("teklifler")
            .find({})
            .sort({ _id: -1 })
            .toArray();

        console.log("Bulunan teklif sayısı:", teklifler.length); // VS Code terminaline bakar mısın?
        return NextResponse.json({ success: true, data: teklifler });
    } catch (error: any) {
        return NextResponse.json({ error: "Veri çekme hatası: " + error.message }, { status: 500 });
    }
}