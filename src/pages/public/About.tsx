// src/pages/public/About.tsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { publicService } from '@/services/public.service';
import {
    CheckCircleIcon,
    LightBulbIcon,
    HeartIcon,
    GlobeAsiaAustraliaIcon,
    TrophyIcon,
    UsersIcon,
    BoltIcon,
    ShieldCheckIcon,
    ChartBarIcon,
    SparklesIcon
} from '@heroicons/react/24/outline';

const About: React.FC = () => {
    useQuery({
        queryKey: ['public-info'],
        queryFn: () => publicService.getInfo(),
    });

    const values = [
        {
            icon: CheckCircleIcon,
            title: 'Quality First',
            description: 'We never compromise on quality. Every product undergoes rigorous testing to ensure reliability and durability.',
            color: 'from-blue-500 to-blue-600'
        },
        {
            icon: LightBulbIcon,
            title: 'Innovation',
            description: 'Continuously innovating to bring you the latest technology and energy-efficient solutions.',
            color: 'from-yellow-500 to-orange-500'
        },
        {
            icon: HeartIcon,
            title: 'Customer Focus',
            description: 'Your satisfaction drives us. We listen, adapt, and evolve with your changing needs.',
            color: 'from-red-500 to-pink-500'
        },
        {
            icon: GlobeAsiaAustraliaIcon,
            title: 'Made in India',
            description: 'Proudly manufacturing in India, supporting local communities and the economy.',
            color: 'from-green-500 to-teal-500'
        },
    ];

    const stats = [
        { number: '4+', label: 'Years of Excellence', icon: TrophyIcon },
        { number: '3000+', label: 'Dealer Network', icon: UsersIcon },
        { number: '1M+', label: 'Happy Customers', icon: HeartIcon },
        { number: '99.9%', label: 'Uptime Guarantee', icon: BoltIcon },
    ];

    const milestones = [
        {
            year: '2021',
            title: 'Brand Launched',
            description: 'IndPower established with a vision to revolutionize power solutions in India',
            icon: SparklesIcon
        },
        {
            year: '2023',
            title: 'Rapid Expansion',
            description: 'Expanded operations across India with 3000+ authorized dealers nationwide',
            icon: ChartBarIcon
        },
        {
            year: '2025',
            title: 'Brand Ambassador Launch',
            description: 'Strengthened market presence with celebrity brand ambassador partnership',
            icon: TrophyIcon
        },
    ];

    const teamMembers = [
        {
            name: 'Rakesh Malhotra',
            position: 'Founder',
            image: '/member1.jpg',
        },
        {
            name: 'Navneet Kapoor',
            position: 'CoFounder',
            image: '/member2.jpg',
        },
        {
            name: 'Sameer Nagpal',
            position: 'CEO & MD',
            image: '/member3.jpg',
        },

    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section with Parallax Effect */}
            <div
                className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 text-white overflow-hidden">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}/>
                </div>

                <div className="relative container mx-auto px-4 py-24 md:py-32">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
                            Powering India's Future
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 leading-relaxed mb-8">
                            With 4+ years of excellence, IndPower has been the trusted partner
                            for millions of Indians, delivering reliable power solutions that never let you down.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a href="/products"
                               className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-all transform hover:scale-105">
                                Explore Products
                            </a>
                            <a href="/dealer-locator"
                               className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-600 transition-all">
                                Find a Dealer
                            </a>
                        </div>
                    </div>
                </div>

                {/* Wave SVG */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                            fill="white"/>
                    </svg>
                </div>
            </div>

            {/* Stats Section */}
            <div className="container mx-auto px-4 -mt-20 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <div key={index}
                             className="bg-white rounded-2xl shadow-xl p-6 text-center group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                            <stat.icon
                                className="h-12 w-12 mx-auto mb-4 text-blue-600 group-hover:scale-110 transition-transform"/>
                            <h3 className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                            <p className="text-gray-600 font-medium">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mission & Vision Section with Background Pattern */}
            <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>
                <div className="container mx-auto px-4 relative">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Purpose</h2>
                        <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-10 hover:shadow-xl transition-shadow">
                            <div
                                className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                                <BoltIcon className="h-8 w-8 text-white"/>
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h3>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                To empower every Indian household and business with innovative, reliable,
                                and affordable power solutions that enhance quality of life and drive
                                productivity, while contributing to a sustainable future.
                            </p>
                        </div>

                        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-10 hover:shadow-xl transition-shadow">
                            <div
                                className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6">
                                <SparklesIcon className="h-8 w-8 text-white"/>
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h3>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                To be India's most trusted and innovative power solutions brand, recognized
                                globally for excellence in quality, customer service, and our commitment to
                                building a brighter, more connected India.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Our Core Values
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            The principles that guide every decision we make
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto items-stretch">
                        {values.map((value, index) => (
                            <div key={index} className="group flex">
                                <div
                                    className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
                                    <div
                                        className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                        <value.icon className="h-8 w-8 text-white"/>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        {value.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Our Journey
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            From humble beginnings to market leadership
                        </p>
                    </div>

                    <div className="max-w-5xl mx-auto">
                        <div className="relative">
                            {/* Timeline line */}
                            <div
                                className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-200 via-blue-400 to-blue-600"></div>

                            {/* Timeline items */}
                            <div className="space-y-12">
                                {milestones.map((milestone, index) => (
                                    <div key={index}
                                         className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                        {/* Content */}
                                        <div className="flex-1 md:w-1/2">
                                            <div
                                                className={`bg-white rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                                                <div className="flex items-center mb-4">
                                                    <div
                                                        className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                                                        <milestone.icon className="h-6 w-6 text-white"/>
                                                    </div>
                                                    <div>
                                                        <p className="text-2xl font-bold text-blue-600">{milestone.year}</p>
                                                        <h3 className="text-xl font-semibold text-gray-900">{milestone.title}</h3>
                                                    </div>
                                                </div>
                                                <p className="text-gray-600">{milestone.description}</p>
                                            </div>
                                        </div>

                                        {/* Center dot */}
                                        <div
                                            className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>

                                        {/* Empty space for alternating layout */}
                                        <div className="hidden md:block flex-1 w-1/2"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Leadership Team
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Meet the visionaries driving IndPower's success
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="group w-full sm:w-auto">
                                <div
                                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 w-full sm:w-72">
                                    <div
                                        className="aspect-w-1 aspect-h-1 bg-gradient-to-br from-blue-400 to-blue-600 p-1">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-64 object-cover rounded-t-xl"
                                        />
                                    </div>
                                    <div className="p-6 text-center">
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                                        <p className="text-blue-600 font-medium mb-2">{member.position}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="container mx-auto px-4 relative text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Experience the IndPower Difference
                    </h2>
                    <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
                        Join millions of satisfied customers who trust IndPower for reliable,
                        efficient, and innovative power solutions. Your journey to uninterrupted power starts here.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <a href="/products"
                           className="px-10 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 text-lg">
                            Explore Our Products
                        </a>
                        <a href="/contact"
                           className="px-10 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-blue-600 transition-all text-lg">
                            Get in Touch
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;