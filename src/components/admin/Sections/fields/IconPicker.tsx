import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface IconPickerProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
}

interface IconOption {
    name: string;
    value: string;
}

const IconPicker: React.FC<IconPickerProps> = ({ value, onChange, label }) => {
    const [search, setSearch] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const commonIcons: IconOption[] = [
        { name: 'Users', value: 'fas fa-users' },
        { name: 'Shield', value: 'fas fa-shield-alt' },
        { name: 'Certificate', value: 'fas fa-certificate' },
        { name: 'Tools', value: 'fas fa-tools' },
        { name: 'Award', value: 'fas fa-award' },
        { name: 'Clock', value: 'fas fa-clock' },
        { name: 'Truck', value: 'fas fa-truck' },
        { name: 'Handshake', value: 'fas fa-handshake' },
        { name: 'Bolt', value: 'fas fa-bolt' },
        { name: 'Chart Line', value: 'fas fa-chart-line' },
        { name: 'Tag', value: 'fas fa-tag' },
        { name: 'Headset', value: 'fas fa-headset' },
        { name: 'Battery', value: 'fas fa-battery-three-quarters' },
        { name: 'Solar Panel', value: 'fas fa-solar-panel' },
        { name: 'Motorcycle', value: 'fas fa-motorcycle' },
        { name: 'Globe', value: 'fas fa-globe' },
        { name: 'Comments', value: 'fas fa-comments' },
        { name: 'Envelope', value: 'fas fa-envelope' },
        { name: 'Phone', value: 'fas fa-phone' },
        { name: 'Map Marker', value: 'fas fa-map-marker-alt' },
        { name: 'Check', value: 'fas fa-check' },
        { name: 'Plus', value: 'fas fa-plus' },
        { name: 'Minus', value: 'fas fa-minus' },
        { name: 'Download', value: 'fas fa-download' },
        { name: 'Battery Full', value: 'fas fa-battery-full' },
        { name: 'Plug', value: 'fas fa-plug' },
    ];

    const filteredIcons = commonIcons.filter(icon =>
        icon.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="relative">
            {label && <label className="label">{label}</label>}
            <div className="relative">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setIsOpen(true)}
                    placeholder="Select icon or enter custom class"
                    className="input pr-10"
                />
                {value && (
                    <div className="absolute right-3 top-2.5">
                        <i className={value}></i>
                    </div>
                )}
            </div>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute z-20 mt-1 w-full bg-white rounded-md shadow-lg border">
                        <div className="p-2 border-b">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search icons..."
                                    className="input pl-9 text-sm"
                                    onClick={(e) => e.stopPropagation()}
                                />
                                <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            </div>
                        </div>
                        <div className="max-h-60 overflow-y-auto p-2">
                            <div className="grid grid-cols-6 gap-2">
                                {filteredIcons.map((icon) => (
                                    <button
                                        key={icon.value}
                                        type="button"
                                        onClick={() => {
                                            onChange(icon.value);
                                            setIsOpen(false);
                                        }}
                                        className="p-3 hover:bg-gray-100 rounded text-center"
                                        title={icon.name}
                                    >
                                        <i className={`${icon.value} text-lg`}></i>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default IconPicker;