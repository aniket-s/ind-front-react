// src/pages/admin/contacts/ContactDetail.tsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/services/api';
import { Contact } from '@/types';
import {cn, formatDate} from '@/utils';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { ArrowLeftIcon, CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const ContactDetail: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [notes, setNotes] = useState('');

    const { data: contact, isLoading } = useQuery({
        queryKey: ['contact', id],
        queryFn: async () => {
            const { data } = await apiClient.axios.get<Contact>(`/contacts/${id}`);
            return data;
        },
    });

    const updateStatusMutation = useMutation({
        mutationFn: async ({ status, notes }: { status: string; notes?: string }) => {
            const { data } = await apiClient.axios.put(`/contacts/${id}/status`, { status, notes });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contact', id] });
            queryClient.invalidateQueries({ queryKey: ['contacts'] });
            toast.success('Contact status updated');
        },
    });

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (!contact) {
        return <div>Contact not found</div>;
    }

    const statusColors = {
        new: 'badge-info',
        in_progress: 'badge-warning',
        resolved: 'badge-success',
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => navigate('/admin/contacts')}
                        className="p-2 hover:bg-gray-100 rounded-md"
                    >
                        <ArrowLeftIcon className="h-5 w-5" />
                    </button>
                    <h1 className="text-2xl font-semibold text-gray-900">Contact Details</h1>
                </div>
                <span className={cn('badge', statusColors[contact.status])}>
          {contact.status.replace('_', ' ')}
        </span>
            </div>

            {/* Contact Information */}
            <div className="card">
                <div className="card-body">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Name</dt>
                            <dd className="mt-1 text-sm text-gray-900">{contact.name}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Email</dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                <a href={`mailto:${contact.email}`} className="text-primary-600 hover:text-primary-700">
                                    {contact.email}
                                </a>
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Phone</dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {contact.phone ? (
                                    <a href={`tel:${contact.phone}`} className="text-primary-600 hover:text-primary-700">
                                        {contact.phone}
                                    </a>
                                ) : (
                                    '-'
                                )}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Date</dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {formatDate(contact.createdAt, 'long')}
                            </dd>
                        </div>
                        <div className="sm:col-span-2">
                            <dt className="text-sm font-medium text-gray-500">Subject</dt>
                            <dd className="mt-1 text-sm text-gray-900">{contact.subject || 'No subject'}</dd>
                        </div>
                        <div className="sm:col-span-2">
                            <dt className="text-sm font-medium text-gray-500">Message</dt>
                            <dd className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{contact.message}</dd>
                        </div>
                    </dl>
                </div>
            </div>

            {/* Status History */}
            {contact.resolver && (
                <div className="card">
                    <div className="card-header">
                        <h3 className="text-lg font-medium">Resolution Details</h3>
                    </div>
                    <div className="card-body">
                        <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Resolved By</dt>
                                <dd className="mt-1 text-sm text-gray-900">{contact.resolver.name}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Resolved At</dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                    {contact.resolvedAt && formatDate(contact.resolvedAt, 'long')}
                                </dd>
                            </div>
                            {contact.notes && (
                                <div className="sm:col-span-2">
                                    <dt className="text-sm font-medium text-gray-500">Notes</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{contact.notes}</dd>
                                </div>
                            )}
                        </dl>
                    </div>
                </div>
            )}

            {/* Actions */}
            {contact.status !== 'resolved' && (
                <div className="card">
                    <div className="card-header">
                        <h3 className="text-lg font-medium">Update Status</h3>
                    </div>
                    <div className="card-body space-y-4">
                        <div>
                            <label className="label">Add Notes</label>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                rows={3}
                                className="input"
                                placeholder="Add any relevant notes..."
                            />
                        </div>
                        <div className="flex space-x-4">
                            {contact.status === 'new' && (
                                <button
                                    onClick={() => updateStatusMutation.mutate({ status: 'in_progress', notes })}
                                    className="btn btn-outline btn-md"
                                    disabled={updateStatusMutation.isPending}
                                >
                                    <ClockIcon className="h-5 w-5 mr-2" />
                                    Mark as In Progress
                                </button>
                            )}
                            <button
                                onClick={() => updateStatusMutation.mutate({ status: 'resolved', notes })}
                                className="btn btn-primary btn-md"
                                disabled={updateStatusMutation.isPending}
                            >
                                <CheckIcon className="h-5 w-5 mr-2" />
                                Mark as Resolved
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactDetail;