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
                            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
                        }
                        70% {
                            box-shadow: 0 0 0 15px rgba(37, 211, 102, 0);
                        }
                        100% {
                            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
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
                    
                    .whatsapp-green {
                        background: #25D366;
                    }
                    
                    .whatsapp-green-dark {
                        background: #128C7E;
                    }
                    
                    .whatsapp-shadow {
                        box-shadow: 0 4px 20px 0 rgba(37, 211, 102, 0.15), 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                    }
                    
                    .whatsapp-shadow-hover {
                        box-shadow: 0 8px 30px 0 rgba(37, 211, 102, 0.3), 0 4px 8px 0 rgba(0, 0, 0, 0.15);
                    }
                `
            }} />

            <div
                className={cn(
                    'fixed z-[9999] flex items-center gap-3',
                    position === 'right' ? 'right-5 md:right-8' : 'left-5 md:left-8',
                    'bottom-16 md:bottom-22'
                )}
            >
                {/* Welcome Message Bubble - WhatsApp style */}
                {showWelcome && !isHovered && (
                    <div
                        className={cn(
                            'bg-white rounded-lg shadow-lg px-4 py-3 max-w-xs border border-gray-100',
                            'transform transition-all duration-300 ease-in-out',
                            position === 'right' ? 'order-first' : 'order-last',
                            showWelcome ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                        )}
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-[#25D366] rounded-full animate-pulse"></div>
                            <p className="text-sm font-medium text-gray-800">We're online</p>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">Need help? Chat with us on WhatsApp!</p>
                        <div className={cn(
                            "absolute top-1/2 -translate-y-1/2",
                            position === 'right' ? '-right-2' : '-left-2'
                        )}>
                            <div className={cn(
                                "w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent",
                                position === 'right' ? 'border-l-8 border-l-white' : 'border-r-8 border-r-white'
                            )}></div>
                        </div>
                    </div>
                )}

                {/* Tooltip - WhatsApp themed */}
                {showTooltip && isHovered && !showWelcome && (
                    <div
                        className={cn(
                            'bg-[#075E54] text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap',
                            'transform transition-all duration-200 ease-in-out',
                            position === 'right' ? 'order-first' : 'order-last',
                            isHovered ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                        )}
                    >
                        Chat with us on WhatsApp
                    </div>
                )}

                {/* WhatsApp Button with Official Green - Perfect Circle */}
                <button
                    onClick={handleClick}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className={cn(
                        'group relative text-white',
                        'w-14 h-14 md:w-16 md:h-16 flex items-center justify-center',
                        'transition-all duration-300',
                        'hover:scale-110 active:scale-95',
                        'whatsapp-entrance whatsapp-green',
                        pulseAnimation && 'whatsapp-pulse',
                        !pulseAnimation && isHovered && 'whatsapp-bounce'
                    )}
                    style={{
                        borderRadius: '50%',
                        background: isHovered ? '#128C7E' : '#25D366',
                        boxShadow: isHovered
                            ? '0 8px 30px 0 rgba(37, 211, 102, 0.3), 0 4px 8px 0 rgba(0, 0, 0, 0.15)'
                            : '0 4px 20px 0 rgba(37, 211, 102, 0.15), 0 2px 4px 0 rgba(0, 0, 0, 0.1)',
                        aspectRatio: '1/1'
                    }}
                    aria-label="Chat on WhatsApp"
                >
                    {/* WhatsApp Icon SVG - Official */}
                    <svg
                        className="w-7 h-7 md:w-8 md:h-8"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>

                    {/* Online Status Indicator - WhatsApp green */}
                    <div className="absolute top-1 right-1 md:top-2 md:right-2">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#25D366] border-2 border-white"></span>
                        </span>
                    </div>
                </button>
            </div>
        </>
    );
};

export default FloatingWhatsApp;