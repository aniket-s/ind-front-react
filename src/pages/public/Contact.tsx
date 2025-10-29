// src/pages/public/Contact.tsx
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { publicService } from '@/services/public.service';
import { useQuery } from '@tanstack/react-query';
import {
    PhoneIcon,
    EnvelopeIcon,
    MapPinIcon,
    ClockIcon,
    BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import {cn} from "@/utils";

interface FormData {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
}

const schema: yup.ObjectSchema<FormData> = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.string().optional().test('valid-phone', 'Phone must be a valid 10-digit Indian number starting with 6, 7, 8, or 9', (value) => {
        if (!value || value === '') return true; // Allow empty
        return /^[6-9][0-9]{9}$/.test(value);
    }),
    subject: yup.string().optional(),
    message: yup.string().required('Message is required').min(10, 'Message too short'),
});

const Contact: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const { data: info } = useQuery({
        queryKey: ['public-info'],
        queryFn: () => publicService.getInfo(),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setIsSubmitting(true);
        try {
            await publicService.submitContact(data);
            setIsSuccess(true);
            reset();
            toast.success('Thank you for contacting us. We will get back to you soon!');
        } catch {
            toast.error('Failed to submit. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactChannels = [
        {
            icon: PhoneIcon,
            title: "Call Us",
            subtitle: "Mon-Sat 9AM-6PM",
            value: info?.contact?.phone || "+91 123 456 7890",
            link: `tel:${info?.contact?.phone || "+91 123 456 7890"}`,
            color: "bg-blue-50 text-blue-600"
        },
        {
            icon: EnvelopeIcon,
            title: "Email Us",
            subtitle: "24/7 Support",
            value: info?.contact?.email || "info@indpower.com",
            link: `mailto:${info?.contact?.email || "info@indpower.com"}`,
            color: "bg-green-50 text-green-600"
        },

    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section with Gradient */}
            <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="relative container mx-auto px-4 py-20 md:py-28">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            Get in Touch
                        </h1>
                        <p className="text-xl text-blue-100 leading-relaxed">
                            Have questions about our products or services? Our team is here to help.
                            Reach out to us and we'll respond as soon as possible.
                        </p>
                    </div>
                </div>
                {/* Decorative Wave */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                              fill="white"/>
                    </svg>
                </div>
            </div>

            {/* Contact Channels */}
            <div className="container mx-auto px-4 py-12 -mt-20 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {contactChannels.map((channel, index) => (
                        <a
                            key={index}
                            href={channel.link}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 group hover:-translate-y-1"
                        >
                            <div className={cn(
                                "w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform",
                                channel.color
                            )}>
                                <channel.icon className="h-7 w-7" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-1">{channel.title}</h3>
                            <p className="text-sm text-gray-500 mb-2">{channel.subtitle}</p>
                            <p className="text-blue-600 font-medium group-hover:text-blue-700">
                                {channel.value}
                            </p>
                        </a>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Contact Information */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Office Locations */}
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                <BuildingOfficeIcon className="h-7 w-7 mr-3 text-blue-600" />
                                Our Offices
                            </h2>

                            {/* Head Office */}
                            <div className="mb-6">
                                <h3 className="font-semibold text-gray-800 mb-3 text-lg">Head Office</h3>
                                <div className="space-y-3">
                                    <div className="flex items-start space-x-3">
                                        <MapPinIcon className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                                        <p className="text-gray-600">
                                            {info?.contact?.address ||
                                                "IndPower India Pvt. Ltd.\nCorporate Office, Tower A\nSector 16, Noida\nUttar Pradesh - 201301"}
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <PhoneIcon className="h-5 w-5 text-gray-400" />
                                        <a href={`tel:${info?.contact?.phone || "+91 123 456 7890"}`} className="text-gray-600 hover:text-blue-600">
                                            {info?.contact?.phone || "+91 123 456 7890"}
                                        </a>
                                    </div>
                                </div>
                            </div>


                        </div>

                        {/* Business Hours */}
                        <div className="bg-blue-50 rounded-2xl p-8">
                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                                <ClockIcon className="h-6 w-6 mr-2 text-blue-600" />
                                Business Hours
                            </h3>
                            <div className="space-y-2 text-gray-700">
                                <div className="flex justify-between">
                                    <span>Monday - Friday</span>
                                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Saturday</span>
                                    <span className="font-medium">9:00 AM - 2:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Sunday</span>
                                    <span className="font-medium text-red-600">Closed</span>
                                </div>
                            </div>
                            <p className="mt-4 text-sm text-gray-600 italic">
                                *24/7 emergency support available for existing customers
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Send us a Message</h2>
                            <p className="text-gray-600 mb-8">
                                Fill out the form below and we'll get back to you within 24 hours.
                            </p>

                            {isSuccess ? (
                                <div className="text-center py-12">
                                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                                        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent Successfully!</h3>
                                    <p className="text-gray-600 mb-6">
                                        Thank you for reaching out. We'll respond to your inquiry soon.
                                    </p>
                                    <button
                                        onClick={() => setIsSuccess(false)}
                                        className="btn btn-primary btn-md"
                                    >
                                        Send Another Message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Your Name *
                                            </label>
                                            <input
                                                type="text"
                                                {...register('name')}
                                                className={cn(
                                                    'w-full px-4 py-3 rounded-xl border transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                                                    errors.name ? 'border-red-300' : 'border-gray-200 focus:border-blue-500'
                                                )}
                                                placeholder="John Doe"
                                            />
                                            {errors.name && (
                                                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                {...register('email')}
                                                className={cn(
                                                    'w-full px-4 py-3 rounded-xl border transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                                                    errors.email ? 'border-red-300' : 'border-gray-200 focus:border-blue-500'
                                                )}
                                                placeholder="john@example.com"
                                            />
                                            {errors.email && (
                                                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                {...register('phone')}
                                                className={cn(
                                                    'w-full px-4 py-3 rounded-xl border transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                                                    errors.phone ? 'border-red-300' : 'border-gray-200 focus:border-blue-500'
                                                )}
                                                placeholder="9876543210"
                                                maxLength={10}
                                            />
                                            {errors.phone && (
                                                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Subject
                                            </label>
                                            <input
                                                type="text"
                                                {...register('subject')}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Product Inquiry"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Your Message *
                                        </label>
                                        <textarea
                                            {...register('message')}
                                            rows={6}
                                            className={cn(
                                                'w-full px-4 py-3 rounded-xl border transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none',
                                                errors.message ? 'border-red-300' : 'border-gray-200 focus:border-blue-500'
                                            )}
                                            placeholder="Tell us how we can help you..."
                                        />
                                        {errors.message && (
                                            <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-gray-500">
                                            * Required fields
                                        </p>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <LoadingSpinner size="sm" className="mr-2" />
                                                    Sending...
                                                </>
                                            ) : (
                                                'Send Message'
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Contact;