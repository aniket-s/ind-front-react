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
        }
    ];

    // Additional feature examples for CMS flexibility
    const features = section.content?.features && section.content.features.length > 0
        ? section.content.features.map(feature => ({
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

    return (
        <section className="bg-gray-100 py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        {section.title || "Why INDPOWER?"}
                    </h2>
                    {section.subtitle && (
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            {section.subtitle}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-blue-600 rounded-2xl p-8 text-white group hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className={`w-16 h-16 ${feature.iconColor || 'bg-yellow-400'} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <FontAwesomeIcon
                                    icon={getIcon(feature.icon)}
                                    className="text-gray-800 text-2xl"
                                />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                            <p className="text-white/90 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>

                {/* Optional: Show more features in a different layout */}
                {features.length > 3 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-8">
                        {features.slice(3).map((feature, index) => (
                            <div
                                key={`extra-${index}`}
                                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <FontAwesomeIcon
                                            icon={getIcon(feature.icon)}
                                            className="text-white text-lg"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-800 mb-2">
                                            {feature.title}
                                        </h4>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default WhyIndpowerSection;