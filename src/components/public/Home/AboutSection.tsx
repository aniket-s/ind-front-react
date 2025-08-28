// src/components/public/Home/AboutSection.tsx
import React from 'react';

interface Feature {
    icon: string;
    title: string;
    description: string;
}

interface AboutContent {
    features?: Feature[];
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

// SVG Icon Components
const ToolsIcon = () => (
    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const ShieldIcon = () => (
    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
);

// Map icon names to components
const iconMap: { [key: string]: React.FC } = {
    'tools': ToolsIcon,
    'shield': ShieldIcon,
    // Default icons if specific ones aren't found
    'fas fa-tools': ToolsIcon,
    'fas fa-shield-alt': ShieldIcon,
};

const AboutSection: React.FC<AboutSectionProps> = ({ section }) => {
    const content = section.content || {};
    const features = content.features && content.features.length > 0
        ? content.features
        : [
            { icon: "tools", title: "Easy Installation", description: "Take a look at our up of the round shows" },
            { icon: "shield", title: "Quality Material", description: "Take a look at our up of the round shows" }
        ];

    const getIcon = (iconName: string) => {
        // Try to find a matching icon component
        const IconComponent = iconMap[iconName] || iconMap[iconName.toLowerCase()] || ToolsIcon;
        return <IconComponent />;
    };

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

                        <div className="grid grid-cols-2 gap-6">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-amber-400 rounded-full flex-shrink-0 flex items-center justify-center shadow-md">
                                        {getIcon(feature.icon)}
                                    </div>
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