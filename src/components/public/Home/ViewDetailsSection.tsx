// src/components/public/Home/ViewDetailsSection.tsx
import React from 'react';
import { Link } from 'react-router-dom';

type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface Button {
    link: string;
    text: string;
    style: string;
    icon?: string;
}

interface FloatingIcon {
    icon: string;
    position: Position;
}

interface ViewDetailsContent {
    buttons?: Button[];
    floatingIcons?: FloatingIcon[];
}

interface ViewDetailsSectionData {
    title?: string;
    content?: ViewDetailsContent;
}

interface ViewDetailsSectionProps {
    section: ViewDetailsSectionData;
}

const ViewDetailsSection: React.FC<ViewDetailsSectionProps> = ({ section }) => {
    const content = section.content || {};
    const buttons = content.buttons && content.buttons.length > 0
        ? content.buttons
        : [
            { link: "/products", text: "OUR PRODUCT RANGE", style: "primary" },
            { icon: "fas fa-download", link: "/Indpower-Sales-Docket.pdf", text: "DOWNLOAD BROCHURE", style: "primary" }
        ];

    const floatingIcons = content.floatingIcons || [
        { icon: "fas fa-battery-full", position: "top-left" as Position },
        { icon: "fas fa-bolt", position: "top-right" as Position },
        { icon: "fas fa-plug", position: "bottom-left" as Position },
        { icon: "fas fa-solar-panel", position: "bottom-right" as Position }
    ];

    return (
        <section className="bg-yellow-300 py-16 relative overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Floating Icons */}
                {floatingIcons.map((item, index) => {
                    const positionClasses: Record<Position, string> = {
                        'top-left': 'top-12 left-12',
                        'top-right': 'top-12 right-12',
                        'bottom-left': 'bottom-12 left-12',
                        'bottom-right': 'bottom-12 right-12'
                    };

                    const rotationClasses: Record<Position, string> = {
                        'top-left': 'rotate-12',
                        'top-right': '-rotate-12',
                        'bottom-left': '-rotate-6',
                        'bottom-right': 'rotate-6'
                    };

                    return (
                        <div
                            key={index}
                            className={`absolute ${positionClasses[item.position]} bg-white p-4 rounded-lg shadow-lg transform ${rotationClasses[item.position]}`}
                        >
                            <i className={`${item.icon} text-blue-600 text-2xl`}></i>
                        </div>
                    );
                })}

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