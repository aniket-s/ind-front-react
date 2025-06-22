// src/components/public/Products/ProductSpecificationDisplay.tsx
import React from 'react';

interface ProductSpecificationsProps {
    specifications?: Record<string, any>;
}

const ProductSpecifications: React.FC<ProductSpecificationsProps> = ({ specifications }) => {
    if (!specifications || Object.keys(specifications).length === 0) {
        return <p className="text-gray-500">No specifications available.</p>;
    }

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
                            {typeof value === 'object' ? JSON.stringify(value) : value}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductSpecifications;
