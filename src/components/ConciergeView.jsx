import React, { useRef, useEffect, useState } from 'react';
import MessageItem from './MessageItem';
import InputArea from './InputArea';
import Sidebar from './Sidebar';
import useConcierge from '../hooks/useConcierge';
import { Menu, Moon, Sun, Plus } from 'lucide-react';

const ConciergeView = () => {
    const { messages, isTyping, sendMessage, sessions, createNewSession, switchSession, currentSessionId } = useConcierge();
    const messagesEndRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Init from localStorage or system preference
        if (localStorage.getItem('theme') === 'dark') return true;
        if (localStorage.getItem('theme') === 'light') return false;
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const toggleTheme = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        if (newMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    // Apply theme on mount/change
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    return (
        <div className="flex flex-col h-[100dvh] bg-hotel-cream dark:bg-hotel-bg text-hotel-text-dark dark:text-hotel-text font-sans transition-colors duration-300 overflow-hidden">

            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                sessions={sessions}
                currentSessionId={currentSessionId}
                onSwitchSession={switchSession}
            />

            {/* Header - Non-fixed, part of flex flow */}
            <header className="flex-none z-40 bg-hotel-cream/80 dark:bg-hotel-bg/80 backdrop-blur-md border-b border-black/5 dark:border-white/5 h-16 flex items-center justify-between px-4 transition-colors duration-300">
                <button onClick={toggleSidebar} className="text-hotel-gold hover:text-black dark:hover:text-white transition-colors p-2">
                    <Menu size={24} />
                </button>

                <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-[1px] border border-hotel-gold text-hotel-gold flex items-center justify-center font-serif text-lg">
                        L
                    </div>
                    <span className="text-xs text-hotel-muted hidden sm:block">The Lumiere</span>
                </div>

                <div className="flex items-center space-x-1">
                    <button onClick={createNewSession} className="text-hotel-muted hover:text-hotel-gold transition-colors p-2" title="New Chat">
                        <Plus size={20} />
                    </button>
                    <button onClick={toggleTheme} className="text-hotel-muted hover:text-hotel-gold transition-colors p-2">
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>
            </header>

            {/* Chat Area - Flex Grow, Scrollable */}
            <main className="flex-1 overflow-y-auto px-4 py-4 scroll-smooth">
                <div className="max-w-md mx-auto space-y-6">
                    {/* Welcome Date Divider */}
                    <div className="flex justify-center my-6">
                        <span className="text-[10px] uppercase tracking-widest text-hotel-muted/70 px-3 py-1 border border-black/5 dark:border-white/5 rounded-full">
                            Today
                        </span>
                    </div>

                    {messages.map((msg, index) => (
                        <MessageItem key={index} message={msg} />
                    ))}

                    {isTyping && (
                        <div className="flex justify-start animate-fade-in">
                            <div className="bg-hotel-surface-light dark:bg-hotel-surface border border-hotel-gold/20 rounded-tr-xl rounded-br-xl rounded-bl-xl py-4 px-5 inline-flex items-center space-x-1.5 min-h-[48px]">
                                <div className="w-1.5 h-1.5 bg-hotel-gold rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                <div className="w-1.5 h-1.5 bg-hotel-gold rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                <div className="w-1.5 h-1.5 bg-hotel-gold rounded-full animate-bounce"></div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>
            </main>

            {/* Input Area - Flex None (Stays at bottom) */}
            <div className="flex-none z-20 bg-hotel-cream/95 dark:bg-hotel-bg/95 backdrop-blur-sm pb-safe-bottom">
                <InputArea onSendMessage={sendMessage} />
            </div>
        </div>
    );
};

export default ConciergeView;
