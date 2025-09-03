// src/components/public/Home/HeroSection.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { cn, getImageUrl } from '@/utils';
import { Banner } from '@/types';

interface HeroSectionProps {
    banners: Banner[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ banners }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
    const [loadedMobileImages, setLoadedMobileImages] = useState<Set<number>>(new Set());
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const touchStartX = useRef<number | null>(null);

    // Preload both desktop and mobile images
    useEffect(() => {
        banners.forEach((banner, index) => {
            // Preload desktop image
            const img = new Image();
            img.src = getImageUrl(banner.image);
            img.onload = () => {
                setLoadedImages(prev => new Set(prev).add(index));
            };

            // Preload mobile image if available
            if (banner.mobileImage) {
                const mobileImg = new Image();
                mobileImg.src = getImageUrl(banner.mobileImage);
                mobileImg.onload = () => {
                    setLoadedMobileImages(prev => new Set(prev).add(index));
                };
            }
        });
    }, [banners]);

    const handlePrev = useCallback(() => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
        setTimeout(() => setIsTransitioning(false), 600);
    }, [banners.length, isTransitioning]);

    const handleNext = useCallback(() => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev + 1) % banners.length);
        setTimeout(() => setIsTransitioning(false), 600);
    }, [banners.length, isTransitioning]);

    // Auto-play functionality - 6 seconds interval (always active)
    useEffect(() => {
        if (banners.length <= 1) return;

        intervalRef.current = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % banners.length);
        }, 6000); // 6 seconds

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [banners.length]);

    const handleGoToSlide = useCallback((index: number) => {
        if (isTransitioning || index === currentIndex) return;
        setIsTransitioning(true);
        setCurrentIndex(index);

        // Reset the auto-play timer when manually navigating
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % banners.length);
            }, 6000);
        }

        setTimeout(() => setIsTransitioning(false), 600);
    }, [currentIndex, isTransitioning, banners.length]);

    // Touch handlers for mobile swipe
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (!touchStartX.current) return;

        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX.current - touchEndX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                handleNext();
            } else {
                handlePrev();
            }
        }
        touchStartX.current = null;
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'ArrowRight') handleNext();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handlePrev, handleNext]);

    // Helper function to render responsive image
    const renderBannerImage = (banner: Banner, index: number) => {
        const isLoaded = loadedImages.has(index);
        const isMobileLoaded = banner.mobileImage ? loadedMobileImages.has(index) : true;
        const showImage = isLoaded && isMobileLoaded;

        if (!showImage) {
            return <div className="w-full h-full bg-gray-800 animate-pulse" />;
        }

        const imageElement = (
            <picture className="w-full h-full">
                {/* Mobile image source - shown on screens smaller than 768px */}
                {banner.mobileImage && (
                    <source
                        media="(max-width: 767px)"
                        srcSet={getImageUrl(banner.mobileImage)}
                    />
                )}
                {/* Desktop image - default/fallback */}
                <img
                    src={getImageUrl(banner.image)}
                    alt={banner.title}
                    className="w-full h-full object-cover"
                />
            </picture>
        );

        // Wrap in Link if banner has a link
        if (banner.link) {
            return (
                <Link to={banner.link} className="block w-full h-full">
                    {imageElement}
                </Link>
            );
        }

        return imageElement;
    };

    if (banners.length === 0) return null;

    return (
        <div className="w-full ">
            {/* Image Slider Section */}
            <section
                className="relative w-full h-[500px] md:h-[500px] overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {/* Background Images Container */}
                <div className="relative w-full h-full">
                    {banners.map((banner, index) => (
                        <div
                            key={index}
                            className={cn(
                                "absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out",
                                index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                            )}
                        >
                            {renderBannerImage(banner, index)}
                        </div>
                    ))}
                </div>

                {/* Navigation Controls - Only show if multiple banners */}
                {banners.length > 1 && (
                    <>
                        {/* Side Navigation Buttons */}
                        <button
                            onClick={handlePrev}
                            className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
                            aria-label="Previous slide"
                        >
                            <ChevronLeftIcon className="h-5 w-5" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
                            aria-label="Next slide"
                        >
                            <ChevronRightIcon className="h-5 w-5" />
                        </button>
                    </>
                )}
            </section>

            {/* Dot Indicators - Below the image */}
            {banners.length > 1 && (
                <div className="py-4  md:py-5 bg-color[#f9fafb]" >
                    <div className="flex items-center justify-center gap-2 md:gap-2.5 px-4">
                        {banners.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handleGoToSlide(index)}
                                className={cn(
                                    "p-0 border-0 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50",
                                    index === currentIndex
                                        ? "w-2.5 h-2.5 md:w-3 md:h-3 bg-white"
                                        : "w-2 h-2 md:w-2.5 md:h-2.5 bg-white/30 hover:bg-white/50"
                                )}
                                style={{
                                    padding: 0,
                                    border: 'none',
                                    fontSize: 'inherit',
                                    fontWeight: 'inherit'
                                }}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default HeroSection;