// src/pages/public/FAQs.tsx
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { publicService } from '@/services/public.service';
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { cn } from '@/utils';
import { useDebounce } from '@/hooks/useDebounce';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

const FAQs: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [search, setSearch] = useState('');
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const debouncedSearch = useDebounce(search, 300);

    const { data, isLoading } = useQuery({
        queryKey: ['faqs', selectedCategory],
        queryFn: () => publicService.getFAQs(selectedCategory),
    });

    const filteredFAQs = data?.faqs.filter((faq) =>
        debouncedSearch
            ? faq.question.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            faq.answer.toLowerCase().includes(debouncedSearch.toLowerCase())
            : true
    ) || [];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="container py-12">
                    <h1 className="text-4xl font-bold text-gray-900">Frequently Asked Questions</h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Find answers to common questions about our products and services
                    </p>
                </div>
            </div>

            <div className="container py-12">
                {/* Search and Filter */}
                <div className="max-w-3xl mx-auto mb-8 space-y-4">
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

                    {data?.categories && data.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setSelectedCategory('')}
                                className={cn(
                                    'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                                    selectedCategory === ''
                                        ? 'bg-primary-600 text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-100'
                                )}
                            >
                                All Categories
                            </button>
                            {data.categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={cn(
                                        'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                                        selectedCategory === category
                                            ? 'bg-primary-600 text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-100'
                                    )}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* FAQs List */}
                <div className="max-w-3xl mx-auto">
                    {isLoading ? (
                        <LoadingSpinner />
                    ) : filteredFAQs.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No FAQs found matching your criteria.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredFAQs.map((faq, index) => (
                                <div
                                    key={faq.id}
                                    className="bg-white rounded-lg shadow-sm overflow-hidden"
                                >
                                    <button
                                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex-1 pr-4">
                                            <h3 className="text-gray-900 font-medium">{faq.question}</h3>
                                            {faq.category && (
                                                <span className="inline-block mt-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {faq.category}
                        </span>
                                            )}
                                        </div>
                                        <ChevronDownIcon
                                            className={cn(
                                                'h-5 w-5 text-gray-500 transition-transform flex-shrink-0',
                                                openIndex === index && 'rotate-180'
                                            )}
                                        />
                                    </button>
                                    {openIndex === index && (
                                        <div className="px-6 pb-4">
                                            <p className="text-gray-600 whitespace-pre-wrap">{faq.answer}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Still Have Questions */}
                <div className="max-w-3xl mx-auto mt-12 text-center">
                    <div className="bg-white rounded-lg shadow-sm p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Still have questions?
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Can't find the answer you're looking for? Our support team is here to help.
                        </p>
                        <a
                            href="/contact"
                            className="btn btn-primary btn-md"
                        >
                            Contact Support
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQs;
