import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { damp, getLocalProgress } from './animations';

/**
 * Placeholder Environment Objects
 * Future implementation: load specific .glb models based on active environment
 */
export default function JourneyStage({ scrollProgress }) {
  const farmRef = useRef();
  const labRef = useRef();
  const coldRef = useRef();
  const packRef = useRef();
  const truckRef = useRef();

  useFrame((state, delta) => {
    // Determine opacities / scales based on scroll progress ranges
    // Farm: 0 - 0.2
    const farmActive = getLocalProgress(scrollProgress, 0, 0.25);
    if (farmRef.current) farmRef.current.scale.setScalar(damp(farmRef.current.scale.x, farmActive > 0 && farmActive < 1 ? 1 : 0, 4, delta));

    // Lab: 0.2 - 0.4
    const labActive = getLocalProgress(scrollProgress, 0.15, 0.45);
    if (labRef.current) labRef.current.scale.setScalar(damp(labRef.current.scale.x, labActive > 0 && labActive < 1 ? 1 : 0, 4, delta));

    // Cold Storage: 0.4 - 0.6
    const coldActive = getLocalProgress(scrollProgress, 0.35, 0.65);
    if (coldRef.current) coldRef.current.scale.setScalar(damp(coldRef.current.scale.x, coldActive > 0 && coldActive < 1 ? 1 : 0, 4, delta));

    // Packaging: 0.6 - 0.8
    const packActive = getLocalProgress(scrollProgress, 0.55, 0.85);
    if (packRef.current) packRef.current.scale.setScalar(damp(packRef.current.scale.x, packActive > 0 && packActive < 1 ? 1 : 0, 4, delta));

    // Delivery: 0.8 - 1.0
    const deliveryActive = getLocalProgress(scrollProgress, 0.75, 1.0);
    if (truckRef.current) truckRef.current.scale.setScalar(damp(truckRef.current.scale.x, deliveryActive > 0 ? 1 : 0, 4, delta));
  });

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#EEF1F5" />
      </mesh>

      {/* Farm Elements (Trees placeholder) */}
      <group ref={farmRef} position={[2, 0, -4]}>
        <mesh position={[0, 1.5, 0]} castShadow>
          <coneGeometry args={[1, 3, 8]} />
          <meshStandardMaterial color="#3F6231" />
        </mesh>
      </group>

      {/* Lab Elements (Scanner placeholder) */}
      <group ref={labRef} position={[-2, 0, -2]}>
        <mesh position={[0, 1, 0]} castShadow>
          <boxGeometry args={[2, 2, 1]} />
          <meshStandardMaterial color="#E0E5EC" />
        </mesh>
      </group>

      {/* Cold Storage Elements */}
      <group ref={coldRef} position={[2, 0, 0]}>
        <mesh position={[0, 1.5, 0]} castShadow>
          <boxGeometry args={[1, 3, 1]} />
          <meshStandardMaterial color="#A3C2F0" opacity={0.8} transparent />
        </mesh>
      </group>

      {/* Packaging Elements */}
      <group ref={packRef} position={[-2, 0, 2]}>
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[3, 1, 1]} />
          <meshStandardMaterial color="#DE510A" />
        </mesh>
      </group>

      {/* Delivery Truck Elements */}
      <group ref={truckRef} position={[0, 0, 6]}>
        <mesh position={[0, 1.5, 0]} castShadow>
          <boxGeometry args={[2.5, 3, 5]} />
          <meshStandardMaterial color="#FBF7F0" />
        </mesh>
      </group>
    </group>
  );
}
