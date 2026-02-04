import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export const runtime = "nodejs";

const MAX_BYTES = 20 * 1024 * 1024; // 20MB
const UPLOAD_DIR = process.env.UPLOAD_DIR || "/data/uploads";

function safeName(name: string) {
    return (name || "upload")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-zA-Z0-9._-]/g, "");
}

export async function POST(req: Request) {
    try {
        const form = await req.formData();
        const file = form.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "Dosya seçilmedi" }, { status: 400 });
        }

        if (file.size > MAX_BYTES) {
            return NextResponse.json({ error: "Dosya çok büyük" }, { status: 413 });
        }

        await fs.mkdir(UPLOAD_DIR, { recursive: true });

        const ext = path.extname(file.name);
        const base = safeName(path.basename(file.name, ext));
        const filename = `${Date.now()}-${base}${ext}`;
        const filepath = path.join(UPLOAD_DIR, filename);

        const bytes = await file.arrayBuffer();
        await fs.writeFile(filepath, Buffer.from(bytes));

        return NextResponse.json({ url: `/uploads/${filename}` });
    } catch (e: any) {
        console.error("UPLOAD_ERROR:", e);
        return NextResponse.json({ error: e?.message || "Upload hata" }, { status: 500 });
    }
}
