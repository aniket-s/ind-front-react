// src/components/public/Home/FAQSection.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { publicService } from '@/services/public.service';
import { ChevronDownIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { cn } from '@/utils';

interface FAQSectionProps {
    section: any;
}

const FAQSection: React.FC<FAQSectionProps> = ({ section }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const { data } = useQuery({
        queryKey: ['home-faqs'],
        queryFn: () => publicService.getFAQs(),
    });

    const displayFAQs = data?.faqs.slice(0, 5) || [];

    return (
        <section className="py-16 bg-gray-50">
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

                <div className="max-w-3xl mx-auto">
                    <div className="space-y-4">
                        {displayFAQs.map((faq, index) => (
                            <div
                                key={faq.id}
                                className="bg-white rounded-lg shadow-sm overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                                >
                                    <span className="text-gray-900 font-medium">{faq.question}</span>
                                    <ChevronDownIcon
                                        className={cn(
                                            'h-5 w-5 text-gray-500 transition-transform',
                                            openIndex === index && 'rotate-180'
                                        )}
                                    />
                                </button>
                                {openIndex === index && (
                                    <div className="px-6 pb-4">
                                        <p className="text-gray-600">{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <Link
                            to="/faqs"
                            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                        >
                            View All FAQs
                            <ArrowRightIcon className="ml-2 h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;