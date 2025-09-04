// src/components/public/Home/ConnectSection.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faGlobe,
    faImage,
    faHeart,
    faThumbsUp,
    faComment,
    faBookmark,
    faShare,
    IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import {
    faFacebook,
    faInstagram,
    faLinkedin,
    faYoutube
} from '@fortawesome/free-brands-svg-icons';

interface Tab {
    id: string;
    label: string;
    icon: IconDefinition | string;
}

interface Engagement {
    likes: number;
    comments: number;
    shares?: number;
    saves?: number;
}

interface Post {
    platform: string;
    icon: IconDefinition | string;
    iconColor: string;
    author: string;
    date: string;
    content: string;
    engagement: Engagement;
}

interface ConnectContent {
    tabs?: Tab[];
    posts?: Post[];
    viewMoreText?: string;
}

interface ConnectSectionData {
    title?: string;
    subtitle?: string;
    content?: ConnectContent;
}

interface ConnectSectionProps {
    section: ConnectSectionData;
}

// Icon mapping for string-based icons from backend
const iconMap: { [key: string]: IconDefinition } = {
    'fas fa-globe': faGlobe,
    'fab fa-facebook': faFacebook,
    'fab fa-instagram': faInstagram,
    'fab fa-linkedin': faLinkedin,
    'fab fa-youtube': faYoutube,
    'fas fa-image': faImage,
    'fas fa-heart': faHeart,
    'fas fa-thumbs-up': faThumbsUp,
    'fas fa-comment': faComment,
    'fas fa-bookmark': faBookmark,
    'fas fa-share': faShare,
};

const ConnectSection: React.FC<ConnectSectionProps> = ({ section }) => {
    const [activeTab, setActiveTab] = useState("all");
    const [expandedPosts, setExpandedPosts] = useState<Set<number>>(new Set());
    const content = section.content || {};

    const defaultTabs: Tab[] = [
        { id: "all", label: "All Posts", icon: faGlobe },
        { id: "facebook", label: "Facebook", icon: faFacebook },
        { id: "instagram", label: "Instagram", icon: faInstagram },
        { id: "linkedin", label: "LinkedIn", icon: faLinkedin },
        { id: "youtube", label: "YouTube", icon: faYoutube },
    ];

    const defaultPosts: Post[] = [
        {
            platform: "facebook",
            icon: faFacebook,
            iconColor: "text-blue-600",
            author: "IndPower India",
            date: "April 23, 2025",
            content: "Providing reliable power backup solutions for homes and businesses across India. Our high-quality inverters ensure uninterrupted power supply when you need it most! #PowerBackup #IndPower",
            engagement: { likes: 245, comments: 42, shares: 38 },
        },
        {
            platform: "instagram",
            icon: faInstagram,
            iconColor: "text-pink-600",
            author: "IndPower India",
            date: "April 20, 2025",
            content: 'Customer spotlight! Mr. Sharma from Delhi shares his experience with our Premium Power Inverter Series. "Zero power cuts and maintenance-free operation for over a year!" #CustomerTestimonial',
            engagement: { likes: 387, comments: 29, saves: 15 },
        },
        {
            platform: "linkedin",
            icon: faLinkedin,
            iconColor: "text-blue-700",
            author: "IndPower India",
            date: "April 18, 2025",
            content: "Proud to announce that IndPower has expanded its dealer network to over 3000+ authorized dealers across India! Looking to join our growing family? Apply now and grow your business with us. #BusinessOpportunity",
            engagement: { likes: 156, comments: 34, shares: 58 },
        },
    ];

    // Process tabs from backend if they exist
    const tabs = content.tabs
        ? content.tabs.map((tab: Tab) => ({
            ...tab,
            icon: typeof tab.icon === 'string' ? iconMap[tab.icon] || faGlobe : tab.icon
        }))
        : defaultTabs;

    // Process posts from backend if they exist
    const posts = content.posts
        ? content.posts.map((post: Post) => ({
            ...post,
            icon: typeof post.icon === 'string' ? iconMap[post.icon] || faGlobe : post.icon
        }))
        : defaultPosts;

    const filteredPosts = activeTab === "all"
        ? posts
        : posts.filter((post) => post.platform === activeTab);

    const getIcon = (icon: IconDefinition | string): IconDefinition => {
        if (typeof icon === 'string') {
            return iconMap[icon] || faGlobe;
        }
        return icon;
    };

    const togglePostExpansion = (index: number) => {
        setExpandedPosts(prev => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        });
    };

    const isPostExpanded = (index: number) => expandedPosts.has(index);

    // Check if content needs "Read more" button (more than ~150 characters for approximately 3 lines)
    const needsReadMore = (content: string) => content.length > 150;

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
                            <FontAwesomeIcon icon={getIcon(tab.icon)} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Social Media Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {filteredPosts.map((post, index) => {
                        const expanded = isPostExpanded(index);
                        const showReadMore = needsReadMore(post.content);

                        return (
                            <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
                                <div className="p-4 flex-grow">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                            <FontAwesomeIcon
                                                icon={getIcon(post.icon)}
                                                className={`${post.iconColor} text-xl`}
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">{post.author}</h4>
                                            <p className="text-sm text-gray-500">{post.date}</p>
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <p className={`text-gray-700 ${!expanded && showReadMore ? 'line-clamp-3' : ''}`}>
                                            {post.content}
                                        </p>
                                        {showReadMore && (
                                            <span
                                                onClick={() => togglePostExpansion(index)}
                                                className="inline-block text-blue-600 hover:text-blue-700 text-sm underline cursor-pointer mt-1 transition-colors"
                                            >
                                                {expanded ? 'Read less' : 'Read more'}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="bg-gray-200 h-48 flex items-center justify-center">
                                    <FontAwesomeIcon
                                        icon={faImage}
                                        className="text-gray-400 text-4xl"
                                    />
                                </div>
                                <div className="p-4 border-t">
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <FontAwesomeIcon
                                                icon={post.platform === "linkedin" ? faThumbsUp : faHeart}
                                            />
                                            <span>{post.engagement.likes}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FontAwesomeIcon icon={faComment} />
                                            <span>{post.engagement.comments}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FontAwesomeIcon
                                                icon={post.platform === "instagram" ? faBookmark : faShare}
                                            />
                                            <span>{
                                                post.platform === "instagram"
                                                    ? post.engagement.saves
                                                    : post.engagement.shares
                                            }</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* View More Button */}
                <div className="text-center">
                    <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition">
                        {content.viewMoreText || "View More Posts"}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ConnectSection;