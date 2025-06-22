// src/pages/public/Products.tsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { publicService } from '@/services/public.service';
import ProductGrid from '@/components/public/Products/ProductGrid';
import ProductFilters from '@/components/public/Products/ProductFilters';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import Pagination from '@/components/shared/Pagination';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Products: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
    const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'sortOrder');
    const [sortOrder, setSortOrder] = useState(searchParams.get('sortOrder') || 'ASC');
    const page = parseInt(searchParams.get('page') || '1');

    const { data: categories } = useQuery({
        queryKey: ['public-categories'],
        queryFn: () => publicService.getCategories(),
    });

    const { data, isLoading } = useQuery({
        queryKey: ['products', { category: selectedCategory, search, page, sortBy, sortOrder }],
        queryFn: () => publicService.getProducts({
            category: selectedCategory,
            search,
            page,
            limit: 12,
            sortBy,
            sortOrder,
        }),
    });

    useEffect(() => {
        const params: any = {};
        if (search) params.search = search;
        if (selectedCategory) params.category = selectedCategory;
        if (page > 1) params.page = page.toString();
        if (sortBy !== 'sortOrder') params.sortBy = sortBy;
        if (sortOrder !== 'ASC') params.sortOrder = sortOrder;
        setSearchParams(params);
    }, [search, selectedCategory, page, sortBy, sortOrder, setSearchParams]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setSearchParams({ ...Object.fromEntries(searchParams), search, page: '1' });
    };

    const handlePageChange = (newPage: number) => {
        setSearchParams({ ...Object.fromEntries(searchParams), page: newPage.toString() });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="container py-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Our Products</h1>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="max-w-lg">
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
                    </form>
                </div>
            </div>

            <div className="container py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters */}
                    <aside className="lg:w-64">
                        <ProductFilters
                            categories={categories || []}
                            selectedCategory={selectedCategory}
                            onCategoryChange={setSelectedCategory}
                            sortBy={sortBy}
                            sortOrder={sortOrder}
                            onSortChange={(newSortBy, newSortOrder) => {
                                setSortBy(newSortBy);
                                setSortOrder(newSortOrder);
                            }}
                        />
                    </aside>

                    {/* Products */}
                    <main className="flex-1">
                        {isLoading ? (
                            <LoadingSpinner />
                        ) : (
                            <>
                                <div className="mb-4 text-sm text-gray-600">
                                    Showing {data?.products.length || 0} of {data?.totalProducts || 0} products
                                </div>

                                <ProductGrid products={data?.products || []} />

                                {data && data.totalPages > 1 && (
                                    <div className="mt-8">
                                        <Pagination
                                            currentPage={data.currentPage}
                                            totalPages={data.totalPages}
                                            onPageChange={handlePageChange}
                                        />
                                    </div>
                                )}
                            </>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Products;
