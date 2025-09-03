import { apiClient } from './api';
import { Dealer, DealersResponse, DealerStats, DealerImportResult } from '@/types';

// API Response Types (what we get from the server)
interface ApiDealer {
    id: string;
    name: string;
    email: string;
    phone: string;
    alternatePhone: string | null;
    contactPerson: string | null;
    address: string;
    city: string;
    state: string;
    pincode: string;
    latitude: string | null;
    longitude: string | null;
    type: 'distributor' | 'service_center' | 'dealer';
    services: string[] | null;
    brands: string[] | null;
    workingHours: any | null;
    website: string | null;
    images: string[] | null;
    certifications: string[] | null;
    territory: string | null;
    isActive: boolean;
    isFeatured: boolean;
    rating: string | number;
    totalReviews: number;
    establishedDate: string | null;
    description: string | null;
    metaData: any | null;
    createdAt: string;
    updatedAt: string;
}

interface ApiDealersResponse {
    dealers: ApiDealer[];
    totalPages: number;
    currentPage: number;
    totalDealers: number;
}

// Transform functions to convert API response to our types
const transformDealer = (apiDealer: ApiDealer): Dealer => {
    return {
        id: apiDealer.id,
        name: apiDealer.name,
        email: apiDealer.email,
        phone: apiDealer.phone,
        alternatePhone: apiDealer.alternatePhone || undefined,
        contactPerson: apiDealer.contactPerson || undefined,
        address: apiDealer.address,
        city: apiDealer.city,
        state: apiDealer.state,
        pincode: apiDealer.pincode,
        latitude: apiDealer.latitude ? parseFloat(apiDealer.latitude) : undefined,
        longitude: apiDealer.longitude ? parseFloat(apiDealer.longitude) : undefined,
        type: apiDealer.type,
        services: apiDealer.services || undefined,
        brands: apiDealer.brands || undefined,
        workingHours: apiDealer.workingHours || undefined,
        website: apiDealer.website || undefined,
        images: apiDealer.images || undefined,
        certifications: apiDealer.certifications || undefined,
        territory: apiDealer.territory || undefined,
        isActive: apiDealer.isActive,
        isFeatured: apiDealer.isFeatured,
        rating: typeof apiDealer.rating === 'string' ? parseFloat(apiDealer.rating) : apiDealer.rating || 0,
        totalReviews: apiDealer.totalReviews || 0,
        establishedDate: apiDealer.establishedDate ? new Date(apiDealer.establishedDate) : undefined,
        description: apiDealer.description || undefined,
        metaData: apiDealer.metaData || undefined,
        createdAt: new Date(apiDealer.createdAt),
        updatedAt: new Date(apiDealer.updatedAt),
    };
};

const transformDealersResponse = (apiResponse: ApiDealersResponse): DealersResponse => {
    return {
        dealers: apiResponse.dealers.map(transformDealer),
        totalPages: apiResponse.totalPages,
        currentPage: apiResponse.currentPage,
        totalDealers: apiResponse.totalDealers,
    };
};

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
        const { data } = await apiClient.axios.get<ApiDealersResponse>('/dealers', { params });
        return transformDealersResponse(data);
    },

    async getDealer(id: string): Promise<Dealer> {
        const { data } = await apiClient.axios.get<ApiDealer>(`/dealers/${id}`);
        return transformDealer(data);
    },

    async createDealer(formData: FormData): Promise<Dealer> {
        const { data } = await apiClient.axios.post<ApiDealer>('/dealers', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return transformDealer(data);
    },

    async updateDealer(id: string, formData: FormData): Promise<Dealer> {
        const { data } = await apiClient.axios.put<ApiDealer>(`/dealers/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return transformDealer(data);
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

        // Handle both array and paginated response
        if (Array.isArray(data)) {
            return data.map(transformDealer);
        } else {
            return transformDealersResponse(data);
        }
    },

    async searchByPincode(pincode: string): Promise<{
        dealers: Dealer[];
        exactMatch: boolean;
        searchedPincode: string;
    }> {
        const { data } = await apiClient.axios.get(`/dealers/public/search/${pincode}`);
        return {
            dealers: data.dealers.map(transformDealer),
            exactMatch: data.exactMatch,
            searchedPincode: data.searchedPincode,
        };
    },
};