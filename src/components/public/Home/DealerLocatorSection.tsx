// src/components/public/Home/DealerLocatorSection.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPinIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { getDealerStats } from '@/data/dummyDealers';

interface Stat {
    icon: string;
    value: string;
    label: string;
}

interface DealerLocatorContent {
    stats?: Stat[];
    placeholder?: string;
    buttonText?: string;
}

interface DealerLocatorSectionData {
    title?: string;
    subtitle?: string;
    content?: DealerLocatorContent;
}

interface DealerLocatorSectionProps {
    section: DealerLocatorSectionData;
}

const DealerLocatorSection: React.FC<DealerLocatorSectionProps> = ({ section }) => {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    getDealerStats();
    const content = section.content || {};
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchValue.trim()) {
            navigate(`/dealer-locator?pincode=${searchValue}`);
        }
    };

    return (
        <section className="relative bg-gradient-to-br from-gray-50 to-blue-50/30 py-20 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Title Section */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        {section.title || "Find Your Nearest Dealer"}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        {section.subtitle || "With our extensive network across India, we're always close to serve you better"}
                    </p>
                </div>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-16">
                    <div className="relative">
                        <div className="flex items-center bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300">
                            <div className="pl-6 pr-3">
                                <MapPinIcon className="h-6 w-6 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                placeholder={content.placeholder || "Enter your 6-digit PIN code"}
                                className="flex-1 px-3 py-5 text-gray-700 placeholder-gray-400 focus:outline-none text-lg"
                                maxLength={6}
                            />
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-5 font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center gap-3 group"
                            >
                                <MagnifyingGlassIcon className="h-5 w-5" />
                                <span>{content.buttonText || "FIND DEALERS"}</span>
                                <svg
                                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </form>


            </div>
        </section>
    );
};

export default DealerLocatorSection;