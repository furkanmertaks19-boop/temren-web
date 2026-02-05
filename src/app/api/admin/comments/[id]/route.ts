import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Comment from "@/models/Comment";

// ✏️ YORUM GÜNCELLEME (Onaylama + Video Ekleme + Düzenleme)
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    
    // Next.js 15 için params unwrap
    const { id } = await params;
    
    // Admin panelinden gelen tüm datayı alıyoruz (isActive, youtubeId, type, name vb.)
    const body = await req.json();

    const updated = await Comment.findByIdAndUpdate(
      id, 
      { ...body }, // Gelen tüm alanları tek seferde günceller
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Yorum bulunamadı" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Güncelleme Hatası:", error);
    return NextResponse.json({ error: "Güncelleme işlemi başarısız oldu" }, { status: 500 });
  }
}

// 🗑️ YORUM SİLME
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    
    const { id } = await params;

    const deleted = await Comment.findByIdAndDelete(id);
    
    if (!deleted) {
      return NextResponse.json({ error: "Silinecek yorum bulunamadı" }, { status: 404 });
    }

    return NextResponse.json({ message: "Yorum başarıyla silindi" });
  } catch (error) {
    console.error("Silme Hatası:", error);
    return NextResponse.json({ error: "Silme işlemi başarısız oldu" }, { status: 500 });
  }
}