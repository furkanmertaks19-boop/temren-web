import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Senin Cloudinary bağlantı ayarların
cloudinary.config({
    cloud_name: "dbuyzwlux",
    api_key: "582855568923877",
    api_secret: "An0FxIVioD8lu6myL22PD3JbW5w",
});

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const file: File | null = data.get("file") as unknown as File;

        if (!file) {
            return NextResponse.json({ error: "Dosya bulunamadı" }, { status: 400 });
        }

        // Dosyayı Vercel'in okuyabileceği formata çeviriyoruz
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Dosyayı Cloudinary bulutuna gönderiyoruz
        const uploadResponse = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    resource_type: "auto",
                    folder: "temren_blog" // Resimler Cloudinary'de bu klasöre gider
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(buffer);
        }) as any;

        // Yüklenen resmin internet linkini geri döndürüyoruz
        return NextResponse.json({ url: uploadResponse.secure_url });

    } catch (error) {
        console.error("Cloudinary Yükleme Hatası:", error);
        return NextResponse.json({ error: "Yükleme sırasında bir hata oluştu" }, { status: 500 });
    }
}