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
      className="relative flex h-[800px] min-h-[500px] w-full items-center justify-center overflow-hidden text-center"
    >
      <ParticleBackground />

      <div className="relative z-10 inline-block w-[85%] max-w-5xl px-4 pb-8 align-middle">
        <div className="banner-text w-full">
          <h1 className="mx-auto mb-[18px] font-serif text-[clamp(3rem,10vw,5.625rem)] leading-[1.1] tracking-[-2px] text-white">
            {profile.name}
          </h1>
          <h2 className="mx-auto w-[70%] max-w-3xl font-serif text-[clamp(1.25rem,4vw,2.375rem)] leading-tight text-[#ddd]">
            {profile.subtitle}
          </h2>
          <hr className="mx-auto my-[18px] w-3/5 border-white/10" />
          <h3 className="mx-auto w-[70%] max-w-2xl font-serif text-xl italic leading-[1.9] text-[#ddd]">
            {profile.description}
          </h3>
          <div className="mt-6">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Dan Ogrodnik on GitHub (opens in new tab)"
              className="inline-flex items-center gap-2 font-serif text-sm uppercase tracking-[0.25em] text-white transition hover:text-[#0762f9]"
            >
              <GitHubIcon size={18} />
              Github
            </a>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-[30px] left-1/2 z-10 -ml-[21px] text-white transition hover:text-[#0762f9]"
        aria-label="Scroll to About section"
      >
        <ChevronDown size={42} strokeWidth={1.5} />
      </a>
    </header>
  );
}
