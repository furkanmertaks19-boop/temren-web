import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Comment from "@/models/Comment";

// Admin panelinde onaylı/onaysız hepsini listeler
export async function GET() {
  try {
    await dbConnect();
    const comments = await Comment.find().sort({ createdAt: -1 });
    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json({ error: "Veriler yüklenemedi" }, { status: 500 });
  }
}