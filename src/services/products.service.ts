
// src/services/products.service.ts
import { apiClient } from './api';
import { Product, ProductsResponse } from '@/types';

export const productsService = {
    async getProducts(params?: {
        page?: number;
        limit?: number;
        category?: string;
        search?: string;
        isActive?: boolean;
        isFeatured?: boolean;
        sortBy?: string;
        sortOrder?: string;
    }): Promise<ProductsResponse> {
        const { data } = await apiClient.axios.get<ProductsResponse>('/products', { params });
        return data;
    },

    async getProduct(id: string): Promise<Product> {
        const { data } = await apiClient.axios.get<Product>(`/products/${id}`);
        return data;
    },

    async createProduct(formData: FormData): Promise<Product> {
        const { data } = await apiClient.axios.post<Product>('/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return data;
    },

    async updateProduct(id: string, formData: FormData): Promise<Product> {
        const { data } = await apiClient.axios.put<Product>(`/products/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return data;
    },

    async deleteProduct(id: string): Promise<{ message: string }> {
        const { data } = await apiClient.axios.delete(`/products/${id}`);
        return data;
    },

    async toggleProductStatus(id: string): Promise<{ message: string; isActive: boolean }> {
        const { data } = await apiClient.axios.patch(`/products/${id}/toggle-status`);
        return data;
    },

    async deleteProductImage(productId: string, imageIndex: number): Promise<{ message: string; images: string[] }> {
        const { data } = await apiClient.axios.delete(`/products/${productId}/image/${imageIndex}`);
        return data;
    },
};