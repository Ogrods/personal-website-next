import Image from "next/image";
import type { Project } from "@/types";

type PortfolioProps = {
  projects: Project[];
};

export default function Portfolio({ projects }: PortfolioProps) {
  return (
    <section
      id="portfolio"
      className="scroll-mt-20 bg-[#0f0f0f] py-20 text-[#ccc]"
    >
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-4 text-center font-serif text-4xl text-white">
          Check Out Some of My <span className="text-[#0762f9]">Works</span>.
        </h2>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group overflow-hidden rounded-lg border border-white/10 bg-[#151515] transition hover:border-[#0762f9]/50"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={`/images/portfolio/${project.image}`}
                  alt={project.title}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-white transition group-hover:text-[#0762f9]">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm text-[#999]">{project.category}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
