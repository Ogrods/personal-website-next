const metrics = [
  { value: "50+", label: "production launches" },
  { value: "100+", label: "Greystar properties on a shared theme" },
  { value: "30–50pt", label: "avg. Lighthouse Performance / SEO / A11y lift" },
  { value: "5+ yrs", label: "shipping WordPress & Shopify in production" },
] as const;

export default function MetricStrip() {
  return (
    <section
      aria-label="Career highlights"
      className="border-y border-white/10 bg-[#0f0f0f] py-10 text-center"
    >
      <div className="container-site">
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => (
            <li key={m.label}>
              <p className="font-serif text-[clamp(2rem,5vw,2.75rem)] font-semibold leading-none text-white">
                {m.value}
              </p>
              <p className="mt-2 font-serif text-sm leading-snug text-[#9aa5b0]">
                {m.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
