
// src/pages/public/Contact.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { publicService } from '@/services/public.service';
import { useQuery } from '@tanstack/react-query';
import {
    PhoneIcon,
    EnvelopeIcon,
    MapPinIcon,
    ClockIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import {cn} from "@/utils";

const schema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.string().matches(/^[0-9]{10}$/, 'Phone must be 10 digits'),
    subject: yup.string(),
    message: yup.string().required('Message is required').min(10, 'Message too short'),
});

type FormData = yup.InferType<typeof schema>;

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

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        try {
            await publicService.submitContact(data);
            setIsSuccess(true);
            reset();
            toast.success('Thank you for contacting us. We will get back to you soon!');
        } catch (error) {
            toast.error('Failed to submit. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="container py-12">
                    <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Get in touch with us for any queries or support
                    </p>
                </div>
            </div>

            <div className="container py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Information */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-semibold mb-6">Get in Touch</h2>

                            <div className="space-y-4">
                                {info?.contact?.phone && (
                                    <div className="flex items-start space-x-3">
                                        <PhoneIcon className="h-6 w-6 text-primary-600 mt-0.5" />
                                        <div>
                                            <p className="font-medium">Phone</p>
                                            <a
                                                href={`tel:${info.contact.phone}`}
                                                className="text-gray-600 hover:text-primary-600"
                                            >
                                                {info.contact.phone}
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {info?.contact?.email && (
                                    <div className="flex items-start space-x-3">
                                        <EnvelopeIcon className="h-6 w-6 text-primary-600 mt-0.5" />
                                        <div>
                                            <p className="font-medium">Email</p>
                                            <a
                                                href={`mailto:${info.contact.email}`}
                                                className="text-gray-600 hover:text-primary-600"
                                            >
                                                {info.contact.email}
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {info?.contact?.address && (
                                    <div className="flex items-start space-x-3">
                                        <MapPinIcon className="h-6 w-6 text-primary-600 mt-0.5" />
                                        <div>
                                            <p className="font-medium">Address</p>
                                            <p className="text-gray-600">{info.contact.address}</p>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-start space-x-3">
                                    <ClockIcon className="h-6 w-6 text-primary-600 mt-0.5" />
                                    <div>
                                        <p className="font-medium">Business Hours</p>
                                        <p className="text-gray-600">Mon - Sat: 9:00 AM - 6:00 PM</p>
                                        <p className="text-gray-600">Sunday: Closed</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map or Additional Info */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h3 className="text-lg font-semibold mb-4">Why Choose IndPower?</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li>• Industry-leading warranty</li>
                                <li>• Pan-India service network</li>
                                <li>• 24/7 customer support</li>
                                <li>• Genuine spare parts</li>
                                <li>• Expert technical assistance</li>
                            </ul>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-semibold mb-6">Send us a Message</h2>

                            {isSuccess ? (
                                <div className="text-center py-12">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Message Sent!</h3>
                                    <p className="text-gray-600 mb-6">
                                        Thank you for contacting us. We'll get back to you soon.
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
                                            <label className="label">Name *</label>
                                            <input
                                                type="text"
                                                {...register('name')}
                                                className={cn('input', errors.name && 'border-red-300')}
                                            />
                                            {errors.name && (
                                                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="label">Email *</label>
                                            <input
                                                type="email"
                                                {...register('email')}
                                                className={cn('input', errors.email && 'border-red-300')}
                                            />
                                            {errors.email && (
                                                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="label">Phone</label>
                                            <input
                                                type="tel"
                                                {...register('phone')}
                                                placeholder="10 digit mobile number"
                                                className={cn('input', errors.phone && 'border-red-300')}
                                            />
                                            {errors.phone && (
                                                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="label">Subject</label>
                                            <input
                                                type="text"
                                                {...register('subject')}
                                                className="input"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="label">Message *</label>
                                        <textarea
                                            {...register('message')}
                                            rows={6}
                                            className={cn('input', errors.message && 'border-red-300')}
                                        />
                                        {errors.message && (
                                            <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="btn btn-primary btn-lg"
                                        >
                                            {isSubmitting ? (
                                                <LoadingSpinner size="sm" className="text-white" />
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