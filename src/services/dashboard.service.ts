
// src/services/dashboard.service.ts
import { apiClient } from './api';
import { DashboardStats } from '@/types';

export const dashboardService = {
    async getStats(): Promise<DashboardStats> {
        const { data } = await apiClient.axios.get<DashboardStats>('/dashboard/stats');
        return data;
    },
};