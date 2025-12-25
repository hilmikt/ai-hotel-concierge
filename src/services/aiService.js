/**
 * AI Service Layer
 * Handles interactions with the AI model (Gemini) and Knowledge Base (KB).
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Mock Knowledge Base - In production this would be a vector DB or search API
const KNOWLEDGE_BASE = [
    {
        keywords: ['wifi', 'internet', 'password'],
        answer: "The Wi-Fi network is 'Lumiere_Guest'. The password is 'luxurystay2025'. High-speed access is complimentary."
    },
    {
        keywords: ['checkout', 'check-out', 'departure'],
        answer: "Check-out time is at 12:00 PM. If you require a late check-out, please let me know, and I will check availability for you."
    },
    {
        keywords: ['breakfast', 'food', 'dining'],
        answer: "Breakfast is served in the gilded 'Solarium' restaurant from 7:00 AM to 11:00 AM daily. We also offer 24-hour in-room dining."
    },
    {
        keywords: ['pool', 'swim', 'gym', 'fitness'],
        answer: "Our infinity pool and fitness center are located on the rooftop (Level R), open from 6:00 AM to 10:00 PM."
    }
];

export const generateResponse = async (userMessage, context = []) => {
    try {
        // 1. Check Knowledge Base first (RAG-lite)
        const lowerMsg = userMessage.toLowerCase();
        const kbMatch = KNOWLEDGE_BASE.find(entry =>
            entry.keywords.some(keyword => lowerMsg.includes(keyword))
        );

        if (kbMatch) {
            // Simulate network delay for realism
            await new Promise(resolve => setTimeout(resolve, 600));
            return kbMatch.answer;
        }

        // 2. If no KB match, check for API Key
        if (!GEMINI_API_KEY) {
            console.warn("Missing VITE_GEMINI_API_KEY. Using fallback.");
            await new Promise(resolve => setTimeout(resolve, 800));
            return "I apologize, but I am currently operating in limited mode. Please contact the front desk for immediate assistance with that specific request.";
        }

        // 3. Call Gemini API (Placeholder implementation)
        // TODO: Implement actual fetch call to Gemini API here
        // const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + GEMINI_API_KEY, { ... });

        // For now, return a generic polite fallback if no KB match and 'API called'
        await new Promise(resolve => setTimeout(resolve, 1000));
        return "I have noted your request. As an AI Concierge, I am learning more every day. Let me connect you with a human staff member to ensure this is handled perfectly.";

    } catch (error) {
        console.error("AI Service Error:", error);
        return "I apologize, I am having trouble connecting to our systems right now. Please try again in a moment.";
    }
};
