// src/types/cookie-consent.types.ts

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

export interface CookieConsentContextType {
    showBanner: boolean;
    showSettings: boolean;
    preferences: CookiePreferences;
    acceptAll: () => void;
    declineNonEssential: () => void;
    updatePreferences: (prefs: CookiePreferences) => void;
    openSettings: () => void;
    closeSettings: () => void;
    hasConsent: () => boolean;
}

export const CONSENT_KEY = 'indpower_cookie_consent';
export const CONSENT_EXPIRY = 365 * 24 * 60 * 60 * 1000; // 365 days in milliseconds

export const defaultPreferences: CookiePreferences = {
    essential: true,
    functional: false,
    analytics: false,
    marketing: false,
};

// Extend Window interface for gtag
declare global {
    interface Window {
        gtag?: (
            command: 'config' | 'set' | 'event' | 'consent',
            targetId: string,
            config?: Record<string, string | boolean | number>
        ) => void;
    }
}