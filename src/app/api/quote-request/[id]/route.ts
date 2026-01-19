import { connectDB } from "@/lib/db";
import QuoteRequest from "@/models/QuoteRequest";
import { NextResponse, NextRequest } from "next/server";

// ✅ Tip uyuşmazlığını önlemek için params tipini tam Next.js standartına çekiyoruz
type RouteContext = {
    params: Promise<{ id: string }>;
};

export async function PATCH(
    req: NextRequest,
    context: RouteContext // params yerine context olarak tanımlamak bazı TSC sürümlerinde daha kararlıdır
) {
    try {
        await connectDB();

        // ✅ params'ı güvenli bir şekilde bekliyoruz
        const { id } = await context.params;

        // body verisini alalım (eğer lazımsa, değilse bu satırı silebilirsin)
        // const body = await req.json();

        const updated = await QuoteRequest.findByIdAndUpdate(
            id,
            { status: "Okundu", okundu: true },
            { new: true }
        );

        if (!updated) {
            return NextResponse.json(
                { success: false, error: "Kayıt bulunamadı" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: updated });
    } catch (error: unknown) {
        // ✅ 'error' nesnesine unknown tipi vererek TSC hatasını engelliyoruz
        console.error("Güncelleme Hatası:", error);
        return NextResponse.json(
            { success: false, error: "Güncellenemedi" },
            { status: 500 }
        );
    }
}