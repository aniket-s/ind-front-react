import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { mediaService } from '@/services/media.service';
import { PhotoIcon } from '@heroicons/react/24/outline';
import Modal from '@/components/shared/Modal';
import { getImageUrl } from '@/utils';
import { Media } from '@/types';

interface MediaSelectorProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    folder?: string;
}

const MediaSelector: React.FC<MediaSelectorProps> = ({ value, onChange, label, folder }) => {
    const [isOpen, setIsOpen] = useState(false);

    const { data } = useQuery({
        queryKey: ['media', { folder, limit: 50 }],
        queryFn: () => mediaService.getMedia({ folder, limit: 50 }),
        enabled: isOpen,
    });

    const handleSelect = (path: string) => {
        onChange(path);
        setIsOpen(false);
    };

    return (
        <div>
            {label && <label className="label">{label}</label>}
            <div className="flex items-center gap-3">
                <div className="flex-1">
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="Enter image path or select from library"
                        className="input"
                    />
                </div>
                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="btn btn-outline btn-md"
                >
                    <PhotoIcon className="h-5 w-5" />
                </button>
            </div>
            {value && (
                <div className="mt-2">
                    <img
                        src={getImageUrl(value)}
                        alt="Preview"
                        className="h-20 w-auto rounded border"
                    />
                </div>
            )}

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Select Media"
                size="xl"
            >
                <div className="grid grid-cols-4 gap-4 p-4">
                    {data?.media.map((item: Media) => (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => handleSelect(item.path)}
                            className="relative group"
                        >
                            <img
                                src={getImageUrl(item.thumbnail || item.path)}
                                alt={item.alt || item.originalName}
                                className="w-full h-32 object-cover rounded border-2 border-transparent group-hover:border-primary-500"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center">
                                <span className="text-white text-sm">Select</span>
                            </div>
                        </button>
                    ))}
                </div>
            </Modal>
        </div>
    );
};

export default MediaSelector;