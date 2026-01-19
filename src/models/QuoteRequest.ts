import mongoose from "mongoose";

const QuoteRequestSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    selectedSize: { type: String }, // Vakumlu tabla ölçüsü
    message: { type: String },
    productName: { type: String, default: "Vakumlu Tabla" },
    status: { type: String, default: "Bekliyor" }
}, { timestamps: true });

export default mongoose.models.QuoteRequest || mongoose.model("QuoteRequest", QuoteRequestSchema);