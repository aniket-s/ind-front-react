// src/components/admin/Products/ProductImageUpload.tsx
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import {getImageUrl, formatFileSize, cn} from '@/utils';
import { ACCEPTED_IMAGE_TYPES, FILE_SIZE_LIMIT } from '@/utils/constants';
import toast from 'react-hot-toast';

interface ProductImageUploadProps {
    images: File[];
    existingImages: string[];
    onImagesChange: (images: File[]) => void;
    onDeleteExisting: (index: number) => void;
}

const ProductImageUpload: React.FC<ProductImageUploadProps> = ({
                                                                   images,
                                                                   existingImages,
                                                                   onImagesChange,
                                                                   onDeleteExisting,
                                                               }) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const validFiles = acceptedFiles.filter((file) => {
            if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
                toast.error(`${file.name} is not a valid image type`);
                return false;
            }
            if (file.size > FILE_SIZE_LIMIT) {
                toast.error(`${file.name} is too large. Maximum size is 5MB`);
                return false;
            }
            return true;
        });

        if (validFiles.length > 0) {
            onImagesChange([...images, ...validFiles]);
        }
    }, [images, onImagesChange]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
        },
        maxSize: FILE_SIZE_LIMIT,
        multiple: true,
    });

    const removeNewImage = (index: number) => {
        onImagesChange(images.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-4">
            {/* Existing Images */}
            {existingImages.length > 0 && (
                <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Current Images</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                        {existingImages.map((image, index) => (
                            <div key={index} className="relative group">
                                <img
                                    src={getImageUrl(image)}
                                    alt={`Product ${index + 1}`}
                                    className="h-24 w-full object-cover rounded-lg"
                                />
                                <button
                                    type="button"
                                    onClick={() => onDeleteExisting(index)}
                                    className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <XMarkIcon className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* New Images */}
            {images.length > 0 && (
                <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">New Images</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                        {images.map((file, index) => (
                            <div key={index} className="relative group">
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt={file.name}
                                    className="h-24 w-full object-cover rounded-lg"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-lg">
                                    {formatFileSize(file.size)}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeNewImage(index)}
                                    className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <XMarkIcon className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Upload Area */}
            <div
                {...getRootProps()}
                className={cn(
                    'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
                    isDragActive
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-300 hover:border-gray-400'
                )}
            >
                <input {...getInputProps()} />
                <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                    {isDragActive
                        ? 'Drop the images here...'
                        : 'Drag & drop images here, or click to select'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG, GIF, WEBP up to 5MB each
                </p>
            </div>
        </div>
    );
};

export default ProductImageUpload;
