// src/components/public/Home/ProductsSection.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { publicService } from '@/services/public.service';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { getImageUrl, truncateText } from '@/utils';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

interface ProductsSectionProps {
    section: any;
}

const ProductsSection: React.FC<ProductsSectionProps> = ({ section }) => {
    const { data, isLoading } = useQuery({
        queryKey: ['featured-products'],
        queryFn: () => publicService.getProducts({ isFeatured: true, limit: 8 }),
    });

    if (isLoading) {
        return (
            <section className="py-16 bg-gray-50">
                <div className="container">
                    <LoadingSpinner />
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 bg-gray-50">
            <div className="container">
                <div className="text-center mb-12">
                    {section.title && (
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {section.title}
                        </h2>
                    )}
                    {section.subtitle && (
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            {section.subtitle}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {data?.products.map((product) => (
                        <Link
                            key={product.id}
                            to={`/products/${product.slug}`}
                            className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                        >
                            <div className="aspect-w-1 aspect-h-1 bg-gray-200">
                                <img
                                    src={getImageUrl(product.images[0])}
                                    alt={product.name}
                                    className="w-full h-full object-center object-cover group-hover:opacity-90 transition-opacity"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                                    {product.name}
                                </h3>
                                {product.model && (
                                    <p className="text-sm text-gray-500 mb-2">{product.model}</p>
                                )}
                                {product.shortDescription && (
                                    <p className="text-sm text-gray-600">
                                        {truncateText(product.shortDescription, 100)}
                                    </p>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        to="/products"
                        className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                    >
                        View All Products
                        <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ProductsSection;
