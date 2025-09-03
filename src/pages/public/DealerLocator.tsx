import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { dealersService } from '@/services/dealers.service';
import { Dealer } from '@/types';
import {
    MapPinIcon,
    PhoneIcon,
    EnvelopeIcon,
    BuildingStorefrontIcon,
    WrenchScrewdriverIcon,
    UserGroupIcon,
    MagnifyingGlassIcon,
    GlobeAltIcon,
    ClockIcon,
    StarIcon as StarIconOutline,
    ChevronDownIcon,
    ChevronUpIcon,
    FunnelIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { cn } from '@/utils';

type DealerType = 'all' | 'distributor' | 'service_center' | 'dealer';
type SortOption = 'rating' | 'name' | 'distance';

const DealerLocator: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get('pincode') || '');
    const [selectedType, setSelectedType] = useState<DealerType>('all');
    const [sortBy, setSortBy] = useState<SortOption>('rating');
    const [selectedDealer, setSelectedDealer] = useState<Dealer | null>(null);
    const [showFilters, setShowFilters] = useState(false);
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [onlyFeatured, setOnlyFeatured] = useState(false);
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

    // Fetch dealers from API
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['public-dealers', searchQuery, selectedType, selectedState, selectedCity, sortBy, userLocation],
        queryFn: async () => {
            const params: any = {
                search: searchQuery,
                type: selectedType === 'all' ? undefined : selectedType,
                state: selectedState || undefined,
                city: selectedCity || undefined,
                limit: 50,
            };

            if (userLocation) {
                params.lat = userLocation.lat;
                params.lng = userLocation.lng;
                params.radius = 100; // 100km radius
            }

            const result = await dealersService.getPublicDealers(params);

            // Sort the results based on selected option
            let dealers = Array.isArray(result) ? result : result.dealers;

            if (sortBy === 'rating') {
                dealers = dealers.sort((a, b) => b.rating - a.rating);
            } else if (sortBy === 'name') {
                dealers = dealers.sort((a, b) => a.name.localeCompare(b.name));
            }

            if (onlyFeatured) {
                dealers = dealers.filter(d => d.isFeatured);
            }

            return dealers;
        },
    });

    // Get user's location
    useEffect(() => {
        if (navigator.geolocation && sortBy === 'distance') {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error('Error getting location:', error);
                }
            );
        }
    }, [sortBy]);

    // Get unique states and cities from dealers
    const states = Array.from(new Set(data?.map(d => d.state) || [])).sort();
    const cities = Array.from(
        new Set(
            data
                ?.filter(d => !selectedState || d.state === selectedState)
                .map(d => d.city) || []
        )
    ).sort();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        refetch();
    };
    const isOpenNow = (workingHours: any): boolean => {
        if (!workingHours) return false;

        const now = new Date();
        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const today = days[now.getDay()];
        const currentTime = now.getHours() * 100 + now.getMinutes();

        const todaySchedule = workingHours[today];
        if (!todaySchedule || !todaySchedule.isOpen) return false;

        const [openHour, openMin] = todaySchedule.open.split(':').map(Number);
        const [closeHour, closeMin] = todaySchedule.close.split(':').map(Number);
        const openTime = openHour * 100 + openMin;
        const closeTime = closeHour * 100 + closeMin;

        return currentTime >= openTime && currentTime <= closeTime;
    };

    const filteredDealers = data || [];

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
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
                        Find a Dealer Near You
                    </h1>
                    <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8">
                        Locate authorized IndPower dealers, distributors, and service centers across India
                    </p>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="max-w-3xl">
                        <div className="flex items-center bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20">
                            <div className="pl-4 sm:pl-5 pr-2 sm:pr-3">
                                <MagnifyingGlassIcon className="h-5 sm:h-6 w-5 sm:w-6 text-white/70" />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by PIN code, city, state, or dealer name..."
                                className="flex-1 px-2 sm:px-3 py-3 sm:py-4 bg-transparent text-white placeholder-white/70 focus:outline-none text-base sm:text-lg"
                            />
                            <button
                                type="submit"
                                className="bg-white/20 hover:bg-white/30 text-white px-4 sm:px-6 py-3 sm:py-4 font-medium sm:font-semibold transition-colors duration-200"
                            >
                                Search
                            </button>
                        </div>
                    </form>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8">
                        <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 sm:p-4 border border-white/20">
                            <div className="text-2xl sm:text-3xl font-bold">{stats.total}</div>
                            <div className="text-blue-100 text-xs sm:text-sm">Total Locations</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 sm:p-4 border border-white/20">
                            <div className="text-2xl sm:text-3xl font-bold">{stats.distributors}</div>
                            <div className="text-blue-100 text-xs sm:text-sm">Distributors</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 sm:p-4 border border-white/20">
                            <div className="text-2xl sm:text-3xl font-bold">{stats.serviceCenters}</div>
                            <div className="text-blue-100 text-xs sm:text-sm">Service Centers</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 sm:p-4 border border-white/20">
                            <div className="text-2xl sm:text-3xl font-bold">{stats.dealers}</div>
                            <div className="text-blue-100 text-xs sm:text-sm">Dealers</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
                {/* Filters and Sort */}
                <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
                        {/* Type Filter */}
                        <div className="flex flex-wrap gap-2 sm:gap-3">
                            <button
                                onClick={() => setSelectedType('all')}
                                className={cn(
                                    'px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base',
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
                                    'px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base',
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
                                    'px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base',
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
                                    'px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base',
                                    selectedType === 'dealer'
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                )}
                            >
                                <UserGroupIcon className="h-4 w-4" />
                                Dealers
                            </button>
                        </div>

                        {/* Sort and Advanced Filters */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={cn(
                                    'px-3 py-1.5 rounded-lg font-medium transition-all duration-200 flex items-center gap-1.5 text-sm',
                                    showFilters
                                        ? 'bg-gray-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                )}
                            >
                                <FunnelIcon className="h-4 w-4" />
                                Filters
                                {showFilters ? (
                                    <ChevronUpIcon className="h-3 w-3" />
                                ) : (
                                    <ChevronDownIcon className="h-3 w-3" />
                                )}
                            </button>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as SortOption)}
                                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                            >
                                <option value="rating">Sort by Rating</option>
                                <option value="name">Sort by Name</option>
                                <option value="distance">Sort by Distance</option>
                            </select>
                        </div>
                    </div>

                    {/* Advanced Filters */}
                    {showFilters && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    State
                                </label>
                                <select
                                    value={selectedState}
                                    onChange={(e) => {
                                        setSelectedState(e.target.value);
                                        setSelectedCity('');
                                    }}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">All States</option>
                                    {states.map((state) => (
                                        <option key={state} value={state}>
                                            {state}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    City
                                </label>
                                <select
                                    value={selectedCity}
                                    onChange={(e) => setSelectedCity(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    disabled={!selectedState}
                                >
                                    <option value="">All Cities</option>
                                    {cities.map((city) => (
                                        <option key={city} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    &nbsp;
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={onlyFeatured}
                                        onChange={(e) => setOnlyFeatured(e.target.checked)}
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">
                                        Featured Dealers Only
                                    </span>
                                </label>
                            </div>
                        </div>
                    )}
                </div>

                {/* Results */}
                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <LoadingSpinner />
                    </div>
                ) : filteredDealers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {filteredDealers.map((dealer) => (
                            <DealerCard
                                key={dealer.id}
                                dealer={dealer}
                                isOpenNow={isOpenNow(dealer.workingHours)}
                                onClick={() => setSelectedDealer(dealer)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm p-8 sm:p-12 text-center max-w-2xl mx-auto">
                        <MapPinIcon className="h-12 sm:h-16 w-12 sm:w-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                            No Dealers Found
                        </h3>
                        <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                            We couldn't find any dealers matching your search criteria.
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedType('all');
                                setSelectedState('');
                                setSelectedCity('');
                                setOnlyFeatured(false);
                                refetch();
                            }}
                            className="px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 text-sm sm:text-base"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>

            {/* Dealer Detail Modal */}
            {selectedDealer && (
                <DealerDetailModal
                    dealer={selectedDealer}
                    onClose={() => setSelectedDealer(null)}
                    isOpenNow={isOpenNow(selectedDealer.workingHours)}
                />
            )}
        </div>
    );
};

// Dealer Card Component
const DealerCard: React.FC<{
    dealer: Dealer;
    isOpenNow: boolean;
    onClick: () => void;
}> = ({ dealer, isOpenNow, onClick }) => {
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

    return (
        <div
            className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
            onClick={onClick}
        >
            {/* Card Header */}
            <div className="p-4 sm:p-6">
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                    <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                            {dealer.name}
                            {dealer.isFeatured && (
                                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                    Featured
                                </span>
                            )}
                        </h3>
                        <div className="mt-2 flex items-center gap-2">
                            <span className={cn(
                                'inline-flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium border',
                                getTypeBadgeClass(dealer.type)
                            )}>
                                {getTypeIcon(dealer.type)}
                                {formatDealerType(dealer.type)}
                            </span>
                            <span className={cn(
                                'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium',
                                isOpenNow
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-gray-100 text-gray-500'
                            )}>
                                <ClockIcon className="h-3 w-3" />
                                {isOpenNow ? 'Open Now' : 'Closed'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 sm:space-y-3 text-sm">
                    <div className="flex items-start gap-2 sm:gap-3">
                        <MapPinIcon className="h-4 sm:h-5 w-4 sm:w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-600 text-xs sm:text-sm">
                            <p>{dealer.address}</p>
                            <p className="font-medium">
                                {dealer.city}, {dealer.state} - {dealer.pincode}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                        <PhoneIcon className="h-4 sm:h-5 w-4 sm:w-5 text-gray-400 flex-shrink-0" />
<a
                        href={`tel:${dealer.phone}`}
                        className="text-blue-600 hover:text-blue-700 font-medium text-xs sm:text-sm"
                        onClick={(e) => e.stopPropagation()}
                        >
                        {dealer.phone}
                    </a>
                </div>

                {dealer.contactPerson && (
                    <div className="flex items-center gap-2 sm:gap-3">
                        <UserGroupIcon className="h-4 sm:h-5 w-4 sm:w-5 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-600 text-xs sm:text-sm">
                                {dealer.contactPerson}
                            </span>
                    </div>
                )}
            </div>

            {/* Services/Brands Preview */}
            {dealer.services && dealer.services.length > 0 && (
                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {dealer.services.slice(0, 3).map((service, idx) => (
                            <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 sm:py-1 rounded">
                                    {service}
                                </span>
                        ))}
                        {dealer.services.length > 3 && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 sm:py-1 rounded">
                                    +{dealer.services.length - 3} more
                                </span>
                        )}
                    </div>
                </div>
            )}
        </div>

    {/* Card Footer with Rating */}
    <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                    i < Math.floor(dealer.rating) ? (
                        <StarIconSolid key={i} className="h-3 sm:h-4 w-3 sm:w-4 text-yellow-400" />
                    ) : (
                        <StarIconOutline key={i} className="h-3 sm:h-4 w-3 sm:w-4 text-gray-300" />
                    )
                ))}
                <span className="ml-1.5 sm:ml-2 text-xs sm:text-sm font-medium text-gray-700">
                            {dealer.rating.toFixed(1)}
                        </span>
                {dealer.totalReviews > 0 && (
                    <span className="text-xs text-gray-500">
                                ({dealer.totalReviews} reviews)
                            </span>
                )}
            </div>
            <button className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium">
                View Details →
            </button>
        </div>
    </div>
</div>
);
};

// Dealer Detail Modal Component
const DealerDetailModal: React.FC<{
    dealer: Dealer;
    onClose: () => void;
    isOpenNow: boolean;
}> = ({ dealer, onClose, isOpenNow }) => {
    const formatDealerType = (type: string): string => {
        return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
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

    return (
        <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl w-full max-w-[calc(100%-2rem)] sm:max-w-3xl my-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="p-4 sm:p-6 border-b">
                    <div className="flex justify-between items-start">
                        <div className="flex-1 pr-2">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                                {dealer.name}
                                {dealer.isFeatured && (
                                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                        Featured Partner
                                    </span>
                                )}
                            </h2>
                            <div className="mt-2 flex flex-wrap items-center gap-2">
                                <span className={cn(
                                    'inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border',
                                    getTypeBadgeClass(dealer.type)
                                )}>
                                    {getTypeIcon(dealer.type)}
                                    {formatDealerType(dealer.type)}
                                </span>
                                <span className={cn(
                                    'inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium',
                                    isOpenNow
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-gray-100 text-gray-500'
                                )}>
                                    <ClockIcon className="h-4 w-4" />
                                    {isOpenNow ? 'Open Now' : 'Closed'}
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 p-1"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                {/* Modal Body */}
                <div className="p-4 sm:p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                    <div className="space-y-6">
                        {/* Rating */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                Customer Rating
                            </h3>
                            <div className="flex items-center gap-2">
                                {[...Array(5)].map((_, i) => (
                                    i < Math.floor(dealer.rating) ? (
                                        <StarIconSolid key={i} className="h-6 w-6 text-yellow-400" />
                                    ) : (
                                        <StarIconOutline key={i} className="h-6 w-6 text-gray-300" />
                                    )
                                ))}
                                <span className="text-lg font-semibold text-gray-700">
                                    {dealer.rating.toFixed(1)} / 5.0
                                </span>
                                {dealer.totalReviews > 0 && (
                                    <span className="text-sm text-gray-500">
                                        ({dealer.totalReviews} reviews)
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                                Contact Information
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <MapPinIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-gray-700">{dealer.address}</p>
                                        <p className="text-gray-700 font-medium">
                                            {dealer.city}, {dealer.state} - {dealer.pincode}
                                        </p>
                                        {dealer.territory && (
                                            <p className="text-sm text-gray-500 mt-1">
                                                Territory: {dealer.territory}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <PhoneIcon className="h-5 w-5 text-gray-400" />
                                    <div>
                                        <a href={`tel:${dealer.phone}`} className="text-blue-600 hover:text-blue-700 font-medium">
                                            {dealer.phone}
                                        </a>
                                        {dealer.alternatePhone && (
                                            <p className="text-sm text-gray-600">
                                                Alt: <a href={`tel:${dealer.alternatePhone}`} className="text-blue-600 hover:text-blue-700">
                                                {dealer.alternatePhone}
                                            </a>
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                                    <a href={`mailto:${dealer.email}`} className="text-blue-600 hover:text-blue-700">
                                        {dealer.email}
                                    </a>
                                </div>

                                {dealer.website && (
                                    <div className="flex items-center gap-3">
                                        <GlobeAltIcon className="h-5 w-5 text-gray-400" />
<a
                                        href={dealer.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-700"
                                        >
                                        {dealer.website}
                                    </a>
                                    </div>
                                    )}

                                {dealer.contactPerson && (
                                    <div className="flex items-center gap-3">
                                        <UserGroupIcon className="h-5 w-5 text-gray-400" />
                                        <div>
                                            <p className="text-gray-700">Contact Person: {dealer.contactPerson}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Working Hours */}
                        {dealer.workingHours && (
                            <div>
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                                    Working Hours
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {Object.entries(dealer.workingHours).map(([day, schedule]: [string, any]) => (
                                        <div key={day} className={cn(
                                            'p-2 rounded-lg border',
                                            schedule.isOpen
                                                ? 'bg-green-50 border-green-200'
                                                : 'bg-gray-50 border-gray-200'
                                        )}>
                                            <p className="text-xs font-medium text-gray-600 capitalize">
                                                {day}
                                            </p>
                                            <p className="text-sm text-gray-900">
                                                {schedule.isOpen
                                                    ? `${schedule.open} - ${schedule.close}`
                                                    : 'Closed'}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Services */}
                        {dealer.services && dealer.services.length > 0 && (
                            <div>
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                                    Services Offered
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {dealer.services.map((service, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm">
                                            {service}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Brands */}
                        {dealer.brands && dealer.brands.length > 0 && (
                            <div>
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                                    Brands Available
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {dealer.brands.map((brand, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm">
                                            {brand}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Description */}
                        {dealer.description && (
                            <div>
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                                    About
                                </h3>
                                <p className="text-gray-700">{dealer.description}</p>
                            </div>
                        )}

                        {/* Established Date */}
                        {dealer.establishedDate && (
                            <div>
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                                    Established
                                </h3>
                                <p className="text-gray-700">
                                    {new Date(dealer.establishedDate).getFullYear()}
                                    ({new Date().getFullYear() - new Date(dealer.establishedDate).getFullYear()} years of service)
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="p-4 sm:p-6 border-t bg-gray-50">
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
<a
                        href={`tel:${dealer.phone}`}
                        className="flex-1 bg-blue-600 text-white text-center py-2.5 sm:py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                        <PhoneIcon className="h-5 w-5" />
                        Call Now
                    </a>
<a
                    href={`mailto:${dealer.email}`}
                    className="flex-1 bg-gray-100 text-gray-700 text-center py-2.5 sm:py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                    <EnvelopeIcon className="h-5 w-5" />
                    Send Email
                </a>
                {dealer.latitude && dealer.longitude && (
<a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${dealer.latitude},${dealer.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-green-600 text-white text-center py-2.5 sm:py-3 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                    <MapPinIcon className="h-5 w-5" />
                    Get Directions
                    </a>
                    )}
            </div>
        </div>
</div>
</div>
);
};

export default DealerLocator;