import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";
import { NextResponse } from "next/server";
import type { AdminRole } from "@/lib/adminPermissions";

export async function POST(request: Request) {
    try {
        await connectDB();
        const { username, password } = await request.json();

        const user = await Admin.findOne({ username: username?.toLowerCase()?.trim() });

        if (!user) {
            return NextResponse.json({ error: "Kullanıcı adı veya şifre hatalı!" }, { status: 401 });
        }

        if (user.isActive === false) {
            return NextResponse.json({ error: "Hesabınız devre dışı bırakılmış. Yöneticinize başvurun." }, { status: 403 });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return NextResponse.json({ error: "Kullanıcı adı veya şifre hatalı!" }, { status: 401 });
        }

        user.lastLogin = new Date();
        if (!user.displayName) user.displayName = user.username;
        if (!user.role) user.role = "superadmin" as AdminRole;
        await user.save();

        return NextResponse.json({
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
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Bilinmeyen hata";
        console.error("GİRİŞ HATASI:", message);
        return NextResponse.json({ error: "Sistem hatası: " + message }, { status: 500 });
    }
}
