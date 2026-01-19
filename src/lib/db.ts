// src/lib/db.ts dosyasını bu şekilde güncelleyin:
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw new Error("Lütfen .env.local dosyasına MONGODB_URI ekleyin.");
}

export const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("🚀 MongoDB bağlantısı başarılı.");
    } catch (error) {
        console.error("❌ MongoDB bağlantı hatası:", error);
    }
};

// Default export ekleyerek hataları gideriyoruz
export default connectDB;