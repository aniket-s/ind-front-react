// src/components/shared/LoadingSpinner.tsx
import React from 'react';
import { cn } from '@/utils';

interface LoadingSpinnerProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
                                                           className,
                                                           size = 'md',
                                                           fullScreen = false
                                                       }) => {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
    };

    const spinner = (
        <div className={cn('flex items-center justify-center', className)}>
            <div
                className={cn(
                    'animate-spin rounded-full border-b-2 border-primary-600',
                    sizeClasses[size]
                )}
            />
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
                {spinner}
            </div>
        );
    }

    return spinner;
};

export default LoadingSpinner;
