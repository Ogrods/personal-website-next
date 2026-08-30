import Image from "next/image";
import { clientLogos, type ClientLogo } from "@/content/clients";

/** Pad so one marquee half stays wider than typical viewports. */
function buildLoopSet(logos: ClientLogo[]): ClientLogo[] {
  const minItems = 12;
  const out: ClientLogo[] = [];
  while (out.length < minItems) {
    out.push(...logos);
  }
  return out;
}

function LogoSet({
  logos,
  inert,
}: {
  logos: ClientLogo[];
  /** Duplicate half for seamless loop — no AT / no duplicate links */
  inert?: boolean;
}) {
  return (
    <ul
      className="trusted-marquee-set flex shrink-0 items-center gap-10 pe-10 md:gap-16 md:pe-16"
      aria-hidden={inert || undefined}
    >
      {logos.map((client, i) => {
        // Only the first occurrence of each logo in the live set is a link.
        const isFirstPass = i < clientLogos.length;
        const showLink = !inert && isFirstPass && Boolean(client.url);

        return (
          <li
            key={`${client.name}-${i}`}
            className="flex h-9 w-[100px] shrink-0 items-center justify-center md:h-12 md:w-[140px]"
          >
            {showLink ? (
              <a
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full w-full items-center justify-center opacity-60 grayscale transition hover:opacity-90"
                aria-label={client.name}
              >
                <Image
                  src={`/images/clients/${client.logo}`}
                  alt=""
                  width={160}
                  height={48}
                  className="h-full w-auto max-w-full object-contain"
                  sizes="140px"
                />
              </a>
            ) : (
              <span className="flex h-full w-full items-center justify-center opacity-60 grayscale">
                <Image
                  src={`/images/clients/${client.logo}`}
                  alt={inert || !isFirstPass ? "" : client.name}
                  width={160}
                  height={48}
                  className="h-full w-auto max-w-full object-contain"
                  sizes="140px"
                />
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default function TrustedBy() {
  const loopSet = buildLoopSet(clientLogos);

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
        <div className="trusted-marquee-track flex w-max">
          <LogoSet logos={loopSet} />
          <LogoSet logos={loopSet} inert />
        </div>
      </div>
    </section>
  );
}
