// src/components/public/Products/ProductGrid.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { getImageUrl, formatCurrency, truncateText } from '@/utils';
import EmptyState from '@/components/shared/EmptyState';
import { CubeIcon } from '@heroicons/react/24/outline';

interface ProductGridProps {
    products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
    if (products.length === 0) {
        return (
            <EmptyState
                icon={CubeIcon}
                title="No products found"
                message="Try adjusting your filters or search terms"
            />
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
                <Link
                    key={product.id}
                    to={`/products/${product.slug}`}
                    className="group bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden"
                >
                    <div className="aspect-w-4 aspect-h-3 bg-gray-200">
                        <img
                            src={getImageUrl(product.images[0])}
                            alt={product.name}
                            className="w-full h-full object-center object-cover group-hover:opacity-90 transition-opacity"
                        />
                    </div>
                    <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-1">
                            {product.name}
                        </h3>
                        {product.model && (
                            <p className="text-sm text-gray-500 mb-2">Model: {product.model}</p>
                        )}
                        {product.shortDescription && (
                            <p className="text-sm text-gray-600 mb-3">
                                {truncateText(product.shortDescription, 100)}
                            </p>
                        )}
                        <div className="space-y-2">
                            {product.price ? (
                                <p className="text-lg font-bold text-gray-900">
                                    {product.discountPrice ? (
                                        <>
                                            <span>{formatCurrency(product.discountPrice)}</span>
                                            <span className="text-sm text-gray-500 line-through ml-2">
                                                {formatCurrency(product.price)}
                                            </span>
                                        </>
                                    ) : (
                                        formatCurrency(product.price)
                                    )}
                                </p>
                            ) : null}
                            {product.warranty && (
                                <p className="text-sm text-gray-500">
                                    <span className="font-medium">Warranty:</span> {product.warranty}
                                </p>
                            )}
                            {product.specifications && Object.keys(product.specifications).length > 0 && (
                                <div className="border-t pt-2 mt-2">
                                    <div className="space-y-1">
                                        {Object.entries(product.specifications).slice(0, 3).map(([key, value]) => (
                                            <p key={key} className="text-xs text-gray-600">
                                                <span className="font-medium">{key}:</span> {value}
                                            </p>
                                        ))}
                                        {Object.keys(product.specifications).length > 3 && (
                                            <p className="text-xs text-primary-600 font-medium">
                                                +{Object.keys(product.specifications).length - 3} more
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default ProductGrid;