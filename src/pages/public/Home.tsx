// src/pages/public/Home.tsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { publicService } from '@/services/public.service';
import HeroSection from '@/components/public/Home/HeroSection';
import ProductsSection from '@/components/public/Home/ProductsSection';
import WhyIndpowerSection from '@/components/public/Home/WhyIndpowerSection';
import FAQSection from '@/components/public/Home/FAQSection';
import AboutSection from '@/components/public/Home/AboutSection';
import ViewDetailsSection from '@/components/public/Home/ViewDetailsSection';
import DealerLocatorSection from '@/components/public/Home/DealerLocatorSection';
import JoinDealerSection from '@/components/public/Home/JoinDealerSection';
import ConnectSection from '@/components/public/Home/ConnectSection';
import StillHaveQuestionsSection from '@/components/public/Home/StillHaveQuestionsSection';
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
        // Only render active sections
        if (!section.isActive) return null;

        switch (section.type) {
            case 'banner':
                return <HeroSection key={section.id} banners={data?.banners || []} />;
            case 'products':
                return <ProductsSection key={section.id} section={section} />;
            case 'whyIndpower':
                return <WhyIndpowerSection key={section.id} section={section} />;
            case 'about':
                return <AboutSection key={section.id} section={section} />;
            case 'viewDetails':
                return <ViewDetailsSection key={section.id} section={section} />;
            case 'dealerLocator':
                return <DealerLocatorSection key={section.id} section={section} />;
            case 'joinDealer':
                return <JoinDealerSection key={section.id} section={section} />;
            case 'connect':
                return <ConnectSection key={section.id} section={section} />;
            case 'faq':
                return <FAQSection key={section.id} section={section} />;
            case 'stillHaveQuestions':
                return <StillHaveQuestionsSection key={section.id} section={section} />;
            case 'custom':
                // Handle custom sections if needed
                return null;
            default:
                console.warn(`Unknown section type: ${section.type}`);
                return null;
        }
    };

    return (
        <div className="min-h-screen">
            {data?.sections
                .filter(s => s.isActive)
                .sort((a, b) => a.sortOrder - b.sortOrder)
                .map(renderSection)}
        </div>
    );
};

export default Home;