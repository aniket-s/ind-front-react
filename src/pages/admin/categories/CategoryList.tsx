// src/pages/admin/categories/CategoryList.tsx
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoriesService } from '@/services/categories.service';
import CategoryTable from '@/components/admin/Categories/CategoryTable';
import CategoryForm from '@/components/admin/Categories/CategoryForm';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import Modal from '@/components/shared/Modal';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import { PlusIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const CategoryList: React.FC = () => {
    const queryClient = useQueryClient();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editCategory, setEditCategory] = useState<string | null>(null);
    const [deleteCategory, setDeleteCategory] = useState<string | null>(null);

    const { data: categories, isLoading } = useQuery({
        queryKey: ['categories-tree'],
        queryFn: () => categoriesService.getCategoryTree(),
    });

    const deleteMutation = useMutation({
        mutationFn: categoriesService.deleteCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            queryClient.invalidateQueries({ queryKey: ['categories-tree'] });
            toast.success('Category deleted successfully');
            setDeleteCategory(null);
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to delete category');
        },
    });

    const handleEdit = (id: string) => {
        setEditCategory(id);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setEditCategory(null);
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex justify-between items-center">
                <p className="text-gray-600">
                    Organize your products into categories for better navigation
                </p>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="btn btn-primary btn-md"
                >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Add Category
                </button>
            </div>

            {/* Categories */}
            <div className="card">
                {isLoading ? (
                    <div className="card-body">
                        <LoadingSpinner />
                    </div>
                ) : (
                    <CategoryTable
                        categories={categories || []}
                        onEdit={handleEdit}
                        onDelete={(id) => setDeleteCategory(id)}
                    />
                )}
            </div>

            {/* Category Form Modal */}
            <Modal
                isOpen={isFormOpen}
                onClose={handleCloseForm}
                title={editCategory ? 'Edit Category' : 'Add Category'}
                size="lg"
            >
                <CategoryForm
                    categoryId={editCategory}
                    onSuccess={handleCloseForm}
                    onCancel={handleCloseForm}
                />
            </Modal>

            {/* Delete Confirmation */}
            <ConfirmDialog
                isOpen={!!deleteCategory}
                onClose={() => setDeleteCategory(null)}
                onConfirm={() => deleteCategory && deleteMutation.mutate(deleteCategory)}
                title="Delete Category"
                message="Are you sure you want to delete this category? This action cannot be undone."
                type="danger"
                confirmText="Delete"
            />
        </div>
    );
};

export default CategoryList;
