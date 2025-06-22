// src/pages/admin/products/ProductList.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productsService } from '@/services/products.service';
import { useDebounce } from '@/hooks/useDebounce';
import ProductTable from '@/components/admin/Products/ProductTable';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import Pagination from '@/components/shared/Pagination';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const ProductList: React.FC = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [deleteProduct, setDeleteProduct] = useState<string | null>(null);
    const debouncedSearch = useDebounce(search, 300);

    const { data, isLoading } = useQuery({
        queryKey: ['products', { page, search: debouncedSearch }],
        queryFn: () => productsService.getProducts({
            page,
            limit: 10,
            search: debouncedSearch,
        }),
    });

    const toggleStatusMutation = useMutation({
        mutationFn: productsService.toggleProductStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast.success('Product status updated');
        },
    });

    const deleteMutation = useMutation({
        mutationFn: productsService.deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast.success('Product deleted successfully');
            setDeleteProduct(null);
        },
    });

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div className="flex-1 max-w-lg">
                    <div className="relative">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search products..."
                            className="input pl-10"
                        />
                        <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                </div>
                <button
                    onClick={() => navigate('/admin/products/new')}
                    className="btn btn-primary btn-md"
                >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Add Product
                </button>
            </div>

            {/* Table */}
            <div className="card">
                {isLoading ? (
                    <div className="card-body">
                        <LoadingSpinner />
                    </div>
                ) : (
                    <>
                        <ProductTable
                            products={data?.products || []}
                            onEdit={(id) => navigate(`/admin/products/${id}/edit`)}
                            onToggleStatus={(id) => toggleStatusMutation.mutate(id)}
                            onDelete={(id) => setDeleteProduct(id)}
                        />
                        {data && data.totalPages > 1 && (
                            <div className="px-6 py-4 border-t">
                                <Pagination
                                    currentPage={data.currentPage}
                                    totalPages={data.totalPages}
                                    onPageChange={setPage}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Delete Confirmation */}
            <ConfirmDialog
                isOpen={!!deleteProduct}
                onClose={() => setDeleteProduct(null)}
                onConfirm={() => deleteProduct && deleteMutation.mutate(deleteProduct)}
                title="Delete Product"
                message="Are you sure you want to delete this product? This action cannot be undone."
                type="danger"
                confirmText="Delete"
            />
        </div>
    );
};

export default ProductList;
