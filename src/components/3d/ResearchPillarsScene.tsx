"use client";

import { useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text } from "@react-three/drei";

interface FacetedPolyhedronProps {
  position: [number, number, number];
  type: "simplex" | "icosahedron" | "octahedron" | "dodecahedron";
  title: string;
  subtitle: string;
  isActive: boolean;
  onSelect: () => void;
}

function FacetedPolyhedron({
  position,
  type,
  title,
  subtitle,
  isActive,
  onSelect
}: FacetedPolyhedronProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const speed = hovered || isActive ? 1.2 : 0.4;
    meshRef.current.rotation.x += delta * speed * 0.5;
    meshRef.current.rotation.y += delta * speed * 0.8;
  });

  const getGeometry = () => {
    switch (type) {
      case "simplex":
        // Tetrahedron representing the 3-simplex in Dirichlet distribution
        return <tetrahedronGeometry args={[1.35, 0]} />;
      case "icosahedron":
        return <icosahedronGeometry args={[1.25, 0]} />;
      case "octahedron":
        return <octahedronGeometry args={[1.3, 0]} />;
      case "dodecahedron":
        return <dodecahedronGeometry args={[1.2, 0]} />;
    }
  };

  const activeColor = isActive || hovered ? "#E5BE38" : "#6E1423";
  const wireColor = isActive || hovered ? "#FFE380" : "#C9A227";

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={1.2}>
      <group position={position}>
        {/* Faceted Mesh */}
        <mesh
          ref={meshRef}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => setHovered(false)}
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          scale={hovered || isActive ? 1.15 : 1}
        >
          {getGeometry()}
          <meshStandardMaterial
            color={activeColor}
            roughness={0.25}
            metalness={0.85}
            flatShading
            emissive={isActive || hovered ? "#C9A227" : "#32070E"}
            emissiveIntensity={isActive || hovered ? 0.6 : 0.15}
          />
        </mesh>

        {/* Outer Wireframe Cage */}
        <mesh scale={hovered || isActive ? 1.22 : 1.08}>
          {getGeometry()}
          <meshBasicMaterial
            color={wireColor}
            wireframe
            transparent
            opacity={hovered || isActive ? 0.85 : 0.3}
          />
        </mesh>

        {/* 3D Label Below */}
        <Text
          position={[0, -1.8, 0]}
          fontSize={0.24}
          color={isActive || hovered ? "#E5BE38" : "#EDE7DD"}
          anchorX="center"
          anchorY="middle"
          maxWidth={3.0}
          textAlign="center"
        >
          {title}
        </Text>
        <Text
          position={[0, -2.15, 0]}
          fontSize={0.16}
          color="#A69C93"
          anchorX="center"
          anchorY="middle"
          maxWidth={3.2}
          textAlign="center"
        >
          {subtitle}
        </Text>
      </group>
    </Float>
  );
}

interface ResearchPillarsSceneProps {
  activePillarId: string;
  onSelectPillar: (id: string) => void;
}

export function ResearchPillarsScene({
  activePillarId,
  onSelectPillar
}: ResearchPillarsSceneProps) {
  const pillarsConfig = [
    {
      id: "evidential-dl",
      type: "simplex" as const,
      position: [-4.5, 0.4, 0] as [number, number, number],
      title: "Evidential Deep Learning",
      subtitle: "Dirichlet Prior & Vacuity"
    },
    {
      id: "few-shot-distill",
      type: "icosahedron" as const,
      position: [-1.5, -0.4, 0] as [number, number, number],
      title: "Knowledge Distillation",
      subtitle: "Multi-Scale Teacher Ensembles"
    },
    {
      id: "xai-interpretability",
      type: "octahedron" as const,
      position: [1.5, 0.4, 0] as [number, number, number],
      title: "Explainable AI (XAI)",
      subtitle: "Grad-CAM & SHAP Attribution"
    },
    {
      id: "federated-learning",
      type: "dodecahedron" as const,
      position: [4.5, -0.4, 0] as [number, number, number],
      title: "Federated & Privacy AI",
      subtitle: "Multi-Hospital Consensus"
    }
  ];

  return (
    <div className="w-full h-[360px] sm:h-[420px] rounded-2xl bg-[#0B0A0C]/60 border border-white/10 overflow-hidden relative">
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#EDE7DD" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#6E1423" />
        <directionalLight position={[0, 5, 5]} intensity={1.2} color="#C9A227" />

        {pillarsConfig.map((p) => (
          <FacetedPolyhedron
            key={p.id}
            position={p.position}
            type={p.type}
            title={p.title}
            subtitle={p.subtitle}
            isActive={activePillarId === p.id}
            onSelect={() => onSelectPillar(p.id)}
          />
        ))}
      </Canvas>

      <div className="absolute top-3 left-4 text-xs font-mono text-[#A69C93] flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#C9A227]" />
        <span>Click or hover faceted geometries to inspect methodological foundations</span>
      </div>
    </div>
  );
}
