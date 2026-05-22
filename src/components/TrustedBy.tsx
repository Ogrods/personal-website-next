import Image from "next/image";
import Reveal from "@/components/Reveal";
import { clientLogos } from "@/content/clients";

export default function TrustedBy() {
  const items = [...clientLogos, ...clientLogos];

  return (
    <Reveal
      as="section"
      aria-label="Trusted by"
      className="scroll-mt-20 border-y border-[#dfe3e3] bg-white py-12"
    >
      <div className="container-site">
        <p className="mb-8 text-center font-serif text-xs uppercase tracking-[0.28em] text-[#6e7881]">
          Trusted by
        </p>
        <div className="trusted-marquee-mask overflow-hidden">
          <ul className="trusted-marquee-track flex w-max items-center gap-12 md:gap-16">
            {items.map((client, i) => (
              <li key={`${client.name}-${i}`} className="shrink-0">
                {client.url ? (
                  <a
                    href={client.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block opacity-60 grayscale transition hover:opacity-90"
                    aria-label={client.name}
                  >
                    <Image
                      src={`/images/clients/${client.logo}`}
                      alt=""
                      width={160}
                      height={48}
                      className="h-10 w-auto max-w-[140px] object-contain md:h-12"
                    />
                  </a>
                ) : (
                  <Image
                    src={`/images/clients/${client.logo}`}
                    alt={client.name}
                    width={160}
                    height={48}
                    className="h-10 w-auto max-w-[160px] object-contain opacity-60 grayscale md:h-12"
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}
