"use client";

import { useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float } from "@react-three/drei";
import { publications } from "@/content/portfolioData";
import { Publication, PublicationStatus } from "@/content/types";

interface HolographicManuscriptCardProps {
  publication: Publication;
  index: number;
  total: number;
  isSelected: boolean;
  onSelect: (pub: Publication) => void;
}

function HolographicManuscriptCard({
  publication,
  index,
  total,
  isSelected,
  onSelect,
}: HolographicManuscriptCardProps) {
  const meshRef = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);

  // Position in an elegant 3D arc / cylinder layout
  const angle = (index / total) * Math.PI * 1.5 - (Math.PI * 0.75);
  const radius = 3.6;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius - radius + 0.8;
  const y = (index - total / 2) * 0.15;

  useFrame(() => {
    if (!meshRef.current) return;
    const targetScale = isSelected || hovered ? 1.12 : 1.0;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  const getStatusColor = (status: PublicationStatus) => {
    switch (status) {
      case "published":
        return { main: "#D4AF37", glow: "#FFF2A3", border: "#E5C158" };
      case "accepted":
        return { main: "#C9A227", glow: "#E5BE38", border: "#D4AF37" };
      case "under_review":
        return { main: "#8E1C30", glow: "#C22B45", border: "#6E1423" };
      case "in_progress":
      default:
        return { main: "#3A343D", glow: "#6E1423", border: "#252026" };
    }
  };

  const statusColors = getStatusColor(publication.status);

  return (
    <group
      ref={meshRef}
      position={[x, y, z]}
      rotation={[0, -angle * 0.7, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(publication);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      {/* Holographic Card Surface */}
      <mesh>
        <boxGeometry args={[1.5, 1.0, 0.04]} />
        <meshPhysicalMaterial
          color={isSelected || hovered ? "#1E1A22" : "#121014"}
          roughness={0.2}
          metalness={0.8}
          transmission={0.4}
          ior={1.5}
          thickness={0.2}
          reflectivity={0.9}
          clearcoat={1.0}
        />
      </mesh>

      {/* Radiant Glowing Border Wireframe */}
      <mesh>
        <boxGeometry args={[1.52, 1.02, 0.045]} />
        <meshBasicMaterial
          color={statusColors.border}
          wireframe
          transparent
          opacity={isSelected || hovered ? 0.95 : 0.45}
        />
      </mesh>

      {/* Status Pill in 3D */}
      <mesh position={[0, 0.36, 0.03]}>
        <planeGeometry args={[1.1, 0.16]} />
        <meshBasicMaterial color={statusColors.main} transparent opacity={0.9} />
      </mesh>
      <Text
        position={[0, 0.36, 0.04]}
        fontSize={0.08}
        color={publication.status === "published" || publication.status === "accepted" ? "#000000" : "#FFFFFF"}
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        {publication.statusLabel.toUpperCase()}
      </Text>

      {/* Title */}
      <Text
        position={[0, 0.08, 0.03]}
        fontSize={0.105}
        color={isSelected || hovered ? "#FFF2A3" : "#EDE7DD"}
        anchorX="center"
        anchorY="middle"
        maxWidth={1.3}
        textAlign="center"
      >
        {publication.shortTitle.split(":")[0]}
      </Text>

      {/* Venue & Year */}
      <Text
        position={[0, -0.28, 0.03]}
        fontSize={0.075}
        color="#A69C93"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.35}
        textAlign="center"
      >
        {publication.venue.length > 28 ? publication.venue.slice(0, 26) + "..." : publication.venue} ({publication.year})
      </Text>
    </group>
  );
}

// Particle Energy Rings around the carousel
function OrbitingRings() {
  const ringRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.y += delta * 0.18;
  });

  return (
    <group ref={ringRef}>
      <mesh rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[4.2, 0.015, 16, 100]} />
        <meshBasicMaterial color="#D4AF37" transparent opacity={0.35} />
      </mesh>
      <mesh rotation={[-Math.PI / 3, 0, 0]}>
        <torusGeometry args={[3.8, 0.012, 16, 100]} />
        <meshBasicMaterial color="#6E1423" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

interface PublicationsLadderSceneProps {
  selectedPubId: string | null;
  onSelectPub: (pub: Publication) => void;
}

export function PublicationsLadderScene({
  selectedPubId,
  onSelectPub,
}: PublicationsLadderSceneProps) {
  const groupRef = useRef<THREE.Group>(null!);

  return (
    <div className="w-full h-[360px] sm:h-[440px] rounded-3xl bg-gradient-to-b from-[#151316]/90 via-[#0B0A0C]/90 to-[#151316]/90 border border-[#D4AF37]/30 overflow-hidden relative shadow-[0_0_30px_rgba(0,0,0,0.8)]">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[5, 8, 5]} intensity={2.0} color="#FFF2A3" />
        <pointLight position={[-5, -4, -3]} intensity={1.5} color="#8E1C30" />
        <directionalLight position={[0, 5, 4]} intensity={1.4} color="#D4AF37" />

        <OrbitingRings />

        <group ref={groupRef}>
          {publications.map((pub, idx) => (
            <HolographicManuscriptCard
              key={pub.id}
              publication={pub}
              index={idx}
              total={publications.length}
              isSelected={selectedPubId === pub.id}
              onSelect={onSelectPub}
            />
          ))}
        </group>
      </Canvas>

      {/* Floating Interactive Guide */}
      <div className="absolute bottom-3 left-4 right-4 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#A69C93] bg-[#0B0A0C]/90 px-4 py-2 rounded-xl border border-white/10 backdrop-blur-md pointer-events-none">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[#E5BE38]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-pulse" />
            3D Holographic Manuscript Matrix
          </span>
        </div>
        <span className="text-[#D4AF37]">Click any 3D card to view DOI & Citation</span>
      </div>
    </div>
  );
}
