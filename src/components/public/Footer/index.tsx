// src/components/public/Footer/index.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { publicService } from '@/services/public.service';
import {
    PhoneIcon,
    EnvelopeIcon,
    MapPinIcon,
    ArrowRightIcon,
} from '@heroicons/react/24/outline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCcVisa,
    faCcMastercard,
    faCcPaypal,
    faGooglePay,
    faFacebook,
    faLinkedin,
    faInstagram,
    faYoutube
} from '@fortawesome/free-brands-svg-icons';
import {
    faUniversity,
    faCreditCard
} from '@fortawesome/free-solid-svg-icons';

const Footer: React.FC = () => {
    const { data: info } = useQuery({
        queryKey: ['public-info'],
        queryFn: () => publicService.getInfo(),
    });

    const quickLinks = [
        "Home", "About Us", "Products", "Services",
        "Dealer Locator", "Blog", "Contact Us", "Career"
    ];

    const products = [
        "Home Inverters", "Tubular Batteries", "Solar Solutions",
        "Commercial Inverters", "Industrial UPS", "Accessories",
        "Product Comparison", "Warranty Information"
    ];

    const socialLinks = [
        { icon: faFacebook, href: info?.social?.facebook || "#", name: "Facebook" },
        { icon: faLinkedin, href: info?.social?.linkedin || "#", name: "LinkedIn" },
        { icon: faInstagram, href: info?.social?.instagram || "#", name: "Instagram" },
        { icon: faYoutube, href: info?.social?.youtube || "#", name: "YouTube" },
    ];

    const paymentMethods = [
        { icon: faCcVisa, color: "text-blue-800" },
        { icon: faCcMastercard, color: "text-red-600" },
        { icon: faCcPaypal, color: "text-blue-700" },
        { icon: faGooglePay, color: "text-gray-700" },
        { icon: faUniversity, color: "text-gray-700" },
        { icon: faCreditCard, color: "text-gray-700" },
    ];

    return (
        <footer className="bg-blue-600 text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Company Info */}
                    <div>
                        <div className="flex items-center mb-4">
                            <img src="./logo.png" alt="Logo" className="h-20 mr-3"/>

                        </div>
                        <p className="text-white/80 mb-6 text-sm leading-relaxed">
                            IndPower provides reliable power backup solutions for homes and businesses across India
                            with a commitment to quality, innovation, and customer satisfaction.
                        </p>
                        {/* Social Media Icons */}
                        <div className="flex gap-3">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-white/20 rounded flex items-center justify-center hover:bg-white/30 transition"
                                    aria-label={social.name}
                                >
                                    <FontAwesomeIcon icon={social.icon} className="text-lg" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 relative">
                            Quick Links
                            <div className="absolute bottom-0 left-0 w-12 h-1 bg-yellow-400"></div>
                        </h3>
                        <ul className="space-y-2 mt-6">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <Link to={link === "Home" ? "/" : `/${link.toLowerCase().replace(/\s+/g, '-')}`}
                                          className="text-white/80 hover:text-white transition flex items-center">
                                        <ArrowRightIcon className="h-3 w-3 mr-2"/>
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Our Products */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 relative">
                            Our Products
                            <div className="absolute bottom-0 left-0 w-12 h-1 bg-yellow-400"></div>
                        </h3>
                        <ul className="space-y-2 mt-6">
                            {products.map((product, index) => (
                                <li key={index}>
                                    <Link to="/products"
                                          className="text-white/80 hover:text-white transition flex items-center">
                                        <ArrowRightIcon className="h-3 w-3 mr-2"/>
                                        {product}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 relative">
                            Contact Info
                            <div className="absolute bottom-0 left-0 w-12 h-1 bg-yellow-400"></div>
                        </h3>
                        <div className="space-y-4 mt-6">
                            <div className="flex items-start">
                                <MapPinIcon className="h-5 w-5 mt-1 mr-3 text-yellow-400 flex-shrink-0"/>
                                <div>
                                    <p className="font-semibold">IndPower India Pvt. Ltd.</p>
                                    <p className="text-white/80 text-sm">
                                        {info?.contact?.address || (
                                            <>
                                                Corporate Office, Tower A,<br/>
                                                Sector 16<br/>
                                                Noida, Uttar Pradesh - 201301
                                            </>
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <PhoneIcon className="h-5 w-5 mr-3 text-yellow-400 flex-shrink-0"/>
                                <div>
                                    <p className="text-white/80 text-sm">Toll-Free: 1800-XXX-XXXX</p>
                                    <p className="text-white/80 text-sm">Support: {info?.contact?.phone || '+91-XXX-XXX-XXXX'}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <EnvelopeIcon className="h-5 w-5 mr-3 text-yellow-400 flex-shrink-0"/>
                                <div>
                                    <p className="text-white/80 text-sm">{info?.contact?.email || 'info@indpower.com'}</p>
                                    <p className="text-white/80 text-sm">support@indpower.com</p>
                                </div>
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div className="mt-6">
                            <p className="text-sm mb-3">
                                Subscribe to our newsletter for updates on new products, offers, and power backup tips.
                            </p>
                            <form onSubmit={(e) => e.preventDefault()} className="flex">
                                <input
                                    type="email"
                                    placeholder="Your Email Address"
                                    className="flex-1 px-4 py-2 bg-blue-700 border border-blue-500 rounded-l text-white placeholder-white/60 focus:outline-none focus:bg-blue-800"
                                />
                                <button
                                    type="submit"
                                    className="bg-yellow-400 text-gray-800 px-6 py-2 rounded-r font-semibold hover:bg-yellow-300 transition"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Payment Methods */}
                <div className="border-t border-blue-500 pt-8 mb-8">
                    <div className="flex justify-center gap-4 flex-wrap">
                        {paymentMethods.map((method, index) => (
                            <div key={index} className="w-16 h-10 bg-white rounded flex items-center justify-center">
                                <FontAwesomeIcon
                                    icon={method.icon}
                                    className={`${method.color} text-2xl`}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-blue-500 pt-6 text-center">
                    <p className="text-white/80 text-sm mb-4">
                        © {new Date().getFullYear()} IndPower - All Rights Reserved. Desh Ki Shakti, Desh Ka Bharosa
                    </p>
                    <div className="flex justify-center gap-6 text-sm">
                        <Link to="/terms" className="text-white/80 hover:text-white transition">Terms &
                            Conditions</Link>
                        <Link to="/privacy" className="text-white/80 hover:text-white transition">Privacy Policy</Link>
                        <Link to="/sitemap" className="text-white/80 hover:text-white transition">Sitemap</Link>
                        <Link to="/disclaimer" className="text-white/80 hover:text-white transition">Disclaimer</Link>
                        <a href="/admin/login" className="text-white/80 hover:text-white transition">Dealer Login</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;