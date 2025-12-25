import { useState, useCallback, useEffect } from 'react';
import { generateResponse } from '../services/aiService';

const INITIAL_MESSAGE = {
    sender: 'ai',
    text: "Good evening, Mr. Mercer. I am Lumi. How may I be of assistance to you during your stay?"
};



const STORAGE_KEY = 'concierge_messages';
const LAST_ACTIVE_KEY = 'concierge_last_active';

const useConcierge = () => {
    // Initialize state from local storage or default
    const [messages, setMessages] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed;
                }
            }
        } catch (e) {
            console.error("Failed to parse saved messages:", e);
        }
        return [INITIAL_MESSAGE];
    });

    const [isTyping, setIsTyping] = useState(false);

    // Daily Reset Logic & Persistence
    useEffect(() => {
        const checkReset = () => {
            const now = new Date();
            const lastActive = localStorage.getItem(LAST_ACTIVE_KEY);

            if (lastActive) {
                const lastDate = new Date(parseInt(lastActive));

                // If last active was on a previous day (or specifically before today's 12PM cutoff while now is after)
                // Simplified Hotel Logic: Reset if last active was BEFORE today 12:00 PM and NOW is AFTER 12:00 PM
                // Or if it's a completely different calendar day

                // Set cutoff to today 12:00 PM
                const cutoffToday = new Date();
                cutoffToday.setHours(12, 0, 0, 0);

                // If now is past cutoff
                if (now > cutoffToday) {
                    // And last active was before this cutoff
                    if (lastDate < cutoffToday) {
                        // RESET
                        setMessages([INITIAL_MESSAGE]);
                        localStorage.removeItem(STORAGE_KEY);
                    }
                }
            }

            // Update last active
            localStorage.setItem(LAST_ACTIVE_KEY, now.getTime().toString());
        };

        checkReset();
        // Check every minute if running long-term, but for now init check is sufficient for reload flow
    }, []);

    // Save messages on change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
        localStorage.setItem(LAST_ACTIVE_KEY, new Date().getTime().toString());
    }, [messages]);



    const processMessage = useCallback(async (text) => {
        setIsTyping(true);

        try {
            const responseText = await generateResponse(text);

            setMessages(prev => [...prev, {
                sender: 'ai',
                text: responseText
            }]);
        } catch (error) {
            console.error("Error processing message:", error);
            setMessages(prev => [...prev, {
                sender: 'ai',
                text: "I apologize, but I'm having trouble connecting right now. Please try again."
            }]);
        } finally {
            setIsTyping(false);
        }
    }, []);

    const sendMessage = useCallback((text) => {
        setMessages(prev => [...prev, { sender: 'user', text }]);
        processMessage(text);
    }, [processMessage]);

    return {
        messages,
        isTyping,
        sendMessage
    };
};

export default useConcierge;
