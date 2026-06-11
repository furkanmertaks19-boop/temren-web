import React from 'react';

interface AdminPageHeaderProps {
    title: string;
    description?: string;
    actions?: React.ReactNode;
    badge?: React.ReactNode;
}

export default function AdminPageHeader({ title, description, actions, badge }: AdminPageHeaderProps) {
    return (
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">{title}</h1>
                    {badge}
                </div>
                {description && (
                    <p className="text-sm text-slate-500 mt-1">{description}</p>
                )}
            </div>
            {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
        </header>
    );
}
