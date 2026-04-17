"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

export default function HeroModel() {
  const torusRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (torusRef.current) {
      torusRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
      torusRef.current.rotation.y += 0.005;
      torusRef.current.rotation.z = Math.cos(t * 0.2) * 0.1;
    }

    if (innerRef.current) {
      innerRef.current.rotation.x += 0.008;
      innerRef.current.rotation.y -= 0.006;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += 0.003;
      ring1Ref.current.rotation.x = Math.sin(t * 0.4) * 0.3;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= 0.004;
      ring2Ref.current.rotation.y = Math.cos(t * 0.3) * 0.4;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={[1.5, 0, 0]}>
        {/* Main Torus Knot */}
        <mesh ref={torusRef} scale={1.2}>
          <torusKnotGeometry args={[1, 0.3, 256, 64, 2, 3]} />
          <MeshDistortMaterial
            color="#0a0a20"
            roughness={0.1}
            metalness={0.9}
            distort={0.15}
            speed={2}
            envMapIntensity={1}
          />
        </mesh>

        {/* Inner Icosahedron — wireframe core */}
        <mesh ref={innerRef} scale={0.6}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={0.5}
            wireframe
            transparent
            opacity={0.6}
          />
        </mesh>

        {/* Orbital Ring 1 */}
        <mesh ref={ring1Ref} scale={2.2}>
          <torusGeometry args={[1, 0.012, 16, 100]} />
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={0.8}
            transparent
            opacity={0.5}
          />
        </mesh>

        {/* Orbital Ring 2 */}
        <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]} scale={1.8}>
          <torusGeometry args={[1, 0.008, 16, 100]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={0.8}
            transparent
            opacity={0.4}
          />
        </mesh>

        {/* Central glow sphere — blooms via post-processing */}
        <mesh scale={0.35}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={3}
            transparent
            opacity={0.2}
          />
        </mesh>

        {/* Outer atmosphere halo */}
        <mesh scale={2.6}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={0.5}
            transparent
            opacity={0.03}
            side={THREE.BackSide}
          />
        </mesh>
      </group>
    </Float>
  );
}
