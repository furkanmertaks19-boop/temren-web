import mongoose from "mongoose";

const CampaignLeadSchema = new mongoose.Schema(
    {
        campaignId: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign", required: true },
        campaignTitle: { type: String, required: true, trim: true },
        name: { type: String, required: true, trim: true },
        company: { type: String, default: "" },
        phone: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true },
        message: { type: String, default: "" },
        status: { type: String, default: "Yeni" },
    },
    { timestamps: true }
);

export default mongoose.models.CampaignLead || mongoose.model("CampaignLead", CampaignLeadSchema);
