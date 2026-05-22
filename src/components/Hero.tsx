import { ChevronDown } from "lucide-react";
import ParticleBackground from "@/components/ParticleBackground";
import { LinkedInIcon } from "@/components/icons";
import type { SiteProfile } from "@/types";

type HeroProps = {
  profile: SiteProfile;
};

export default function Hero({ profile }: HeroProps) {
  const linkedIn = profile.social.find((s) => s.name === "linkedin");

  return (
    <header
      id="home"
      className="relative flex h-dvh min-h-[100svh] w-full items-center justify-center overflow-hidden text-center"
    >
      <ParticleBackground />

      <div className="relative z-10 inline-block w-[85%] max-w-5xl px-4 pb-8 align-middle">
        <div className="banner-text w-full">
          <p className="mb-4 font-serif text-xs uppercase tracking-[0.35em] text-[#b8c4ce]">
            {profile.availability}
          </p>
          <h1 className="mx-auto mb-[18px] font-serif text-[clamp(3rem,10vw,5.625rem)] leading-[1.1] tracking-[-2px] text-white">
            {profile.name}
          </h1>
          <h2 className="mx-auto w-[90%] max-w-3xl font-serif text-[clamp(1.25rem,4vw,2.125rem)] leading-tight text-[#ddd]">
            {profile.tagline}
          </h2>
          <hr className="mx-auto my-[18px] w-3/5 border-white/10" />
          <p className="mx-auto w-[85%] max-w-2xl font-serif text-lg italic leading-[1.75] text-[#d4d4d4] md:text-xl">
            {profile.proofLine}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap sm:gap-6">
            <a
              href={profile.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero-primary hover:shadow-lg hover:shadow-blue-500/20"
            >
              Book a 15-min intro call
            </a>
            <a
              href={profile.resumeDownload}
              download
              className="btn-hero-secondary hover:shadow-lg hover:shadow-white/10"
            >
              Download resume
            </a>
            {linkedIn ? (
              <a
                href={linkedIn.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/40 px-5 py-3.5 text-sm uppercase tracking-[0.12em] text-white transition hover:border-white hover:bg-white/10 hover:shadow-lg hover:shadow-white/10"
                aria-label="LinkedIn profile (opens in new tab)"
              >
                <LinkedInIcon size={18} className="text-white" />
                LinkedIn
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <a
        href="#portfolio"
        className="absolute bottom-[30px] left-1/2 z-10 -ml-[21px] text-white transition hover:text-[#0762f9]"
        aria-label="Scroll to Selected Work section"
      >
        <ChevronDown size={42} strokeWidth={1.5} />
      </a>
    </header>
  );
}
