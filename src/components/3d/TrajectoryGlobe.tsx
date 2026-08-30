"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { trajectoryTargets } from "@/content/portfolioData";
import { TrajectoryTarget } from "@/content/types";

interface TrajectoryGlobeProps {
  onSelectTarget: (target: TrajectoryTarget) => void;
}

export function TrajectoryGlobe({ onSelectTarget }: TrajectoryGlobeProps) {
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
    camera.position.set(0, 1.2, 5.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const goldLight = new THREE.PointLight(0xd4af37, 2.5, 20);
    goldLight.position.set(5, 5, 5);
    scene.add(goldLight);

    const maroonLight = new THREE.PointLight(0x8e1c30, 1.8, 20);
    maroonLight.position.set(-5, -5, -3);
    scene.add(maroonLight);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const radius = 2.0;

    // 1. Base Dark Sphere
    const sphereGeo = new THREE.SphereGeometry(radius, 32, 32);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x0f0d12,
      roughness: 0.7,
      metalness: 0.5,
    });
    const globeMesh = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(globeMesh);

    // 2. Wireframe Grid
    const wireGeo = new THREE.IcosahedronGeometry(radius + 0.02, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x6e1423,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    globeGroup.add(wireMesh);

    const latLngToVector3 = (lat: number, lng: number, r: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      const x = -(r * Math.sin(phi) * Math.cos(theta));
      const z = r * Math.sin(phi) * Math.sin(theta);
      const y = r * Math.cos(phi);
      return new THREE.Vector3(x, y, z);
    };

    // 3. Dhaka Pin
    const dhakaPos = latLngToVector3(23.8103, 90.4125, radius);
    const dhakaPinGeo = new THREE.SphereGeometry(0.07, 12, 12);
    const dhakaPinMat = new THREE.MeshStandardMaterial({
      color: 0xe5be38,
      emissive: 0xd4af37,
      emissiveIntensity: 0.8,
    });
    const dhakaPin = new THREE.Mesh(dhakaPinGeo, dhakaPinMat);
    dhakaPin.position.copy(dhakaPos);
    globeGroup.add(dhakaPin);

    // 4. Europe Pin (Destination)
    const europePos = latLngToVector3(48.8566, 2.3522, radius);
    const europePinGeo = new THREE.SphereGeometry(0.09, 12, 12);
    const europePinMat = new THREE.MeshStandardMaterial({
      color: 0xfff2a3,
      emissive: 0xd4af37,
      emissiveIntensity: 1.0,
    });
    const europePin = new THREE.Mesh(europePinGeo, europePinMat);
    europePin.position.copy(europePos);
    globeGroup.add(europePin);

    // 5. Flight Arc
    const midPoint = new THREE.Vector3().addVectors(dhakaPos, europePos).multiplyScalar(0.5);
    const dist = dhakaPos.distanceTo(europePos);
    const elevatedMid = midPoint.normalize().multiplyScalar(radius + dist * 0.45);

    const curve = new THREE.QuadraticBezierCurve3(dhakaPos, elevatedMid, europePos);
    const curvePoints = curve.getPoints(40);
    const curveGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
    const curveMat = new THREE.LineBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.9,
    });
    const arcLine = new THREE.Line(curveGeo, curveMat);
    globeGroup.add(arcLine);

    // 6. Pulsing Energy Packet
    const packetGeo = new THREE.SphereGeometry(0.05, 8, 8);
    const packetMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const packetMesh = new THREE.Mesh(packetGeo, packetMat);
    globeGroup.add(packetMesh);

    // 7. Ambient Particle Starfield
    const starCount = 200;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const goldColor = new THREE.Color(0xd4af37);
    const whiteColor = new THREE.Color(0xede7dd);

    for (let i = 0; i < starCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 3.0 + Math.random() * 2.0;

      starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPos[i * 3 + 2] = r * Math.cos(phi);

      const c = Math.random() > 0.4 ? goldColor : whiteColor;
      starColors[i * 3] = c.r;
      starColors[i * 3 + 1] = c.g;
      starColors[i * 3 + 2] = c.b;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(starColors, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // Mouse & Touch Drag Rotation Controls
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let rotSpeedX = 0;
    let rotSpeedY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      rotSpeedY = deltaX * 0.005;
      rotSpeedX = deltaY * 0.005;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;
      rotSpeedY = deltaX * 0.005;
      rotSpeedX = deltaY * 0.005;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    container.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

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
    const startTime = performance.now();

    const animate = (now: number) => {
      animId = requestAnimationFrame(animate);

      if (isVisible) {
        const elapsed = (now - startTime) / 1000;

        if (!isDragging) {
          globeGroup.rotation.y += 0.008;
        } else {
          globeGroup.rotation.y += rotSpeedY;
          globeGroup.rotation.x += rotSpeedX;
          rotSpeedX *= 0.95;
          rotSpeedY *= 0.95;
        }

        starField.rotation.y += 0.001;

        const t = (elapsed * 0.4) % 1;
        const currentPoint = curve.getPoint(t);
        packetMesh.position.copy(currentPoint);

        renderer.render(scene, camera);
      }
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      curveGeo.dispose();
      curveMat.dispose();
      starGeo.dispose();
      starMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[320px] sm:h-[480px] rounded-3xl bg-gradient-to-b from-[#151316]/95 via-[#0B0A0C]/95 to-[#151316]/95 border border-[#D4AF37]/40 overflow-hidden relative shadow-2xl cursor-grab active:cursor-grabbing"
    >
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#A69C93] bg-[#0B0A0C]/90 px-4 py-2 rounded-xl border border-white/10 backdrop-blur-md pointer-events-none z-10">
        <div className="flex items-center gap-2 text-[#E5BE38]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-ping" />
          <span>Trajectory Flight Arc: Dhaka (Origin) → Master&apos;s / PhD in Europe</span>
        </div>
        <span className="text-[#A69C93]">Swipe to rotate 3D Earth</span>
      </div>
    </div>
  );
}
