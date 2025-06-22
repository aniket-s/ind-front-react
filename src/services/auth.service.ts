
// src/services/auth.service.ts
import { apiClient } from './api';
import type {LoginCredentials, AuthResponse, Admin} from '../types';

export const authService = {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const { data } = await apiClient.axios.post<AuthResponse>('/auth/login', credentials);
        localStorage.setItem('token', data.token);
        return data;
    },

    async getProfile(): Promise<Admin> {
        const { data } = await apiClient.axios.get<Admin>('/auth/profile');
        return data;
    },

    async updateProfile(profile: Partial<Admin>): Promise<{ message: string; admin: Admin }> {
        const { data } = await apiClient.axios.put('/auth/profile', profile);
        return data;
    },

    async changePassword(currentPassword: string, newPassword: string): Promise<{ message: string }> {
        const { data } = await apiClient.axios.put('/auth/change-password', {
            currentPassword,
            newPassword,
        });
        return data;
    },

    logout() {
        localStorage.removeItem('token');
        window.location.href = '/admin/login';
    },
};
