import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export const runtime = 'nodejs';

cloudinary.config({
    cloud_name: "dbuyzwlux",
    api_key: "582855568923877",
    api_secret: "An0FxIVioD8lu6myL22PD3JbW5w",
    secure: true
});

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as Blob | null;

        if (!file) {
            return NextResponse.json({ error: "Dosya bulunamadı" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: "temren_web", resource_type: "auto" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(buffer);
        }) as any;

        return NextResponse.json({ url: result.secure_url });
    } catch (error: any) {
        console.error("Yükleme Hatası:", error);
        // Hatayı frontend'e detaylı gönderelim ki ne olduğunu anlayalım
        return NextResponse.json({ error: error.message || "Bilinmeyen hata" }, { status: 500 });
    }
}