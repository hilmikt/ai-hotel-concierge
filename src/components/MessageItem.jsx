import React from 'react';
import clsx from 'clsx';
import { MapPin } from 'lucide-react';

const MessageItem = ({ message }) => {
    const isUser = message.sender === 'user';

    return (
        <div className={clsx(
            "flex w-full animate-slide-up",
            isUser ? "justify-end" : "justify-start"
        )}>
            <div className={clsx(
                "max-w-[85%] py-4 px-5 text-sm leading-relaxed relative transition-colors duration-300",
                isUser
                    ? "bg-hotel-gold text-white dark:bg-hotel-surface dark:text-hotel-text rounded-tl-xl rounded-bl-xl rounded-br-sm border border-transparent dark:border-white/5"
                    : "bg-white text-hotel-text-dark dark:bg-[#141414] dark:text-hotel-text rounded-tr-xl rounded-br-xl rounded-bl-xl border border-black/5 dark:border-hotel-gold/20 shadow-sm dark:shadow-black/20"
            )}>
                <p className="whitespace-pre-wrap">{message.text}</p>

                {/* Optional Action / Link (e.g. Maps) */}
                {message.actionUrl && (
                    <a
                        href={message.actionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={clsx(
                            "mt-3 flex items-center space-x-2 text-xs uppercase tracking-wide border-t pt-3 transition-colors",
                            isUser ? "text-white/90 border-white/20 hover:text-white" : "text-hotel-gold border-black/5 dark:border-white/5 hover:text-hotel-text-dark dark:hover:text-white"
                        )}
                    >
                        <MapPin size={12} />
                        <span>View Location</span>
                    </a>
                )}

                {/* Timestamp or Status (Optional, keeping minimal as per design) */}
            </div>
        </div>
    );
};

export default MessageItem;
