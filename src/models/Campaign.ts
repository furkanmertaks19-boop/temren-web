import mongoose from "mongoose";

export const CAMPAIGN_MEDIA_TYPES = ["image", "gif", "video"] as const;
export type CampaignMediaType = (typeof CAMPAIGN_MEDIA_TYPES)[number];

const CampaignSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        shortDescription: { type: String, default: "" },
        discountLabel: { type: String, default: "" },
        description: { type: String, default: "" },
        advantages: { type: String, default: "" },
        priceInfo: { type: String, default: "" },
        mediaUrl: { type: String, default: "" },
        mediaType: {
            type: String,
            enum: CAMPAIGN_MEDIA_TYPES,
            default: "image",
        },
        buttonText: { type: String, default: "Teklif Al" },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        isActive: { type: Boolean, default: true },
        showPopup: { type: Boolean, default: true },
        repeatAfterDays: { type: Number, default: 1, min: 1, max: 30 },
    },
    { timestamps: true }
);

export default mongoose.models.Campaign || mongoose.model("Campaign", CampaignSchema);
