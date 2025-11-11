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

    // Helper function to check if a link is external or a file
    const isExternalOrFile = (link: string) => {
        return link.startsWith('http') ||
            link.startsWith('https') ||
            link.endsWith('.pdf') ||
            link.endsWith('.doc') ||
            link.endsWith('.docx') ||
            link.includes('.pdf');
    };

    // Render button based on link type
    const renderButton = (button: Button, index: number) => {
        const buttonClasses = "bg-gradient-to-r from-[#e1a038] via-[#efdd71] via-[#f7f0aa] via-[#ebda73] to-[#f7d89f] text-gray-800 px-8 py-3 rounded-full font-semibold hover:from-[#C5A043] hover:to-[#8B6F2F] transition-all duration-300 inline-flex items-center shadow-lg";

        if (isExternalOrFile(button.link)) {
            // For external links or files, use anchor tag
            return (
                <a
                    key={index}
                    href={button.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonClasses}
                    download={button.link.includes('.pdf') ? true : undefined}
                >
                    {button.icon && <i className={`${button.icon} mr-3`}></i>}
                    <span>{button.text}</span>
                </a>
            );
        } else {
            // For internal links, use React Router Link
            return (
                <Link
                    key={index}
                    to={button.link}
                    className={buttonClasses}
                >
                    {button.icon && <i className={`${button.icon} mr-3`}></i>}
                    <span>{button.text}</span>
                </Link>
            );
        }
    };

    return (
        <section className="bg-gradient-to-br from-[#F4C430]/20 to-[#C5A043]/20 py-16 relative overflow-hidden">
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
                    <div className="w-24 h-1 bg-gradient-to-r from-[#e1a038] via-[#efdd71] via-[#f7f0aa] via-[#ebda73] to-[#f7d89f] mx-auto mb-8"></div>

                    <div className="space-y-6">
                        {buttons.map((button, index) => (
                            <div key={index}>
                                {renderButton(button, index)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ViewDetailsSection;