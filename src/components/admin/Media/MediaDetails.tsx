// src/components/admin/Media/MediaDetails.tsx
import React, { useState } from 'react';
import { Media } from '@/types';
import { getImageUrl, formatFileSize, formatDate, copyToClipboard } from '@/utils';
import {
    DocumentIcon,
    TrashIcon,
    ClipboardDocumentIcon,
    CheckIcon
} from '@heroicons/react/24/outline';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { mediaService } from '@/services/media.service';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import toast from 'react-hot-toast';

interface MediaDetailsProps {
    media: Media;
    onClose: () => void;
    onDelete: (id: string) => void;
}

const MediaDetails: React.FC<MediaDetailsProps> = ({ media, onClose, onDelete }) => {
    const queryClient = useQueryClient();
    const [alt, setAlt] = useState(media.alt || '');
    const [caption, setCaption] = useState(media.caption || '');
    const [copied, setCopied] = useState(false);

    const updateMutation = useMutation({
        mutationFn: () => mediaService.updateMedia(media.id, { alt, caption }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['media'] });
            toast.success('Media updated successfully');
            onClose();
        },
    });

    const isImage = media.mimeType.startsWith('image/');
    const fileUrl = getImageUrl(media.url);

    const handleCopyUrl = async () => {
        const success = await copyToClipboard(fileUrl);
        if (success) {
            setCopied(true);
            toast.success('URL copied to clipboard');
            setTimeout(() => setCopied(false), 2000);
        } else {
            toast.error('Failed to copy URL');
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Preview */}
            <div>
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                    {isImage ? (
                        <img
                            src={fileUrl}
                            alt={media.alt || media.originalName}
                            className="max-w-full max-h-full object-contain"
                        />
                    ) : (
                        <DocumentIcon className="h-24 w-24 text-gray-400" />
                    )}
                </div>
            </div>

            {/* Details */}
            <div className="space-y-6">
                {/* File Info */}
                <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">File Details</h3>
                    <dl className="space-y-2">
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Filename</dt>
                            <dd className="text-sm text-gray-900">{media.originalName}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Type</dt>
                            <dd className="text-sm text-gray-900">{media.mimeType}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Size</dt>
                            <dd className="text-sm text-gray-900">{formatFileSize(media.size)}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Folder</dt>
                            <dd className="text-sm text-gray-900">{media.folder}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Uploaded</dt>
                            <dd className="text-sm text-gray-900">{formatDate(media.createdAt, 'long')}</dd>
                        </div>
                    </dl>
                </div>

                {/* URL */}
                <div>
                    <label className="label">File URL</label>
                    <div className="flex">
                        <input
                            type="text"
                            value={fileUrl}
                            readOnly
                            className="input rounded-r-none"
                        />
                        <button
                            onClick={handleCopyUrl}
                            className="btn btn-outline btn-md rounded-l-none"
                        >
                            {copied ? (
                                <CheckIcon className="h-5 w-5" />
                            ) : (
                                <ClipboardDocumentIcon className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Editable fields */}
                {isImage && (
                    <>
                        <div>
                            <label className="label">Alt Text</label>
                            <input
                                type="text"
                                value={alt}
                                onChange={(e) => setAlt(e.target.value)}
                                className="input"
                                placeholder="Describe this image for accessibility"
                            />
                        </div>

                        <div>
                            <label className="label">Caption</label>
                            <textarea
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                                rows={2}
                                className="input"
                                placeholder="Optional caption"
                            />
                        </div>
                    </>
                )}

                {/* Actions */}
                <div className="flex justify-between pt-4">
                    <button
                        onClick={() => onDelete(media.id)}
                        className="btn btn-danger btn-md"
                    >
                        <TrashIcon className="h-5 w-5 mr-2" />
                        Delete
                    </button>

                    <div className="space-x-4">
                        <button
                            onClick={onClose}
                            className="btn btn-outline btn-md"
                        >
                            Cancel
                        </button>
                        {isImage && (
                            <button
                                onClick={() => updateMutation.mutate()}
                                disabled={updateMutation.isPending}
                                className="btn btn-primary btn-md"
                            >
                                {updateMutation.isPending ? (
                                    <LoadingSpinner size="sm" className="text-white" />
                                ) : (
                                    'Save Changes'
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MediaDetails;