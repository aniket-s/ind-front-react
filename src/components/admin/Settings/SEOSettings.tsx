// src/components/admin/Settings/SEOSettings.tsx
import React, { useState, useEffect } from 'react';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

interface SEOSettingsData {
    defaultTitle: string;
    titleSeparator: string;
    defaultDescription: string;
    defaultKeywords: string;
    ogImage: string;
    twitterUsername: string;
    robotsTxt: string;
    sitemapUrl: string;
    googleVerificationCode: string;
    bingVerificationCode: string;
    schemaType: string;
}

interface SEOSettingsProps {
    settings: Partial<SEOSettingsData>;
    onSave: (data: SEOSettingsData) => void;
    isLoading: boolean;
}

const SEOSettings: React.FC<SEOSettingsProps> = ({
                                                     settings,
                                                     onSave,
                                                     isLoading,
                                                 }) => {
    const [formData, setFormData] = useState<SEOSettingsData>({
        defaultTitle: '',
        titleSeparator: '',
        defaultDescription: '',
        defaultKeywords: '',
        ogImage: '',
        twitterUsername: '',
        robotsTxt: '',
        sitemapUrl: '',
        googleVerificationCode: '',
        bingVerificationCode: '',
        schemaType: '',
    });

    useEffect(() => {
        setFormData({
            defaultTitle: settings.defaultTitle || '',
            titleSeparator: settings.titleSeparator || '|',
            defaultDescription: settings.defaultDescription || '',
            defaultKeywords: settings.defaultKeywords || '',
            ogImage: settings.ogImage || '',
            twitterUsername: settings.twitterUsername || '',
            robotsTxt: settings.robotsTxt || 'User-agent: *\nAllow: /',
            sitemapUrl: settings.sitemapUrl || '',
            googleVerificationCode: settings.googleVerificationCode || '',
            bingVerificationCode: settings.bingVerificationCode || '',
            schemaType: settings.schemaType || 'Organization',
        });
    }, [settings]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
                <h3 className="text-lg font-medium text-gray-900 mb-4">Default Meta Tags</h3>
                <div className="space-y-4">
                    <div>
                        <label className="label">Default Title</label>
                        <input
                            type="text"
                            name="defaultTitle"
                            value={formData.defaultTitle}
                            onChange={handleChange}
                            className="input"
                            placeholder="IndPower - Leading Power Solutions"
                        />
                        <p className="mt-1 text-sm text-gray-500">
                            Used when pages don't have their own title
                        </p>
                    </div>

                    <div>
                        <label className="label">Title Separator</label>
                        <select
                            name="titleSeparator"
                            value={formData.titleSeparator}
                            onChange={handleChange}
                            className="input"
                        >
                            <option value="|">|</option>
                            <option value="-">-</option>
                            <option value="•">•</option>
                            <option value="–">–</option>
                            <option value="—">—</option>
                        </select>
                    </div>

                    <div>
                        <label className="label">Default Description</label>
                        <textarea
                            name="defaultDescription"
                            value={formData.defaultDescription}
                            onChange={handleChange}
                            rows={3}
                            className="input"
                            placeholder="IndPower is a leading manufacturer of high-quality power solutions..."
                        />
                        <p className="mt-1 text-sm text-gray-500">
                            Used when pages don't have their own description (150-160 characters recommended)
                        </p>
                    </div>

                    <div>
                        <label className="label">Default Keywords</label>
                        <input
                            type="text"
                            name="defaultKeywords"
                            value={formData.defaultKeywords}
                            onChange={handleChange}
                            className="input"
                            placeholder="power solutions, generators, inverters, batteries"
                        />
                        <p className="mt-1 text-sm text-gray-500">
                            Comma-separated keywords
                        </p>
                    </div>
                </div>
            </div>

            <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Social Media SEO</h3>
                <div className="space-y-4">
                    <div>
                        <label className="label">Default OG Image</label>
                        <input
                            type="text"
                            name="ogImage"
                            value={formData.ogImage}
                            onChange={handleChange}
                            className="input"
                            placeholder="/og-image.jpg"
                        />
                        <p className="mt-1 text-sm text-gray-500">
                            Default image for social media sharing (1200x630px recommended)
                        </p>
                    </div>

                    <div>
                        <label className="label">Twitter Username</label>
                        <input
                            type="text"
                            name="twitterUsername"
                            value={formData.twitterUsername}
                            onChange={handleChange}
                            className="input"
                            placeholder="@indpower"
                        />
                    </div>
                </div>
            </div>

            <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Technical SEO</h3>
                <div className="space-y-4">
                    <div>
                        <label className="label">Robots.txt Content</label>
                        <textarea
                            name="robotsTxt"
                            value={formData.robotsTxt}
                            onChange={handleChange}
                            rows={5}
                            className="input font-mono text-sm"
                            placeholder="User-agent: *&#10;Allow: /"
                        />
                    </div>

                    <div>
                        <label className="label">Sitemap URL</label>
                        <input
                            type="url"
                            name="sitemapUrl"
                            value={formData.sitemapUrl}
                            onChange={handleChange}
                            className="input"
                            placeholder="/sitemap.xml"
                        />
                    </div>

                    <div>
                        <label className="label">Schema Type</label>
                        <select
                            name="schemaType"
                            value={formData.schemaType}
                            onChange={handleChange}
                            className="input"
                        >
                            <option value="Organization">Organization</option>
                            <option value="LocalBusiness">Local Business</option>
                            <option value="Corporation">Corporation</option>
                            <option value="Store">Store</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Site Verification</h3>
                <div className="space-y-4">
                    <div>
                        <label className="label">Google Verification Code</label>
                        <input
                            type="text"
                            name="googleVerificationCode"
                            value={formData.googleVerificationCode}
                            onChange={handleChange}
                            className="input"
                            placeholder="google-site-verification code"
                        />
                    </div>

                    <div>
                        <label className="label">Bing Verification Code</label>
                        <input
                            type="text"
                            name="bingVerificationCode"
                            value={formData.bingVerificationCode}
                            onChange={handleChange}
                            className="input"
                            placeholder="msvalidate.01 code"
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

export default SEOSettings;