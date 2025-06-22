// src/components/public/Home/ConnectSection.tsx
import React, { useState } from 'react';

interface ConnectSectionProps {
    section: any;
}

const ConnectSection: React.FC<ConnectSectionProps> = ({ section }) => {
    const [activeTab, setActiveTab] = useState("all");
    const content = section.content || {};

    const tabs = content.tabs || [
        { id: "all", label: "All Posts", icon: "fas fa-globe" },
        { id: "facebook", label: "Facebook", icon: "fab fa-facebook" },
        { id: "instagram", label: "Instagram", icon: "fab fa-instagram" },
        { id: "linkedin", label: "LinkedIn", icon: "fab fa-linkedin" },
        { id: "youtube", label: "YouTube", icon: "fab fa-youtube" },
    ];

    const posts = content.posts || [];

    const filteredPosts = activeTab === "all"
        ? posts
        : posts.filter(post => post.platform === activeTab);

    return (
        <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold text-blue-600 mb-2">
                        {section.title || "Connect With Us"}
                    </h2>
                    <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        {section.subtitle || "Stay updated with the latest news, product launches, and customer testimonials from IndPower social channels"}
                    </p>
                </div>

                {/* Social Media Tabs */}
                <div className="flex justify-center gap-4 mb-10 flex-wrap">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-2 rounded-full font-medium flex items-center gap-2 transition ${
                                activeTab === tab.id
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-600 hover:bg-gray-200"
                            }`}
                        >
                            <i className={tab.icon}></i>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Social Media Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {filteredPosts.map((post, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div className="p-4">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                        <i className={`${post.icon} ${post.iconColor} text-xl`}></i>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">{post.author}</h4>
                                        <p className="text-sm text-gray-500">{post.date}</p>
                                    </div>
                                </div>
                                <p className="text-gray-700 mb-4">{post.content}</p>
                            </div>
                            <div className="bg-gray-200 h-48 flex items-center justify-center">
                                <i className="fas fa-image text-gray-400 text-4xl"></i>
                            </div>
                            <div className="p-4 border-t">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <i className={post.platform === "linkedin" ? "fas fa-thumbs-up" : "fas fa-heart"}></i>
                                        <span>{post.engagement.likes}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <i className="fas fa-comment"></i>
                                        <span>{post.engagement.comments}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <i className={
                                            post.platform === "instagram"
                                                ? "fas fa-bookmark"
                                                : "fas fa-share"
                                        }></i>
                                        <span>{
                                            post.platform === "instagram"
                                                ? post.engagement.saves
                                                : post.engagement.shares
                                        }</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View More Button */}
                <div className="text-center">
                    <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition">
                        {content.viewMoreText || "View More Post"}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ConnectSection;