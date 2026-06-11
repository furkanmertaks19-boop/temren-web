"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { adminQueryDefaults } from '@/lib/adminQueries';

function createAdminQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: adminQueryDefaults.staleTime,
                gcTime: adminQueryDefaults.gcTime,
                refetchOnWindowFocus: adminQueryDefaults.refetchOnWindowFocus,
                refetchOnReconnect: adminQueryDefaults.refetchOnReconnect,
                retry: 1,
            },
        },
    });
}

export default function AdminQueryProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(createAdminQueryClient);
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
