import { CAMPAIGN_LEAD_STATUS_THEME, type CampaignLeadStatus } from "@/lib/campaignStatus";
import { cn } from "@/lib/utils";

export default function CampaignLeadStatusBadge({
    status,
    className,
    size = "sm",
}: {
    status: CampaignLeadStatus;
    className?: string;
    size?: "sm" | "md";
}) {
    const theme = CAMPAIGN_LEAD_STATUS_THEME[status];

    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 rounded-full font-semibold whitespace-nowrap",
                theme.bg,
                theme.text,
                size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm",
                className
            )}
        >
            <span className={cn("rounded-full shrink-0", theme.dot, size === "sm" ? "size-1.5" : "size-2")} />
            {status}
        </span>
    );
}
