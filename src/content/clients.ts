export type ClientLogo = {
  name: string;
  logo: string;
  url?: string;
  /** Visual scale inside fixed marquee slot (layout size unchanged). */
  scale?: number;
};

export const clientLogos: ClientLogo[] = [
  {
    name: "Greystar",
    logo: "greystar.webp",
    url: "https://www.greystar.com/",
    scale: 1.15,
  },
  {
    name: "Wood Partners",
    logo: "wood-partners.webp",
    url: "https://www.woodpartners.com/",
  },
  { name: "Arizona State University", logo: "asu.webp", url: "https://www.asu.edu/" },
  { name: "Starbucks", logo: "starbucks.webp", url: "https://www.starbucks.com/" },
  {
    name: "FIRST Foundation",
    logo: "first.webp",
    url: "https://firstskinfoundation.org/",
  },
  { name: "Virginia G. Piper Charitable Trust", logo: "piper.webp", url: "https://pipertrust.org/" },
  { name: "Helios Education Foundation", logo: "helios.svg", url: "https://www.helios.org/" },
  { name: "Milton Sleep Co.", logo: "milton.webp" },
];
