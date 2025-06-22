// src/pages/admin/faqs/FAQList.tsx
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/services/api';
import { FAQ } from '@/types';
import { useDebounce } from '@/hooks/useDebounce';
import FAQTable from '@/components/admin/FAQs/FAQTable';
import FAQForm from '@/components/admin/FAQs/FAQForm';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import Modal from '@/components/shared/Modal';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import { PlusIcon, MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const FAQList: React.FC = () => {
    const queryClient = useQueryClient();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editFAQ, setEditFAQ] = useState<string | null>(null);
    const [deleteFAQ, setDeleteFAQ] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [isActive, setIsActive] = useState<string>('');
    const debouncedSearch = useDebounce(search, 300);

    const { data: faqs, isLoading } = useQuery({
        queryKey: ['faqs', { search: debouncedSearch, category, isActive }],
        queryFn: async () => {
            const { data } = await apiClient.axios.get<FAQ[]>('/faqs', {
                params: {
                    search: debouncedSearch || undefined,
                    category: category || undefined,
                    isActive: isActive || undefined,
                },
            });
            return data;
        },
    });

    const { data: categories } = useQuery({
        queryKey: ['faq-categories'],
        queryFn: async () => {
            const { data } = await apiClient.axios.get<string[]>('/faqs/categories');
            return data;
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const { data } = await apiClient.axios.delete(`/faqs/${id}`);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['faqs'] });
            toast.success('FAQ deleted successfully');
            setDeleteFAQ(null);
        },
    });

    const handleEdit = (id: string) => {
        setEditFAQ(id);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setEditFAQ(null);
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex justify-between items-center">
                <p className="text-gray-600">
                    Manage frequently asked questions
                </p>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="btn btn-primary btn-md"
                >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Add FAQ
                </button>
            </div>

            {/* Filters */}
            <div className="card">
                <div className="card-body">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search FAQs..."
                                    className="input pl-10"
                                />
                                <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <FunnelIcon className="h-5 w-5 text-gray-400" />

                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="input"
                            >
                                <option value="">All Categories</option>
                                {categories?.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>

                            <select
                                value={isActive}
                                onChange={(e) => setIsActive(e.target.value)}
                                className="input"
                            >
                                <option value="">All Status</option>
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQs Table */}
            <div className="card">
                {isLoading ? (
                    <div className="card-body">
                        <LoadingSpinner />
                    </div>
                ) : (
                    <FAQTable
                        faqs={faqs || []}
                        onEdit={handleEdit}
                        onDelete={(id) => setDeleteFAQ(id)}
                    />
                )}
            </div>

            {/* FAQ Form Modal */}
            <Modal
                isOpen={isFormOpen}
                onClose={handleCloseForm}
                title={editFAQ ? 'Edit FAQ' : 'Add FAQ'}
                size="lg"
            >
                <FAQForm
                    faqId={editFAQ}
                    categories={categories || []}
                    onSuccess={handleCloseForm}
                    onCancel={handleCloseForm}
                />
            </Modal>

            {/* Delete Confirmation */}
            <ConfirmDialog
                isOpen={!!deleteFAQ}
                onClose={() => setDeleteFAQ(null)}
                onConfirm={() => deleteFAQ && deleteMutation.mutate(deleteFAQ)}
                title="Delete FAQ"
                message="Are you sure you want to delete this FAQ? This action cannot be undone."
                type="danger"
                confirmText="Delete"
            />
        </div>
    );
};

export default FAQList;
