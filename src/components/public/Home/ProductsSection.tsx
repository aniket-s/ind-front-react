// src/components/public/Home/ProductsSection.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBolt,
    faBatteryThreeQuarters,
    faMotorcycle,
    faSolarPanel,
    faCheck,
    faShieldAlt,
    IconDefinition
} from '@fortawesome/free-solid-svg-icons';

interface Category {
    icon?: IconDefinition | string;
    name: string;
    active?: boolean;
    isText?: boolean;
    isImage?: boolean;
    imageUrl?: string;
}

interface Product {
    category?: string;
    name?: string;
    description?: string;
    warranty?: string;
    image?: string;
}

interface ProductsContent {
    features?: string[];
    product?: Product;
    categories?: Category[];
}

interface ProductsSectionData {
    title?: string;
    subtitle?: string;
    content?: ProductsContent;
}

interface ProductsSectionProps {
    section: ProductsSectionData;
}

// Icon mapping for string-based icons from backend
const iconMap: { [key: string]: IconDefinition } = {
    'fas fa-bolt': faBolt,
    'fas fa-battery-three-quarters': faBatteryThreeQuarters,
    'fas fa-motorcycle': faMotorcycle,
    'fas fa-solar-panel': faSolarPanel,
    'fas fa-check': faCheck,
    'fas fa-shield-alt': faShieldAlt,
};

const ProductsSection: React.FC<ProductsSectionProps> = ({ section }) => {
    const content = section.content || {};

    const defaultCategories: Category[] = [
        { icon: faBolt, name: "Inverter", active: true },
        { icon: faBatteryThreeQuarters, name: "Inverter Batteries" },
        {
            name: "2 W Batteries",
            isImage: true,
            imageUrl: "/icons/2w-battery.svg" // Replace with your actual icon image path
        },
        {
            name: "3 W Batteries",
            isImage: true,
            imageUrl: "/icons/3w-battery.svg" // Replace with your actual icon image path
        },
        {
            name: "4 W Batteries",
            isImage: true,
            imageUrl: "/icons/4w-battery.svg" // Replace with your actual icon image path
        },
        { icon: faMotorcycle, name: "e-Rickshaw Batteries" },
        { icon: faSolarPanel, name: "Solar" },
    ];

    // Use API data if available, otherwise use defaults
    const features = content.features && content.features.length > 0
        ? content.features
        : [
            "Pure Sine Wave Output",
            "LED Display Panel",
            "Microprocessor Control",
            "Overload Protection",
            "Short Circuit Protection",
            "Battery Deep Discharge",
        ];

    const product = {
        category: content.product?.category || "INVERTER",
        name: content.product?.name || "Premium Power Inverter Series",
        description: content.product?.description || "Our premium inverters are engineered to provide reliable backup power for homes and businesses with advanced technology and sturdy construction for uninterrupted power supply.",
        warranty: content.product?.warranty || "36 Months Standard Warranty",
        image: content.product?.image || "https://www.claudeusercontent.com/api/placeholder/500/500"
    };

    // Process categories from backend if they exist
    const categories = content.categories && content.categories.length > 0
        ? content.categories.map((category: Category) => ({
            ...category,
            icon: category.isText || (typeof category.icon === 'string' && category.icon.length <= 3)
                ? category.icon  // Keep text icons as is
                : typeof category.icon === 'string'
                    ? iconMap[category.icon] || faBolt
                    : category.icon
        }))
        : defaultCategories;

    const getIcon = (icon: IconDefinition | string): IconDefinition => {
        if (typeof icon === 'string') {
            return iconMap[icon] || faBolt;
        }
        return icon;
    };

    const renderCategoryIcon = (category: Category) => {
        if (category.isImage && category.imageUrl) {
            return (
                <img
                    src={category.imageUrl}
                    alt={category.name}
                    className={`w-5 h-5 mr-3 object-contain ${category.active ? "" : "opacity-50"}`}
                />
            );
        } else if (category.isText) {
            return (
                <span className={`mr-3 font-bold ${category.active ? "" : "text-gray-400"}`}>
                    {typeof category.icon === 'string' ? category.icon : ''}
                </span>
            );
        } else {
            return (
                <FontAwesomeIcon
                    icon={getIcon(category.icon!)}
                    className={`mr-3 ${category.active ? "" : "text-gray-400"}`}
                />
            );
        }
    };

    return (
        <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">OUR PRODUCTS</h2>
                    <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Browse our range of premium power solutions designed for your specific needs.
                    </p>
                </div>

                {/* Products Content */}
                <div className="flex gap-8">
                    {/* Left Sidebar */}
                    <div className="w-80 flex-shrink-0">
                        {/* Product Categories Card */}
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                            <div className="bg-blue-600 text-white p-4">
                                <h3 className="text-xl font-semibold">Product Categories</h3>
                                <p className="text-sm mt-1 opacity-90">Find your perfect power solution</p>
                            </div>
                            <div className="p-4 space-y-3">
                                {categories.map((category: Category, index: number) => (
                                    <Link
                                        key={index}
                                        to="/products"
                                        className={`flex items-center p-2 rounded transition ${
                                            category.active
                                                ? "text-blue-600 font-medium hover:bg-blue-50"
                                                : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                                        }`}
                                    >
                                        {renderCategoryIcon(category)}
                                        {category.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Need Help Card */}
                        <div className="bg-yellow-100 rounded-lg p-6 text-center">
                            <h4 className="text-xl font-semibold text-gray-800 mb-3">Need Help?</h4>
                            <p className="text-gray-700 text-sm mb-4">
                                Talk to our experts for personalized product recommendations.
                            </p>
                            <Link to="/contact" className="bg-white text-blue-600 px-6 py-2 rounded-full font-medium hover:bg-gray-50 transition border border-gray-200 inline-block">
                                Contact Us
                            </Link>
                        </div>
                    </div>

                    {/* Main Product Display */}
                    <div className="flex-1 bg-white rounded-lg shadow-sm p-8">
                        {/* Best Seller Badge */}
                        <div className="mb-6">
                            <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                                Best Seller
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            {/* Product Info */}
                            <div>
                                <p className="text-blue-600 font-semibold mb-2">{product.category}</p>
                                <h3 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    {product.description}
                                </p>

                                <div className="mb-8">
                                    <h4 className="font-semibold text-gray-800 mb-4">Key Features</h4>
                                    <div className="grid grid-cols-2 gap-3">
                                        {features.map((feature, index) => (
                                            <div key={index} className="flex items-center text-gray-700">
                                                <FontAwesomeIcon
                                                    icon={faCheck}
                                                    className="text-green-500 mr-2"
                                                />
                                                <span className="text-sm">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Warranty Badge */}
                                <div className="bg-blue-600 text-white rounded-lg p-4 inline-flex items-center">
                                    <FontAwesomeIcon
                                        icon={faShieldAlt}
                                        className="mr-3 text-2xl"
                                    />
                                    <span className="font-semibold text-lg">{product.warranty}</span>
                                </div>
                            </div>

                            {/* Product Image */}
                            <div className="relative">
                                <div className="bg-yellow-200 rounded-full absolute inset-0 transform scale-75"></div>
                                <div className="relative z-10 flex items-center justify-center h-full">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductsSection;