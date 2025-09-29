// src/components/shared/FloatingWhatsApp.tsx
import React, { useState, useEffect } from 'react';
import { cn } from '@/utils';

interface FloatingWhatsAppProps {
    phoneNumber?: string;
    message?: string;
    position?: 'left' | 'right';
    showTooltip?: boolean;
    pulseAnimation?: boolean;
}

const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
                                                               phoneNumber = '7428191002',
                                                               message = 'Hi, I would like to know more about your products',
                                                               position = 'right',
                                                               showTooltip = true,
                                                               pulseAnimation = true,
                                                           }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showWelcome, setShowWelcome] = useState(false);

    useEffect(() => {
        // Show welcome message after 3 seconds
        const timer = setTimeout(() => {
            setShowWelcome(true);
        }, 3000);

        // Hide welcome message after 10 seconds
        const hideTimer = setTimeout(() => {
            setShowWelcome(false);
        }, 10000);

        return () => {
            clearTimeout(timer);
            clearTimeout(hideTimer);
        };
    }, []);

    const handleClick = () => {
        const formattedNumber = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
        const whatsappUrl = `https://wa.me/${formattedNumber.replace(/[^\d]/g, '')}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <>
            {/* Custom styles for animations */}
            <style dangerouslySetInnerHTML={{
                __html: `
                    @keyframes pulse {
                        0% {
                            box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.7);
                        }
                        70% {
                            box-shadow: 0 0 0 15px rgba(245, 158, 11, 0);
                        }
                        100% {
                            box-shadow: 0 0 0 0 rgba(245, 158, 11, 0);
                        }
                    }
                    
                    @keyframes slideInUp {
                        from {
                            transform: translateY(100px);
                            opacity: 0;
                        }
                        to {
                            transform: translateY(0);
                            opacity: 1;
                        }
                    }

                    @keyframes bounce {
                        0%, 100% {
                            transform: translateY(0);
                        }
                        50% {
                            transform: translateY(-5px);
                        }
                    }

                    .whatsapp-pulse {
                        animation: pulse 2s infinite;
                    }

                    .whatsapp-entrance {
                        animation: slideInUp 0.5s ease-out;
                    }

                    .whatsapp-bounce {
                        animation: bounce 2s ease-in-out infinite;
                    }
                    
                    .golden-gradient {
                        background: linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #f59e0b 100%);
                    }
                    
                    .golden-gradient-hover {
                        background: linear-gradient(135deg, #d97706 0%, #b45309 50%, #d97706 100%);
                    }
                `
            }} />

            <div
                className={cn(
                    'fixed z-[9999] flex items-center gap-3',
                    position === 'right' ? 'right-5 md:right-8' : 'left-5 md:left-8',
                    'bottom-5 md:bottom-8'
                )}
            >
                {/* Welcome Message Bubble */}
                {showWelcome && !isHovered && (
                    <div
                        className={cn(
                            'bg-white rounded-lg shadow-lg px-4 py-3 max-w-xs',
                            'transform transition-all duration-300 ease-in-out',
                            position === 'right' ? 'order-first' : 'order-last',
                            showWelcome ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                        )}
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                            <p className="text-sm font-medium text-gray-800">We're online</p>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">Need help? Chat with us!</p>
                        <div className="absolute top-1/2 -translate-y-1/2 -right-2">
                            <div className="w-0 h-0 border-t-8 border-t-transparent border-l-8 border-l-white border-b-8 border-b-transparent"></div>
                        </div>
                    </div>
                )}

                {/* Tooltip */}
                {showTooltip && isHovered && !showWelcome && (
                    <div
                        className={cn(
                            'bg-gray-800 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap',
                            'transform transition-all duration-200 ease-in-out',
                            position === 'right' ? 'order-first' : 'order-last',
                            isHovered ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                        )}
                    >
                        Chat with us on WhatsApp
                    </div>
                )}

                {/* WhatsApp Button with Golden Background */}
                <button
                    onClick={handleClick}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className={cn(
                        'group relative text-white rounded-full',
                        'w-14 h-14 md:w-16 md:h-16 flex items-center justify-center',
                        'shadow-lg hover:shadow-2xl transition-all duration-300',
                        'hover:scale-110 active:scale-95',
                        'whatsapp-entrance golden-gradient',
                        'hover:golden-gradient-hover',
                        pulseAnimation && 'whatsapp-pulse',
                        !pulseAnimation && isHovered && 'whatsapp-bounce'
                    )}
                    style={{
                        background: isHovered
                            ? 'linear-gradient(135deg, #d97706 0%, #b45309 50%, #d97706 100%)'
                            : 'linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #f59e0b 100%)'
                    }}
                    aria-label="Chat on WhatsApp"
                >
                    {/* WhatsApp Icon SVG */}
                    <svg
                        className="w-7 h-7 md:w-8 md:h-8"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M12.031 1.172c-5.963 0-10.813 4.85-10.813 10.813 0 1.894.494 3.744 1.431 5.375L1.172 22.828l5.619-1.444a10.763 10.763 0 0 0 5.238 1.356c5.962 0 10.812-4.85 10.812-10.813S17.994 1.172 12.031 1.172zm0 19.688c-1.688 0-3.344-.481-4.769-1.388l-.344-.212-3.544.931.95-3.469-.225-.356a8.814 8.814 0 0 1-1.35-4.681c0-4.887 3.975-8.863 8.863-8.863s8.862 3.975 8.862 8.863-3.975 8.875-8.862 8.875zm4.863-6.631c-.269-.131-1.575-.775-1.819-.863-.244-.087-.419-.131-.594.131s-.688.863-.844 1.038-.306.2-.575.069c-1.494-.744-2.475-1.331-3.456-3.019-.263-.45.263-.419.75-1.394.081-.162.038-.3-.025-.419s-.594-1.431-.813-1.956c-.212-.512-.431-.444-.594-.45-.15-.006-.325-.006-.5-.006s-.456.063-.694.3c-.238.238-.906.888-.906 2.163s.931 2.506 1.063 2.681c.131.175 1.831 2.794 4.431 3.919 1.65.713 2.294.775 3.119.656.5-.075 1.575-.644 1.794-1.269s.219-.925.156-1.012c-.062-.094-.231-.156-.487-.281z" />
                    </svg>

                    {/* Online Status Indicator */}
                    <div className="absolute top-1 right-1 md:top-2 md:right-2">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-400 border-2 border-white"></span>
                        </span>
                    </div>
                </button>
            </div>
        </>
    );
};

export default FloatingWhatsApp;