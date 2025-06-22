// src/components/admin/Media/MediaGrid.tsx
import React from 'react';
import { Media } from '@/types';
import { getImageUrl, formatFileSize } from '@/utils';
import { CheckIcon, DocumentIcon } from '@heroicons/react/24/outline';
import { cn } from '@/utils';

interface MediaGridProps {
    media: Media[];
    selectedMedia: Media[];
    onSelect: (media: Media) => void;
    onView: (media: Media) => void;
}

const MediaGrid: React.FC<MediaGridProps> = ({
                                                 media,
                                                 selectedMedia,
                                                 onSelect,
                                                 onView,
                                             }) => {
    const isSelected = (item: Media) => {
        return selectedMedia.some((m) => m.id === item.id);
    };

    const isImage = (mimeType: string) => {
        return mimeType.startsWith('image/');
    };

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-6">
            {media.map((item) => (
                <div
                    key={item.id}
                    className={cn(
                        'relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all',
                        isSelected(item)
                            ? 'border-primary-500 shadow-md'
                            : 'border-gray-200 hover:border-gray-300'
                    )}
                >
                    {/* Selection checkbox */}
                    <div
                        className="absolute top-2 left-2 z-10"
                        onClick={(e) => {
                            e.stopPropagation();
                            onSelect(item);
                        }}
                    >
                        <div
                            className={cn(
                                'w-5 h-5 rounded border-2 flex items-center justify-center transition-colors',
                                isSelected(item)
                                    ? 'bg-primary-500 border-primary-500'
                                    : 'bg-white border-gray-300 group-hover:border-gray-400'
                            )}
                        >
                            {isSelected(item) && (
                                <CheckIcon className="h-3 w-3 text-white" />
                            )}
                        </div>
                    </div>

                    {/* Media preview */}
                    <div
                        className="aspect-square bg-gray-100 flex items-center justify-center"
                        onClick={() => onView(item)}
                    >
                        {isImage(item.mimeType) ? (
                            <img
                                src={getImageUrl(item.thumbnail || item.path)}
                                alt={item.alt || item.originalName}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <DocumentIcon className="h-12 w-12 text-gray-400" />
                        )}
                    </div>

                    {/* File info */}
                    <div className="p-2 bg-white">
                        <p className="text-xs text-gray-900 truncate" title={item.originalName}>
                            {item.originalName}
                        </p>
                        <p className="text-xs text-gray-500">{formatFileSize(item.size)}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MediaGrid;