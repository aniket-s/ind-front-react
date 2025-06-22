
// src/services/media.service.ts
import { apiClient } from './api';
import { Media, MediaResponse } from '@/types';

export const mediaService = {
    async getMedia(params?: {
        page?: number;
        limit?: number;
        folder?: string;
        mimeType?: string;
        search?: string;
        sortBy?: string;
        sortOrder?: string;
    }): Promise<MediaResponse> {
        const { data } = await apiClient.axios.get<MediaResponse>('/media', { params });
        return data;
    },

    async uploadMedia(files: File[], folder?: string, alt?: string, caption?: string): Promise<Media[]> {
        const formData = new FormData();
        files.forEach(file => formData.append('files', file));
        if (folder) formData.append('folder', folder);
        if (alt) formData.append('alt', alt);
        if (caption) formData.append('caption', caption);

        const { data } = await apiClient.axios.post<Media[]>('/media/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return data;
    },

    async updateMedia(id: string, media: { alt?: string; caption?: string }): Promise<Media> {
        const { data } = await apiClient.axios.put<Media>(`/media/${id}`, media);
        return data;
    },

    async deleteMedia(id: string): Promise<{ message: string }> {
        const { data } = await apiClient.axios.delete(`/media/${id}`);
        return data;
    },

    async bulkDeleteMedia(ids: string[]): Promise<{ message: string }> {
        const { data } = await apiClient.axios.post('/media/bulk-delete', { ids });
        return data;
    },
};