// src/components/admin/FAQs/FAQTable.tsx
import React from 'react';
import { FAQ } from '@/types';
import { cn } from '@/utils';
import {
    PencilIcon,
    TrashIcon,
    EyeIcon,
    HandThumbUpIcon,
    HandThumbDownIcon,
} from '@heroicons/react/24/outline';
import EmptyState from '@/components/shared/EmptyState';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

interface FAQTableProps {
    faqs: FAQ[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const FAQTable: React.FC<FAQTableProps> = ({
                                               faqs,
                                               onEdit,
                                               onDelete,
                                           }) => {
    if (faqs.length === 0) {
        return (
            <div className="card-body">
                <EmptyState
                    icon={QuestionMarkCircleIcon}
                    title="No FAQs found"
                    message="Get started by creating your first FAQ"
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
                        Question
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stats
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
                {faqs.map((faq) => (
                    <tr key={faq.id} className="table-row">
                        <td className="px-6 py-4">
                            <div className="max-w-xs">
                                <div className="text-sm font-medium text-gray-900 truncate">
                                    {faq.question}
                                </div>
                                <div className="text-sm text-gray-500 truncate">
                                    {faq.answer}
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <span className="badge badge-info">{faq.category}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                <span
                    className={cn(
                        'badge',
                        faq.isActive ? 'badge-success' : 'badge-danger'
                    )}
                >
                  {faq.isActive ? 'Active' : 'Inactive'}
                </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center">
                                    <EyeIcon className="h-4 w-4 mr-1" />
                                    {faq.views}
                                </div>
                                <div className="flex items-center text-green-600">
                                    <HandThumbUpIcon className="h-4 w-4 mr-1" />
                                    {faq.helpful}
                                </div>
                                <div className="flex items-center text-red-600">
                                    <HandThumbDownIcon className="h-4 w-4 mr-1" />
                                    {faq.notHelpful}
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {faq.sortOrder}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-end space-x-2">
                                <button
                                    onClick={() => onEdit(faq.id)}
                                    className="text-primary-600 hover:text-primary-900"
                                    title="Edit"
                                >
                                    <PencilIcon className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => onDelete(faq.id)}
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

export default FAQTable;
