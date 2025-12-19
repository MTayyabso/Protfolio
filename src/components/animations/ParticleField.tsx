import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ParticlesProps {
  count?: number;
  color?: string;
  size?: number;
  speed?: number;
}

function Particles({ count = 800, color = '#FF8F00', size = 0.002, speed = 0.3 }: ParticlesProps) {
  const ref = useRef<THREE.Points>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  // Generate random positions for particles
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;     // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // z
    }
    return positions;
  }, [count]);

  // Store initial positions for wave animation
  const initialPositions = useMemo(() => new Float32Array(positions), [positions]);

  useFrame((state) => {
    if (!ref.current) return;
    
    const time = state.clock.getElapsedTime();
    const geometry = ref.current.geometry;
    const positionAttribute = geometry.getAttribute('position');
    
    // Animate particles with subtle wave motion
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = initialPositions[i3];
      const y = initialPositions[i3 + 1];
      const z = initialPositions[i3 + 2];
      
      // Wave animation
      positionAttribute.setXYZ(
        i,
        x + Math.sin(time * speed + y) * 0.1,
        y + Math.cos(time * speed + x) * 0.1,
        z + Math.sin(time * speed * 0.5 + x + y) * 0.05
      );
    }
    
    positionAttribute.needsUpdate = true;
    
    // Subtle rotation based on mouse position
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      mousePosition.current.y * 0.1,
      0.02
    );
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      mousePosition.current.x * 0.1,
      0.02
    );
  });

  // Track mouse movement
  const handlePointerMove = (e: THREE.Event) => {
    if ((e as unknown as { pointer?: { x: number; y: number } }).pointer) {
      const pointer = (e as unknown as { pointer: { x: number; y: number } }).pointer;
      mousePosition.current = { x: pointer.x, y: pointer.y };
    }
  };

  return (
    <Points
      ref={ref}
      positions={positions}
      stride={3}
      frustumCulled={false}
      onPointerMove={handlePointerMove}
    >
      <PointMaterial
        transparent
        color={color}
        size={size}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

interface ParticleFieldProps {
  className?: string;
  particleCount?: number;
  primaryColor?: string;
  secondaryColor?: string;
}

export default function ParticleField({
  className = '',
  particleCount = 600,
  primaryColor = '#FF8F00',
  secondaryColor = '#00BCD4',
}: ParticleFieldProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]} // Limit pixel ratio for performance
        gl={{ 
          antialias: false, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <Particles count={particleCount} color={primaryColor} size={0.003} speed={0.2} />
        <Particles count={Math.floor(particleCount * 0.3)} color={secondaryColor} size={0.002} speed={0.15} />
      </Canvas>
    </div>
  );
}
