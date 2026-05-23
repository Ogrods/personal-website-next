import Image from "next/image";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import type { SiteProfile } from "@/types";

type AboutProps = {
  profile: SiteProfile;
};

export default function About({ profile }: AboutProps) {
  const { address } = profile;

  return (
    <section
      id="about"
      className="scroll-mt-[47px] overflow-hidden bg-[#000524] pb-[66px] pt-24 text-[#ccc] md:scroll-mt-20"
    >
      <div className="container-site">
        <div className="grid gap-10 md:grid-cols-12 md:items-start">
          <Reveal className="md:col-span-3">
            <Image
              src={`/images/${profile.image}`}
              alt={profile.name}
              width={120}
              height={120}
              className="h-[120px] w-[120px] rounded-full object-cover"
              priority
            />
          </Reveal>

          <Reveal delayMs={80} className="md:col-span-9 md:pr-[5%]">
            <SectionHeading title="About" variant="light" />
            <div className="mb-6 space-y-6 leading-[30px] text-[#ccc]">
              {profile.bioParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            {profile.bioClosing ? (
              <p className="mb-2 text-sm italic text-[#b5c0cb]">
                {profile.bioClosing}
              </p>
            ) : null}
            {profile.currentlyExploring ? (
              <p className="mb-10 text-sm text-[#b5c0cb]">
                {profile.currentlyExploring}
              </p>
            ) : null}

            <div className="grid gap-8 md:grid-cols-12">
              <div className="md:col-span-5">
                <h3 className="mb-3 font-serif text-lg text-white">
                  Contact Details
                </h3>
                <p className="font-bold text-white">{profile.name}</p>
                <p>
                  {address.city}, {address.state}
                </p>
                <p>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-white transition hover:text-[#0762f9]"
                  >
                    {profile.email}
                  </a>
                </p>
                {profile.phone ? (
                  <p>
                    <a
                      href={`tel:${profile.phone.replace(/[^0-9+]/g, "")}`}
                      className="text-white transition hover:text-[#0762f9]"
                    >
                      {profile.phone}
                    </a>
                  </p>
                ) : null}
                <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  {profile.social.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#b5c0cb] transition hover:text-[#0762f9]"
                    >
                      {link.name === "github"
                        ? "GitHub"
                        : link.name === "linkedin"
                          ? "LinkedIn"
                          : link.name === "instagram"
                            ? "Instagram"
                            : link.name}
                    </a>
                  ))}
                </p>
              </div>

              <div className="flex flex-wrap items-start gap-3 md:col-span-7 md:justify-end md:pt-1.5">
                <a
                  href={profile.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Book a call
                </a>
                <a
                  href={profile.resumeDownload}
                  download
                  className="btn-primary"
                >
                  Download Resume
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}



