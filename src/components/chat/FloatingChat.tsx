import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Mic, MicOff, Send, Volume2, VolumeX, Minimize2, RefreshCw } from 'lucide-react';
import { VoiceVisualizer } from './VoiceVisualizer';

interface Message {
    role: 'user' | 'model';
    content: string;
}

export const FloatingChat: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isVoiceMode, setIsVoiceMode] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isspeaking, setIsSpeaking] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const synthesisRef = useRef<SpeechSynthesis | null>(null);
    const recognitionRef = useRef<any>(null);

    // Initialize Speech Synthesis and Recognition
    useEffect(() => {
        if (typeof window !== 'undefined') {
            synthesisRef.current = window.speechSynthesis;

            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            if (SpeechRecognition) {
                const recognition = new SpeechRecognition();
                recognition.continuous = false;
                recognition.interimResults = false;
                recognition.lang = 'en-US';

                recognition.onstart = () => setIsListening(true);
                recognition.onend = () => setIsListening(false);
                recognition.onresult = (event: any) => {
                    const transcript = event.results[0][0].transcript;
                    setInputValue(transcript);
                    handleSend(transcript);
                };

                recognitionRef.current = recognition;
            }
        }
    }, []);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const speakText = (text: string) => {
        if (isMuted || !synthesisRef.current) return;

        // Cancel any current speech
        synthesisRef.current.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);

        // Select a decent voice if available
        const voices = synthesisRef.current.getVoices();
        const preferredVoice = voices.find(v => v.name.includes('Google') || v.name.includes('Female'));
        if (preferredVoice) utterance.voice = preferredVoice;

        synthesisRef.current.speak(utterance);
    };

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
        } else {
            recognitionRef.current?.start();
        }
    };

    const handleSend = async (text: string = inputValue) => {
        if (!text.trim()) return;

        const userMessage: Message = { role: 'user', content: text };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:3001/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: text,
                    history: messages.map(m => ({
                        role: m.role === 'model' ? 'model' : 'user',
                        parts: [{ text: m.content }]
                    }))
                }),
            });

            const data = await response.json();
            const botMessage: Message = { role: 'model', content: data.response };

            setMessages(prev => [...prev, botMessage]);
            speakText(data.response);

        } catch (error) {
            console.error('Chat Error:', error);
            setMessages(prev => [...prev, { role: 'model', content: "Sorry, I'm having trouble connecting to the server. Please ensure the backend is running." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="mb-4 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl w-80 sm:w-96 overflow-hidden pointer-events-auto flex flex-col h-[500px]"
                    >
                        {/* Header */}
                        <div className="p-4 bg-gray-800 flex items-center justify-between border-b border-gray-700">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                                    AI
                                </div>
                                <div>
                                    <h3 className="text-white font-medium text-sm">System Overseer</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-xs text-gray-400">Online</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <button
                                    onClick={() => setIsMuted(prev => !prev)}
                                    className="hover:text-white transition-colors"
                                >
                                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                                </button>
                                <button
                                    onClick={() => setMessages([])}
                                    className="hover:text-white transition-colors"
                                    title="Clear Chat"
                                >
                                    <RefreshCw size={16} />
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="hover:text-white transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Chat Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900/95">
                            {messages.length === 0 && (
                                <div className="text-center text-gray-500 mt-10">
                                    <p className="text-sm">Greeting! I am the System Overseer.</p>
                                    <p className="text-xs mt-2">Ask me anything about the portfolio owner's skills, experience, or projects.</p>
                                </div>
                            )}

                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${msg.role === 'user'
                                                ? 'bg-primary text-white rounded-br-none'
                                                : 'bg-gray-800 text-gray-200 rounded-bl-none border border-gray-700'
                                            }`}
                                    >
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))}

                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-800 rounded-2xl rounded-bl-none px-4 py-3 border border-gray-700">
                                        <span className="flex gap-1">
                                            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" />
                                            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.1s]" />
                                            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                                        </span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-gray-800 border-t border-gray-700">
                            <VoiceVisualizer isActive={isVoiceMode || isListening || isspeaking} isSpeaking={isListening || isspeaking} />

                            <div className="flex items-center gap-2 mt-2">
                                <button
                                    onClick={toggleListening}
                                    className={`p-2.5 rounded-full transition-colors flex-shrink-0 ${isListening
                                            ? 'bg-red-500/20 text-red-500 border border-red-500/50'
                                            : 'bg-gray-700 text-gray-400 hover:text-white hover:bg-gray-600'
                                        }`}
                                >
                                    {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                                </button>

                                <form
                                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                    className="flex-1 flex gap-2"
                                >
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder={isListening ? "Listening..." : "Type a message..."}
                                        className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary placeholder-gray-500"
                                    />
                                    <button
                                        type="submit"
                                        disabled={isLoading || !inputValue.trim()}
                                        className="p-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <Send size={18} />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="pointer-events-auto w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/30 relative overflow-hidden group"
            >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
                {isOpen ? <Minimize2 size={24} /> : <MessageSquare size={24} />}
            </motion.button>
        </div>
    );
};
