import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import MetricStrip from "@/components/MetricStrip";
import Nav from "@/components/Nav";
import Portfolio from "@/components/Portfolio";
import Resume from "@/components/Resume";
import { projects } from "@/content/projects";
import { resumeContent } from "@/content/resume";
import { siteProfile } from "@/content/site";

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <Nav />
      <main id="main">
        <Hero profile={siteProfile} />
        <MetricStrip />
        <About profile={siteProfile} />
        <Resume resume={resumeContent} />
        <Portfolio projects={projects} />
        <Contact profile={siteProfile} />
      </main>
      <Footer social={siteProfile.social} name={siteProfile.name} />
    </>
  );
}
