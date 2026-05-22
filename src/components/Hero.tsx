import { ChevronDown } from "lucide-react";
import ParticleBackground from "@/components/ParticleBackground";
import type { SiteProfile } from "@/types";

type HeroProps = {
  profile: SiteProfile;
};

export default function Hero({ profile }: HeroProps) {
  return (
    <header
      id="home"
      className="relative flex h-dvh min-h-[100svh] w-full items-center justify-center overflow-hidden text-center"
    >
      <ParticleBackground />

      <div className="relative z-10 inline-block w-[85%] max-w-5xl px-4 pb-8 align-middle">
        <div className="banner-text w-full">
          <p className="mb-4 font-serif text-xs uppercase tracking-[0.35em] text-[#9aa5b0]">
            {profile.availability}
          </p>
          <h1 className="mx-auto mb-[18px] font-serif text-[clamp(3rem,10vw,5.625rem)] leading-[1.1] tracking-[-2px] text-white">
            {profile.name}
          </h1>
          <h2 className="mx-auto w-[90%] max-w-3xl font-serif text-[clamp(1.25rem,4vw,2.125rem)] leading-tight text-[#ddd]">
            {profile.tagline}
          </h2>
          <hr className="mx-auto my-[18px] w-3/5 border-white/10" />
          <p className="mx-auto w-[85%] max-w-2xl font-serif text-lg italic leading-[1.75] text-[#bbb] md:text-xl">
            {profile.proofLine}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <a
              href={profile.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero-primary"
            >
              Book a 15-min intro call
            </a>
            <a
              href={profile.resumeDownload}
              download
              className="btn-hero-secondary"
            >
              Download resume
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
