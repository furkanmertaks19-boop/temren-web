import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Slider from "@/models/Slider";
// Next.js'in veriyi cache (önbellek) yapmasını engellemek için
export const dynamic = 'force-dynamic';

/**
 * 1. GET: Tüm Slider verilerini çek
 */
export async function GET() {
    try {
        await connectDB();
        const slides = await Slider.find({}).sort({ order: 1 });
        return NextResponse.json(slides, { status: 200 });
    } catch (error: any) {
        console.error("GET Error:", error);
        return NextResponse.json(
            {
                error: "Veriler veritabanından alınamadı",
                detail: error?.message || String(error),
            },
            { status: 500 }
        );
    }
}

/**
 * 2. POST: Tam Senkronizasyon (Eskileri sil, yenileri yaz)
 */
export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const body = await request.json();

        if (Array.isArray(body)) {
            // --- KRİTİK NOKTA: VERİTABANINI TEMİZLE ---
            // Sadece admin panelindeki listenin geçerli olması için her şeyi siliyoruz.
            await Slider.deleteMany({});

            if (body.length === 0) {
                return NextResponse.json([], { status: 200 });
            }

            // Verileri temizle ve standart hale getir (Büyük harf vb.)
            const formattedSlides = body.map((item, index) => ({
                title: item.title?.toUpperCase()?.trim() || "BAŞLIKSIZ",
                subtitle: item.subtitle?.toUpperCase()?.trim() || "",
                description: item.description?.trim() || "",
                image: item.image,
                buttonText: item.buttonText?.toUpperCase() || "İNCELE",
                buttonLink: item.buttonLink || "/",
                isActive: item.isActive !== undefined ? item.isActive : true,
                order: index // Paneldeki sıralamayı baz al
            }));

            const updatedSlides = await Slider.insertMany(formattedSlides);
            return NextResponse.json(updatedSlides, { status: 201 });
        }

        // Tekli veri girişi için fallback
        const newSlide = await Slider.create(body);
        return NextResponse.json(newSlide, { status: 201 });

    } catch (error: any) {
        console.error("POST Error:", error);
        return NextResponse.json({ error: error.message || "İşlem sırasında bir hata oluştu" }, { status: 500 });
    }
}

/**
 * 3. DELETE: ID ile Slayt Sil
 */
export async function DELETE(request: NextRequest) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) return NextResponse.json({ error: "ID parametresi eksik" }, { status: 400 });

        const result = await Slider.findByIdAndDelete(id);
        if (!result) return NextResponse.json({ error: "Slayt bulunamadı" }, { status: 404 });

        return NextResponse.json({ message: "Slayt başarıyla silindi" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Silme işlemi başarısız" }, { status: 500 });
    }
}