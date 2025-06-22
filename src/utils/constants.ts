// src/utils/constants.ts
export const ROLES = {
    SUPER_ADMIN: 'super_admin',
    ADMIN: 'admin',
    EDITOR: 'editor',
} as const;

export const STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
} as const;

export const CONTACT_STATUS = {
    NEW: 'new',
    IN_PROGRESS: 'in_progress',
    RESOLVED: 'resolved',
} as const;

export const BANNER_POSITIONS = {
    HOME: 'home',
    PRODUCTS: 'products',
    ABOUT: 'about',
    CONTACT: 'contact',
} as const;

export const MENU_POSITIONS = {
    HEADER: 'header',
    FOOTER: 'footer',
    BOTH: 'both',
} as const;

export const SECTION_TYPES = {
    BANNER: 'banner',
    PRODUCTS: 'products',
    WHY_INDPOWER: 'whyIndpower',
    ABOUT: 'about',
    VIEW_DETAILS: 'viewDetails',
    DEALER_LOCATOR: 'dealerLocator',
    JOIN_DEALER: 'joinDealer',
    CONNECT: 'connect',
    FAQ: 'faq',
    STILL_HAVE_QUESTIONS: 'stillHaveQuestions',
    CUSTOM: 'custom',
} as const;

export const FILE_SIZE_LIMIT = 5 * 1024 * 1024; // 5MB

export const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
];

export const SORT_OPTIONS = [
    { value: 'createdAt:desc', label: 'Newest First' },
    { value: 'createdAt:asc', label: 'Oldest First' },
    { value: 'name:asc', label: 'Name (A-Z)' },
    { value: 'name:desc', label: 'Name (Z-A)' },
    { value: 'price:asc', label: 'Price (Low to High)' },
    { value: 'price:desc', label: 'Price (High to Low)' },
];