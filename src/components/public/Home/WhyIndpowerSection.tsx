// src/components/public/Home/WhyIndpowerSection.tsx
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUsers,
    faTag,
    faHeadset,
    faShieldAlt,
    faCertificate,
    faTools,
    faAward,
    faClock,
    faTruck,
    faHandshake,
    faBolt,
    faChartLine,
    faChevronLeft,
    faChevronRight,
    IconDefinition
} from '@fortawesome/free-solid-svg-icons';

interface Feature {
    icon: IconDefinition | string;
    title: string;
    description: string;
    bgColor?: string;
    iconColor?: string;
}

interface WhyIndpowerSectionProps {
    section: {
        title?: string;
        subtitle?: string;
        content?: {
            features?: Feature[];
            backgroundImage?: string; // CMS field for background image
            autoPlay?: boolean; // CMS field for auto-play
            autoPlayInterval?: number; // CMS field for auto-play interval
        };
    };
}

// Extended icon mapping for more options
const iconMap: { [key: string]: IconDefinition } = {
    'fas fa-users': faUsers,
    'fas fa-tag': faTag,
    'fas fa-headset': faHeadset,
    'fas fa-shield-alt': faShieldAlt,
    'fas fa-certificate': faCertificate,
    'fas fa-tools': faTools,
    'fas fa-award': faAward,
    'fas fa-clock': faClock,
    'fas fa-truck': faTruck,
    'fas fa-handshake': faHandshake,
    'fas fa-bolt': faBolt,
    'fas fa-chart-line': faChartLine,
};

const WhyIndpowerSection: React.FC<WhyIndpowerSectionProps> = ({ section }) => {
    const defaultFeatures: Feature[] = [
        {
            icon: faUsers,
            title: "Expert Staff",
            description: "Our team consists of certified professionals with years of experience in power solutions, ensuring you receive the best service and support."
        },
        {
            icon: faTag,
            title: "Affordable Pricing",
            description: "We offer competitive pricing without compromising on quality, making reliable power solutions accessible to everyone."
        },
        {
            icon: faHeadset,
            title: "24/7 Support",
            description: "Our dedicated customer support team is available round the clock to assist you with any queries or concerns."
        },
        {
            icon: faShieldAlt,
            title: "Quality Assurance",
            description: "All our products undergo rigorous quality checks to ensure maximum reliability and performance for your needs."
        },
        {
            icon: faAward,
            title: "Industry Recognition",
            description: "Trusted by thousands of customers and recognized as a leading provider in the power solutions industry."
        },
        {
            icon: faTruck,
            title: "Fast Delivery",
            description: "Quick and reliable delivery service ensuring your power solutions reach you when you need them most."
        }
    ];

    const features = section.content?.features && section.content.features.length > 0
        ? section.content.features.map(feature => ({
            ...feature,
            icon: typeof feature.icon === 'string' ? iconMap[feature.icon] || faUsers : feature.icon
        }))
        : defaultFeatures;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    // Determine how many cards to show based on screen size
    const [cardsToShow, setCardsToShow] = useState(2);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setCardsToShow(1);
            } else if (window.innerWidth < 1280) {
                setCardsToShow(1);
            } else {
                setCardsToShow(2);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Auto-play functionality
    useEffect(() => {
        if (section.content?.autoPlay !== false) {
            const interval = setInterval(() => {
                handleNext();
            }, section.content?.autoPlayInterval || 5000);

            return () => clearInterval(interval);
        }
    }, [currentIndex, features.length, cardsToShow]);

    const handlePrevious = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex - cardsToShow;
            return newIndex < 0 ? features.length - cardsToShow : newIndex;
        });
        setTimeout(() => setIsTransitioning(false), 300);
    };

    const handleNext = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex + cardsToShow;
            return newIndex >= features.length ? 0 : newIndex;
        });
        setTimeout(() => setIsTransitioning(false), 300);
    };

    // Touch handlers for mobile swipe
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe) {
            handleNext();
        }
        if (isRightSwipe) {
            handlePrevious();
        }
    };

    const getIcon = (icon: IconDefinition | string): IconDefinition => {
        if (typeof icon === 'string') {
            return iconMap[icon] || faUsers;
        }
        return icon;
    };

    const getVisibleFeatures = () => {
        const visible = [];
        for (let i = 0; i < cardsToShow; i++) {
            const index = (currentIndex + i) % features.length;
            visible.push(features[index]);
        }
        return visible;
    };

    const maxSlides = Math.ceil(features.length / cardsToShow);
    const currentSlide = Math.floor(currentIndex / cardsToShow);

    // Default background image (you can replace this with the actual image URL)
    const backgroundImage = section.content?.backgroundImage || '/why.jpg';

    return (
        <section className="relative bg-blue-600 overflow-hidden">
            {/* Background Image - No Overlay */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            />

            {/* Content Container */}
            <div className="relative z-10 container mx-auto px-4 py-16 lg:py-20">
                {/* Title Section - Centered at Top */}
                <div className="text-center text-white mb-12">
                    <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                        {section.title || "Why INDPOWER?"}
                    </h2>
                    {section.subtitle && (
                        <div className="w-20 h-1 bg-yellow-400 mx-auto mb-6"></div>
                    )}
                    {section.subtitle && (
                        <p className="text-white/90 text-lg max-w-2xl mx-auto">
                            {section.subtitle}
                        </p>
                    )}
                </div>

                {/* Slider Container - Positioned to the Right */}
                <div className="flex justify-end">
                    <div className="w-full lg:w-3/5 xl:w-1/2">
                        <div className="relative">
                            {/* Navigation Buttons */}
                            <button
                                onClick={handlePrevious}
                                className="absolute left-0 lg:-left-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-12 lg:h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
                                aria-label="Previous"
                                disabled={isTransitioning}
                            >
                                <FontAwesomeIcon icon={faChevronLeft} className="text-lg" />
                            </button>

                            <button
                                onClick={handleNext}
                                className="absolute right-0 lg:-right-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-12 lg:h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
                                aria-label="Next"
                                disabled={isTransitioning}
                            >
                                <FontAwesomeIcon icon={faChevronRight} className="text-lg" />
                            </button>

                            {/* Cards Container */}
                            <div
                                className="overflow-hidden px-2"
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                            >
                                <div className={`grid grid-cols-1 ${cardsToShow === 2 ? 'xl:grid-cols-2' : ''} gap-6 transition-opacity duration-300 ${isTransitioning ? 'opacity-70' : 'opacity-100'}`}>
                                    {getVisibleFeatures().map((feature, index) => (
                                        <div
                                            key={`${currentIndex}-${index}`}
                                            className="bg-blue-700/50 backdrop-blur-sm rounded-2xl p-8 text-white group hover:bg-blue-700/70 transition-all duration-300 transform hover:-translate-y-1"
                                        >
                                            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                                <FontAwesomeIcon
                                                    icon={getIcon(feature.icon)}
                                                    className="text-blue-900 text-2xl"
                                                />
                                            </div>
                                            <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                                            <p className="text-white/90 leading-relaxed mb-6">
                                                {feature.description}
                                            </p>
                                            <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-yellow-400 hover:text-blue-900 transition-colors duration-300">
                                                EXPLORE NOW
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Slide Indicators */}
                            <div className="flex justify-center mt-8 gap-2">
                                {Array.from({ length: maxSlides }).map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            if (!isTransitioning) {
                                                setIsTransitioning(true);
                                                setCurrentIndex(index * cardsToShow);
                                                setTimeout(() => setIsTransitioning(false), 300);
                                            }
                                        }}
                                        className={`h-2 transition-all duration-300 rounded-full ${
                                            index === currentSlide
                                                ? 'w-8 bg-yellow-400'
                                                : 'w-2 bg-white/30 hover:bg-white/50'
                                        }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Optional: Decorative Elements - You can remove these if not needed */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
        </section>
    );
};

export default WhyIndpowerSection;