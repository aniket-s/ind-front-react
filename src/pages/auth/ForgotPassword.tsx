// src/pages/auth/ForgotPassword.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

const schema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
});

type FormData = {
    email: string;
};

const ForgotPassword: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        try {
            // TODO: Implement password reset API call
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
            setIsSuccess(true);
            toast.success('Password reset instructions sent to your email');
        } catch (error) {
            toast.error('Failed to send reset instructions');
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                        <svg
                            className="h-6 w-6 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">Check your email</h3>
                    <p className="mt-2 text-sm text-gray-600">
                        We've sent password reset instructions to your email address.
                    </p>
                    <div className="mt-6">
                        <Link
                            to="/admin/login"
                            className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500"
                        >
                            <ArrowLeftIcon className="mr-2 h-4 w-4" />
                            Back to login
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900">Reset your password</h3>
                <p className="mt-1 text-sm text-gray-600">
                    Enter your email address and we'll send you instructions to reset your password.
                </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="email" className="label">
                        Email address
                    </label>
                    <div className="mt-1">
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            {...register('email')}
                            className={cn('input', errors.email && 'border-red-300')}
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <Link
                        to="/admin/login"
                        className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
                    >
                        <ArrowLeftIcon className="mr-2 h-4 w-4" />
                        Back to login
                    </Link>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn btn-primary btn-md"
                    >
                        {isLoading ? (
                            <LoadingSpinner size="sm" className="text-white" />
                        ) : (
                            'Send instructions'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ForgotPassword;