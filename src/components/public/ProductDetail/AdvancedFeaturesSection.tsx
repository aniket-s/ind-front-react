// src/components/public/ProductDetail/AdvancedFeaturesSection.tsx
import React from 'react';
import { Product } from '@/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChartBar,
    faMicrochip,
    faDesktop,
    faShieldAlt,
    faCommentDots,
    faBolt,
    faCheck
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface AdvancedFeaturesSectionProps {
    product: Product;
}

interface Feature {
    icon: IconDefinition;
    title: string;
    description: string;
}

export const AdvancedFeaturesSection: React.FC<AdvancedFeaturesSectionProps> = ({ product }) => {
    // Default features if product doesn't have specific features
    const defaultFeatures: Feature[] = [
        {
            icon: faChartBar,
            title: "Pure Sine Wave Output",
            description: "Clean and stable power output designed for sensitive electronics and appliances, ensuring optimal performance."
        },
        {
            icon: faMicrochip,
            title: "Microprocessor Control",
            description: "Advanced microprocessor technology ensures optimal performance, automatic voltage regulation, and intelligent battery management."
        },
        {
            icon: faDesktop,
            title: "LED Display",
            description: "Clear LED indicators show battery status, load condition, charging status, and fault conditions for easy monitoring."
        },
        {
            icon: faShieldAlt,
            title: "Multi-Protection System",
            description: "Built-in protection against overload, short circuit, deep discharge, and reverse polarity for maximum safety."
        },
        {
            icon: faCommentDots,
            title: "Battery Deep Discharge Protection",
            description: "Intelligent battery management prevents deep discharge, extending battery life and ensuring optimal performance."
        },
        {
            icon: faBolt,
            title: "Fast Charging Technology",
            description: "Quick charging capability ensures your batteries are ready when you need them most, with intelligent charge control."
        }
    ];

    // If product has features, use them to create the features array
    const features: Feature[] = product.features && product.features.length >= 6
        ? product.features.slice(0, 6).map((feature, index) => ({
            icon: defaultFeatures[index]?.icon || faCheck,
            title: feature.length > 50 ? feature.substring(0, 50) + "..." : feature,
            description: feature
        }))
        : defaultFeatures;

    return (
        <section className="bg-gray-50 py-8 md:py-16">
            <div className="container mx-auto px-4">
                {/* Section Heading */}
                <h2 className="text-2xl md:text-4xl font-bold text-blue-600 text-center mb-4 md:mb-6">
                    Advanced Features
                </h2>

                {/* Description */}
                <p className="text-gray-600 text-center mb-8 md:mb-12 max-w-3xl mx-auto text-sm md:text-base">
                    {`Our ${product.name} is packed with cutting-edge technology to ensure reliable, 
                    efficient power backup for your home and business needs.`}
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg p-4 md:p-6 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-yellow-400"></div>
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                                <FontAwesomeIcon
                                    icon={feature.icon}
                                    className="w-5 h-5 md:w-6 md:h-6 text-white"
                                />
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-blue-600 mb-2 md:mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 text-sm md:text-base">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Additional Features if product has more than 6 */}
                {product.features && product.features.length > 6 && (
                    <div className="mt-12 text-center">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">More Features</h3>
                        <div className="max-w-4xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {product.features.slice(6).map((feature, index) => (
                                    <div key={index} className="flex items-start bg-white rounded-lg p-4 shadow-sm">
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            className="text-green-600 mr-3 mt-1"
                                        />
                                        <p className="text-gray-700 text-sm">{feature}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};