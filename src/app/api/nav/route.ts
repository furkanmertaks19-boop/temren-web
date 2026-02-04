import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Nav from "@/models/Nav";

export async function GET() {
    try {
        await connectDB();
        // Önce tüm menüleri sırasıyla getiriyoruz
        const items = await Nav.find({}).sort({ order: 1 }).lean();
        return NextResponse.json(items, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Hata oluştu" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const body = await request.json(); // Admin panelinden gelen tüm ağaç yapısı

        // Basitleştirmek için: Önce her şeyi sil, sonra yeni hiyerarşiyi kaydet
        await Nav.deleteMany({});
        const result = await Nav.insertMany(body);

        return NextResponse.json(result, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}