"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/Reveal";
import { useInView } from "@/lib/useInView";

type MetricDef = {
  id: string;
  label: string;
  static?: string;
  target?: number;
  format?: (n: number) => string;
};

const METRICS: MetricDef[] = [
  { id: "launches", label: "production launches", target: 50, format: (n) => `${n}+` },
  {
    id: "greystar",
    label: "Greystar properties on a shared theme",
    target: 100,
    format: (n) => `${n}+`,
  },
  {
    id: "lighthouse",
    label: "avg. Lighthouse Performance / SEO / A11y lift",
    static: "30–50pt",
  },
  {
    id: "years",
    label: "shipping WordPress & Shopify in production",
    target: 5,
    format: (n) => `${n}+ yrs`,
  },
];

function AnimatedMetric({
  metric,
  delayMs,
}: {
  metric: MetricDef;
  delayMs: number;
}) {
  const { ref, inView } = useInView<HTMLParagraphElement>({ threshold: 0.35 });
  const target = metric.target ?? 0;
  const [value, setValue] = useState(metric.static ?? "0");

  useEffect(() => {
    if (metric.static || !inView) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setValue(metric.format!(target));
      return;
    }

    const duration = 1400;
    const startAt = performance.now();

    const frame = (now: number) => {
      const t = Math.min(1, (now - startAt) / duration);
      const eased = 1 - (1 - t) ** 3;
      setValue(metric.format!(Math.round(eased * target)));
      if (t < 1) requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
  }, [inView, metric, target]);

  return (
    <p
      ref={ref}
      className="font-serif text-[clamp(2rem,5vw,2.75rem)] font-semibold leading-none text-white"
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {metric.static ?? value}
    </p>
  );
}

export default function MetricStrip() {
  return (
    <Reveal
      as="section"
      aria-label="Career highlights"
      className="border-y border-white/10 bg-[#0f0f0f] py-10 text-center"
    >
      <div className="container-site">
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((m, i) => (
            <Reveal as="li" key={m.id} delayMs={i * 100}>
              <AnimatedMetric metric={m} delayMs={i * 100} />
              <p className="mt-2 font-serif text-sm leading-snug text-[#9aa5b0]">
                {m.label}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

