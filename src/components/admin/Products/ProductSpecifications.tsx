// src/components/admin/Products/ProductSpecifications.tsx
import React from 'react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface ProductSpecificationsProps {
    specifications: Record<string, any>;
    features: string[];
    technicalSpecs: Record<string, any>;
    onSpecificationsChange: (specs: Record<string, any>) => void;
    onFeaturesChange: (features: string[]) => void;
    onTechnicalSpecsChange: (specs: Record<string, any>) => void;
}

const ProductSpecifications: React.FC<ProductSpecificationsProps> = ({
                                                                         specifications,
                                                                         features,
                                                                         technicalSpecs,
                                                                         onSpecificationsChange,
                                                                         onFeaturesChange,
                                                                         onTechnicalSpecsChange,
                                                                     }) => {
    const addSpecification = () => {
        onSpecificationsChange({ ...specifications, '': '' });
    };

    const updateSpecification = (oldKey: string, newKey: string, value: string) => {
        const newSpecs = { ...specifications };
        if (oldKey !== newKey) {
            delete newSpecs[oldKey];
        }
        newSpecs[newKey] = value;
        onSpecificationsChange(newSpecs);
    };

    const removeSpecification = (key: string) => {
        const newSpecs = { ...specifications };
        delete newSpecs[key];
        onSpecificationsChange(newSpecs);
    };

    const addFeature = () => {
        onFeaturesChange([...features, '']);
    };

    const updateFeature = (index: number, value: string) => {
        const newFeatures = [...features];
        newFeatures[index] = value;
        onFeaturesChange(newFeatures);
    };

    const removeFeature = (index: number) => {
        onFeaturesChange(features.filter((_, i) => i !== index));
    };

    const addTechnicalSpec = () => {
        onTechnicalSpecsChange({ ...technicalSpecs, '': '' });
    };

    const updateTechnicalSpec = (oldKey: string, newKey: string, value: string) => {
        const newSpecs = { ...technicalSpecs };
        if (oldKey !== newKey) {
            delete newSpecs[oldKey];
        }
        newSpecs[newKey] = value;
        onTechnicalSpecsChange(newSpecs);
    };

    const removeTechnicalSpec = (key: string) => {
        const newSpecs = { ...technicalSpecs };
        delete newSpecs[key];
        onTechnicalSpecsChange(newSpecs);
    };

    return (
        <div className="space-y-6">
            {/* General Specifications */}
            <div className="card">
                <div className="card-header flex justify-between items-center">
                    <h3 className="text-lg font-medium">Specifications</h3>
                    <button
                        type="button"
                        onClick={addSpecification}
                        className="btn btn-sm btn-outline"
                    >
                        <PlusIcon className="h-4 w-4 mr-1" />
                        Add
                    </button>
                </div>
                <div className="card-body space-y-3">
                    {Object.entries(specifications).map(([key, value], index) => (
                        <div key={index} className="flex gap-3">
                            <input
                                type="text"
                                value={key}
                                onChange={(e) => updateSpecification(key, e.target.value, value)}
                                placeholder="Specification name"
                                className="input flex-1"
                            />
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => updateSpecification(key, key, e.target.value)}
                                placeholder="Value"
                                className="input flex-1"
                            />
                            <button
                                type="button"
                                onClick={() => removeSpecification(key)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                            >
                                <XMarkIcon className="h-5 w-5" />
                            </button>
                        </div>
                    ))}
                    {Object.keys(specifications).length === 0 && (
                        <p className="text-sm text-gray-500">No specifications added yet</p>
                    )}
                </div>
            </div>

            {/* Features */}
            <div className="card">
                <div className="card-header flex justify-between items-center">
                    <h3 className="text-lg font-medium">Features</h3>
                    <button
                        type="button"
                        onClick={addFeature}
                        className="btn btn-sm btn-outline"
                    >
                        <PlusIcon className="h-4 w-4 mr-1" />
                        Add
                    </button>
                </div>
                <div className="card-body space-y-3">
                    {features.map((feature, index) => (
                        <div key={index} className="flex gap-3">
                            <input
                                type="text"
                                value={feature}
                                onChange={(e) => updateFeature(index, e.target.value)}
                                placeholder="Feature description"
                                className="input flex-1"
                            />
                            <button
                                type="button"
                                onClick={() => removeFeature(index)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                            >
                                <XMarkIcon className="h-5 w-5" />
                            </button>
                        </div>
                    ))}
                    {features.length === 0 && (
                        <p className="text-sm text-gray-500">No features added yet</p>
                    )}
                </div>
            </div>

            {/* Technical Specifications */}
            <div className="card">
                <div className="card-header flex justify-between items-center">
                    <h3 className="text-lg font-medium">Technical Specifications</h3>
                    <button
                        type="button"
                        onClick={addTechnicalSpec}
                        className="btn btn-sm btn-outline"
                    >
                        <PlusIcon className="h-4 w-4 mr-1" />
                        Add
                    </button>
                </div>
                <div className="card-body space-y-3">
                    {Object.entries(technicalSpecs).map(([key, value], index) => (
                        <div key={index} className="flex gap-3">
                            <input
                                type="text"
                                value={key}
                                onChange={(e) => updateTechnicalSpec(key, e.target.value, value)}
                                placeholder="Technical spec name"
                                className="input flex-1"
                            />
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => updateTechnicalSpec(key, key, e.target.value)}
                                placeholder="Value"
                                className="input flex-1"
                            />
                            <button
                                type="button"
                                onClick={() => removeTechnicalSpec(key)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                            >
                                <XMarkIcon className="h-5 w-5" />
                            </button>
                        </div>
                    ))}
                    {Object.keys(technicalSpecs).length === 0 && (
                        <p className="text-sm text-gray-500">No technical specs added yet</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductSpecifications;