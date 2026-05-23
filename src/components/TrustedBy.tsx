import Image from "next/image";
import { clientLogos } from "@/content/clients";

export default function TrustedBy() {
  const items = [...clientLogos, ...clientLogos];

  return (
    <section
      aria-label="Trusted by"
      className="scroll-mt-[47px] border-y border-[#dfe3e3] bg-white py-12 md:scroll-mt-20"
    >
      <div className="container-site">
        <p className="mb-8 text-center font-serif text-xs uppercase tracking-[0.28em] text-[#6e7881]">
          Trusted by
        </p>
      </div>
      <div className="trusted-marquee-mask overflow-hidden">
        <ul className="trusted-marquee-track flex w-max items-center gap-10 md:gap-16">
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
                    className="h-9 w-auto max-w-[120px] object-contain md:h-12 md:max-w-[160px]"
                  />
                </a>
              ) : (
                <Image
                  src={`/images/clients/${client.logo}`}
                  alt={client.name}
                  width={160}
                  height={48}
                  className="h-9 w-auto max-w-[120px] object-contain opacity-60 grayscale md:h-12 md:max-w-[160px]"
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
