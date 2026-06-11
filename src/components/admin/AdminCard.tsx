import { cn } from '@/lib/utils';

type AdminCardProps = React.ComponentProps<'div'> & {
    padding?: 'none' | 'sm' | 'md' | 'lg';
};

const paddingMap = {
    none: '',
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-6',
};

export default function AdminCard({
    className,
    padding = 'none',
    children,
    ...props
}: AdminCardProps) {
    return (
        <div
            className={cn(
                'rounded-2xl bg-white',
                'shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_rgba(15,23,42,0.06)]',
                paddingMap[padding],
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export function AdminCardHeader({
    className,
    children,
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <div
            className={cn('flex items-center justify-between gap-4 px-5 py-4', className)}
            {...props}
        >
            {children}
        </div>
    );
}

export function AdminCardTitle({ className, children, ...props }: React.ComponentProps<'h3'>) {
    return (
        <h3 className={cn('text-[15px] font-semibold text-slate-900 tracking-tight', className)} {...props}>
            {children}
        </h3>
    );
}

export function AdminCardDescription({ className, children, ...props }: React.ComponentProps<'p'>) {
    return (
        <p className={cn('text-[13px] text-slate-500 mt-0.5 leading-relaxed', className)} {...props}>
            {children}
        </p>
    );
}
