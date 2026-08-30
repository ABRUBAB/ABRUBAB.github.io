"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function MedicalBrainScene() {
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
    camera.position.set(0, 0, 6.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const goldLight = new THREE.PointLight(0xd4af37, 2.5, 20);
    goldLight.position.set(5, 5, 5);
    scene.add(goldLight);

    const rubyLight = new THREE.PointLight(0x8e1c30, 2.0, 20);
    rubyLight.position.set(-5, -5, -3);
    scene.add(rubyLight);

    const brainGroup = new THREE.Group();
    scene.add(brainGroup);

    // Construct Dual-Hemisphere 3D Neural Brain Point Cloud & Synaptic Network
    const nodePoints: THREE.Vector3[] = [];
    const nodeColors: number[] = [];
    const colorGold = new THREE.Color("#FFF2A3");
    const colorAmber = new THREE.Color("#D4AF37");
    const colorRuby = new THREE.Color("#8E1C30");
    const colorDeep = new THREE.Color("#6E1423");

    const totalNodes = 500;

    for (let i = 0; i < totalNodes; i++) {
      const hemisphere = i % 2 === 0 ? 1 : -1;
      const u = Math.random() * Math.PI;
      const v = Math.random() * Math.PI * 2;

      const xRad = 1.15;
      const yRad = 1.35;
      const zRad = 1.65;

      let x = Math.sin(u) * Math.cos(v) * xRad * 0.85;
      let y = Math.sin(u) * Math.sin(v) * yRad;
      let z = Math.cos(u) * zRad;

      x = x + hemisphere * 0.35;

      const fold = Math.sin(x * 5.0) * Math.cos(y * 5.0) * Math.sin(z * 4.0) * 0.12;
      x += fold;
      y += fold;
      z += fold;

      const pt = new THREE.Vector3(x, y, z);
      nodePoints.push(pt);

      const uncertainty = Math.random();
      const nodeColor = new THREE.Color();
      if (uncertainty > 0.75) {
        nodeColor.lerpColors(colorRuby, colorDeep, Math.random());
      } else if (uncertainty > 0.4) {
        nodeColor.lerpColors(colorAmber, colorRuby, Math.random());
      } else {
        nodeColor.lerpColors(colorGold, colorAmber, Math.random());
      }

      nodeColors.push(nodeColor.r, nodeColor.g, nodeColor.b);
    }

    const pointGeo = new THREE.BufferGeometry().setFromPoints(nodePoints);
    pointGeo.setAttribute("color", new THREE.Float32BufferAttribute(nodeColors, 3));

    const pointMat = new THREE.PointsMaterial({
      size: 0.065,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const brainCloud = new THREE.Points(pointGeo, pointMat);
    brainGroup.add(brainCloud);

    // Synaptic Axons
    const axonLines: THREE.Vector3[] = [];
    const maxConnectionDistance = 0.52;

    for (let i = 0; i < totalNodes; i += 2) {
      for (let j = i + 1; j < totalNodes; j += 3) {
        const d = nodePoints[i].distanceTo(nodePoints[j]);
        if (d < maxConnectionDistance) {
          axonLines.push(nodePoints[i], nodePoints[j]);
        }
      }
    }

    const axonGeo = new THREE.BufferGeometry().setFromPoints(axonLines);
    const axonMat = new THREE.LineBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
    });
    const axonMesh = new THREE.LineSegments(axonGeo, axonMat);
    brainGroup.add(axonMesh);

    // Orbiting MRI Scanning Plane Ring
    const scanRingGeo = new THREE.RingGeometry(2.1, 2.14, 48);
    const scanRingMat = new THREE.MeshBasicMaterial({
      color: 0x8e1c30,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6,
    });
    const scanRing = new THREE.Mesh(scanRingGeo, scanRingMat);
    scanRing.rotation.x = Math.PI / 2;
    brainGroup.add(scanRing);

    // Resize
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // Performance-Aware Animation Loop
    let animId: number;
    let clock = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (isVisible) {
        clock += 0.015;
        brainGroup.rotation.y += 0.007;
        brainGroup.rotation.x = Math.sin(clock * 0.5) * 0.12;
        scanRing.position.y = Math.sin(clock * 1.2) * 1.2;
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
      pointGeo.dispose();
      pointMat.dispose();
      axonGeo.dispose();
      axonMat.dispose();
      scanRingGeo.dispose();
      scanRingMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[320px] sm:h-[420px] rounded-3xl bg-gradient-to-b from-[#151316]/95 via-[#0B0A0C]/95 to-[#151316]/95 border border-[#D4AF37]/35 overflow-hidden relative shadow-2xl"
    >
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono text-[#A69C93] bg-[#0B0A0C]/90 px-4 py-2 rounded-xl border border-white/10 backdrop-blur-md pointer-events-none z-10">
        <span className="flex items-center gap-2 text-[#E5BE38]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-ping" />
          3D Evidential Neural Manifold • Dual-Hemisphere Synaptic Matrix
        </span>
        <span className="hidden sm:inline text-[#A69C93]">Gold: High Certainty • Maroon: Epistemic Triage</span>
      </div>
    </div>
  );
}
