import { GitHubIcon, InstagramIcon, LinkedInIcon } from "@/components/icons";
import type { SocialLink } from "@/types";

const iconMap = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
} as const;

type FooterProps = {
  social: SocialLink[];
  name: string;
};

export default function Footer({ social, name }: FooterProps) {
  return (
    <footer className="border-t border-white/10 bg-[#0f0f0f] py-10 text-center text-[#888]">
      <ul className="mb-6 flex justify-center gap-6">
        {social.map((network) => {
          const Icon =
            iconMap[network.name as keyof typeof iconMap] ?? GitHubIcon;
          return (
            <li key={network.name}>
              <a
                href={network.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition hover:text-[#0762f9]"
                aria-label={network.name}
              >
                <Icon size={28} />
              </a>
            </li>
          );
        })}
      </ul>
      <p className="text-sm">
        © Copyright {new Date().getFullYear()} {name}
      </p>
    </footer>
  );
}
