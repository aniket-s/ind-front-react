// src/pages/public/CookiePolicy.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCookieConsent } from '@/contexts/CookieConsentContext';

const CookiePolicy: React.FC = () => {
    const { openSettings } = useCookieConsent();

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="bg-blue-600 text-white rounded-t-2xl px-8 py-10">
                    <h1 className="text-4xl font-bold mb-3">Cookie Policy</h1>
                    <p className="text-blue-100">
                        Last Updated: October 29, 2025
                    </p>
                </div>

                {/* Content */}
                <div className="bg-white rounded-b-2xl shadow-lg px-8 py-10">
                    {/* Introduction */}
                    <section className="mb-8">
                        <p className="text-gray-700 leading-relaxed mb-4">
                            This Cookie Policy explains how IndPower India Pvt. Ltd. ("we", "us", or "our") uses
                            cookies and similar technologies to recognize you when you visit our website at{' '}
                            <a href="https://ind.mozget.com" className="text-blue-600 hover:underline">
                                ind.mozget.com
                            </a>
                            . It explains what these technologies are and why we use them, as well as your rights
                            to control our use of them.
                        </p>
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                            <p className="text-sm text-gray-700">
                                <strong>Quick Actions:</strong> You can manage your cookie preferences at any time by
                                clicking{' '}
                                <button
                                    onClick={openSettings}
                                    className="text-blue-600 hover:underline font-semibold"
                                >
                                    Cookie Settings
                                </button>
                            </p>
                        </div>
                    </section>

                    {/* What are cookies */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are Cookies?</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Cookies are small data files that are placed on your computer or mobile device when you
                            visit a website. Cookies are widely used by website owners to make their websites work,
                            or to work more efficiently, as well as to provide reporting information.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Cookies set by the website owner (in this case, IndPower) are called "first party cookies".
                            Cookies set by parties other than the website owner are called "third party cookies". Third
                            party cookies enable third party features or functionality to be provided on or through the
                            website (e.g., advertising, interactive content, and analytics).
                        </p>
                    </section>

                    {/* Why we use cookies */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Do We Use Cookies?</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            We use first and third party cookies for several reasons. Some cookies are required for
                            technical reasons for our website to operate, and we refer to these as "essential" or
                            "strictly necessary" cookies. Other cookies enable us to track and target the interests
                            of our users to enhance the experience on our website.
                        </p>
                    </section>

                    {/* Types of cookies */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Types of Cookies We Use</h2>

                        {/* Essential Cookies */}
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <span className="text-2xl">✅</span>
                                Essential Cookies
                            </h3>
                            <p className="text-gray-700 leading-relaxed mb-3">
                                These cookies are strictly necessary to provide you with services available through
                                our website and to use some of its features, such as access to secure areas.
                            </p>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-gray-50 border border-gray-200 rounded-lg">
                                    <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Cookie Name</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Purpose</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Duration</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr className="border-t border-gray-200">
                                        <td className="px-4 py-3 text-sm text-gray-700 font-mono">indpower_cookie_consent</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">Stores your cookie preferences</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">12 months</td>
                                    </tr>
                                    <tr className="border-t border-gray-200">
                                        <td className="px-4 py-3 text-sm text-gray-700 font-mono">token</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">Authentication token for logged-in users</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">Session</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Functional Cookies */}
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <span className="text-2xl">⚙️</span>
                                Functional Cookies
                            </h3>
                            <p className="text-gray-700 leading-relaxed mb-3">
                                These cookies enable the website to provide enhanced functionality and personalization.
                                They may be set by us or by third party providers whose services we have added to our pages.
                            </p>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-gray-50 border border-gray-200 rounded-lg">
                                    <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Cookie Name</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Purpose</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Duration</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr className="border-t border-gray-200">
                                        <td className="px-4 py-3 text-sm text-gray-700 font-mono">language_preference</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">Remembers your language preference</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">12 months</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Analytics Cookies */}
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <span className="text-2xl">📊</span>
                                Analytics Cookies
                            </h3>
                            <p className="text-gray-700 leading-relaxed mb-3">
                                These cookies allow us to count visits and traffic sources so we can measure and improve
                                the performance of our site. They help us to know which pages are the most and least
                                popular and see how visitors move around the site.
                            </p>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-gray-50 border border-gray-200 rounded-lg">
                                    <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Service</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Purpose</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Duration</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr className="border-t border-gray-200">
                                        <td className="px-4 py-3 text-sm text-gray-700 font-mono">Google Analytics</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">Website traffic analysis</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">2 years</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Marketing Cookies */}
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <span className="text-2xl">🎯</span>
                                Marketing Cookies
                            </h3>
                            <p className="text-gray-700 leading-relaxed mb-3">
                                These cookies may be set through our site by our advertising partners. They may be used
                                to build a profile of your interests and show you relevant ads on other sites.
                            </p>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-gray-50 border border-gray-200 rounded-lg">
                                    <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Service</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Purpose</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Duration</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr className="border-t border-gray-200">
                                        <td className="px-4 py-3 text-sm text-gray-700 font-mono">Facebook Pixel</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">Ad targeting and conversion tracking</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">90 days</td>
                                    </tr>
                                    <tr className="border-t border-gray-200">
                                        <td className="px-4 py-3 text-sm text-gray-700 font-mono">Google Ads</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">Ad targeting and remarketing</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">90 days</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>

                    {/* How to manage cookies */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">How Can You Control Cookies?</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            You have the right to decide whether to accept or reject cookies. You can exercise your
                            cookie rights by setting your preferences in our{' '}
                            <button
                                onClick={openSettings}
                                className="text-blue-600 hover:underline font-semibold"
                            >
                                Cookie Settings
                            </button>
                            .
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            You can also set or amend your web browser controls to accept or refuse cookies. The method
                            for disabling cookies may vary depending on your browser. Here are instructions for popular
                            browsers:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                            <li>
                                <a
                                    href="https://support.google.com/chrome/answer/95647"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    Google Chrome
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    Mozilla Firefox
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    Safari
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    Microsoft Edge
                                </a>
                            </li>
                        </ul>
                        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded mt-4">
                            <p className="text-sm text-gray-700">
                                <strong>Important:</strong> If you choose to reject cookies, you may still use our
                                website, though your access to some functionality and areas may be restricted.
                            </p>
                        </div>
                    </section>

                    {/* Updates */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Updates to This Policy</h2>
                        <p className="text-gray-700 leading-relaxed">
                            We may update this Cookie Policy from time to time to reflect changes to the cookies we use
                            or for other operational, legal, or regulatory reasons. Please revisit this Cookie Policy
                            regularly to stay informed about our use of cookies and related technologies.
                        </p>
                    </section>

                    {/* Contact */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            If you have any questions about our use of cookies or other technologies, please contact us at:
                        </p>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-gray-700 font-semibold mb-2">IndPower India Pvt. Ltd.</p>
                            <p className="text-gray-700 text-sm">Email: info@indpower.com</p>
                        </div>
                    </section>

                    {/* Related Links */}
                    <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Policies</h3>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                to="/privacy"
                                className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                to="/terms"
                                className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
                            >
                                Terms & Conditions
                            </Link>
                            <Link
                                to="/contact"
                                className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CookiePolicy;