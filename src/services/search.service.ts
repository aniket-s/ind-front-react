

// src/services/search.service.ts
import { apiClient } from './api';
import { SearchResponse } from '@/types';

export const searchService = {
    async search(query: string, limit?: number): Promise<SearchResponse> {
        const { data } = await apiClient.axios.get<SearchResponse>('/search', {
            params: { q: query, limit },
        });
        return data;
    },

    async getSuggestions(query: string): Promise<{ suggestions: string[] }> {
        const { data } = await apiClient.axios.get('/search/suggestions', {
            params: { q: query },
        });
        return data;
    },
};