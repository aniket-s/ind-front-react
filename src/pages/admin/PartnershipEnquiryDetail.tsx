// src/pages/admin/PartnershipEnquiryDetail.tsx
import React, {useState, Fragment} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {useMutation} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {XMarkIcon} from '@heroicons/react/24/outline';
import {partnershipService} from '@/services/partnership.service';
import {PartnershipEnquiry, PARTNERSHIP_STATUS_OPTIONS, PartnershipStatus} from '@/types/partnership.types'; // ADD PartnershipStatus import
import {formatDate} from '@/utils';
import {cn} from '@/utils';

interface PartnershipEnquiryDetailProps {
    enquiry: PartnershipEnquiry;
    isOpen: boolean;
    onClose: () => void;
    onUpdate: () => void;
}

const PartnershipEnquiryDetail: React.FC<PartnershipEnquiryDetailProps> = ({
                                                                               enquiry,
                                                                               isOpen,
                                                                               onClose,
                                                                               onUpdate
                                                                           }) => {
    const [status, setStatus] = useState<PartnershipStatus>(enquiry.status);
    const [notes, setNotes] = useState(enquiry.notes || '');

    const updateMutation = useMutation({
        mutationFn: ({id, status, notes}: { id: string; status: string; notes: string }) =>
            partnershipService.updateStatus(id, status, notes),
        onSuccess: () => {
            toast.success('Status updated successfully');
            onUpdate();
            onClose();
        },
        onError: () => {
            toast.error('Failed to update status');
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateMutation.mutate({
            id: enquiry.id,
            status,
            notes
        });
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

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel
                                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="flex items-start justify-between mb-4">
                                        <Dialog.Title as="h3"
                                                      className="text-2xl font-semibold leading-6 text-gray-900">
                                            Partnership Enquiry Details
                                        </Dialog.Title>
                                        <button
                                            onClick={onClose}
                                            className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                                        >
                                            <XMarkIcon className="h-6 w-6"/>
                                        </button>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Status Badge */}
                                        <div>
                                            <span className={cn(
                                                'px-3 py-1 inline-flex text-sm font-semibold rounded-full',
                                                getStatusBadgeColor(enquiry.status)
                                            )}>
                                                {PARTNERSHIP_STATUS_OPTIONS.find(s => s.value === enquiry.status)?.label}
                                            </span>
                                        </div>

                                        {/* Company Information */}
                                        <div className="border-t border-gray-200 pt-4">
                                            <h4 className="text-lg font-medium text-gray-900 mb-4">Company
                                                Information</h4>
                                            <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                                                <div>
                                                    <dt className="text-sm font-medium text-gray-500">Company Name</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{enquiry.companyName}</dd>
                                                </div>
                                                <div>
                                                    <dt className="text-sm font-medium text-gray-500">Industry</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{enquiry.industry}</dd>
                                                </div>
                                                <div>
                                                    <dt className="text-sm font-medium text-gray-500">Website</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">
                                                        {enquiry.website ? (
                                                            <a
                                                                href={enquiry.website}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-primary-600 hover:text-primary-900"
                                                            >
                                                                {enquiry.website}
                                                            </a>
                                                        ) : (
                                                            'N/A'
                                                        )}
                                                    </dd>
                                                </div>
                                                <div>
                                                    <dt className="text-sm font-medium text-gray-500">Submitted On</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{formatDate(enquiry.createdAt)}</dd>
                                                </div>
                                            </dl>
                                        </div>

                                        {/* Contact Information */}
                                        <div className="border-t border-gray-200 pt-4">
                                            <h4 className="text-lg font-medium text-gray-900 mb-4">Contact
                                                Information</h4>
                                            <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                                                <div>
                                                    <dt className="text-sm font-medium text-gray-500">Contact Person
                                                    </dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{enquiry.contactPersonName}</dd>
                                                </div>
                                                <div>
                                                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">
                                                        <a
                                                            href={`mailto:${enquiry.email}`}
                                                            className="text-primary-600 hover:text-primary-900"
                                                        >
                                                            {enquiry.email}
                                                        </a>
                                                    </dd>
                                                </div>
                                                <div>
                                                    <dt className="text-sm font-medium text-gray-500">Phone</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">
                                                        <a
                                                            href={`tel:${enquiry.phone}`}
                                                            className="text-primary-600 hover:text-primary-900"
                                                        >
                                                            {enquiry.phone}
                                                        </a>
                                                    </dd>
                                                </div>
                                            </dl>
                                        </div>

                                        {/* Requirements */}
                                        <div className="border-t border-gray-200 pt-4">
                                            <h4 className="text-lg font-medium text-gray-900 mb-4">Requirements</h4>
                                            <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                                                <div>
                                                    <dt className="text-sm font-medium text-gray-500">MOQ</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{enquiry.moq}</dd>
                                                </div>
                                                <div>
                                                    <dt className="text-sm font-medium text-gray-500">Product Interest
                                                    </dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{enquiry.productOfInterest}</dd>
                                                </div>
                                                <div>
                                                    <dt className="text-sm font-medium text-gray-500">Budget Range</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{enquiry.budgetRange || 'N/A'}</dd>
                                                </div>
                                                <div>
                                                    <dt className="text-sm font-medium text-gray-500">Timeline</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{enquiry.timelineForPurchase || 'N/A'}</dd>
                                                </div>
                                            </dl>
                                        </div>

                                        {/* Update Status Form */}
                                        <form onSubmit={handleSubmit} className="border-t border-gray-200 pt-4">
                                            <h4 className="text-lg font-medium text-gray-900 mb-4">Update Status</h4>
                                            <div className="space-y-4">
                                                <div>
                                                    <label
                                                        className="block text-sm font-medium text-gray-700">Status</label>
                                                    <select
                                                        value={status}
                                                        onChange={(e) => setStatus(e.target.value as PartnershipStatus)} // FIX: Type cast here
                                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                                                    >
                                                        {PARTNERSHIP_STATUS_OPTIONS.map(option => (
                                                            <option key={option.value} value={option.value}>
                                                                {option.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Internal
                                                        Notes</label>
                                                    <textarea
                                                        value={notes}
                                                        onChange={(e) => setNotes(e.target.value)}
                                                        rows={4}
                                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                                        placeholder="Add internal notes about this enquiry..."
                                                    />
                                                </div>
                                            </div>
                                        </form>

                                        {/* Resolver Information */}
                                        {enquiry.resolver && (
                                            <div className="border-t border-gray-200 pt-4">
                                                <h4 className="text-sm font-medium text-gray-500 mb-2">Resolved By</h4>
                                                <p className="text-sm text-gray-900">{enquiry.resolver.name}</p>
                                                {enquiry.resolvedAt && (
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        on {formatDate(enquiry.resolvedAt)}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="submit"
                                        onClick={handleSubmit}
                                        disabled={updateMutation.isPending}
                                        className="inline-flex w-full justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 sm:ml-3 sm:w-auto disabled:opacity-50"
                                    >
                                        {updateMutation.isPending ? 'Updating...' : 'Update Status'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    >
                                        Close
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default PartnershipEnquiryDetail;