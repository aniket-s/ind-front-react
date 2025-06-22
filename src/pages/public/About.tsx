// src/pages/public/About.tsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { publicService } from '@/services/public.service';
import {
    CheckCircleIcon,
    LightBulbIcon,
    HeartIcon,
    GlobeAsiaAustraliaIcon
} from '@heroicons/react/24/outline';

const About: React.FC = () => {
    const { data: info } = useQuery({
        queryKey: ['public-info'],
        queryFn: () => publicService.getInfo(),
    });

    const values = [
        {
            icon: CheckCircleIcon,
            title: 'Quality First',
            description: 'We never compromise on quality. Every product undergoes rigorous testing.',
        },
        {
            icon: LightBulbIcon,
            title: 'Innovation',
            description: 'Continuously innovating to bring you the latest technology and features.',
        },
        {
            icon: HeartIcon,
            title: 'Customer Focus',
            description: 'Your satisfaction is our priority. We listen and evolve with your needs.',
        },
        {
            icon: GlobeAsiaAustraliaIcon,
            title: 'Made in India',
            description: 'Proudly manufacturing in India for Indian homes and businesses.',
        },
    ];

    const milestones = [
        { year: '2010', event: 'IndPower established with a vision to power India' },
        { year: '2015', event: 'Expanded to 10+ states with 100+ dealers' },
        { year: '2018', event: 'Launched eco-friendly product line' },
        { year: '2020', event: 'Achieved ISO 9001:2015 certification' },
        { year: '2023', event: 'Reached 500+ dealer network milestone' },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
                <div className="container py-16 md:py-24">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Powering India Since 2010
                        </h1>
                        <p className="text-xl text-primary-100">
                            IndPower is a leading manufacturer of high-quality power solutions,
                            dedicated to providing reliable and innovative products for homes
                            and businesses across India.
                        </p>
                    </div>
                </div>
            </div>

            {/* Mission & Vision */}
            <section className="py-16">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                            <p className="text-lg text-gray-600">
                                To provide every Indian household and business with reliable,
                                efficient, and affordable power solutions that enhance their
                                quality of life and productivity.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
                            <p className="text-lg text-gray-600">
                                To be India's most trusted power solutions brand, known for
                                innovation, quality, and customer satisfaction, while contributing
                                to a sustainable future.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-16 bg-gray-50">
                <div className="container">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Our Core Values
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            These values guide everything we do at IndPower
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                                    <value.icon className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-16">
                <div className="container">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                        Our Journey
                    </h2>

                    <div className="max-w-4xl mx-auto">
                        <div className="relative">
                            {/* Timeline line */}
                            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>

                            {/* Timeline items */}
                            <div className="space-y-8">
                                {milestones.map((milestone, index) => (
                                    <div key={index} className="relative flex items-start">
                                        <div className="absolute left-8 w-4 h-4 bg-primary-600 rounded-full -translate-x-1/2"></div>
                                        <div className="ml-20">
                                            <div className="text-sm text-primary-600 font-semibold mb-1">
                                                {milestone.year}
                                            </div>
                                            <div className="text-gray-700">{milestone.event}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-primary-600 text-white">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Experience the IndPower Difference
                    </h2>
                    <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                        Join thousands of satisfied customers who trust IndPower for their power needs
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/products" className="btn btn-lg bg-white text-primary-600 hover:bg-gray-100">
                            View Products
                        </a>
                        <a href="/contact" className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-primary-600">
                            Contact Us
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
