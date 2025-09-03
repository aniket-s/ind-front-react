// src/services/public.service.ts
import { apiClient } from './api';
import { Product, Category, Menu, FAQ, Contact, HomepageData, PublicInfo } from '@/types';
import { searchDealersByPincode } from '@/data/dummyDealers';

// Export Dealer type
export interface Dealer {
    id: string | number;
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    latitude?: number;
    longitude?: number;
    type: 'dealer' | 'distributor' | 'service_center';
    isActive?: boolean;
    rating?: number;
    establishedDate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export const publicService = {
    async getHomepage(): Promise<HomepageData> {
        const { data } = await apiClient.axios.get<HomepageData>('/public/homepage');
        return data;
    },

    async getProducts(params?: {
        category?: string;
        search?: string;
        page?: number;
        limit?: number;
        sortBy?: string;
        sortOrder?: string;
    }): Promise<{
        products: Product[];
        totalPages: number;
        currentPage: number;
        totalProducts: number;
    }> {
        const { data } = await apiClient.axios.get('/public/products', { params });
        return data;
    },

    async getProductBySlug(slug: string): Promise<{
        product: Product;
        relatedProducts: Product[];
    }> {
        const { data } = await apiClient.axios.get(`/public/products/${slug}`);
        return data;
    },

    async getCategories(): Promise<Category[]> {
        const { data } = await apiClient.axios.get<Category[]>('/public/categories');
        return data;
    },

    async getMenus(position?: string): Promise<Menu[]> {
        const { data } = await apiClient.axios.get<Menu[]>('/public/menus', {
            params: { position },
        });
        return data;
    },

    async submitContact(contact: Partial<Contact>): Promise<{ message: string }> {
        const { data } = await apiClient.axios.post('/public/contact', contact);
        return data;
    },

    // Updated to use dummy data instead of API call
    async getDealersByPincode(pincode: string): Promise<Dealer[]> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Use the dummy data function
        const results = searchDealersByPincode(pincode);

        // Map DealerData to Dealer type if needed
        return results.map(dealer => ({
            id: dealer.id,
            name: dealer.name,
            email: dealer.email,
            phone: dealer.phone,
            address: dealer.address,
            city: dealer.city,
            state: dealer.state,
            pincode: dealer.pincode,
            latitude: dealer.latitude,
            longitude: dealer.longitude,
            type: dealer.type,
            isActive: true,
            rating: dealer.rating,
            establishedDate: dealer.establishedYear ? new Date(dealer.establishedYear, 0, 1) : undefined,
            createdAt: new Date(),
            updatedAt: new Date()
        }));
    },

    async getFAQs(category?: string): Promise<{
        faqs: FAQ[];
        categories: string[];
    }> {
        const { data } = await apiClient.axios.get('/public/faqs', {
            params: { category },
        });
        return data;
    },

    async getInfo(): Promise<PublicInfo> {
        const { data } = await apiClient.axios.get<PublicInfo>('/public/info');
        return data;
    },
};
