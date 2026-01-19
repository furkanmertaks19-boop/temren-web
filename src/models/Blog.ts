import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    date: { type: String, required: true },
    image: { type: String, required: true }, // Ana Kapak Görseli
    gallery: { type: [String], default: [] }, // ✅ Yeni: Galeri Görselleri Dizisi
    shortDescription: { type: String, required: true },
    content: { type: String, required: true },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);