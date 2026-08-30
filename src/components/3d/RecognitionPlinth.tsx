"use client";

import { useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text } from "@react-three/drei";

function AwardTrophy({
  position,
  label,
  sublabel,
  shape,
}: {
  position: [number, number, number];
  label: string;
  sublabel: string;
  shape: "champion" | "datathon" | "poster";
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * (hovered ? 1.5 : 0.6);
  });

  const renderGeometry = () => {
    switch (shape) {
      case "champion":
        // Octahedron with elongated diamond crown
        return <octahedronGeometry args={[1.1, 0]} />;
      case "datathon":
        // Dodecahedron representing high-dimensional data competition
        return <dodecahedronGeometry args={[1.0, 0]} />;
      case "poster":
      default:
        // Icosahedron
        return <icosahedronGeometry args={[0.9, 0]} />;
    }
  };

  return (
    <Float speed={2.5} rotationIntensity={0.5} floatIntensity={1.0}>
      <group position={position}>
        {/* Plinth Base */}
        <mesh position={[0, -1.5, 0]}>
          <cylinderGeometry args={[1.1, 1.25, 0.3, 32]} />
          <meshStandardMaterial
            color="#1C191E"
            roughness={0.4}
            metalness={0.8}
          />
        </mesh>

        {/* Gold Ring on Plinth */}
        <mesh position={[0, -1.33, 0]}>
          <cylinderGeometry args={[1.12, 1.12, 0.05, 32]} />
          <meshStandardMaterial
            color="#E5BE38"
            roughness={0.15}
            metalness={0.95}
          />
        </mesh>

        {/* Faceted Award Form */}
        <mesh
          ref={meshRef}
          position={[0, 0, 0]}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => setHovered(false)}
          scale={hovered ? 1.15 : 1.0}
        >
          {renderGeometry()}
          <meshStandardMaterial
            color={hovered ? "#FFE380" : "#C9A227"}
            roughness={0.15}
            metalness={0.95}
            flatShading
            emissive="#C9A227"
            emissiveIntensity={hovered ? 0.7 : 0.3}
          />
        </mesh>

        {/* Outer Wire Frame */}
        <mesh position={[0, 0, 0]} scale={hovered ? 1.25 : 1.1}>
          {renderGeometry()}
          <meshBasicMaterial
            color="#FFE380"
            wireframe
            transparent
            opacity={hovered ? 0.8 : 0.25}
          />
        </mesh>

        {/* Text Labels */}
        <Text
          position={[0, -2.0, 0]}
          fontSize={0.22}
          color={hovered ? "#E5BE38" : "#EDE7DD"}
          anchorX="center"
          anchorY="middle"
          maxWidth={3.0}
          textAlign="center"
        >
          {label}
        </Text>
        <Text
          position={[0, -2.3, 0]}
          fontSize={0.15}
          color="#A69C93"
          anchorX="center"
          anchorY="middle"
          maxWidth={3.2}
          textAlign="center"
        >
          {sublabel}
        </Text>
      </group>
    </Float>
  );
}

export function RecognitionPlinth() {
  return (
    <div className="w-full h-[360px] sm:h-[420px] rounded-2xl bg-[#0B0A0C]/70 border border-white/10 overflow-hidden relative">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.8} color="#EDE7DD" />
        <pointLight position={[-10, -5, -5]} intensity={1.0} color="#6E1423" />
        <directionalLight position={[0, 8, 5]} intensity={1.4} color="#C9A227" />

        <AwardTrophy
          position={[-3.2, 0.3, 0]}
          label="Champion / 1st Place"
          sublabel="DIU AI Innovation Hackathon 2026"
          shape="champion"
        />

        <AwardTrophy
          position={[0, 0.5, 0.4]}
          label="Top 48 / 196 (0.985 AUC)"
          sublabel="bKash × NSUCEC Datathon"
          shape="datathon"
        />

        <AwardTrophy
          position={[3.2, 0.3, 0]}
          label="Selected Poster"
          sublabel="DIU-DoR Poster Presentation 2026"
          shape="poster"
        />
      </Canvas>

      <div className="absolute top-3 left-4 text-xs font-mono text-[#A69C93] flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#C9A227]" />
        <span>3D Recognition Plinth — Abstract Faceted Honors</span>
      </div>
    </div>
  );
}
