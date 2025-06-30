// src/components/public/Products/ProductSpecificationDisplay.tsx
import React from 'react';

type SpecificationValue = string | number | boolean | null | undefined | SpecificationObject | SpecificationArray;
type SpecificationObject = { [key: string]: SpecificationValue };
type SpecificationArray = SpecificationValue[];

interface ProductSpecificationsProps {
    specifications?: Record<string, SpecificationValue>;
}

const ProductSpecifications: React.FC<ProductSpecificationsProps> = ({ specifications }) => {
    if (!specifications || Object.keys(specifications).length === 0) {
        return <p className="text-gray-500">No specifications available.</p>;
    }

    const formatValue = (value: SpecificationValue): string => {
        if (value === null || value === undefined) {
            return 'N/A';
        }
        if (typeof value === 'boolean') {
            return value ? 'Yes' : 'No';
        }
        if (typeof value === 'object') {
            return JSON.stringify(value, null, 2);
        }
        return String(value);
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <tbody className="divide-y divide-gray-200">
                {Object.entries(specifications).map(([key, value], index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                            {key}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                            {formatValue(value)}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductSpecifications;