import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { damp } from './animations';

/**
 * Placeholder Guide Character
 * Future implementation:
 * // import { useGLTF } from '@react-three/drei';
 * // const { scene, animations } = useGLTF('/models/guide-character.glb');
 * // return <primitive object={scene} />
 */
export default function GuideCharacter({ scrollProgress }) {
  const group = useRef();
  
  useFrame((state, delta) => {
    if (!group.current) return;
    
    // Example: Map global scroll progress to character movement/actions
    // For now, we just slowly move them forward and slightly bounce
    
    const targetZ = scrollProgress * 10 - 5; // Move from -5 to 5
    
    // Smoothly damp position
    group.current.position.z = damp(group.current.position.z, targetZ, 4, delta);
    
    // Simple bobbing to simulate walk
    const bob = Math.sin(state.clock.elapsedTime * 6) * 0.1;
    group.current.position.y = damp(group.current.position.y, bob, 4, delta);
  });

  return (
    <group ref={group} position={[0, 0, -5]}>
      {/* Body */}
      <mesh position={[0, 0.75, 0]} castShadow>
        <capsuleGeometry args={[0.3, 0.8, 16, 16]} />
        <meshStandardMaterial color="#FBF7F0" />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 1.6, 0]} castShadow>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Hat/Cap */}
      <mesh position={[0, 1.8, 0.05]} castShadow>
        <cylinderGeometry args={[0.26, 0.26, 0.1, 16]} />
        <meshStandardMaterial color="#DE510A" />
      </mesh>
    </group>
  );
}
