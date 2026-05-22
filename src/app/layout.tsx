import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  siteDescription,
  siteKeywords,
  siteTitle,
  siteUrl,
} from "@/lib/site-metadata";
import { siteProfile } from "@/content/site";
import "./globals.css";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteProfile.name,
  url: siteUrl,
  image: `${siteUrl}/images/${siteProfile.image}`,
  email: `mailto:${siteProfile.email}`,
  telephone: siteProfile.phone,
  jobTitle: "Senior Front-End Developer",
  description: siteDescription,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteProfile.address.city,
    addressRegion: siteProfile.address.state,
    addressCountry: "US",
  },
  worksFor: {
    "@type": "Organization",
    name: "Rhumbline AI",
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "California Institute of the Arts",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "University of Hartford",
    },
  ],
  knowsAbout: [
    "WordPress",
    "Shopify",
    "React",
    "Liquid",
    "PHP",
    "JavaScript",
    "TypeScript",
    "Core Web Vitals",
    "Web Content Accessibility Guidelines (WCAG)",
    "Technical SEO",
  ],
  sameAs: siteProfile.social.map((link) => link.url),
};

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-eb-garamond",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Dan Ogrodnik",
  },
  description: siteDescription,
  keywords: siteKeywords,
  authors: [{ name: "Dan Ogrodnik", url: siteUrl }],
  creator: "Dan Ogrodnik",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Dan Ogrodnik",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dan Ogrodnik - Senior Front-End Developer (WordPress, Shopify, React)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${ebGaramond.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className={`${ebGaramond.className} font-serif antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
