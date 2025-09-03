import React, { useState } from 'react';
import { Dealer } from '@/types';
import { formatDate, cn } from '@/utils';
import {
    PencilIcon,
    TrashIcon,
    MapPinIcon,
    PhoneIcon,
    BuildingStorefrontIcon,
    WrenchScrewdriverIcon,
    UserGroupIcon,
    EyeIcon,
    EyeSlashIcon,
    StarIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import EmptyState from '@/components/shared/EmptyState';

interface DealerTableProps {
    dealers: Dealer[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onToggleStatus: (id: string) => void;
    onView: (dealer: Dealer) => void;
    selectedIds: string[];
    onSelectOne: (id: string) => void;
    onSelectAll: () => void;
}

const DealerTable: React.FC<DealerTableProps> = ({
                                                     dealers,
                                                     onEdit,
                                                     onDelete,
                                                     onToggleStatus,
                                                     onView,
                                                     selectedIds,
                                                     onSelectOne,
                                                     onSelectAll,
                                                 }) => {
    const [expandedRows, setExpandedRows] = useState<string[]>([]);

    if (dealers.length === 0) {
        return (
            <EmptyState
                icon={MapPinIcon}
                title="No dealers found"
                message="Get started by adding your first dealer"
            />
        );
    }

    const toggleRowExpansion = (id: string) => {
        setExpandedRows(prev =>
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        );
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'distributor':
                return BuildingStorefrontIcon;
            case 'service_center':
                return WrenchScrewdriverIcon;
            default:
                return UserGroupIcon;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'distributor':
                return 'badge-primary';
            case 'service_center':
                return 'badge-warning';
            default:
                return 'badge-info';
        }
    };

    const formatType = (type: string): string => {
        return type.replace('_', ' ').charAt(0).toUpperCase() + type.slice(1).replace('_', ' ');
    };

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead className="table-header">
                <tr>
                    <th className="px-6 py-3">
                        <input
                            type="checkbox"
                            checked={selectedIds.length === dealers.length && dealers.length > 0}
                            onChange={onSelectAll}
                            className="rounded border-gray-300"
                        />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Dealer Info
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                    </th>
                    <th className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {dealers.map((dealer) => {
                    const TypeIcon = getTypeIcon(dealer.type);
                    const isExpanded = expandedRows.includes(dealer.id);

                    return (
                        <React.Fragment key={dealer.id}>
                            <tr className="table-row hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.includes(dealer.id)}
                                        onChange={() => onSelectOne(dealer.id)}
                                        className="rounded border-gray-300"
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">
                                            {dealer.name}
                                            {dealer.isFeatured && (
                                                <span className="ml-2 badge badge-warning badge-sm">
                                                        Featured
                                                    </span>
                                            )}
                                        </div>
                                        <div className="text-sm text-gray-500">{dealer.email}</div>
                                        {dealer.contactPerson && (
                                            <div className="text-xs text-gray-400">
                                                Contact: {dealer.contactPerson}
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <TypeIcon className="h-4 w-4 mr-2 text-gray-400" />
                                        <span className={cn('badge', getTypeColor(dealer.type))}>
                                                {formatType(dealer.type)}
                                            </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm">
                                        <div className="text-gray-900">{dealer.city}, {dealer.state}</div>
                                        <div className="text-gray-500">PIN: {dealer.pincode}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm">
                                        <div className="flex items-center text-gray-900">
                                            <PhoneIcon className="h-3 w-3 mr-1" />
                                            {dealer.phone}
                                        </div>
                                        {dealer.alternatePhone && (
                                            <div className="text-gray-500 text-xs">
                                                Alt: {dealer.alternatePhone}
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            i < Math.floor(dealer.rating) ? (
                                                <StarIconSolid key={i} className="h-4 w-4 text-yellow-400" />
                                            ) : (
                                                <StarIcon key={i} className="h-4 w-4 text-gray-300" />
                                            )
                                        ))}
                                        <span className="ml-1 text-sm text-gray-600">
                                                {dealer.rating.toFixed(1)}
                                            </span>
                                        {dealer.totalReviews > 0 && (
                                            <span className="ml-1 text-xs text-gray-500">
                                                    ({dealer.totalReviews})
                                                </span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        onClick={() => onToggleStatus(dealer.id)}
                                        className={cn(
                                            'badge cursor-pointer',
                                            dealer.isActive ? 'badge-success' : 'badge-danger'
                                        )}
                                    >
                                        {dealer.isActive ? (
                                            <>
                                                <EyeIcon className="h-3 w-3 mr-1" />
                                                Active
                                            </>
                                        ) : (
                                            <>
                                                <EyeSlashIcon className="h-3 w-3 mr-1" />
                                                Inactive
                                            </>
                                        )}
                                    </button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex items-center justify-end space-x-2">
                                        <button
                                            onClick={() => toggleRowExpansion(dealer.id)}
                                            className="text-gray-600 hover:text-gray-900"
                                            title={isExpanded ? "Collapse" : "Expand"}
                                        >
                                            <EyeIcon className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => onEdit(dealer.id)}
                                            className="text-primary-600 hover:text-primary-900"
                                            title="Edit"
                                        >
                                            <PencilIcon className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(dealer.id)}
                                            className="text-red-600 hover:text-red-900"
                                            title="Delete"
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            {isExpanded && (
                                <tr>
                                    <td colSpan={8} className="px-6 py-4 bg-gray-50">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <h4 className="font-semibold text-gray-700 mb-2">Address</h4>
                                                <p className="text-sm text-gray-600">{dealer.address}</p>
                                            </div>
                                            {dealer.services && dealer.services.length > 0 && (
                                                <div>
                                                    <h4 className="font-semibold text-gray-700 mb-2">Services</h4>
                                                    <div className="flex flex-wrap gap-1">
                                                        {dealer.services.map((service, idx) => (
                                                            <span key={idx} className="badge badge-sm badge-info">
                                                                    {service}
                                                                </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {dealer.brands && dealer.brands.length > 0 && (
                                                <div>
                                                    <h4 className="font-semibold text-gray-700 mb-2">Brands</h4>
                                                    <div className="flex flex-wrap gap-1">
                                                        {dealer.brands.map((brand, idx) => (
                                                            <span key={idx} className="badge badge-sm badge-success">
                                                                    {brand}
                                                                </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {dealer.website && (
                                                <div>
                                                    <h4 className="font-semibold text-gray-700 mb-2">Website</h4>
                                                    <a
                                                        href={dealer.website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-sm text-blue-600 hover:underline"
                                                    >
                                                        {dealer.website}
                                                    </a>
                                                </div>
                                            )}
                                            {dealer.territory && (
                                                <div>
                                                    <h4 className="font-semibold text-gray-700 mb-2">Territory</h4>
                                                    <p className="text-sm text-gray-600">{dealer.territory}</p>
                                                </div>
                                            )}
                                            <div>
                                                <h4 className="font-semibold text-gray-700 mb-2">Created</h4>
                                                <p className="text-sm text-gray-600">{formatDate(dealer.createdAt)}</p>
                                            </div>
                                        </div>
                                        {dealer.description && (
                                            <div className="mt-4">
                                                <h4 className="font-semibold text-gray-700 mb-2">Description</h4>
                                                <p className="text-sm text-gray-600">{dealer.description}</p>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default DealerTable;