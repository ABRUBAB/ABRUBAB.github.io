"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function GpuClusterLattice() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const goldLight = new THREE.PointLight(0xd4af37, 2.5, 20);
    goldLight.position.set(5, 5, 5);
    scene.add(goldLight);

    const maroonLight = new THREE.PointLight(0x8e1c30, 2.0, 20);
    maroonLight.position.set(-5, -5, -3);
    scene.add(maroonLight);

    const latticeGroup = new THREE.Group();
    scene.add(latticeGroup);

    const spacing = 1.4;
    const nodeCoords: { pos: THREE.Vector3; isMaster: boolean }[] = [];

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          nodeCoords.push({
            pos: new THREE.Vector3(x * spacing, y * spacing, z * spacing),
            isMaster: x === 0 && y === 0 && z === 0,
          });
        }
      }
    }

    const masterMat = new THREE.MeshStandardMaterial({
      color: 0xfff2a3,
      emissive: 0xd4af37,
      emissiveIntensity: 0.9,
      roughness: 0.2,
      metalness: 0.8,
    });
    const workerMat = new THREE.MeshStandardMaterial({
      color: 0xc9a227,
      emissive: 0x6e1423,
      emissiveIntensity: 0.4,
      roughness: 0.3,
      metalness: 0.7,
    });

    nodeCoords.forEach((node) => {
      const geo = new THREE.BoxGeometry(
        node.isMaster ? 0.38 : 0.22,
        node.isMaster ? 0.38 : 0.22,
        node.isMaster ? 0.38 : 0.22
      );
      const mesh = new THREE.Mesh(geo, node.isMaster ? masterMat : workerMat);
      mesh.position.copy(node.pos);
      latticeGroup.add(mesh);
    });

    const linePoints: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCoords.length; i++) {
      for (let j = i + 1; j < nodeCoords.length; j++) {
        const p1 = nodeCoords[i].pos;
        const p2 = nodeCoords[j].pos;
        if (Math.abs(p1.distanceTo(p2) - spacing) < 0.05) {
          linePoints.push(p1, p2);
        }
      }
    }

    const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x6e1423,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    latticeGroup.add(lines);

    const packetCount = 6;
    const packets: { mesh: THREE.Mesh; start: THREE.Vector3; end: THREE.Vector3; progress: number; speed: number }[] = [];
    const packetGeo = new THREE.SphereGeometry(0.06, 6, 6);
    const packetMat = new THREE.MeshBasicMaterial({ color: 0xfff2a3 });

    for (let i = 0; i < packetCount; i++) {
      const pMesh = new THREE.Mesh(packetGeo, packetMat);
      const randIdx1 = Math.floor(Math.random() * nodeCoords.length);
      let randIdx2 = (randIdx1 + 1) % nodeCoords.length;
      latticeGroup.add(pMesh);
      packets.push({
        mesh: pMesh,
        start: nodeCoords[randIdx1].pos,
        end: nodeCoords[randIdx2].pos,
        progress: Math.random(),
        speed: 0.008 + Math.random() * 0.015,
      });
    }

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (isVisible) {
        latticeGroup.rotation.y += 0.006;
        latticeGroup.rotation.x = Math.sin(Date.now() * 0.001) * 0.15;

        packets.forEach((p) => {
          p.progress += p.speed;
          if (p.progress >= 1) {
            p.progress = 0;
            const randIdx1 = Math.floor(Math.random() * nodeCoords.length);
            const randIdx2 = (randIdx1 + 1 + Math.floor(Math.random() * 5)) % nodeCoords.length;
            p.start = nodeCoords[randIdx1].pos;
            p.end = nodeCoords[randIdx2].pos;
          }
          p.mesh.position.lerpVectors(p.start, p.end, p.progress);
        });

        renderer.render(scene, camera);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      packetGeo.dispose();
      packetMat.dispose();
      masterMat.dispose();
      workerMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[280px] sm:h-[380px] rounded-3xl bg-gradient-to-b from-[#151316]/90 via-[#0B0A0C]/90 to-[#151316]/90 border border-[#D4AF37]/30 overflow-hidden relative shadow-2xl"
    >
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono text-[#A69C93] bg-[#0B0A0C]/85 px-4 py-2 rounded-xl border border-white/10 backdrop-blur-md pointer-events-none z-10">
        <span className="flex items-center gap-2 text-[#E5BE38]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-pulse" />
          DIU High-Performance Distributed GPU Infrastructure
        </span>
        <span className="hidden sm:inline text-[#A69C93]">Topology: Elastic Slurm/K8s Cluster</span>
      </div>
    </div>
  );
}
