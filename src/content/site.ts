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
    "Senior front-end developer with 5+ years shipping production WordPress and Shopify sites. At Fervor Creative, I led 50+ launches across multifamily real estate (100+ Greystar properties), nonprofit (Virginia G. Piper Charitable Trust, Helios Education Foundation), and enterprise (collaborations involving ASU and Starbucks). I served as primary technical contact for a 150+ site agency portfolio.",
    "My focus is Core Web Vitals, WCAG 2.1 AA accessibility, and technical SEO. I routinely lift Lighthouse scores by 30 to 50 points per project. I work in PHP, JavaScript, Liquid, React, and modern CSS. Based in Los Angeles, currently freelancing at Rhumbline AI, and open to senior front-end roles.",
  ],
  bioClosing:
    "CalArts MFA | Hartford BM | snowboarder, cyclist, coffee enthusiast.",
  currentlyExploring:
    "Currently exploring: AWS Cloud Practitioner certification, Magento, headless WordPress on Vercel, and Next.js app router patterns.",
  contactMessage:
    "Looking for a senior front-end developer to ship WordPress or Shopify work? Send a note or book a 15-minute call.",
  email: "Dan.Ogrodnik@gmail.com",
  phone: "860-305-9789",
  github: "https://github.com/Ogrods",
  project: "https://www.DanOgrodnik.com",
  address: {
    street: "",
    city: "Los Angeles",
    state: "CA",
    zip: "",
  },
  website: "http://www.danogrodnik.com",
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
      url: "http://instagram.com/ogrods",
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