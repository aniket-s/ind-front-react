// src/components/public/Header/index.tsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { publicService } from '@/services/public.service';
import { Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { cn } from '@/utils';

const Header: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    const { data: menus } = useQuery({
        queryKey: ['public-menus', 'header'],
        queryFn: () => publicService.getMenus('header'),
    });

    const isActive = (url: string) => {
        if (url === '/') return location.pathname === '/';
        return location.pathname.startsWith(url);
    };

    const renderMenuItem = (menu: any) => {
        if (menu.type === 'dropdown' && menu.children?.length > 0) {
            return (
                <Menu as="div" className="relative">
                    <Menu.Button className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
                        <span>{menu.title}</span>
                        <ChevronDownIcon className="h-4 w-4" />
                    </Menu.Button>
                    <Transition
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute left-0 z-10 mt-2 w-48 origin-top-left rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {menu.children.map((child: any) => (
                                <Menu.Item key={child.id}>
                                    {({ active }) => (
                                        <Link
                                            to={child.url || '#'}
                                            className={cn(
                                                active ? 'bg-gray-100' : '',
                                                'block px-4 py-2 text-sm text-gray-700'
                                            )}
                                            target={child.target}
                                        >
                                            {child.title}
                                        </Link>
                                    )}
                                </Menu.Item>
                            ))}
                        </Menu.Items>
                    </Transition>
                </Menu>
            );
        }

        return (
            <Link
                to={menu.url || '#'}
                className={cn(
                    isActive(menu.url || '#')
                        ? 'border-primary-500 text-gray-900'
                        : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-900',
                    'inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium'
                )}
                target={menu.target}
            >
                {menu.title}
            </Link>
        );
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <nav className="container">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <h1 className="text-2xl font-bold text-primary-600">IndPower</h1>
                        </Link>
                        <div className="hidden sm:ml-8 sm:flex sm:space-x-4">
                            {menus?.map((menu) => (
                                <div key={menu.id}>{renderMenuItem(menu)}</div>
                            ))}
                        </div>
                    </div>

                    <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
                        <Link
                            to="/dealer-locator"
                            className="btn btn-outline btn-sm"
                        >
                            Find a Dealer
                        </Link>
                        <Link
                            to="/contact"
                            className="btn btn-primary btn-sm"
                        >
                            Contact Us
                        </Link>
                    </div>

                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? (
                                <XMarkIcon className="block h-6 w-6" />
                            ) : (
                                <Bars3Icon className="block h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile menu */}
            <Transition show={mobileMenuOpen}>
                <div className="sm:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        {menus?.map((menu) => (
                            <div key={menu.id}>
                                {menu.type === 'dropdown' && menu.children?.length > 0 ? (
                                    <div>
                                        <div className="px-3 py-2 text-base font-medium text-gray-700">
                                            {menu.title}
                                        </div>
                                        <div className="pl-6">
                                            {menu.children.map((child: any) => (
                                                <Link
                                                    key={child.id}
                                                    to={child.url || '#'}
                                                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                                    target={child.target}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    {child.title}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        to={menu.url || '#'}
                                        className={cn(
                                            isActive(menu.url || '#')
                                                ? 'bg-primary-50 border-primary-500 text-primary-700'
                                                : 'border-transparent text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900',
                                            'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                                        )}
                                        target={menu.target}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {menu.title}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="pt-4 pb-3 border-t border-gray-200">
                        <div className="space-y-1 px-2">
                            <Link
                                to="/dealer-locator"
                                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Find a Dealer
                            </Link>
                            <Link
                                to="/contact"
                                className="block px-3 py-2 text-base font-medium text-primary-600 hover:text-primary-700 hover:bg-gray-50"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </Transition>
        </header>
    );
};

export default Header;
