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

const MAX_PARTICLES = 400;
const SPAWN_PER_FRAME_MIN = 1;
const SPAWN_PER_FRAME_MAX = 3;
const TRAIL_FADE = "rgba(15, 15, 15, 0.018)";
const MIN_SPEED = 0.25;
const MAX_SPEED = 1.1;
const WANDER_STRENGTH = 0.06;
const DAMPING = 0.988;
const LINE_ALPHA = 0.65;
const MIN_VELOCITY = 0.15;

type Particle = {
  x: number;
  y: number;
  px: number;
  py: number;
  vx: number;
  vy: number;
  color: string;
};

function randomPaletteColor(): string {
  return PALETTE[Math.floor(Math.random() * PALETTE.length)];
}

function spawnParticle(cx: number, cy: number): Particle {
  const angle = Math.random() * Math.PI * 2;
  const speed = MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED);
  return {
    x: cx,
    y: cy,
    px: cx,
    py: cy,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    color: randomPaletteColor(),
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
    const angle = Math.random() * Math.PI * 2;
    const boost = MIN_SPEED + Math.random() * 0.4;
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
    ctx.strokeStyle = p.color;
    ctx.globalAlpha = 0.35;
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

        ctx.strokeStyle = p.color;
        ctx.globalAlpha = LINE_ALPHA;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.px, p.py);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
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
