"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { ShieldCheck, Cpu, Activity, Scan, RefreshCw } from "lucide-react";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
}

export function HeroParticleAvatar() {
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<"photo" | "particles">("photo");
  const [isScanning, setIsScanning] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const isVisibleRef = useRef(true);

  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number; isInside: boolean }>({ x: 0, y: 0, isInside: false });

  // 1. Intersection Observer: Stop loop when off-screen to guarantee 0 scroll lag
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  // 2. High-fidelity Point Sampling
  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = "/assets/photos/headshot_photo.jpg";

    img.onload = () => {
      const sampleCanvas = document.createElement("canvas");
      const sampleCtx = sampleCanvas.getContext("2d");
      if (!sampleCtx) return;

      const w = 120;
      const h = 155;
      sampleCanvas.width = w;
      sampleCanvas.height = h;
      sampleCtx.drawImage(img, 0, 0, w, h);

      const imgData = sampleCtx.getImageData(0, 0, w, h).data;
      const pts: Particle[] = [];

      // Step of 3.2 generates ~1,400 sharp, high-density feature points
      for (let y = 0; y < h; y += 3.2) {
        for (let x = 0; x < w; x += 3.2) {
          const idx = (Math.floor(y) * w + Math.floor(x)) * 4;
          const r = imgData[idx];
          const g = imgData[idx + 1];
          const b = imgData[idx + 2];
          const a = imgData[idx + 3];

          const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

          if (a > 30 && luminance > 0.08) {
            const targetX = (x / w) * 320 + 15;
            const targetY = (y / h) * 420 + 10;

            const color =
              luminance > 0.65
                ? "#FFF2A3"
                : luminance > 0.4
                ? "#D4AF37"
                : luminance > 0.2
                ? "#8E1C30"
                : "#4A0E18";

            pts.push({
              x: targetX + (Math.random() - 0.5) * 40,
              y: targetY + (Math.random() - 0.5) * 40,
              originX: targetX,
              originY: targetY,
              vx: 0,
              vy: 0,
              color: color,
              size: luminance > 0.5 ? 2.0 : 1.5,
              alpha: 0.4 + luminance * 0.6,
            });
          }
        }
      }

      particlesRef.current = pts;
    };
  }, []);

  // 3. Ultra-Optimized Particle Render Loop (Batch draw calls + Composite Glow)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 1.5);
    canvas.width = 350 * dpr;
    canvas.height = 450 * dpr;
    ctx.scale(dpr, dpr);

    let tick = 0;

    const render = () => {
      if (mode === "particles" && isVisibleRef.current) {
        ctx.clearRect(0, 0, 350, 450);
        tick += 0.03;
        const mouse = mouseRef.current;

        // Group points by color to batch canvas calls (4 fill calls instead of 1,400)
        const groups: Record<string, Particle[]> = {
          "#FFF2A3": [],
          "#D4AF37": [],
          "#8E1C30": [],
          "#4A0E18": [],
        };

        const pts = particlesRef.current;
        const len = pts.length;

        for (let i = 0; i < len; i++) {
          const p = pts[i];
          const wave = Math.sin(tick + p.originY * 0.05) * 1.2;

          let targetX = p.originX + wave;
          let targetY = p.originY;

          if (mouse.isInside) {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < 3600) {
              const dist = Math.sqrt(distSq);
              const force = (60 - dist) / 60;
              targetX -= (dx / dist) * force * 30;
              targetY -= (dy / dist) * force * 30;
            }
          }

          // Physics integration
          p.vx = (p.vx + (targetX - p.x) * 0.14) * 0.78;
          p.vy = (p.vy + (targetY - p.y) * 0.14) * 0.78;

          p.x += p.vx;
          p.y += p.vy;

          if (groups[p.color]) {
            groups[p.color].push(p);
          } else {
            groups["#D4AF37"].push(p);
          }
        }

        // Fast Batched Rendering with Additive Glow (0 lag)
        ctx.globalCompositeOperation = "lighter";

        for (const [color, group] of Object.entries(groups)) {
          if (group.length === 0) continue;
          ctx.fillStyle = color;
          ctx.beginPath();
          for (let j = 0; j < group.length; j++) {
            const p = group[j];
            ctx.moveTo(p.x + p.size, p.y);
            ctx.arc(p.x, p.y, p.size, 0, 6.2831853);
          }
          ctx.fill();
        }

        ctx.globalCompositeOperation = "source-over";
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [mode]);

  // Toggle Mode Function with Laser Scan Effect
  const toggleMode = () => {
    setIsScanning(true);
    setTimeout(() => {
      setMode((prev) => (prev === "photo" ? "particles" : "photo"));
      setTimeout(() => {
        setIsScanning(false);
      }, 350);
    }, 200);
  };

  // 3D Perspective Tilt Tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseRef.current = { x, y, isInside: true };

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -8;
    const rY = ((x - centerX) / centerX) * 8;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    mouseRef.current.isInside = false;
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <div
      className="relative w-full max-w-[480px] h-[490px] sm:h-[640px] flex flex-col items-center justify-center select-none px-2"
      style={{ perspective: "1200px" }}
    >
      {/* Radiant Background Atmospheric Glow */}
      <div className="absolute w-64 sm:w-72 h-80 sm:h-88 bg-gradient-to-tr from-[#6E1423]/35 via-[#D4AF37]/25 to-transparent rounded-full blur-[90px] pointer-events-none" />

      {/* 3D Tilting Card Container */}
      <div
        ref={cardRef}
        onClick={toggleMode}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative w-[280px] min-[380px]:w-[310px] sm:w-[350px] h-[375px] sm:h-[460px] rounded-3xl transition-transform duration-150 ease-out cursor-pointer group z-10 will-change-transform"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
        }}
        title="Click to transform between Crisp Portrait and 3D Evidential Point Cloud"
      >
        {/* Outer Radiant Gold Border */}
        <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-b from-[#D4AF37] via-[#6E1423] to-[#D4AF37]/60 shadow-[0_0_45px_rgba(212,175,55,0.3)]">
          {/* Inner Card Screen */}
          <div className="relative w-full h-full rounded-[22px] bg-[#0E0C10] overflow-hidden">
            {/* Mode 1: Crisp Photo Portrait */}
            <div
              className={`absolute inset-0 transition-opacity duration-500 ${
                mode === "photo" ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              <Image
                src="/assets/photos/headshot_photo.jpg"
                alt="Abdullah Rubab"
                fill
                sizes="(max-width: 640px) 280px, 350px"
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A0C] via-transparent to-black/15" />
            </div>

            {/* Mode 2: Interactive 3D Particle Point Cloud */}
            <div
              className={`absolute inset-0 transition-opacity duration-500 bg-[#08070A] ${
                mode === "particles" ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{ width: "350px", height: "450px" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A0C]/90 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Laser Scan Line Sweep Effect */}
            {isScanning && (
              <div className="absolute inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#FFF2A3] to-transparent shadow-[0_0_20px_#D4AF37] animate-laserScan z-30" />
            )}

            {/* Holographic Specular Shine on Hover */}
            <div
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-300 pointer-events-none"
              style={{ opacity: isHovered ? 1 : 0 }}
            />

            {/* Bottom Card Header & Live Mode Switcher */}
            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-[#0B0A0C]/90 backdrop-blur-md border border-[#D4AF37]/50 shadow-2xl flex items-center justify-between z-20">
              <div>
                <h3 className="text-sm font-serif font-bold text-[#EDE7DD]">
                  Abdullah Rubab
                </h3>
                <p className="text-[10px] font-mono text-[#D4AF37] flex items-center gap-1.5">
                  <span>{mode === "photo" ? "📸 Crisp Portrait" : "✨ 3D Evidential Point Cloud"}</span>
                </p>
              </div>

              <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-[10px] font-mono text-[#E5BE38] group-hover:border-[#D4AF37] transition-colors">
                <RefreshCw className="w-3 h-3 animate-spin-slow text-[#D4AF37]" />
                <span>Click to Morph</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Telemetry Badge 1 (Top Right) */}
        <div
          className="absolute -top-3 -right-6 px-3 py-1.5 rounded-xl bg-[#0B0A0C]/95 border border-[#D4AF37]/60 backdrop-blur-md text-xs font-mono text-[#EDE7DD] shadow-2xl flex items-center gap-2 pointer-events-none hidden sm:flex"
          style={{ transform: "translateZ(35px)" }}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Dirichlet Uncertainty Head</span>
        </div>

        {/* Floating Telemetry Badge 2 (Bottom Left) */}
        <div
          className="absolute -bottom-4 -left-6 px-3 py-1.5 rounded-xl bg-[#0B0A0C]/95 border border-[#6E1423]/80 backdrop-blur-md text-xs font-mono text-[#EDE7DD] shadow-2xl flex items-center gap-2 pointer-events-none hidden sm:flex"
          style={{ transform: "translateZ(45px)" }}
        >
          <Activity className="w-3.5 h-3.5 text-[#E5BE38]" />
          <span>Triage: <strong className="text-[#E5BE38]">98.33% @ 70%</strong></span>
        </div>

        {/* Floating Telemetry Badge 3 (Middle Left) */}
        <div
          className="absolute top-1/3 -left-10 px-3 py-1 rounded-xl bg-[#0B0A0C]/95 border border-white/10 backdrop-blur-md text-[11px] font-mono text-[#A69C93] shadow-2xl flex items-center gap-1.5 pointer-events-none hidden sm:flex"
          style={{ transform: "translateZ(25px)" }}
        >
          <Cpu className="w-3 h-3 text-[#D4AF37]" />
          <span>MobileNetV3 Distilled</span>
        </div>
      </div>

      {/* Helper Prompt below Card */}
      <div className="mt-4 flex items-center gap-2 text-xs font-mono text-[#A69C93] bg-[#151316] px-4 py-1.5 rounded-full border border-white/10 shadow-lg">
        <Scan className="w-3.5 h-3.5 text-[#D4AF37]" />
        <span>Click card to switch between <strong className="text-[#EDE7DD]">High-Res Photo</strong> & <strong className="text-[#E5BE38]">3D Point Cloud</strong></span>
      </div>
    </div>
  );
}
