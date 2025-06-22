// src/components/shared/EmptyState.tsx
import React from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

interface EmptyStateProps {
    title: string;
    message?: string;
    action?: {
        label: string;
        onClick: () => void;
    };
    icon?: React.ComponentType<{ className?: string }>;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, message, action, icon: Icon }) => {
    return (
        <div className="text-center py-12">
            {Icon && (
                <Icon className="mx-auto h-12 w-12 text-gray-400" />
            )}
            <h3 className="mt-2 text-sm font-semibold text-gray-900">{title}</h3>
            {message && <p className="mt-1 text-sm text-gray-500">{message}</p>}
            {action && (
                <div className="mt-6">
                    <button
                        type="button"
                        onClick={action.onClick}
                        className="btn btn-primary btn-md"
                    >
                        <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
                        {action.label}
                    </button>
                </div>
            )}
        </div>
    );
};

export default EmptyState;