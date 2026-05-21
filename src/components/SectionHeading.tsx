type SectionHeadingProps = {
  title: string;
  variant?: "light" | "dark" | "muted";
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeading({
  title,
  variant = "dark",
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";

  if (variant === "light") {
    return (
      <h2
        className={`mb-3 font-serif text-[22px] leading-[30px] text-white ${alignClass} ${className}`}
      >
        {title}
      </h2>
    );
  }

  if (variant === "muted") {
    return (
      <h2
        className={`mb-12 font-serif text-[17px] uppercase tracking-[0.1em] text-[#95A3A3] ${alignClass} ${className}`}
      >
        {title}
      </h2>
    );
  }

  return (
    <h2
      className={`mb-8 font-serif text-lg uppercase tracking-[0.1em] text-[#313131] ${alignClass} ${className}`}
    >
      <span className="inline-block border-b-[3px] border-[#0762f9] pb-1.5">
        {title}
      </span>
    </h2>
  );
}
