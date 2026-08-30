"use client";

import { useEffect, useRef } from "react";

interface NeuronNode {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  glowColor: string;
  pulsePhase: number;
  pulseSpeed: number;
}

interface ActionPotential {
  fromNode: NeuronNode;
  toNode: NeuronNode;
  progress: number;
  speed: number;
}

export function NeuralNetBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse Tracking with smooth interpolation
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 180,
      isMoving: false,
    };

    let mouseTimeout: NodeJS.Timeout;
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isMoving = true;
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        mouse.isMoving = false;
      }, 2000);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Generate Adaptive Neurons based on screen size
    const nodeCount = Math.min(75, Math.floor((width * height) / 18000));
    const nodes: NeuronNode[] = [];
    const colors = [
      { fill: "#D4AF37", glow: "rgba(212, 175, 55, 0.4)" },
      { fill: "#E5BE38", glow: "rgba(229, 190, 56, 0.5)" },
      { fill: "#8E1C30", glow: "rgba(142, 28, 48, 0.4)" },
      { fill: "#6E1423", glow: "rgba(110, 20, 35, 0.3)" },
      { fill: "#EDE7DD", glow: "rgba(237, 231, 221, 0.3)" },
    ];

    for (let i = 0; i < nodeCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const c = colors[Math.floor(Math.random() * colors.length)];

      nodes.push({
        x,
        y,
        originX: x,
        originY: y,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: 1.5 + Math.random() * 2.2,
        color: c.fill,
        glowColor: c.glow,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
      });
    }

    // Action Potentials (synaptic pulses travelling between nodes)
    const pulses: ActionPotential[] = [];
    const maxConnectionDistance = 140;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Main 60 FPS Render Loop
    let animId: number;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse follow
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      // 1. Update Node Positions & Cursor Physics
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Organic autonomous drift
        node.x += node.vx;
        node.y += node.vy;

        // Bounce gently off screen boundaries
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Interactive Cursor Repulsion / Excitation
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          // Push away slightly while swirling
          node.x -= Math.cos(angle) * force * 3.5;
          node.y -= Math.sin(angle) * force * 3.5;
        }

        // Pulse phase
        node.pulsePhase += node.pulseSpeed;
      }

      // 2. Draw Synaptic Axon Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];

          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectionDistance) {
            const alpha = (1 - dist / maxConnectionDistance) * 0.22;

            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(212, 175, 55, ${alpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();

            // Randomly trigger action potential signal pulses
            if (Math.random() < 0.0006 && pulses.length < 12) {
              pulses.push({
                fromNode: n1,
                toNode: n2,
                progress: 0,
                speed: 0.015 + Math.random() * 0.02,
              });
            }
          }
        }

        // Draw dynamic connection from cursor to nearby neurons
        const dMouseX = mouse.x - nodes[i].x;
        const dMouseY = mouse.y - nodes[i].y;
        const dMouse = Math.sqrt(dMouseX * dMouseX + dMouseY * dMouseY);

        if (dMouse < mouse.radius) {
          const mouseAlpha = (1 - dMouse / mouse.radius) * 0.35;
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(nodes[i].x, nodes[i].y);
          ctx.strokeStyle = `rgba(229, 190, 56, ${mouseAlpha})`;
          ctx.lineWidth = 1.0;
          ctx.stroke();
        }
      }

      // 3. Render Action Potential Synaptic Pulses
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.progress += pulse.speed;

        if (pulse.progress >= 1) {
          pulses.splice(p, 1);
          continue;
        }

        const px = pulse.fromNode.x + (pulse.toNode.x - pulse.fromNode.x) * pulse.progress;
        const py = pulse.fromNode.y + (pulse.toNode.y - pulse.fromNode.y) * pulse.progress;

        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = "#FFF2A3";
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#D4AF37";
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 4. Render Neural Soma Nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const pulseScale = 1 + Math.sin(node.pulsePhase) * 0.25;
        const currentRadius = node.radius * pulseScale;

        // Outer glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = node.glowColor;
        ctx.fill();

        // Core nucleus
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      clearTimeout(mouseTimeout);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-65"
      style={{ background: "transparent" }}
    />
  );
}
