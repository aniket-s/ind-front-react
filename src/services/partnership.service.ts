// src/services/partnership.service.ts
import { apiClient } from './api';
import {
    PartnershipEnquiry,
    PartnershipEnquiryResponse,
    PartnershipEnquiriesResponse,
    PartnershipStats
} from '@/types/partnership.types';

export const partnershipService = {
    // Existing method for public submission
    async submitEnquiry(enquiry: PartnershipEnquiry): Promise<PartnershipEnquiryResponse> {
        const { data } = await apiClient.axios.post<PartnershipEnquiryResponse>(
            '/public/partnership-enquiries',
            enquiry
        );
        return data;
    },

    // Admin methods - ADD THESE
    async getEnquiries(params?: {
        page?: number;
        limit?: number;
        status?: string;
        search?: string;
        sortBy?: string;
        sortOrder?: string;
    }): Promise<PartnershipEnquiriesResponse> {
        const { data } = await apiClient.axios.get<PartnershipEnquiriesResponse>(
            '/partnership-enquiries',
            { params }
        );
        return data;
    },

    async getEnquiry(id: string): Promise<PartnershipEnquiry> {
        const { data } = await apiClient.axios.get<PartnershipEnquiry>(
            `/partnership-enquiries/${id}`
        );
        return data;
    },

    async updateStatus(id: string, status: string, notes?: string): Promise<PartnershipEnquiry> {
        const { data } = await apiClient.axios.put<PartnershipEnquiry>(
            `/partnership-enquiries/${id}/status`,
            { status, notes }
        );
        return data;
    },

    async deleteEnquiry(id: string): Promise<{ message: string }> {
        const { data } = await apiClient.axios.delete<{ message: string }>(
            `/partnership-enquiries/${id}`
        );
        return data;
    },

    async getStats(): Promise<PartnershipStats> {
        const { data } = await apiClient.axios.get<PartnershipStats>(
            '/partnership-enquiries/stats'
        );
        return data;
    },

    async exportEnquiries(params?: { status?: string }): Promise<Blob> {
        const { data } = await apiClient.axios.get(
            '/partnership-enquiries/export',
            {
                params,
                responseType: 'blob'
            }
        );
        return data;
    }
};