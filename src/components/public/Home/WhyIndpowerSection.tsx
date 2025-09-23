// src/components/public/Home/WhyIndpowerSection.tsx
import React from 'react';
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
    IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
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
            backgroundImage?: string;
        };
    };
}

// Icon mapping for CMS integration
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

// Custom icon mapping based on title
const customIconMap: { [key: string]: string } = {
    'Pan India Service': '/pan-india.png',
    'Powerful Performance': '/powerful-performance.png',
    'Trusted Quality': '/trusted-quality.png'
};

const WhyIndpowerSection: React.FC<WhyIndpowerSectionProps> = ({ section }) => {
    const defaultFeatures: Feature[] = [
        {
            icon: faUsers,
            title: "Expert Staff",
            description: "Our team consists of certified professionals with years of experience in power solutions."
        },
        {
            icon: faTag,
            title: "Affordable Pricing",
            description: "We offer competitive pricing without compromising on quality, making power solutions accessible."
        },
        {
            icon: faHeadset,
            title: "24/7 Support",
            description: "Our dedicated customer support team is available round the clock to assist you."
        }
    ];

    // Use provided features or default features (limit to 3 for optimal display)
    const features = section.content?.features && section.content.features.length > 0
        ? section.content.features.slice(0, 3).map(feature => ({
            ...feature,
            icon: typeof feature.icon === 'string' ? iconMap[feature.icon] || faUsers : feature.icon
        }))
        : defaultFeatures;

    const getIcon = (icon: IconDefinition | string): IconDefinition => {
        if (typeof icon === 'string') {
            return iconMap[icon] || faUsers;
        }
        return icon;
    };

    // Check if a feature should use a custom icon based on its title
    const hasCustomIcon = (title: string): boolean => {
        return title in customIconMap;
    };

    // Get custom icon path
    const getCustomIcon = (title: string): string => {
        return customIconMap[title];
    };
    const navigate = useNavigate(); // Add this line
    // Default background image
    const backgroundImage = section.content?.backgroundImage || '/why.jpg';

    return (
        <section className="relative bg-blue-600 overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            />

            {/* Main Content Container - 2 Column Layout */}
            <div className="relative z-10 min-h-screen lg:min-h-[600px] flex items-center">
                <div className="container mx-auto px-4 py-16 lg:py-20">
                    {/* Desktop: Grid Layout | Mobile: Stack */}
                    <div className="lg:grid lg:grid-cols-5 gap-8">

                        {/* Left Column - Empty space for brand ambassador (40%) */}
                        <div className="lg:col-span-2">
                            {/* Title Section - Positioned on left side */}
                            <div className="text-white mb-8 lg:mb-0">

                            </div>
                        </div>

                        {/* Right Column - Cards Container (60%) */}
                        <div className="lg:col-span-3 flex items-center">
                            <div className="w-full">
                                <h2 className="text-3xl lg:text-4xl xl:text-5xl text-white font-bold mb-3">
                                    {section.title || "Why INDPOWER?"}
                                </h2>
                                {section.subtitle && (
                                    <>
                                        <div className="w-16 h-1 bg-yellow-400 mb-4"></div>
                                        <p className="text-white/90 text-base lg:text-lg max-w-sm">
                                            {section.subtitle}
                                        </p>
                                    </>
                                )}
                                {/* Cards Grid - Horizontal on desktop, stack on mobile */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
                                    {features.map((feature, index) => (
                                        <div
                                            key={index}
                                            className="bg-yellow-400/90 backdrop-blur-sm rounded-lg p-4 text-black group hover:bg-yellow-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
                                        >
                                            {/* Compact Icon */}
                                            {hasCustomIcon(feature.title) ? (
                                                <img
                                                    src={getCustomIcon(feature.title)}
                                                    alt={feature.title}
                                                    className="w-10 h-10 object-contain mb-3 group-hover:scale-110 transition-transform duration-300"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                                                    <FontAwesomeIcon
                                                        icon={getIcon(feature.icon)}
                                                        className="text-white text-sm"
                                                    />
                                                </div>
                                            )}

                                            {/* Compact Title */}
                                            <h3 className="text-base font-bold mb-2 line-clamp-1">
                                                {feature.title}
                                            </h3>

                                            {/* Compact Description */}
                                            <p className="text-black/80 text-xs leading-relaxed mb-3 line-clamp-3">
                                                {feature.description}
                                            </p>

                                            {/* Compact CTA Button */}
                                            <button     onClick={() => navigate('/about')} className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-blue-700 transition-colors duration-300 inline-flex items-center group">
                                                <span>EXPLORE</span>
                                                <svg className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Subtle Decorative Elements - Adjusted positions */}
            <div className="absolute top-20 right-10 w-32 h-32 bg-yellow-400/5 rounded-full blur-2xl"></div>
            <div className="absolute bottom-20 right-1/3 w-40 h-40 bg-blue-400/5 rounded-full blur-2xl"></div>
        </section>
    );
};

export default WhyIndpowerSection;