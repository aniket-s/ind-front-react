// src/components/public/Home/JoinDealerSection.tsx
import React from 'react';

interface JoinDealerContent {
    buttonLink?: string;
    buttonText?: string;
}

interface JoinDealerSectionData {
    title?: string;
    subtitle?: string;
    content?: JoinDealerContent;
}

interface JoinDealerSectionProps {
    section: JoinDealerSectionData;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const JoinDealerSection: React.FC<JoinDealerSectionProps> = ({ section }) => {
    const stats = [
        {
            icon: (
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
            ),
            number: "3000+",
            label: "Dealers & Distributors",
            faIcon: "fa-handshake"
        },
        {
            icon: (
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
            ),
            number: "200+",
            label: "Cities Covered",
            faIcon: "fa-map-marker-alt"
        },
        {
            icon: (
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
                </svg>
            ),
            number: "100+",
            label: "Service Centers",
            faIcon: "fa-tools"
        },
        {
            icon: (
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z"/>
                </svg>
            ),
            number: "24/7",
            label: "Customer Support",
            faIcon: "fa-headset"
        }
    ];

    return (
        <section
            className="relative py-20 px-4"
            style={{
                backgroundImage: `url('/map.jpg')`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundColor: '#0f2962',
                minHeight: '500px'
            }}
        >
            {/* Optional overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent"></div>

            <div className="container mx-auto relative z-10">
                <div className="flex items-center min-h-[400px]">
                    {/* Left side with statistics cards */}
                    <div className="w-full lg:w-7/12 xl:w-1/2">
                        <div className="grid grid-cols-2 gap-6 max-w-xl">
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="group bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                                >
                                    <div className="flex flex-col items-center text-center">
                                        <div className="w-16 h-16 lg:w-20 lg:h-20 mb-4 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                            {/* Using inline SVG icons instead of Font Awesome */}
                                            {stat.icon}
                                        </div>
                                        <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                                            {stat.number}
                                        </h3>
                                        <p className="text-sm lg:text-base text-gray-600 font-medium">
                                            {stat.label}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right side is empty - map shows from background image */}
                    <div className="hidden lg:block w-5/12 xl:w-1/2"></div>
                </div>
            </div>
        </section>
    );
};

export default JoinDealerSection;