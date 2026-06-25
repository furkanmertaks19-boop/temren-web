import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/adminSession";

export async function POST() {
    try {
        const response = NextResponse.json({ success: true, message: "Çıkış başarılı" });
        response.cookies.set(ADMIN_SESSION_COOKIE, "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 0,
        });
        return response;
    } catch {
        return NextResponse.json({ error: "Çıkış yapılamadı" }, { status: 500 });
    }
}
