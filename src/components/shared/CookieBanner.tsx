// src/components/shared/CookieBanner.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { XMarkIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { useCookieConsent } from '@/contexts/CookieConsentContext';

const CookieBanner: React.FC = () => {
    const { showBanner, acceptAll, declineNonEssential, openSettings } = useCookieConsent();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (showBanner) {
            // Delay to trigger slide-up animation
            const timer = setTimeout(() => setIsVisible(true), 100);
            return () => clearTimeout(timer);
        }
    }, [showBanner]);

    if (!showBanner) return null;

    const handleAccept = () => {
        setIsVisible(false);
        setTimeout(acceptAll, 300);
    };

    const handleDecline = () => {
        setIsVisible(false);
        setTimeout(declineNonEssential, 300);
    };

    const handleSettings = () => {
        openSettings();
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                }`}
            />

            {/* Cookie Banner */}
            <div
                className={`fixed bottom-0 left-0 right-0 z-50 transform transition-transform duration-500 ease-out ${
                    isVisible ? 'translate-y-0' : 'translate-y-full'
                }`}
            >
                <div className="bg-white border-t-4 border-blue-600 shadow-2xl">
                    <div className="container mx-auto px-4 py-6 md:py-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            {/* Content */}
                            <div className="flex-1">
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="flex-shrink-0 mt-1">
                                        <svg
                                            className="w-6 h-6 text-blue-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                                            We Value Your Privacy
                                        </h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            IndPower uses cookies to enhance your browsing experience, serve
                                            personalized content, and analyze our traffic. By clicking "Accept All",
                                            you consent to our use of cookies.{' '}
                                            <Link
                                                to="/cookie-policy"
                                                className="text-blue-600 hover:text-blue-700 underline font-medium"
                                            >
                                                Learn more
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-3 md:flex-shrink-0">
                                <button
                                    onClick={handleSettings}
                                    className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    aria-label="Cookie Settings"
                                >
                                    <Cog6ToothIcon className="w-4 h-4" />
                                    <span className="hidden sm:inline">Settings</span>
                                </button>

                                <button
                                    onClick={handleDecline}
                                    className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Decline Non-Essential
                                </button>

                                <button
                                    onClick={handleAccept}
                                    className="px-6 py-2.5 text-sm font-bold text-gray-900 bg-yellow-400 rounded-lg hover:bg-yellow-300 transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                                >
                                    Accept All Cookies
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CookieBanner;