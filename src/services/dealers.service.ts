import { apiClient } from './api';
import { Dealer, DealersResponse, DealerStats, DealerImportResult } from '@/types';

export const dealersService = {
    // Admin endpoints
    async getDealers(params?: {
        page?: number;
        limit?: number;
        type?: string;
        city?: string;
        state?: string;
        pincode?: string;
        search?: string;
        isActive?: boolean;
        isFeatured?: boolean;
        sortBy?: string;
        sortOrder?: string;
    }): Promise<DealersResponse> {
        const { data } = await apiClient.axios.get<DealersResponse>('/dealers', { params });
        return data;
    },

    async getDealer(id: string): Promise<Dealer> {
        const { data } = await apiClient.axios.get<Dealer>(`/dealers/${id}`);
        return data;
    },

    async createDealer(formData: FormData): Promise<Dealer> {
        const { data } = await apiClient.axios.post<Dealer>('/dealers', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return data;
    },

    async updateDealer(id: string, formData: FormData): Promise<Dealer> {
        const { data } = await apiClient.axios.put<Dealer>(`/dealers/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return data;
    },

    async deleteDealer(id: string): Promise<{ message: string }> {
        const { data } = await apiClient.axios.delete(`/dealers/${id}`);
        return data;
    },

    async toggleDealerStatus(id: string): Promise<{ message: string; isActive: boolean }> {
        const { data } = await apiClient.axios.patch(`/dealers/${id}/toggle-status`);
        return data;
    },

    async bulkUpdateStatus(dealerIds: string[], isActive: boolean): Promise<{ message: string }> {
        const { data } = await apiClient.axios.patch('/dealers/bulk-status', { dealerIds, isActive });
        return data;
    },

    async deleteDealerImage(dealerId: string, imageIndex: number): Promise<{ message: string; images: string[] }> {
        const { data } = await apiClient.axios.delete(`/dealers/${dealerId}/image/${imageIndex}`);
        return data;
    },

    async getDealerStats(): Promise<DealerStats> {
        const { data } = await apiClient.axios.get<DealerStats>('/dealers/stats');
        return data;
    },

    async importDealers(file: File): Promise<DealerImportResult> {
        const formData = new FormData();
        formData.append('file', file);

        const { data } = await apiClient.axios.post<DealerImportResult>('/dealers/import', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return data;
    },

    async exportDealers(params?: {
        type?: string;
        state?: string;
        city?: string;
        isActive?: boolean;
    }): Promise<Blob> {
        const { data } = await apiClient.axios.get('/dealers/export', {
            params,
            responseType: 'blob',
        });
        return data;
    },

    // Public endpoints
    async getPublicDealers(params?: {
        type?: string;
        city?: string;
        state?: string;
        pincode?: string;
        search?: string;
        lat?: number;
        lng?: number;
        radius?: number;
        page?: number;
        limit?: number;
    }): Promise<DealersResponse | Dealer[]> {
        const { data } = await apiClient.axios.get('/dealers/public', { params });
        return data;
    },

    async searchByPincode(pincode: string): Promise<{
        dealers: Dealer[];
        exactMatch: boolean;
        searchedPincode: string;
    }> {
        const { data } = await apiClient.axios.get(`/dealers/public/search/${pincode}`);
        return data;
    },
};