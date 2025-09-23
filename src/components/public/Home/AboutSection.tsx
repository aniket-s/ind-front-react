// src/components/public/Home/AboutSection.tsx
import React from 'react';

interface AboutContent {
    image?: string;
    buttonText?: string;
    description?: string;
}

interface AboutSectionData {
    title?: string;
    content?: AboutContent;
}

interface AboutSectionProps {
    section: AboutSectionData;
}

const AboutSection: React.FC<AboutSectionProps> = ({ section }) => {
    const content = section.content || {};

    // Always use these static features - ignore any backend features
    const staticFeatures = [
        {
            title: "Legacy of trust & expertise",
            description: "Three decades of experience delivering gold standard quality power solutions",
            image: "/legacy-of-trust.png"
        },
        {
            title: "Made in India, Designed for India",
            description: "Proudly Indian products tailored for our nation's unique power needs",
            image: "/made-in-india.png"
        }
    ];

    return (
        <section className="bg-white py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Image */}
                    <div className="relative">
                        <div className="flex justify-center items-center">
                            <div className="relative w-[500px] h-[500px]">
                                <img
                                    src={content.image || "/logo_banner.jpg"}
                                    alt="About IndPower"
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Content */}
                    <div>
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold mb-6">
                            {content.buttonText || "About Us"}
                        </button>

                        <h2 className="text-4xl font-bold text-gray-800 mb-6">
                            {section.title || "We Are The Best & Expert For Your Power Solution"}
                        </h2>

                        <p className="text-gray-600 leading-relaxed mb-8">
                            {content.description || "We, at INDPOWER, take pride in providing power solution products that are truly made in India and made for India. Coming from house of experts, with more than three decades of experience in the industry, our products are trusted to be of \"gold standard\" quality and deliver powerful performance. Top of it with our strong pan-India service support, we are here to be 'Desh ki Shakti, Desh ka Bharosa'"}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {staticFeatures.map((feature, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <img
                                        src={feature.image}
                                        alt={feature.title}
                                        className="w-24 h-24 object-contain flex-shrink-0"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-1">{feature.title}</h4>
                                        <p className="text-sm text-gray-600">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;