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
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { cn } from '@/utils';

const Products: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [viewMode] = useState<'grid' | 'list'>('grid');
    const page = parseInt(searchParams.get('page') || '1');

    const { data: categories } = useQuery({
        queryKey: ['public-categories'],
        queryFn: () => publicService.getCategories(),
    });

    const { data, isLoading } = useQuery({
        queryKey: ['products', { category: selectedCategory, page }],
        queryFn: () => publicService.getProducts({
            category: selectedCategory,
            page,
            limit: 12,
        }),
    });

    useEffect(() => {
        const params: any = {};
        if (selectedCategory) params.category = selectedCategory;
        if (page > 1) params.page = page.toString();
        setSearchParams(params);
    }, [selectedCategory, page, setSearchParams]);

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
                                Categories
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
                            <div className="bg-white rounded-lg shadow-sm p-4">
                                <ProductFilters
                                    categories={categories || []}
                                    selectedCategory={selectedCategory}
                                    onCategoryChange={(category) => {
                                        setSelectedCategory(category);
                                        setMobileFiltersOpen(false);
                                    }}
                                />
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

                                <ProductGrid products={data?.products || []} viewMode={viewMode} />

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