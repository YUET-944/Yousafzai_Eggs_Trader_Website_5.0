import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows, Float, SoftShadows, PerspectiveCamera } from '@react-three/drei';
import GuideCharacter from './GuideCharacter';
import JourneyStage from './JourneyStage';
import { damp } from './animations';

function CameraController({ scrollProgress }) {
  const cameraRef = useRef();

  useFrame((state, delta) => {
    if (!cameraRef.current) return;
    
    // Pan camera down along Z axis as scroll progresses
    const targetZ = scrollProgress * 10;
    
    // Smoothly animate the camera
    cameraRef.current.position.z = damp(cameraRef.current.position.z, targetZ + 10, 3, delta);
    cameraRef.current.position.y = damp(cameraRef.current.position.y, 6 - (scrollProgress * 2), 3, delta);
    cameraRef.current.lookAt(0, 1, targetZ - 5);
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 6, 10]} fov={45} />;
}

export default function StickyScene({ scrollProgress }) {
  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative', background: '#F5F7FA' }}>
      <Canvas shadows dpr={[1, 2]}>
        <Suspense fallback={null}>
          <CameraController scrollProgress={scrollProgress} />
          
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[5, 10, 5]} 
            intensity={1} 
            castShadow 
            shadow-mapSize={[1024, 1024]}
          />
          <SoftShadows size={20} samples={10} focus={0.5} />

          {/* Premium effects: float character slightly if desired, or environment lighting */}
          <Environment preset="city" />

          <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
            <GuideCharacter scrollProgress={scrollProgress} />
          </Float>

          <JourneyStage scrollProgress={scrollProgress} />

          <ContactShadows position={[0, 0, 0]} opacity={0.5} scale={20} blur={2} far={4} />
        </Suspense>
      </Canvas>
    </div>
  );
}
