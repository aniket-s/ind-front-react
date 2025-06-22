// src/components/admin/Categories/CategoryTable.tsx
import React from 'react';
import { Category } from '@/types';
import { getImageUrl } from '@/utils';
import { cn } from '@/utils';
import {
    PencilIcon,
    TrashIcon,
    FolderIcon,
    ChevronRightIcon,
    ChevronDownIcon,
} from '@heroicons/react/24/outline';
import EmptyState from '@/components/shared/EmptyState';
import { TagIcon } from '@heroicons/react/24/outline';

interface CategoryTableProps {
    categories: Category[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const CategoryTable: React.FC<CategoryTableProps> = ({
                                                         categories,
                                                         onEdit,
                                                         onDelete,
                                                     }) => {
    const [expandedCategories, setExpandedCategories] = React.useState<Set<string>>(
        new Set()
    );

    const toggleExpand = (categoryId: string) => {
        const newExpanded = new Set(expandedCategories);
        if (newExpanded.has(categoryId)) {
            newExpanded.delete(categoryId);
        } else {
            newExpanded.add(categoryId);
        }
        setExpandedCategories(newExpanded);
    };

    const renderCategory = (category: Category, level: number = 0) => {
        const hasChildren = category.children && category.children.length > 0;
        const isExpanded = expandedCategories.has(category.id);

        return (
            <React.Fragment key={category.id}>
                <tr className="table-row">
                    <td className="px-6 py-4">
                        <div
                            className="flex items-center"
                            style={{ paddingLeft: `${level * 2}rem` }}
                        >
                            {hasChildren && (
                                <button
                                    onClick={() => toggleExpand(category.id)}
                                    className="mr-2 p-1 hover:bg-gray-100 rounded"
                                >
                                    {isExpanded ? (
                                        <ChevronDownIcon className="h-4 w-4" />
                                    ) : (
                                        <ChevronRightIcon className="h-4 w-4" />
                                    )}
                                </button>
                            )}
                            <div className="flex items-center">
                                {category.image ? (
                                    <img
                                        src={getImageUrl(category.image)}
                                        alt={category.name}
                                        className="h-10 w-10 rounded-lg object-cover mr-3"
                                    />
                                ) : (
                                    <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center mr-3">
                                        <FolderIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                )}
                                <div>
                                    <div className="text-sm font-medium text-gray-900">
                                        {category.name}
                                    </div>
                                    {category.description && (
                                        <div className="text-sm text-gray-500 max-w-xs truncate">
                                            {category.description}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {category.slug}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
            <span
                className={cn(
                    'badge',
                    category.isActive ? 'badge-success' : 'badge-danger'
                )}
            >
              {category.isActive ? 'Active' : 'Inactive'}
            </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {category.productCount || 0} products
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                            <button
                                onClick={() => onEdit(category.id)}
                                className="text-primary-600 hover:text-primary-900"
                                title="Edit"
                            >
                                <PencilIcon className="h-5 w-5" />
                            </button>
                            <button
                                onClick={() => onDelete(category.id)}
                                className="text-red-600 hover:text-red-900"
                                title="Delete"
                            >
                                <TrashIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </td>
                </tr>
                {hasChildren &&
                    isExpanded &&
                    category.children!.map((child) => renderCategory(child, level + 1))}
            </React.Fragment>
        );
    };

    if (categories.length === 0) {
        return (
            <div className="card-body">
                <EmptyState
                    icon={TagIcon}
                    title="No categories found"
                    message="Get started by creating your first category"
                />
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead className="table-header">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Slug
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Products
                    </th>
                    <th className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {categories.map((category) => renderCategory(category))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryTable;
