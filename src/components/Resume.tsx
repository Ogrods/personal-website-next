import type { ResumeContent } from "@/types";

type ResumeProps = {
  resume: ResumeContent;
};

function parseLevel(level: string): number {
  return parseInt(level.replace("%", ""), 10) || 0;
}

export default function Resume({ resume }: ResumeProps) {
  return (
    <section id="resume" className="scroll-mt-20 bg-[#151515] py-20 text-[#ccc]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <h2 className="mb-8 font-serif text-4xl text-white">
              <span className="text-[#0762f9]">Education</span>
            </h2>
            <div className="space-y-8">
              {resume.education.map((edu) => (
                <article key={`${edu.school}-${edu.graduated}`}>
                  <h3 className="text-xl font-semibold text-white">
                    {edu.school}
                  </h3>
                  <p className="text-[#0762f9]">
                    {edu.degree} • {edu.graduated}
                  </p>
                  {edu.description ? (
                    <p className="mt-2 leading-7">{edu.description}</p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-8 font-serif text-4xl text-white">
              <span className="text-[#0762f9]">Work</span>
            </h2>
            <div className="space-y-8">
              {resume.work.map((job) => (
                <article key={`${job.company}-${job.years}`}>
                  <h3 className="text-xl font-semibold text-white">
                    {job.company}
                  </h3>
                  <p className="text-[#0762f9]">
                    {job.title} • {job.years}
                  </p>
                  <p className="mt-2 leading-7">{job.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="mb-4 font-serif text-4xl text-white">
            <span className="text-[#0762f9]">Skills</span>
          </h2>
          <div className="mb-8 max-w-3xl space-y-4 leading-7">
            {resume.skillMessage.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {resume.skills.map((skill) => {
              const width = parseLevel(skill.level);
              return (
                <div key={skill.name}>
                  <div className="mb-2 flex justify-between text-sm text-white">
                    <span>{skill.name}</span>
                    <span>{skill.level}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded bg-[#333]">
                    <div
                      className="h-full rounded bg-[#0762f9]"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
