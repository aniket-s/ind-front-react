// src/hooks/usePermission.ts
import { useAuth } from '@/contexts/AuthContext';

type Permission = 'super_admin' | 'admin' | 'editor';

export const usePermission = () => {
    const { user } = useAuth();

    const hasPermission = (requiredPermissions: Permission[]): boolean => {
        if (!user) return false;
        return requiredPermissions.includes(user.role);
    };

    const isSuperAdmin = (): boolean => user?.role === 'super_admin';
    const isAdmin = (): boolean => user?.role === 'admin' || isSuperAdmin();
    const isEditor = (): boolean => user?.role === 'editor' || isAdmin();

    return {
        hasPermission,
        isSuperAdmin,
        isAdmin,
        isEditor,
    };
};