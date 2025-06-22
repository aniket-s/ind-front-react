// src/components/admin/Banners/BannerTable.tsx
import React from 'react';
import { Banner } from '@/types';
import { getImageUrl, formatDate } from '@/utils';
import { cn } from '@/utils';
import {
    PencilIcon,
    TrashIcon,
    EyeIcon,
    EyeSlashIcon,
    CalendarIcon,
} from '@heroicons/react/24/outline';
import EmptyState from '@/components/shared/EmptyState';
import { PhotoIcon } from '@heroicons/react/24/outline';

interface BannerTableProps {
    banners: Banner[];
    onEdit: (id: string) => void;
    onToggleStatus: (id: string) => void;
    onDelete: (id: string) => void;
}

const BannerTable: React.FC<BannerTableProps> = ({
                                                     banners,
                                                     onEdit,
                                                     onToggleStatus,
                                                     onDelete,
                                                 }) => {
    if (banners.length === 0) {
        return (
            <div className="card-body">
                <EmptyState
                    icon={PhotoIcon}
                    title="No banners found"
                    message="Get started by creating your first banner"
                />
            </div>
        );
    }

    const positionColors = {
        home: 'badge-info',
        products: 'badge-warning',
        about: 'badge-success',
        contact: 'badge-danger',
    };

    const isExpired = (banner: Banner) => {
        if (!banner.endDate) return false;
        return new Date(banner.endDate) < new Date();
    };

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead className="table-header">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Banner
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Position
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Schedule
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order
                    </th>
                    <th className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {banners.map((banner) => (
                    <tr key={banner.id} className="table-row">
                        <td className="px-6 py-4">
                            <div className="flex items-center">
                                <div className="h-16 w-24 flex-shrink-0">
                                    <img
                                        className="h-16 w-24 rounded-lg object-cover"
                                        src={getImageUrl(banner.image)}
                                        alt={banner.title}
                                    />
                                </div>
                                <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">
                                        {banner.title}
                                    </div>
                                    {banner.subtitle && (
                                        <div className="text-sm text-gray-500">{banner.subtitle}</div>
                                    )}
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                <span className={cn('badge', positionColors[banner.position])}>
                  {banner.position}
                </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex items-center">
                                <CalendarIcon className="h-4 w-4 mr-1" />
                                {banner.startDate || banner.endDate ? (
                                    <div>
                                        {banner.startDate && formatDate(banner.startDate)}
                                        {banner.startDate && banner.endDate && ' - '}
                                        {banner.endDate && formatDate(banner.endDate)}
                                    </div>
                                ) : (
                                    'Always'
                                )}
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                <span
                    className={cn(
                        'badge',
                        isExpired(banner)
                            ? 'badge-warning'
                            : banner.isActive
                                ? 'badge-success'
                                : 'badge-danger'
                    )}
                >
                  {isExpired(banner) ? 'Expired' : banner.isActive ? 'Active' : 'Inactive'}
                </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {banner.sortOrder}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-end space-x-2">
                                <button
                                    onClick={() => onToggleStatus(banner.id)}
                                    className="text-gray-400 hover:text-gray-600"
                                    title={banner.isActive ? 'Deactivate' : 'Activate'}
                                >
                                    {banner.isActive ? (
                                        <EyeSlashIcon className="h-5 w-5" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5" />
                                    )}
                                </button>
                                <button
                                    onClick={() => onEdit(banner.id)}
                                    className="text-primary-600 hover:text-primary-900"
                                    title="Edit"
                                >
                                    <PencilIcon className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => onDelete(banner.id)}
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

export default BannerTable;
