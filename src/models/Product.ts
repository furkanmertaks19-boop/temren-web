import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true }, // Örn: PLT Serisi, Tika vb.
    description: { type: String },
    imageUrl: { type: String },
    specs: [
        {
            label: String, // Örn: Motor Gücü
            value: String  // Örn: 18 HP
        }
    ],
    isPublished: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);