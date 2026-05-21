"use client";

import { useEffect, useRef } from "react";

const PALETTE = [
  "#ffffff",
  "#ff3b8e",
  "#7a3bff",
  "#3b8eff",
  "#3bffd7",
  "#3bff5a",
  "#ffd23b",
  "#ff7a3b",
  "#ff3b3b",
] as const;

const MAX_PARTICLES = 250;
const SPAWN_PER_FRAME_MIN = 3;
const SPAWN_PER_FRAME_MAX = 6;
const TRAIL_FADE = "rgba(15, 15, 15, 0.04)";

type Particle = {
  x: number;
  y: number;
  px: number;
  py: number;
  vx: number;
  vy: number;
  color: string;
  life: number;
  maxLife: number;
};

function randomPaletteColor(): string {
  return PALETTE[Math.floor(Math.random() * PALETTE.length)];
}

function spawnParticle(cx: number, cy: number): Particle {
  const angle = Math.random() * Math.PI * 2;
  const speed = 1 + Math.random() * 2.5;
  const maxLife = 80 + Math.floor(Math.random() * 120);
  return {
    x: cx,
    y: cy,
    px: cx,
    py: cy,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    color: randomPaletteColor(),
    life: maxLife,
    maxLife,
  };
}

function drawStaticBurst(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  const cx = width / 2;
  const cy = height / 2;
  ctx.fillStyle = "#0f0f0f";
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < 120; i++) {
    const p = spawnParticle(cx, cy);
    const steps = 40 + Math.floor(Math.random() * 60);
    ctx.strokeStyle = p.color;
    ctx.globalAlpha = 0.35;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    for (let s = 0; s < steps; s++) {
      p.px = p.x;
      p.py = p.y;
      p.x += p.vx;
      p.y += p.vy;
      ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(container);

    const cx = () => width / 2;
    const cy = () => height / 2;

    const spawnBatch = () => {
      const particles = particlesRef.current;
      const count =
        SPAWN_PER_FRAME_MIN +
        Math.floor(
          Math.random() * (SPAWN_PER_FRAME_MAX - SPAWN_PER_FRAME_MIN + 1)
        );
      for (let i = 0; i < count && particles.length < MAX_PARTICLES; i++) {
        particles.push(spawnParticle(cx(), cy()));
      }
    };

    const tick = () => {
      if (document.visibilityState !== "visible") {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      ctx.fillStyle = TRAIL_FADE;
      ctx.fillRect(0, 0, width, height);

      const particles = particlesRef.current;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.px = p.x;
        p.py = p.y;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;

        const alpha = Math.max(0, p.life / p.maxLife);
        ctx.strokeStyle = p.color;
        ctx.globalAlpha = alpha * 0.85;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.px, p.py);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();

        const offScreen =
          p.x < -20 ||
          p.x > width + 20 ||
          p.y < -20 ||
          p.y > height + 20;
        if (p.life <= 0 || offScreen) {
          particles.splice(i, 1);
        }
      }

      ctx.globalAlpha = 1;
      spawnBatch();
      rafRef.current = requestAnimationFrame(tick);
    };

    if (reducedMotion) {
      drawStaticBurst(ctx, width, height);
    } else {
      ctx.fillStyle = "#0f0f0f";
      ctx.fillRect(0, 0, width, height);
      spawnBatch();
      rafRef.current = requestAnimationFrame(tick);
    }

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
      particlesRef.current = [];
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden bg-[#0f0f0f]"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
