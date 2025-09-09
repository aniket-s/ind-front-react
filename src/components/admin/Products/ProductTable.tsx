// src/components/admin/Products/ProductTable.tsx
import React from 'react';
import { Product } from '@/types';
import { getImageUrl, formatCurrency, formatDate } from '@/utils';
import { cn } from '@/utils';
import {
    PencilIcon,
    TrashIcon,
    EyeIcon,
    EyeSlashIcon,
    StarIcon,
} from '@heroicons/react/24/outline';
import EmptyState from '@/components/shared/EmptyState';
import { CubeIcon } from '@heroicons/react/24/outline';

interface ProductTableProps {
    products: Product[];
    onEdit: (id: string) => void;
    onToggleStatus: (id: string) => void;
    onDelete: (id: string) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
                                                       products,
                                                       onEdit,
                                                       onToggleStatus,
                                                       onDelete,
                                                   }) => {
    if (products.length === 0) {
        return (
            <div className="card-body">
                <EmptyState
                    icon={CubeIcon}
                    title="No products found"
                    message="Get started by creating your first product"
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
                        Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                    </th>
                    <th className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                    <tr key={product.id} className="table-row">
                        <td className="px-6 py-4">
                            <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                    <img
                                        className="h-10 w-10 rounded-lg object-cover"
                                        src={getImageUrl(product.images[0])}
                                        alt={product.name}
                                    />
                                </div>
                                <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">
                                        {product.name}
                                        {product.isFeatured && (
                                            <StarIcon className="inline-block ml-1 h-4 w-4 text-yellow-400" />
                                        )}
                                    </div>
                                    {product.model && (
                                        <div className="text-sm text-gray-500">{product.model}</div>
                                    )}
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.Category?.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {product.price ? (
                                <>
                                    <div className="text-sm text-gray-900">
                                        {formatCurrency(product.price)}
                                    </div>
                                    {product.discountPrice && (
                                        <div className="text-sm text-green-600">
                                            {formatCurrency(product.discountPrice)}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <span className="text-sm text-gray-500">-</span>
                            )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                <span
                    className={cn(
                        'badge',
                        product.isActive ? 'badge-success' : 'badge-danger'
                    )}
                >
                  {product.isActive ? 'Active' : 'Inactive'}
                </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(product.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-end space-x-2">
                                <button
                                    onClick={() => onToggleStatus(product.id)}
                                    className="text-gray-400 hover:text-gray-600"
                                    title={product.isActive ? 'Deactivate' : 'Activate'}
                                >
                                    {product.isActive ? (
                                        <EyeSlashIcon className="h-5 w-5" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5" />
                                    )}
                                </button>
                                <button
                                    onClick={() => onEdit(product.id)}
                                    className="text-primary-600 hover:text-primary-900"
                                    title="Edit"
                                >
                                    <PencilIcon className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => onDelete(product.id)}
                                    className="text-red-600 hover:text-red-900"
                                    title="Delete"
                                >
                                    <TrashIcon className="h-5 w-5" />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;