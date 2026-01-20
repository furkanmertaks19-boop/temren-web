import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const UPLOAD_DIR = "/data/uploads";

export async function GET(
    request: Request,
    context: { params: Promise<{ filename: string }> }
) {
    const { filename } = await context.params;

    const filePath = path.join(UPLOAD_DIR, filename);

    if (!fs.existsSync(filePath)) {
        return new NextResponse("File not found", { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
        headers: {
            "Content-Type": "application/octet-stream",
            "Cache-Control": "public, max-age=31536000",
        },
    });
}
