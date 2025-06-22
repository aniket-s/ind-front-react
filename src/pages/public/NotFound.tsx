// src/pages/public/NotFound.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const NotFound: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div className="text-center">
                        <h1 className="text-9xl font-bold text-gray-200">404</h1>
                        <h2 className="mt-4 text-3xl font-bold text-gray-900">Page Not Found</h2>
                        <p className="mt-2 text-base text-gray-600">
                            Sorry, we couldn't find the page you're looking for.
                        </p>

                        <div className="mt-8 space-y-3">
                            <Link
                                to="/"
                                className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            >
                                <HomeIcon className="h-5 w-5 mr-2" />
                                Go to Homepage
                            </Link>

                            <button
                                onClick={() => window.history.back()}
                                className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            >
                                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                                Go Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;