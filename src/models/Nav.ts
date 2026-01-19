import mongoose from "mongoose";

const NavSchema = new mongoose.Schema({
    title: { type: String, required: true },
    path: { type: String, required: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    // Eğer bu bir alt menüyse, bağlı olduğu ana menünün ID'sini tutar:
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Nav', default: null }
}, { timestamps: true });

export default mongoose.models.Nav || mongoose.model("Nav", NavSchema);