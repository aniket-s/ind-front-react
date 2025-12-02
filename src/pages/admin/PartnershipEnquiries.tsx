// src/pages/admin/PartnershipEnquiries.tsx
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
    MagnifyingGlassIcon,
    FunnelIcon,
    ArrowDownTrayIcon,
    TrashIcon,
    EyeIcon
} from '@heroicons/react/24/outline';
import { partnershipService } from '@/services/partnership.service';
import { PartnershipEnquiry, PARTNERSHIP_STATUS_OPTIONS } from '@/types/partnership.types';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { cn } from '@/utils';
import { formatDate } from '@/utils';
import PartnershipEnquiryDetail from './PartnershipEnquiryDetail';

const PartnershipEnquiries: React.FC = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [selectedEnquiry, setSelectedEnquiry] = useState<PartnershipEnquiry | null>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    const queryClient = useQueryClient();

    // Fetch enquiries
    const { data, isLoading } = useQuery({
        queryKey: ['partnership-enquiries', page, search, statusFilter],
        queryFn: () => partnershipService.getEnquiries({
            page,
            limit: 10,
            search,
            status: statusFilter || undefined
        })
    });

    // Fetch stats
    const { data: stats } = useQuery({
        queryKey: ['partnership-stats'],
        queryFn: () => partnershipService.getStats()
    });

    // Delete mutation
    const deleteMutation = useMutation({
        mutationFn: partnershipService.deleteEnquiry,
        onSuccess: () => {
            toast.success('Enquiry deleted successfully');
            queryClient.invalidateQueries({ queryKey: ['partnership-enquiries'] });
            queryClient.invalidateQueries({ queryKey: ['partnership-stats'] });
        },
        onError: () => {
            toast.error('Failed to delete enquiry');
        }
    });

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this enquiry?')) {
            deleteMutation.mutate(id);
        }
    };

    const handleViewDetail = (enquiry: PartnershipEnquiry) => {
        setSelectedEnquiry(enquiry);
        setIsDetailModalOpen(true);
    };

    const handleExport = async () => {
        try {
            const blob = await partnershipService.exportEnquiries({ status: statusFilter || undefined });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `partnership-enquiries-${Date.now()}.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            toast.success('Export successful');
        } catch (error) {
            console.log(error);
            toast.error('Failed to export enquiries');
        }
    };

    const getStatusBadgeColor = (status: string) => {
        const statusConfig = PARTNERSHIP_STATUS_OPTIONS.find(s => s.value === status);
        const colors: Record<string, string> = {
            blue: 'bg-blue-100 text-blue-800',
            yellow: 'bg-yellow-100 text-yellow-800',
            purple: 'bg-purple-100 text-purple-800',
            green: 'bg-green-100 text-green-800',
            red: 'bg-red-100 text-red-800',
            teal: 'bg-teal-100 text-teal-800'
        };
        return colors[statusConfig?.color || 'blue'];
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            {stats && (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <dt className="text-sm font-medium text-gray-500 truncate">Total Enquiries</dt>
                                    <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.total}</dd>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <dt className="text-sm font-medium text-gray-500 truncate">New</dt>
                                    <dd className="mt-1 text-3xl font-semibold text-blue-600">{stats.new}</dd>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <dt className="text-sm font-medium text-gray-500 truncate">Reviewing</dt>
                                    <dd className="mt-1 text-3xl font-semibold text-yellow-600">{stats.reviewing}</dd>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <dt className="text-sm font-medium text-gray-500 truncate">Converted</dt>
                                    <dd className="mt-1 text-3xl font-semibold text-teal-600">{stats.converted}</dd>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Filters and Actions */}
            <div className="bg-white shadow rounded-lg p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by company, name, email..."
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    {/* Status Filter */}
                    <div className="sm:w-48">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FunnelIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            >
                                <option value="">All Status</option>
                                {PARTNERSHIP_STATUS_OPTIONS.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Export Button */}
                    <button
                        onClick={handleExport}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                        <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                        Export
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Company
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Contact Person
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Industry
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                MOQ
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {data?.enquiries.map((enquiry) => (
                            <tr key={enquiry.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        {enquiry.companyName}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{enquiry.contactPersonName}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{enquiry.email}</div>
                                    <div className="text-sm text-gray-500">{enquiry.phone}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {enquiry.industry}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {enquiry.moq}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={cn(
                                            'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                                            getStatusBadgeColor(enquiry.status)
                                        )}>
                                            {PARTNERSHIP_STATUS_OPTIONS.find(s => s.value === enquiry.status)?.label}
                                        </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {formatDate(enquiry.createdAt)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => handleViewDetail(enquiry)}
                                        className="text-primary-600 hover:text-primary-900 mr-4"
                                    >
                                        <EyeIcon className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(enquiry.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {data && data.totalPages > 1 && (
                    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                        <div className="flex-1 flex justify-between sm:hidden">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setPage(p => Math.min(data.totalPages, p + 1))}
                                disabled={page === data.totalPages}
                                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">{(page - 1) * 10 + 1}</span> to{' '}
                                    <span className="font-medium">
                                        {Math.min(page * 10, data.totalEnquiries)}
                                    </span>{' '}
                                    of <span className="font-medium">{data.totalEnquiries}</span> results
                                </p>
                            </div>
                            <div>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                    <button
                                        onClick={() => setPage(p => Math.max(1, p - 1))}
                                        disabled={page === 1}
                                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={() => setPage(p => Math.min(data.totalPages, p + 1))}
                                        disabled={page === data.totalPages}
                                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        Next
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Detail Modal */}
            {selectedEnquiry && (
                <PartnershipEnquiryDetail
                    enquiry={selectedEnquiry}
                    isOpen={isDetailModalOpen}
                    onClose={() => {
                        setIsDetailModalOpen(false);
                        setSelectedEnquiry(null);
                    }}
                    onUpdate={() => {
                        queryClient.invalidateQueries({ queryKey: ['partnership-enquiries'] });
                        queryClient.invalidateQueries({ queryKey: ['partnership-stats'] });
                    }}
                />
            )}
        </div>
    );
};

export default PartnershipEnquiries;