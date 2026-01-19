import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const file: File | null = data.get("file") as unknown as File;

        if (!file) return NextResponse.json({ error: "Dosya bulunamadı" }, { status: 400 });

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // public/uploads klasörüne kaydet
        const path = join(process.cwd(), "public", "uploads");

        // Klasör yoksa oluştur
        try { await mkdir(path, { recursive: true }); } catch (e) { }

        const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
        const filePath = join(path, fileName);

        await writeFile(filePath, buffer);

        return NextResponse.json({ url: `/uploads/${fileName}` });
    } catch (error) {
        return NextResponse.json({ error: "Yükleme hatası" }, { status: 500 });
    }
}