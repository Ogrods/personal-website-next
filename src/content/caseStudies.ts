import type { CaseStudy } from "@/types";

export const caseStudies: Record<string, CaseStudy> = {
  baklog: {
    slug: "baklog",
    title: "BAKLOG",
    eyebrow: "Case study",
    role: "Solo founder · Product, engineering, and GTM",
    liveUrl: "https://baklog.app",
    overview:
      "Modern PC libraries are accidental. Free game drops, bundle purchases, and forgotten launcher accounts scatter ownership across Steam, Epic, GOG, PlayStation, Xbox, and more. BAKLOG runs on your machine with a single fetch module: a real-time orchestrator that pulls every connected store and feed, dedupes cross-store titles, and tracks how fresh each source is. It answers a simple question: what should I play next?",
    metrics: [
      "27 fetch sources, one orchestrator",
      "Live, non-blocking sync",
      "Per-source freshness tracking",
      "3,800+ automated tests",
    ],
    challenge:
      "Every storefront is a flaky silo with its own auth, rate limits, and failure modes. Pulling from two dozen sources at once - libraries, wishlists, prices, and enrichment - with no cloud backend, without freezing the UI, and without a single failed fetch corrupting a 1,000+ title library is the hard part. The sync surface also has to stay legible and usable while a dozen jobs run, and reflow cleanly from a wide dashboard down to a narrow panel.",
    approach: [
      "A single fetch module orchestrates 27 sources - nine game libraries, six wishlist feeds, IsThereAnyDeal pricing, and enrichment providers (co-op, covers, reviews, HowLongToBeat, and more) - each with its own adapter, schedule, and freshness window.",
      "The fetcher surfaces as a responsive, real-time control panel: per-source counts and age badges, connected vs stale/missing filters, auto-refresh toggles, expand/collapse and layout controls, and live job status (Running: ITAD ... done) that reflows from the full dashboard down to small screens - all without blocking the rest of the app.",
      "Local-first architecture: a Python server on localhost runs the fetchers, encrypted credentials stay on disk with AES-256-GCM and the OS keyring, and storefront requests run from your IP via Chrome DevTools Protocol browser auth, not a BAKLOG cloud.",
      "Cross-store dedupe with store-priority survivor selection, combined playtime rollup, and ownership-aware wishlist deals fused with IsThereAnyDeal pricing. A drift guard prevents a failed fetch from wiping a populated library.",
      "Virtual scrolling and a Web Worker filter pipeline keep 1,000+ row tables responsive in vanilla JavaScript. Production discipline backs it: 3,800+ automated tests (pytest + Vitest), CI on Windows, and a documented privacy threat model with zero network telemetry.",
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
      "FIRST is a global rare-disease nonprofit supporting patients, caregivers, and clinicians. The site had to speak to two very different audiences without becoming two properties. I led the WordPress front-end on Gutenberg and GenerateBlocks: editor surface, events, physician finder, and donation flows.",
    metrics: [
      "$2.2M research funding",
      "1,600+ patient registry",
      "Global rare-disease nonprofit",
    ],
    challenge:
      "The same ichthyosis content must serve patients and caregivers looking for plain-language guidance, and medical professionals who need clinical depth and references. A single nav and one visual system would force each audience through the other's world. Accessibility had to hold: many visitors have visual or skin-related conditions that map directly to WCAG requirements.",
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
  wedding: {
    slug: "wedding",
    title: "Wedding guest site",
    eyebrow: "Case study",
    role: "Solo build · Product, design, and full-stack engineering",
    liveUrl: "https://danison.love",
    overview: [
      "We started on WeddingWire and it was not enough: rigid RSVPs, thin logistics for a two-venue mountain day, guest data that did not match how we planned, and almost no day-of ops. So I built a custom guest site and planning system for our October 31 wedding: ceremony at SkyPark, dinner and dancing at Twin Peaks Community Center.",
      "Guests had one phone-friendly place for schedule, maps, lodging, and RSVP. We ran headcount, seating, meals, and day-of media off the same database instead of screenshots and spreadsheets. Closing the RSVP window left 96 attending (89 adults, 7 kids), 90 portal-confirmed, and zero awaiting reply.",
    ],
    metrics: [
      "96 attending · 0 awaiting reply",
      "90 portal-confirmed RSVPs",
      "Admin headcount strip on invitee dots",
      "Dual booth + reception slideshow",
    ],
    challenge:
      "WeddingWire worked for a starter list and a save-the-date. It did not work for a dual-venue mountain wedding with a firm caterer deadline, household replies, vegetarian meal counts, verbal yeses mixed with portal replies, and seating that had to stay accurate until the last table card. Guests needed clear answers on phones. We needed admin tools that treated invitees as canonical data and RSVPs as intake, not the reverse.",
    approach: [
      "Left WeddingWire for a custom site: import the starter list, make Payload Invitees the canonical roster, and treat portal RSVPs as intake that syncs into it so headcount, meals, and seating never fight a second spreadsheet.",
      "Built a household-aware RSVP flow (invitation name match, +1, up to two children, per-guest vegetarian flags, dietary notes, resubmit-as-update) with name-anchored sync, household keys, and moderation flags for ambiguous matches, without letting guests overwrite seating or planning fields.",
      "Shipped an admin RSVP stats strip as the ops glance layer: attending vs portal-confirmed vs tentative, declines, awaiting reply, kids, vegetarian meals, and flagged rows, plus one-click Wedding plan and View wedding site links, so headcount never meant opening a spreadsheet.",
      "Turned dual-venue logistics into one guest narrative: timed program, maps, parking, SkyPark-to-Twin Peaks directions, lodging, FAQ, dress code, registry, and Our Story. Hid a Twin Peaks Red Room easter egg behind five taps on the reception card, with a matching Red Room booth theme.",
      "Ran two photo booths on the same themes, strip composer, and Google Photos upload: full /booth for modern devices, and /booth/lite for an old iPad mini on iOS 12. Guests pick Classic, Mountain formal, Halloween, or Red Room. An unlisted /slideshow TV reel covers reception displays; RSVPs hard-close after the caterer deadline, with archive mode ready afterward.",
      "Treated seating and vendors as product too: attending invitees export to a seating canvas and wedding plan HTML, and vendor sections stay behind feature flags until bookings are real. Stack: Next.js, Payload CMS 3, Neon Postgres, Vercel, Playwright smoke tests, seating preflight, and database backups, with noindex so the guest site stays share-by-link.",
    ],
    heroImage: {
      src: "wedding.webp",
      alt: "Wedding guest site hero with couple monogram, names, and countdown",
    },
    gallery: {
      heading: "Guest, ops, and day-of surfaces",
      body: "Guest logistics with a Red Room easter egg, the admin headcount strip, RSVP party builder, and four booth themes across dual kiosks including the iPad mini lite booth.",
      images: [
        {
          src: "wedding-venues.webp",
          alt: "Ceremony and reception venue cards with Twin Peaks Red Room easter egg revealed",
          caption: "Venues · Red Room easter egg",
        },
        {
          src: "wedding-program.webp",
          alt: "Wedding program timeline with ceremony and reception schedule",
          caption: "Program · Day-of schedule",
        },
        {
          src: "wedding-stay.webp",
          alt: "Accommodations page with mountain lodging near the reception",
          caption: "Stay · Mountain lodging",
        },
        {
          src: "wedding-admin.webp",
          alt: "Admin RSVP stats strip showing attending, portal confirmed, and meal counts",
          caption: "Admin · Headcount strip",
        },
        {
          src: "wedding-rsvp.webp",
          alt: "Wedding RSVP form with party builder and vegetarian meal flags",
          caption: "RSVP · Party builder and meals",
        },
        {
          src: "wedding-booth-themes.webp",
          alt: "Four photo booth strip themes: Classic, Mountain, Halloween, and Red Room",
          caption: "Booth · Four themes · /booth + iPad mini lite",
        },
      ],
    },
    stack: [
      "Next.js",
      "TypeScript",
      "Payload CMS 3",
      "Neon Postgres",
      "Vercel",
      "Playwright",
      "Google Photos API",
    ],
  },
  "audio-hire": {
    slug: "audio-hire",
    title: "Audio hire site",
    eyebrow: "Case study",
    role: "Solo build · Design and front-end",
    liveUrl: "https://audio.danogrodnik.com",
    overview:
      "A one-page hire site on a subdomain of danogrodnik.com for booking audio work. The first screen stays light and clear while still surfacing samples, services, credits, and resume downloads, without shipping a heavy media stack up front.",
    metrics: [
      "Next.js 15 on Vercel",
      "Click-to-load SoundCloud / YouTube facades",
      "Sitemap, robots, Person JSON-LD",
      "Shared GTM container with the main site",
    ],
    challenge:
      "Hire pages often bury the point under embeds and PDFs. Third-party players, a long photo strip, and downloadable docs all compete with the hero. The page had to stay readable on a phone, keep section backgrounds stable under scroll motion, and keep performance real instead of hiding weight behind a spinner.",
    approach: [
      "Plain section shells with item-level scroll reveals so bands do not flash in as black sheets.",
      "Hero treated as the LCP: image tuned, type scaled for small screens, no reveal wrapper on the hero content.",
      "Work section uses facades so players load only after a click and the hero stays fast. Photo strip scrolls continuously but pauses when offscreen.",
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
  madishroom: {
    slug: "madishroom",
    title: "Madishroom",
    eyebrow: "Case study",
    role: "Owner-operator · Theme, catalog ops, and launch",
    liveUrl: "https://madishroom.com",
    overview: [
      "Madishroom is a live DTC Shopify store I own and operate: curated pre-owned gaming and pop-culture collectibles under Madishroom, plus new handmade and made-to-order art under Crafty MerMadi. I built the Liquid theme, payments and shipping, and the catalog tooling that keeps the store honest at scale.",
      "Most of the catalog never hits the storefront. Of 656 product handles, about 479 stay Draft on purpose—drops, $0 staging inventory, and incomplete pricing—while roughly 180 SKUs sell live. Shoppers sort and filter that live set; bulk CSV work must never accidentally publish a draft or wipe inventory.",
    ],
    metrics: [
      "650+ SKUs · ~480 Draft",
      "~180 live on the storefront",
      "Import omits Status / inventory qty",
      "Collection sort + filter · 20/page",
    ],
    challenge:
      "A dual-brand catalog this size is mostly inactive by design. Drafts hold future drops, unpriced staging stock, and SKUs that are not ready for Google Shopping. Shoppers still need a clean, sortable live grid. The hard part is operating hundreds of inactive items safely: a careless product CSV can flip Status, publish drafts, or zero Variant Inventory Qty across the whole project.",
    approach: [
      "Treat Shopify Draft as a first-class merchandising state—not a mistake. Keep incomplete, $0, and drop-held SKUs inactive until they are priced and ready; activate in batches when a drop or audit clears them.",
      "Build a Python normalize/check pipeline over full catalog exports. Remap SKUs, SEO, condition markup, tags, and inventory_policy across hundreds of handles while hard-omitting Status, Published, and Variant Inventory Qty from every import file so drafts stay draft and stock counts never get overwritten.",
      "Encode dual-vendor rules in catalog tooling: Madishroom pre-owned (used) versus Crafty MerMadi new/MTO (continue selling when out of stock for stickers and prints; deny otherwise), plus duplicate-draft cleanup after imports.",
      "Ship Dawn-based collection and search facets with sorting and filtering enabled. The live grid paginates at 20 products per page; sort_by and filters update via Shopify Section Rendering without a full page reload—drafts never appear in those collections.",
      "Tune the Liquid theme for product photography, lazy media, deferred third-party scripts, and Schema.org product/organization markup so the public storefront stays conversion-focused while the ops layer stays in CSV and admin.",
    ],
    heroImage: {
      src: "madishroom.webp",
      alt: "Madishroom Shopify storefront homepage",
    },
    gallery: {
      heading: "Storefront and catalog surfaces",
      body: "Live homepage, collection sort and filter on the active set, catalog-scale Draft vs active ops, and the dual-brand Who We Are page.",
      images: [
        {
          src: "madishroom-collection.webp",
          alt: "Madishroom collection page with product sort and filter controls",
          caption: "Collection · Sort and filter · live SKUs",
        },
        {
          src: "madishroom-drafts.webp",
          alt: "Catalog ops summary showing 656 products with 479 Draft and 177 active",
          caption: "Catalog · 479 Draft of 656 SKUs",
        },
        {
          src: "madishroom-about.webp",
          alt: "Madishroom Who We Are page describing pre-owned and Crafty MerMadi lines",
          caption: "About · Dual catalog narrative",
        },
      ],
    },
    stack: [
      "Shopify",
      "Liquid",
      "Python",
      "CSV catalog tooling",
      "Section Rendering API",
      "Schema.org",
    ],
  },
};

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies[slug];
}
