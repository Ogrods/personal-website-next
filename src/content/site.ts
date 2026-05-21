import type { SiteProfile } from "@/types";

export const siteProfile: SiteProfile = {
  name: "Dan Ogrodnik",
  subtitle: "Front-end Developer and SEO Specialist",
  description: "Responsive Design, React, SEO & Accessibility",
  image: "profilepic.jpg",
  bio: "Skilled web developer and digital artist with extensive experience in building responsive, user-friendly interfaces using a diverse range of languages, libraries, and frameworks. Combines a strong background in web development and e-commerce with a keen eye for design to deliver visually compelling and technically robust digital experiences. Adept at optimizing performance, accessibility, and usability while maintaining clean, efficient code. Originally from Connecticut, Dan holds degrees from California Institute of the Arts and the University of Hartford. He currently resides in Los Angeles where he is an avid snowboarder, cyclist, and coffee drinker.",
  contactMessage: "Questions, comments, concerns? Drop me a line!",
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
      url: "https://github.com/ogrods",
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
  { href: "#about", label: "About" },
  { href: "#resume", label: "Resume" },
  { href: "#portfolio", label: "Works" },
  { href: "#contact", label: "Contact" },
] as const;
