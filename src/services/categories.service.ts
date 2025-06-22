

// src/services/categories.service.ts
import { apiClient } from './api';
import { Category } from '@/types';

export const categoriesService = {
    async getCategories(params?: {
        includeChildren?: boolean;
        isActive?: boolean;
    }): Promise<Category[]> {
        const { data } = await apiClient.axios.get<Category[]>('/categories', { params });
        return data;
    },

    async getCategoryTree(): Promise<Category[]> {
        const { data } = await apiClient.axios.get<Category[]>('/categories/tree');
        return data;
    },

    async getCategory(id: string): Promise<Category & { productCount: number }> {
        const { data } = await apiClient.axios.get<Category & { productCount: number }>(`/categories/${id}`);
        return data;
    },

    async createCategory(formData: FormData): Promise<Category> {
        const { data } = await apiClient.axios.post<Category>('/categories', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return data;
    },

    async updateCategory(id: string, formData: FormData): Promise<Category> {
        const { data } = await apiClient.axios.put<Category>(`/categories/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return data;
    },

    async deleteCategory(id: string): Promise<{ message: string }> {
        const { data } = await apiClient.axios.delete(`/categories/${id}`);
        return data;
    },
};
