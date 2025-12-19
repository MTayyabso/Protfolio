import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface CustomCursorProps {
  ringColor?: string;
  dotColor?: string;
  ringSize?: number;
  dotSize?: number;
}

export default function CustomCursor({
  ringColor = '#00BCD4',
  dotColor = '#00BCD4',
  ringSize = 40,
  dotSize = 8,
}: CustomCursorProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Track mouse position
  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, [isVisible]);

  // Ring follows with delay (lerp effect)
  useEffect(() => {
    let animationId: number;
    
    const animate = () => {
      setRingPosition(prev => ({
        x: prev.x + (position.x - prev.x) * 0.15,
        y: prev.y + (position.y - prev.y) * 0.15,
      }));
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [position]);

  // Detect hover on interactive elements
  useEffect(() => {
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, input, textarea, select, [role="button"]');
      setIsHovering(!!isInteractive);
    };

    document.addEventListener('mouseover', onMouseOver);
    return () => document.removeEventListener('mouseover', onMouseOver);
  }, []);

  // Hide system cursor
  useEffect(() => {
    document.body.style.cursor = 'none';
    
    const style = document.createElement('style');
    style.id = 'custom-cursor-hide';
    style.innerHTML = `*, *::before, *::after { cursor: none !important; }`;
    document.head.appendChild(style);

    return () => {
      document.body.style.cursor = '';
      document.getElementById('custom-cursor-hide')?.remove();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Ring - follows with delay */}
      <div
        style={{
          position: 'fixed',
          left: ringPosition.x,
          top: ringPosition.y,
          width: ringSize,
          height: ringSize,
          marginLeft: -ringSize / 2,
          marginTop: -ringSize / 2,
          border: `2px solid ${ringColor}`,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'transform 0.15s ease-out',
          transform: `scale(${isHovering ? 1.5 : 1})`,
          boxShadow: `0 0 20px ${ringColor}60`,
        }}
      />

      {/* Inner Dot - follows cursor directly */}
      <div
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          width: dotSize,
          height: dotSize,
          marginLeft: -dotSize / 2,
          marginTop: -dotSize / 2,
          backgroundColor: dotColor,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'transform 0.1s ease-out',
          transform: `scale(${isHovering ? 0.5 : 1})`,
          boxShadow: `0 0 10px ${dotColor}, 0 0 20px ${dotColor}80`,
        }}
      />
    </>
  );
}
