import { connectDB } from "@/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
    try {
        await connectDB();
        const { id } = await request.json();
        const db: any = mongoose.connection.db;

        await db.collection("teklifler").updateOne(
            { _id: new ObjectId(id) },
            { $set: { okundu: true } }
        );

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}