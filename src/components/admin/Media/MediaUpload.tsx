// src/components/admin/Media/MediaUpload.tsx
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@tanstack/react-query';
import { mediaService } from '@/services/media.service';
import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { formatFileSize } from '@/utils';
import { FILE_SIZE_LIMIT } from '@/utils/constants';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { cn } from '@/utils';
import toast from 'react-hot-toast';

interface MediaUploadProps {
    onSuccess: () => void;
    onCancel: () => void;
}

const MediaUpload: React.FC<MediaUploadProps> = ({ onSuccess, onCancel }) => {
    const [files, setFiles] = useState<File[]>([]);
    const [folder, setFolder] = useState('misc');
    const [uploadProgress, setUploadProgress] = useState(0);

    const uploadMutation = useMutation({
        mutationFn: () => mediaService.uploadMedia(files, folder),
        onSuccess: () => {
            onSuccess();
        },
    });

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const validFiles = acceptedFiles.filter((file) => {
            if (file.size > FILE_SIZE_LIMIT) {
                toast.error(`${file.name} is too large. Maximum size is 5MB`);
                return false;
            }
            return true;
        });
        setFiles((prev) => [...prev, ...validFiles]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        maxSize: FILE_SIZE_LIMIT,
        multiple: true,
    });

    const removeFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleUpload = () => {
        if (files.length === 0) return;
        uploadMutation.mutate();
    };

    return (
        <div className="space-y-6">
            {/* Folder Selection */}
            <div>
                <label className="label">Upload to folder</label>
                <select
                    value={folder}
                    onChange={(e) => setFolder(e.target.value)}
                    className="input"
                >
                    <option value="products">Products</option>
                    <option value="banners">Banners</option>
                    <option value="categories">Categories</option>
                    <option value="misc">Miscellaneous</option>
                </select>
            </div>

            {/* Dropzone */}
            <div
                {...getRootProps()}
                className={cn(
                    'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
                    isDragActive
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-300 hover:border-gray-400'
                )}
            >
                <input {...getInputProps()} />
                <ArrowUpTrayIcon className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                    {isDragActive
                        ? 'Drop the files here...'
                        : 'Drag & drop files here, or click to select'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                    Maximum file size: 5MB
                </p>
            </div>

            {/* Files List */}
            {files.length > 0 && (
                <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Selected files ({files.length})
                    </h4>
                    <ul className="space-y-2">
                        {files.map((file, index) => (
                            <li
                                key={index}
                                className="flex items-center justify-between p-2 bg-gray-50 rounded"
                            >
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-900">{file.name}</span>
                                    <span className="text-xs text-gray-500">
                                        ({formatFileSize(file.size)})
                                    </span>
                                </div>
                                <button
                                    onClick={() => removeFile(index)}
                                    className="text-red-600 hover:text-red-700"
                                >
                                    <XMarkIcon className="h-4 w-4" />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Actions */}
            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="btn btn-outline btn-md"
                >
                    Cancel
                </button>
                <button
                    onClick={handleUpload}
                    disabled={files.length === 0 || uploadMutation.isPending}
                    className="btn btn-primary btn-md"
                >
                    {uploadMutation.isPending ? (
                        <LoadingSpinner size="sm" className="text-white" />
                    ) : (
                        <>Upload {files.length} file{files.length !== 1 ? 's' : ''}</>
                    )}
                </button>
            </div>
        </div>
    );
};

export default MediaUpload;