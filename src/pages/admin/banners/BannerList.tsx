// src/pages/admin/banners/BannerList.tsx
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/services/api';
import { Banner } from '@/types';
import BannerTable from '@/components/admin/Banners/BannerTable';
import BannerForm from '@/components/admin/Banners/BannerForm';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import Modal from '@/components/shared/Modal';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import { PlusIcon, FunnelIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const BannerList: React.FC = () => {
    const queryClient = useQueryClient();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editBanner, setEditBanner] = useState<string | null>(null);
    const [deleteBanner, setDeleteBanner] = useState<string | null>(null);
    const [position, setPosition] = useState<string>('');
    const [isActive, setIsActive] = useState<string>('');

    const { data: banners, isLoading } = useQuery({
        queryKey: ['banners', { position, isActive }],
        queryFn: async () => {
            const { data } = await apiClient.axios.get<Banner[]>('/banners', {
                params: {
                    position: position || undefined,
                    isActive: isActive || undefined,
                },
            });
            return data;
        },
    });

    const toggleStatusMutation = useMutation({
        mutationFn: async (id: string) => {
            const { data } = await apiClient.axios.patch(`/banners/${id}/toggle-status`);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['banners'] });
            toast.success('Banner status updated');
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const { data } = await apiClient.axios.delete(`/banners/${id}`);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['banners'] });
            toast.success('Banner deleted successfully');
            setDeleteBanner(null);
        },
    });

    const handleEdit = (id: string) => {
        setEditBanner(id);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setEditBanner(null);
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex justify-between items-center">
                <p className="text-gray-600">
                    Manage homepage and page banners
                </p>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="btn btn-primary btn-md"
                >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Add Banner
                </button>
            </div>

            {/* Filters */}
            <div className="card">
                <div className="card-body">
                    <div className="flex items-center space-x-4">
                        <FunnelIcon className="h-5 w-5 text-gray-400" />

                        <select
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            className="input py-2 px-3"
                        >
                            <option value="">All Positions</option>
                            <option value="home">Home</option>
                            <option value="products">Products</option>
                            <option value="about">About</option>
                            <option value="contact">Contact</option>
                        </select>

                        <select
                            value={isActive}
                            onChange={(e) => setIsActive(e.target.value)}
                            className="input py-2 px-3"
                        >
                            <option value="">All Status</option>
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Banners Table */}
            <div className="card">
                {isLoading ? (
                    <div className="card-body">
                        <LoadingSpinner />
                    </div>
                ) : (
                    <BannerTable
                        banners={banners || []}
                        onEdit={handleEdit}
                        onToggleStatus={(id) => toggleStatusMutation.mutate(id)}
                        onDelete={(id) => setDeleteBanner(id)}
                    />
                )}
            </div>

            {/* Banner Form Modal */}
            <Modal
                isOpen={isFormOpen}
                onClose={handleCloseForm}
                title={editBanner ? 'Edit Banner' : 'Add Banner'}
                size="xl"
            >
                <BannerForm
                    bannerId={editBanner}
                    onSuccess={handleCloseForm}
                    onCancel={handleCloseForm}
                />
            </Modal>

            {/* Delete Confirmation */}
            <ConfirmDialog
                isOpen={!!deleteBanner}
                onClose={() => setDeleteBanner(null)}
                onConfirm={() => deleteBanner && deleteMutation.mutate(deleteBanner)}
                title="Delete Banner"
                message="Are you sure you want to delete this banner? This action cannot be undone."
                type="danger"
                confirmText="Delete"
            />
        </div>
    );
};

export default BannerList;
