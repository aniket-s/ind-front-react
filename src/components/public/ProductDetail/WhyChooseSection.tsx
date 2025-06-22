// src/components/public/ProductDetail/WhyChooseSection.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faShieldAlt,
    faUsers,
    faStar,
    faLeaf
} from '@fortawesome/free-solid-svg-icons';

export const WhyChooseSection: React.FC = () => {
    const features = [
        {
            icon: faShieldAlt,
            title: "Certified Quality",
            description: "ISO certified manufacturing with rigorous quality control processes ensuring every unit meets international standards."
        },
        {
            icon: faUsers,
            title: "Expert Support",
            description: "24/7 customer support with trained technicians and comprehensive service network across India."
        },
        {
            icon: faStar,
            title: "Industry Leader",
            description: "Over 15 years of experience in power solutions with countless satisfied customers and proven track record."
        },
        {
            icon: faLeaf,
            title: "Eco-Friendly",
            description: "Energy-efficient design reduces carbon footprint while delivering maximum performance and reliability."
        }
    ];

    return (
        <section className="bg-blue-600 py-8 md:py-16">
            <div className="container mx-auto px-4">
                {/* Section Heading */}
                <h2 className="text-2xl md:text-4xl font-bold text-yellow-400 text-center mb-3 md:mb-4">
                    Why Choose INDPOWER Inverters?
                </h2>
                <p className="text-white text-center mb-8 md:mb-12 text-sm md:text-base">
                    Trusted by millions across India for reliable power backup solutions
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-blue-700/50 rounded-2xl p-4 md:p-6 text-center backdrop-blur hover:bg-blue-700/70 transition-all duration-300 group">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                                <FontAwesomeIcon
                                    icon={feature.icon}
                                    className="w-6 h-6 md:w-8 md:h-8 text-white text-2xl md:text-3xl"
                                />
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-yellow-400 mb-2 md:mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-white/90 text-xs md:text-sm">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Stats Section */}
                <div className="mt-12 md:mt-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                        <div className="text-center">
                            <h4 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">15+</h4>
                            <p className="text-white/80 text-sm">Years of Excellence</p>
                        </div>
                        <div className="text-center">
                            <h4 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">3000+</h4>
                            <p className="text-white/80 text-sm">Dealer Network</p>
                        </div>
                        <div className="text-center">
                            <h4 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">1M+</h4>
                            <p className="text-white/80 text-sm">Happy Customers</p>
                        </div>
                        <div className="text-center">
                            <h4 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">24/7</h4>
                            <p className="text-white/80 text-sm">Customer Support</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};