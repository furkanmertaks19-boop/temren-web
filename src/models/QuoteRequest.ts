// src/models/QuoteRequest.ts
import mongoose from "mongoose";

const QuoteRequestSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true }, // Not: Eğer istersen buraya unique:true ekleyebiliriz ama Mert her seferinde farklı mail yazmalı
    selectedSize: { type: String }, 
    message: { type: String },
    productName: { type: String, default: "Vakumlu Tabla" },
    isRead: { type: Boolean, default: false }, 
    okundu: { type: Boolean, default: false },
}, { 
    timestamps: true,
    collection: 'teklifler'
});

export default mongoose.models.QuoteRequest || mongoose.model("QuoteRequest", QuoteRequestSchema, "teklifler");