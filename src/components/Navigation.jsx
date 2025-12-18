import React from 'react';
import { MessageSquare, Bell, User } from 'lucide-react';

const Navigation = ({ activeTab = 'concierge' }) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-50">
            <div className="absolute inset-0 bg-hotel-surface/80 backdrop-blur-md border-t border-white/5"></div>
            <div className="relative px-6 py-4 flex justify-around items-center max-w-md mx-auto">

                <button className="flex flex-col items-center space-y-1 group">
                    <div className={`p-2 rounded-full transition-colors ${activeTab === 'concierge' ? 'text-hotel-gold' : 'text-hotel-muted group-hover:text-hotel-text'}`}>
                        <MessageSquare size={20} strokeWidth={1.5} />
                    </div>
                    <span className={`text-[10px] tracking-widest uppercase ${activeTab === 'concierge' ? 'text-hotel-gold' : 'text-hotel-muted'}`}>
                        Concierge
                    </span>
                </button>

                {/* Disabled/Hidden Nav Items as per MVP requirements but visually present as placeholders if desired, 
            but request said "Only ONE visible tab... Other future tabs (Curated, Account) may exist structurally but must be visually hidden or disabled" 
            Actually, user said: "Only ONE visible tab... Other future tabs... must be visually hidden or disabled".
            So I will strictly HIDE them or make them extremely subtle disabled states.
            I will hide them for now to strictly follow "visually hidden" but keep code structure ready.
        */}

            </div>
        </div>
    );
};

export default Navigation;
