// src/pages/public/Solar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSolarPanel,
    faShieldAlt,
    faPhone
} from '@fortawesome/free-solid-svg-icons';

interface ProductSpec {
    productType: string;
    category: string;
    capacity: string;
    modelName: string;
    warranty: string;
    isComingSoon?: boolean;
}

const solarProducts: ProductSpec[] = [
    // Offgrid Solar Inverter
    { productType: 'Offgrid Solar Inverter', category: 'MPPT Solar PCU', capacity: '3.0 KVA 24V', modelName: 'IPS 3250 24 V', warranty: '36 Months' },
    { productType: 'Offgrid Solar Inverter', category: 'PWM Solar UPS', capacity: '5.0 KVA 48V', modelName: 'IPS OGM5004', warranty: '60 Months' },
    { productType: 'Offgrid Solar Inverter', category: 'GI+ Inverter', capacity: '2.2 KVA 24V', modelName: 'IPS OGP2202 Coming Soon', warranty: '36 Months', isComingSoon: true },
    // Grid Tie
    { productType: 'Grid Tie', category: 'GI+ Inverter', capacity: '3KVA', modelName: 'Coming Soon', warranty: '8 yrs.', isComingSoon: true },
    { productType: 'Grid Tie', category: 'GI+ Inverter', capacity: '5KVA', modelName: 'Coming Soon', warranty: '8 yrs.', isComingSoon: true },
    // Solar Module
    { productType: 'Solar Module', category: '24V- Solar Panel', capacity: '550 Watt', modelName: 'IPS MP550', warranty: '12 yrs. (std-27 yrs.(p.w))' },
    { productType: 'Solar Module', category: '24V- Solar Panel', capacity: '335 Watt', modelName: 'IPSMP335', warranty: '12 yrs. (std-27 yrs.(p.w))' },
    { productType: 'Solar Module', category: 'C10 Panel', capacity: '550 Watt', modelName: 'Coming Soon', warranty: '8 yrs. (std-27 yrs.(p.w))', isComingSoon: true },
    // Lead Acid Solar Batteries
    { productType: 'Lead Acid Solar Batteries', category: 'C10 Solar Batteries', capacity: '150 Ah 12V', modelName: 'IPS150PTT', warranty: '36+24 Months' },
    { productType: 'Lead Acid Solar Batteries', category: 'C10 Solar Batteries', capacity: '150 Ah 12V', modelName: 'IPS150SOTT (Coming Soon)', warranty: '60 Months', isComingSoon: true },
    { productType: 'Lead Acid Solar Batteries', category: 'C10 Solar Batteries', capacity: '200 Ah 12V', modelName: 'IPS200SPTT (Coming Soon)', warranty: '36 Months', isComingSoon: true },
    { productType: 'Lead Acid Solar Batteries', category: 'C10 Solar Batteries', capacity: '200 Ah 12V', modelName: 'IPS200SOTT', warranty: '60 Months' },
    // ACDB & DCDB
    { productType: 'ACDB', category: '-', capacity: '-', modelName: 'Coming Soon', warranty: '1 yrs.', isComingSoon: true },
    { productType: 'DCDB', category: '-', capacity: '-', modelName: 'Coming Soon', warranty: '1 yrs.', isComingSoon: true }
];

const Solar: React.FC = () => {
    const filteredProducts = solarProducts;

    const getWarrantyBadgeColor = (warranty: string) => {
        if (warranty.includes('60 Months') || warranty.includes('8 yrs')) return 'bg-green-100 text-green-800';
        if (warranty.includes('36')) return 'bg-blue-100 text-blue-800';
        if (warranty.includes('12 yrs')) return 'bg-purple-100 text-purple-800';
        return 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <FontAwesomeIcon icon={faSolarPanel} className="text-4xl" />
                        <h1 className="text-4xl md:text-5xl font-bold">Solar Products</h1>
                    </div>
                    <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                        Complete range of solar inverters, panels, and batteries for sustainable power
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Products Layout: Images Left (35%), Table Right (65%) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left: Two Product Images Stacked - 35% width */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Solar Panel Image */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <img
                                src="/image-p-1.jpg"
                                alt="Solar Panel"
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        {/* Battery Image */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <img
                                src="/image-p-2.jpg"
                                alt="Solar Battery"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </div>

                    {/* Right: Product Table - 65% width */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                            {/* Table Header */}
                            <div className="bg-blue-600 text-white p-6">
                                <h2 className="text-2xl font-bold">Product Specifications</h2>
                                <p className="text-blue-100 mt-1">Complete solar product range</p>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Product Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Category</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Capacity</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Model Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Warranty</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                    {filteredProducts.map((product, index) => (
                                        <tr
                                            key={index}
                                            className={`hover:bg-blue-50 transition-colors ${product.isComingSoon ? 'bg-gray-50' : ''}`}
                                        >
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-semibold text-gray-900">{product.productType}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-gray-700">{product.category}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-medium text-gray-900">{product.capacity}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-medium text-gray-900">{product.modelName}</span>
                                                    {product.isComingSoon && (
                                                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                                Coming Soon
                                                            </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getWarrantyBadgeColor(product.warranty)}`}>
                                                        <FontAwesomeIcon icon={faShieldAlt} />
                                                        {product.warranty}
                                                    </span>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>

                            {filteredProducts.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-gray-500">No products found matching your search.</p>
                                </div>
                            )}

                            {/* Footer */}
                            <div className="bg-gray-50 px-6 py-4">
                                <p className="text-sm text-gray-600">
                                    <span className="font-semibold">{filteredProducts.length}</span> products displayed
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-blue-600 text-white py-12 mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Go Solar?</h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Get expert advice on the perfect solar solution for your needs
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/contact"
                            className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
                        >
                            <FontAwesomeIcon icon={faPhone} />
                            Contact Us
                        </Link>
                        <Link
                            to="/dealer-locator"
                            className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-blue-600 transition-colors"
                        >
                            Find Dealer
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Solar;