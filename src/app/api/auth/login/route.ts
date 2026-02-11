import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin"; // Modeli import ediyoruz
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        await connectDB(); 
        const { username, password } = await request.json();

        // 1. Kullanıcıyı model üzerinden bulalım (Böylece comparePassword metoduna erişebiliriz)
        const user = await Admin.findOne({ username });

        if (!user) {
            return NextResponse.json({ error: "Kullanıcı adı veya şifre hatalı!" }, { status: 401 });
        }

        // 2. Şifreyi modeldeki comparePassword metodu ile (bcrypt) kontrol edelim
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return NextResponse.json({ error: "Kullanıcı adı veya şifre hatalı!" }, { status: 401 });
        }

        // 3. Giriş başarılı
        return NextResponse.json({ 
            success: true, 
            message: "Giriş başarılı" 
        });

    } catch (error: any) {
        console.error("GİRİŞ HATASI:", error.message);
        return NextResponse.json({ error: "Sistem hatası: " + error.message }, { status: 500 });
    }
}