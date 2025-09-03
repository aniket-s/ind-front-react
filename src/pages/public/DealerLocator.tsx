// src/pages/public/DealerLocator.tsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
    MapPinIcon,
    PhoneIcon,
    EnvelopeIcon,
    BuildingStorefrontIcon,
    WrenchScrewdriverIcon,
    UserGroupIcon,
    MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { dummyDealers, searchDealersByPincode, type DealerData } from '@/data/dummyDealers';
import { cn } from '@/utils';

type DealerType = 'all' | 'distributor' | 'service_center' | 'dealer';
type SortOption = 'rating' | 'name' | 'distance';

const DealerLocator: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get('pincode') || '');
    const [dealers, setDealers] = useState<DealerData[]>([]);
    const [filteredDealers, setFilteredDealers] = useState<DealerData[]>([]);
    const [selectedType, setSelectedType] = useState<DealerType>('all');
    const [sortBy, setSortBy] = useState<SortOption>('rating');
    const [selectedDealer, setSelectedDealer] = useState<DealerData | null>(null);

    // Initialize with all dealers or search results
    useEffect(() => {
        const pincodeParam = searchParams.get('pincode');
        if (pincodeParam) {
            const results = searchDealersByPincode(pincodeParam);
            setDealers(results.length > 0 ? results : dummyDealers);
        } else {
            setDealers(dummyDealers);
        }
    }, [searchParams]);

    // Filter and sort dealers
    useEffect(() => {
        let filtered = [...dealers];

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(dealer =>
                dealer.pincode.includes(searchQuery) ||
                dealer.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                dealer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                dealer.state.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Filter by type
        if (selectedType !== 'all') {
            filtered = filtered.filter(dealer => dealer.type === selectedType);
        }

        // Sort
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'rating':
                    return (b.rating || 0) - (a.rating || 0);
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'distance':
                    // For demo, just use a random order
                    return 0;
                default:
                    return 0;
            }
        });

        setFilteredDealers(filtered);
    }, [dealers, searchQuery, selectedType, sortBy]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Search is already reactive through useEffect
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'distributor':
                return <BuildingStorefrontIcon className="h-5 w-5" />;
            case 'service_center':
                return <WrenchScrewdriverIcon className="h-5 w-5" />;
            default:
                return <UserGroupIcon className="h-5 w-5" />;
        }
    };

    const getTypeBadgeClass = (type: string): string => {
        switch (type) {
            case 'distributor':
                return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'service_center':
                return 'bg-orange-100 text-orange-700 border-orange-200';
            default:
                return 'bg-green-100 text-green-700 border-green-200';
        }
    };

    const formatDealerType = (type: string): string => {
        return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    };

    const stats = {
        total: filteredDealers.length,
        distributors: filteredDealers.filter(d => d.type === 'distributor').length,
        serviceCenters: filteredDealers.filter(d => d.type === 'service_center').length,
        dealers: filteredDealers.filter(d => d.type === 'dealer').length,
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
            {/* Header with Search */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <div className="container py-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Find a Dealer Near You</h1>
                    <p className="text-xl text-blue-100 mb-8">
                        Locate authorized IndPower dealers, distributors, and service centers across India
                    </p>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="max-w-3xl">
                        <div className="flex items-center bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20">
                            <div className="pl-5 pr-3">
                                <MagnifyingGlassIcon className="h-6 w-6 text-white/70" />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by PIN code, city, state, or dealer name..."
                                className="flex-1 px-3 py-4 bg-transparent text-white placeholder-white/70 focus:outline-none text-lg"
                            />
                            <button
                                type="submit"
                                className="bg-white/20 hover:bg-white/30 text-white px-6 py-4 font-semibold transition-colors duration-200"
                            >
                                Search
                            </button>
                        </div>
                    </form>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                        <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                            <div className="text-3xl font-bold">{stats.total}</div>
                            <div className="text-blue-100 text-sm">Total Locations</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                            <div className="text-3xl font-bold">{stats.distributors}</div>
                            <div className="text-blue-100 text-sm">Distributors</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                            <div className="text-3xl font-bold">{stats.serviceCenters}</div>
                            <div className="text-blue-100 text-sm">Service Centers</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                            <div className="text-3xl font-bold">{stats.dealers}</div>
                            <div className="text-blue-100 text-sm">Dealers</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container py-8">
                {/* Filters and Sort */}
                <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        {/* Type Filter */}
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setSelectedType('all')}
                                className={cn(
                                    'px-4 py-2 rounded-lg font-medium transition-all duration-200',
                                    selectedType === 'all'
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                )}
                            >
                                All Types
                            </button>
                            <button
                                onClick={() => setSelectedType('distributor')}
                                className={cn(
                                    'px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2',
                                    selectedType === 'distributor'
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                )}
                            >
                                <BuildingStorefrontIcon className="h-4 w-4" />
                                Distributors
                            </button>
                            <button
                                onClick={() => setSelectedType('service_center')}
                                className={cn(
                                    'px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2',
                                    selectedType === 'service_center'
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                )}
                            >
                                <WrenchScrewdriverIcon className="h-4 w-4" />
                                Service Centers
                            </button>
                            <button
                                onClick={() => setSelectedType('dealer')}
                                className={cn(
                                    'px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2',
                                    selectedType === 'dealer'
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                )}
                            >
                                <UserGroupIcon className="h-4 w-4" />
                                Dealers
                            </button>
                        </div>

                        {/* Sort Options */}
                        <div className="flex items-center gap-2">
                            <span className="text-gray-600 text-sm">Sort by:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as SortOption)}
                                className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="rating">Rating</option>
                                <option value="name">Name</option>
                                <option value="distance">Distance</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Results Grid */}
                {filteredDealers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredDealers.map((dealer) => (
                            <div
                                key={dealer.id}
                                className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                                onClick={() => setSelectedDealer(dealer)}
                            >
                                {/* Card Header */}
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                                                {dealer.name}
                                            </h3>
                                            <div className="mt-2">
                                                <span className={cn(
                                                    'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border',
                                                    getTypeBadgeClass(dealer.type)
                                                )}>
                                                    {getTypeIcon(dealer.type)}
                                                    {formatDealerType(dealer.type)}
                                                </span>
                                            </div>
                                        </div>
                                        {dealer.establishedYear && (
                                            <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                Est. {dealer.establishedYear}
                                            </div>
                                        )}
                                    </div>

                                    {/* Contact Info */}
                                    <div className="space-y-3 text-sm">
                                        <div className="flex items-start gap-3">
                                            <MapPinIcon className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                                            <div className="text-gray-600">
                                                <p>{dealer.address}</p>
                                                <p className="font-medium">{dealer.city}, {dealer.state} - {dealer.pincode}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <PhoneIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
                                            <a
                                                href={`tel:${dealer.phone}`}
                                                className="text-blue-600 hover:text-blue-700 font-medium"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                {dealer.phone}
                                            </a>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <EnvelopeIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
                                            <a
                                                href={`mailto:${dealer.email}`}
                                                className="text-blue-600 hover:text-blue-700 font-medium truncate"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                {dealer.email}
                                            </a>
                                        </div>
                                    </div>

                                    {/* Services/Brands */}
                                    {dealer.services && dealer.services.length > 0 && (
                                        <div className="mt-4 pt-4 border-t border-gray-100">
                                            <div className="flex flex-wrap gap-2">
                                                {dealer.services.map((service, idx) => (
                                                    <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                                        {service}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Card Footer with Rating */}
                                {dealer.rating && (
                                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-t border-gray-100">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <StarIconSolid
                                                        key={i}
                                                        className={cn(
                                                            'h-4 w-4',
                                                            i < Math.floor(dealer.rating!)
                                                                ? 'text-yellow-400'
                                                                : 'text-gray-300'
                                                        )}
                                                    />
                                                ))}
                                                <span className="ml-2 text-sm font-medium text-gray-700">
                                                    {dealer.rating.toFixed(1)}
                                                </span>
                                            </div>
                                            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                                View Details →
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                        <MapPinIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Dealers Found</h3>
                        <p className="text-gray-600 mb-6">
                            We couldn't find any dealers matching your search criteria.
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedType('all');
                            }}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>

            {/* Dealer Detail Modal */}
            {selectedDealer && (
                <div
                    className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedDealer(null)}
                >
                    <div
                        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">{selectedDealer.name}</h2>
                                    <span className={cn(
                                        'inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border mt-2',
                                        getTypeBadgeClass(selectedDealer.type)
                                    )}>
                                        {getTypeIcon(selectedDealer.type)}
                                        {formatDealerType(selectedDealer.type)}
                                    </span>
                                </div>
                                <button
                                    onClick={() => setSelectedDealer(null)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Detailed Information */}
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Contact Information</h3>
                                    <div className="space-y-2">
                                        <p className="flex items-center gap-2">
                                            <MapPinIcon className="h-5 w-5 text-gray-400" />
                                            {selectedDealer.address}, {selectedDealer.city}, {selectedDealer.state} - {selectedDealer.pincode}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <PhoneIcon className="h-5 w-5 text-gray-400" />
                                            <a href={`tel:${selectedDealer.phone}`} className="text-blue-600 hover:text-blue-700">
                                                {selectedDealer.phone}
                                            </a>
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                                            <a href={`mailto:${selectedDealer.email}`} className="text-blue-600 hover:text-blue-700">
                                                {selectedDealer.email}
                                            </a>
                                        </p>
                                    </div>
                                </div>

                                {selectedDealer.services && selectedDealer.services.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Services Offered</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedDealer.services.map((service, idx) => (
                                                <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm">
                                                    {service}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {selectedDealer.brands && selectedDealer.brands.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Brands Available</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedDealer.brands.map((brand, idx) => (
                                                <span key={idx} className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm">
                                                    {brand}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {selectedDealer.rating && (
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Customer Rating</h3>
                                        <div className="flex items-center gap-2">
                                            {[...Array(5)].map((_, i) => (
                                                <StarIconSolid
                                                    key={i}
                                                    className={cn(
                                                        'h-6 w-6',
                                                        i < Math.floor(selectedDealer.rating!)
                                                            ? 'text-yellow-400'
                                                            : 'text-gray-300'
                                                    )}
                                                />
                                            ))}
                                            <span className="text-lg font-semibold text-gray-700">
                                                {selectedDealer.rating.toFixed(1)} / 5.0
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {selectedDealer.establishedYear && (
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Established</h3>
                                        <p className="text-gray-700">{selectedDealer.establishedYear} ({new Date().getFullYear() - selectedDealer.establishedYear} years of service)</p>
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 flex gap-4">
                                <a
                                    href={`tel:${selectedDealer.phone}`}
                                    className="flex-1 bg-blue-600 text-white text-center py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                                >
                                    Call Now
                                </a>
                                <a
                                    href={`mailto:${selectedDealer.email}`}
                                    className="flex-1 bg-gray-100 text-gray-700 text-center py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
                                >
                                    Send Email
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DealerLocator;