// src/components/public/ProductDetail/InverterModelsSection.tsx
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { getImageUrl, formatCurrency } from '@/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheck,
    faChevronLeft,
    faChevronRight
} from '@fortawesome/free-solid-svg-icons';

interface InverterModelsSectionProps {
    currentProduct: Product;
    relatedProducts: Product[];
}

export const InverterModelsSection: React.FC<InverterModelsSectionProps> = ({
                                                                                currentProduct,
                                                                                relatedProducts
                                                                            }) => {
    const [currentPage, setCurrentPage] = useState(0);

    // Combine current product with related products for display
    const allProducts = [currentProduct, ...relatedProducts].slice(0, 9);
    const totalPages = Math.ceil(allProducts.length / 3);

    // Get visible products based on screen size (this is simplified, in real app use responsive logic)
    const visibleProducts = allProducts.slice(0, 3);

    return (
        <section className="bg-gray-100 py-8 md:py-16">
            <div className="container mx-auto px-4">
                {/* Section Heading */}
                <h2 className="text-2xl md:text-4xl font-bold text-blue-600 text-center mb-4 md:mb-6">
                    {relatedProducts.length > 0 ? 'Related Models' : 'Our Inverter Models'}
                </h2>

                {/* Description */}
                <p className="text-gray-600 text-center mb-6 md:mb-8 max-w-3xl mx-auto text-sm md:text-base">
                    Discover our complete range of power solutions, engineered for reliable power backup.
                    Compare models to find the perfect fit for your needs.
                </p>


                {/* Product Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto mb-8">
                    {visibleProducts.map((model) => (
                        <div key={model.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                            {/* Highlight current product */}
                            {model.id === currentProduct.id && (
                                <div className="bg-gradient-to-r from-[#E6B944] to-[#C5A043] text-gray-800 text-center py-2 font-semibold text-sm">
                                    Currently Viewing
                                </div>
                            )}

                            <div className="bg-blue-600 p-6 md:p-8 relative">
                                <img
                                    src={getImageUrl(model.images[0])}
                                    alt={`${model.name} Inverter`}
                                    className="w-full h-40 md:h-48 object-contain"
                                />
                            </div>

                            <div className="p-4 md:p-6">
                                <h3 className="text-xl md:text-2xl font-bold text-blue-600 mb-2 md:mb-3">
                                    {model.name}
                                </h3>

                                {model.model && (
                                    <p className="text-gray-500 text-sm mb-2">Model: {model.model}</p>
                                )}

                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    {model.shortDescription || model.description || "High-quality inverter designed for reliable power backup."}
                                </p>

                                {/* Key Specs */}
                                <div className="space-y-2 text-sm mb-4 md:mb-6">
                                    {model.specifications && Object.entries(model.specifications).slice(0, 3).map(([key, value], specIndex) => (
                                        <div key={specIndex} className="flex items-center text-gray-700">
                                            <FontAwesomeIcon
                                                icon={faCheck}
                                                className="text-green-600 mr-2"
                                            />
                                            {key}: {String(value)}
                                        </div>
                                    ))}

                                    {model.warranty && (
                                        <div className="flex items-center text-gray-700">
                                            <FontAwesomeIcon
                                                icon={faCheck}
                                                className="text-green-600 mr-2"
                                            />
                                            Warranty: {model.warranty}
                                        </div>
                                    )}

                                    {model.price && (
                                        <div className="flex items-center text-gray-700 font-semibold">
                                            <FontAwesomeIcon
                                                icon={faCheck}
                                                className="text-green-600 mr-2"
                                            />
                                            Price: {formatCurrency(model.discountPrice || model.price)}
                                        </div>
                                    )}
                                </div>

                                {model.id === currentProduct.id ? (
                                    <button
                                        disabled
                                        className="w-full bg-gray-400 text-white py-3 rounded-full font-semibold cursor-not-allowed"
                                    >
                                        Currently Viewing
                                    </button>
                                ) : (
                                    <Link
                                        to={`/products/${model.slug}`}
                                        className="block w-full bg-gradient-to-r from-[#E6B944] to-[#C5A043] text-gray-800 py-3 rounded-full font-semibold hover:bg-yellow-300 transition text-center"
                                    >
                                        View Details
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Carousel Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4">
                        <button
                            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                            className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition"
                            disabled={currentPage === 0}
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>

                        <div className="flex gap-2">
                            {[...Array(totalPages)].map((_, index) => (
                                <span
                                    key={index}
                                    className={`w-2 h-2 rounded-full ${
                                        index === currentPage ? 'bg-blue-600' : 'bg-gray-300'
                                    }`}
                                ></span>
                            ))}
                        </div>

                        <button
                            onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                            className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition"
                            disabled={currentPage === totalPages - 1}
                        >
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                )}

            </div>
        </section>
    );
};