// src/pages/public/Home.tsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { publicService } from '@/services/public.service';
import HeroSection from '@/components/public/Home/HeroSection';
import ProductsSection from '@/components/public/Home/ProductsSection';
import WhyIndpowerSection from '@/components/public/Home/WhyIndpowerSection';
import FAQSection from '@/components/public/Home/FAQSection';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

const Home: React.FC = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['homepage'],
        queryFn: () => publicService.getHomepage(),
    });

    if (isLoading) {
        return <LoadingSpinner fullScreen />;
    }

    const renderSection = (section: any) => {
        switch (section.type) {
            case 'banner':
                return <HeroSection key={section.id} banners={data?.banners || []} />;
            case 'products':
                return <ProductsSection key={section.id} section={section} />;
            case 'whyIndpower':
                return <WhyIndpowerSection key={section.id} section={section} />;
            case 'faq':
                return <FAQSection key={section.id} section={section} />;
            default:
                return null;
        }
    };

    return (
        <div>
            {data?.sections.filter(s => s.isActive).sort((a, b) => a.sortOrder - b.sortOrder).map(renderSection)}
        </div>
    );
};

export default Home;
