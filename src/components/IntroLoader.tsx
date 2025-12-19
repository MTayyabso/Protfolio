import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

interface IntroLoaderProps {
  /** Minimum display time in ms */
  minLoadTime?: number;
  /** Callback when loading complete */
  onComplete?: () => void;
  /** Brand name - first part (colored) */
  brandFirst?: string;
  /** Brand name - second part (light) */
  brandSecond?: string;
}

/**
 * IntroLoader - Premium animated intro loading screen
 * 
 * Features:
 * - Animated orbiting logo
 * - Progress bar with percentage
 * - Skip intro functionality
 * - Floating particles
 * - Smooth exit animation
 */
export default function IntroLoader({
  minLoadTime = 3000,
  onComplete,
  brandFirst = 'Tayyab',
  brandSecond = 'Sohail',
}: IntroLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Simulate loading progress
  useEffect(() => {
    const duration = minLoadTime;
    const interval = 50; // Update every 50ms
    const increment = (100 / duration) * interval;
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment + Math.random() * 2; // Add some randomness
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [minLoadTime]);

  // Handle completion
  useEffect(() => {
    if (progress >= 100 && !isComplete) {
      setIsComplete(true);
      setTimeout(() => {
        handleExit();
      }, 500);
    }
  }, [progress, isComplete]);

  const handleExit = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete?.();
    }, 800);
  }, [onComplete]);

  const handleSkip = useCallback(() => {
    setProgress(100);
    handleExit();
  }, [handleExit]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gray-950 overflow-hidden"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />
          
          {/* Radial glow behind logo */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-secondary/10 to-transparent rounded-full blur-3xl" />
          </motion.div>

          {/* Floating particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 4 + Math.random() * 6,
                height: 4 + Math.random() * 6,
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
                background: i % 2 === 0 ? '#FF8F00' : '#00BCD4',
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.5, 1],
                x: [0, Math.random() * 30 - 15, 0],
                y: [0, Math.random() * 30 - 15, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Main content container */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Animated Logo */}
            <motion.div
              className="relative w-32 h-32 mb-8"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: 'spring' }}
            >
              {/* Orbiting circle */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Orbit path */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#orbitGradient)"
                    strokeWidth="2"
                    strokeDasharray="20 10"
                    opacity="0.5"
                  />
                  {/* Orbiting dot */}
                  <circle
                    cx="95"
                    cy="50"
                    r="4"
                    fill="#00BCD4"
                    filter="url(#glow)"
                  />
                  <defs>
                    <linearGradient id="orbitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF8F00" />
                      <stop offset="50%" stopColor="#00BCD4" />
                      <stop offset="100%" stopColor="#FF8F00" />
                    </linearGradient>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                </svg>
              </motion.div>

              {/* Counter-rotating inner orbit */}
              <motion.div
                className="absolute inset-4"
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#FF8F00"
                    strokeWidth="1"
                    strokeDasharray="5 15"
                    opacity="0.3"
                  />
                  <circle
                    cx="90"
                    cy="50"
                    r="3"
                    fill="#FF8F00"
                    filter="url(#glow)"
                  />
                </svg>
              </motion.div>

              {/* Center icon */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ 
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/30 backdrop-blur-sm border border-primary/30 flex items-center justify-center">
                  <Icon icon="mdi:code-braces" className="text-4xl text-primary" />
                </div>
              </motion.div>
            </motion.div>

            {/* Brand Name */}
            <motion.div
              className="mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h1 className="text-3xl sm:text-4xl font-bold tracking-wide">
                <span className="text-primary">{brandFirst}</span>
                <span className="text-gray-200">{brandSecond}</span>
              </h1>
            </motion.div>

            {/* Progress bar container */}
            <motion.div
              className="w-64 sm:w-80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {/* Progress bar background */}
              <div className="relative h-1 bg-gray-800 rounded-full overflow-hidden mb-2">
                {/* Progress bar fill */}
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-secondary to-primary rounded-full"
                  style={{
                    backgroundSize: '200% 100%',
                  }}
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${Math.min(progress, 100)}%`,
                    backgroundPosition: ['0% 50%', '100% 50%'],
                  }}
                  transition={{
                    width: { duration: 0.1 },
                    backgroundPosition: { duration: 2, repeat: Infinity, ease: 'linear' },
                  }}
                />
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                />
              </div>

              {/* Skip intro button */}
              <motion.button
                onClick={handleSkip}
                className="w-full text-center text-sm text-gray-500 hover:text-secondary transition-colors py-2 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="group-hover:underline">Skip Intro</span>
              </motion.button>

              {/* Percentage */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <span className="text-secondary font-mono text-lg">
                  {Math.round(Math.min(progress, 100))}%
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* Corner decorations */}
          <motion.div
            className="absolute top-8 left-8 w-3 h-3 rounded-full bg-primary"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-8 right-8 w-2 h-2 rounded-full bg-secondary"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.3, 1],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />

          {/* Scan lines effect (subtle) */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.02]"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
