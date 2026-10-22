"use client";

import { useEffect, useRef } from "react";

/**
 * Fullscreen water — raw WebGL2, no engine.
 *  • layered caustics, domain-warped so they drift like light through a pool
 *  • the pointer drops expanding ripples that refract the light
 *  • intensity falls as you scroll past the hero so content stays readable
 *  • adaptive resolution / frame cap, paused when the tab is hidden
 *  • reduced-motion → one still frame; no WebGL2 → CSS gradient
 */

const VERT = `#version 300 es
in vec2 aPos;
void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }`;

const FRAG = `#version 300 es
precision highp float;
out vec4 outColor;

uniform vec2  uRes;       // render target, px
uniform float uTime;
uniform float uMotion;
uniform float uHero;
uniform vec2  uMouse;     // pointer pool (centred, height-normalised, y up)
uniform vec3  uRip[8];

float hash(vec2 p){
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1,0)), f.x),
             mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x), f.y);
}
float fbm(vec2 p){
  float a = 0.5, s = 0.0;
  for(int i = 0; i < 4; i++){ s += a * noise(p); p *= 2.02; a *= 0.5; }
  return s;
}

// tileable water caustics (after Dave Hoskins' classic)
float caustic(vec2 uv, float t){
  vec2 p = mod(uv * 6.28318530718, 6.28318530718) - 250.0;
  vec2 i = p;
  float c = 1.0;
  float inten = 0.005;
  for(int n = 0; n < 5; n++){
    float tt = t * (1.0 - (3.5 / float(n + 1)));
    i = p + vec2(cos(tt - i.x) + sin(tt + i.y), sin(tt - i.y) + cos(tt + i.x));
    c += 1.0 / length(vec2(p.x / (sin(i.x + tt) / inten), p.y / (cos(i.y + tt) / inten)));
  }
  c /= 5.0;
  c = 1.17 - pow(c, 1.4);
  return pow(abs(c), 8.0);
}
float causticMix(vec2 q, float t){
  float c1 = caustic(q * 1.45 + 0.3, t * 0.55);
  float c2 = caustic(q * 2.6 - 0.7, t * 0.8 + 20.0);
  return c1 * 0.8 + c2 * 0.5;
}

void main(){
  vec2 uv  = gl_FragCoord.xy / uRes;
  float asp = uRes.x / uRes.y;
  vec2 p   = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float t  = uTime * uMotion;

  // pointer ripples → refraction offset + bright rings
  vec2 off = vec2(0.0);
  float ring = 0.0;
  for(int i = 0; i < 8; i++){
    vec3 r = uRip[i];
    float age = uTime - r.z;
    if(r.z < 0.0 || age < 0.0 || age > 4.2) continue;
    vec2 d = p - r.xy;
    float dist = length(d);
    float w = dist - age * 0.34;
    float env = exp(-w * w * 260.0) * exp(-age * 0.95);
    float wv = sin(w * 58.0);
    off  += (d / (dist + 1e-4)) * wv * env * 0.034;
    ring += env * (0.45 + 0.55 * wv);
  }

  // domain warp so the light bends and breathes
  vec2 q = p + off;
  vec2 warp = vec2(fbm(q * 1.5 + vec2(0.0, t * 0.05)), fbm(q * 1.5 + vec2(5.2, -t * 0.04)));
  q += (warp - 0.5) * 0.15;

  float cs = causticMix(q, t);

  // light enters from the top-right surface
  vec2 ls = vec2(asp * 0.84, 1.08);
  float surface = smoothstep(1.55, 0.0, distance(uv * vec2(asp, 1.0), ls));
  float lit = 0.22 + 0.78 * surface;

  vec3 deep = vec3(0.010, 0.012, 0.032);
  vec3 teal = vec3(0.016, 0.044, 0.235);
  vec3 base = mix(deep, teal, pow(surface, 1.35) * 0.92);

  // ash haze, lower-left
  float haze = smoothstep(1.25, 0.0, distance(uv * vec2(asp, 1.0), vec2(0.0, 0.0)));
  base += vec3(0.064, 0.058, 0.052) * haze * 0.55;

  float lvl = mix(0.34, 1.0, uHero);
  vec3 ice = vec3(0.46, 0.60, 1.0);
  vec3 col = base + ice * cs * (0.10 + 0.56 * lit) * lvl;
  col += ice * max(ring, 0.0) * 0.32 * lvl;

  // soft pool of light under the pointer
  float md = distance(p, uMouse);
  col += ice * exp(-md * md * 8.0) * 0.07 * uMotion * lvl;

  // darken with scroll, vignette the edges
  col *= mix(0.74, 1.0, uHero);
  float vg = smoothstep(1.35, 0.35, length((uv - 0.5) * vec2(1.15, 1.0)) * 1.5);
  col *= 0.55 + 0.45 * vg;

  // dither to kill banding in the dark gradients
  col += (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) / 255.0;
  outColor = vec4(col, 1.0);
}`;

const TIERS = [0.62, 0.46, 0.34]; // render scale vs CSS pixels
const MAX_DPR = 1.25;
const RIPPLES = 8;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(sh) ?? "shader compile failed");
  }
  return sh;
}

export default function WaterCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const root = document.documentElement;
    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let teardown: (() => void) | null = null;
    let disposed = false;

    const start = () => {
      teardown?.();
      teardown = null;

      let enabled = true;
      try {
        enabled = localStorage.getItem("fx") !== "off";
      } catch {}
      if (!enabled) {
        canvas.style.opacity = "0";
        root.dataset.water = "off";
        return;
      }

      const gl = canvas.getContext("webgl2", {
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: "default",
      });
      if (!gl) {
        root.dataset.water = "off";
        return;
      }

      let program: WebGLProgram;
      try {
        program = gl.createProgram()!;
        gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
        gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG));
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error("link failed");
      } catch (err) {
        console.warn("[water] disabled:", err);
        root.dataset.water = "off";
        return;
      }
      root.dataset.water = "on";
      gl.useProgram(program);

      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(program, "aPos");
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

      const U = {
        res: gl.getUniformLocation(program, "uRes"),
        time: gl.getUniformLocation(program, "uTime"),
        motion: gl.getUniformLocation(program, "uMotion"),
        hero: gl.getUniformLocation(program, "uHero"),
        mouse: gl.getUniformLocation(program, "uMouse"),
        rip: gl.getUniformLocation(program, "uRip"),
      };

      const reduced = reduceMq.matches;
      const rip = new Float32Array(RIPPLES * 3);
      for (let i = 0; i < RIPPLES; i++) rip[i * 3 + 2] = -1;
      let ripIdx = 0;

      // The water lives behind the hero only. Everywhere else the page has its
      // own solid surfaces, so stop drawing (and hide the canvas) off-screen.
      let heroVisible = true;
      let last = performance.now();
      const topEl = document.getElementById("top");
      const io = topEl
        ? new IntersectionObserver(
            ([e]) => {
              heroVisible = e.isIntersecting;
              canvas.style.opacity = heroVisible && revealed ? "1" : "0";
              if (heroVisible) last = performance.now();
            },
            { threshold: 0 },
          )
        : null;
      if (topEl) io?.observe(topEl);

      let tier = 0;
      let cssW = 0;
      let cssH = 0;
      const resize = (force = false) => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        // ignore small height changes (mobile URL bar) to avoid reallocating
        if (!force && w === cssW && Math.abs(h - cssH) < 120) return;
        cssW = w;
        cssH = h;
        const scale = Math.min(window.devicePixelRatio || 1, MAX_DPR) * TIERS[tier];
        canvas.width = Math.max(2, Math.round(w * scale));
        canvas.height = Math.max(2, Math.round(h * scale));
        gl.viewport(0, 0, canvas.width, canvas.height);
        root.dataset.waterTier = String(tier);
      };
      resize(true);

      // pointer → ripples (coordinates match the shader: centred, height-normalised, y-up)
      const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
      let lastRip = { x: -9, y: -9, t: 0 };
      const toShader = (cx: number, cy: number) => ({
        x: (cx - cssW / 2) / cssH,
        y: 0.5 - cy / cssH,
      });
      const drop = (x: number, y: number, now: number) => {
        rip[ripIdx * 3] = x;
        rip[ripIdx * 3 + 1] = y;
        rip[ripIdx * 3 + 2] = now;
        ripIdx = (ripIdx + 1) % RIPPLES;
        lastRip = { x, y, t: now };
      };
      const t0 = performance.now();
      const clock = () => (performance.now() - t0) / 1000;

      const onMove = (e: PointerEvent) => {
        const s = toShader(e.clientX, e.clientY);
        mouse.tx = s.x;
        mouse.ty = s.y;
        const now = clock();
        const moved = Math.hypot(s.x - lastRip.x, s.y - lastRip.y);
        if (moved > 0.085 && now - lastRip.t > 0.11) drop(s.x, s.y, now);
      };
      const onDown = (e: PointerEvent) => {
        const s = toShader(e.clientX, e.clientY);
        mouse.tx = s.x;
        mouse.ty = s.y;
        drop(s.x, s.y, clock());
      };

      let heroTarget = 1;
      let hero = 1;
      const readScroll = () => {
        const y = window.scrollY;
        const k = Math.min(1, Math.max(0, y / (window.innerHeight * 0.85)));
        heroTarget = 1 - k * k * (3 - 2 * k);
      };

      // adaptive quality: watch rAF delta, step resolution down, then cap fps
      let frames = 0;
      let acc = 0;
      let capped = false;
      let raf = 0;
      let frozen = false;

      const draw = (time: number, motion: number) => {
        gl.uniform2f(U.res, canvas.width, canvas.height);
        gl.uniform1f(U.time, time);
        gl.uniform1f(U.motion, motion);
        gl.uniform1f(U.hero, hero);
        gl.uniform2f(U.mouse, mouse.x, mouse.y);
        gl.uniform3fv(U.rip, rip);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      };

      let revealed = false;
      const reveal = () => {
        revealed = true;
        canvas.style.opacity = heroVisible ? "1" : "0";
        // the slow first fade is for the intro; afterwards swap quickly on scroll
        canvas.style.transitionDuration = "450ms";
      };

      if (reduced) {
        // one still frame, redrawn only when the viewport or scroll changes
        const still = () => {
          readScroll();
          hero = heroTarget;
          draw(7.3, 0);
          reveal();
        };
        still();
        const onResize = () => {
          resize();
          still();
        };
        window.addEventListener("resize", onResize);
        window.addEventListener("scroll", still, { passive: true });
        teardown = () => {
          io?.disconnect();
          window.removeEventListener("resize", onResize);
          window.removeEventListener("scroll", still);
        };
        return;
      }

      const frame = (now: number) => {
        raf = requestAnimationFrame(frame);
        if (document.hidden || frozen || !heroVisible) return;
        const dt = now - last;
        if (capped && dt < 33) return;
        last = now;

        // adapt
        frames++;
        if (frames > 20) acc += dt;
        if (frames === 80) {
          const avg = acc / 60;
          acc = 0;
          frames = 20;
          if (avg > 40) {
            if (tier < TIERS.length - 1) {
              tier++;
              resize(true);
            } else if (!capped) {
              capped = true;
            } else {
              frozen = true; // too slow even at the floor — hold the last frame
            }
          }
        }

        readScroll();
        hero += (heroTarget - hero) * 0.08;
        mouse.x += (mouse.tx - mouse.x) * 0.08;
        mouse.y += (mouse.ty - mouse.y) * 0.08;
        draw(clock(), 1);
        if (frames === 2) reveal();
      };
      raf = requestAnimationFrame(frame);

      const onResize = () => resize();
      const onVis = () => {
        last = performance.now();
      };
      const onLost = (e: Event) => {
        e.preventDefault();
        cancelAnimationFrame(raf);
        root.dataset.water = "off";
      };
      const onRestored = () => {
        if (!disposed) start();
      };

      window.addEventListener("resize", onResize);
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerdown", onDown, { passive: true });
      document.addEventListener("visibilitychange", onVis);
      canvas.addEventListener("webglcontextlost", onLost);
      canvas.addEventListener("webglcontextrestored", onRestored);

      teardown = () => {
        io?.disconnect();
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerdown", onDown);
        document.removeEventListener("visibilitychange", onVis);
        canvas.removeEventListener("webglcontextlost", onLost);
        canvas.removeEventListener("webglcontextrestored", onRestored);
      };
    };

    start();

    // Command-palette switch: persist the choice and reload so every effect
    // (canvas, tilt, smooth scroll) re-initialises from a clean state.
    const onToggle = () => {
      try {
        const off = localStorage.getItem("fx") === "off";
        localStorage.setItem("fx", off ? "on" : "off");
      } catch {}
      location.reload();
    };
    window.addEventListener("fx:toggle", onToggle);
    reduceMq.addEventListener("change", start);

    return () => {
      disposed = true;
      window.removeEventListener("fx:toggle", onToggle);
      reduceMq.removeEventListener("change", start);
      teardown?.();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-0 transition-opacity duration-[1600ms] ease-out"
    />
  );
}
