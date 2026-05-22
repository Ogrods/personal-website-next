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
        "Node.js",
        "REST APIs",
        "Git",
        "Docker",
        "AWS",
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
      company: "Rhumbline AI",
      title: "Freelance Front-end Developer",
      years: "2025 – present",
      description:
        "Conversion-focused WordPress and Shopify front-end work, with React for interactive UI. Current engagement: front-end build for FIRST - Foundation for Ichthyosis & Related Skin Types.",
      highlights: [
        "Led the WordPress front-end build for FIRST - Foundation for Ichthyosis & Related Skin Types (firstskinfoundation.org), a global rare-disease nonprofit ($2.2M research funding, 1,600+ patient registry)",
        "Shipped events, physician finder, and donation flows with Schema.org markup and WCAG 2.1 AA accessibility",
        "WordPress and Shopify theme work with React for interactive UI; performance- and accessibility-tuned releases",
      ],
    },
    {
      company: "Fervor Creative",
      title: "Front-end Developer",
      years: "April 2022 – October 2024",
      description:
        "Digital agency role shipping production WordPress and Shopify sites for nonprofit, education, and multifamily real estate clients.",
      highlights: [
        "Shipped 50+ production sites in 30 months; primary technical contact for a 150+ site portfolio",
        "Clients included ASU, Starbucks, Virginia G. Piper Charitable Trust, and 100+ Greystar properties",
        "Lifted Lighthouse Performance, SEO, and Accessibility scores by 30–50 points per site",
      ],
    },
    {
      company: "Freelance / Contract",
      title: "Front-end Developer (ANova Digital, Straight Up Digital)",
      years: "August 2020 – present",
      description:
        "End-to-end WordPress and Shopify development for small-to-mid-market clients on retained and project bases.",
      highlights: [
        "Custom Liquid (Shopify) and PHP / Sass (WordPress) themes from design mockups",
        "E-commerce and WooCommerce builds including Milton Sleep Co. storefront work",
        "Post-launch Core Web Vitals, mobile usability, and accessibility optimization",
      ],
    },
  ],
};
