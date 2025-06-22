// src/layouts/PublicLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import PublicHeader from '@/components/public/Header';
import PublicFooter from '@/components/public/Footer';

const PublicLayout: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <PublicHeader />
            <main className="flex-grow">
                <Outlet />
            </main>
            <PublicFooter />
        </div>
    );
};

export default PublicLayout;