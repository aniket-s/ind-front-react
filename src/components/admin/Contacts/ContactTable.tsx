// src/components/admin/Contacts/ContactTable.tsx
import React from 'react';
import { Contact } from '@/types';
import { formatDate } from '@/utils';
import { cn } from '@/utils';
import {
    EyeIcon,
    TrashIcon,
    CheckIcon,
    ClockIcon,
} from '@heroicons/react/24/outline';
import EmptyState from '@/components/shared/EmptyState';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

interface ContactTableProps {
    contacts: Contact[];
    onView: (id: string) => void;
    onUpdateStatus: (id: string, status: string) => void;
    onDelete: (id: string) => void;
}

const ContactTable: React.FC<ContactTableProps> = ({
                                                       contacts,
                                                       onView,
                                                       onUpdateStatus,
                                                       onDelete,
                                                   }) => {
    if (contacts.length === 0) {
        return (
            <div className="card-body">
                <EmptyState
                    icon={EnvelopeIcon}
                    title="No contacts found"
                    message="No contact submissions yet"
                />
            </div>
        );
    }

    const statusColors = {
        new: 'badge-info',
        in_progress: 'badge-warning',
        resolved: 'badge-success',
    };

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead className="table-header">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
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
                {contacts.map((contact) => (
                    <tr key={contact.id} className="table-row">
                        <td className="px-6 py-4">
                            <div>
                                <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                                <div className="text-sm text-gray-500">{contact.email}</div>
                                {contact.phone && (
                                    <div className="text-sm text-gray-500">{contact.phone}</div>
                                )}
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 max-w-xs truncate">
                                {contact.subject || 'No subject'}
                            </div>
                            <div className="text-sm text-gray-500 max-w-xs truncate">
                                {contact.message}
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                <span className={cn('badge', statusColors[contact.status])}>
                  {contact.status.replace('_', ' ')}
                </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(contact.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-end space-x-2">
                                <button
                                    onClick={() => onView(contact.id)}
                                    className="text-primary-600 hover:text-primary-900"
                                    title="View"
                                >
                                    <EyeIcon className="h-5 w-5" />
                                </button>
                                {contact.status === 'new' && (
                                    <button
                                        onClick={() => onUpdateStatus(contact.id, 'in_progress')}
                                        className="text-yellow-600 hover:text-yellow-900"
                                        title="Mark as In Progress"
                                    >
                                        <ClockIcon className="h-5 w-5" />
                                    </button>
                                )}
                                {contact.status !== 'resolved' && (
                                    <button
                                        onClick={() => onUpdateStatus(contact.id, 'resolved')}
                                        className="text-green-600 hover:text-green-900"
                                        title="Mark as Resolved"
                                    >
                                        <CheckIcon className="h-5 w-5" />
                                    </button>
                                )}
                                <button
                                    onClick={() => onDelete(contact.id)}
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

export default ContactTable;
