import { useEffect, useState, useRef } from 'react';

interface CursorGlowProps {
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
  dotCount?: number;
}

interface FloatingDot {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  velocityX: number;
  velocityY: number;
  prevX: number;
  prevY: number;
}

export default function CursorGlow({
  className = '',
  primaryColor = '#00BCD4',
  secondaryColor = '#FF8F00',
  dotCount = 30,
}: CursorGlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dots, setDots] = useState<FloatingDot[]>([]);
  const animationRef = useRef<number>();
  const dimensionsRef = useRef({ width: 1000, height: 800 });

  // Initialize dots with random positions and velocities
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      dimensionsRef.current = {
        width: container.clientWidth,
        height: container.clientHeight,
      };
    }

    const initialDots: FloatingDot[] = Array.from({ length: dotCount }, (_, i) => {
      const x = Math.random() * dimensionsRef.current.width;
      const y = Math.random() * dimensionsRef.current.height;
      return {
        id: i,
        x,
        y,
        prevX: x,
        prevY: y,
        size: 8 + Math.random() * 12,
        color: i % 2 === 0 ? primaryColor : secondaryColor,
        velocityX: (Math.random() - 0.5) * 4,
        velocityY: (Math.random() - 0.5) * 4,
      };
    });

    setDots(initialDots);
  }, [dotCount, primaryColor, secondaryColor]);

  // Update dimensions on resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        dimensionsRef.current = {
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        };
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animate dots randomly
  useEffect(() => {
    const animate = () => {
      setDots(prevDots => 
        prevDots.map(dot => {
          const prevX = dot.x;
          const prevY = dot.y;

          let newX = dot.x + dot.velocityX;
          let newY = dot.y + dot.velocityY;
          let newVelX = dot.velocityX;
          let newVelY = dot.velocityY;

          // Bounce off walls
          if (newX < 0 || newX > dimensionsRef.current.width) {
            newVelX = -newVelX * (0.8 + Math.random() * 0.4);
            newX = Math.max(0, Math.min(newX, dimensionsRef.current.width));
          }
          if (newY < 0 || newY > dimensionsRef.current.height) {
            newVelY = -newVelY * (0.8 + Math.random() * 0.4);
            newY = Math.max(0, Math.min(newY, dimensionsRef.current.height));
          }

          // Random acceleration for organic movement
          newVelX += (Math.random() - 0.5) * 0.3;
          newVelY += (Math.random() - 0.5) * 0.3;

          // Limit max velocity
          const maxVel = 5;
          newVelX = Math.max(-maxVel, Math.min(maxVel, newVelX));
          newVelY = Math.max(-maxVel, Math.min(maxVel, newVelY));

          return {
            ...dot,
            x: newX,
            y: newY,
            prevX,
            prevY,
            velocityX: newVelX,
            velocityY: newVelY,
          };
        })
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex: 1 }}
    >
      {dots.map((dot) => {
        return (
          <div key={dot.id}>
            {/* Outer glow */}
            <div
              className="absolute rounded-full"
              style={{
                left: dot.x,
                top: dot.y,
                width: dot.size * 2.5,
                height: dot.size * 2.5,
                marginLeft: -dot.size * 1.25,
                marginTop: -dot.size * 1.25,
                background: `radial-gradient(circle, ${dot.color}25 0%, transparent 70%)`,
                filter: 'blur(4px)',
              }}
            />
            
            {/* Main dot */}
            <div
              className="absolute rounded-full"
              style={{
                left: dot.x,
                top: dot.y,
                width: dot.size,
                height: dot.size,
                marginLeft: -dot.size / 2,
                marginTop: -dot.size / 2,
                backgroundColor: dot.color,
                boxShadow: `
                  0 0 ${dot.size * 0.8}px ${dot.color},
                  0 0 ${dot.size * 1.8}px ${dot.color}60
                `,
              }}
            />
            
            {/* Bright core */}
            <div
              className="absolute rounded-full"
              style={{
                left: dot.x,
                top: dot.y,
                width: dot.size * 0.3,
                height: dot.size * 0.3,
                marginLeft: -dot.size * 0.15,
                marginTop: -dot.size * 0.15,
                backgroundColor: '#ffffff',
                opacity: 0.85,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
