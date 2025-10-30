// src/components/public/Products/ProductFilters.tsx
import React from 'react';
import { Category } from '@/types';
import { cn } from "@/utils";

interface ProductFiltersProps {
    categories: Category[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
                                                           categories,
                                                           selectedCategory,
                                                           onCategoryChange,
                                                       }) => {
    const renderCategory = (category: Category, level: number = 0) => (
        <React.Fragment key={category.id}>
            <button
                onClick={() => onCategoryChange(category.slug)}
                className={cn(
                    'w-full text-left cl-white px-3 py-2 text-sm rounded hover:bg-gray-50 transition-colors',
                    selectedCategory === category.slug
                        ? 'text-blue-600 font-medium bg-blue-50'
                        : 'text-gray-700'
                )}
                style={{ paddingLeft: `${(level + 1) * 0.75}rem` }}
            >
                {category.name}
            </button>
            {category.children?.map((child) => renderCategory(child, level + 1))}
        </React.Fragment>
    );

    return (
        <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Categories</h3>
            <div className="space-y-1">
                <button
                    onClick={() => onCategoryChange('')}
                    className={cn(
                        'w-full cl-white text-left px-3 py-2 text-sm rounded hover:bg-gray-50 transition-colors',
                        selectedCategory === ''
                            ? 'text-blue-600 font-medium bg-blue-50'
                            : 'text-gray-700'
                    )}
                >
                    All Categories
                </button>
                {categories.map((category) => renderCategory(category))}
            </div>
        </div>
    );
};

export default ProductFilters;