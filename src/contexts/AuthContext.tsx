// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Admin, LoginCredentials } from '@/types';
import { authService } from '@/services/auth.service';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

interface AuthContextType {
    user: Admin | null;
    loading: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
    updateProfile: (profile: Partial<Admin>) => Promise<void>;
    changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

interface ApiErrorResponse {
    message?: string;
    error?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<Admin | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const profile = await authService.getProfile();
                    setUser(profile);
                } catch (error) {
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    const login = async (credentials: LoginCredentials) => {
        try {
            const response = await authService.login(credentials);
            setUser(response.admin);
            toast.success('Login successful!');
        } catch (error) {
            const axiosError = error as AxiosError<ApiErrorResponse>;
            const message = axiosError.response?.data?.message || 'Login failed';
            toast.error(message);
            throw error;
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        toast.success('Logged out successfully');
    };

    const updateProfile = async (profile: Partial<Admin>) => {
        try {
            const response = await authService.updateProfile(profile);
            setUser(response.admin);
            toast.success('Profile updated successfully');
        } catch (error) {
            const axiosError = error as AxiosError<ApiErrorResponse>;
            const message = axiosError.response?.data?.message || 'Update failed';
            toast.error(message);
            throw error;
        }
    };

    const changePassword = async (currentPassword: string, newPassword: string) => {
        try {
            await authService.changePassword(currentPassword, newPassword);
            toast.success('Password changed successfully');
        } catch (error) {
            const axiosError = error as AxiosError<ApiErrorResponse>;
            const message = axiosError.response?.data?.message || 'Password change failed';
            toast.error(message);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, updateProfile, changePassword }}>
            {children}
        </AuthContext.Provider>
    );
};