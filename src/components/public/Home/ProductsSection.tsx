// src/components/public/Home/ProductsSection.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBolt,
    faBatteryThreeQuarters,
    faMotorcycle,
    faSolarPanel,
    faCheck,
    faShieldAlt,
    faBars,
    faTimes,
    IconDefinition
} from '@fortawesome/free-solid-svg-icons';

interface Category {
    icon?: IconDefinition | string;
    name: string;
    active?: boolean;
    isText?: boolean;
    isImage?: boolean;
    imageUrl?: string;
    link?: string; // Added link property
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

// Category link mapping
const categoryLinkMap: { [key: string]: string } = {
    "Inverter": "/products?category=inverters",
    "Inverter Batteries": "/products?category=inverter-battery",
    "2 W Batteries": "/products?category=2-w-batteries",
    "3 W Batteries": "/products?category=3-w-batteries",
    "4 W Batteries": "/products?category=4-w-batteries",
    "e-Rickshaw Batteries": "/products?category=e-rickshaw-batteries",
    "Solar": "/products?category=solar",
    "Tractor and CV": "/products?category=tractor-and-cv"
};

const ProductsSection: React.FC<ProductsSectionProps> = ({ section }) => {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const content = section.content || {};

    const defaultCategories: Category[] = [
        { icon: faBolt, name: "Inverter", active: true },
        { icon: faBatteryThreeQuarters, name: "Inverter Batteries" },
        {
            name: "2 W Batteries",
            isImage: true,
            imageUrl: "/icons/2w-battery.svg"
        },
        {
            name: "3 W Batteries",
            isImage: true,
            imageUrl: "/icons/3w-battery.svg"
        },
        {
            name: "4 W Batteries",
            isImage: true,
            imageUrl: "/icons/4w-battery.svg"
        },
        { icon: faMotorcycle, name: "e-Rickshaw Batteries" },
        { icon: faSolarPanel, name: "Solar" },
    ];

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
        image: content.product?.image || "/main_product.png",
    };

    // Process categories with links
    const categories = content.categories && content.categories.length > 0
        ? content.categories.map((category: Category) => ({
            ...category,
            icon: category.isText || (typeof category.icon === 'string' && category.icon.length <= 3)
                ? category.icon
                : typeof category.icon === 'string'
                    ? iconMap[category.icon] || faBolt
                    : category.icon,
            link: category.link || categoryLinkMap[category.name] || "/products"
        }))
        : defaultCategories.map((category) => ({
            ...category,
            link: categoryLinkMap[category.name] || "/products"
        }));

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

    const Sidebar = () => (
        <>
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
                            to={category.link || "/products"}
                            className={`flex items-center p-2 rounded transition ${
                                category.active
                                    ? "text-blue-600 font-medium hover:bg-blue-50"
                                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                            }`}
                            onClick={() => setIsMobileSidebarOpen(false)}
                        >
                            {renderCategoryIcon(category)}
                            {category.name}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Need Help Card - Hide on mobile when in sidebar */}
            <div className="bg-yellow-100 rounded-lg p-6 text-center hidden lg:block">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Need Help?</h4>
                <p className="text-gray-700 text-sm mb-4">
                    Talk to our experts for personalized product recommendations.
                </p>
                <Link
                    to="/contact"
                    className="bg-white text-blue-600 px-6 py-2 rounded-full font-medium hover:bg-gray-50 transition border border-gray-200 inline-block"
                >
                    Contact Us
                </Link>
            </div>
        </>
    );

    return (
        <section className="bg-gray-50 py-8 md:py-16">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">OUR PRODUCTS</h2>
                    <div className="w-24 h-1 bg-blue-600 mx-auto mb-4 md:mb-6"></div>
                    <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto px-4">
                        Browse our range of premium power solutions designed for your specific needs.
                    </p>
                </div>

                {/* Mobile Category Button */}
                <div className="lg:hidden mb-4">
                    <button
                        onClick={() => setIsMobileSidebarOpen(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2"
                    >
                        <FontAwesomeIcon icon={faBars} />
                        Browse Categories
                    </button>
                </div>

                {/* Mobile Sidebar Overlay */}
                {isMobileSidebarOpen && (
                    <div className="fixed inset-0 z-50 lg:hidden">
                        <div
                            className="absolute inset-0 bg-black bg-opacity-50"
                            onClick={() => setIsMobileSidebarOpen(false)}
                        />
                        <div className="absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-gray-50 overflow-y-auto">
                            <div className="p-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-semibold">Categories</h2>
                                    <button
                                        onClick={() => setIsMobileSidebarOpen(false)}
                                        className="p-2 rounded-lg hover:bg-gray-200 transition"
                                    >
                                        <FontAwesomeIcon icon={faTimes} className="text-gray-600" />
                                    </button>
                                </div>
                                <Sidebar />
                            </div>
                        </div>
                    </div>
                )}

                {/* Products Content */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Desktop Sidebar */}
                    <div className="hidden lg:block w-80 flex-shrink-0">
                        <Sidebar />
                    </div>

                    {/* Main Product Display */}
                    <div className="flex-1 bg-white rounded-lg shadow-sm p-4 md:p-8">
                        {/* Best Seller Badge */}
                        <div className="mb-4 md:mb-6">
    <span
        className="bg-gradient-to-r from-[#e1a038] via-[#efdd71] via-[#f7f0aa] via-[#ebda73] to-[#f7d89f] text-gray-800 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-sm font-semibold shadow-md">
        Best Seller
    </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            {/* Product Info */}
                            <div className="order-2 md:order-1">
                                <p className="text-blue-600 font-semibold mb-2">{product.category}</p>
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{product.name}</h3>
                                <p className="text-gray-600 mb-6 leading-relaxed text-sm md:text-base">
                                    {product.description}
                                </p>

                                <div className="mb-6 md:mb-8">
                                    <h4 className="font-semibold text-gray-800 mb-3 md:mb-4">Key Features</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                                        {features.map((feature, index) => (
                                            <div key={index} className="flex items-center text-gray-700">
                                                <FontAwesomeIcon
                                                    icon={faCheck}
                                                    className="text-green-500 mr-2 text-sm"
                                                />
                                                <span className="text-sm">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Warranty Badge */}
                                <div
                                    className="bg-gradient-to-r from-[#e1a038] via-[#efdd71] via-[#f7f0aa] via-[#ebda73] to-[#f7d89f] text-gray-800 rounded-lg p-3 md:p-4 inline-flex items-center shadow-lg">
                                    <FontAwesomeIcon
                                        icon={faShieldAlt}
                                        className="mr-2 md:mr-3 text-xl md:text-2xl"
                                    />
                                    <span className="font-semibold text-base md:text-lg">{product.warranty}</span>
                                </div>
                            </div>

                            {/* Product Image */}
                            <div className="relative order-1 md:order-2 mb-6 md:mb-0">
                                <div
                                    className="bg-yellow-200 rounded-full absolute inset-0 transform scale-75 hidden md:block"></div>
                                <div className="relative z-10 flex items-center justify-center h-64 md:h-full">
                                    <div
                                        className="absolute inset-0 bg-gradient-to-br from-[#F4C430]/10 to-[#C5A043]/10 rounded-full transform scale-75"></div>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="relative z-10 w-full h-full object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Need Help Card */}
                <div className="lg:hidden mt-6 bg-yellow-100 rounded-lg p-6 text-center">
                    <h4 className="text-xl font-semibold text-gray-800 mb-3">Need Help?</h4>
                    <p className="text-gray-700 text-sm mb-4">
                        Talk to our experts for personalized product recommendations.
                    </p>
                    <Link
                        to="/contact"
                        className="bg-white text-blue-600 px-6 py-2 rounded-full font-medium hover:bg-gray-50 transition border border-gray-200 inline-block"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ProductsSection;