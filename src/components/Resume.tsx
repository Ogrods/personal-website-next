import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import type { ResumeContent } from "@/types";

type ResumeProps = {
  resume: ResumeContent;
};

export default function Resume({ resume }: ResumeProps) {
  return (
    <Reveal
      as="section"
      id="resume"
      className="scroll-mt-[47px] overflow-hidden bg-white pb-[72px] pt-[90px] text-[#6e7881] md:scroll-mt-20"
    >
      <div className="container-site">
        <SectionHeading title="Work" />
        <div className="mb-12 space-y-0">
          {resume.work.map((job, index) => (
            <article
              key={`${job.company}-${job.years}`}
              className={`work mb-12 border-b border-[#e8e8e8] pb-6 ${
                index === resume.work.length - 1 ? "border-b-0" : ""
              }`}
            >
              <h3 className="font-serif text-[25px] leading-[30px] text-[#313131]">
                {job.company}
              </h3>
              <p className="info mt-2 font-serif text-base italic leading-6 text-[#6e7881]">
                {job.title}
                <span className="mx-1">•</span>
                <span className="font-serif text-[17px] not-italic leading-6 text-[#313131]">
                  {job.years}
                </span>
              </p>
              <p className="mt-2 leading-[30px]">{job.description}</p>
            </article>
          ))}
        </div>

        <SectionHeading title="Skills" />
        <div className="skill mb-12 max-w-none space-y-6 border-b border-[#e8e8e8] pb-8">
          {resume.skillGroups.map((group) => (
            <div key={group.label}>
              <h3 className="mb-2 font-serif text-sm font-bold uppercase tracking-[0.12em] text-[#313131]">
                {group.label}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-sm bg-[#ebeeee] px-2.5 py-1 font-serif text-sm text-[#313131]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <SectionHeading title="Education" />
        <div className="space-y-0">
          {resume.education.map((edu, index) => (
            <article
              key={`${edu.school}-${edu.graduated}`}
              className={`mb-12 border-b border-[#e8e8e8] pb-6 ${
                index === resume.education.length - 1 ? "border-b-0 mb-0" : ""
              }`}
            >
              <h3 className="font-serif text-[25px] leading-[30px] text-[#313131]">
                {edu.school}
              </h3>
              <p className="info mt-2 font-serif text-base italic leading-6 text-[#6e7881]">
                {edu.degree}
                <span className="mx-1">•</span>
                <span className="font-serif text-[17px] not-italic leading-6 text-[#313131]">
                  {edu.graduated}
                </span>
              </p>
            </article>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
