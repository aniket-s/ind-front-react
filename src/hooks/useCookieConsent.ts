// src/hooks/useCookieConsent.ts
import { useState, useEffect } from 'react';

export interface CookiePreferences {
    essential: boolean;
    functional: boolean;
    analytics: boolean;
    marketing: boolean;
}

export interface CookieConsent {
    hasConsent: boolean;
    timestamp: number;
    preferences: CookiePreferences;
}

const CONSENT_KEY = 'indpower_cookie_consent';
const CONSENT_EXPIRY = 365 * 24 * 60 * 60 * 1000; // 365 days in milliseconds

const defaultPreferences: CookiePreferences = {
    essential: true, // Always true
    functional: false,
    analytics: false,
    marketing: false,
};

export const useCookieConsent = () => {
    const [showBanner, setShowBanner] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);

    useEffect(() => {
        const consent = getStoredConsent();

        if (!consent || isConsentExpired(consent)) {
            // No consent or expired, show banner
            setShowBanner(true);
        } else {
            // Valid consent exists
            setPreferences(consent.preferences);
            applyConsent(consent.preferences);
        }
    }, []);

    const getStoredConsent = (): CookieConsent | null => {
        try {
            const stored = localStorage.getItem(CONSENT_KEY);
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (error) {
            console.error('Error reading cookie consent:', error);
        }
        return null;
    };

    const isConsentExpired = (consent: CookieConsent): boolean => {
        const now = Date.now();
        return now - consent.timestamp > CONSENT_EXPIRY;
    };

    const saveConsent = (prefs: CookiePreferences) => {
        const consent: CookieConsent = {
            hasConsent: true,
            timestamp: Date.now(),
            preferences: prefs,
        };

        try {
            localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
            setPreferences(prefs);
            applyConsent(prefs);
        } catch (error) {
            console.error('Error saving cookie consent:', error);
        }
    };

    const applyConsent = (prefs: CookiePreferences) => {
        // Initialize analytics if consent given
        if (prefs.analytics && typeof window !== 'undefined') {
            // Google Analytics
            if (window.gtag) {
                window.gtag('consent', 'update', {
                    analytics_storage: 'granted',
                });
            }
        }

        // Initialize marketing cookies if consent given
        if (prefs.marketing && typeof window !== 'undefined') {
            if (window.gtag) {
                window.gtag('consent', 'update', {
                    ad_storage: 'granted',
                    ad_user_data: 'granted',
                    ad_personalization: 'granted',
                });
            }
        }
    };

    const acceptAll = () => {
        const allAccepted: CookiePreferences = {
            essential: true,
            functional: true,
            analytics: true,
            marketing: true,
        };
        saveConsent(allAccepted);
        setShowBanner(false);
        setShowSettings(false);
    };

    const declineNonEssential = () => {
        saveConsent(defaultPreferences);
        setShowBanner(false);
        setShowSettings(false);
    };

    const updatePreferences = (newPreferences: CookiePreferences) => {
        const prefs = {
            ...newPreferences,
            essential: true, // Essential always true
        };
        saveConsent(prefs);
        setShowSettings(false);
    };

    const openSettings = () => {
        setShowSettings(true);
    };

    const closeSettings = () => {
        setShowSettings(false);
    };

    const hasConsent = (): boolean => {
        const consent = getStoredConsent();
        return consent !== null && !isConsentExpired(consent);
    };

    return {
        showBanner,
        showSettings,
        preferences,
        acceptAll,
        declineNonEssential,
        updatePreferences,
        openSettings,
        closeSettings,
        hasConsent,
    };
};

// Extend Window interface for gtag
declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
    }
}