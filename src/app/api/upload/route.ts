import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import {
    CAMPAIGN_ALLOWED_MIME_TYPES,
    CAMPAIGN_MAX_IMAGE_SIZE,
    CAMPAIGN_MAX_VIDEO_SIZE,
} from "@/lib/campaignStatus";

export const runtime = "nodejs";

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dbuyzwlux",
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;
        const context = formData.get("context") as string | null;

        if (!file) {
            return NextResponse.json({ error: "Dosya seçilmedi" }, { status: 400 });
        }

        if (context === "campaign") {
            if (!CAMPAIGN_ALLOWED_MIME_TYPES.has(file.type)) {
                return NextResponse.json(
                    { error: "Sadece JPG, PNG, GIF, MP4 ve WEBM dosyaları yüklenebilir" },
                    { status: 400 }
                );
            }

            const isVideo = file.type.startsWith("video/");
            const maxSize = isVideo ? CAMPAIGN_MAX_VIDEO_SIZE : CAMPAIGN_MAX_IMAGE_SIZE;
            if (file.size > maxSize) {
                return NextResponse.json(
                    { error: isVideo ? "Video boyutu 50MB'dan büyük olamaz" : "Dosya boyutu 10MB'dan büyük olamaz" },
                    { status: 400 }
                );
            }
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: "temren/uploads",
                    resource_type: "auto",
                },
                (error, uploadResult) => {
                    if (error) reject(error);
                    else resolve(uploadResult as { secure_url: string });
                }
            );
            uploadStream.end(buffer);
        });

        return NextResponse.json({ url: result.secure_url });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Yükleme hatası";
        console.error("UPLOAD ERROR:", error);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
