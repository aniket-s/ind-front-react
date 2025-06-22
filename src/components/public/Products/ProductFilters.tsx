// src/components/public/Products/ProductFilters.tsx
import React from 'react';
import { Category } from '@/types';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

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
                                                           sortBy,
                                                           sortOrder,
                                                           onSortChange,
                                                       }) => {
    const sortOptions = [
        { value: 'sortOrder:ASC', label: 'Default' },
        { value: 'name:ASC', label: 'Name (A-Z)' },
        { value: 'name:DESC', label: 'Name (Z-A)' },
        { value: 'price:ASC', label: 'Price (Low to High)' },
        { value: 'price:DESC', label: 'Price (High to Low)' },
        { value: 'createdAt:DESC', label: 'Newest First' },
        { value: 'createdAt:ASC', label: 'Oldest First' },
    ];

    const handleSortChange = (value: string) => {
        const [field, order] = value.split(':');
        onSortChange(field, order);
    };

    const renderCategory = (category: Category, level: number = 0) => (
        <React.Fragment key={category.id}>
            <button
                onClick={() => onCategoryChange(category.slug)}
                className={cn(
                    'w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors',
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
            <div className="bg-white rounded-lg shadow-sm p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort By
                </label>
                <select
                    value={`${sortBy}:${sortOrder}`}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="input"
                >
                    {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-lg shadow-sm">
                <div className="p-4 border-b">
                    <h3 className="text-sm font-medium text-gray-900">Categories</h3>
                </div>
                <div className="py-2">
                    <button
                        onClick={() => onCategoryChange('')}
                        className={cn(
                            'w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors',
                            selectedCategory === ''
                                ? 'text-primary-600 font-medium bg-primary-50'
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
