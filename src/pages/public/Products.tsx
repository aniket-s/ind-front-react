// src/pages/public/Products.tsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { publicService } from '@/services/public.service';
import ProductGrid from '@/components/public/Products/ProductGrid';
import ProductFilters from '@/components/public/Products/ProductFilters';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import Pagination from '@/components/shared/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMagnifyingGlass,
    faFilter,
    faTh,
    faList
} from '@fortawesome/free-solid-svg-icons';
import { cn } from '@/utils';

const Products: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
    const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'sortOrder');
    const [sortOrder, setSortOrder] = useState(searchParams.get('sortOrder') || 'ASC');
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Header Section */}

            <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>

                <div className="relative z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
                            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                                Discover our complete range of power solutions designed to meet all your backup power
                                needs
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className="mt-8 max-w-2xl mx-auto">
                            <form onSubmit={handleSearch} className="relative">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search for inverters, batteries, solar solutions..."
                                    className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/20 transition-all"
                                />
                                <FontAwesomeIcon
                                    icon={faMagnifyingGlass}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 text-xl"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-yellow-400 text-gray-800 px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 transition-colors"
                                >
                                    Search
                                </button>
                            </form>
                        </div>
                    </div>
                </div>


            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                {/* Results Bar */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <p className="text-gray-600">
                                Showing <span className="font-semibold text-gray-900">{data?.products.length || 0}</span> of{' '}
                                <span className="font-semibold text-gray-900">{data?.totalProducts || 0}</span> products
                            </p>

                            {/* Mobile Filter Toggle */}
                            <button
                                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                                className="lg:hidden cl-white flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <FontAwesomeIcon icon={faFilter} />
                                Filters
                            </button>
                        </div>

                        {/* View Mode Toggle */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 mr-2">View:</span>
                            <button
                                onClick={() => setViewMode('grid')}
                                className={cn(
                                    "p-2 rounded transition-colors",
                                    viewMode === 'grid'
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                )}
                            >
                                <FontAwesomeIcon icon={faTh} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={cn(
                                    "p-2 rounded transition-colors",
                                    viewMode === 'list'
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                )}
                            >
                                <FontAwesomeIcon icon={faList} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <aside className={cn(
                        "lg:w-80 lg:block",
                        mobileFiltersOpen ? "block" : "hidden"
                    )}>
                        <div className="sticky top-4">
                            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <FontAwesomeIcon icon={faFilter} className="mr-2" />
                                    Filters
                                </h2>
                                <ProductFilters
                                    categories={categories || []}
                                    selectedCategory={selectedCategory}
                                    onCategoryChange={(category) => {
                                        setSelectedCategory(category);
                                        setMobileFiltersOpen(false);
                                    }}
                                    sortBy={sortBy}
                                    sortOrder={sortOrder}
                                    onSortChange={(newSortBy, newSortOrder) => {
                                        setSortBy(newSortBy);
                                        setSortOrder(newSortOrder);
                                    }}
                                />
                            </div>

                            {/* Quick Links */}
                            <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                                <h3 className="font-semibold text-gray-900 mb-3">Need Help?</h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    Our experts are here to help you choose the right product
                                </p>
                                <a
                                    href="/contact"
                                    className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                >
                                    Contact Us
                                </a>
                            </div>
                        </div>
                    </aside>

                    {/* Products Grid */}
                    <main className="flex-1">
                        {isLoading ? (
                            <div className="flex justify-center items-center min-h-[400px]">
                                <LoadingSpinner size="lg" />
                            </div>
                        ) : (
                            <>
                                {/* Category Header */}
                                {selectedCategory && (
                                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                            {categories?.find(c => c.slug === selectedCategory)?.name || selectedCategory}
                                        </h2>
                                        <p className="text-gray-600">
                                            Explore our range of {categories?.find(c => c.slug === selectedCategory)?.name || 'products'} designed for reliable power backup
                                        </p>
                                    </div>
                                )}

                                <ProductGrid products={data?.products || []} />

                                {/* Pagination */}
                                {data && data.totalPages > 1 && (
                                    <div className="mt-12 bg-white rounded-lg shadow-sm p-4">
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

            {/* Bottom CTA Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">Can't find what you're looking for?</h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Our product experts are ready to help you find the perfect power solution for your needs
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                        >
                            Get Expert Advice
                        </a>
                        <a
                            href="/dealer-locator"
                            className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                        >
                            Find Nearest Dealer
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;