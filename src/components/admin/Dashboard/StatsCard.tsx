// src/components/admin/Dashboard/StatsCard.tsx
import React from 'react';
import { cn } from '@/utils';
import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from '@heroicons/react/20/solid';

interface StatsCardProps {
    name: string;
    value: number;
    icon: React.ComponentType<{ className?: string }>;
    change: string;
    changeType: 'neutral' | 'positive' | 'negative';
}

const StatsCard: React.FC<StatsCardProps> = ({
                                                 name,
                                                 value,
                                                 icon: Icon,
                                                 change,
                                                 changeType
                                             }) => {
    const getChangeIcon = () => {
        switch (changeType) {
            case 'positive':
                return ArrowUpIcon;
            case 'negative':
                return ArrowDownIcon;
            default:
                return MinusIcon;
        }
    };

    const getChangeColor = () => {
        switch (changeType) {
            case 'positive':
                return 'text-green-600';
            case 'negative':
                return 'text-red-600';
            default:
                return 'text-gray-600';
        }
    };

    const ChangeIcon = getChangeIcon();

    return (
        <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <Icon className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                        <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                                {name}
                            </dt>
                            <dd>
                                <div className="text-lg font-medium text-gray-900">
                                    {value.toLocaleString()}
                                </div>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                    <span className={cn('flex items-center', getChangeColor())}>
                        <ChangeIcon className="h-4 w-4 mr-1" />
                        {change}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default StatsCard;