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
    <img src="./logo.png" alt="Logo" className={className} />
);

// Social Media Icon Components
const FacebookIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
    </svg>
);

const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
    </svg>
);

const TwitterIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const LinkedInIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8.5 18V9.5h-3V18h3zM7 7.5c.966 0 1.75-.784 1.75-1.75S7.966 4 7 4 5.25 4.784 5.25 5.75 6.034 7.5 7 7.5zM18 18v-5.25c0-2.484-1.266-3.75-3-3.75-1.388 0-2.01.762-2.356 1.295V9.5H10v8.5h2.644v-5.002c0-1.108.202-2.183 1.582-2.183 1.356 0 1.374 1.266 1.374 2.25V18H18z" clipRule="evenodd" />
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

    // Social media configuration with proper icons
    const socialIcons = [
        { name: 'Facebook', href: info?.social?.facebook, icon: FacebookIcon },
        { name: 'Instagram', href: info?.social?.instagram, icon: InstagramIcon },
        { name: 'Twitter', href: info?.social?.twitter, icon: TwitterIcon },
        { name: 'LinkedIn', href: info?.social?.linkedin, icon: LinkedInIcon },
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
                            {socialIcons.map((social) => {
                                const Icon = social.icon;
                                return social.href ? (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition"
                                        aria-label={social.name}
                                    >
                                        <Icon className="w-4 h-4 text-white" />
                                    </a>
                                ) : null;
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <div className="container mx-auto px-4">
                <nav className="flex items-center justify-between py-4">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <Logo className="h-20 mr-3" />
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