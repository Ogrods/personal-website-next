"use client";

import { useMemo } from "react";

type Square = {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  color: "white" | "red";
  rotate: number;
};

function createSquares(count: number): Square[] {
  const out: Square[] = [];
  for (let i = 0; i < count; i += 1) {
    out.push({
      id: i,
      left: Math.random() * 100,
      size: 6 + Math.random() * 34,
      delay: Math.random() * 6,
      duration: 4 + Math.random() * 4,
      color: Math.random() > 0.5 ? "white" : "red",
      rotate: (Math.random() - 0.5) * 80,
    });
  }
  return out;
}

export default function ParticleBackground() {
  const squares = useMemo(() => createSquares(28), []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {squares.map((s) => (
        <span
          key={s.id}
          className="particle-square"
          style={{
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            backgroundColor: s.color === "white" ? "#ffffff" : "#ff0000",
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            transform: `rotate(${s.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}
