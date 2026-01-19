import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dbuyzwlux",
    api_key: process.env.CLOUDINARY_API_KEY || "582855568923877",
    api_secret: process.env.CLOUDINARY_API_SECRET || "An0FxIVioD8lu6myL22PD3JbW5w",
    secure: true
});

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const file = data.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "Dosya bulunamadı" }, { status: 400 });
        }

        // Dosyayı arrayBuffer üzerinden okumak Vercel için daha güvenlidir
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResponse = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: "temren_web", resource_type: "auto" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(buffer);
        }) as any;

        return NextResponse.json({ url: uploadResponse.secure_url });

    } catch (error: any) {
        console.error("Yükleme Hatası:", error);
        return NextResponse.json({ error: error.message || "Sunucu hatası" }, { status: 500 });
    }
}