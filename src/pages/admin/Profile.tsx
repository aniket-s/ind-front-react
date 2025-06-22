// src/pages/admin/Profile.tsx
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { UserCircleIcon, KeyIcon } from '@heroicons/react/24/outline';
import { cn } from '@/utils';

const profileSchema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
});

const passwordSchema = yup.object({
    currentPassword: yup.string().required('Current password is required'),
    newPassword: yup.string().min(6, 'Password must be at least 6 characters').required('New password is required'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('newPassword')], 'Passwords must match')
        .required('Please confirm your password'),
});

type ProfileFormData = yup.InferType<typeof profileSchema>;
type PasswordFormData = yup.InferType<typeof passwordSchema>;

const Profile: React.FC = () => {
    const { user, updateProfile, changePassword } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [isLoading, setIsLoading] = useState(false);

    const {
        register: registerProfile,
        handleSubmit: handleProfileSubmit,
        formState: { errors: profileErrors },
    } = useForm<ProfileFormData>({
        resolver: yupResolver(profileSchema),
        defaultValues: {
            name: user?.name || '',
            email: user?.email || '',
        },
    });

    const {
        register: registerPassword,
        handleSubmit: handlePasswordSubmit,
        formState: { errors: passwordErrors },
        reset: resetPassword,
    } = useForm<PasswordFormData>({
        resolver: yupResolver(passwordSchema),
    });

    const onProfileSubmit = async (data: ProfileFormData) => {
        setIsLoading(true);
        try {
            await updateProfile(data);
        } finally {
            setIsLoading(false);
        }
    };

    const onPasswordSubmit = async (data: PasswordFormData) => {
        setIsLoading(true);
        try {
            await changePassword(data.currentPassword, data.newPassword);
            resetPassword();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl">
            {/* Tabs */}
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={cn(
                            'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm',
                            activeTab === 'profile'
                                ? 'border-primary-500 text-primary-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        )}
                    >
                        <UserCircleIcon
                            className={cn(
                                'mr-3 h-5 w-5',
                                activeTab === 'profile'
                                    ? 'text-primary-500'
                                    : 'text-gray-400 group-hover:text-gray-500'
                            )}
                        />
                        Profile Information
                    </button>
                    <button
                        onClick={() => setActiveTab('password')}
                        className={cn(
                            'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm',
                            activeTab === 'password'
                                ? 'border-primary-500 text-primary-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        )}
                    >
                        <KeyIcon
                            className={cn(
                                'mr-3 h-5 w-5',
                                activeTab === 'password'
                                    ? 'text-primary-500'
                                    : 'text-gray-400 group-hover:text-gray-500'
                            )}
                        />
                        Change Password
                    </button>
                </nav>
            </div>

            {/* Tab Content */}
            <div className="mt-6">
                {activeTab === 'profile' && (
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-6">
                                <div>
                                    <label className="label">Name</label>
                                    <input
                                        type="text"
                                        {...registerProfile('name')}
                                        className={cn('input', profileErrors.name && 'border-red-300')}
                                    />
                                    {profileErrors.name && (
                                        <p className="mt-1 text-sm text-red-600">{profileErrors.name.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="label">Email</label>
                                    <input
                                        type="email"
                                        {...registerProfile('email')}
                                        className={cn('input', profileErrors.email && 'border-red-300')}
                                    />
                                    {profileErrors.email && (
                                        <p className="mt-1 text-sm text-red-600">{profileErrors.email.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="label">Role</label>
                                    <input
                                        type="text"
                                        value={user?.role.replace('_', ' ').toUpperCase()}
                                        disabled
                                        className="input bg-gray-50"
                                    />
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="btn btn-primary btn-md"
                                    >
                                        {isLoading ? (
                                            <LoadingSpinner size="sm" className="text-white" />
                                        ) : (
                                            'Update Profile'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {activeTab === 'password' && (
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-6">
                                <div>
                                    <label className="label">Current Password</label>
                                    <input
                                        type="password"
                                        {...registerPassword('currentPassword')}
                                        className={cn('input', passwordErrors.currentPassword && 'border-red-300')}
                                    />
                                    {passwordErrors.currentPassword && (
                                        <p className="mt-1 text-sm text-red-600">{passwordErrors.currentPassword.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="label">New Password</label>
                                    <input
                                        type="password"
                                        {...registerPassword('newPassword')}
                                        className={cn('input', passwordErrors.newPassword && 'border-red-300')}
                                    />
                                    {passwordErrors.newPassword && (
                                        <p className="mt-1 text-sm text-red-600">{passwordErrors.newPassword.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="label">Confirm New Password</label>
                                    <input
                                        type="password"
                                        {...registerPassword('confirmPassword')}
                                        className={cn('input', passwordErrors.confirmPassword && 'border-red-300')}
                                    />
                                    {passwordErrors.confirmPassword && (
                                        <p className="mt-1 text-sm text-red-600">{passwordErrors.confirmPassword.message}</p>
                                    )}
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="btn btn-primary btn-md"
                                    >
                                        {isLoading ? (
                                            <LoadingSpinner size="sm" className="text-white" />
                                        ) : (
                                            'Change Password'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;