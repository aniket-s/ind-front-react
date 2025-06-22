// src/components/public/Home/ViewDetailsSection.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface ViewDetailsSectionProps {
    section: any;
}

const ViewDetailsSection: React.FC<ViewDetailsSectionProps> = ({ section }) => {
    const content = section.content || {};
    const buttons = content.buttons || [
        { link: "/products", text: "OUR PRODUCT RANGE", style: "primary" },
        { icon: "fas fa-download", link: "/download/brochure", text: "DOWNLOAD BROCHURE", style: "primary" }
    ];

    return (
        <section className="bg-yellow-300 py-16 relative overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Floating Icons */}
                <div className="absolute top-12 left-12 bg-white p-4 rounded-lg shadow-lg transform rotate-12">
                    <i className="fas fa-battery-full text-blue-600 text-2xl"></i>
                </div>
                <div className="absolute top-12 right-12 bg-white p-4 rounded-lg shadow-lg transform -rotate-12">
                    <i className="fas fa-bolt text-blue-600 text-2xl"></i>
                </div>
                <div className="absolute bottom-12 left-12 bg-white p-4 rounded-lg shadow-lg transform -rotate-6">
                    <i className="fas fa-plug text-blue-600 text-2xl"></i>
                </div>
                <div className="absolute bottom-12 right-12 bg-white p-4 rounded-lg shadow-lg transform rotate-6">
                    <i className="fas fa-solar-panel text-blue-600 text-2xl"></i>
                </div>

                {/* Content */}
                <div className="text-center relative z-10">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        {section.title || "VIEW COMPLETE DETAILS"}
                    </h2>
                    <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>

                    <div className="space-y-6">
                        {buttons.map((button, index) => (
                            <div key={index}>
                                <Link
                                    to={button.link}
                                    className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition inline-flex items-center shadow-lg"
                                >
                                    {button.icon && <i className={`${button.icon} mr-3`}></i>}
                                    <span>{button.text}</span>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ViewDetailsSection;