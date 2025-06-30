// src/pages/admin/settings/Settings.tsx
import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiClient } from '@/services/api';
import GeneralSettings from '@/components/admin/Settings/GeneralSettings';
import ContactSettings from '@/components/admin/Settings/ContactSettings';
import SocialSettings from '@/components/admin/Settings/SocialSettings';
import SEOSettings from '@/components/admin/Settings/SEOSettings';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import {
    CogIcon,
    PhoneIcon,
    ShareIcon,
    MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { cn } from '@/utils';

// Type definitions for settings
type SettingValue = string | number | boolean | null | undefined | string[] | SettingObject;
type SettingObject = { [key: string]: SettingValue };

interface SettingUpdate {
    key: string;
    value: SettingValue;
    type: string;
}

interface SettingsData {
    general?: SettingObject;
    contact?: SettingObject;
    social?: SettingObject;
    seo?: SettingObject;
}

const Settings: React.FC = () => {
    const [activeTab, setActiveTab] = useState('general');

    const { data: settings, isLoading } = useQuery<SettingsData>({
        queryKey: ['settings'],
        queryFn: async () => {
            const { data } = await apiClient.axios.get('/settings');
            return data;
        },
    });

    const updateMutation = useMutation({
        mutationFn: async (updates: SettingUpdate[]) => {
            const { data } = await apiClient.axios.put('/settings', { settings: updates });
            return data;
        },
        onSuccess: () => {
            toast.success('Settings updated successfully');
        },
    });

    const tabs = [
        { id: 'general', label: 'General', icon: CogIcon },
        { id: 'contact', label: 'Contact', icon: PhoneIcon },
        { id: 'social', label: 'Social Media', icon: ShareIcon },
        { id: 'seo', label: 'SEO', icon: MagnifyingGlassIcon },
    ];

    if (isLoading) {
        return <LoadingSpinner />;
    }

    const handleSave = (type: string, data: Record<string, SettingValue>) => {
        const updates: SettingUpdate[] = Object.entries(data).map(([key, value]) => ({
            key,
            value,
            type,
        }));
        updateMutation.mutate(updates);
    };

    return (
        <div className="space-y-6">
            {/* Tabs */}
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm',
                                activeTab === tab.id
                                    ? 'border-primary-500 text-primary-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            )}
                        >
                            <tab.icon
                                className={cn(
                                    'mr-3 h-5 w-5',
                                    activeTab === tab.id
                                        ? 'text-primary-500'
                                        : 'text-gray-400 group-hover:text-gray-500'
                                )}
                            />
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Tab Content */}
            <div className="card">
                <div className="card-body">
                    {activeTab === 'general' && (
                        <GeneralSettings
                            settings={settings?.general || {}}
                            onSave={(data) => handleSave('general', data)}
                            isLoading={updateMutation.isPending}
                        />
                    )}
                    {activeTab === 'contact' && (
                        <ContactSettings
                            settings={settings?.contact || {}}
                            onSave={(data) => handleSave('contact', data)}
                            isLoading={updateMutation.isPending}
                        />
                    )}
                    {activeTab === 'social' && (
                        <SocialSettings
                            settings={settings?.social || {}}
                            onSave={(data) => handleSave('social', data)}
                            isLoading={updateMutation.isPending}
                        />
                    )}
                    {activeTab === 'seo' && (
                        <SEOSettings
                            settings={settings?.seo || {}}
                            onSave={(data) => handleSave('seo', data)}
                            isLoading={updateMutation.isPending}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Settings;