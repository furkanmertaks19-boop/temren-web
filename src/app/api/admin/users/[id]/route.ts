import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";
import { NextResponse, NextRequest } from "next/server";
import type { AdminRole } from "@/lib/adminPermissions";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sanitize = (user: any) => ({
    _id: user._id,
    username: user.username,
    displayName: user.displayName,
    email: user.email || "",
    role: user.role || "admin",
    isActive: user.isActive !== false,
    lastLogin: user.lastLogin,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
});

export async function GET(_req: NextRequest, context: RouteContext) {
    try {
        await connectDB();
        const { id } = await context.params;
        const user = await Admin.findById(id).select("-password").lean();
        if (!user) return NextResponse.json({ error: "Kullanıcı bulunamadı" }, { status: 404 });
        return NextResponse.json({ success: true, data: sanitize(user) });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Bilinmeyen hata";
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest, context: RouteContext) {
    try {
        await connectDB();
        const { id } = await context.params;
        const body = await req.json();

        const user = await Admin.findById(id);
        if (!user) return NextResponse.json({ error: "Kullanıcı bulunamadı" }, { status: 404 });

        if (body.displayName !== undefined) user.displayName = String(body.displayName).trim();
        if (body.email !== undefined) user.email = body.email ? String(body.email).trim() : undefined;
        if (body.role !== undefined) user.role = body.role as AdminRole;
        if (body.isActive !== undefined) user.isActive = Boolean(body.isActive);

        if (body.password) {
            if (String(body.password).length < 6) {
                return NextResponse.json({ error: "Şifre en az 6 karakter olmalıdır." }, { status: 400 });
            }
            user.password = body.password;
        }

        if (body.username && body.username !== user.username) {
            const taken = await Admin.findOne({ username: String(body.username).toLowerCase().trim() });
            if (taken) return NextResponse.json({ error: "Bu kullanıcı adı kullanılıyor." }, { status: 409 });
            user.username = String(body.username).toLowerCase().trim();
        }

        await user.save();
        const obj = user.toObject();
        return NextResponse.json({ success: true, data: sanitize(obj) });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Bilinmeyen hata";
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}

export async function DELETE(_req: NextRequest, context: RouteContext) {
    try {
        await connectDB();
        const { id } = await context.params;

        const total = await Admin.countDocuments();
        if (total <= 1) {
            return NextResponse.json({ error: "Son yönetici hesabı silinemez." }, { status: 400 });
        }

        const user = await Admin.findByIdAndDelete(id);
        if (!user) return NextResponse.json({ error: "Kullanıcı bulunamadı" }, { status: 404 });

        return NextResponse.json({ success: true, message: "Kullanıcı silindi." });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Bilinmeyen hata";
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}
