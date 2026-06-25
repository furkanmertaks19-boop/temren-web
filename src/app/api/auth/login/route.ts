import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";
import { NextResponse } from "next/server";
import type { AdminRole } from "@/lib/adminPermissions";
import { ADMIN_SESSION_COOKIE, createSessionToken } from "@/lib/adminSession";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

export async function POST(request: Request) {
    try {
        const ip = getClientIp(request);
        if (!checkRateLimit(`login:${ip}`, 10, 60_000)) {
            return NextResponse.json(
                { error: "Çok fazla deneme. Lütfen bir dakika sonra tekrar deneyin." },
                { status: 429 }
            );
        }

        await connectDB();
        const { username, password } = await request.json();

        if (!username || !password || typeof username !== "string" || typeof password !== "string") {
            return NextResponse.json({ error: "Kullanıcı adı ve şifre gerekli." }, { status: 400 });
        }

        const user = await Admin.findOne({ username: username.toLowerCase().trim() });

        if (!user) {
            return NextResponse.json({ error: "Kullanıcı adı veya şifre hatalı!" }, { status: 401 });
        }

        if (user.isActive === false) {
            return NextResponse.json(
                { error: "Hesabınız devre dışı bırakılmış. Yöneticinize başvurun." },
                { status: 403 }
            );
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return NextResponse.json({ error: "Kullanıcı adı veya şifre hatalı!" }, { status: 401 });
        }

        user.lastLogin = new Date();
        if (!user.displayName) user.displayName = user.username;
        if (!user.role) user.role = "superadmin" as AdminRole;
        await user.save();

        const sessionToken = await createSessionToken({
            id: user._id.toString(),
            username: user.username,
            role: user.role || "superadmin",
        });

        const response = NextResponse.json({
            success: true,
            message: "Giriş başarılı",
            user: {
                id: user._id.toString(),
                username: user.username,
                displayName: user.displayName || user.username,
                email: user.email || "",
                role: user.role || "superadmin",
            },
        });

        response.cookies.set(ADMIN_SESSION_COOKIE, sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });

        return response;
    } catch (error: unknown) {
        console.error("GİRİŞ HATASI:", error);
        return NextResponse.json({ error: "Giriş işlemi başarısız. Lütfen tekrar deneyin." }, { status: 500 });
    }
}
