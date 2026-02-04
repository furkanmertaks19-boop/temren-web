import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();

        const newProduct = await Product.create(body);

        return NextResponse.json({ success: true, data: newProduct }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Ürün eklenemedi." }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectDB();
        const products = await Product.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: products });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Ürünler getirilemedi." });
    }
}