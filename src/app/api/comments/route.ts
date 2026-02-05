import { NextResponse } from "next/server";
import dbConnect from "@/lib/db"; 
import Comment from "@/models/Comment";

// Sitede sadece onaylanmış yorumları listelemek için
export async function GET() {
  try {
    await dbConnect();
    const comments = await Comment.find({ isActive: true }).sort({ createdAt: -1 });
    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json({ error: "Yorumlar çekilemedi" }, { status: 500 });
  }
}

// Müşterinin formdan yeni yorum göndermesi için
export async function POST(req: Request) {
  try {
    const body = await req.json();
    await dbConnect();
    
    const newComment = await Comment.create({
      name: body.name,
      quote: body.quote,
      role: "Müşteri",
      isActive: false // Yönetici onayı için varsayılan false
    });

    return NextResponse.json({ message: "Yorum başarıyla iletildi" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Yorum gönderilemedi" }, { status: 500 });
  }
}