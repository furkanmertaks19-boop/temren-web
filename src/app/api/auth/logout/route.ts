import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    try {
        const cookieStore = await cookies();
        
        // Vercel veya local fark etmeksizin auth cookie'sini temizle
        // Not: 'token' ismini kendi projenizdeki isimle (örn: 'session') değiştirin
        cookieStore.delete('token'); 

        return NextResponse.json({ success: true, message: "Çıkış başarılı" });
    } catch (error: any) {
        return NextResponse.json({ error: "Çıkış yapılamadı" }, { status: 500 });
    }
}