// src/pages/public/BecomePartner.tsx
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
    BuildingOfficeIcon,
    UserIcon,
    EnvelopeIcon,
    PhoneIcon,
    GlobeAltIcon,
    BriefcaseIcon,
    ChartBarIcon,
    ShoppingCartIcon,
    CurrencyDollarIcon,
    ClockIcon,
    CheckCircleIcon,
    SparklesIcon,
    UserGroupIcon,
    TrophyIcon,
} from '@heroicons/react/24/outline';
import { partnershipService } from '@/services/partnership.service';
import {
    PartnershipEnquiry,
    MOQ_OPTIONS,
    PRODUCT_INTEREST_OPTIONS,
} from '@/types/partnership.types';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { cn } from '@/utils';

const BecomePartner: React.FC = () => {
    const [formData, setFormData] = useState<PartnershipEnquiry>({
        companyName: '',
        contactPersonName: '',
        email: '',
        phone: '',
        website: '',
        industry: '',
        moq: '',
        productOfInterest: '',
        budgetRange: '',
        timelineForPurchase: '',
    });

    const [errors, setErrors] = useState<Partial<Record<keyof PartnershipEnquiry, string>>>({});

    const mutation = useMutation({
        mutationFn: partnershipService.submitEnquiry,
        onSuccess: (data) => {
            toast.success(data.message || 'Enquiry submitted successfully! We will contact you soon.');
            // Reset form
            setFormData({
                companyName: '',
                contactPersonName: '',
                email: '',
                phone: '',
                website: '',
                industry: '',
                moq: '',
                productOfInterest: '',
                budgetRange: '',
                timelineForPurchase: '',
            });
            setErrors({});
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to submit enquiry. Please try again.');
        },
    });

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof PartnershipEnquiry, string>> = {};

        // Required fields
        if (!formData.companyName.trim()) {
            newErrors.companyName = 'Company name is required';
        }

        if (!formData.contactPersonName.trim()) {
            newErrors.contactPersonName = 'Contact person name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
            newErrors.phone = 'Invalid phone number (10 digits required)';
        }

        if (!formData.industry) {
            newErrors.industry = 'Industry is required';
        }

        if (!formData.moq) {
            newErrors.moq = 'MOQ is required';
        }

        if (!formData.productOfInterest) {
            newErrors.productOfInterest = 'Product/service of interest is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            mutation.mutate(formData);
        }
    };

    const handleChange = (field: keyof PartnershipEnquiry, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        // Clear error for this field
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-6">
                            <SparklesIcon className="h-5 w-5" />
                            <span className="text-sm font-medium">Partnership Opportunities</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
                            Become a Business Partner
                        </h1>
                        <p className="text-lg sm:text-xl text-blue-100 mb-8 leading-relaxed">
                            Join hands with IndPower and grow your business with India's trusted power backup solutions.
                            Partner with us for exclusive benefits, competitive pricing, and comprehensive support.
                        </p>

                        {/* Benefits Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                                <TrophyIcon className="h-8 w-8 mx-auto mb-3" />
                                <h3 className="font-semibold mb-2 text-base sm:text-lg">Premium Products</h3>
                                <p className="text-sm text-blue-100">Access to high-quality inverters, batteries & solar solutions</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                                <UserGroupIcon className="h-8 w-8 mx-auto mb-3" />
                                <h3 className="font-semibold mb-2 text-base sm:text-lg">Dedicated Support</h3>
                                <p className="text-sm text-blue-100">Expert technical assistance & business development support</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                                <CheckCircleIcon className="h-8 w-8 mx-auto mb-3" />
                                <h3 className="font-semibold mb-2 text-base sm:text-lg">Competitive Margins</h3>
                                <p className="text-sm text-blue-100">Attractive pricing structure with volume incentives</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                                Partnership Enquiry Form
                            </h2>
                            <p className="text-gray-600">
                                Fill in the details below and our team will reach out to you within 24 hours
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Two Column Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Company Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Company Name <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div
                                            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <BuildingOfficeIcon className="h-5 w-5 text-gray-400"/>
                                        </div>
                                        <input
                                            type="text"
                                            value={formData.companyName}
                                            onChange={(e) => handleChange('companyName', e.target.value)}
                                            placeholder="Company Name"
                                            className={cn(
                                                'w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors',
                                                errors.companyName
                                                    ? 'border-red-300 focus:ring-red-500'
                                                    : 'border-gray-300'
                                            )}
                                        />
                                    </div>
                                    {errors.companyName && (
                                        <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>
                                    )}
                                </div>

                                {/* Contact Person Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name Of The Contact Person <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div
                                            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <UserIcon className="h-5 w-5 text-gray-400"/>
                                        </div>
                                        <input
                                            type="text"
                                            value={formData.contactPersonName}
                                            onChange={(e) => handleChange('contactPersonName', e.target.value)}
                                            placeholder="Full Name Of The Contact Person"
                                            className={cn(
                                                'w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors',
                                                errors.contactPersonName
                                                    ? 'border-red-300 focus:ring-red-500'
                                                    : 'border-gray-300'
                                            )}
                                        />
                                    </div>
                                    {errors.contactPersonName && (
                                        <p className="mt-1 text-sm text-red-600">{errors.contactPersonName}</p>
                                    )}
                                </div>

                                {/* Business Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Business Email Address <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div
                                            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <EnvelopeIcon className="h-5 w-5 text-gray-400"/>
                                        </div>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleChange('email', e.target.value)}
                                            placeholder="Business Email Address"
                                            className={cn(
                                                'w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors',
                                                errors.email
                                                    ? 'border-red-300 focus:ring-red-500'
                                                    : 'border-gray-300'
                                            )}
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                    )}
                                </div>

                                {/* Phone Number */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div
                                            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <PhoneIcon className="h-5 w-5 text-gray-400"/>
                                        </div>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => handleChange('phone', e.target.value)}
                                            placeholder="Phone Number"
                                            className={cn(
                                                'w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors',
                                                errors.phone
                                                    ? 'border-red-300 focus:ring-red-500'
                                                    : 'border-gray-300'
                                            )}
                                        />
                                    </div>
                                    {errors.phone && (
                                        <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                                    )}
                                </div>

                                {/* Company Website */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Company Website
                                    </label>
                                    <div className="relative">
                                        <div
                                            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <GlobeAltIcon className="h-5 w-5 text-gray-400"/>
                                        </div>
                                        <input
                                            type="url"
                                            value={formData.website}
                                            onChange={(e) => handleChange('website', e.target.value)}
                                            placeholder="Company Website"
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Industry */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Industry <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div
                                            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <BriefcaseIcon className="h-5 w-5 text-gray-400"/>
                                        </div>
                                        <input
                                            type="text"
                                            value={formData.industry}
                                            onChange={(e) => handleChange('industry', e.target.value)}
                                            placeholder="Industry"
                                            className={cn(
                                                'w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors',
                                                errors.industry
                                                    ? 'border-red-300 focus:ring-red-500'
                                                    : 'border-gray-300'
                                            )}
                                        />
                                    </div>
                                    {errors.industry && (
                                        <p className="mt-1 text-sm text-red-600">{errors.industry}</p>
                                    )}
                                </div>

                                {/* MOQ */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        MOQ <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div
                                            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <ChartBarIcon className="h-5 w-5 text-gray-400"/>
                                        </div>
                                        <select
                                            value={formData.moq}
                                            onChange={(e) => handleChange('moq', e.target.value)}
                                            className={cn(
                                                'w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors appearance-none bg-white',
                                                errors.moq
                                                    ? 'border-red-300 focus:ring-red-500'
                                                    : 'border-gray-300'
                                            )}
                                        >
                                            <option value="">MOQ</option>
                                            {MOQ_OPTIONS.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {errors.moq && (
                                        <p className="mt-1 text-sm text-red-600">{errors.moq}</p>
                                    )}
                                </div>

                                {/* Product or Service of Interest */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Product or service of interest <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div
                                            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <ShoppingCartIcon className="h-5 w-5 text-gray-400"/>
                                        </div>
                                        <select
                                            value={formData.productOfInterest}
                                            onChange={(e) => handleChange('productOfInterest', e.target.value)}
                                            className={cn(
                                                'w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors appearance-none bg-white',
                                                errors.productOfInterest
                                                    ? 'border-red-300 focus:ring-red-500'
                                                    : 'border-gray-300'
                                            )}
                                        >
                                            <option value="">Product or service of interest</option>
                                            {PRODUCT_INTEREST_OPTIONS.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {errors.productOfInterest && (
                                        <p className="mt-1 text-sm text-red-600">{errors.productOfInterest}</p>
                                    )}
                                </div>

                                {/* Budget Range */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Budget Range
                                    </label>
                                    <div className="relative">
                                        <div
                                            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <CurrencyDollarIcon className="h-5 w-5 text-gray-400"/>
                                        </div>
                                        <input
                                            type="text"
                                            value={formData.budgetRange}
                                            onChange={(e) => handleChange('budgetRange', e.target.value)}
                                            placeholder="Budget Range"
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Timeline For Purchase */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Timeline For Purchase
                                    </label>
                                    <div className="relative">
                                        <div
                                            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <ClockIcon className="h-5 w-5 text-gray-400"/>
                                        </div>
                                        <input
                                            type="text"
                                            value={formData.timelineForPurchase}
                                            onChange={(e) => handleChange('timelineForPurchase', e.target.value)}
                                            placeholder="Timeline For Purchase"
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={mutation.isPending}
                                    className="w-full bg-gradient-to-r from-[#e1a038] via-[#efdd71] via-[#f7f0aa] via-[#ebda73] to-[#f7d89f] text-black px-6 py-4 rounded-full font-bold text-lg hover:from-[#c88a2f] hover:to-[#e8c389] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {mutation.isPending ? (
                                        <>
                                            <LoadingSpinner size="sm"/>
                                            <span>Submitting...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span style={{ color: "#000"}}>Submit</span>
                                            <CheckCircleIcon className="h-6 w-6 text-black"/>
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Privacy Notice */}
                            <p className="text-sm text-gray-500 text-center">
                                By submitting this form, you agree to our{' '}
                                <a href="/privacy" className="text-blue-600 hover:text-blue-700 underline">
                                    Privacy Policy
                                </a>{' '}
                                and{' '}
                                <a href="/terms" className="text-blue-600 hover:text-blue-700 underline">
                                    Terms & Conditions
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BecomePartner;