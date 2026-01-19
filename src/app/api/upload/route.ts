import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "Dosya seçilmedi" }, { status: 400 });
        }

        // Vercel Blob'a doğrudan yüklüyoruz. Token ayarlarını Vercel otomatik yapar.
        const blob = await put(file.name, file, {
            access: "public",
        });

        return NextResponse.json(blob);
    } catch (error: any) {
        console.error("Blob Yükleme Hatası:", error);
        return NextResponse.json({ error: "Yükleme başarısız: " + error.message }, { status: 500 });
    }
}