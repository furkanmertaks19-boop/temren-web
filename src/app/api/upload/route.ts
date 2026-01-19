import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Vercel'in bu rotayı kısıtlı bir ortamda çalıştırmasını engelliyoruz
export const dynamic = 'force-dynamic';

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
            return NextResponse.json({ error: "Dosya form-data içinde bulunamadı" }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Cloudinary yükleme sözü (Promise)
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: "temren_web_yeni",
                    resource_type: "auto"
                },
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary Detaylı Hata:", error);
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );
            uploadStream.end(buffer);
        });

        return NextResponse.json(result);

    } catch (error: any) {
        // BURASI ÇOK ÖNEMLİ: Hatayı Vercel loglarında açıkça göreceğiz
        console.error("KRİTİK YÜKLEME HATASI:", error.message);
        return NextResponse.json({
            error: "Sunucu Hatası",
            details: error.message
        }, { status: 500 });
    }
}