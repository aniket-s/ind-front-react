// src/layouts/PublicLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import PublicHeader from '@/components/public/Header';
import PublicFooter from '@/components/public/Footer';
import FloatingWhatsApp from '@/components/shared/FloatingWhatsApp';

const PublicLayout: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <PublicHeader />
            <main className="flex-grow">
                <Outlet />
            </main>
            <PublicFooter />

            {/* Floating WhatsApp Button */}
            <FloatingWhatsApp
                phoneNumber="7428191002"
                message="Hi, I would like to know more about IndPower products"
                position="right"
                showTooltip={true}
                pulseAnimation={true}
            />
        </div>
    );
};

export default PublicLayout;