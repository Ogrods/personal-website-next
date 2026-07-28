import type { CaseStudy } from "@/types";

export const caseStudies: Record<string, CaseStudy> = {
  baklog: {
    slug: "baklog",
    title: "BAKLOG",
    eyebrow: "Case study",
    role: "Solo founder · Product, engineering, and GTM",
    liveUrl: "https://baklog.app",
    overview:
      "Modern PC libraries are accidental. Free game drops, bundle purchases, and forgotten launcher accounts scatter ownership across Steam, Epic, GOG, PlayStation, Xbox, and more. BAKLOG runs on your machine and is driven by a single fetch module: a responsive, real-time orchestrator that pulls from every connected store and feed, dedupes cross-store titles, tracks how fresh each source is, and answers the question every backlog owner actually has - what should I play next?",
    metrics: [
      "27 fetch sources, one orchestrator",
      "Live, non-blocking sync",
      "Per-source freshness tracking",
      "480 automated tests",
    ],
    challenge:
      "Every storefront is a flaky silo with its own auth, rate limits, and failure modes. Pulling from two dozen sources at once - libraries, wishlists, prices, and enrichment - with no cloud backend, without freezing the UI, and without a single failed fetch corrupting a 1,000+ title library is the hard part. The sync surface also has to stay legible and usable while a dozen jobs run, and reflow cleanly from a wide dashboard down to a narrow panel.",
    approach: [
      "A single fetch module orchestrates 27 sources - nine game libraries, six wishlist feeds, IsThereAnyDeal pricing, and enrichment providers (co-op, covers, reviews, HowLongToBeat, and more) - each with its own adapter, schedule, and freshness window.",
      "The fetcher surfaces as a responsive, real-time control panel: per-source counts and age badges, connected vs stale/missing filters, auto-refresh toggles, expand/collapse and layout controls, and live job status (Running: ITAD ... done) that reflows from the full dashboard down to small screens - all without blocking the rest of the app.",
      "Local-first architecture: a Python server on localhost runs the fetchers, encrypted credentials stay on disk with AES-256-GCM and the OS keyring, and storefront requests run from your IP via Chrome DevTools Protocol browser auth, not a BAKLOG cloud.",
      "Cross-store dedupe with store-priority survivor selection, combined playtime rollup, and ownership-aware wishlist deals fused with IsThereAnyDeal pricing. A drift guard prevents a failed fetch from wiping a populated library.",
      "Virtual scrolling and a Web Worker filter pipeline keep 1,000+ row tables responsive in vanilla JavaScript, backed by 480 automated tests (pytest + Vitest), CI on Windows, and a documented privacy threat model with zero network telemetry.",
    ],
    heroImage: {
      src: "baklog.webp",
      alt: "BAKLOG dashboard with library stats, store breakdown charts, and sabermetrics",
    },
    gallery: {
      heading: "Product surfaces",
      body: "Dashboard analytics, live fetcher orchestration, library picks, ownership-aware wishlist deals, store connections, and the public landing page.",
      images: [
        {
          src: "baklog-fetchers.webp",
          alt: "BAKLOG fetcher log panel syncing 27 library, wishlist, price, and enrichment sources",
          caption: "Fetcher log · 27 sources syncing live",
        },
        {
          src: "baklog-wishlist.webp",
          alt: "BAKLOG wishlist with deal scoreboard and sale tracking",
          caption: "Wishlist · Ownership-aware deals",
        },
        {
          src: "baklog-connections.webp",
          alt: "BAKLOG connections page for linking storefront accounts",
          caption: "Connections · One-click store auth",
        },
        {
          src: "baklog-itch.webp",
          alt: "BAKLOG itch.io library tab with filters",
          caption: "itch.io · Indie key quarantine",
        },
        {
          src: "baklog-landing.webp",
          alt: "BAKLOG landing page at baklog.app",
          caption: "Landing · baklog.app",
        },
      ],
    },
    stack: [
      "Python",
      "Vanilla JS",
      "Chart.js",
      "Chrome DevTools Protocol",
      "AES-256-GCM",
      "Vitest",
      "pytest",
    ],
  },
  first: {
    slug: "first",
    title: "FIRST - Foundation for Ichthyosis & Related Skin Types",
    eyebrow: "Case study",
    role: "Front-end build via Rhumbline AI",
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
      "A persistent audience toggle in the masthead - Medical Professionals on the blue side, Patients and Caregivers on the green side - so users can cross over without losing context.",
      "WordPress front-end with Gutenberg + GenerateBlocks block library for events, physician finder, and donation flows. No page-builder, clean markup, plus Schema.org for search visibility.",
      "Built to WCAG 2.1 AA from day one, with contrast checks on both color systems so neither experience compromises legibility.",
    ],
    heroImage: {
      src: "first.webp",
      alt: "FIRST Foundation homepage",
    },
    dualAudience: {
      heading: "Same template, two audiences",
      body: "Both sides share the same page structure and content architecture. Color is the wayfinding system - blue for patients and caregivers, green for clinicians - applied consistently from the header through the sidebar.",
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
  "audio-hire": {
    slug: "audio-hire",
    title: "Audio hire site",
    eyebrow: "Case study",
    role: "Solo build · Design and front-end",
    liveUrl: "https://audio.danogrodnik.com",
    overview:
      "A one-page hire site on a subdomain of danogrodnik.com. The job was a calm first impression that still carries proof: work samples, services, credits, and resume/CV downloads without dragging LCP or shipping a heavy media stack up front.",
    metrics: [
      "Next.js 15 on Vercel",
      "Click-to-load SoundCloud / YouTube facades",
      "Sitemap, robots, Person JSON-LD",
      "Shared GTM container with the main site",
    ],
    challenge:
      "Hire pages fail when they feel like a dump of embeds and PDFs. Third-party players, a long photo strip, and downloadable docs all compete with the hero. The page had to stay readable on a phone, keep section backgrounds stable under scroll motion, and stay honest about performance instead of papering over it with a spinner.",
    approach: [
      "Plain section shells with item-level scroll reveals so bands do not flash in as black sheets.",
      "Hero treated as LCP: image tuned, type scaled for small screens, no reveal wrapper on the hero content.",
      "Work section uses facades; players load only after a click. Photo strip scrolls continuously but pauses when offscreen.",
      "Resume and full CV as generated PDFs with mailto contact (no form backend on this property).",
      "Same GTM container as danogrodnik.com (GTM-PWX68TK), plus click classes on resume/CV links so existing triggers keep working.",
      "Basic SEO kit: canonical, Open Graph image, sitemap.xml, robots.txt, structured data.",
    ],
    heroImage: {
      src: "audio-hire.webp",
      alt: "Audio hire site hero on audio.danogrodnik.com",
    },
    gallery: {
      heading: "Page surfaces",
      body: "Hero as LCP, work facades that stay light until clicked, and the services band with PDF downloads.",
      images: [
        {
          src: "audio-hire-work.webp",
          alt: "Work section with click-to-load media facades",
          caption: "Work · Click-to-load embeds",
        },
        {
          src: "audio-hire-services.webp",
          alt: "Services section with stack and download CTAs",
          caption: "Services · PDF downloads",
        },
      ],
    },
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "GTM"],
  },
};

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies[slug];
}
