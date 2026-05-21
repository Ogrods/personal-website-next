"use client";

import { useEffect, useRef } from "react";

const PALETTE = [
  { head: "#ffffff", trail: "#6a6a6a" },
  { head: "#ff3b8e", trail: "#7a1d47" },
  { head: "#7a3bff", trail: "#3a1d7a" },
  { head: "#3b8eff", trail: "#1d477a" },
  { head: "#3bffd7", trail: "#1d7a6a" },
  { head: "#3bff5a", trail: "#1d7a2d" },
  { head: "#ffd23b", trail: "#7a661d" },
  { head: "#ff7a3b", trail: "#7a3a1d" },
  { head: "#ff3b3b", trail: "#7a1d1d" },
] as const;

const MAX_PARTICLES = 400;
const SPAWN_PER_FRAME_MIN = 1;
const SPAWN_PER_FRAME_MAX = 3;
const TRAIL_FADE = "rgba(15, 15, 15, 0.012)";
const MIN_SPEED = 0.85;
const MAX_SPEED = 2.0;
const WANDER_STRENGTH = 0.035;
const DAMPING = 0.994;
const TRAIL_ALPHA = 0.55;
const HEAD_ALPHA = 0.95;
const HEAD_SIZE = 1.6;
const MIN_VELOCITY = 0.45;

type Particle = {
  x: number;
  y: number;
  px: number;
  py: number;
  vx: number;
  vy: number;
  headColor: string;
  trailColor: string;
};

function randomPaletteEntry(): (typeof PALETTE)[number] {
  return PALETTE[Math.floor(Math.random() * PALETTE.length)];
}

function spawnParticle(cx: number, cy: number): Particle {
  const angle = Math.random() * Math.PI * 2;
  const speed = MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED);
  const color = randomPaletteEntry();
  return {
    x: cx,
    y: cy,
    px: cx,
    py: cy,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    headColor: color.head,
    trailColor: color.trail,
  };
}

function wrapPosition(value: number, max: number): number {
  if (value < 0) return max + (value % max);
  if (value >= max) return value % max;
  return value;
}

function keepMoving(p: Particle) {
  const speed = Math.hypot(p.vx, p.vy);
  if (speed < MIN_VELOCITY) {
    const angle = Math.atan2(p.vy, p.vx);
    const boost = MIN_SPEED + Math.random() * 0.3;
    p.vx = Math.cos(angle) * boost;
    p.vy = Math.sin(angle) * boost;
  }
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
    const steps = 80 + Math.floor(Math.random() * 120);
    ctx.strokeStyle = p.trailColor;
    ctx.globalAlpha = 0.4;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    for (let s = 0; s < steps; s++) {
      p.vx += (Math.random() - 0.5) * WANDER_STRENGTH;
      p.vy += (Math.random() - 0.5) * WANDER_STRENGTH;
      p.vx *= DAMPING;
      p.vy *= DAMPING;
      keepMoving(p);
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

      ctx.lineWidth = 1;
      for (const p of particles) {
        p.px = p.x;
        p.py = p.y;

        p.vx += (Math.random() - 0.5) * WANDER_STRENGTH;
        p.vy += (Math.random() - 0.5) * WANDER_STRENGTH;
        p.vx *= DAMPING;
        p.vy *= DAMPING;
        keepMoving(p);

        p.x += p.vx;
        p.y += p.vy;

        const wrappedX = wrapPosition(p.x, width);
        const wrappedY = wrapPosition(p.y, height);
        const didWrap = wrappedX !== p.x || wrappedY !== p.y;
        p.x = wrappedX;
        p.y = wrappedY;
        if (didWrap) {
          p.px = p.x;
          p.py = p.y;
        }

        ctx.strokeStyle = p.trailColor;
        ctx.globalAlpha = TRAIL_ALPHA;
        ctx.beginPath();
        ctx.moveTo(p.px, p.py);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }

      ctx.globalAlpha = HEAD_ALPHA;
      for (const p of particles) {
        ctx.fillStyle = p.headColor;
        ctx.fillRect(
          p.x - HEAD_SIZE / 2,
          p.y - HEAD_SIZE / 2,
          HEAD_SIZE,
          HEAD_SIZE
        );
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
