import { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  direction?: 'up' | 'down';
  smoothness?: number;
}

export default function ParallaxSection({
  children,
  className = '',
  intensity = 50,
  direction = 'up',
  smoothness = 0.1,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Calculate parallax offset based on direction
  const yRange = direction === 'up' ? [intensity, -intensity] : [-intensity, intensity];
  const y = useTransform(scrollYProgress, [0, 1], yRange);
  
  // Apply spring smoothing for natural movement
  const smoothY = useSpring(y, {
    stiffness: 100,
    damping: 30,
    mass: smoothness,
  });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y: smoothY }}>
        {children}
      </motion.div>
    </div>
  );
}

// Parallax Image component for projects section
interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  intensity?: number;
}

export function ParallaxImage({
  src,
  alt,
  className = '',
  intensity = 30,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-intensity, intensity]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.1, 1.15]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale }}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

// Parallax Layer for creating depth effects
interface ParallaxLayerProps {
  children: ReactNode;
  className?: string;
  speed?: number; // 0 = static, 1 = full parallax
  zIndex?: number;
}

export function ParallaxLayer({
  children,
  className = '',
  speed = 0.5,
  zIndex = 0,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);

  return (
    <motion.div
      ref={ref}
      style={{ y, zIndex }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
