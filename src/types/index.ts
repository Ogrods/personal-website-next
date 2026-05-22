export type SocialLink = {
  name: string;
  url: string;
};

export type Address = {
  street: string;
  city: string;
  state: string;
  zip: string;
};

export type SiteProfile = {
  name: string;
  availability: string;
  tagline: string;
  proofLine: string;
  bookingUrl: string;
  image: string;
  bioParagraphs: string[];
  bioClosing?: string;
  currentlyExploring?: string;
  contactMessage: string;
  email: string;
  phone: string;
  github: string;
  project: string;
  address: Address;
  website: string;
  resumeDownload: string;
  social: SocialLink[];
};

export type Education = {
  school: string;
  degree: string;
  graduated: string;
  description?: string;
};

export type WorkExperience = {
  company: string;
  title: string;
  years: string;
  description: string;
  highlights?: string[];
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export type ResumeContent = {
  skillGroups: SkillGroup[];
  education: Education[];
  work: WorkExperience[];
};

export type Project = {
  title: string;
  category: string;
  image: string;
  url: string;
  stack: string[];
  metric: string;
  outcome: string;
};
