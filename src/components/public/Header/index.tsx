// src/components/public/Header/index.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { publicService } from '@/services/public.service';
import {
    EnvelopeIcon,
    PhoneIcon,
    ClockIcon,
    Bars3Icon,
    XMarkIcon
} from '@heroicons/react/24/outline';

// Logo component (you can replace this with an actual logo image)
const Logo: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="currentColor">
        <circle cx="50" cy="50" r="45" className="text-yellow-400" />
        <text x="50" y="70" textAnchor="middle" className="text-blue-600 font-bold text-4xl">IP</text>
    </svg>
);

const Header: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const { data: info } = useQuery({
        queryKey: ['public-info'],
        queryFn: () => publicService.getInfo(),
    });

    const { data: menus } = useQuery({
        queryKey: ['public-menus', 'header'],
        queryFn: () => publicService.getMenus('header'),
    });

    // Social media icons using Heroicons (as Font Awesome is not available)
    const socialIcons = [
        { name: 'Facebook', href: info?.social?.facebook, icon: 'M' },
        { name: 'Instagram', href: info?.social?.instagram, icon: 'I' },
        { name: 'Twitter', href: info?.social?.twitter, icon: 'X' },
        { name: 'LinkedIn', href: info?.social?.linkedin, icon: 'L' },
    ];

    const navLinks = menus?.map(menu => ({
        name: menu.title,
        href: menu.url || '#',
        type: menu.type,
        children: menu.children
    })) || [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Services', href: '/services' },
        { name: 'Products', href: '/products' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <header className="bg-blue-600">
            {/* Top Bar with Contact Info */}
            <div className="border-b border-blue-500">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between py-2 text-white text-sm">
                        {/* Contact Information */}
                        <div className="hidden md:flex items-center space-x-6">
                            <div className="flex items-center">
                                <EnvelopeIcon className="h-4 w-4 mr-2" />
                                <span>{info?.contact?.email || 'info@indpower.com'}</span>
                            </div>
                            <div className="flex items-center">
                                <PhoneIcon className="h-4 w-4 mr-2" />
                                <span>{info?.contact?.phone || '+91 123 456 7890'}</span>
                            </div>
                            <div className="flex items-center">
                                <ClockIcon className="h-4 w-4 mr-2" />
                                <span>Mon-Fri: 09AM - 06PM</span>
                            </div>
                        </div>

                        {/* Social Media Icons */}
                        <div className="flex items-center space-x-3 ml-auto">
                            {socialIcons.map((social) => (
                                social.href && (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition"
                                    >
                                        <span className="text-white text-sm font-bold">{social.icon}</span>
                                    </a>
                                )
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <div className="container mx-auto px-4">
                <nav className="flex items-center justify-between py-4">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <Logo className="w-12 h-12 mr-3" />
                        <span className="text-white text-2xl font-bold tracking-wider">INDPOWER</span>
                    </Link>

                    {/* Desktop Navigation Menu */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="text-white hover:text-yellow-300 transition font-medium"
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* Let's Talk Button */}
                        <Link
                            to="/contact"
                            className="bg-yellow-400 text-gray-800 px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 transition"
                        >
                            Let's Talk
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        type="button"
                        className="lg:hidden text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? (
                            <XMarkIcon className="h-6 w-6" />
                        ) : (
                            <Bars3Icon className="h-6 w-6" />
                        )}
                    </button>
                </nav>

                {/* Mobile Navigation Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden py-4 border-t border-blue-500">
                        <div className="flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="text-white hover:text-yellow-300 transition font-medium"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                to="/contact"
                                className="bg-yellow-400 text-gray-800 px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 transition text-center"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Let's Talk
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;