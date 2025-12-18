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
                "max-w-[85%] py-4 px-5 text-sm leading-relaxed relative",
                isUser
                    ? "bg-hotel-surface text-hotel-text rounded-tl-xl rounded-bl-xl rounded-br-sm border border-white/5"
                    : "bg-[#141414] text-hotel-text rounded-tr-xl rounded-br-xl rounded-bl-xl border border-hotel-gold/20 shadow-lg shadow-black/20"
            )}>
                <p className="whitespace-pre-wrap">{message.text}</p>

                {/* Optional Action / Link (e.g. Maps) */}
                {message.actionUrl && (
                    <a
                        href={message.actionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 flex items-center space-x-2 text-hotel-gold text-xs uppercase tracking-wide border-t border-white/5 pt-3 hover:text-white transition-colors"
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
