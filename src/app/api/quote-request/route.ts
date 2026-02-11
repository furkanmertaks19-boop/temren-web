import { connectDB } from "@/lib/db";
import QuoteRequest from "@/models/QuoteRequest";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();

        // Mongoose Modelini kullanarak kayıt yapıyoruz. 
        // Modelde 'teklifler' koleksiyonunu sabitlediğimiz için direkt oraya yazacak.
        const newRequest = await QuoteRequest.create({
            fullName: body.adSoyad,
            phone: body.telefon,
            email: body.email,
            selectedSize: body.olcu,
            message: body.mesaj,
            productName: body.productName || "Vakumlu Tabla",
            
            // Dashboard sayacının (unreadCount) çalışması için kritik alanlar:
            isRead: false, 
            okundu: false
        });

        // Terminale düşen log (Dashboard'daki console.log ile eşleşmeli)
        console.log(`[VERİTABANI] Yeni kayıt oluşturuldu: ${body.adSoyad}`);

        return NextResponse.json({ 
            success: true, 
            data: newRequest 
        }, { status: 201 });

    } catch (error: any) {
        console.error("Kayıt Hatası Detayı:", error.message);
        return NextResponse.json({ 
            success: false, 
            error: "Kayıt sırasında bir hata oluştu." 
        }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectDB();
        
        // QuoteRequest modeli artık otomatik olarak 'teklifler' koleksiyonuna bakıyor.
        const requests = await QuoteRequest.find().sort({ createdAt: -1 }); 
        
        return NextResponse.json(requests);
    } catch (error) {
        return NextResponse.json({ error: "Veriler alınamadı" }, { status: 500 });
    }
}