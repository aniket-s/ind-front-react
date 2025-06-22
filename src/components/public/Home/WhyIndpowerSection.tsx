import React from 'react';
import {
    ShieldCheckIcon,
    WrenchScrewdriverIcon,
    TruckIcon,
    UserGroupIcon,
    CurrencyRupeeIcon,
    GlobeAsiaAustraliaIcon
} from '@heroicons/react/24/outline';

interface WhyIndpowerSectionProps {
    section: any;
}

const WhyIndpowerSection: React.FC<WhyIndpowerSectionProps> = ({ section }) => {
    const features = [
        {
            icon: ShieldCheckIcon,
            title: 'Quality Assurance',
            description: 'ISO certified manufacturing with rigorous quality checks',
        },
        {
            icon: WrenchScrewdriverIcon,
            title: 'Expert Support',
            description: '24/7 technical support from trained professionals',
        },
        {
            icon: TruckIcon,
            title: 'Pan India Delivery',
            description: 'Fast and reliable delivery across all states',
        },
        {
            icon: UserGroupIcon,
            title: 'Dealer Network',
            description: '500+ authorized dealers and service centers',
        },
        {
            icon: CurrencyRupeeIcon,
            title: 'Best Value',
            description: 'Competitive pricing with no compromise on quality',
        },
        {
            icon: GlobeAsiaAustraliaIcon,
            title: 'Made in India',
            description: 'Proudly manufactured in India for Indian conditions',
        },
    ];

    return (
        <section className="py-16 bg-white">
            <div className="container">
                <div className="text-center mb-12">
                    {section.title && (
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {section.title}
                        </h2>
                    )}
                    {section.subtitle && (
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            {section.subtitle}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="text-center group">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-lg mb-4 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                <feature.icon className="h-8 w-8" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyIndpowerSection;
