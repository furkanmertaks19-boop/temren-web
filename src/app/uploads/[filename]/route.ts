import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export const runtime = "nodejs";

const UPLOAD_DIR = process.env.UPLOAD_DIR || "/data/uploads";

export async function GET(
    req: Request,
    { params }: { params: { filename: string } }
) {
    try {
        const filePath = path.join(UPLOAD_DIR, params.filename);
        const file = await fs.readFile(filePath);

        const ext = path.extname(params.filename).toLowerCase();
        const type =
            ext === ".png" ? "image/png" :
                ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" :
                    ext === ".webp" ? "image/webp" :
                        "application/octet-stream";

        return new NextResponse(file, {
            headers: {
                "Content-Type": type,
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        });
    } catch {
        return NextResponse.json({ error: "Dosya bulunamadı" }, { status: 404 });
    }
}
