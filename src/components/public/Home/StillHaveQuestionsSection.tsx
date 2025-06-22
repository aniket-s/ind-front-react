// src/components/public/Home/StillHaveQuestionsSection.tsx
import React from 'react';

interface StillHaveQuestionsSectionProps {
    section: any;
}

const StillHaveQuestionsSection: React.FC<StillHaveQuestionsSectionProps> = ({ section }) => {
    const content = section.content || {};
    const contactOptions = content.contactOptions || [
        { icon: "fas fa-comments", text: "Live Chat", style: "primary" },
        { icon: "fas fa-envelope", text: "Email Support", style: "outline" },
        { icon: "fas fa-phone", text: "Call Us: 1800-XXX-XXXX", style: "accent" }
    ];

    return (
        <section className="py-8 px-4">
            <div className="container mx-auto">
                <div className="bg-blue-600 rounded-3xl p-12 text-center relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500 rounded-full -translate-y-1/2 translate-x-1/3 opacity-30"></div>
                    <div className="absolute left-0 bottom-0 w-64 h-64 bg-blue-700 rounded-full translate-y-1/2 -translate-x-1/3 opacity-30"></div>

                    {/* Content */}
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            {section.title || "Still Have Questions?"}
                        </h2>
                        <p className="text-white text-lg max-w-2xl mx-auto mb-8">
                            {section.subtitle || "Our customer support team is available 24/7 to help with any questions or concerns about our products and services."}
                        </p>

                        {/* Contact Options */}
                        <div className="flex justify-center gap-4 flex-wrap">
                            {contactOptions.map((option, index) => {
                                const baseClasses = "px-8 py-3 rounded-full font-semibold flex items-center gap-2 transition";
                                const styleClasses = {
                                    primary: "bg-white text-blue-600 hover:bg-gray-100",
                                    outline: "border-2 border-white text-white hover:bg-white hover:text-blue-600",
                                    accent: "bg-yellow-400 text-gray-800 hover:bg-yellow-300"
                                };

                                return (
                                    <button key={index} className={`${baseClasses} ${styleClasses[option.style] || styleClasses.primary}`}>
                                        <i className={option.icon}></i>
                                        {option.text}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StillHaveQuestionsSection;