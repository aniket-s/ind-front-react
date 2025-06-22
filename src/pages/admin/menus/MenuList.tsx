// src/pages/admin/menus/MenuList.tsx
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/services/api';
import { Menu } from '@/types';
import MenuTree from '@/components/admin/Menus/MenuTree';
import MenuForm from '@/components/admin/Menus/MenuForm';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import Modal from '@/components/shared/Modal';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import { PlusIcon, ArrowsUpDownIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const MenuList: React.FC = () => {
    const queryClient = useQueryClient();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editMenu, setEditMenu] = useState<string | null>(null);
    const [deleteMenu, setDeleteMenu] = useState<string | null>(null);
    const [isReordering, setIsReordering] = useState(false);

    const { data: menus, isLoading } = useQuery({
        queryKey: ['menu-tree'],
        queryFn: async () => {
            const { data } = await apiClient.axios.get<Menu[]>('/menus/tree');
            return data;
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const { data } = await apiClient.axios.delete(`/menus/${id}`);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['menus'] });
            queryClient.invalidateQueries({ queryKey: ['menu-tree'] });
            toast.success('Menu deleted successfully');
            setDeleteMenu(null);
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to delete menu');
        },
    });

    const reorderMutation = useMutation({
        mutationFn: async (menus: Array<{ id: string; sortOrder: number; parentId?: string | null }>) => {
            const { data } = await apiClient.axios.put('/menus/reorder', { menus });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['menu-tree'] });
            toast.success('Menu order updated successfully');
            setIsReordering(false);
        },
    });

    const handleEdit = (id: string) => {
        setEditMenu(id);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setEditMenu(null);
    };

    const handleReorder = (updatedMenus: Array<{ id: string; sortOrder: number; parentId?: string | null }>) => {
        reorderMutation.mutate(updatedMenus);
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex justify-between items-center">
                <p className="text-gray-600">
                    Manage navigation menus for header and footer
                </p>
                <div className="flex space-x-4">
                    <button
                        onClick={() => setIsReordering(!isReordering)}
                        className="btn btn-outline btn-md"
                    >
                        <ArrowsUpDownIcon className="h-5 w-5 mr-2" />
                        {isReordering ? 'Done Reordering' : 'Reorder Menus'}
                    </button>
                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="btn btn-primary btn-md"
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Add Menu
                    </button>
                </div>
            </div>

            {/* Menu Trees */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Header Menus */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="text-lg font-medium">Header Navigation</h3>
                    </div>
                    {isLoading ? (
                        <div className="card-body">
                            <LoadingSpinner />
                        </div>
                    ) : (
                        <MenuTree
                            menus={menus?.filter(m => m.position === 'header' || m.position === 'both') || []}
                            onEdit={handleEdit}
                            onDelete={(id) => setDeleteMenu(id)}
                            isReordering={isReordering}
                            onReorder={handleReorder}
                        />
                    )}
                </div>

                {/* Footer Menus */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="text-lg font-medium">Footer Navigation</h3>
                    </div>
                    {isLoading ? (
                        <div className="card-body">
                            <LoadingSpinner />
                        </div>
                    ) : (
                        <MenuTree
                            menus={menus?.filter(m => m.position === 'footer' || m.position === 'both') || []}
                            onEdit={handleEdit}
                            onDelete={(id) => setDeleteMenu(id)}
                            isReordering={isReordering}
                            onReorder={handleReorder}
                        />
                    )}
                </div>
            </div>

            {/* Menu Form Modal */}
            <Modal
                isOpen={isFormOpen}
                onClose={handleCloseForm}
                title={editMenu ? 'Edit Menu' : 'Add Menu'}
                size="lg"
            >
                <MenuForm
                    menuId={editMenu}
                    onSuccess={handleCloseForm}
                    onCancel={handleCloseForm}
                />
            </Modal>

            {/* Delete Confirmation */}
            <ConfirmDialog
                isOpen={!!deleteMenu}
                onClose={() => setDeleteMenu(null)}
                onConfirm={() => deleteMenu && deleteMutation.mutate(deleteMenu)}
                title="Delete Menu"
                message="Are you sure you want to delete this menu item? This action cannot be undone."
                type="danger"
                confirmText="Delete"
            />
        </div>
    );
};

export default MenuList;
