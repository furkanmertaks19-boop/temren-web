import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";

// 1. HABERLERİ LİSTELE
export async function GET(req: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const limitParam = searchParams.get("limit");
        const limit = limitParam ? Math.min(Math.max(parseInt(limitParam, 10) || 0, 1), 50) : 0;

        let query = Blog.find({}).sort({ createdAt: -1 });
        if (limit > 0) {
            query = query.limit(limit);
        }

        const blogs = await query.lean();

        return NextResponse.json(Array.isArray(blogs) ? blogs : [], {
            status: 200,
            headers: {
                "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600",
            },
        });
    } catch (error) {
        console.error("BLOG_GET_ERROR:", error);

        // Frontend .sort yapacağı için object değil array dönüyoruz
        return NextResponse.json([], { status: 200 });
    }
}
// 2. YENİ HABER OLUŞTUR
export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        
        // _id gelirse siliyoruz ki MongoDB otomatik atasın (yeni kayıt garantisi)
        const { _id, ...data } = body;
        
        const newPost = await Blog.create(data);
        return NextResponse.json(newPost);
    } catch (error: any) {
        console.error("POST_ERROR:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// 3. HABER GÜNCELLE (DÜZENLEME İŞLEMİ)
export async function PUT(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        const { _id, ...data } = body;

        if (!_id) {
            return NextResponse.json({ error: "Güncelleme için ID gerekli" }, { status: 400 });
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            _id,
            { $set: data },
            { new: true } // Güncellenmiş halini geri döndür
        );

        if (!updatedBlog) {
            return NextResponse.json({ error: "Haber bulunamadı" }, { status: 404 });
        }

        return NextResponse.json(updatedBlog);
    } catch (error: any) {
        console.error("PUT_ERROR:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// 4. HABER SİL
export async function DELETE(req: NextRequest) {
    try {
        await connectDB();
        const { id } = await req.json();
        
        if (!id) {
            return NextResponse.json({ error: "Silinecek ID gerekli" }, { status: 400 });
        }

        await Blog.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Silme işlemi başarısız" }, { status: 500 });
    }
}