// src/components/public/Home/JoinDealerSection.tsx
import React from 'react';
import { Link } from 'react-router-dom';

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

const JoinDealerSection: React.FC<JoinDealerSectionProps> = ({ section }) => {
    const content = section.content || {};

    return (
        <section
            className="relative py-20 px-4"
            style={{
                // Use the first image as full-width background
                backgroundImage: `url('/map.jpg')`, // Save your first image with this name in public folder
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundColor: '#0f2962', // Fallback color
                minHeight: '500px'
            }}
        >
            {/* Optional overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent"></div>

            <div className="container mx-auto relative z-10">
                <div className="flex items-center min-h-[400px]">
                    {/* Left side content */}
                    <div className="w-full lg:w-7/12 xl:w-1/2 text-left">
                        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 uppercase tracking-wide">
                            {section.title || "JOIN THE INDPOWER DEALER NETWORK"}
                        </h2>

                        {/* Yellow accent line */}
                        <div className="w-24 h-1 bg-yellow-400 mb-8"></div>

                        <p className="text-white/90 text-base lg:text-lg leading-relaxed mb-10 max-w-xl">
                            {section.subtitle || "Become part of our growing family of 3000+ Dealers and Distributors across India and Expand your business with us"}
                        </p>

                        <Link
                            to={content.buttonLink || "/dealer-application"}
                            className="inline-flex items-center bg-white text-blue-900 px-10 py-4 rounded-full font-bold text-base uppercase tracking-wider hover:bg-yellow-400 hover:text-blue-900 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1"
                        >
                            {content.buttonText || "APPLY NOW"}
                        </Link>
                    </div>

                    {/* Right side is empty - map shows from background image */}
                    <div className="hidden lg:block w-5/12 xl:w-1/2"></div>
                </div>
            </div>
        </section>
    );
};

export default JoinDealerSection;