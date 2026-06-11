"use client";

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
    adminQueryDefaults,
    adminQueryKeys,
    fetchAdminNotifications,
    fetchAdminStats,
    fetchTeklifler,
    markTeklifAsViewed,
    updateTeklifStatus,
} from '@/lib/adminQueries';
import type { NormalizedTeklif } from '@/lib/teklifNormalizer';
import type { TeklifStatus } from '@/lib/teklifStatus';

export function useAdminNotifications(enabled = true) {
    return useQuery({
        queryKey: adminQueryKeys.notifications,
        queryFn: fetchAdminNotifications,
        enabled,
        staleTime: adminQueryDefaults.staleTime,
        refetchInterval: enabled ? adminQueryDefaults.refetchInterval : false,
    });
}

export function useAdminStats(enabled = true) {
    return useQuery({
        queryKey: adminQueryKeys.stats,
        queryFn: fetchAdminStats,
        enabled,
        staleTime: adminQueryDefaults.staleTime,
        refetchInterval: enabled ? adminQueryDefaults.refetchInterval : false,
    });
}

export function useTeklifler(enabled = true) {
    return useQuery({
        queryKey: adminQueryKeys.teklifler,
        queryFn: fetchTeklifler,
        enabled,
        staleTime: 30_000,
        refetchInterval: enabled ? adminQueryDefaults.refetchInterval : false,
    });
}

export function useUpdateTeklifStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, status }: { id: string; status: TeklifStatus }) =>
            updateTeklifStatus(id, status),
        onSuccess: (_data, { status }) => {
            queryClient.invalidateQueries({ queryKey: adminQueryKeys.teklifler });
            queryClient.invalidateQueries({ queryKey: adminQueryKeys.notifications });
            queryClient.invalidateQueries({ queryKey: adminQueryKeys.stats });
            toast.success(`Durum "${status}" olarak güncellendi`);
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Durum güncellenemedi');
        },
    });
}

export function useMarkTeklifViewed() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (teklif: NormalizedTeklif) => markTeklifAsViewed(teklif),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: adminQueryKeys.teklifler });
            queryClient.invalidateQueries({ queryKey: adminQueryKeys.notifications });
            queryClient.invalidateQueries({ queryKey: adminQueryKeys.stats });
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Talep güncellenemedi');
        },
    });
}
