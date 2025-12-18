import React, { useRef, useEffect } from 'react';
import Navigation from './Navigation';
import MessageItem from './MessageItem';
import InputArea from './InputArea';
import useConcierge from '../hooks/useConcierge';

const ConciergeView = () => {
    const { messages, isTyping, sendMessage } = useConcierge();
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    return (
        <div className="flex flex-col h-screen bg-hotel-bg text-hotel-text font-sans">

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-40 bg-hotel-bg/80 backdrop-blur-md border-b border-white/5 h-16 flex items-center justify-center px-4">
                <div className="h-8 w-8 rounded-[1px] border border-hotel-gold text-hotel-gold flex items-center justify-center font-serif text-lg">
                    L
                </div>
                <div className="absolute right-4 text-xs text-hotel-muted hidden sm:block">
                    The Lumiere
                </div>
            </header>

            {/* Chat Area */}
            <main className="flex-1 overflow-y-auto px-4 pt-20 pb-32 scroll-smooth">
                <div className="max-w-md mx-auto space-y-6">
                    {/* Welcome Date Divider */}
                    <div className="flex justify-center my-6">
                        <span className="text-[10px] uppercase tracking-widest text-hotel-muted/50 px-3 py-1 border border-white/5 rounded-full">
                            Today
                        </span>
                    </div>

                    {messages.map((msg, index) => (
                        <MessageItem key={index} message={msg} />
                    ))}

                    {isTyping && (
                        <div className="flex justify-start animate-fade-in">
                            <div className="bg-hotel-surface border border-hotel-gold/20 rounded-tr-xl rounded-br-xl rounded-bl-xl py-4 px-5 inline-flex items-center space-x-1.5 min-h-[48px]">
                                {/* Custom Gold Bouncing Dots */}
                                <div className="w-1.5 h-1.5 bg-hotel-gold rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                <div className="w-1.5 h-1.5 bg-hotel-gold rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                <div className="w-1.5 h-1.5 bg-hotel-gold rounded-full animate-bounce"></div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>
            </main>

            {/* Input Area */}
            <InputArea onSendMessage={sendMessage} />

            {/* Navigation */}
            <Navigation activeTab="concierge" />
        </div>
    );
};

export default ConciergeView;
