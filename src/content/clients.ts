export type ClientLogo = {
  name: string;
  logo: string;
  url?: string;
};

export const clientLogos: ClientLogo[] = [
  { name: "Greystar", logo: "greystar.webp", url: "https://www.greystar.com/" },
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
