// src/pages/public/Terms.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    DocumentTextIcon,
    ScaleIcon,
    ExclamationTriangleIcon,
    ShieldCheckIcon,
    CurrencyDollarIcon,
    TruckIcon,
    ArrowPathIcon,
    UserGroupIcon,
    GlobeAltIcon,
    EnvelopeIcon,
    ClockIcon,
    ChevronUpIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';
import { cn } from '@/utils';

const Terms: React.FC = () => {
    const [activeSection, setActiveSection] = useState('acceptance');
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);

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
        { id: 'acceptance', title: '1. Acceptance of Terms', icon: CheckCircleIcon },
        { id: 'modifications', title: '2. Modifications to Terms', icon: DocumentTextIcon },
        { id: 'online-store', title: '3. Online Store Terms', icon: ShieldCheckIcon },
        { id: 'products-services', title: '4. Products and Services', icon: TruckIcon },
        { id: 'pricing-payment', title: '5. Pricing and Payment', icon: CurrencyDollarIcon },
        { id: 'shipping-delivery', title: '6. Shipping and Delivery', icon: TruckIcon },
        { id: 'returns-refunds', title: '7. Returns and Refunds', icon: ArrowPathIcon },
        { id: 'warranties', title: '8. Warranties and Disclaimers', icon: ShieldCheckIcon },
        { id: 'limitation-liability', title: '9. Limitation of Liability', icon: ExclamationTriangleIcon },
        { id: 'intellectual-property', title: '10. Intellectual Property', icon: ScaleIcon },
        { id: 'prohibited-uses', title: '11. Prohibited Uses', icon: ScaleIcon },
        { id: 'user-accounts', title: '12. User Accounts', icon: UserGroupIcon },
        { id: 'governing-law', title: '13. Governing Law', icon: ScaleIcon },
        { id: 'contact-information', title: '14. Contact Information', icon: EnvelopeIcon },
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
                            Terms & Conditions
                        </h1>
                        <p className="text-xl text-blue-100 leading-relaxed mb-4">
                            Please read these terms carefully before using our services.
                        </p>
                        <div className="flex items-center gap-2 text-blue-200 text-sm">
                            <ClockIcon className="h-4 w-4" />
                            <span>Last Updated: January 2025</span>
                            <span className="mx-2">•</span>
                            <span>Version 2.0</span>
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

            {/* Acceptance Banner */}
            {!acceptedTerms && (
                <div className="bg-yellow-50 border-b border-yellow-200">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <p className="text-sm text-gray-700">
                                By continuing to use our website, you agree to these Terms & Conditions.
                            </p>
                            <button
                                onClick={() => setAcceptedTerms(true)}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                            >
                                I Accept
                            </button>
                        </div>
                    </div>
                </div>
            )}

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

                            {/* Quick Links */}
                            <div className="mt-6 bg-blue-50 rounded-2xl p-6">
                                <h3 className="font-semibold text-gray-900 mb-3">Related Documents</h3>
                                <div className="space-y-2">
                                    <Link
                                        to="/privacy"
                                        className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                                    >
                                        → Privacy Policy
                                    </Link>
                                    <Link
                                        to="/faqs"
                                        className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                                    >
                                        → FAQs
                                    </Link>
                                    <Link
                                        to="/contact"
                                        className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                                    >
                                        → Contact Support
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Terms Content */}
                    <main className="flex-1 max-w-4xl">
                        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
                            {/* Introduction */}
                            <div className="mb-12 pb-8 border-b border-gray-200">
                                <p className="text-gray-600 leading-relaxed">
                                    These Terms and Conditions govern your use of the IndPower website and services, including IndPower and IndPower Solar. When we refer to "we," "us," or "our," we are referring to IndPower. By accessing or using this website (
                                    <a href="https://www.indpowerenergy.com/" className="text-blue-600 hover:text-blue-800 underline">
                                        https://www.indpowerenergy.com/
                                    </a>) and/or purchasing from us, you agree to be bound by these terms, conditions, and policies outlined herein.
                                </p>
                            </div>

                            {/* Section 1 */}
                            <section id="acceptance" className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    1. Acceptance of Terms
                                </h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    By visiting our website and engaging in our services, including purchasing products, you are entering into a legal agreement with us. This agreement includes our Terms of Service, along with any additional terms, policies, and notices that may apply to specific sections or services. These Terms of Service apply to all users of the website, including but not limited to browsers, customers, vendors, and content contributors.
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    Before you use the website or any services offered by us, we request that you carefully review these Terms of Service. If you disagree with any of the terms, you should not access the website or use any services. These Terms of Service are considered an offer, and your acceptance is expressly limited to these Terms.
                                </p>
                            </section>

                            {/* Section 2 */}
                            <section id="modifications" className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    2. Modifications to Terms
                                </h2>
                                <p className="text-gray-600 leading-relaxed">
                                    We may update or modify these Terms of Service at any time. Changes will be posted on this page, and it is your responsibility to review this page periodically. Continued use of the website after any changes to the terms signifies your acceptance of those changes.
                                </p>
                                <div className="mt-6 bg-blue-50 border-l-4 border-blue-600 p-4">
                                    <p className="text-sm text-blue-900">
                                        <strong>Note:</strong> We recommend checking this page at least once every 30 days to stay informed about any changes to our terms.
                                    </p>
                                </div>
                            </section>

                            {/* Section 3 */}
                            <section id="online-store" className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    3. Online Store Terms
                                </h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    When you agree to these Terms of Service, you confirm that you are of legal age in your jurisdiction or that you have obtained consent from a parent or guardian to use this website. You are prohibited from using our products for illegal or unauthorised purposes and must comply with all applicable laws, including copyright laws. Additionally, you must not introduce any viruses, malware, or other destructive codes into the website or service.
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    We reserve the right to update our services, features, or tools, which will also be governed by these Terms of Service. Please ensure you read the latest version of the Terms of Service regularly, as continued use of the website after updates constitutes acceptance of the revised terms.
                                </p>
                            </section>

                            {/* Section 4 - Products and Services */}
                            <section id="products-services" className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    4. Products and Services
                                </h2>
                                <div className="space-y-4 text-gray-600 leading-relaxed">
                                    <p>
                                        All products and services offered through our website are subject to availability. We reserve the right to limit the sale of our products or services to any person, geographic region, or jurisdiction. We may exercise this right on a case-by-case basis.
                                    </p>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">4.1 Product Descriptions</h3>
                                        <p>
                                            We have made every effort to display as accurately as possible the colors and images of our products that appear on the website. We cannot guarantee that your computer monitor's display of any color will be accurate.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">4.2 Product Availability</h3>
                                        <p>
                                            We reserve the right, but are not obligated, to limit the sales of our products or services to any person, geographic region, or jurisdiction. All descriptions of products or product pricing are subject to change at any time without notice, at our sole discretion.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Section 5 - Pricing and Payment */}
                            <section id="pricing-payment" className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    5. Pricing and Payment
                                </h2>
                                <div className="space-y-4 text-gray-600 leading-relaxed">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">5.1 Pricing</h3>
                                        <p>
                                            Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the service (or any part or content thereof) without notice at any time.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">5.2 Payment Methods</h3>
                                        <p>
                                            We accept various payment methods including credit cards, debit cards, net banking, UPI, and other digital payment methods. All payments must be received in full before products are shipped.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">5.3 Taxes</h3>
                                        <p>
                                            All prices are exclusive of applicable taxes unless otherwise stated. You are responsible for payment of all applicable taxes.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Section 6 - Shipping and Delivery */}
                            <section id="shipping-delivery" className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    6. Shipping and Delivery
                                </h2>
                                <div className="space-y-4 text-gray-600 leading-relaxed">
                                    <p>
                                        Shipping and delivery terms are subject to availability and location. We will make reasonable efforts to deliver products within the estimated timeframe, but we do not guarantee delivery dates.
                                    </p>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">6.1 Delivery Areas</h3>
                                        <p>
                                            We currently deliver to select locations across India. Delivery availability will be confirmed at the time of order placement.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">6.2 Risk of Loss</h3>
                                        <p>
                                            All items purchased from IndPower are made pursuant to a shipment contract. The risk of loss and title for such items pass to you upon our delivery to the carrier.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Section 7 - Returns and Refunds */}
                            <section id="returns-refunds" className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    7. Returns and Refunds
                                </h2>
                                <div className="space-y-4 text-gray-600 leading-relaxed">
                                    <p>
                                        Our return policy allows for returns within 7 days of delivery for defective or damaged products. Products must be unused and in the same condition that you received them.
                                    </p>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">7.1 Return Process</h3>
                                        <p>
                                            To initiate a return, please contact our customer service team with your order details and reason for return. We will provide you with return instructions.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">7.2 Refund Timeline</h3>
                                        <p>
                                            Once your return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed within 7-10 business days.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Section 8 - Warranties and Disclaimers */}
                            <section id="warranties" className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    8. Warranties and Disclaimers
                                </h2>
                                <div className="space-y-4 text-gray-600 leading-relaxed">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">8.1 Product Warranties</h3>
                                        <p>
                                            All IndPower products come with manufacturer warranties as specified in the product documentation. Warranty terms vary by product and are subject to the conditions outlined in the warranty certificate.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">8.2 Disclaimer of Warranties</h3>
                                        <p>
                                            We do not guarantee, represent, or warrant that your use of our service will be uninterrupted, timely, secure, or error-free. The service is provided on an "AS IS" and "AS AVAILABLE" basis.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Section 9 - Limitation of Liability */}
                            <section id="limitation-liability" className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    9. Limitation of Liability
                                </h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    In no case shall IndPower, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers, or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind.
                                </p>
                                <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-600 p-4">
                                    <p className="text-sm text-yellow-900">
                                        <strong>Important:</strong> Some jurisdictions do not allow the exclusion or limitation of certain damages. If these laws apply to you, some or all of the above exclusions or limitations may not apply to you.
                                    </p>
                                </div>
                            </section>

                            {/* Section 10 - Intellectual Property */}
                            <section id="intellectual-property" className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    10. Intellectual Property
                                </h2>
                                <p className="text-gray-600 leading-relaxed">
                                    All content on this website, including but not limited to text, graphics, logos, images, audio clips, digital downloads, data compilations, and software, is the property of IndPower or its content suppliers and is protected by Indian and international copyright laws. You may not reproduce, distribute, modify, or create derivative works from any content on our website without our express written permission.
                                </p>
                            </section>

                            {/* Section 11 - Prohibited Uses */}
                            <section id="prohibited-uses" className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    11. Prohibited Uses
                                </h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content:
                                </p>
                                <ul className="space-y-2 ml-4 text-gray-600">
                                    <li className="flex items-start">
                                        <span className="text-red-600 mr-2">•</span>
                                        <span>For any unlawful purpose or to solicit others to perform or participate in any unlawful acts</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-600 mr-2">•</span>
                                        <span>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-600 mr-2">•</span>
                                        <span>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-600 mr-2">•</span>
                                        <span>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-600 mr-2">•</span>
                                        <span>To submit false or misleading information</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-600 mr-2">•</span>
                                        <span>To upload or transmit viruses or any other type of malicious code</span>
                                    </li>
                                </ul>
                            </section>

                            {/* Section 12 - User Accounts */}
                            <section id="user-accounts" className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    12. User Accounts
                                </h2>
                                <div className="space-y-4 text-gray-600 leading-relaxed">
                                    <p>
                                        When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.
                                    </p>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">12.1 Account Security</h3>
                                        <p>
                                            You agree to immediately notify IndPower of any unauthorized use of your account or any other breach of security. We will not be liable for any loss or damage arising from your failure to comply with this section.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Section 13 - Governing Law */}
                            <section id="governing-law" className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    13. Governing Law
                                </h2>
                                <p className="text-gray-600 leading-relaxed">
                                    These Terms of Service and any separate agreements whereby we provide you services shall be governed by and construed in accordance with the laws of India and the jurisdiction of courts in New Delhi, India.
                                </p>
                            </section>

                            {/* Section 14 - Contact Information */}
                            <section id="contact-information" className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    14. Contact Information
                                </h2>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    Questions about the Terms of Service should be sent to us at:
                                </p>

                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <p className="font-semibold text-gray-800 mb-4">IndPower Energy Private Limited</p>
                                    <div className="space-y-3 text-gray-600">
                                        <div className="flex items-start">
                                            <GlobeAltIcon className="h-5 w-5 mr-3 text-blue-600 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <p>Corporate Office, Tower A</p>
                                                <p>Sector 16, Noida</p>
                                                <p>Uttar Pradesh - 201301</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <EnvelopeIcon className="h-5 w-5 mr-3 text-blue-600 flex-shrink-0" />
                                            <a href="mailto:legal@indpowerenergy.com" className="hover:text-blue-600">
                                                legal@indpowerenergy.com
                                            </a>
                                        </div>
                                        <div className="flex items-center">
                                            <DocumentTextIcon className="h-5 w-5 mr-3 text-blue-600 flex-shrink-0" />
                                            <span>GST No: 09AABCI1234A1ZB</span>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Agreement Statement */}
                            <div className="mt-12 pt-8 border-t border-gray-200">
                                <div className="bg-blue-50 rounded-lg p-6">
                                    <p className="text-sm text-gray-700 mb-4">
                                        By using our website or purchasing our products, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <button
                                            onClick={() => window.print()}
                                            className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors border border-gray-300"
                                        >
                                            <DocumentTextIcon className="h-5 w-5 mr-2" />
                                            Print Terms
                                        </button>
                                        <a
                                            href="/terms.pdf"
                                            download
                                            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            <DocumentTextIcon className="h-5 w-5 mr-2" />
                                            Download PDF
                                        </a>
                                    </div>
                                </div>
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

export default Terms;