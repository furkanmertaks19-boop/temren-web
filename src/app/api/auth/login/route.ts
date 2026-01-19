import { connectDB } from "@/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        await connectDB(); // Veritabanına bağlan
        const { username, password } = await request.json();

        const db: any = mongoose.connection.db;

        // 1. Önce kullanıcıyı bulalım
        const user = await db.collection("admins").findOne({ username: username });

        if (!user) {
            return NextResponse.json({ error: "Kullanıcı veritabanında yok!" }, { status: 401 });
        }

        // 2. Şifreyi DÜZ METİN olarak kontrol edelim (Yeni DB için en garantisi)
        if (user.password !== password) {
            return NextResponse.json({ error: "Şifre uyuşmuyor!" }, { status: 401 });
        }

        // 3. Her şey doğruysa
        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error("HATA:", error.message);
        return NextResponse.json({ error: "Bağlantı koptu: " + error.message }, { status: 500 });
    }
}