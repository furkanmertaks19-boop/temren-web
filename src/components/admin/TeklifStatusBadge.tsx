import { Badge } from '@/components/ui/badge';
import { TEKLIF_STATUS_STYLES, type TeklifStatus } from '@/lib/teklifStatus';
import { cn } from '@/lib/utils';

export default function TeklifStatusBadge({
    status,
    className,
}: {
    status: TeklifStatus;
    className?: string;
}) {
    return (
        <Badge
            variant="outline"
            className={cn('text-[10px] font-medium border', TEKLIF_STATUS_STYLES[status], className)}
        >
            {status}
        </Badge>
    );
}
