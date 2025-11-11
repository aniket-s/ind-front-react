// src/components/shared/CookieBanner.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useCookieConsent } from '@/contexts/CookieConsentContext';

const CookieBanner: React.FC = () => {
    const { showBanner, acceptAll, dismiss, openSettings } = useCookieConsent();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (showBanner) {
            // Delay to trigger fade-in animation
            const timer = setTimeout(() => setIsVisible(true), 100);
            return () => clearTimeout(timer);
        }
    }, [showBanner]);

    if (!showBanner) return null;

    const handleAccept = () => {
        setIsVisible(false);
        setTimeout(acceptAll, 300);
    };

    const handleDismiss = () => {
        setIsVisible(false);
        setTimeout(dismiss, 300);
    };

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 z-40 transform transition-all duration-500 ease-out ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            }`}
        >
            <div className="bg-white border-t border-gray-200 shadow-lg">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                        {/* Cookie Icon & Content */}
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="flex-shrink-0">
                                <span className="text-2xl">🍪</span>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    This website uses cookies that help the website function and to help us understand how to interact with it. We use these cookies to provide you with improved and customized user experience. If you continue to use the website, we assume that you are okay with it.{' '}
                                    <Link
                                        to="/cookie-policy"
                                        className="text-blue-600 hover:text-blue-700 underline font-medium whitespace-nowrap"
                                    >
                                        Learn more
                                    </Link>
                                </p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 flex-shrink-0">
                            <button
                                onClick={openSettings}
                                className="text-sm text-gray-600 hover:text-gray-800 underline font-medium hidden sm:inline"
                                aria-label="Cookie Settings"
                            >
                                Settings
                            </button>

                            <button
                                onClick={handleAccept}
                                className="px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 whitespace-nowrap"
                            >
                                Got it
                            </button>

                            <button
                                onClick={handleDismiss}
                                className="p-2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded"
                                aria-label="Dismiss"
                            >
                                <XMarkIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CookieBanner;