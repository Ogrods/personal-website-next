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
  subtitle: string;
  description: string;
  image: string;
  bio: string;
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
};

export type Skill = {
  name: string;
  level: string;
};

export type ResumeContent = {
  skillMessage: string[];
  education: Education[];
  work: WorkExperience[];
  skills: Skill[];
};

export type Project = {
  title: string;
  category: string;
  image: string;
  url: string;
};
