// src/pages/admin/Dashboard.tsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '@/services/dashboard.service';
import StatsCard from '@/components/admin/Dashboard/StatsCard';
import ContactTrendChart from '@/components/admin/Dashboard/ContactTrendChart';
import CategoryProductChart from '@/components/admin/Dashboard/CategoryProductChart';
import RecentContacts from '@/components/admin/Dashboard/RecentContacts';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import {
    CubeIcon,
    TagIcon,
    EnvelopeIcon,
    ExclamationTriangleIcon,

} from '@heroicons/react/24/outline';

const Dashboard: React.FC = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['dashboard-stats'],
        queryFn: () => dashboardService.getStats(),
    });

    if (isLoading) {
        return <LoadingSpinner />;
    }

    const stats = [
        {
            name: 'Total Products',
            value: data?.stats.totalProducts || 0,
            icon: CubeIcon,
            change: `${data?.stats.activeProducts || 0} active`,
            changeType: 'neutral' as const,
        },
        {
            name: 'Categories',
            value: data?.stats.totalCategories || 0,
            icon: TagIcon,
            change: 'All active',
            changeType: 'positive' as const,
        },
        {
            name: 'Total Contacts',
            value: data?.stats.totalContacts || 0,
            icon: EnvelopeIcon,
            change: `${data?.stats.newContacts || 0} new today`,
            changeType: data?.stats.newContacts ? 'positive' : 'neutral' as const,
        },
        {
            name: 'Pending Contacts',
            value: data?.stats.pendingContacts || 0,
            icon: ExclamationTriangleIcon,
            change: 'Needs attention',
            changeType: data?.stats.pendingContacts > 0 ? 'negative' : 'positive' as const,
        },
    ];

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <StatsCard key={stat.name} {...stat} />
                ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ContactTrendChart data={data?.contactTrend || []} />
                <CategoryProductChart data={data?.productsByCategory || []} />
            </div>

            {/* Recent Activity */}
            <RecentContacts />
        </div>
    );
};

export default Dashboard;
