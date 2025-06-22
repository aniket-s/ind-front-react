// src/components/shared/ConfirmDialog.tsx
import React from 'react';
import Modal from './Modal';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import {cn} from "@/utils";

interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    type?: 'danger' | 'warning' | 'info';
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
                                                         isOpen,
                                                         onClose,
                                                         onConfirm,
                                                         title,
                                                         message,
                                                         confirmText = 'Confirm',
                                                         cancelText = 'Cancel',
                                                         type = 'warning',
                                                     }) => {
    const iconColors = {
        danger: 'text-red-600',
        warning: 'text-yellow-600',
        info: 'text-blue-600',
    };

    const buttonColors = {
        danger: 'btn-danger',
        warning: 'bg-yellow-600 text-white hover:bg-yellow-700',
        info: 'btn-primary',
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="sm" showCloseButton={false}>
            <div className="sm:flex sm:items-start">
                <div className={cn(
                    'mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10',
                    type === 'danger' ? 'bg-red-100' : type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                )}>
                    <ExclamationTriangleIcon className={cn('h-6 w-6', iconColors[type])} />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">{message}</p>
                    </div>
                </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                    type="button"
                    className={cn('btn btn-md sm:ml-3', buttonColors[type])}
                    onClick={() => {
                        onConfirm();
                        onClose();
                    }}
                >
                    {confirmText}
                </button>
                <button
                    type="button"
                    className="btn btn-md btn-outline"
                    onClick={onClose}
                >
                    {cancelText}
                </button>
            </div>
        </Modal>
    );
};

export default ConfirmDialog;
