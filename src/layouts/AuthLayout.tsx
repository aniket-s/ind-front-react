// src/layouts/AuthLayout.tsx
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const AuthLayout: React.FC = () => {
    const { user } = useAuth();

    if (user) {
        return <Navigate to="/admin/dashboard" replace />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">IndPower</h2>
                    <p className="mt-2 text-sm text-gray-600">Admin Panel</p>
                </div>
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;