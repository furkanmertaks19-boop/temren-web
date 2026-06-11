"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { TEKLIF_STATUSES, TEKLIF_STATUS_STYLES, type TeklifStatus } from '@/lib/teklifStatus';
import { cn } from '@/lib/utils';

type TeklifStatusSelectProps = {
    value: TeklifStatus;
    onChange: (status: TeklifStatus) => void;
    disabled?: boolean;
    size?: 'sm' | 'default';
    className?: string;
};

export default function TeklifStatusSelect({
    value,
    onChange,
    disabled,
    size = 'sm',
    className,
}: TeklifStatusSelectProps) {
    return (
        <div onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
            <Select
                value={value}
                onValueChange={(next) => onChange(next as TeklifStatus)}
                disabled={disabled}
            >
                <SelectTrigger
                    size={size}
                    className={cn(
                        'min-w-[130px] text-xs font-medium border',
                        TEKLIF_STATUS_STYLES[value],
                        className
                    )}
                >
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {TEKLIF_STATUSES.map((status) => (
                        <SelectItem key={status} value={status} className="text-xs">
                            {status}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
