import type { ResumeContent } from "@/types";

export const resumeContent: ResumeContent = {
  skillGroups: [
    {
      label: "CMS, E-commerce & Front-end",
      items: [
        "WordPress",
        "Gutenberg",
        "ACF",
        "WooCommerce",
        "Shopify",
        "Liquid",
        "React",
        "TypeScript",
        "JavaScript",
        "Sass",
        "Tailwind CSS",
        "Web Workers",
        "virtualized rendering",
      ],
    },
    {
      label: "Performance, SEO & Accessibility",
      items: [
        "Core Web Vitals",
        "Lighthouse",
        "WCAG 2.1",
        "Schema.org / JSON-LD",
        "GA4",
        "Search Console",
        "SEMrush",
        "Ahrefs",
      ],
    },
    {
      label: "Back-end, DevOps & Workflow",
      items: [
        "PHP",
        "Python",
        "Node.js",
        "REST APIs",
        "Git",
        "Docker",
        "AWS",
        "Vitest",
        "pytest",
        "axe-core",
        "WP Engine",
        "Figma",
        "Jira",
      ],
    },
  ],
  education: [
    {
      school: "California Institute of the Arts",
      degree: "MFA, Music",
      graduated: "2013",
    },
    {
      school: "University of Hartford",
      degree: "BM, Music",
      graduated: "2009",
    },
  ],
  work: [
    {
      company: "BAKLOG (baklog.app)",
      title: "Founder & Full-Stack Engineer",
      years: "2026 – present",
      description:
        "Founded and solo-built BAKLOG, a local-first desktop app unifying game libraries across 20 storefronts; own product, engineering, and go-to-market. Engineered a 25-source sync orchestrator with per-source freshness tracking, cross-store dedupe, and ownership-aware deal alerts. Hardened for production with atomic writes, fetch drift guard, encrypted credentials (AES-256-GCM + OS keyring), and zero telemetry. Stood up CI with 480 automated tests and an axe-core accessibility gate; full case study at danogrodnik.com/#baklog.",
      highlights: [],
    },
    {
      company: "Rhumbline AI",
      title: "Freelance Front-end Developer",
      years: "2025 – present",
      description:
        "Led WordPress front-end build for FIRST - Foundation for Ichthyosis & Related Skin Types (firstskinfoundation.org), a global rare-disease nonprofit ($2.2M research funding, 1,600+ patient registry); built on Gutenberg + GenerateBlocks with events, physician finder, and donation flows shipped with Schema.org markup and WCAG 2.1 AA accessibility. Additional WordPress and Shopify front-end work with React used on Shopify interactive UI; customized themes against design specs and shipped performance-, accessibility-, and conversion-tuned releases.",
      highlights: [],
    },
    {
      company: "Fervor Creative",
      title: "Front-end Developer",
      years: "April 2022 – October 2024",
      description:
        "Shipped 50+ production WordPress and Shopify sites in 30 months for nonprofit, education, and multifamily real estate clients including ASU, Starbucks, The Piper Trust, and 100+ Greystar Real Estate properties. Owned post-launch support across a 150+ site agency portfolio; triaged plugin conflicts, hosting incidents, and accessibility regressions under same-day response expectations. Engineered custom themes in PHP, JavaScript (ES6+), and Liquid; lifted Lighthouse Performance, SEO, and Accessibility scores by 30–50 points per site via Core Web Vitals tuning, Schema.org / JSON-LD, and WCAG remediation.",
      highlights: [],
    },
    {
      company: "Freelance / Contract",
      title: "Front-end Developer (Straight Up Digital, ANova Digital)",
      years: "August 2020 – present",
      description:
        "End-to-end WordPress and Shopify development for small-to-mid-market clients; convert design mockups into production Liquid and PHP / Sass themes; integrate REST APIs for payments, shipping, and marketing automation; optimize page speed, mobile usability, and accessibility post-launch.",
      highlights: [],
    },
  ],
};
