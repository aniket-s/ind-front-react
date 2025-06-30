// src/components/public/Home/FAQSection.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Category {
    id: string;
    label: string;
}

interface FAQ {
    category: string;
    question: string;
    answer: string;
}

interface FAQContent {
    categories?: Category[];
    faqs?: FAQ[];
}

interface FAQSectionData {
    title?: string;
    subtitle?: string;
    content?: FAQContent;
}

interface FAQSectionProps {
    section: FAQSectionData;
}

const FAQSection: React.FC<FAQSectionProps> = ({ section }) => {
    const [activeCategory, setActiveCategory] = useState("installation");
    const [openFAQ, setOpenFAQ] = useState<number | null>(0);

    const content = section.content || {};

    const categories = content.categories || [
        { id: "all", label: "All Questions" },
        { id: "products", label: "Products" },
        { id: "installation", label: "Installation" },
        { id: "service", label: "Service & Support" },
        { id: "dealer", label: "Dealer Network" },
        { id: "warranty", label: "Warranty" },
    ];

    const faqs = content.faqs || [
        {
            category: "installation",
            question: "What is the difference between sine wave and square wave inverters?",
            answer: "Sine wave inverters produce a smooth, consistent output similar to the power supplied by utility companies, making them ideal for sensitive electronics. Square wave inverters are more basic and cost-effective but may cause issues with certain devices. Our Premium Power Inverter Series features pure sine wave technology for optimal performance with all appliances.",
        },
        {
            category: "installation",
            question: "How do I select the right inverter capacity for my home?",
            answer: "To select the right inverter capacity, calculate the total power consumption of all appliances you want to run during a power cut. Add up the wattage of each device and add a 20-30% buffer for safety. Our experts can help you determine the perfect capacity based on your specific needs.",
        },
        {
            category: "products",
            question: "What type of batteries work best with IndPower inverters?",
            answer: "IndPower inverters work best with our range of tubular batteries, which offer longer life, better performance, and minimal maintenance. We recommend using genuine IndPower batteries for optimal performance and to maintain warranty validity.",
        },
        {
            category: "installation",
            question: "How long does the installation process take?",
            answer: "Professional installation typically takes 2-3 hours for a standard home inverter setup. This includes proper wiring, battery connection, and safety checks. Our certified technicians ensure everything is properly configured for optimal performance.",
        },
        {
            category: "warranty",
            question: "What is covered under the warranty?",
            answer: "Our warranty covers manufacturing defects, component failures, and performance issues under normal usage conditions. The warranty does not cover physical damage, water damage, or issues arising from improper installation or maintenance.",
        },
    ];

    const filteredFAQs = activeCategory === "all"
        ? faqs
        : faqs.filter(faq => faq.category === activeCategory);

    const toggleFAQ = (index: number) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    return (
        <section className="bg-white py-16">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold text-blue-600 mb-4">
                        {section.title || "Frequently Asked Questions"}
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        {section.subtitle || "Find answers to the most common questions about our products, services, and dealer network"}
                    </p>
                </div>

                {/* Category Tabs */}
                <div className="flex justify-center gap-4 mb-10 flex-wrap">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`px-6 py-2 rounded-full font-medium transition ${
                                activeCategory === category.id
                                    ? "bg-blue-600 text-black"
                                    : "text-gray-600 hover:bg-gray-100"
                            }`}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>

                {/* FAQ Content */}
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* FAQ Items Column */}
                        <div className="lg:col-span-2 space-y-4">
                            {filteredFAQs.map((faq, index) => (
                                <div key={index} className="bg-gray-50 rounded-lg overflow-hidden">
                                    <button
                                        onClick={() => toggleFAQ(index)}
                                        className="w-full text-left p-5 flex items-center justify-between hover:bg-gray-100 transition"
                                    >
                                        <h3 className="font-semibold text-white-800 pr-4">{faq.question}</h3>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ml-4 transition-colors ${
                                            openFAQ === index ? "bg-blue-600" : "bg-gray-300"
                                        }`}>
                                            <i className={`fas fa-${openFAQ === index ? "minus" : "plus"} text-${openFAQ === index ? "white" : "gray-600"} text-sm`}></i>
                                        </div>
                                    </button>
                                    {openFAQ === index && (
                                        <div className="px-5 pb-5">
                                            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Side Chart/Image Placeholder */}
                        <div className="lg:col-span-1">
                            <div className="bg-gray-100 rounded-lg p-8 h-64 flex items-center justify-center">
                                <div className="text-center">
                                    <i className="fas fa-chart-line text-gray-400 text-5xl mb-4"></i>
                                    <p className="text-gray-500">Wave Pattern Diagram</p>
                                </div>
                            </div>

                            {/* Additional Help Card */}
                            <div className="mt-6 bg-blue-50 rounded-lg p-6">
                                <h4 className="font-semibold text-gray-800 mb-2">Didn't find your answer?</h4>
                                <p className="text-sm text-gray-600 mb-4">
                                    Our support team is here to help you with any questions.
                                </p>
                                <Link to="/contact" className="text-blue-600 font-semibold text-sm hover:underline">
                                    Contact Support →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;