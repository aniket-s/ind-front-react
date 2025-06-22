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
                        <div className="flex items-center justify-between">
                            {product.price && (
                                <p className="text-lg font-bold text-gray-900">
                                    {formatCurrency(product.price)}
                                </p>
                            )}
                            {product.warranty && (
                                <p className="text-sm text-gray-500">
                                    {product.warranty} Warranty
                                </p>
                            )}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default ProductGrid;