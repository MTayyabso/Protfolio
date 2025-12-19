import { useRef, useState, ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltAmount?: number;
  glareEnabled?: boolean;
  scale?: number;
  perspective?: number;
}

export default function TiltCard({
  children,
  className = '',
  tiltAmount = 15,
  glareEnabled = true,
  scale = 1.02,
  perspective = 1000,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for smooth animation
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring configuration for smooth, natural movement
  const springConfig = { stiffness: 300, damping: 30 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [tiltAmount, -tiltAmount]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-tiltAmount, tiltAmount]), springConfig);

  // Glare effect position
  const glareX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), springConfig);
  const glareY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Normalize mouse position to -0.5 to 0.5
    const normalizedX = (e.clientX - centerX) / rect.width;
    const normalizedY = (e.clientY - centerY) / rect.height;

    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      style={{
        perspective: perspective,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          scale: isHovered ? scale : 1,
        }}
        transition={{
          scale: { type: 'spring', stiffness: 400, damping: 25 },
        }}
        className="relative w-full h-full"
      >
        {/* Main content */}
        {children}

        {/* Glare overlay */}
        {glareEnabled && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-inherit overflow-hidden"
            style={{
              opacity: isHovered ? 0.15 : 0,
              background: `radial-gradient(
                circle at ${glareX}% ${glareY}%,
                rgba(255, 255, 255, 0.8) 0%,
                rgba(255, 255, 255, 0) 50%
              )`,
              transition: 'opacity 0.3s ease',
            }}
          />
        )}

        {/* Depth shadow */}
        <motion.div
          className="absolute inset-0 -z-10 rounded-inherit"
          style={{
            transform: 'translateZ(-50px)',
            background: 'linear-gradient(135deg, rgba(0,0,0,0.1), rgba(0,0,0,0.2))',
            filter: 'blur(20px)',
            opacity: isHovered ? 0.5 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />
      </motion.div>
    </motion.div>
  );
}
