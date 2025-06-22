// src/utils/validators.ts
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneRegex = /^[\d\s\-\+\(\)]+$/;
export const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const validateEmail = (email: string): boolean => {
    return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 10;
};

export const validatePassword = (password: string): {
    isValid: boolean;
    errors: string[];
} => {
    const errors: string[] = [];

    if (password.length < 6) {
        errors.push('Password must be at least 6 characters');
    }

    if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
    }

    if (!/[0-9]/.test(password)) {
        errors.push('Password must contain at least one number');
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
};