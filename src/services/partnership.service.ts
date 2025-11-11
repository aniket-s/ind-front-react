// src/services/partnership.service.ts
import { apiClient } from './api';
import { PartnershipEnquiry, PartnershipEnquiryResponse } from '@/types/partnership.types';

export const partnershipService = {
    async submitEnquiry(enquiry: PartnershipEnquiry): Promise<PartnershipEnquiryResponse> {
        const { data } = await apiClient.axios.post<PartnershipEnquiryResponse>(
            '/partnership-enquiries',
            enquiry
        );
        return data;
    },
};