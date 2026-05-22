import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Inlines CSS in HTML so first paint does not wait on a separate stylesheet request.
    inlineCss: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
  },
};

export default nextConfig;
