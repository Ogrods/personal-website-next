import type { SiteProfile } from "@/types";

export const siteProfile: SiteProfile = {
  name: "Dan Ogrodnik",
  description: "Responsive Design, HTML, CSS, React",
  image: "profilepic.jpg",
  bio: "Dan Ogrodnik is a web developer, digital artist, and audio engineer with a background in web design and e-commerce. Well versed in a variety of design and multimedia software and programming languages, Dan creates engaging, beautifully designed experiences across a multitude of platforms and formats. Originally from Connecticut, Dan holds degrees from California Institute of the Arts and the University of Hartford. He currently resides in Los Angeles where he is an avid snowboarder, cyclist, and coffee drinker.",
  contactMessage:
    "Questions, comments, concerns? Drop me a line!",
  email: "Dan.Ogrodnik@gmail.com",
  phone: "860-305-9789",
  github: "https://github.com/Ogrods",
  project: "https://www.DanOgrodnik.com",
  address: {
    street: "(Your Street)",
    city: "Los Angeles",
    state: "CA",
    zip: "92325",
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
