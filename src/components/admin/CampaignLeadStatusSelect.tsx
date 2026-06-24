"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    CAMPAIGN_LEAD_STATUSES,
    CAMPAIGN_LEAD_STATUS_THEME,
    type CampaignLeadStatus,
} from "@/lib/campaignStatus";
import { cn } from "@/lib/utils";

type CampaignLeadStatusSelectProps = {
    value: CampaignLeadStatus;
    onChange: (status: CampaignLeadStatus) => void;
    disabled?: boolean;
    size?: "sm" | "default";
    className?: string;
};

export default function CampaignLeadStatusSelect({
    value,
    onChange,
    disabled,
    size = "sm",
    className,
}: CampaignLeadStatusSelectProps) {
    const theme = CAMPAIGN_LEAD_STATUS_THEME[value];

    return (
        <div onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
            <Select
                value={value}
                onValueChange={(next) => onChange(next as CampaignLeadStatus)}
                disabled={disabled}
            >
                <SelectTrigger
                    size={size}
                    className={cn(
                        "min-w-[148px] bg-white border-0 shadow-sm ring-1 ring-slate-200 font-semibold",
                        theme.text,
                        size === "sm" ? "h-8 text-xs" : "h-9 text-sm",
                        className
                    )}
                >
                    <span className={cn("size-2 rounded-full shrink-0", theme.dot)} />
                    <SelectValue className="text-inherit font-semibold" />
                </SelectTrigger>
                <SelectContent className="border-0 shadow-xl ring-1 ring-slate-200/80">
                    {CAMPAIGN_LEAD_STATUSES.map((status) => {
                        const itemTheme = CAMPAIGN_LEAD_STATUS_THEME[status];
                        return (
                            <SelectItem
                                key={status}
                                value={status}
                                className="text-sm font-medium text-slate-800 focus:bg-slate-50"
                            >
                                <span className="flex items-center gap-2">
                                    <span className={cn("size-2 rounded-full shrink-0", itemTheme.dot)} />
                                    <span className={itemTheme.text}>{status}</span>
                                </span>
                            </SelectItem>
                        );
                    })}
                </SelectContent>
            </Select>
        </div>
    );
}
