import { ChevronDown } from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import ParticleBackground from "@/components/ParticleBackground";
import type { SiteProfile } from "@/types";

type HeroProps = {
  profile: SiteProfile;
};

export default function Hero({ profile }: HeroProps) {
  return (
    <header
      id="home"
      className="relative flex min-h-[500px] h-[85vh] max-h-[800px] w-full items-center justify-center overflow-hidden text-center"
    >
      <ParticleBackground />

      <div className="relative z-10 mx-auto w-[85%] max-w-4xl px-4 pb-8">
        <h1 className="font-serif text-5xl leading-tight tracking-tight text-white sm:text-7xl md:text-[5.5rem]">
          {profile.name}
        </h1>
        <p className="mt-2 font-serif text-base uppercase tracking-[0.3em] text-white/80 sm:text-lg">
          {profile.subtitle}
        </p>
        <hr className="mx-auto my-5 w-3/5 border-white/10" />
        <h3 className="mx-auto max-w-2xl font-serif text-lg italic leading-relaxed text-[#ddd] sm:text-xl">
          {profile.description}
        </h3>
        <div className="mt-8">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded border border-white/30 bg-white/5 px-6 py-3 text-sm uppercase tracking-widest text-white transition hover:border-[#0762f9] hover:text-[#0762f9]"
          >
            <GitHubIcon size={18} />
            Github
          </a>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white transition hover:text-[#0762f9]"
        aria-label="Scroll to about section"
      >
        <ChevronDown size={42} />
      </a>
    </header>
  );
}
