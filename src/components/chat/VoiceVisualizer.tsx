import React from 'react';
import { motion } from 'framer-motion';

interface VoiceVisualizerProps {
    isActive: boolean;
    isSpeaking: boolean;
}

export const VoiceVisualizer: React.FC<VoiceVisualizerProps> = ({ isActive, isSpeaking }) => {
    if (!isActive) return null;

    return (
        <div className="flex justify-center items-center gap-1 h-8">
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className={`w-1 rounded-full ${isSpeaking ? 'bg-primary' : 'bg-gray-400'}`}
                    animate={{
                        height: isSpeaking ? [8, 24, 8] : 4,
                        opacity: isSpeaking ? 1 : 0.5,
                    }}
                    transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        delay: i * 0.1,
                    }}
                />
            ))}
        </div>
    );
};
