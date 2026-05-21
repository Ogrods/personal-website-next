import Image from "next/image";
import type { SiteProfile } from "@/types";

type AboutProps = {
  profile: SiteProfile;
};

export default function About({ profile }: AboutProps) {
  const { address } = profile;

  return (
    <section id="about" className="scroll-mt-20 bg-[#0f0f0f] py-20 text-[#ccc]">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[280px_1fr] md:items-start">
        <div className="mx-auto w-full max-w-[280px]">
          <Image
            src={`/images/${profile.image}`}
            alt={profile.name}
            width={280}
            height={280}
            className="rounded-full object-cover shadow-lg"
            priority
          />
        </div>

        <div>
          <h2 className="mb-8 font-serif text-4xl text-white">
            <span className="text-[#0762f9]">About</span>
          </h2>
          <p className="mb-10 leading-8 text-[#ccc]">{profile.bio}</p>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">
                Contact Details
              </h3>
              <p className="font-semibold text-white">{profile.name}</p>
              <p>
                {address.city}, {address.state}
              </p>
              <p>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-[#0762f9] hover:underline"
                >
                  {profile.email}
                </a>
              </p>
            </div>

            <div className="flex items-end">
              <a
                href={profile.resumeDownload}
                download
                className="inline-block rounded border border-[#0762f9] px-6 py-3 text-sm uppercase tracking-widest text-white transition hover:bg-[#0762f9]"
              >
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
