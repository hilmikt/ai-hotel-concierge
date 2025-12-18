import { useState, useCallback } from 'react';

const INITIAL_MESSAGE = {
    sender: 'ai',
    text: "Good evening, Mr. Mercer. I am Lumi. How may I be of assistance to you during your stay?"
};

const RESPONSES = [
    {
        keywords: ['towel', 'soap', 'amenities', 'shampoo'],
        text: "Certainly. Housekeeping has been notified. Fresh amenities will be delivered to Room 402 within 15 minutes."
    },
    {
        keywords: ['late', 'checkout', 'leave'],
        text: "I have checked the availability for you. We are pleased to offer a complimentary late checkout until 2:00 PM tomorrow. Would you like me to confirm this?"
    },
    {
        keywords: ['breakfast', 'dinner', 'food', 'dining', 'timings', 'restaurant'],
        text: "The Lumiere Brasserie serves breakfast from 6:30 AM to 10:30 AM. Dinner service begins at 6:00 PM. I can reserve a table for you if you wish."
    },
    {
        keywords: ['location', 'map', 'directions', 'where'],
        text: "We are located in the heart of San Francisco. Here is our location.",
        actionUrl: "https://maps.google.com/?q=The+Lumiere+San+Francisco+Hotel"
    },
    {
        keywords: ['gym', 'fitness', 'pool', 'spa'],
        text: "The Wellness Center is located on the 3rd floor. It is open 24 hours for residents. The spa requires a reservation."
    }
];

const DEFAULT_RESPONSE = "I understand. I will alert the Concierge Desk to assist you further with that request naturally.";

const useConcierge = () => {
    const [messages, setMessages] = useState([INITIAL_MESSAGE]);
    const [isTyping, setIsTyping] = useState(false);

    const processMessage = useCallback((text) => {
        setIsTyping(true);

        // Simulate thinking delay (refined, not too fast, not too slow)
        const delay = Math.random() * 1000 + 1500;

        setTimeout(() => {
            const lowerText = text.toLowerCase();
            let response = DEFAULT_RESPONSE;
            let actionUrl = null;

            const match = RESPONSES.find(r => r.keywords.some(k => lowerText.includes(k)));
            if (match) {
                response = match.text;
                actionUrl = match.actionUrl;
            }

            setMessages(prev => [...prev, {
                sender: 'ai',
                text: response,
                actionUrl
            }]);
            setIsTyping(false);
        }, delay);
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
