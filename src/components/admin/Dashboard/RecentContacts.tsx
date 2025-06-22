// src/components/admin/Dashboard/RecentContacts.tsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { apiClient } from '@/services/api';
import { ContactsResponse } from '@/types';
import { cn } from '@/utils';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

const RecentContacts: React.FC = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['recent-contacts'],
        queryFn: async () => {
            const { data } = await apiClient.axios.get<ContactsResponse>('/contacts', {
                params: { limit: 5, sortBy: 'createdAt', sortOrder: 'DESC' },
            });
            return data;
        },
    });

    const statusColors = {
        new: 'badge-info',
        in_progress: 'badge-warning',
        resolved: 'badge-success',
    };

    return (
        <div className="card">
            <div className="card-header flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Recent Contacts</h3>
                <Link to="/admin/contacts" className="text-sm text-primary-600 hover:text-primary-700">
                    View all
                </Link>
            </div>
            <div className="card-body">
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <div className="overflow-hidden">
                        <table className="table">
                            <thead className="table-header">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Subject
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="relative px-6 py-3">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {data?.contacts.map((contact) => (
                                <tr key={contact.id} className="table-row">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                                            <div className="text-sm text-gray-500">{contact.email}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900 max-w-xs truncate">
                                            {contact.subject || 'No subject'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={cn('badge', statusColors[contact.status])}>
                        {contact.status.replace('_', ' ')}
                      </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {format(new Date(contact.createdAt), 'MMM dd, yyyy')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link
                                            to={`/admin/contacts/${contact.id}`}
                                            className="text-primary-600 hover:text-primary-900"
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecentContacts;