"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, BookOpen } from "lucide-react";
import CaseStudyModal from "@/components/CaseStudyModal";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { getCaseStudy } from "@/content/caseStudies";
import type { Project } from "@/types";

type PortfolioProps = {
  projects: Project[];
};

function ProjectCard({
  project,
  featured = false,
  delayMs = 0,
  onOpenCaseStudy,
}: {
  project: Project;
  featured?: boolean;
  delayMs?: number;
  onOpenCaseStudy?: () => void;
}) {
  const hasCaseStudy = Boolean(project.caseStudySlug && onOpenCaseStudy);
  const cardClass = `portfolio-card group block w-full border border-[#dfe3e3] bg-white text-left transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-lg ${
    featured ? "md:col-span-2" : ""
  }`;

  const inner = (
    <>
      <div
        className={`relative overflow-hidden bg-[#e8ecec] ${
          featured ? "aspect-[21/9] md:aspect-[2.4/1]" : "aspect-[16/9]"
        }`}
      >
        <Image
          src={`/images/portfolio/${project.image}`}
          alt={`Homepage screenshot of ${project.title} - ${project.category}`}
          width={1200}
          height={675}
          quality={90}
          className="h-full w-full object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.02]"
          sizes={
            featured
              ? "(max-width: 768px) 100vw, 66vw"
              : "(max-width: 768px) 100vw, 50vw"
          }
        />
      </div>

      <div className={`p-5 sm:p-6 ${featured ? "md:p-8" : ""}`}>
        {featured ? (
          <p className="mb-2 font-serif text-[11px] uppercase tracking-[0.2em] text-[#0762f9]">
            Featured · Current engagement
          </p>
        ) : null}
        <h3
          className={`font-serif font-bold leading-snug text-[#313131] ${
            featured ? "text-xl md:text-2xl" : "text-lg"
          }`}
        >
          {project.title}
        </h3>
        <p className="mt-1 font-serif text-sm text-[#6e7881]">{project.category}</p>

        {featured && project.featuredBlurb ? (
          <p className="mt-4 font-serif text-base leading-relaxed text-[#313131]">
            {project.featuredBlurb}
          </p>
        ) : null}

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

        {!featured ? (
          <p className="mt-3 font-serif text-sm leading-relaxed text-[#313131]">
            {project.outcome}
          </p>
        ) : null}

        <span
          className="mt-4 inline-flex items-center gap-1 font-serif text-xs uppercase tracking-[0.12em] text-[#0762f9] transition-colors group-hover:text-[#fe6928]"
          aria-hidden
        >
          {hasCaseStudy ? (
            <>
              <BookOpen size={14} strokeWidth={2} aria-hidden />
              Read case study
            </>
          ) : (
            <>
              View site
              <ArrowUpRight
                size={14}
                strokeWidth={2}
                className="transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden
              />
            </>
          )}
        </span>
      </div>
    </>
  );

  if (hasCaseStudy) {
    return (
      <Reveal as="div" delayMs={delayMs} className={featured ? "md:col-span-2" : ""}>
        <button
          type="button"
          className={cardClass}
          aria-label={`Open case study for ${project.title}`}
          onClick={onOpenCaseStudy}
        >
          {inner}
        </button>
      </Reveal>
    );
  }

  return (
    <Reveal
      as="a"
      delayMs={delayMs}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${project.title} - ${project.metric} (opens in new tab)`}
      className={cardClass}
    >
      {inner}
    </Reveal>
  );
}

export default function Portfolio({ projects }: PortfolioProps) {
  const [caseStudyOpen, setCaseStudyOpen] = useState(false);

  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const activeCaseStudy = featured?.caseStudySlug
    ? getCaseStudy(featured.caseStudySlug)
    : undefined;

  const handleCloseCaseStudy = () => setCaseStudyOpen(false);

  return (
    <>
      <Reveal as="section" id="portfolio" className="scroll-mt-20 bg-[#ebeeee] pb-[60px] pt-[90px]">
        <div className="container-site">
          <SectionHeading title="Selected Work" variant="muted" align="center" />
          <p className="-mt-6 mb-12 text-center font-serif text-sm leading-relaxed text-[#6e7881]">
            5+ years · 50+ launches · WordPress, Shopify, React
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            {featured ? (
              <ProjectCard
                project={featured}
                featured
                delayMs={0}
                onOpenCaseStudy={() => setCaseStudyOpen(true)}
              />
            ) : null}
            {rest.map((project, i) => (
              <ProjectCard key={project.title} project={project} delayMs={(i + 1) * 80} />
            ))}
          </div>
        </div>
      </Reveal>

      {activeCaseStudy ? (
        <CaseStudyModal
          open={caseStudyOpen}
          onClose={handleCloseCaseStudy}
          caseStudy={activeCaseStudy}
        />
      ) : null}
    </>
  );
}