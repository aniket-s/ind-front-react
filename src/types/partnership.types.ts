// Partnership Enquiry Types

export interface PartnershipEnquiry {
    id: string;
    companyName: string;
    contactPersonName: string;
    email: string;
    phone: string;
    website?: string;
    industry: string;
    moq: string;
    productOfInterest: string;
    budgetRange?: string;
    timelineForPurchase?: string;
    status: PartnershipStatus;
    notes?: string;
    resolvedBy?: string;
    resolvedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    resolver?: {
        id: string;
        name: string;
        email: string;
    };
}

export type PartnershipStatus = 'new' | 'reviewing' | 'contacted' | 'qualified' | 'rejected' | 'converted';

export interface PartnershipEnquiryResponse {
    message: string;
    enquiry: PartnershipEnquiry;
}

export interface PartnershipEnquiriesResponse {
    enquiries: PartnershipEnquiry[];
    totalPages: number;
    currentPage: number;
    totalEnquiries: number;
}

export interface PartnershipStats {
    total: number;
    new: number;
    reviewing: number;
    contacted: number;
    qualified: number;
    converted: number;
    rejected: number;
    byMOQ: Array<{ moq: string; count: number }>;
    byProduct: Array<{ productOfInterest: string; count: number }>;
}

export const MOQ_OPTIONS = [
    { value: '1-10', label: '1-10 units' },
    { value: '11-50', label: '11-50 units' },
    { value: '51-100', label: '51-100 units' },
    { value: '101-500', label: '101-500 units' },
    { value: '500+', label: '500+ units' }
];

export const PRODUCT_INTEREST_OPTIONS = [
    { value: 'inverters', label: 'Inverters' },
    { value: 'batteries', label: 'Batteries' },
    { value: 'solar', label: 'Solar Solutions' },
    { value: 'ups', label: 'UPS Systems' },
    { value: 'complete', label: 'Complete Power Solutions' },
    { value: 'other', label: 'Other' }
];

export const PARTNERSHIP_STATUS_OPTIONS = [
    { value: 'new', label: 'New', color: 'blue' },
    { value: 'reviewing', label: 'Reviewing', color: 'yellow' },
    { value: 'contacted', label: 'Contacted', color: 'purple' },
    { value: 'qualified', label: 'Qualified', color: 'green' },
    { value: 'rejected', label: 'Rejected', color: 'red' },
    { value: 'converted', label: 'Converted', color: 'teal' }
];