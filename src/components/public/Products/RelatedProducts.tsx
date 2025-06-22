// src/components/public/Products/RelatedProducts.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { getImageUrl, truncateText } from '@/utils';

interface RelatedProductsProps {
    products: Product[];
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products }) => {
    return (
        <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
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
                                    {truncateText(product.shortDescription, 80)}
                                </p>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;
