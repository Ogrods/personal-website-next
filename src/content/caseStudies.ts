import type { CaseStudy } from "@/types";

export const caseStudies: Record<string, CaseStudy> = {
  first: {
    slug: "first",
    title: "FIRST - Foundation for Ichthyosis & Related Skin Types",
    eyebrow: "Case study",
    role: "Front-end build via Rhumbline AI · Feb – Apr 2026",
    liveUrl: "https://firstskinfoundation.org/",
    overview:
      "FIRST is a global rare-disease nonprofit supporting patients, caregivers, and clinicians. I led the WordPress front-end build using Gutenberg and GenerateBlocks for the editor surface, events, physician finder, and donation flows, while the site had to speak to two very different audiences without splitting into two separate properties.",
    metrics: [
      "$2.2M research funding",
      "1,600+ patient registry",
      "Global rare-disease nonprofit",
    ],
    challenge:
      "The same ichthyosis content must serve frightened patients and caregivers looking for plain-language guidance, and medical professionals who need clinical depth and references. A single nav and one visual system would force each audience to wade through the other's world. Accessibility was non-negotiable: many visitors have visual or skin-related conditions that intersect directly with WCAG requirements.",
    approach: [
      "Dual color-coded experiences in one WordPress site: a blue patients and caregivers side and a green medical professionals side. Headers, navigation, heroes, and sidebars recolor throughout so visitors always know which audience mode they are in.",
      "A persistent audience toggle in the masthead—Medical Professionals on the blue side, Patients and Caregivers on the green side—so users can cross over without losing context.",
      "WordPress front-end with Gutenberg + GenerateBlocks block library for events, physician finder, and donation flows. No page-builder, clean markup, plus Schema.org for search visibility.",
      "Built to WCAG 2.1 AA from day one, with contrast checks on both color systems so neither experience compromises legibility.",
    ],
    heroImage: {
      src: "first.webp",
      alt: "FIRST Foundation homepage",
    },
    dualAudience: {
      heading: "Same template, two audiences",
      body: "Both sides share the same page structure and content architecture. Color is the wayfinding system—blue for patients and caregivers, green for clinicians—applied consistently from the header through the sidebar.",
      caption: "Same page, two audiences. Color signals where you are.",
      images: [
        {
          src: "first-blue.webp",
          alt: "FIRST site in patients and caregivers mode with blue header and Medical Professionals toggle",
        },
        {
          src: "first-green.webp",
          alt: "FIRST site in medical professionals mode with green header and Patients and Caregivers toggle",
        },
      ],
    },
    stack: [
      "WordPress",
      "Gutenberg",
      "GenerateBlocks",
      "PHP",
      "Schema.org",
      "WCAG 2.1 AA",
    ],
  },
};

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies[slug];
}
