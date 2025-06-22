// src/pages/admin/sections/SectionList.tsx
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/services/api';
import { Section } from '@/types';
import SectionTable from '@/components/admin/Sections/SectionTable';
import SectionForm from '@/components/admin/Sections/SectionForm';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import Modal from '@/components/shared/Modal';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import { PlusIcon, ArrowsUpDownIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const SectionList: React.FC = () => {
    const queryClient = useQueryClient();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editSection, setEditSection] = useState<string | null>(null);
    const [deleteSection, setDeleteSection] = useState<string | null>(null);
    const [isReordering, setIsReordering] = useState(false);

    const { data: sections, isLoading } = useQuery({
        queryKey: ['sections'],
        queryFn: async () => {
            const { data } = await apiClient.axios.get<Section[]>('/sections');
            return data;
        },
    });

    const toggleStatusMutation = useMutation({
        mutationFn: async (id: string) => {
            const { data } = await apiClient.axios.patch(`/sections/${id}/toggle-status`);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sections'] });
            toast.success('Section status updated');
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const { data } = await apiClient.axios.delete(`/sections/${id}`);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sections'] });
            toast.success('Section deleted successfully');
            setDeleteSection(null);
        },
    });

    const reorderMutation = useMutation({
        mutationFn: async (sections: Array<{ id: string; sortOrder: number }>) => {
            const { data } = await apiClient.axios.put('/sections/reorder', { sections });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sections'] });
            toast.success('Section order updated successfully');
            setIsReordering(false);
        },
    });

    const handleEdit = (id: string) => {
        setEditSection(id);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setEditSection(null);
    };

    const handleReorder = (updatedSections: Array<{ id: string; sortOrder: number }>) => {
        reorderMutation.mutate(updatedSections);
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex justify-between items-center">
                <p className="text-gray-600">
                    Manage homepage sections and their content
                </p>
                <div className="flex space-x-4">
                    <button
                        onClick={() => setIsReordering(!isReordering)}
                        className="btn btn-outline btn-md"
                    >
                        <ArrowsUpDownIcon className="h-5 w-5 mr-2" />
                        {isReordering ? 'Done Reordering' : 'Reorder Sections'}
                    </button>
                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="btn btn-primary btn-md"
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Add Section
                    </button>
                </div>
            </div>

            {/* Info Card */}
            <div className="card bg-blue-50 border-blue-200">
                <div className="card-body p-4">
                    <div className="flex items-start">
                        <Squares2X2Icon className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                        <div className="text-sm text-blue-800">
                            <p className="font-medium mb-1">About Sections</p>
                            <p>Sections are the building blocks of your homepage. You can add, edit, reorder, and toggle their visibility to customize your site's appearance.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sections Table */}
            <div className="card">
                {isLoading ? (
                    <div className="card-body">
                        <LoadingSpinner />
                    </div>
                ) : (
                    <SectionTable
                        sections={sections || []}
                        isReordering={isReordering}
                        onEdit={handleEdit}
                        onToggleStatus={(id) => toggleStatusMutation.mutate(id)}
                        onDelete={(id) => setDeleteSection(id)}
                        onReorder={handleReorder}
                    />
                )}
            </div>

            {/* Section Form Modal */}
            <Modal
                isOpen={isFormOpen}
                onClose={handleCloseForm}
                title={editSection ? 'Edit Section' : 'Add Section'}
                size="xl"
            >
                <SectionForm
                    sectionId={editSection}
                    onSuccess={handleCloseForm}
                    onCancel={handleCloseForm}
                />
            </Modal>

            {/* Delete Confirmation */}
            <ConfirmDialog
                isOpen={!!deleteSection}
                onClose={() => setDeleteSection(null)}
                onConfirm={() => deleteSection && deleteMutation.mutate(deleteSection)}
                title="Delete Section"
                message="Are you sure you want to delete this section? This action cannot be undone."
                type="danger"
                confirmText="Delete"
            />
        </div>
    );
};

export default SectionList;
