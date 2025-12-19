import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface GeometryProps {
  position?: [number, number, number];
  color?: string;
  shape?: 'icosahedron' | 'torus' | 'octahedron' | 'dodecahedron';
  size?: number;
  speed?: number;
  distort?: number;
}

function Geometry({ 
  position = [0, 0, 0], 
  color = '#FF8F00', 
  shape = 'icosahedron',
  size = 1,
  speed = 1,
  distort = 0.3,
}: GeometryProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.2 * speed;
    meshRef.current.rotation.y = time * 0.3 * speed;
  });

  const geometry = useMemo(() => {
    switch (shape) {
      case 'torus':
        return <torusGeometry args={[size, size * 0.4, 16, 32]} />;
      case 'octahedron':
        return <octahedronGeometry args={[size, 0]} />;
      case 'dodecahedron':
        return <dodecahedronGeometry args={[size, 0]} />;
      case 'icosahedron':
      default:
        return <icosahedronGeometry args={[size, 1]} />;
    }
  }, [shape, size]);

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={1}
      floatingRange={[-0.2, 0.2]}
    >
      <mesh ref={meshRef} position={position}>
        {geometry}
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.7}
          wireframe
          distort={distort}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

interface FloatingGeometryProps {
  className?: string;
  shapes?: Array<{
    shape?: 'icosahedron' | 'torus' | 'octahedron' | 'dodecahedron';
    position?: [number, number, number];
    color?: string;
    size?: number;
  }>;
}

export default function FloatingGeometry({
  className = '',
  shapes = [
    { shape: 'icosahedron', position: [-2, 1, -2], color: '#FF8F00', size: 0.8 },
    { shape: 'torus', position: [2, -1, -1], color: '#00BCD4', size: 0.6 },
    { shape: 'octahedron', position: [0, 2, -3], color: '#FFB74D', size: 0.5 },
  ],
}: FloatingGeometryProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#00BCD4" />
        
        {shapes.map((shapeProps, index) => (
          <Geometry
            key={index}
            shape={shapeProps.shape}
            position={shapeProps.position}
            color={shapeProps.color}
            size={shapeProps.size}
            speed={0.5 + index * 0.2}
          />
        ))}
      </Canvas>
    </div>
  );
}
