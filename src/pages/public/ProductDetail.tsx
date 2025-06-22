// src/pages/public/ProductDetail.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { publicService } from '@/services/public.service';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

// Import section components
import { HeroSection } from '@/components/public/ProductDetail/HeroSection';
import { TechnicalSpecsSection } from '@/components/public/ProductDetail/TechnicalSpecsSection';
import { AdvancedFeaturesSection } from '@/components/public/ProductDetail/AdvancedFeaturesSection';
import { InverterModelsSection } from '@/components/public/ProductDetail/InverterModelsSection';
import { WhyChooseSection } from '@/components/public/ProductDetail/WhyChooseSection';
import { CTASection } from '@/components/public/ProductDetail/CTASection';

const ProductDetail: React.FC = () => {
    const { slug } = useParams();

    const { data, isLoading } = useQuery({
        queryKey: ['product', slug],
        queryFn: () => publicService.getProductBySlug(slug!),
    });

    if (isLoading) {
        return <LoadingSpinner fullScreen />;
    }

    if (!data) {
        return <div>Product not found</div>;
    }

    const { product, relatedProducts } = data;

    return (
        <div className="min-h-screen">
            <main>
                <HeroSection product={product} />
                <TechnicalSpecsSection product={product} />
                <AdvancedFeaturesSection product={product} />
                <InverterModelsSection
                    currentProduct={product}
                    relatedProducts={relatedProducts}
                />
                <WhyChooseSection />
                <CTASection product={product} />
            </main>
        </div>
    );
};

export default ProductDetail;