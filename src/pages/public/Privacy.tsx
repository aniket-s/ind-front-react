// src/pages/public/Privacy.tsx
import React, { useState, useEffect } from 'react';
import {
    ShieldCheckIcon,
    DocumentTextIcon,
    LockClosedIcon,
    InformationCircleIcon,
    UserGroupIcon,
    ServerIcon,
    ClockIcon,
    EnvelopeIcon,
    PhoneIcon,
    ChevronUpIcon
} from '@heroicons/react/24/outline';
import { cn } from '@/utils';

const Privacy: React.FC = () => {
    const [activeSection, setActiveSection] = useState('introduction');
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.pageYOffset > 300);

            // Update active section based on scroll position
            const sections = document.querySelectorAll('section[id]');
            sections.forEach((section) => {
                const rect = section.getBoundingClientRect();
                if (rect.top >= 0 && rect.top <= 200) {
                    setActiveSection(section.id);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const sections = [
        { id: 'introduction', title: '1. Introduction to Privacy Policy', icon: ShieldCheckIcon },
        { id: 'important-terms', title: '2. Important Terms', icon: DocumentTextIcon },
        { id: 'information-collected', title: '3. Types of User Information Collected', icon: InformationCircleIcon },
        { id: 'how-we-use', title: '4. How We Use Your Information', icon: UserGroupIcon },
        { id: 'sharing-disclosure', title: '5. Sharing and Disclosure of Information', icon: ServerIcon },
        { id: 'data-security', title: '6. Data Security and Retention', icon: LockClosedIcon },
        { id: 'your-rights', title: '7. Your Rights Regarding Your Information', icon: UserGroupIcon },
        { id: 'cookies', title: '8. Cookies and Tracking Technologies', icon: ServerIcon },
        { id: 'children-privacy', title: '9. Children\'s Privacy', icon: ShieldCheckIcon },
        { id: 'contact', title: '10. Contact Us', icon: EnvelopeIcon },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>

                <div className="relative container mx-auto px-4 py-20 md:py-28">
                    <div className="max-w-4xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            Privacy Policy
                        </h1>
                        <p className="text-xl text-blue-100 leading-relaxed mb-4">
                            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
                        </p>
                        <div className="flex items-center gap-2 text-blue-200 text-sm">
                            <ClockIcon className="h-4 w-4" />
                            <span>Last Updated: January 2025</span>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 38C840 45 960 60 1080 68C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                              fill="white" />
                    </svg>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
                    {/* Table of Contents - Sticky Sidebar */}
                    <aside className="lg:w-80">
                        <div className="sticky top-4">
                            <div className="bg-gray-50 rounded-2xl p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <DocumentTextIcon className="h-5 w-5 mr-2" />
                                    Table of Contents
                                </h2>
                                <nav className="space-y-2">
                                    {sections.map((section) => (
                                        <button
                                            key={section.id}
                                            onClick={() => scrollToSection(section.id)}
                                            className={cn(
                                                'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center',
                                                activeSection === section.id
                                                    ? 'bg-blue-600 text-white'
                                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                            )}
                                        >
                                            <section.icon className="h-4 w-4 mr-2 flex-shrink-0" />
                                            <span>{section.title}</span>
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </aside>

                    {/* Privacy Policy Content */}
                    <main className="flex-1 max-w-4xl">
                        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
                            {/* Section 1 */}
                            <section id="introduction" className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    1. Introduction to Privacy Policy
                                </h2>

                                <div className="space-y-4 text-gray-600 leading-relaxed">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">1.1 Commitment to Privacy</h3>
                                        <p>
                                            At IndPower, we prioritise your privacy and are committed to ensuring the protection of your personal data when you visit our Website or use our Mobile App. This Privacy Policy is designed in accordance with the Information Technology Act, 2000, and applicable Rules, ensuring your information is handled with the utmost care.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">1.2 Purpose of the Policy</h3>
                                        <p>
                                            This Privacy Policy aims to inform you about the types of information we collect, how it is handled, and the purposes for which it is used. We want to ensure you understand how your data is collected, stored, processed, and shared with respect to our services.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">1.3 Part of Terms of Use</h3>
                                        <p>
                                            This Privacy Policy is an integral part of our Terms of Use and is binding on all users of the Website or Mobile App. By using our platform, you consent to our data practices as outlined in this policy.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Section 2 */}
                            <section id="important-terms" className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    2. Important Terms
                                </h2>

                                <div className="space-y-4 text-gray-600 leading-relaxed">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">2.1 Agreement and Consent</h3>
                                        <p>
                                            This Privacy Policy, in conjunction with the "Terms of Use," constitutes an electronic contract under the Information Technology Act, 2000, which is legally binding between IndPower and users of our Website or Mobile App. No physical, electronic, or digital signature is required to accept this policy.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">2.2 Acceptance of Terms</h3>
                                        <p>
                                            By using our Website or Mobile App, you unconditionally accept and agree to be bound by our Terms of Use and this Privacy Policy. If you disagree with any part of this policy, we kindly ask that you refrain from using our platform.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">2.3 Changes to the Policy</h3>
                                        <p>
                                            We reserve the right to update or modify this Privacy Policy at any time. It is your responsibility to review this policy regularly for any changes. Continued use of our Website or Mobile App following updates will indicate your acceptance of the revised terms.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Section 3 */}
                            <section id="information-collected" className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    3. Types of User Information Collected
                                </h2>

                                <div className="space-y-4 text-gray-600 leading-relaxed">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">3.1 Collection of Information</h3>
                                        <p className="mb-4">
                                            IndPower may collect and gather certain types of personal and non-personal information from users of the Website and Mobile App. The information collected may include but is not limited to, personal data such as name, email address, phone number, location, and payment details when you make a purchase or register on our platform. We may also collect non-personal information related to your usage, preferences, and interactions on our site.
                                        </p>
                                        <p className="mb-4">
                                            The data we collect is used to provide and improve our services, process transactions, and ensure a better user experience. The specific types of information we may collect are as follows:
                                        </p>
                                        <ul className="space-y-2 ml-4">
                                            <li className="flex items-start">
                                                <span className="text-blue-600 mr-2">a.</span>
                                                <span><strong>Personal details:</strong> Name, contact information, etc.</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-blue-600 mr-2">b.</span>
                                                <span><strong>Transaction data:</strong> Purchase history, billing information, etc.</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-blue-600 mr-2">c.</span>
                                                <span><strong>Usage data:</strong> Information about how you interact with our platform, including browsing activities and preferences.</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-blue-600 mr-2">d.</span>
                                                <span><strong>Device and location data:</strong> Information about the device you use to access our services and your geographical location.</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* Section 4 */}
                            <section id="how-we-use" className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    4. How We Use Your Information
                                </h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    The information we collect is used primarily for the following purposes:
                                </p>
                                <ul className="space-y-2 ml-4 text-gray-600">
                                    <li className="flex items-start">
                                        <span className="text-blue-600 mr-2">a.</span>
                                        <span>To provide and manage our services, including processing orders and delivering products.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-600 mr-2">b.</span>
                                        <span>To enhance and personalise user experience based on your preferences and past interactions.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-600 mr-2">c.</span>
                                        <span>To communicate with you regarding updates, promotions, or customer support.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-600 mr-2">d.</span>
                                        <span>To comply with legal requirements and enforce our terms of use.</span>
                                    </li>
                                </ul>
                                <p className="text-gray-600 leading-relaxed mt-4">
                                    We will not use your personal data for any purpose beyond the scope of this Privacy Policy unless explicitly stated or with your consent.
                                </p>
                            </section>

                            {/* Section 5 */}
                            <section id="sharing-disclosure" className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    5. Sharing and Disclosure of Information
                                </h2>

                                <div className="space-y-4 text-gray-600 leading-relaxed">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">5.1 With Third Parties</h3>
                                        <p>
                                            We may share your personal information with third-party service providers who assist us in delivering our services, such as payment processors, marketing partners, and delivery agencies. These third parties are contractually bound to protect your data and can only use it to perform the services we have asked them to carry out.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">5.2 Legal Requirements</h3>
                                        <p>
                                            We may disclose your information if required by law, court order, or governmental authority or to protect the rights, property, and safety of IndPower, its users, or the public.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Section 6 */}
                            <section id="data-security" className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    6. Data Security and Retention
                                </h2>

                                <div className="space-y-4 text-gray-600 leading-relaxed">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">6.1 Data Protection</h3>
                                        <p>
                                            We use a variety of security measures to protect your personal information from unauthorised access, use, alteration, or disclosure. Our platform employs industry-standard encryption, firewalls, and secure protocols to ensure that your data is safe.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">6.2 Data Retention</h3>
                                        <p>
                                            We retain your personal information for as long as necessary to fulfil the purposes outlined in this Privacy Policy unless a longer retention period is required or permitted by law. When your information is no longer needed, we will securely dispose of it.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Section 7 */}
                            <section id="your-rights" className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    7. Your Rights Regarding Your Information
                                </h2>
                                <p className="text-gray-600 leading-relaxed mb-4">You have the right to:</p>
                                <ul className="space-y-2 ml-4 text-gray-600">
                                    <li className="flex items-start">
                                        <span className="text-blue-600 mr-2">a.</span>
                                        <span>Access and update your personal information.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-600 mr-2">b.</span>
                                        <span>Request the deletion of your data, subject to legal obligations.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-600 mr-2">c.</span>
                                        <span>Opt-out of receiving marketing communications at any time.</span>
                                    </li>
                                </ul>
                                <p className="text-gray-600 leading-relaxed mt-4">
                                    To exercise these rights or for any questions about your personal data, please contact us at{' '}
                                    <a href="mailto:privacy@indpowerenergy.com" className="text-blue-600 hover:text-blue-800 underline">
                                        privacy@indpowerenergy.com
                                    </a>.
                                </p>
                            </section>

                            {/* Section 8 */}
                            <section id="cookies" className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    8. Cookies and Tracking Technologies
                                </h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Our website may use cookies or similar tracking technologies to enhance user experience. Cookies help us remember your preferences and allow us to personalise your visit. You can control cookie settings through your browser, but please note that disabling cookies may affect the functionality of the Website or Mobile App.
                                </p>
                            </section>

                            {/* Section 9 */}
                            <section id="children-privacy" className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    9. Children's Privacy
                                </h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Our services are not intended for children under the age of 18. We do not knowingly collect or solicit personal information from children under 18. If you believe we have collected information from a child under 18, please contact us, and we will take appropriate steps to remove that information.
                                </p>
                            </section>

                            {/* Section 10 */}
                            <section id="contact" className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    10. Contact Us
                                </h2>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    If you have any questions or concerns about this Privacy Policy or how we handle your personal data, please reach out to us at:
                                </p>

                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <p className="font-semibold text-gray-800 mb-4">IndPower Energy Private Limited:</p>
                                    <div className="space-y-3">
                                        <div className="flex items-center text-gray-600">
                                            <PhoneIcon className="h-5 w-5 mr-3 text-blue-600 flex-shrink-0" />
                                            <a href="tel:+91-124-4987400" className="hover:text-blue-600">
                                                +91-124-4987 400
                                            </a>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <EnvelopeIcon className="h-5 w-5 mr-3 text-blue-600 flex-shrink-0" />
                                            <a href="mailto:privacy@indpowerenergy.com" className="hover:text-blue-600">
                                                privacy@indpowerenergy.com
                                            </a>
                                        </div>
                                        <div className="flex items-start text-gray-600">
                                            <InformationCircleIcon className="h-5 w-5 mr-3 text-blue-600 flex-shrink-0 mt-0.5" />
                                            <span>
                                                Website:{' '}
                                                <a href="https://www.indpowerenergy.com/" className="text-blue-600 hover:text-blue-800 underline">
                                                    https://www.indpowerenergy.com/
                                                </a>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-gray-600 leading-relaxed mt-6">
                                    By using our Website or Mobile App, you consent to the terms outlined in this Privacy Policy.
                                </p>

                                <p className="text-gray-600 leading-relaxed mt-4 italic">
                                    This Privacy Policy is designed to provide you with a clear understanding of how IndPower collects, uses, and protects your information. Please review it carefully to stay informed about your privacy rights and our practices.
                                </p>
                            </section>

                            {/* Print Button */}
                            <div className="mt-12 pt-8 border-t border-gray-200 flex justify-center">
                                <button
                                    onClick={() => window.print()}
                                    className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    <DocumentTextIcon className="h-5 w-5 mr-2" />
                                    Print this Policy
                                </button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            {/* Scroll to Top Button */}
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-110"
                    aria-label="Scroll to top"
                >
                    <ChevronUpIcon className="h-6 w-6" />
                </button>
            )}
        </div>
    );
};

export default Privacy;