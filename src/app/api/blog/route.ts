import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";

export async function GET() {
    try {
        await connectDB();
        const blogs = await Blog.find({}).sort({ createdAt: -1 }).lean();
        return NextResponse.json(blogs);
    } catch (error) {
        return NextResponse.json({ error: "Hata" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        const { _id, ...data } = body;
        if (_id && _id.length > 10) {
            const updated = await Blog.findByIdAndUpdate(_id, data, { new: true });
            return NextResponse.json(updated);
        } else {
            const newPost = await Blog.create(data);
            return NextResponse.json(newPost);
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        await connectDB();
        const { id } = await req.json();
        await Blog.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Hata" }, { status: 500 });
    }
}