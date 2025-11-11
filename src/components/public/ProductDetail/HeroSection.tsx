// src/components/public/ProductDetail/HeroSection.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { getImageUrl, formatCurrency } from '@/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBolt,
    faDesktop,
    faShieldAlt
} from '@fortawesome/free-solid-svg-icons';

interface HeroSectionProps {
    product: Product;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ product }) => {
    const features = product.features?.slice(0, 3).map((feature, index) => ({
        icon: index === 0 ? faBolt : index === 1 ? faDesktop : faShieldAlt,
        title: feature
    })) || [
        { icon: faBolt, title: "High Performance" },
        { icon: faDesktop, title: "Smart Technology" },
        { icon: faShieldAlt, title: `${product.warranty || '24 Months'} Warranty` },
    ];

    return (
        <section className="bg-blue-600 py-8 md:py-16 relative overflow-hidden">
            {/* Background Pattern - with pointer-events-none and negative z-index */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-700 to-transparent opacity-20 pointer-events-none -z-10"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                    {/* Left Content */}
                    <div className="lg:w-1/2 text-white text-center lg:text-left">
                        {/* Category Badge */}
                        {product.Category && (
                            <span
                                className="inline-block bg-gradient-to-r from-[#e1a038] via-[#efdd71] via-[#f7f0aa] via-[#ebda73] to-[#f7d89f] text-gray-800 px-4 py-1 rounded-full text-sm font-semibold mb-4 shadow-md">
        {product.Category.name}
    </span>
                        )}


                        {/* Main Heading */}
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                            {product.name}
                        </h1>

                        {/* Model Number */}
                        {product.model && (
                            <p className="text-[#E6B944] text-lg font-semibold mb-4">
                                Model: {product.model}
                            </p>
                        )}


                        {/* Description */}
                        <p className="text-white/90 text-base md:text-lg mb-6 md:mb-8 max-w-xl mx-auto lg:mx-0">
                            {product.shortDescription || product.description ||
                                "Experience reliable power backup with our advanced technology. Cost-effective and efficient power solutions trusted by millions across India."}
                        </p>

                        {/* Features */}
                        <div className="flex flex-wrap gap-4 md:gap-6 mb-6 md:mb-8 justify-center lg:justify-start">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-2 md:gap-3">
                                    <div
                                        className="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-full flex items-center justify-center">
                                        <FontAwesomeIcon
                                            icon={feature.icon}
                                            className="w-4 h-4 md:w-5 md:h-5 text-white"
                                        />
                                    </div>
                                    <span className="text-xs md:text-sm">
                                        {feature.title}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Price Display - Only show if price exists */}
                        {product.price && (
                            <div className="mb-6">
                                <div className="flex items-baseline gap-3 justify-center lg:justify-start">
                                    {product.discountPrice ? (
                                        <>
                    <span className="text-3xl md:text-4xl font-bold text-[#E6B944]">
                        {formatCurrency(product.discountPrice)}
                    </span>
                                            <span className="text-xl text-white/60 line-through">
                        {formatCurrency(product.price)}
                    </span>
                                        </>
                                    ) : (
                                        <span className="text-3xl md:text-4xl font-bold text-[#E6B944]">
                    {formatCurrency(product.price)}
                </span>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* CTA Buttons - with explicit z-index */}
                        <div
                            className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start relative z-20">
                            <Link
                                to="/dealer-locator"
                                className="bg-gradient-to-r from-[#e1a038] via-[#efdd71] via-[#f7f0aa] via-[#ebda73] to-[#f7d89f] text-gray-800 px-6 py-3 rounded-full font-semibold hover:from-[#C5A043] hover:to-[#8B6F2F] transition-all duration-300 transform hover:scale-105 w-full sm:w-auto text-center cursor-pointer shadow-lg"
                            >
                                Find Dealer
                            </Link>
                            <Link
                                to="/contact"
                                className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition transform hover:scale-105 w-full sm:w-auto text-center cursor-pointer"
                            >
                                Get Quote
                            </Link>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="lg:w-1/2 flex justify-center lg:justify-end mt-8 lg:mt-0">
                        <div className="relative w-full max-w-md">
                            <div
                                className="relative w-full h-80 sm:h-56 md:h-80 rounded-2xl flex items-center justify-center overflow-hidden">
                                <img
                                    src={getImageUrl(product.images[0])}
                                    alt={product.name}
                                    className="rounded-2xl w-full h-full object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};