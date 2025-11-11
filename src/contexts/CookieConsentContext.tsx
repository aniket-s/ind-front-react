// src/contexts/CookieConsentContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
    CookiePreferences,
    CookieConsent,
    CookieConsentContextType,
    CONSENT_KEY,
    CONSENT_EXPIRY,
    defaultPreferences,
} from '@/types/cookie-consent.types';

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

interface CookieConsentProviderProps {
    children: ReactNode;
}

export const CookieConsentProvider: React.FC<CookieConsentProviderProps> = ({ children }) => {
    const [showBanner, setShowBanner] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);

    useEffect(() => {
        const consent = getStoredConsent();

        if (!consent || isConsentExpired(consent)) {
            setShowBanner(true);
        } else {
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

    const dismiss = () => {
        // When dismissed, only save essential cookies (same as decline non-essential)
        saveConsent(defaultPreferences);
        setShowBanner(false);
        setShowSettings(false);
    };

    const updatePreferences = (newPreferences: CookiePreferences) => {
        const prefs = {
            ...newPreferences,
            essential: true,
        };
        saveConsent(prefs);
        setShowSettings(false);
        setShowBanner(false);
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

    return (
        <CookieConsentContext.Provider
            value={{
                showBanner,
                showSettings,
                preferences,
                acceptAll,
                declineNonEssential,
                dismiss,
                updatePreferences,
                openSettings,
                closeSettings,
                hasConsent,
            }}
        >
            {children}
        </CookieConsentContext.Provider>
    );
};

export const useCookieConsent = () => {
    const context = useContext(CookieConsentContext);
    if (!context) {
        throw new Error('useCookieConsent must be used within CookieConsentProvider');
    }
    return context;
};