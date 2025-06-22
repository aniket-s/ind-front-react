// src/pages/public/DealerLocator.tsx
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { publicService } from '@/services/public.service';
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import toast from 'react-hot-toast';

const DealerLocator: React.FC = () => {
    const [pincode, setPincode] = useState('');
    const [dealers, setDealers] = useState<any[]>([]);

    const searchMutation = useMutation({
        mutationFn: (pincode: string) => publicService.getDealersByPincode(pincode),
        onSuccess: (data) => {
            setDealers(data);
            if (data.length === 0) {
                toast.error('No dealers found in this area');
            }
        },
        onError: () => {
            toast.error('Failed to search dealers');
        },
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (pincode.length !== 6) {
            toast.error('Please enter a valid 6-digit pincode');
            return;
        }
        searchMutation.mutate(pincode);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="container py-12">
                    <h1 className="text-4xl font-bold text-gray-900">Find a Dealer</h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Locate authorized IndPower dealers and service centers near you
                    </p>
                </div>
            </div>

            <div className="container py-12">
                <div className="max-w-4xl mx-auto">
                    {/* Search Form */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                        <form onSubmit={handleSearch} className="flex gap-4">
                            <input
                                type="text"
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                placeholder="Enter your pincode"
                                className="input flex-1"
                                maxLength={6}
                            />
                            <button
                                type="submit"
                                disabled={searchMutation.isPending}
                                className="btn btn-primary btn-md"
                            >
                                {searchMutation.isPending ? (
                                    <LoadingSpinner size="sm" className="text-white" />
                                ) : (
                                    'Search'
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Results */}
                    {dealers.length > 0 && (
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-900">
                                {dealers.length} dealer{dealers.length !== 1 ? 's' : ''} found
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {dealers.map((dealer) => (
                                    <div key={dealer.id} className="bg-white rounded-lg shadow-sm p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {dealer.name}
                                            </h3>
                                            <span className={cn(
                                                'badge',
                                                dealer.type === 'distributor' ? 'badge-info' :
                                                    dealer.type === 'service_center' ? 'badge-warning' :
                                                        'badge-success'
                                            )}>
                        {dealer.type.replace('_', ' ')}
                      </span>
                                        </div>

                                        <div className="space-y-3 text-sm">
                                            <div className="flex items-start space-x-3">
                                                <MapPinIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                                                <div>
                                                    <p className="text-gray-600">{dealer.address}</p>
                                                    <p className="text-gray-600">
                                                        {dealer.city}, {dealer.state} - {dealer.pincode}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-3">
                                                <PhoneIcon className="h-5 w-5 text-gray-400" />
                                                <a href={`tel:${dealer.phone}`} className="text-primary-600 hover:text-primary-700">
                                                    {dealer.phone}
                                                </a>
                                            </div>

                                            <div className="flex items-center space-x-3">
                                                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                                                <a href={`mailto:${dealer.email}`} className="text-primary-600 hover:text-primary-700">
                                                    {dealer.email}
                                                </a>
                                            </div>
                                        </div>

                                        {dealer.rating > 0 && (
                                            <div className="mt-4 pt-4 border-t">
                                                <div className="flex items-center">
                                                    <div className="flex items-center">
                                                        {[...Array(5)].map((_, i) => (
                                                            <StarIcon
                                                                key={i}
                                                                className={cn(
                                                                    'h-4 w-4',
                                                                    i < Math.floor(dealer.rating)
                                                                        ? 'text-yellow-400 fill-current'
                                                                        : 'text-gray-300'
                                                                )}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="ml-2 text-sm text-gray-600">
                            {dealer.rating.toFixed(1)}
                          </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DealerLocator;
