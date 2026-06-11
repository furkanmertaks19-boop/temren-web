"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { TEKLIF_STATUSES, TEKLIF_STATUS_THEME, type TeklifStatus } from '@/lib/teklifStatus';
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
    const theme = TEKLIF_STATUS_THEME[value];

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
                        'min-w-[148px] bg-white border-0 shadow-sm ring-1 font-semibold',
                        theme.ring,
                        theme.text,
                        size === 'sm' ? 'h-8 text-xs' : 'h-9 text-sm',
                        className
                    )}
                >
                    <span className={cn('size-2 rounded-full shrink-0', theme.dot)} />
                    <SelectValue className="text-inherit font-semibold" />
                </SelectTrigger>
                <SelectContent className="border-0 shadow-xl ring-1 ring-slate-200/80">
                    {TEKLIF_STATUSES.map((status) => {
                        const itemTheme = TEKLIF_STATUS_THEME[status];
                        return (
                            <SelectItem
                                key={status}
                                value={status}
                                className="text-sm font-medium text-slate-800 focus:bg-slate-50"
                            >
                                <span className="flex items-center gap-2">
                                    <span className={cn('size-2 rounded-full shrink-0', itemTheme.dot)} />
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
