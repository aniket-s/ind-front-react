// src/components/public/Home/HeroSection.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon, PauseIcon, PlayIcon } from '@heroicons/react/24/outline';
import { cn, getImageUrl } from '@/utils';
import { Banner } from '@/types';

interface HeroSectionProps {
    banners: Banner[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ banners }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const touchStartX = useRef<number | null>(null);

    // Preload images
    useEffect(() => {
        banners.forEach((banner, index) => {
            const img = new Image();
            img.src = getImageUrl(banner.image);
            img.onload = () => {
                setLoadedImages(prev => new Set(prev).add(index));
            };
        });
    }, [banners]);

    // Auto-play functionality
    useEffect(() => {
        if (banners.length <= 1 || !isPlaying) return;

        intervalRef.current = setInterval(() => {
            handleNext();
        }, 6000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [banners.length, currentIndex, isPlaying]);

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

    const handleGoToSlide = useCallback((index: number) => {
        if (isTransitioning || index === currentIndex) return;
        setIsTransitioning(true);
        setCurrentIndex(index);
        setTimeout(() => setIsTransitioning(false), 600);
    }, [currentIndex, isTransitioning]);

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

    if (banners.length === 0) return null;

    return (
        <section
            className="relative min-h-[500px] overflow-hidden bg-gray-900"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* Background Images */}
            <div className="">
                {banners.map((banner, index) => (
                    <div
                        key={index}
                        className={cn(
                            "absolute inset-0 transition-all duration-1000 ease-in-out",
                            index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-110"
                        )}
                    >
                        {loadedImages.has(index) ? (
                            banner.link ? (
                                <Link to={banner.link} className="block w-full h-full">
                                    <img
                                        src={getImageUrl(banner.image)}
                                        alt={banner.title}
                                        className="w-full h-full object-cover animate-ken-burns"
                                    />
                                </Link>
                            ) : (
                                <img
                                    src={getImageUrl(banner.image)}
                                    alt={banner.title}
                                    className="w-full h-full object-cover animate-ken-burns"
                                />
                            )
                        ) : (
                            <div className="w-full h-full bg-gray-800 animate-pulse" />
                        )}
                    </div>
                ))}
            </div>

            {/* Navigation Controls */}
            {banners.length > 1 && (
                <>
                    {/* Side Navigation */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
                        aria-label="Previous slide"
                    >
                        <ChevronLeftIcon className="h-6 w-6" />
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
                        aria-label="Next slide"
                    >
                        <ChevronRightIcon className="h-6 w-6" />
                    </button>

                    {/* Bottom Controls */}
                    <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center space-x-8">
                        {/* Play/Pause Button */}
                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
                            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
                        >
                            {isPlaying ? (
                                <PauseIcon className="h-5 w-5" />
                            ) : (
                                <PlayIcon className="h-5 w-5" />
                            )}
                        </button>

                        {/* Dot Indicators */}
                        <div className="flex items-center space-x-3">
                            {banners.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleGoToSlide(index)}
                                    className={cn(
                                        "relative h-2 rounded-full transition-all duration-500 focus:outline-none",
                                        index === currentIndex
                                            ? "bg-white w-12"
                                            : "bg-white/40 hover:bg-white/60 w-2"
                                    )}
                                    aria-label={`Go to slide ${index + 1}`}
                                >
                                    {index === currentIndex && (
                                        <div
                                            className="absolute inset-0 bg-white rounded-full animate-progress"
                                            style={{ animationDuration: isPlaying ? '6s' : '0s' }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Slide Counter */}
                        <div className="text-white/60 text-sm font-medium">
                            {String(currentIndex + 1).padStart(2, '0')} / {String(banners.length).padStart(2, '0')}
                        </div>
                    </div>
                </>
            )}
        </section>
    );
};

export default HeroSection;