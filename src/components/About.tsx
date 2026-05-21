import Image from "next/image";
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
      className="scroll-mt-20 overflow-hidden bg-[#000524] pb-[66px] pt-24 text-[#ccc]"
    >
      <div className="container-site">
        <div className="grid gap-10 md:grid-cols-12 md:items-start">
          <div className="md:col-span-3">
            <Image
              src={`/images/${profile.image}`}
              alt={profile.name}
              width={120}
              height={120}
              className="h-[120px] w-[120px] rounded-full object-cover"
              priority
            />
          </div>

          <div className="md:col-span-9 md:pr-[5%]">
            <SectionHeading title="About" variant="light" />
            <p className="mb-10 leading-[30px] text-[#ccc]">{profile.bio}</p>

            <div className="grid gap-8 md:grid-cols-12">
              <div className="md:col-span-5">
                <h3 className="mb-3 font-serif text-lg text-white">
                  Contact Details
                </h3>
                <p className="font-semibold text-white">{profile.name}</p>
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
              </div>

              <div className="flex items-start md:col-span-7 md:justify-end md:pt-1.5">
                <a
                  href={profile.resumeDownload}
                  download
                  className="btn-primary"
                >
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
