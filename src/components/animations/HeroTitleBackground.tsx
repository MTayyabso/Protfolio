import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface HeroTitleBackgroundProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  noiseOpacity?: number;
  glowIntensity?: number;
  borderRadius?: string;
}

/**
 * HeroTitleBackground - Premium animated background for hero titles
 * 
 * Features:
 * - Animated mesh gradient with smooth morphing
 * - Mouse-follow parallax with lerp easing
 * - Noise/grain overlay for depth
 * - GPU-accelerated transforms
 * - Respects prefers-reduced-motion
 */
export default function HeroTitleBackground({
  children,
  className = '',
  colors = ['#FF8F00', '#FF6B35', '#00BCD4', '#7C3AED', '#EC4899'],
  noiseOpacity = 0.03,
  glowIntensity = 0.4,
  borderRadius = '1rem',
}: HeroTitleBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Mouse position with spring easing (lerp effect)
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Spring config for smooth mouse-follow with lerp
  const springConfig = { stiffness: 50, damping: 30, mass: 1 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Transform mouse position to gradient movement
  const gradientX = useTransform(smoothMouseX, [0, 1], [-20, 20]);
  const gradientY = useTransform(smoothMouseY, [0, 1], [-20, 20]);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Mouse tracking with throttling for performance
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    mouseX.set(Math.max(0, Math.min(1, x)));
    mouseY.set(Math.max(0, Math.min(1, y)));
  }, [prefersReducedMotion, mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    // Smoothly return to center
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={containerRef}
      className={`relative inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ borderRadius }}
    >
      {/* Animated Mesh Gradient Background */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{
          borderRadius,
          x: gradientX,
          y: gradientY,
        }}
      >
        {/* Base gradient layer */}
        <motion.div
          className="absolute inset-[-50%] w-[200%] h-[200%]"
          style={{
            background: `
              radial-gradient(ellipse 80% 80% at 50% 50%, ${colors[0]}40, transparent 50%),
              radial-gradient(ellipse 60% 60% at 80% 20%, ${colors[1]}50, transparent 50%),
              radial-gradient(ellipse 70% 70% at 20% 80%, ${colors[2]}40, transparent 50%),
              radial-gradient(ellipse 50% 50% at 70% 70%, ${colors[3]}30, transparent 50%),
              radial-gradient(ellipse 60% 60% at 30% 30%, ${colors[4]}30, transparent 50%)
            `,
            willChange: 'transform',
          }}
          animate={prefersReducedMotion ? {} : {
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: {
              duration: 60,
              repeat: Infinity,
              ease: 'linear',
            },
            scale: {
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatType: 'reverse',
            },
          }}
        />

        {/* Secondary animated blob layer */}
        <motion.div
          className="absolute inset-[-30%] w-[160%] h-[160%]"
          style={{
            background: `
              radial-gradient(ellipse 50% 60% at 60% 40%, ${colors[2]}35, transparent 50%),
              radial-gradient(ellipse 70% 50% at 40% 60%, ${colors[0]}30, transparent 50%),
              radial-gradient(ellipse 40% 40% at 80% 80%, ${colors[4]}25, transparent 50%)
            `,
            willChange: 'transform',
          }}
          animate={prefersReducedMotion ? {} : {
            rotate: [360, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            rotate: {
              duration: 45,
              repeat: Infinity,
              ease: 'linear',
            },
            scale: {
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatType: 'reverse',
            },
          }}
        />

        {/* Morphing blob accents */}
        {!prefersReducedMotion && colors.slice(0, 3).map((color, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: `${40 + i * 10}%`,
              height: `${40 + i * 10}%`,
              left: `${20 + i * 15}%`,
              top: `${20 + i * 15}%`,
              background: `radial-gradient(circle, ${color}30, transparent 70%)`,
              borderRadius: '50%',
              filter: 'blur(20px)',
              willChange: 'transform',
            }}
            animate={{
              x: [0, 30, -20, 10, 0],
              y: [0, -20, 30, -10, 0],
              scale: [1, 1.2, 0.9, 1.1, 1],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 2,
            }}
          />
        ))}

        {/* Glow effect */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,${glowIntensity}) 100%)`,
            borderRadius,
          }}
        />
      </motion.div>

      {/* Noise/Grain overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius,
          opacity: noiseOpacity,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          mixBlendMode: 'overlay',
        }}
      />

      {/* Animated grain shimmer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius,
          opacity: noiseOpacity * 0.5,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 128 128' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' seed='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise2)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          mixBlendMode: 'soft-light',
        }}
        animate={prefersReducedMotion ? {} : {
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Soft inner glow border */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius,
          boxShadow: `
            inset 0 0 30px rgba(255, 255, 255, 0.1),
            0 0 60px rgba(255, 143, 0, 0.15),
            0 0 100px rgba(0, 188, 212, 0.1)
          `,
        }}
      />

      {/* Content layer - text stays on top and readable */}
      <div
        className="relative z-10"
        style={{ borderRadius }}
      >
        {children}
      </div>
    </motion.div>
  );
}

// Simplified version for inline text highlights
export function AnimatedTextHighlight({
  children,
  className = '',
  colors = ['#FF8F00', '#00BCD4', '#7C3AED'],
}: {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
}) {
  return (
    <span className={`relative inline-block ${className}`}>
      <motion.span
        className="absolute inset-0 -inset-x-2 -inset-y-1 rounded-lg"
        style={{
          background: `linear-gradient(90deg, ${colors.map((c, i) => `${c}${i === 0 ? '40' : '30'}`).join(', ')})`,
          backgroundSize: '200% 100%',
          filter: 'blur(8px)',
          zIndex: -1,
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <span className="relative">{children}</span>
    </span>
  );
}
