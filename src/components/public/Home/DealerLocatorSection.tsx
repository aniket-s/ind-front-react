// src/components/public/Home/DealerLocatorSection.tsx
import React from 'react';

interface DealerLocatorSectionProps {
    section: any;
}

const DealerLocatorSection: React.FC<DealerLocatorSectionProps> = ({ section }) => {
    const content = section.content || {};
    const stats = content.stats || [
        { icon: "fas fa-handshake", value: "3000+", label: "Dealers & Distributors" },
        { icon: "fas fa-map-marker-alt", value: "200+", label: "Cities Covered" },
        { icon: "fas fa-tools", value: "100+", label: "Service Centers" },
        { icon: "fas fa-headset", value: "24/7", label: "Customer Support" },
    ];

    return (
        <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
                {/* Title if provided */}
                {section.title && (
                    <div className="text-center mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {section.title}
                        </h2>
                        {section.subtitle && (
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                {section.subtitle}
                            </p>
                        )}
                    </div>
                )}

                {/* Search Bar */}
                <div className="max-w-3xl mx-auto mb-12">
                    <div className="flex items-center bg-gray-200 rounded-full overflow-hidden">
                        <input
                            type="text"
                            placeholder={content.placeholder || "Enter Pin Code To Locate Nearby Dealer"}
                            className="flex-1 px-6 py-4 bg-transparent text-gray-600 placeholder-gray-500 focus:outline-none"
                        />

                        <button className="bg-blue-600 text-white px-8 py-4 font-semibold hover:bg-blue-700 transition flex items-center">
                            {content.buttonText || "FIND DEALER"}
                            <div className="ml-2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[10px] border-l-white"></div>
                        </button>
                    </div>
                </div>

                {/* Map and Stats Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Map Placeholder */}
                    <div className="bg-gray-300 rounded-lg h-[400px] relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <i className="fas fa-map-marked-alt text-gray-400 text-6xl mb-4"></i>
                                <p className="text-gray-500">Map View</p>
                            </div>
                        </div>
                    </div>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-2 gap-4">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-white rounded-2xl p-6 border-2 border-yellow-400 text-center">
                                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                    <i className={`${stat.icon} text-blue-600 text-3xl`}></i>
                                </div>
                                <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</h3>
                                <p className="text-gray-600">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DealerLocatorSection;