// src/components/public/ProductDetail/TechnicalSpecsSection.tsx
import React from 'react';
import { Product } from '@/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

interface TechnicalSpecsSectionProps {
    product: Product;
}

export const TechnicalSpecsSection: React.FC<TechnicalSpecsSectionProps> = ({ product }) => {
    // Default specifications if product doesn't have any
    const defaultSpecifications = [
        { label: "Output Waveform", value: "Pure Sine Wave" },
        { label: "Efficiency", value: "≥ 85%" },
        { label: "Input Voltage Range", value: "140V - 280V AC" },
        { label: "Output Voltage", value: "220V ± 10%" },
        { label: "Frequency", value: "50Hz ± 2%" },
        { label: "Transfer Time", value: "≤ 10ms" },
        { label: "Battery Type", value: "12V Lead Acid / Tubular" },
        { label: "Operating Temperature", value: "0°C to 45°C" },
        { label: "Protection", value: "Overload, Short Circuit, Deep Discharge" },
        { label: "Warranty", value: product.warranty || "24 Months" },
    ];

    // Convert product specifications to array format
    const specifications = product.specifications
        ? Object.entries(product.specifications).map(([label, value]) => ({ label, value: String(value) }))
        : defaultSpecifications;

    return (
        <section className="bg-gray-100 py-8 md:py-16">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-start">
                    {/* Left Content */}
                    <div className="lg:w-1/2">
                        {/* Section Heading */}
                        <h2 className="text-2xl md:text-4xl font-bold text-blue-600 mb-4 md:mb-6">
                            Technical Specifications
                        </h2>

                        {/* Description */}
                        <p className="text-gray-700 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                            {product.name} is built with precision engineering and the highest quality
                            components to deliver consistent, reliable performance. Every unit undergoes rigorous
                            testing to ensure it meets our strict quality standards.
                        </p>

                        <p className="text-gray-700 mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
                            {product.description ||
                                "From compact home models to powerful high-capacity units, each inverter features advanced protection circuits, efficient power conversion, and intelligent battery management systems designed for the Indian market."}
                        </p>

                        {/* Key Features List */}
                        {product.features && product.features.length > 0 && (
                            <div className="bg-white rounded-lg p-6 shadow-sm mb-6 lg:mb-0">
                                <h3 className="font-semibold text-gray-800 mb-4">Key Features</h3>
                                <ul className="space-y-2">
                                    {product.features.slice(0, 5).map((feature, index) => (
                                        <li key={index} className="flex items-start text-sm text-gray-700">
                                            <FontAwesomeIcon
                                                icon={faCheck}
                                                className="text-green-600 mr-2 mt-0.5"
                                            />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Right Specifications Table */}
                    <div className="lg:w-1/2 overflow-x-auto">
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden min-w-full">
                            <table className="w-full">
                                <thead>
                                <tr className="bg-blue-600 text-white">
                                    <th className="px-4 md:px-6 py-3 md:py-4 text-left font-semibold text-sm md:text-base">
                                        Details
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {specifications.map((spec, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition">
                                        <td className="px-4 md:px-6 py-3 md:py-4 text-gray-700 text-sm md:text-base">
                                            <span className="font-medium text-gray-900">{spec.label}:</span> {spec.value}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Additional Technical Specs if available */}
                        {product.technicalSpecs && Object.keys(product.technicalSpecs).length > 0 && (
                            <div className="mt-6 bg-white rounded-lg shadow-lg overflow-hidden">
                                <div className="bg-blue-600 text-white px-6 py-3">
                                    <h3 className="font-semibold">Additional Technical Details</h3>
                                </div>
                                <div className="p-6">
                                    <dl className="space-y-3">
                                        {Object.entries(product.technicalSpecs).map(([key, value], index) => (
                                            <div key={index} className="flex justify-between">
                                                <dt className="text-gray-700 font-medium">{key}:</dt>
                                                <dd className="text-gray-900">{String(value)}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};