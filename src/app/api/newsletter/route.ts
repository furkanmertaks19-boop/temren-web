import { connectDB } from "@/lib/db";
import Newsletter from "@/models/Newsletter";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        await connectDB();
        const { email } = await req.json();
        if (!email || !email.includes("@")) return NextResponse.json({ error: "Geçersiz e-posta" }, { status: 400 });

        await Newsletter.create({ email });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        if (error.code === 11000) return NextResponse.json({ error: "Zaten kayıtlısınız" }, { status: 400 });
        return NextResponse.json({ error: "Hata oluştu" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectDB();
        const subscribers = await Newsletter.find().sort({ createdAt: -1 });
        return NextResponse.json(subscribers);
    } catch (error) {
        return NextResponse.json({ error: "Veriler çekilemedi" }, { status: 500 });
    }
}