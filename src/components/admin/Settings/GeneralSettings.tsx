// src/components/admin/Settings/GeneralSettings.tsx
import React, { useState, useEffect } from 'react';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

interface GeneralSettingsProps {
    settings: Record<string, any>;
    onSave: (data: Record<string, any>) => void;
    isLoading: boolean;
}

const GeneralSettings: React.FC<GeneralSettingsProps> = ({
                                                             settings,
                                                             onSave,
                                                             isLoading,
                                                         }) => {
    const [formData, setFormData] = useState({
        siteName: '',
        siteDescription: '',
        logo: '',
        favicon: '',
        footerText: '',
        copyrightText: '',
        googleAnalyticsId: '',
        maintenanceMode: false,
        maintenanceMessage: '',
    });

    useEffect(() => {
        setFormData({
            siteName: settings.siteName || '',
            siteDescription: settings.siteDescription || '',
            logo: settings.logo || '',
            favicon: settings.favicon || '',
            footerText: settings.footerText || '',
            copyrightText: settings.copyrightText || '',
            googleAnalyticsId: settings.googleAnalyticsId || '',
            maintenanceMode: settings.maintenanceMode || false,
            maintenanceMessage: settings.maintenanceMessage || '',
        });
    }, [settings]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Site Information</h3>
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="label">Site Name</label>
                        <input
                            type="text"
                            name="siteName"
                            value={formData.siteName}
                            onChange={handleChange}
                            className="input"
                            placeholder="IndPower"
                        />
                    </div>

                    <div>
                        <label className="label">Site Description</label>
                        <textarea
                            name="siteDescription"
                            value={formData.siteDescription}
                            onChange={handleChange}
                            rows={3}
                            className="input"
                            placeholder="Leading manufacturer of power solutions..."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="label">Logo URL</label>
                            <input
                                type="text"
                                name="logo"
                                value={formData.logo}
                                onChange={handleChange}
                                className="input"
                                placeholder="/logo.png"
                            />
                        </div>

                        <div>
                            <label className="label">Favicon URL</label>
                            <input
                                type="text"
                                name="favicon"
                                value={formData.favicon}
                                onChange={handleChange}
                                className="input"
                                placeholder="/favicon.ico"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Footer Settings</h3>
                <div className="space-y-4">
                    <div>
                        <label className="label">Footer Text</label>
                        <textarea
                            name="footerText"
                            value={formData.footerText}
                            onChange={handleChange}
                            rows={2}
                            className="input"
                            placeholder="Additional footer information..."
                        />
                    </div>

                    <div>
                        <label className="label">Copyright Text</label>
                        <input
                            type="text"
                            name="copyrightText"
                            value={formData.copyrightText}
                            onChange={handleChange}
                            className="input"
                            placeholder="© 2024 IndPower. All rights reserved."
                        />
                    </div>
                </div>
            </div>

            <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Analytics</h3>
                <div>
                    <label className="label">Google Analytics ID</label>
                    <input
                        type="text"
                        name="googleAnalyticsId"
                        value={formData.googleAnalyticsId}
                        onChange={handleChange}
                        className="input"
                        placeholder="G-XXXXXXXXXX"
                    />
                </div>
            </div>

            <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Maintenance Mode</h3>
                <div className="space-y-4">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="maintenanceMode"
                            checked={formData.maintenanceMode}
                            onChange={handleChange}
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Enable maintenance mode</span>
                    </label>

                    {formData.maintenanceMode && (
                        <div>
                            <label className="label">Maintenance Message</label>
                            <textarea
                                name="maintenanceMessage"
                                value={formData.maintenanceMessage}
                                onChange={handleChange}
                                rows={3}
                                className="input"
                                placeholder="We are currently performing maintenance. Please check back later."
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-end pt-6 border-t">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary btn-md"
                >
                    {isLoading ? (
                        <LoadingSpinner size="sm" className="text-white" />
                    ) : (
                        'Save Settings'
                    )}
                </button>
            </div>
        </form>
    );
};

export default GeneralSettings;