// src/components/public/Home/HeroSection.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { getImageUrl } from '@/utils';
import { Banner } from '@/types';

interface HeroSectionProps {
    banners: Banner[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ banners }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (banners.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % banners.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [banners.length]);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % banners.length);
    };

    if (banners.length === 0) return null;

    const currentBanner = banners[currentIndex];

    return (
        <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
            <div className="absolute inset-0">
                <img
                    src={getImageUrl(currentBanner.image)}
                    alt={currentBanner.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40" />
            </div>

            <div className="relative container h-full flex items-center">
                <div className="max-w-2xl text-white">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                        {currentBanner.title}
                    </h1>
                    {currentBanner.subtitle && (
                        <p className="text-xl md:text-2xl mb-6">{currentBanner.subtitle}</p>
                    )}
                    {currentBanner.description && (
                        <p className="text-lg mb-8">{currentBanner.description}</p>
                    )}
                    {currentBanner.link && (
                        <Link
                            to={currentBanner.link}
                            className="btn btn-primary btn-lg"
                        >
                            {currentBanner.linkText}
                        </Link>
                    )}
                </div>
            </div>

            {banners.length > 1 && (
                <>
                    <button
                        onClick={handlePrev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                    >
                        <ChevronLeftIcon className="h-6 w-6" />
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                    >
                        <ChevronRightIcon className="h-6 w-6" />
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                        {banners.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={cn(
                                    'w-2 h-2 rounded-full transition-all',
                                    index === currentIndex
                                        ? 'bg-white w-8'
                                        : 'bg-white/50 hover:bg-white/75'
                                )}
                            />
                        ))}
                    </div>
                </>
            )}
        </section>
    );
};

export default HeroSection;
