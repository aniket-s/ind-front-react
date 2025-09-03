// src/types/index.ts

// Auth Types
export interface Admin {
    id: string;
    name: string;
    email: string;
    role: 'super_admin' | 'admin' | 'editor';
    isActive: boolean;
    lastLogin?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    admin: Admin;
}

// Product Types
export interface Product {
    id: string;
    categoryId: string;
    name: string;
    model?: string;
    slug: string;
    description?: string;
    shortDescription?: string;
    images: string[];
    specifications?: Record<string, any>;
    features?: string[];
    technicalSpecs?: Record<string, any>;
    rating: number;
    warranty?: string;
    price?: number;
    discountPrice?: number;
    isActive: boolean;
    isFeatured: boolean;
    sortOrder: number;
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
    createdAt: Date;
    updatedAt: Date;
    Category?: Category;
}

// Category Types
export interface Category {
    id: string;
    name: string;
    slug: string;
    icon?: string;
    image?: string;
    description?: string;
    parentId?: string;
    isActive: boolean;
    sortOrder: number;
    createdAt: Date;
    updatedAt: Date;
    children?: Category[];
    parent?: Category;
    productCount?: number;
}

// Banner Types
export interface Banner {
    id: string;
    title: string;
    subtitle?: string;
    description?: string;
    image: string;
    mobileImage?: string;
    link?: string;
    linkText: string;
    position: 'home' | 'products' | 'about' | 'contact';
    isActive: boolean;
    sortOrder: number;
    startDate?: Date;
    endDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}

// Section Types
export interface Section {
    id: string;
    type: 'banner' | 'products' | 'whyIndpower' | 'about' | 'viewDetails' |
        'dealerLocator' | 'joinDealer' | 'connect' | 'faq' | 'stillHaveQuestions' | 'custom';
    title?: string;
    subtitle?: string;
    content: Record<string, any>;
    settings: Record<string, any>;
    isActive: boolean;
    sortOrder: number;
    createdAt: Date;
    updatedAt: Date;
}

// Menu Types
export interface Menu {
    id: string;
    title: string;
    url?: string;
    type: 'internal' | 'external' | 'dropdown';
    parentId?: string;
    icon?: string;
    target: '_self' | '_blank';
    position: 'header' | 'footer' | 'both';
    isActive: boolean;
    sortOrder: number;
    createdAt: Date;
    updatedAt: Date;
    children?: Menu[];
    parent?: Menu;
}

// Contact Types
export interface Contact {
    id: string;
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
    status: 'new' | 'in_progress' | 'resolved';
    notes?: string;
    resolvedBy?: string;
    resolvedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    resolver?: Admin;
}

// FAQ Types
export interface FAQ {
    id: string;
    category: string;
    question: string;
    answer: string;
    isActive: boolean;
    sortOrder: number;
    views: number;
    helpful: number;
    notHelpful: number;
    createdAt: Date;
    updatedAt: Date;
}

// Media Types
export interface Media {
    url: string;
    id: string;
    filename: string;
    originalName: string;
    mimeType: string;
    size: number;
    path: string;
    thumbnail?: string;
    alt?: string;
    caption?: string;
    folder: string;
    uploadedBy?: string;
    createdAt: Date;
    updatedAt: Date;
}

// Settings Types
export interface Settings {
    id: string;
    key: string;
    value: any;
    type: 'general' | 'contact' | 'social' | 'seo' | 'email' | 'analytics';
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Dealer {
    id: string;
    name: string;
    email: string;
    phone: string;
    alternatePhone?: string;
    contactPerson?: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    latitude?: number;
    longitude?: number;
    type: 'distributor' | 'service_center' | 'dealer';
    services?: string[];
    brands?: string[];
    workingHours?: WorkingHours;
    website?: string;
    images?: string[];
    certifications?: string[];
    territory?: string;
    isActive: boolean;
    isFeatured: boolean;
    rating: number;
    totalReviews: number;
    establishedDate?: Date;
    description?: string;
    metaData?: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}

export interface WorkingHours {
    monday: DaySchedule;
    tuesday: DaySchedule;
    wednesday: DaySchedule;
    thursday: DaySchedule;
    friday: DaySchedule;
    saturday: DaySchedule;
    sunday: DaySchedule;
}

export interface DaySchedule {
    open: string;
    close: string;
    isOpen: boolean;
}

export interface DealersResponse extends PaginatedResponse<Dealer> {
    dealers: Dealer[];
    totalDealers: number;
}

export interface DealerStats {
    total: number;
    active: number;
    inactive: number;
    featured: number;
    byType: Array<{ type: string; count: number }>;
    byState: Array<{ state: string; count: number }>;
}

export interface DealerImportResult {
    message: string;
    success: number;
    failed: number;
    errors: Array<{ row: number; message: string; data: any }>;
    total: number;
}

// Activity Log Types
export interface ActivityLog {
    id: string;
    adminId: string;
    action: string;
    entity: string;
    entityId?: string;
    changes?: any;
    ipAddress?: string;
    userAgent?: string;
    createdAt: Date;
    updatedAt: Date;
    Admin?: Admin;
}

// Webhook Types
export interface Webhook {
    id: string;
    name: string;
    url: string;
    events: string[];
    headers: Record<string, string>;
    secret?: string;
    isActive: boolean;
    lastTriggered?: Date;
    failureCount: number;
    createdAt: Date;
    updatedAt: Date;
}

// SEO Types
export interface SEO {
    id: string;
    page: string;
    title: string;
    description?: string;
    keywords?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    canonicalUrl?: string;
    robots: string;
    structuredData?: any;
    createdAt: Date;
    updatedAt: Date;
}

// API Response Types
export interface PaginatedResponse<T> {
    [key: string]: any;
    totalPages: number;
    currentPage: number;
}

export interface ProductsResponse extends PaginatedResponse<Product> {
    products: Product[];
    totalProducts: number;
}

export interface ContactsResponse extends PaginatedResponse<Contact> {
    contacts: Contact[];
    totalContacts: number;
}

export interface MediaResponse extends PaginatedResponse<Media> {
    media: Media[];
    totalMedia: number;
}

export interface DashboardStats {
    stats: {
        totalProducts: number;
        activeProducts: number;
        totalCategories: number;
        totalContacts: number;
        newContacts: number;
        pendingContacts: number;
        totalAdmins: number;
    };
    contactTrend: Array<{
        date: string;
        count: number;
    }>;
    productsByCategory: Array<{
        name: string;
        productCount: number;
    }>;
}

export interface HomepageData {
    sections: Section[];
    banners: Banner[];
}

export interface PublicInfo {
    general?: Record<string, any>;
    contact?: Record<string, any>;
    social?: Record<string, any>;
}

export interface SearchResult {
    type: 'product' | 'category' | 'faq';
    id: string;
    name?: string;
    slug?: string;
    images?: string[];
    question?: string;
    category?: string;
}

export interface SearchResponse {
    results: SearchResult[];
    query: string;
}