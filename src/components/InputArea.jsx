import React, { useState } from 'react';
import { ArrowUp } from 'lucide-react';

const InputArea = ({ onSendMessage }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            onSendMessage(text);
            setText('');
        }
    };

    return (
    return (
        <div className="w-full px-4 pt-2 pb-6">
            <div className="max-w-md mx-auto">
                <form
                    onSubmit={handleSubmit}
                    className="relative flex items-center bg-hotel-surface/90 dark:bg-hotel-surface/90 backdrop-blur-md rounded-2xl border border-black/5 dark:border-white/10 shadow-lg dark:shadow-2xl p-2 pl-4 transition-all focus-within:border-hotel-gold/30 ring-1 ring-black/5 dark:ring-white/5 focus-within:ring-hotel-gold/10"
                >
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Ask Lumi..."
                        className="flex-1 bg-transparent border-none outline-none text-hotel-text-dark dark:text-hotel-text placeholder-hotel-muted/50 text-sm py-2"
                    />
                    <button
                        type="submit"
                        disabled={!text.trim()}
                        className="p-2 ml-2 rounded-xl bg-hotel-surface dark:bg-hotel-text text-hotel-text dark:text-black disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black/5 dark:hover:bg-white transition-all transform active:scale-95"
                    >
                        <ArrowUp size={18} strokeWidth={2.5} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default InputArea;
