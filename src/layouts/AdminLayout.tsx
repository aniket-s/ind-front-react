// src/layouts/AdminLayout.tsx
import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { usePermission } from '@/hooks/usePermission';
import {
    HomeIcon,
    CubeIcon,
    TagIcon,
    PhotoIcon,
    Squares2X2Icon,
    Bars3Icon,
    EnvelopeIcon,
    QuestionMarkCircleIcon,
    FolderIcon,
    CogIcon,
    UserGroupIcon,
    XMarkIcon,
    ArrowRightOnRectangleIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@/utils';

// Import the Permission type from the usePermission hook
type Permission = 'super_admin' | 'admin' | 'editor';

interface NavItem {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    permission?: Permission[];
}

const navigation: NavItem[] = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
    { name: 'Products', href: '/admin/products', icon: CubeIcon },
    { name: 'Categories', href: '/admin/categories', icon: TagIcon },
    { name: 'Banners', href: '/admin/banners', icon: PhotoIcon },
    { name: 'Sections', href: '/admin/sections', icon: Squares2X2Icon },
    { name: 'Menus', href: '/admin/menus', icon: Bars3Icon },
    { name: 'Contacts', href: '/admin/contacts', icon: EnvelopeIcon },
    { name: 'FAQs', href: '/admin/faqs', icon: QuestionMarkCircleIcon },
    { name: 'Media', href: '/admin/media', icon: FolderIcon },
    { name: 'Settings', href: '/admin/settings', icon: CogIcon, permission: ['super_admin'] },
    { name: 'Admins', href: '/admin/admins', icon: UserGroupIcon, permission: ['super_admin'] },
];

const AdminLayout: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    useNavigate();
    const { user, logout } = useAuth();
    const { hasPermission } = usePermission();

    const filteredNavigation = navigation.filter(
        (item) => !item.permission || hasPermission(item.permission)
    );

    return (
        <div className="h-screen flex overflow-hidden bg-gray-100">
            {/* Mobile sidebar */}
            <div className={cn(
                "fixed inset-0 flex z-40 md:hidden",
                sidebarOpen ? '' : 'pointer-events-none'
            )}>
                <div className={cn(
                    "fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity",
                    sidebarOpen ? 'opacity-100' : 'opacity-0'
                )} onClick={() => setSidebarOpen(false)} />

                <div className={cn(
                    "relative flex-1 flex flex-col max-w-xs w-full bg-white transition-transform",
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                )}>
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                        <button
                            type="button"
                            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <XMarkIcon className="h-6 w-6 text-white" />
                        </button>
                    </div>

                    <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                        <div className="flex-shrink-0 flex items-center px-4">
                            <h2 className="text-lg font-semibold text-gray-800">IndPower Admin</h2>
                        </div>
                        <nav className="mt-5 px-2 space-y-1">
                            {filteredNavigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={cn(
                                        location.pathname.startsWith(item.href)
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                        'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                    )}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <item.icon className="mr-4 h-6 w-6" />
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                        <div className="flex items-center">
                            <div>
                                <UserCircleIcon className="h-10 w-10 text-gray-400" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                                <p className="text-xs text-gray-500">{user?.role.replace('_', ' ')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Static sidebar for desktop */}
            <div className="hidden md:flex md:flex-shrink-0">
                <div className="flex flex-col w-64">
                    <div className="flex flex-col h-0 flex-1 bg-white border-r border-gray-200">
                        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                            <div className="flex items-center flex-shrink-0 px-4">
                                <h2 className="text-lg font-semibold text-gray-800">IndPower Admin</h2>
                            </div>
                            <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
                                {filteredNavigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={cn(
                                            location.pathname.startsWith(item.href)
                                                ? 'bg-gray-100 text-gray-900'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                            'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                        )}
                                    >
                                        <item.icon className="mr-3 h-5 w-5" />
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                            <Link to="/admin/profile" className="flex-shrink-0 w-full group block">
                                <div className="flex items-center">
                                    <div>
                                        <UserCircleIcon className="h-9 w-9 text-gray-400" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                                            {user?.name}
                                        </p>
                                        <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                                            View profile
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-0 flex-1 overflow-hidden">
                <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
                    <button
                        type="button"
                        className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Bars3Icon className="h-6 w-6" />
                    </button>
                </div>

                <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
                    <div className="py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-semibold text-gray-900">
                                    {filteredNavigation.find(item => location.pathname.startsWith(item.href))?.name || 'Admin'}
                                </h1>
                                <button
                                    onClick={logout}
                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                >
                                    <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                                    Logout
                                </button>
                            </div>
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;