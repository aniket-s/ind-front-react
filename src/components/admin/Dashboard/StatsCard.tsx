// src/components/admin/Dashboard/StatsCard.tsx
import React from 'react';
import { cn } from '@/utils';

interface StatsCardProps {
    name: string;
    value: number;
    icon: React.ComponentType<{ className?: string }>;
    change: string;
    changeType: 'positive' | 'negative' | 'neutral';
}

const StatsCard: React.FC<StatsCardProps> = ({ name, value, icon: Icon, change, changeType }) => {
    const changeColors = {
        positive: 'text-green-600',
        negative: 'text-red-600',
        neutral: 'text-gray-500',
    };

    return (
        <div className="card">
            <div className="card-body">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <Icon className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                        <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">{name}</dt>
                            <dd className="flex items-baseline">
                                <div className="text-2xl font-semibold text-gray-900">{value.toLocaleString()}</div>
                                <div className={cn('ml-2 text-sm', changeColors[changeType])}>{change}</div>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsCard;
