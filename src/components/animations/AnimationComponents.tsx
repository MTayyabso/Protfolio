import { ReactNode, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  magneticStrength?: number;
  scale?: number;
}

// Magnetic hover effect button
export function MagneticButton({
  children,
  className = '',
  magneticStrength = 0.3,
  scale = 1.05,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 20 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distX = (e.clientX - centerX) * magneticStrength;
    const distY = (e.clientY - centerY) * magneticStrength;

    x.set(distX);
    y.set(distY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      animate={{ scale: isHovered ? scale : 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

// Animated text reveal with character-by-character animation
interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export function AnimatedText({
  text,
  className = '',
  delay = 0,
  staggerDelay = 0.03,
  as: Component = 'span',
}: AnimatedTextProps) {
  const words = text.split(' ');

  return (
    <Component className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              className="inline-block"
              initial={{ opacity: 0, y: 20, rotateX: -90 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: delay + (wordIndex * word.length + charIndex) * staggerDelay,
                type: 'spring',
                stiffness: 100,
                damping: 10,
              }}
            >
              {char}
            </motion.span>
          ))}
          {wordIndex < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </Component>
  );
}

// Scroll reveal wrapper with multiple animation styles
interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  delay?: number;
  duration?: number;
  distance?: number;
}

export function ScrollReveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 40,
}: ScrollRevealProps) {
  const getInitial = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: distance };
      case 'down':
        return { opacity: 0, y: -distance };
      case 'left':
        return { opacity: 0, x: distance };
      case 'right':
        return { opacity: 0, x: -distance };
      case 'fade':
      default:
        return { opacity: 0 };
    }
  };

  return (
    <motion.div
      className={className}
      initial={getInitial()}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

// Glassmorphic card with hover effect
interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({
  children,
  className = '',
  hover = true,
}: GlassCardProps) {
  return (
    <motion.div
      className={`
        relative overflow-hidden rounded-2xl
        bg-white/10 backdrop-blur-md
        border border-white/20
        shadow-lg shadow-black/5
        ${className}
      `}
      whileHover={hover ? {
        scale: 1.02,
        y: -5,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
      } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Gradient border effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

// Ripple effect for buttons/inputs
interface RippleEffectProps {
  children: ReactNode;
  className?: string;
  color?: string;
}

export function RippleEffect({
  children,
  className = '',
  color = 'rgba(255, 143, 0, 0.3)',
}: RippleEffectProps) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { x, y, id }]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);
  };

  return (
    <div className={`relative overflow-hidden ${className}`} onClick={handleClick}>
      {children}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            background: color,
          }}
          initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 1 }}
          animate={{ width: 500, height: 500, x: -250, y: -250, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

// Stagger children animation wrapper
interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
}

export function StaggerChildren({
  children,
  className = '',
  staggerDelay = 0.1,
  initialDelay = 0.2,
}: StaggerChildrenProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: initialDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// Stagger child item
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className = '' }: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            type: 'spring',
            stiffness: 100,
            damping: 15,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
