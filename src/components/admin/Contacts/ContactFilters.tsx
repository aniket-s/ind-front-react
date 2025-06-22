// src/components/admin/Contacts/ContactFilters.tsx
import React from 'react';
import { FunnelIcon } from '@heroicons/react/24/outline';

interface ContactFiltersProps {
    status: string;
    onStatusChange: (status: string) => void;
}

const ContactFilters: React.FC<ContactFiltersProps> = ({
                                                           status,
                                                           onStatusChange,
                                                       }) => {
    return (
        <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
                <FunnelIcon className="h-5 w-5 text-gray-400" />
                <label className="text-sm font-medium text-gray-700">Status:</label>
                <select
                    value={status}
                    onChange={(e) => onStatusChange(e.target.value)}
                    className="input py-1 px-3 text-sm"
                >
                    <option value="">All</option>
                    <option value="new">New</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                </select>
            </div>
        </div>
    );
};

export default ContactFilters;