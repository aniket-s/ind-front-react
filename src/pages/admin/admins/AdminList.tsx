// src/pages/admin/admins/AdminList.tsx
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/services/api';
import { Admin } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import AdminTable from '@/components/admin/Admins/AdminTable';
import AdminForm from '@/components/admin/Admins/AdminForm';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import Modal from '@/components/shared/Modal';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import { PlusIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const AdminList: React.FC = () => {
    const queryClient = useQueryClient();
    const { user: currentUser } = useAuth();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editAdmin, setEditAdmin] = useState<string | null>(null);
    const [deleteAdmin, setDeleteAdmin] = useState<string | null>(null);

    const { data: admins, isLoading } = useQuery({
        queryKey: ['admins'],
        queryFn: async () => {
            const { data } = await apiClient.axios.get<Admin[]>('/admins');
            return data;
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const { data } = await apiClient.axios.delete(`/admins/${id}`);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admins'] });
            toast.success('Admin deleted successfully');
            setDeleteAdmin(null);
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to delete admin');
        },
    });

    const handleEdit = (id: string) => {
        setEditAdmin(id);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setEditAdmin(null);
    };

    const stats = {
        total: admins?.length || 0,
        superAdmins: admins?.filter(a => a.role === 'super_admin').length || 0,
        admins: admins?.filter(a => a.role === 'admin').length || 0,
        editors: admins?.filter(a => a.role === 'editor').length || 0,
        active: admins?.filter(a => a.isActive).length || 0,
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <p className="text-gray-600">
                    Manage admin users and their permissions
                </p>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="btn btn-primary btn-md"
                >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Add Admin
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="card">
                    <div className="card-body p-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <ShieldCheckIcon className="h-8 w-8 text-gray-400" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Total Admins</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body p-4">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Super Admins</p>
                            <p className="text-2xl font-semibold text-gray-900">{stats.superAdmins}</p>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body p-4">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Admins</p>
                            <p className="text-2xl font-semibold text-gray-900">{stats.admins}</p>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body p-4">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Editors</p>
                            <p className="text-2xl font-semibold text-gray-900">{stats.editors}</p>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body p-4">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Active</p>
                            <p className="text-2xl font-semibold text-gray-900">{stats.active}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Admins Table */}
            <div className="card">
                {isLoading ? (
                    <div className="card-body">
                        <LoadingSpinner />
                    </div>
                ) : (
                    <AdminTable
                        admins={admins || []}
                        currentUserId={currentUser?.id || ''}
                        onEdit={handleEdit}
                        onDelete={(id) => setDeleteAdmin(id)}
                    />
                )}
            </div>

            {/* Admin Form Modal */}
            <Modal
                isOpen={isFormOpen}
                onClose={handleCloseForm}
                title={editAdmin ? 'Edit Admin' : 'Add Admin'}
                size="lg"
            >
                <AdminForm
                    adminId={editAdmin}
                    onSuccess={handleCloseForm}
                    onCancel={handleCloseForm}
                />
            </Modal>

            {/* Delete Confirmation */}
            <ConfirmDialog
                isOpen={!!deleteAdmin}
                onClose={() => setDeleteAdmin(null)}
                onConfirm={() => deleteAdmin && deleteMutation.mutate(deleteAdmin)}
                title="Delete Admin"
                message="Are you sure you want to delete this admin? This action cannot be undone."
                type="danger"
                confirmText="Delete"
            />
        </div>
    );
};

export default AdminList;