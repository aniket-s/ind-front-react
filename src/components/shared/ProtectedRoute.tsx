// src/components/shared/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRoles }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <LoadingSpinner fullScreen />;
    }

    if (!user) {
        return <Navigate to="/admin/login" replace />;
    }

    if (requiredRoles && !requiredRoles.includes(user.role)) {
        return <Navigate to="/admin/dashboard" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
