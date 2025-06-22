// src/services/api.ts
import axios, {type AxiosInstance, AxiosError } from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class ApiClient {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: API_URL,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Request interceptor
        this.client.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Response interceptor
        this.client.interceptors.response.use(
            (response) => response,
            (error: AxiosError) => {
                if (error.response?.status === 401) {
                    localStorage.removeItem('token');
                    window.location.href = '/admin/login';
                    toast.error('Session expired. Please login again.');
                } else if (error.response?.status === 403) {
                    toast.error('You do not have permission to perform this action.');
                } else if (error.response?.status === 500) {
                    toast.error('Server error. Please try again later.');
                }
                return Promise.reject(error);
            }
        );
    }

    get axios() {
        return this.client;
    }
}

export const apiClient = new ApiClient();


