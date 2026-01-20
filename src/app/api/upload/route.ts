import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // Blob server-side için güvenli tercih

const MAX_BYTES = 4.5 * 1024 * 1024; // Vercel "server upload" pratik limit

function safeFileName(name: string) {
    // uzantıyı koru, karakterleri temizle
    const cleaned = name
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-zA-Z0-9._-]/g, "");

    // boşsa default ver
    return cleaned.length ? cleaned : `file-${Date.now()}`;
}

export async function POST(request: Request) {
    try {
        const urlObj = new URL(request.url);
        const filenameParam = urlObj.searchParams.get("filename") || "";

        const contentType = request.headers.get("content-type") || "";

        // 1) Senin mevcut yapın: multipart/form-data (FormData)
        if (contentType.includes("multipart/form-data")) {
            const formData = await request.formData();
            const file = formData.get("file") as File | null;

            if (!file) {
                return NextResponse.json(
                    { error: "Dosya seçilmedi (file alanı boş)" },
                    { status: 400 }
                );
            }

            if (typeof file.size === "number" && file.size > MAX_BYTES) {
                return NextResponse.json(
                    { error: "Dosya çok büyük. Maksimum 4.5MB yükleyebilirsin." },
                    { status: 413 }
                );
            }

            const originalName = filenameParam || file.name || `upload-${Date.now()}`;
            const finalName = safeFileName(originalName);

            // Klasörlü ve benzersiz isim
            const key = `uploads/${Date.now()}-${finalName}`;

            const blob = await put(key, file, {
                access: "public",
                // contentType: file.type || "application/octet-stream", // istersen aç
            });

            return NextResponse.json({ url: blob.url });
        }

        // 2) Alternatif: raw body upload (Vercel docs'taki gibi) -> body: file
        // Bunu kullanacaksan frontend: fetch("/api/upload?filename=xxx", {method:"POST", body:file})
        const arrayBuffer = await request.arrayBuffer();
        const size = arrayBuffer.byteLength;

        if (!size) {
            return NextResponse.json(
                { error: "İstek gövdesi boş (dosya gelmedi)" },
                { status: 400 }
            );
        }

        if (size > MAX_BYTES) {
            return NextResponse.json(
                { error: "Dosya çok büyük. Maksimum 4.5MB yükleyebilirsin." },
                { status: 413 }
            );
        }

        const finalName = safeFileName(filenameParam || `upload-${Date.now()}`);
        const key = `uploads/${Date.now()}-${finalName}`;

        const blob = await put(key, arrayBuffer, {
            access: "public",
            contentType: contentType || "application/octet-stream",
        });

        return NextResponse.json({ url: blob.url });
    } catch (error: any) {
        console.error("Upload Hatası:", error);
        return NextResponse.json(
            { error: "Yükleme başarısız: " + (error?.message || "Bilinmeyen hata") },
            { status: 500 }
        );
    }
}
