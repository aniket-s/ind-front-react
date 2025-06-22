// src/components/admin/Settings/ContactSettings.tsx
import React, { useState, useEffect } from 'react';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { cn } from '@/utils';

interface ContactSettingsProps {
    settings: Record<string, any>;
    onSave: (data: Record<string, any>) => void;
    isLoading: boolean;
}

const ContactSettings: React.FC<ContactSettingsProps> = ({
                                                             settings,
                                                             onSave,
                                                             isLoading,
                                                         }) => {
    const [formData, setFormData] = useState({
        companyName: '',
        email: '',
        phone: '',
        alternatePhone: '',
        whatsapp: '',
        address: '',
        city: '',
        state: '',
        country: '',
        pincode: '',
        mapUrl: '',
        workingHours: '',
        workingDays: '',
    });

    useEffect(() => {
        setFormData({
            companyName: settings.companyName || '',
            email: settings.email || '',
            phone: settings.phone || '',
            alternatePhone: settings.alternatePhone || '',
            whatsapp: settings.whatsapp || '',
            address: settings.address || '',
            city: settings.city || '',
            state: settings.state || '',
            country: settings.country || '',
            pincode: settings.pincode || '',
            mapUrl: settings.mapUrl || '',
            workingHours: settings.workingHours || '',
            workingDays: settings.workingDays || '',
        });
    }, [settings]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Company Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="label">Company Name</label>
                        <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            className="input"
                            placeholder="IndPower Industries"
                        />
                    </div>

                    <div>
                        <label className="label">Contact Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="input"
                            placeholder="info@indpower.com"
                        />
                    </div>

                    <div>
                        <label className="label">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="input"
                            placeholder="+91 98765 43210"
                        />
                    </div>

                    <div>
                        <label className="label">Alternate Phone</label>
                        <input
                            type="tel"
                            name="alternatePhone"
                            value={formData.alternatePhone}
                            onChange={handleChange}
                            className="input"
                            placeholder="+91 98765 43211"
                        />
                    </div>

                    <div>
                        <label className="label">WhatsApp Number</label>
                        <input
                            type="tel"
                            name="whatsapp"
                            value={formData.whatsapp}
                            onChange={handleChange}
                            className="input"
                            placeholder="+91 98765 43210"
                        />
                    </div>
                </div>
            </div>

            <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Address Information</h3>
                <div className="space-y-4">
                    <div>
                        <label className="label">Street Address</label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            rows={3}
                            className="input"
                            placeholder="123, Industrial Area, Phase 2"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="label">City</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="input"
                                placeholder="Mumbai"
                            />
                        </div>

                        <div>
                            <label className="label">State</label>
                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                className="input"
                                placeholder="Maharashtra"
                            />
                        </div>

                        <div>
                            <label className="label">Country</label>
                            <input
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                className="input"
                                placeholder="India"
                            />
                        </div>

                        <div>
                            <label className="label">PIN Code</label>
                            <input
                                type="text"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                className="input"
                                placeholder="400001"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="label">Google Maps URL</label>
                        <input
                            type="url"
                            name="mapUrl"
                            value={formData.mapUrl}
                            onChange={handleChange}
                            className="input"
                            placeholder="https://maps.google.com/..."
                        />
                    </div>
                </div>
            </div>

            <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Business Hours</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="label">Working Hours</label>
                        <input
                            type="text"
                            name="workingHours"
                            value={formData.workingHours}
                            onChange={handleChange}
                            className="input"
                            placeholder="9:00 AM - 6:00 PM"
                        />
                    </div>

                    <div>
                        <label className="label">Working Days</label>
                        <input
                            type="text"
                            name="workingDays"
                            value={formData.workingDays}
                            onChange={handleChange}
                            className="input"
                            placeholder="Monday - Saturday"
                        />
                    </div>
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

export default ContactSettings;