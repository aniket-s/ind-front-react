import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dealersService } from '@/services/dealers.service';
import { Dealer } from '@/types';
import { AxiosError } from 'axios';
import DealerTable from '@/components/admin/Dealers/DealerTable';
import Pagination from '@/components/shared/Pagination';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import Modal from '@/components/shared/Modal';
import DealerForm from '@/components/admin/Dealers/DealerForm';
import toast from 'react-hot-toast';
import {
    PlusIcon,
    ArrowDownTrayIcon,
    ArrowUpTrayIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@/utils';

interface ApiErrorResponse {
    message?: string;
    error?: string;
}

const DealerList: React.FC = () => {
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({
        type: '',
        state: '',
        city: '',
        isActive: '',
    });
    const [showFilters, setShowFilters] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [dealerToDelete, setDealerToDelete] = useState<string | null>(null);
    const [showImportModal, setShowImportModal] = useState(false);
    const [importFile, setImportFile] = useState<File | null>(null);
    const [editingDealer, setEditingDealer] = useState<string | null>(null);
    const [showFormModal, setShowFormModal] = useState(false);

    const { data, isLoading } = useQuery({
        queryKey: ['dealers', page, search, filters],
        queryFn: () =>
            dealersService.getDealers({
                page,
                limit: 20,
                search,
                ...filters,
                isActive: filters.isActive === '' ? undefined : filters.isActive === 'true',
            }),
    });

    const handleDownloadTemplate = () => {
        const csvContent = `name,type,email,phone,alternatePhone,contactPerson,address,city,state,pincode,website,territory,services,brands,description
Sample Dealer,dealer,dealer@example.com,9876543210,9876543211,John Doe,"123 Main Street, Area Name",Mumbai,Maharashtra,400001,https://example.com,South Mumbai,"Sales,Installation,Service","IndPower,PowerMax","Leading dealer with 10 years of experience"
Sample Distributor,distributor,distributor@example.com,9876543220,,Jane Smith,"456 Business Park",Delhi,Delhi,110001,https://distributor.com,North Delhi,"Wholesale,Distribution","IndPower","Authorized distributor for North India"
Sample Service Center,service_center,service@example.com,9876543230,,Service Manager,"789 Industrial Area",Bangalore,Karnataka,560001,,Central Bangalore,"Repair,Maintenance,Installation","IndPower,PowerMax","Factory authorized service center"`;

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'dealer-import-template.csv';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    };

    const deleteMutation = useMutation({
        mutationFn: (id: string) => dealersService.deleteDealer(id),
        onSuccess: () => {
            toast.success('Dealer deleted successfully');
            queryClient.invalidateQueries({ queryKey: ['dealers'] });
            setDealerToDelete(null);
        },
        onError: (error: AxiosError<ApiErrorResponse>) => {
            const message = error.response?.data?.message || 'Failed to delete dealer';
            toast.error(message);
        },
    });

    const toggleStatusMutation = useMutation({
        mutationFn: (id: string) => dealersService.toggleDealerStatus(id),
        onSuccess: () => {
            toast.success('Status updated successfully');
            queryClient.invalidateQueries({ queryKey: ['dealers'] });
        },
        onError: (error: AxiosError<ApiErrorResponse>) => {
            const message = error.response?.data?.message || 'Failed to update status';
            toast.error(message);
        },
    });

    const bulkStatusMutation = useMutation({
        mutationFn: ({ ids, isActive }: { ids: string[]; isActive: boolean }) =>
            dealersService.bulkUpdateStatus(ids, isActive),
        onSuccess: () => {
            toast.success('Status updated for selected dealers');
            queryClient.invalidateQueries({ queryKey: ['dealers'] });
            setSelectedIds([]);
        },
        onError: (error: AxiosError<ApiErrorResponse>) => {
            const message = error.response?.data?.message || 'Failed to update status';
            toast.error(message);
        },
    });

    const importMutation = useMutation({
        mutationFn: (file: File) => dealersService.importDealers(file),
        onSuccess: (result) => {
            toast.success(`Imported ${result.success} dealers successfully`);
            if (result.failed > 0) {
                toast.error(`Failed to import ${result.failed} dealers`);
            }
            queryClient.invalidateQueries({ queryKey: ['dealers'] });
            setShowImportModal(false);
            setImportFile(null);
        },
        onError: (error: AxiosError<ApiErrorResponse>) => {
            const message = error.response?.data?.message || 'Failed to import dealers';
            toast.error(message);
        },
    });

    const saveDealerMutation = useMutation({
        mutationFn: async (formData: FormData) => {
            if (editingDealer) {
                return dealersService.updateDealer(editingDealer, formData);
            }
            return dealersService.createDealer(formData);
        },
        onSuccess: () => {
            toast.success(`Dealer ${editingDealer ? 'updated' : 'created'} successfully`);
            queryClient.invalidateQueries({ queryKey: ['dealers'] });
            setShowFormModal(false);
            setEditingDealer(null);
        },
        onError: (error: AxiosError<ApiErrorResponse>) => {
            const message = error.response?.data?.message ||
                `Failed to ${editingDealer ? 'update' : 'create'} dealer`;
            toast.error(message);
        },
    });

    const handleExport = async () => {
        try {
            const blob = await dealersService.exportDealers(filters);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `dealers-${new Date().toISOString().split('T')[0]}.csv`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
            toast.success('Dealers exported successfully');
        } catch (error) {
            toast.error('Failed to export dealers');
        }
    };

    const handleImport = () => {
        if (importFile) {
            importMutation.mutate(importFile);
        }
    };

    const handleSelectOne = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (selectedIds.length === data?.dealers.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(data?.dealers.map((d) => d.id) || []);
        }
    };

    const handleViewDealer = (dealer: Dealer) => {
        // Implement view modal or navigate to detail page
        console.log('View dealer:', dealer);
        // You can add a view modal state here if needed
    };

    const indianStates = [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
        'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
        'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
        'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
        'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
        'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Chandigarh'
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dealers Management</h1>
                    <p className="text-sm text-gray-600 mt-1">
                        Manage dealers, distributors, and service centers
                    </p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setShowImportModal(true)}
                        className="btn btn-outline btn-sm"
                    >
                        <ArrowUpTrayIcon className="h-4 w-4 mr-1" />
                        Import
                    </button>
                    <button onClick={handleExport} className="btn btn-outline btn-sm">
                        <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                        Export
                    </button>
                    <button
                        onClick={() => {
                            setEditingDealer(null);
                            setShowFormModal(true);
                        }}
                        className="btn btn-primary btn-sm"
                    >
                        <PlusIcon className="h-4 w-4 mr-1" />
                        Add Dealer
                    </button>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="card">
                <div className="card-body">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search by name, email, phone, city, or pincode..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="input pl-10 w-full"
                                />
                            </div>
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={cn(
                                'btn btn-outline btn-sm',
                                showFilters && 'btn-primary'
                            )}
                        >
                            <FunnelIcon className="h-4 w-4 mr-1" />
                            Filters
                        </button>
                    </div>

                    {showFilters && (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 pt-4 border-t">
                            <div>
                                <label className="label text-sm">Type</label>
                                <select
                                    value={filters.type}
                                    onChange={(e) =>
                                        setFilters({ ...filters, type: e.target.value })
                                    }
                                    className="input input-sm"
                                >
                                    <option value="">All Types</option>
                                    <option value="dealer">Dealer</option>
                                    <option value="distributor">Distributor</option>
                                    <option value="service_center">Service Center</option>
                                </select>
                            </div>
                            <div>
                                <label className="label text-sm">State</label>
                                <select
                                    value={filters.state}
                                    onChange={(e) =>
                                        setFilters({ ...filters, state: e.target.value })
                                    }
                                    className="input input-sm"
                                >
                                    <option value="">All States</option>
                                    {indianStates.map((state) => (
                                        <option key={state} value={state}>
                                            {state}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="label text-sm">City</label>
                                <input
                                    type="text"
                                    value={filters.city}
                                    onChange={(e) =>
                                        setFilters({ ...filters, city: e.target.value })
                                    }
                                    className="input input-sm"
                                    placeholder="Enter city"
                                />
                            </div>
                            <div>
                                <label className="label text-sm">Status</label>
                                <select
                                    value={filters.isActive}
                                    onChange={(e) =>
                                        setFilters({ ...filters, isActive: e.target.value })
                                    }
                                    className="input input-sm"
                                >
                                    <option value="">All Status</option>
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Bulk Actions */}
            {selectedIds.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-blue-700">
                            {selectedIds.length} dealer(s) selected
                        </span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => bulkStatusMutation.mutate({ ids: selectedIds, isActive: true })}
                                className="btn btn-sm btn-success"
                            >
                                Activate
                            </button>
                            <button
                                onClick={() => bulkStatusMutation.mutate({ ids: selectedIds, isActive: false })}
                                className="btn btn-sm btn-danger"
                            >
                                Deactivate
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Table */}
            <div className="card">
                <div className="card-body">
                    {isLoading ? (
                        <LoadingSpinner />
                    ) : (
                        <>
                            <DealerTable
                                dealers={data?.dealers || []}
                                onEdit={(id) => {
                                    setEditingDealer(id);
                                    setShowFormModal(true);
                                }}
                                onDelete={(id) => setDealerToDelete(id)}
                                onToggleStatus={(id) => toggleStatusMutation.mutate(id)}
                                onView={handleViewDealer}
                                selectedIds={selectedIds}
                                onSelectOne={handleSelectOne}
                                onSelectAll={handleSelectAll}
                            />
                            {data && data.totalPages > 1 && (
                                <div className="mt-6">
                                    <Pagination
                                        currentPage={page}
                                        totalPages={data.totalPages}
                                        onPageChange={setPage}
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Delete Confirmation */}
            <ConfirmDialog
                isOpen={!!dealerToDelete}
                onClose={() => setDealerToDelete(null)}
                onConfirm={() => dealerToDelete && deleteMutation.mutate(dealerToDelete)}
                title="Delete Dealer"
                message="Are you sure you want to delete this dealer? This action cannot be undone."
                type="danger"
            />

            {/* Import Modal */}
            <Modal
                isOpen={showImportModal}
                onClose={() => {
                    setShowImportModal(false);
                    setImportFile(null);
                }}
                title="Import Dealers"
                size="md"
            >
                <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                        Upload a CSV or Excel file with dealer information.
                    </p>

                    <button
                        onClick={handleDownloadTemplate}
                        className="text-sm text-blue-600 hover:text-blue-700 underline"
                    >
                        Download Import Template
                    </button>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                        <input
                            type="file"
                            accept=".csv,.xlsx,.xls"
                            onChange={(e) => setImportFile(e.target.files?.[0] || null)}
                            className="w-full"
                        />
                    </div>

                    <div className="bg-blue-50 rounded p-3">
                        <p className="text-xs text-blue-700 font-medium mb-2">Required columns:</p>
                        <p className="text-xs text-blue-600">
                            name, email, phone, address, city, state, pincode
                        </p>
                        <p className="text-xs text-blue-700 font-medium mt-2 mb-1">Optional columns:</p>
                        <p className="text-xs text-blue-600">
                            type (dealer/distributor/service_center), contactPerson, alternatePhone, website, territory, services (comma-separated), brands (comma-separated), description
                        </p>
                        <p className="text-xs text-red-600 mt-2">
                            Note: Default type is 'dealer' if not specified
                        </p>
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            onClick={() => {
                                setShowImportModal(false);
                                setImportFile(null);
                            }}
                            className="btn btn-outline btn-sm"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleImport}
                            disabled={!importFile || importMutation.isPending}
                            className="btn btn-primary btn-sm"
                        >
                            {importMutation.isPending ? 'Importing...' : 'Import'}
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Add/Edit Form Modal */}
            <Modal
                isOpen={showFormModal}
                onClose={() => {
                    setShowFormModal(false);
                    setEditingDealer(null);
                }}
                title={editingDealer ? 'Edit Dealer' : 'Add New Dealer'}
                size="xl"
            >
                {editingDealer ? (
                    <DealerFormWrapper
                        dealerId={editingDealer}
                        onSubmit={async (formData) => {
                            await saveDealerMutation.mutateAsync(formData);
                        }}
                        onCancel={() => {
                            setShowFormModal(false);
                            setEditingDealer(null);
                        }}
                        isLoading={saveDealerMutation.isPending}
                    />
                ) : (
                    <DealerForm
                        onSubmit={async (formData) => {
                            await saveDealerMutation.mutateAsync(formData);
                        }}
                        onCancel={() => {
                            setShowFormModal(false);
                            setEditingDealer(null);
                        }}
                        isLoading={saveDealerMutation.isPending}
                    />
                )}
            </Modal>
        </div>
    );
};

// Wrapper component to load dealer data for editing
const DealerFormWrapper: React.FC<{
    dealerId: string;
    onSubmit: (formData: FormData) => Promise<void>;
    onCancel: () => void;
    isLoading: boolean;
}> = ({ dealerId, onSubmit, onCancel, isLoading }) => {
    const { data: dealer, isLoading: loadingDealer } = useQuery({
        queryKey: ['dealer', dealerId],
        queryFn: () => dealersService.getDealer(dealerId),
    });

    if (loadingDealer) {
        return <LoadingSpinner />;
    }

    return (
        <DealerForm
            dealer={dealer}
            onSubmit={onSubmit}
            onCancel={onCancel}
            isLoading={isLoading}
        />
    );
};

export default DealerList;