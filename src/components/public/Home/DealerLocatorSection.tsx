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
    const dealerStats = getDealerStats();

    const content = section.content || {};
    const stats = content.stats || [
        { icon: "fas fa-handshake", value: `${dealerStats.total}+`, label: "Authorized Dealers" },
        { icon: "fas fa-map-marker-alt", value: `${dealerStats.cities}+`, label: "Cities Covered" },
        { icon: "fas fa-tools", value: `${dealerStats.serviceCenters}+`, label: "Service Centers" },
        { icon: "fas fa-headset", value: "24/7", label: "Customer Support" },
    ];

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

                {/* Map and Stats Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Static Map Image */}
                    <div className="relative">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            {/* Map Header */}
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <MapPinIcon className="h-5 w-5" />
                                    Our Pan-India Network
                                </h3>
                            </div>

                            {/* Static Map Image */}
                            <div className="relative">
                                <img
                                    src="/map1.jpg"
                                    alt="IndPower Dealer Network Map"
                                    className="w-full"
                                />

                                {/* Optional: Map Legend Overlay */}
                                <div className="absolute bottom-4 left-6 bg-white/90 backdrop-blur rounded-lg px-3 py-2 text-xs">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                        <span className="text-gray-600">Dealer Location</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-2 gap-6">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-20 h-20 mb-4 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                        <i className={`${stat.icon} text-blue-600 text-3xl`}></i>
                                    </div>
                                    <h3 className="text-3xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                                        {stat.value}
                                    </h3>
                                    <p className="text-gray-600 font-medium">{stat.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Button */}
                <div className="text-center mt-12">
                    <button
                        onClick={() => navigate('/dealer-locator')}
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group"
                    >
                        <span>View All Dealers</span>
                        <svg
                            className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default DealerLocatorSection;