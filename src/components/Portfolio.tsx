import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import type { Project } from "@/types";

type PortfolioProps = {
  projects: Project[];
};

export default function Portfolio({ projects }: PortfolioProps) {
  return (
    <section
      id="portfolio"
      className="scroll-mt-20 bg-[#ebeeee] pb-[60px] pt-[90px]"
    >
      <div className="container-site">
        <SectionHeading
          title="Selected Work"
          variant="muted"
          align="center"
        />
        <p className="-mt-6 mb-12 text-center font-serif text-sm leading-relaxed text-[#6e7881]">
          5+ years · 50+ launches · WordPress, Shopify, React
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${project.title} — ${project.metric} (opens in new tab)`}
              className="portfolio-card group block border border-[#dfe3e3] bg-white transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-[#e8ecec]">
                <Image
                  src={`/images/portfolio/${project.image}`}
                  alt=""
                  width={1200}
                  height={675}
                  quality={90}
                  className="h-full w-full object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div className="p-5 sm:p-6">
                <h3 className="font-serif text-lg font-bold leading-snug text-[#313131]">
                  {project.title}
                </h3>
                <p className="mt-1 font-serif text-sm text-[#6e7881]">
                  {project.category}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2 gap-y-2">
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="inline-block bg-[#eef0f0] px-2 py-0.5 font-serif text-[11px] uppercase tracking-wide text-[#313131]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <span className="font-serif text-xs font-semibold text-[#0762f9] md:ml-auto">
                    {project.metric}
                  </span>
                </div>

                <p className="mt-3 font-serif text-sm leading-relaxed text-[#313131]">
                  {project.outcome}
                </p>

                <span
                  className="mt-4 inline-flex items-center gap-1 font-serif text-xs uppercase tracking-[0.12em] text-[#0762f9] transition-colors group-hover:text-[#fe6928]"
                  aria-hidden
                >
                  View site
                  <ArrowUpRight size={14} strokeWidth={2} aria-hidden />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
