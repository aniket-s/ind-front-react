
// src/services/public.service.ts
import { apiClient } from './api';
import { Product, Category, Menu, FAQ, Contact, Dealer, HomepageData, PublicInfo } from '@/types';

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

    async getDealersByPincode(pincode: string): Promise<Dealer[]> {
        const { data } = await apiClient.axios.get<Dealer[]>(`/public/dealers/${pincode}`);
        return data;
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