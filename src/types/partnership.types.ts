// src/types/partnership.types.ts

export interface PartnershipEnquiry {
    companyName: string;
    contactPersonName: string;
    email: string;
    phone: string;
    website?: string;
    industry: string;
    moq: string;
    productOfInterest: string;
    budgetRange: string;
    timelineForPurchase: string;
}

export interface PartnershipEnquiryResponse {
    message: string;
    enquiryId?: string;
}

// Dropdown options
export const MOQ_OPTIONS = [
    { value: '0-10', label: '0-10 units' },
    { value: '10-50', label: '10-50 units' },
    { value: '50-100', label: '50-100 units' },
    { value: '100-500+', label: '100-500+ units' },
];

export const PRODUCT_INTEREST_OPTIONS = [
    { value: 'inverter', label: 'Inverter' },
    { value: 'battery', label: 'Battery' },
    { value: 'inverter_battery_combo', label: 'Inverter Battery Combo' },
    { value: 'solar_products', label: 'Solar Products' },
];