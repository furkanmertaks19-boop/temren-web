import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";
import { NextResponse } from "next/server";
import type { AdminRole } from "@/lib/adminPermissions";

export const dynamic = "force-dynamic";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sanitize = (user: any) => ({
    _id: String(user._id ?? ""),
    username: user.username || "",
    displayName: user.displayName || user.username || "Kullanıcı",
    email: user.email || "",
    role: user.role || "admin",
    isActive: user.isActive !== false,
    lastLogin: user.lastLogin ?? null,
    createdAt: user.createdAt ?? null,
    updatedAt: user.updatedAt ?? null,
});

export async function GET() {
    try {
        await connectDB();
        const users = await Admin.find().select("-password").sort({ createdAt: -1 }).lean();

        // Eski kayıtlarda eksik alanları tamamla
        await Promise.all(
            users
                .filter((u) => !u.displayName || !u.role)
                .map((u) =>
                    Admin.updateOne(
                        { _id: u._id },
                        {
                            $set: {
                                displayName: u.displayName || u.username,
                                role: u.role || "superadmin",
                                isActive: u.isActive !== false,
                            },
                        }
                    )
                )
        );

        const refreshed = await Admin.find().select("-password").sort({ createdAt: -1 }).lean();
        return NextResponse.json({ success: true, data: refreshed.map(sanitize) });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Bilinmeyen hata";
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();
        const { username, password, displayName, email, role, isActive } = body;

        if (!username || !password || !displayName) {
            return NextResponse.json({ error: "Kullanıcı adı, şifre ve görünen ad zorunludur." }, { status: 400 });
        }

        if (password.length < 6) {
            return NextResponse.json({ error: "Şifre en az 6 karakter olmalıdır." }, { status: 400 });
        }

        const existing = await Admin.findOne({ username: username.toLowerCase().trim() });
        if (existing) {
            return NextResponse.json({ error: "Bu kullanıcı adı zaten kullanılıyor." }, { status: 409 });
        }

        const user = await Admin.create({
            username: username.toLowerCase().trim(),
            password,
            displayName: displayName.trim(),
            email: email?.trim() || undefined,
            role: (role as AdminRole) || "admin",
            isActive: isActive !== false,
        });

        const obj = user.toObject();
        return NextResponse.json({ success: true, data: sanitize(obj) }, { status: 201 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Bilinmeyen hata";
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}
