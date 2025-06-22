// src/pages/admin/contacts/ContactList.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/services/api';
import { ContactsResponse } from '@/types';
import { useDebounce } from '@/hooks/useDebounce';
import ContactTable from '@/components/admin/Contacts/ContactTable';
import ContactFilters from '@/components/admin/Contacts/ContactFilters';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import Pagination from '@/components/shared/Pagination';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const ContactList: React.FC = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState<string>('');
    const [deleteContact, setDeleteContact] = useState<string | null>(null);
    const debouncedSearch = useDebounce(search, 300);

    const { data, isLoading } = useQuery({
        queryKey: ['contacts', { page, search: debouncedSearch, status }],
        queryFn: async () => {
            const { data } = await apiClient.axios.get<ContactsResponse>('/contacts', {
                params: {
                    page,
                    limit: 10,
                    search: debouncedSearch,
                    status: status || undefined,
                },
            });
            return data;
        },
    });

    const updateStatusMutation = useMutation({
        mutationFn: async ({ id, status, notes }: { id: string; status: string; notes?: string }) => {
            const { data } = await apiClient.axios.put(`/contacts/${id}/status`, { status, notes });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contacts'] });
            toast.success('Contact status updated');
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const { data } = await apiClient.axios.delete(`/contacts/${id}`);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contacts'] });
            toast.success('Contact deleted successfully');
            setDeleteContact(null);
        },
    });

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1 max-w-lg">
                    <div className="relative">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search contacts..."
                            className="input pl-10"
                        />
                        <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                </div>
                <ContactFilters
                    status={status}
                    onStatusChange={setStatus}
                />
            </div>

            {/* Table */}
            <div className="card">
                {isLoading ? (
                    <div className="card-body">
                        <LoadingSpinner />
                    </div>
                ) : (
                    <>
                        <ContactTable
                            contacts={data?.contacts || []}
                            onView={(id) => navigate(`/admin/contacts/${id}`)}
                            onUpdateStatus={(id, status) => updateStatusMutation.mutate({ id, status })}
                            onDelete={(id) => setDeleteContact(id)}
                        />
                        {data && data.totalPages > 1 && (
                            <div className="px-6 py-4 border-t">
                                <Pagination
                                    currentPage={data.currentPage}
                                    totalPages={data.totalPages}
                                    onPageChange={setPage}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Delete Confirmation */}
            <ConfirmDialog
                isOpen={!!deleteContact}
                onClose={() => setDeleteContact(null)}
                onConfirm={() => deleteContact && deleteMutation.mutate(deleteContact)}
                title="Delete Contact"
                message="Are you sure you want to delete this contact? This action cannot be undone."
                type="danger"
                confirmText="Delete"
            />
        </div>
    );
};

export default ContactList;
