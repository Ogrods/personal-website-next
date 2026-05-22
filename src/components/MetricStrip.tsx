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

// Lighthouse scores measured on this site. Update when the production
// numbers change (run Lighthouse on https://danogrodnik.com and edit below).
const METRICS: MetricDef[] = [
  {
    id: "performance",
    label: "Performance",
    target: 98,
    format: (n) => `${n}`,
  },
  {
    id: "accessibility",
    label: "Accessibility",
    target: 95,
    format: (n) => `${n}`,
  },
  {
    id: "best-practices",
    label: "Best Practices",
    target: 100,
    format: (n) => `${n}`,
  },
  {
    id: "seo",
    label: "SEO",
    target: 100,
    format: (n) => `${n}`,
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
      aria-label="Lighthouse scores on this site"
      className="border-y border-white/10 bg-[#0f0f0f] py-10 text-center"
    >
      <div className="container-site">
        <p className="mb-6 font-serif text-xs uppercase tracking-[0.28em] text-[#9aa5b0]">
          Lighthouse on this site
        </p>
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
        <p className="mt-6 font-serif text-xs text-[#6e7881]">
          Mobile, incognito, May 2026.{" "}
          <a
            href="https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fdanogrodnik.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-[#9aa5b0]"
          >
            Re-run on PageSpeed Insights
          </a>
        </p>
      </div>
    </Reveal>
  );
}

