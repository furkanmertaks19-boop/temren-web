import mongoose from "mongoose";

const QuoteRequestSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    selectedSize: { type: String },
    message: { type: String },
    productName: { type: String, default: "Vakumlu Tabla" },
    formType: { type: String, default: "quote" },
    sourcePage: { type: String },
    sourceLabel: { type: String },
    isRead: { type: Boolean, default: false },
    okundu: { type: Boolean, default: false },
    status: { type: String, default: "Beklemede" },
    readAt: { type: Date },
}, {
    timestamps: true,
    collection: 'teklifler',
});

export default mongoose.models.QuoteRequest || mongoose.model("QuoteRequest", QuoteRequestSchema, "teklifler");
