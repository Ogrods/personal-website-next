import type { SiteProfile } from "@/types";

export const siteProfile: SiteProfile = {
  name: "Dan Ogrodnik",
  availability: "Available | Remote | LA Hybrid | Contract",
  tagline: "Front-end developer - WordPress, Shopify, React.",
  proofLine:
    "Fast, accessible, SEO-strong sites - Lighthouse lifts of 30 to 50 points across 50+ launches.",
  bookingUrl: "https://calendar.app.google/rveuZ14Je3ehY7Zq9",
  image: "profilepic.webp",
  bioParagraphs: [
    "Senior front-end developer and solo founder of BAKLOG (baklog.app), a local-first game library with a 27-source sync engine, 480 automated tests, and Lighthouse 100 on accessibility, SEO, and best practices. At Fervor Creative I led 50+ launches across multifamily real estate (100+ Greystar properties), nonprofit (Virginia G. Piper Charitable Trust, Helios Education Foundation), and enterprise collaborations involving ASU and Starbucks, and served as primary technical contact for a 150+ site agency portfolio.",
    "My focus is Core Web Vitals, WCAG 2.1 AA accessibility, and technical SEO. I routinely lift Lighthouse scores by 30 to 50 points per project. I work in PHP, JavaScript, Liquid, React, and modern CSS. Based in Los Angeles, currently freelancing at Rhumbline AI on WordPress and Shopify work (including FIRST Foundation on Gutenberg + GenerateBlocks), and open to senior front-end roles.",
  ],
  bioClosing:
    "CalArts MFA | Hartford BM | snowboarder, cyclist, coffee enthusiast.",
  currentlyExploring:
    "Currently exploring: AWS Cloud Practitioner certification, Magento, headless WordPress on Vercel, and Next.js app router patterns.",
  contactMessage:
    "Looking for a senior front-end developer to ship WordPress or Shopify work? Send a note or book a 15-minute call.",
  email: "dan@danogrodnik.com",
  phone: "",
  github: "https://github.com/Ogrods",
  project: "https://www.danogrodnik.com",
  address: {
    street: "",
    city: "Los Angeles",
    state: "CA",
    zip: "",
  },
  website: "https://www.danogrodnik.com",
  resumeDownload: "/dan-ogrodnik-resume.pdf",
  social: [
    {
      name: "github",
      url: "https://github.com/Ogrods",
    },
    {
      name: "linkedin",
      url: "https://www.linkedin.com/in/danogrodnik/",
    },
    {
      name: "instagram",
      url: "https://instagram.com/ogrods",
    },
  ],
};

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#portfolio", label: "Works" },
  { href: "#about", label: "About" },
  { href: "#resume", label: "Resume" },
  { href: "#contact", label: "Contact" },
] as const;
