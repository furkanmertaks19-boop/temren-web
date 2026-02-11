import mongoose from "mongoose";

const QuoteRequestSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    selectedSize: { type: String }, 
    message: { type: String },
    productName: { type: String, default: "Vakumlu Tabla" },
    
    // DASHBOARD SAYACI İÇİN GEREKLİ ALANLAR
    isRead: { type: Boolean, default: false }, // Sayaç buraya bakar
    okundu: { type: Boolean, default: false }, // Liste buraya bakar
    
    status: { type: String, default: "Bekliyor" }
}, { 
    timestamps: true,
    collection: 'teklifler' // Koleksiyon ismini Dashboard API ile eşitledik
});

// Model ismini dışa aktarırken "teklifler" koleksiyonunu kullanmasını zorunlu kılıyoruz
export default mongoose.models.QuoteRequest || mongoose.model("QuoteRequest", QuoteRequestSchema, "teklifler");