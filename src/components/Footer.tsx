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
    <footer className="relative bg-[#191919] pb-12 pt-12 text-center text-sm text-[#b5c0cb]">
      <ul className="social-links mb-8 flex justify-center gap-10">
        {social.map((network) => {
          const Icon =
            iconMap[network.name as keyof typeof iconMap] ?? GitHubIcon;
          return (
            <li key={network.name} className="inline-block">
              <a
                href={network.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8f9aa8] transition hover:text-white"
                aria-label={network.name}
              >
                <Icon size={30} />
              </a>
            </li>
          );
        })}
      </ul>
      <p className="copyright text-[#b5c0cb]">
        © Copyright {new Date().getFullYear()} {name}
      </p>
    </footer>
  );
}
