// src/components/admin/Admins/AdminTable.tsx
import React from 'react';
import { Admin } from '@/types';
import { formatDate } from '@/utils';
import { cn } from '@/utils';
import {
    PencilIcon,
    TrashIcon,
    ShieldCheckIcon,
    UserCircleIcon,
    ClockIcon,
} from '@heroicons/react/24/outline';
import EmptyState from '@/components/shared/EmptyState';
import { UserGroupIcon } from '@heroicons/react/24/outline';

interface AdminTableProps {
    admins: Admin[];
    currentUserId: string;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const AdminTable: React.FC<AdminTableProps> = ({
                                                   admins,
                                                   currentUserId,
                                                   onEdit,
                                                   onDelete,
                                               }) => {
    if (admins.length === 0) {
        return (
            <div className="card-body">
                <EmptyState
                    icon={UserGroupIcon}
                    title="No admins found"
                    message="Get started by adding your first admin"
                />
            </div>
        );
    }

    const roleColors = {
        super_admin: 'badge-danger',
        admin: 'badge-warning',
        editor: 'badge-info',
    };

    const roleIcons = {
        super_admin: ShieldCheckIcon,
        admin: UserCircleIcon,
        editor: UserCircleIcon,
    };

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead className="table-header">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Admin
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Login
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
                {admins.map((admin) => {
                    const RoleIcon = roleIcons[admin.role];
                    const isCurrentUser = admin.id === currentUserId;

                    return (
                        <tr key={admin.id} className="table-row">
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    <div className="h-10 w-10 flex-shrink-0">
                                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                            <UserCircleIcon className="h-6 w-6 text-gray-500" />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">
                                            {admin.name}
                                            {isCurrentUser && (
                                                <span className="ml-2 text-xs text-gray-500">(You)</span>
                                            )}
                                        </div>
                                        <div className="text-sm text-gray-500">{admin.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <RoleIcon className="h-4 w-4 mr-2 text-gray-400" />
                                    <span className={cn('badge', roleColors[admin.role])}>
                      {admin.role.replace('_', ' ')}
                    </span>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                  <span
                      className={cn(
                          'badge',
                          admin.isActive ? 'badge-success' : 'badge-danger'
                      )}
                  >
                    {admin.isActive ? 'Active' : 'Inactive'}
                  </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {admin.lastLogin ? (
                                    <div className="flex items-center">
                                        <ClockIcon className="h-4 w-4 mr-1" />
                                        {formatDate(admin.lastLogin)}
                                    </div>
                                ) : (
                                    'Never'
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {formatDate(admin.createdAt)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex items-center justify-end space-x-2">
                                    <button
                                        onClick={() => onEdit(admin.id)}
                                        className="text-primary-600 hover:text-primary-900"
                                        title="Edit"
                                    >
                                        <PencilIcon className="h-5 w-5" />
                                    </button>
                                    {!isCurrentUser && (
                                        <button
                                            onClick={() => onDelete(admin.id)}
                                            className="text-red-600 hover:text-red-900"
                                            title="Delete"
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default AdminTable;
