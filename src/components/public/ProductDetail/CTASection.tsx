// src/components/public/ProductDetail/CTASection.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faShieldAlt,
    faHeadset,
    faDownload
} from '@fortawesome/free-solid-svg-icons';

interface CTASectionProps {
    product: Product;
}

export const CTASection: React.FC<CTASectionProps> = ({ product }) => {
    return (
        <section className="bg-yellow-400 py-8 md:py-16">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-2xl md:text-4xl font-bold text-blue-600 mb-4 md:mb-6">
                    Ready to Power Your Space with {product.name}?
                </h2>
                <p className="text-gray-700 text-base md:text-lg mb-6 md:mb-8 max-w-3xl mx-auto">
                    Get expert advice on whether the {product.name} is the perfect inverter for your needs.
                    Our team of specialists is ready to help you make the right choice.
                </p>

                {/* Features Summary */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    {product.warranty && (
                        <div className="bg-white/80 px-4 py-2 rounded-full">
                            <FontAwesomeIcon icon={faShieldAlt} className="text-blue-600 mr-2" />
                            <span className="font-semibold">{product.warranty} Warranty</span>
                        </div>
                    )}

                    <div className="bg-white/80 px-4 py-2 rounded-full">
                        <FontAwesomeIcon icon={faHeadset} className="text-blue-600 mr-2" />
                        <span className="font-semibold">24/7 Support</span>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/dealer-locator"
                        className="bg-blue-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold text-base md:text-lg hover:bg-blue-700 transition transform hover:scale-105"
                    >
                        Find Nearest Dealer
                    </Link>
                    <Link
                        to="/contact"
                        className="bg-blue-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold text-base md:text-lg hover:bg-blue-700 transition transform hover:scale-105"
                    >
                        Contact Us
                    </Link>

                </div>

                {/* Download Brochure */}
                <div className="mt-8">
                    <p className="text-gray-700 mb-4">Want to know more about technical specifications?</p>
                    <a
                        href='/Indpower-Sales-Docket.pdf' target="_blank"
                        className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700"
                    >
                        <FontAwesomeIcon icon={faDownload} className="mr-2" />
                        Download Product Brochure
                    </a>
                </div>
            </div>
        </section>
    );
};