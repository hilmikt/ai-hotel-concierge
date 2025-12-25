import { useState, useCallback, useEffect } from 'react';
import { generateResponse } from '../services/aiService';

const INITIAL_MESSAGE = {
    sender: 'ai',
    text: "Good evening, Mr. Mercer. I am Lumi. How may I be of assistance to you during your stay?"
};



const STORAGE_KEY = 'concierge_sessions';
const LAST_ACTIVE_KEY = 'concierge_last_active';
const MAX_SESSIONS = 10;

const createSessionId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

const useConcierge = () => {
    // Sessions state
    const [sessions, setSessions] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed;
                }
            }
        } catch (e) {
            console.error("Failed to parse sessions:", e);
        }
        // Default: one empty session
        return [{
            id: createSessionId(),
            timestamp: Date.now(),
            messages: [INITIAL_MESSAGE],
            title: 'New Chat' // We can update this with the first user message later
        }];
    });

    const [currentSessionId, setCurrentSessionId] = useState(() => {
        // Default to the first session's ID (which we just created or loaded)
        // We need to re-read or trust the order. 
        // For simplicity in this initializer, we'll settle after mount or rely on 0 index if available.
        // Actually, let's sync strictly.
        try {
            // If we have saved sessions, grab the most recent one (index 0 usually if sorted)
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed[0].id; // Assuming we sort by new
                }
            }
        } catch (e) { }
        return null; // Will fix in effect if null or create one
    });

    const [isTyping, setIsTyping] = useState(false);

    // Ensure we have a valid currentSessionId
    useEffect(() => {
        if (!currentSessionId && sessions.length > 0) {
            setCurrentSessionId(sessions[0].id);
        }
    }, [sessions, currentSessionId]);

    // Current Messages Derivation
    const activeSession = sessions.find(s => s.id === currentSessionId) || sessions[0];
    const messages = activeSession ? activeSession.messages : [INITIAL_MESSAGE];

    // Daily Reset Logic (24h Limit)
    useEffect(() => {
        const checkReset = () => {
            const now = Date.now();
            const lastActive = localStorage.getItem(LAST_ACTIVE_KEY);

            if (lastActive) {
                const lastTime = parseInt(lastActive);
                const ONE_DAY_MS = 24 * 60 * 60 * 1000;

                // If 24 hours have passed since last load/active
                if (now - lastTime > ONE_DAY_MS) {
                    // RESET ALL
                    const newSession = {
                        id: createSessionId(),
                        timestamp: now,
                        messages: [INITIAL_MESSAGE],
                        title: 'New Chat'
                    };
                    setSessions([newSession]);
                    setCurrentSessionId(newSession.id);
                    localStorage.removeItem(STORAGE_KEY);
                }
            }

            // Update last active
            localStorage.setItem(LAST_ACTIVE_KEY, now.toString());
        };

        checkReset();
    }, []);

    // Persistence
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
        localStorage.setItem(LAST_ACTIVE_KEY, Date.now().toString());
    }, [sessions]);


    // Action: Create New Session
    const createNewSession = useCallback(() => {
        const newSession = {
            id: createSessionId(),
            timestamp: Date.now(),
            messages: [INITIAL_MESSAGE],
            title: 'New Chat'
        };

        setSessions(prev => {
            // Prepend new session
            const updated = [newSession, ...prev];
            // Enforce limit
            if (updated.length > MAX_SESSIONS) {
                return updated.slice(0, MAX_SESSIONS);
            }
            return updated;
        });
        setCurrentSessionId(newSession.id);
    }, []);

    // Action: Switch Session
    const switchSession = useCallback((id) => {
        setCurrentSessionId(id);
    }, []);

    // AI Processing
    const processMessage = useCallback(async (text, sessionId) => {
        setIsTyping(true);

        try {
            const responseText = await generateResponse(text);

            setSessions(prev => prev.map(session => {
                if (session.id === sessionId) {
                    return {
                        ...session,
                        messages: [...session.messages, { sender: 'ai', text: responseText }]
                    };
                }
                return session;
            }));
        } catch (error) {
            console.error("Error processing message:", error);
            setSessions(prev => prev.map(session => {
                if (session.id === sessionId) {
                    return {
                        ...session,
                        messages: [...session.messages, {
                            sender: 'ai',
                            text: "I apologize, but I'm having trouble connecting right now. Please try again."
                        }]
                    };
                }
                return session;
            }));
        } finally {
            setIsTyping(false);
        }
    }, []);

    const sendMessage = useCallback((text) => {
        if (!currentSessionId) return;

        setSessions(prev => {
            const sessionIndex = prev.findIndex(s => s.id === currentSessionId);
            if (sessionIndex === -1) return prev;

            const session = prev[sessionIndex];

            // Calc title
            let newTitle = session.title;
            const userMsgCount = session.messages.filter(m => m.sender === 'user').length;
            if (userMsgCount === 0 || session.title === 'New Chat') {
                newTitle = text.length > 30 ? text.substring(0, 30) + '...' : text;
            }

            const updatedSession = {
                ...session,
                title: newTitle,
                timestamp: Date.now(),
                messages: [...session.messages, { sender: 'user', text }]
            };

            // Remove old at that index, put new at top
            const others = [...prev];
            others.splice(sessionIndex, 1);

            return [updatedSession, ...others];
        });

        processMessage(text, currentSessionId);
    }, [currentSessionId, processMessage]);

    return {
        messages, // of current session
        isTyping,
        sendMessage,
        sessions,
        currentSessionId,
        createNewSession,
        switchSession
    };
};

export default useConcierge;

