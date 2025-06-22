// src/pages/admin/media/MediaLibrary.tsx
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mediaService } from '@/services/media.service';
import { useDebounce } from '@/hooks/useDebounce';
import MediaUpload from '@/components/admin/Media/MediaUpload';
import MediaGrid from '@/components/admin/Media/MediaGrid';
import MediaDetails from '@/components/admin/Media/MediaDetails';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import Modal from '@/components/shared/Modal';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import Pagination from '@/components/shared/Pagination';
import {
    MagnifyingGlassIcon,
    FolderIcon,
    PhotoIcon,
    DocumentIcon,
    ArrowUpTrayIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const MediaLibrary: React.FC = () => {
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [folder, setFolder] = useState('');
    const [mimeType, setMimeType] = useState('');
    const [selectedMedia, setSelectedMedia] = useState<any[]>([]);
    const [viewMedia, setViewMedia] = useState<any>(null);
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [deleteMedia, setDeleteMedia] = useState<string[]>([]);
    const debouncedSearch = useDebounce(search, 300);

    const { data, isLoading } = useQuery({
        queryKey: ['media', { page, search: debouncedSearch, folder, mimeType }],
        queryFn: () => mediaService.getMedia({
            page,
            limit: 20,
            search: debouncedSearch,
            folder: folder || undefined,
            mimeType: mimeType || undefined,
        }),
    });

    const deleteMutation = useMutation({
        mutationFn: (ids: string[]) => {
            if (ids.length === 1) {
                return mediaService.deleteMedia(ids[0]);
            }
            return mediaService.bulkDeleteMedia(ids);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['media'] });
            toast.success('Media deleted successfully');
            setDeleteMedia([]);
            setSelectedMedia([]);
        },
    });

    const handleUploadSuccess = () => {
        queryClient.invalidateQueries({ queryKey: ['media'] });
        setIsUploadOpen(false);
        toast.success('Files uploaded successfully');
    };

    const handleSelectMedia = (media: any) => {
        if (selectedMedia.find(m => m.id === media.id)) {
            setSelectedMedia(selectedMedia.filter(m => m.id !== media.id));
        } else {
            setSelectedMedia([...selectedMedia, media]);
        }
    };

    const handleSelectAll = () => {
        if (selectedMedia.length === data?.media.length) {
            setSelectedMedia([]);
        } else {
            setSelectedMedia(data?.media || []);
        }
    };

    const folders = [
        { value: '', label: 'All Folders', icon: FolderIcon },
        { value: 'products', label: 'Products', icon: PhotoIcon },
        { value: 'banners', label: 'Banners', icon: PhotoIcon },
        { value: 'categories', label: 'Categories', icon: FolderIcon },
        { value: 'misc', label: 'Miscellaneous', icon: DocumentIcon },
    ];

    const mimeTypes = [
        { value: '', label: 'All Types' },
        { value: 'image/', label: 'Images' },
        { value: 'application/pdf', label: 'PDFs' },
    ];

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex justify-between items-center">
                <p className="text-gray-600">
                    Manage all your uploaded files and media
                </p>
                <button
                    onClick={() => setIsUploadOpen(true)}
                    className="btn btn-primary btn-md"
                >
                    <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
                    Upload Files
                </button>
            </div>

            {/* Filters */}
            <div className="card">
                <div className="card-body">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search files..."
                                    className="input pl-10"
                                />
                                <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                        </div>

                        <select
                            value={folder}
                            onChange={(e) => setFolder(e.target.value)}
                            className="input"
                        >
                            {folders.map((f) => (
                                <option key={f.value} value={f.value}>
                                    {f.label}
                                </option>
                            ))}
                        </select>

                        <select
                            value={mimeType}
                            onChange={(e) => setMimeType(e.target.value)}
                            className="input"
                        >
                            {mimeTypes.map((t) => (
                                <option key={t.value} value={t.value}>
                                    {t.label}
                                </option>
                            ))}
                        </select>

                        {selectedMedia.length > 0 && (
                            <button
                                onClick={() => setDeleteMedia(selectedMedia.map(m => m.id))}
                                className="btn btn-danger btn-md"
                            >
                                Delete Selected ({selectedMedia.length})
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Media Grid */}
            <div className="card">
                {isLoading ? (
                    <div className="card-body">
                        <LoadingSpinner />
                    </div>
                ) : (
                    <>
                        {data?.media.length ? (
                            <>
                                <div className="p-4 border-b">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedMedia.length === data.media.length}
                                            onChange={handleSelectAll}
                                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">
                      Select All
                    </span>
                                    </label>
                                </div>

                                <MediaGrid
                                    media={data.media}
                                    selectedMedia={selectedMedia}
                                    onSelect={handleSelectMedia}
                                    onView={setViewMedia}
                                />
                            </>
                        ) : (
                            <div className="card-body text-center py-12">
                                <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-2 text-sm font-semibold text-gray-900">No media files</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Get started by uploading your first file
                                </p>
                            </div>
                        )}

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

            {/* Upload Modal */}
            <Modal
                isOpen={isUploadOpen}
                onClose={() => setIsUploadOpen(false)}
                title="Upload Files"
                size="lg"
            >
                <MediaUpload
                    onSuccess={handleUploadSuccess}
                    onCancel={() => setIsUploadOpen(false)}
                />
            </Modal>

            {/* View Modal */}
            {viewMedia && (
                <Modal
                    isOpen={!!viewMedia}
                    onClose={() => setViewMedia(null)}
                    title="Media Details"
                    size="xl"
                >
                    <MediaDetails
                        media={viewMedia}
                        onClose={() => setViewMedia(null)}
                        onDelete={(id) => {
                            setDeleteMedia([id]);
                            setViewMedia(null);
                        }}
                    />
                </Modal>
            )}

            {/* Delete Confirmation */}
            <ConfirmDialog
                isOpen={deleteMedia.length > 0}
                onClose={() => setDeleteMedia([])}
                onConfirm={() => deleteMutation.mutate(deleteMedia)}
                title="Delete Media"
                message={`Are you sure you want to delete ${deleteMedia.length} file${deleteMedia.length > 1 ? 's' : ''}? This action cannot be undone.`}
                type="danger"
                confirmText="Delete"
            />
        </div>
    );
};

export default MediaLibrary;
