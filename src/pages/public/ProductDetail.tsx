// src/pages/public/ProductDetail.tsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { publicService } from '@/services/public.service';
import { formatCurrency } from '@/utils';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import ProductImageGallery from '@/components/public/Products/ProductImageGallery';
import ProductSpecifications from '@/components/public/Products/ProductSpecificationDisplay';
import RelatedProducts from '@/components/public/Products/RelatedProducts';
import {
    StarIcon,
    ShieldCheckIcon,
    TruckIcon,
    PhoneIcon,
    HomeIcon,
    ChevronRightIcon
} from '@heroicons/react/24/outline';

const ProductDetail: React.FC = () => {
    const { slug } = useParams();
    const [activeTab, setActiveTab] = useState('specifications');

    const { data, isLoading } = useQuery({
        queryKey: ['product', slug],
        queryFn: () => publicService.getProductBySlug(slug!),
    });

    if (isLoading) {
        return <LoadingSpinner fullScreen />;
    }

    if (!data) {
        return <div>Product not found</div>;
    }

    const { product, relatedProducts } = data;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Breadcrumb */}
            <div className="bg-white border-b">
                <div className="container py-4">
                    <nav className="flex" aria-label="Breadcrumb">
                        <ol className="flex items-center space-x-2">
                            <li>
                                <Link to="/" className="text-gray-500 hover:text-gray-700">
                                    <HomeIcon className="h-4 w-4" />
                                </Link>
                            </li>
                            <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                            <li>
                                <Link to="/products" className="text-gray-500 hover:text-gray-700 text-sm">
                                    Products
                                </Link>
                            </li>
                            <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                            <li>
                                <Link
                                    to={`/products?category=${product.Category?.slug}`}
                                    className="text-gray-500 hover:text-gray-700 text-sm"
                                >
                                    {product.Category?.name}
                                </Link>
                            </li>
                            <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                            <li>
                                <span className="text-gray-900 text-sm font-medium">{product.name}</span>
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>

            {/* Product Details */}
            <div className="container py-8">
                <div className="bg-white rounded-lg shadow-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
                        {/* Image Gallery */}
                        <ProductImageGallery images={product.images} alt={product.name} />

                        {/* Product Info */}
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                                {product.model && (
                                    <p className="text-lg text-gray-600 mt-1">Model: {product.model}</p>
                                )}
                            </div>

                            {/* Rating */}
                            {product.rating > 0 && (
                                <div className="flex items-center space-x-2">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <StarIcon
                                                key={i}
                                                className={cn(
                                                    'h-5 w-5',
                                                    i < Math.floor(product.rating)
                                                        ? 'text-yellow-400 fill-current'
                                                        : 'text-gray-300'
                                                )}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-gray-600">({product.rating})</span>
                                </div>
                            )}

                            {/* Price */}
                            {product.price && (
                                <div className="space-y-1">
                                    <div className="flex items-baseline space-x-2">
                                        {product.discountPrice ? (
                                            <>
                        <span className="text-3xl font-bold text-gray-900">
                          {formatCurrency(product.discountPrice)}
                        </span>
                                                <span className="text-xl text-gray-500 line-through">
                          {formatCurrency(product.price)}
                        </span>
                                            </>
                                        ) : (
                                            <span className="text-3xl font-bold text-gray-900">
                        {formatCurrency(product.price)}
                      </span>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Short Description */}
                            {product.shortDescription && (
                                <p className="text-gray-600">{product.shortDescription}</p>
                            )}

                            {/* Key Features */}
                            {product.features && product.features.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                                    <ul className="space-y-2">
                                        {product.features.slice(0, 5).map((feature, index) => (
                                            <li key={index} className="flex items-start">
                                                <span className="text-primary-600 mr-2">•</span>
                                                <span className="text-gray-600">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Warranty & Support */}
                            <div className="grid grid-cols-2 gap-4 py-4 border-t border-b">
                                {product.warranty && (
                                    <div className="flex items-center space-x-3">
                                        <ShieldCheckIcon className="h-8 w-8 text-primary-600" />
                                        <div>
                                            <p className="text-sm text-gray-500">Warranty</p>
                                            <p className="font-medium">{product.warranty}</p>
                                        </div>
                                    </div>
                                )}
                                <div className="flex items-center space-x-3">
                                    <TruckIcon className="h-8 w-8 text-primary-600" />
                                    <div>
                                        <p className="text-sm text-gray-500">Delivery</p>
                                        <p className="font-medium">All India</p>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="space-y-3">
                                <Link
                                    to="/dealer-locator"
                                    className="btn btn-primary btn-lg w-full justify-center"
                                >
                                    Find a Dealer
                                </Link>
                                <Link
                                    to="/contact"
                                    className="btn btn-outline btn-lg w-full justify-center"
                                >
                                    <PhoneIcon className="h-5 w-5 mr-2" />
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="border-t">
                        <div className="container">
                            <div className="flex space-x-8">
                                <button
                                    onClick={() => setActiveTab('specifications')}
                                    className={cn(
                                        'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                                        activeTab === 'specifications'
                                            ? 'border-primary-500 text-primary-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    )}
                                >
                                    Specifications
                                </button>
                                <button
                                    onClick={() => setActiveTab('description')}
                                    className={cn(
                                        'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                                        activeTab === 'description'
                                            ? 'border-primary-500 text-primary-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    )}
                                >
                                    Description
                                </button>
                                {product.technicalSpecs && Object.keys(product.technicalSpecs).length > 0 && (
                                    <button
                                        onClick={() => setActiveTab('technical')}
                                        className={cn(
                                            'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                                            activeTab === 'technical'
                                                ? 'border-primary-500 text-primary-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        )}
                                    >
                                        Technical Details
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {activeTab === 'specifications' && (
                            <ProductSpecifications specifications={product.specifications} />
                        )}
                        {activeTab === 'description' && (
                            <div className="prose max-w-none">
                                <p className="text-gray-600">{product.description || 'No description available.'}</p>
                            </div>
                        )}
                        {activeTab === 'technical' && (
                            <ProductSpecifications specifications={product.technicalSpecs} />
                        )}
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <RelatedProducts products={relatedProducts} />
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
