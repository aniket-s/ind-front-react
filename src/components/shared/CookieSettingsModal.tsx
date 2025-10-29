// src/components/shared/CookieSettingsModal.tsx
import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useCookieConsent } from '@/contexts/CookieConsentContext';
import { CookiePreferences } from '@/types/cookie-consent.types';

interface CookieCategoryProps {
    title: string;
    description: string;
    enabled: boolean;
    disabled?: boolean;
    onChange: (enabled: boolean) => void;
    icon: string;
}

const CookieCategory: React.FC<CookieCategoryProps> = ({
                                                           title,
                                                           description,
                                                           enabled,
                                                           disabled,
                                                           onChange,
                                                           icon,
                                                       }) => {
    return (
        <div className="border-b border-gray-200 last:border-b-0 py-4">
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{icon}</span>
                        <h4 className="text-base font-semibold text-gray-900">{title}</h4>
                        {disabled && (
                            <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                                Always Active
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
                </div>
                <div className="flex-shrink-0">
                    <button
                        type="button"
                        disabled={disabled}
                        onClick={() => onChange(!enabled)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            enabled ? 'bg-blue-600' : 'bg-gray-300'
                        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        role="switch"
                        aria-checked={enabled}
                        aria-label={`Toggle ${title}`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                enabled ? 'translate-x-6' : 'translate-x-1'
                            }`}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

const CookieSettingsModal: React.FC = () => {
    const { showSettings, preferences, updatePreferences, closeSettings, acceptAll } =
        useCookieConsent();
    const [localPreferences, setLocalPreferences] = useState<CookiePreferences>(preferences);

    useEffect(() => {
        setLocalPreferences(preferences);
    }, [preferences, showSettings]);

    if (!showSettings) return null;

    const handleSave = () => {
        updatePreferences(localPreferences);
    };

    const handleAcceptAll = () => {
        acceptAll();
    };

    const handleClose = () => {
        closeSettings();
    };

    const updatePreference = (key: keyof CookiePreferences, value: boolean) => {
        setLocalPreferences((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={handleClose} />

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl transform transition-all">
                    {/* Header */}
                    <div className="bg-blue-600 text-white px-6 py-5 rounded-t-2xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 id="modal-title" className="text-2xl font-bold">
                                    Cookie Settings
                                </h2>
                                <p className="text-sm text-blue-100 mt-1">
                                    Manage your cookie preferences
                                </p>
                            </div>
                            <button
                                onClick={handleClose}
                                className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
                                aria-label="Close modal"
                            >
                                <XMarkIcon className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-6 max-h-[60vh] overflow-y-auto">
                        <p className="text-sm text-gray-600 mb-6">
                            We use cookies to enhance your experience on our website. You can choose which
                            types of cookies to allow. Please note that blocking some types of cookies may
                            impact your experience on our site and the services we offer.
                        </p>

                        <div className="space-y-4">
                            <CookieCategory
                                icon="✅"
                                title="Essential Cookies"
                                description="These cookies are necessary for the website to function and cannot be switched off. They are usually only set in response to actions made by you such as setting your privacy preferences, logging in or filling in forms."
                                enabled={localPreferences.essential}
                                disabled={true}
                                onChange={() => {}}
                            />

                            <CookieCategory
                                icon="⚙️"
                                title="Functional Cookies"
                                description="These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third party providers whose services we have added to our pages."
                                enabled={localPreferences.functional}
                                onChange={(value) => updatePreference('functional', value)}
                            />

                            <CookieCategory
                                icon="📊"
                                title="Analytics Cookies"
                                description="These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us know which pages are the most and least popular and see how visitors move around the site."
                                enabled={localPreferences.analytics}
                                onChange={(value) => updatePreference('analytics', value)}
                            />

                            <CookieCategory
                                icon="🎯"
                                title="Marketing Cookies"
                                description="These cookies may be set through our site by our advertising partners. They may be used to build a profile of your interests and show you relevant ads on other sites. They work by uniquely identifying your browser and device."
                                enabled={localPreferences.marketing}
                                onChange={(value) => updatePreference('marketing', value)}
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-gray-50 px-6 py-4 rounded-b-2xl border-t border-gray-200">
                        <div className="flex flex-col sm:flex-row gap-3 justify-end">
                            <button
                                onClick={handleClose}
                                className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAcceptAll}
                                className="px-6 py-2.5 text-sm font-semibold text-blue-600 bg-blue-50 border-2 border-blue-600 rounded-lg hover:bg-blue-100 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Accept All
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-6 py-2.5 text-sm font-bold text-gray-900 bg-yellow-400 rounded-lg hover:bg-yellow-300 transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            >
                                Save Preferences
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CookieSettingsModal;