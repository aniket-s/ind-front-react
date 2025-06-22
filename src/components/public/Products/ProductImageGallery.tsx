// src/components/public/Products/ProductImageGallery.tsx
import React, { useState } from 'react';
import { getImageUrl } from '@/utils';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { cn } from '@/utils';

interface ProductImageGalleryProps {
    images: string[];
    alt: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images, alt }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    if (images.length === 0) {
        return (
            <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">No image available</p>
            </div>
        );
    }

    const handlePrevious = () => {
        setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleNext = () => {
        setSelectedIndex((prev) => (prev + 1) % images.length);
    };

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden">
                <img
                    src={getImageUrl(images[selectedIndex])}
                    alt={`${alt} - Image ${selectedIndex + 1}`}
                    className="w-full h-full object-center object-contain"
                />

                {images.length > 1 && (
                    <>
                        <button
                            onClick={handlePrevious}
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition-colors"
                        >
                            <ChevronLeftIcon className="h-5 w-5" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition-colors"
                        >
                            <ChevronRightIcon className="h-5 w-5" />
                        </button>
                    </>
                )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="grid grid-cols-6 gap-2">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedIndex(index)}
                            className={cn(
                                'aspect-w-1 aspect-h-1 rounded-lg overflow-hidden border-2 transition-colors',
                                selectedIndex === index
                                    ? 'border-primary-500'
                                    : 'border-gray-200 hover:border-gray-300'
                            )}
                        >
                            <img
                                src={getImageUrl(image)}
                                alt={`${alt} - Thumbnail ${index + 1}`}
                                className="w-full h-full object-center object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductImageGallery;
