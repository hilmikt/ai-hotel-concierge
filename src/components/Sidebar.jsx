import React, { useState } from 'react';
import { X, MessageSquareWarning, Megaphone, House, BedDouble, History, Send } from 'lucide-react';
import Modal from './Modal';

const Sidebar = ({ isOpen, onClose, messages = [] }) => {
    // Mocked data
    const hotelName = "The Grand Budapest";
    const roomNumber = "305";

    // Modal State
    const [activeModal, setActiveModal] = useState(null); // 'bug' | 'feedback' | null
    const [modalInput, setModalInput] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Filter for user messages only, exclude current session (simplified: just showing last 3 user queries)
    const previousMessages = messages
        .filter(m => m.sender === 'user')
        .slice(-5)
        .reverse();

    const handleModalSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Mock network request
        setTimeout(() => {
            setIsSubmitting(false);
            setModalInput('');
            setActiveModal(null);
            // In a real app we'd show a toast here
        }, 1200);
    };

    const openModal = (type) => {
        setActiveModal(type);
        setModalInput('');
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Sidebar Panel */}
            <div className={`fixed top-0 left-0 bottom-0 w-72 bg-hotel-surface-light dark:bg-hotel-surface border-r border-black/5 dark:border-white/5 z-50 transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>

                {/* Header */}
                <div className="h-16 flex-none flex items-center justify-between px-6 border-b border-black/5 dark:border-white/5">
                    <span className="text-hotel-gold font-serif text-lg">Menu</span>
                    <button onClick={onClose} className="text-hotel-muted hover:text-hotel-text-dark dark:hover:text-hotel-text transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    {/* Hotel Info Section */}
                    <div className="space-y-4">
                        <div className="flex items-start space-x-3 text-hotel-text-dark dark:text-hotel-text">
                            <House size={18} className="text-hotel-gold mt-1" />
                            <div>
                                <p className="text-xs text-hotel-muted uppercase tracking-wider mb-1">Hotel</p>
                                <p className="font-medium">{hotelName}</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-3 text-hotel-text-dark dark:text-hotel-text">
                            <BedDouble size={18} className="text-hotel-gold mt-1" />
                            <div>
                                <p className="text-xs text-hotel-muted uppercase tracking-wider mb-1">Room</p>
                                <p className="font-medium">{roomNumber}</p>
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-black/5 dark:bg-white/5" />

                    {/* Previous Messages Section */}
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2 text-hotel-muted">
                            <History size={14} />
                            <span className="text-[10px] uppercase tracking-widest">Recent Activity</span>
                        </div>

                        <div className="space-y-2">
                            {previousMessages.length > 0 ? (
                                previousMessages.map((msg, idx) => (
                                    <div key={idx} className="text-sm p-3 rounded-lg bg-hotel-cream dark:bg-hotel-bg border border-black/5 dark:border-white/5 text-hotel-text-dark dark:text-hotel-text/80 truncate">
                                        "{msg.text}"
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-hotel-muted italic pl-1">No recent messages</p>
                            )}
                        </div>
                    </div>

                    <div className="h-px bg-black/5 dark:bg-white/5" />

                    {/* Actions Section */}
                    <div className="space-y-2">
                        <button
                            onClick={() => openModal('bug')}
                            className="w-full flex items-center space-x-3 text-hotel-muted hover:text-hotel-gold hover:bg-black/5 dark:hover:bg-white/5 px-3 py-2 rounded-lg transition-colors text-left group"
                        >
                            <MessageSquareWarning size={18} className="group-hover:text-hotel-gold transition-colors" />
                            <span>Report a Bug</span>
                        </button>

                        <button
                            onClick={() => openModal('feedback')}
                            className="w-full flex items-center space-x-3 text-hotel-muted hover:text-hotel-gold hover:bg-black/5 dark:hover:bg-white/5 px-3 py-2 rounded-lg transition-colors text-left group"
                        >
                            <Megaphone size={18} className="group-hover:text-hotel-gold transition-colors" />
                            <span>Leave Feedback</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Shared Modal Logic */}
            <Modal
                isOpen={!!activeModal}
                onClose={() => setActiveModal(null)}
                title={activeModal === 'bug' ? "Report a Bug" : "Share Feedback"}
            >
                <form onSubmit={handleModalSubmit} className="space-y-4">
                    <textarea
                        value={modalInput}
                        onChange={(e) => setModalInput(e.target.value)}
                        placeholder={activeModal === 'bug' ? "Describe the issue..." : "How was your experience?"}
                        className="w-full h-32 bg-hotel-cream dark:bg-hotel-bg/50 border border-black/10 dark:border-white/10 rounded-xl p-3 text-sm text-hotel-text-dark dark:text-hotel-text focus:border-hotel-gold outline-none resize-none transition-colors placeholder-hotel-muted/50"
                        required
                    />
                    <div className="flex justify-end pt-2">
                        <button
                            type="submit"
                            disabled={isSubmitting || !modalInput.trim()}
                            className="flex items-center space-x-2 bg-hotel-gold text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-hotel-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <span>Sending...</span>
                            ) : (
                                <>
                                    <span>Submit</span>
                                    <Send size={14} />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default Sidebar;
