// src/components/public/Home/JoinDealerSection.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface JoinDealerSectionProps {
    section: any;
}

const JoinDealerSection: React.FC<JoinDealerSectionProps> = ({ section }) => {
    const content = section.content || {};

    return (
        <section className="py-16 px-4">
            <div className="container mx-auto">
                <div className="bg-blue-600 rounded-3xl p-12 text-center relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500 rounded-full -translate-y-1/2 translate-x-1/3 opacity-50"></div>
                    <div className="absolute left-0 bottom-0 w-64 h-64 bg-blue-700 rounded-full translate-y-1/2 -translate-x-1/3 opacity-30"></div>

                    {/* Content */}
                    <div className="relative z-10">
                        <h2 className="text-4xl font-bold text-white mb-6">
                            {section.title || "JOIN THE INDPOWER DEALER NETWORK"}
                        </h2>
                        <p className="text-white text-lg max-w-2xl mx-auto mb-8">
                            {section.subtitle || "Become part of our growing family of 3000+ Dealers and Distributors across India and Expand your business with us"}
                        </p>
                        <Link
                            to={content.buttonLink || "/dealer-application"}
                            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition"
                        >
                            {content.buttonText || "APPLY NOW"}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JoinDealerSection;