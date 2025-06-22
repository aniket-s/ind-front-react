// src/components/admin/Sections/SectionTable.tsx
import React from 'react';
import { Section } from '@/types';
import { cn } from '@/utils';
import {
    PencilIcon,
    TrashIcon,
    EyeIcon,
    EyeSlashIcon,
    Bars3Icon,
} from '@heroicons/react/24/outline';
import EmptyState from '@/components/shared/EmptyState';
import { Squares2X2Icon } from '@heroicons/react/24/outline';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface SectionTableProps {
    sections: Section[];
    isReordering: boolean;
    onEdit: (id: string) => void;
    onToggleStatus: (id: string) => void;
    onDelete: (id: string) => void;
    onReorder: (sections: Array<{ id: string; sortOrder: number }>) => void;
}

const SectionTable: React.FC<SectionTableProps> = ({
                                                       sections,
                                                       isReordering,
                                                       onEdit,
                                                       onToggleStatus,
                                                       onDelete,
                                                       onReorder,
                                                   }) => {
    if (sections.length === 0) {
        return (
            <div className="card-body">
                <EmptyState
                    icon={Squares2X2Icon}
                    title="No sections found"
                    message="Get started by creating your first section"
                />
            </div>
        );
    }

    const handleDragEnd = (result: any) => {
        if (!result.destination) return;

        const items = Array.from(sections);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        const updatedSections = items.map((item, index) => ({
            id: item.id,
            sortOrder: index,
        }));

        onReorder(updatedSections);
    };

    const sectionTypeLabels = {
        banner: 'Hero Banner',
        products: 'Featured Products',
        whyIndpower: 'Why IndPower',
        about: 'About Section',
        viewDetails: 'View Details',
        dealerLocator: 'Dealer Locator',
        joinDealer: 'Join as Dealer',
        connect: 'Connect With Us',
        faq: 'FAQs',
        stillHaveQuestions: 'Still Have Questions',
        custom: 'Custom Section',
    };

    const sectionTypeColors = {
        banner: 'badge-info',
        products: 'badge-success',
        whyIndpower: 'badge-warning',
        about: 'badge-info',
        viewDetails: 'badge-danger',
        dealerLocator: 'badge-warning',
        joinDealer: 'badge-success',
        connect: 'badge-info',
        faq: 'badge-warning',
        stillHaveQuestions: 'badge-danger',
        custom: 'badge-info',
    };

    if (isReordering) {
        return (
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="sections">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="p-4 space-y-2">
                            {sections.map((section, index) => (
                                <Draggable key={section.id} draggableId={section.id} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className={cn(
                                                'bg-white border rounded-lg p-4 flex items-center space-x-4',
                                                snapshot.isDragging && 'shadow-lg'
                                            )}
                                        >
                                            <Bars3Icon className="h-5 w-5 text-gray-400" />
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-3">
                          <span className={cn('badge', sectionTypeColors[section.type])}>
                            {sectionTypeLabels[section.type]}
                          </span>
                                                    {section.title && (
                                                        <span className="text-sm font-medium text-gray-900">
                              {section.title}
                            </span>
                                                    )}
                                                </div>
                                            </div>
                                            <span className="text-sm text-gray-500">Order: {section.sortOrder}</span>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead className="table-header">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Section
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
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
                {sections.map((section) => (
                    <tr key={section.id} className="table-row">
                        <td className="px-6 py-4">
                            <div>
                                <div className="text-sm font-medium text-gray-900">
                                    {section.title || sectionTypeLabels[section.type]}
                                </div>
                                {section.subtitle && (
                                    <div className="text-sm text-gray-500">{section.subtitle}</div>
                                )}
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                <span className={cn('badge', sectionTypeColors[section.type])}>
                  {sectionTypeLabels[section.type]}
                </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                <span
                    className={cn(
                        'badge',
                        section.isActive ? 'badge-success' : 'badge-danger'
                    )}
                >
                  {section.isActive ? 'Active' : 'Inactive'}
                </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {section.sortOrder}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-end space-x-2">
                                <button
                                    onClick={() => onToggleStatus(section.id)}
                                    className="text-gray-400 hover:text-gray-600"
                                    title={section.isActive ? 'Deactivate' : 'Activate'}
                                >
                                    {section.isActive ? (
                                        <EyeSlashIcon className="h-5 w-5" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5" />
                                    )}
                                </button>
                                <button
                                    onClick={() => onEdit(section.id)}
                                    className="text-primary-600 hover:text-primary-900"
                                    title="Edit"
                                >
                                    <PencilIcon className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => onDelete(section.id)}
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

export default SectionTable;
