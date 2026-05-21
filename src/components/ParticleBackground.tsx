"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine, ISourceOptions } from "tsparticles-engine";

const particleOptions: ISourceOptions = {
  fullScreen: { enable: false },
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  particles: {
    number: { value: 0 },
    color: { value: ["#ffffff", "#ff0000"] },
    shape: { type: "square" },
    opacity: {
      value: { min: 0.1, max: 0.6 },
      animation: { enable: true, speed: 1, minimumValue: 0, sync: false },
    },
    size: {
      value: { min: 5, max: 40 },
    },
    move: {
      enable: true,
      speed: { min: 2, max: 3 },
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "destroy" },
      gravity: { enable: true, acceleration: 5 },
    },
    rotate: {
      value: { min: -40, max: 40 },
      direction: "random",
      animation: { enable: true, speed: 5 },
    },
    life: {
      count: 1,
      duration: { value: { min: 1.5, max: 3 } },
    },
  },
  emitters: {
    direction: "none",
    rate: { delay: 0.1, quantity: 5 },
    size: { width: 100, height: 0 },
    position: { x: 50, y: 50 },
    life: { count: 0, duration: 0.1, delay: 0.1 },
  },
  detectRetina: true,
};

export default function ParticleBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="hero-particles"
      init={particlesInit}
      options={particleOptions}
      className="absolute inset-0 h-full w-full"
    />
  );
}
