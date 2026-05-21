import Image from "next/image";
import { ExternalLink } from "lucide-react";
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
          title="Check Out Some of My Works."
          variant="muted"
          align="center"
        />

        <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-item group block"
            >
              <div className="item-wrap overflow-hidden bg-white transition-all duration-300 ease-in-out group-hover:shadow-lg">
                <div className="relative max-h-[200px] overflow-hidden">
                  <Image
                    src={`/images/portfolio/${project.image}`}
                    alt={project.title}
                    width={400}
                    height={200}
                    className="h-[200px] w-full object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="portfolio-overlay absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="flex h-[30px] w-[30px] items-center justify-center text-white">
                      <ExternalLink size={18} strokeWidth={2} />
                    </span>
                  </div>
                </div>
                <div className="portfolio-item-meta p-[18px]">
                  <h5 className="font-serif text-sm font-bold leading-[21px] text-[#313131]">
                    {project.title}
                  </h5>
                  <p className="mt-0 font-serif text-xs leading-[18px] text-[#6e7881]">
                    {project.category}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
