// src/components/public/Products/ProductFilters.tsx
import React from 'react';
import { Category } from '@/types';
import {cn} from "@/utils";

interface ProductFiltersProps {
    categories: Category[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    sortBy: string;
    sortOrder: string;
    onSortChange: (sortBy: string, sortOrder: string) => void;
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
                    'w-full text-left cl-white px-3 py-2 text-sm hover:bg-gray-50 transition-colors',
                    selectedCategory === category.slug
                        ? 'text-primary-600 font-medium bg-primary-50'
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
        <div className="space-y-6">
            {/* Sort */}

            {/* Categories */}
            <div className="bg-white rounded-lg shadow-sm">
                <div className="p-4 border-b">
                    <h3 className="text-sm font-medium text-gray-900">Categories</h3>
                </div>
                <div className="py-2">
                    <button
                        onClick={() => onCategoryChange('')}
                        className={cn(
                            'w-full cl-white text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors',
                            selectedCategory === ''
                                ? 'text-gray-900 font-medium bg-white'
                                : 'text-gray-700'
                        )}
                    >
                        All Categories
                    </button>
                    {categories.map((category) => renderCategory(category))}
                </div>
            </div>
        </div>
    );
};

export default ProductFilters;
