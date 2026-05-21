"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/content/site";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [opaque, setOpaque] = useState(false);

  useEffect(() => {
    const onScroll = () => setOpaque(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass =
    "block px-4 py-3 text-xs uppercase tracking-[0.2em] text-white/90 transition hover:text-[#0762f9] md:inline-block md:py-0";

  return (
    <nav
      id="nav-wrap"
      className={`fixed left-0 top-0 z-50 w-full transition-colors duration-300 ${
        opaque ? "bg-[#333]/95 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:justify-center">
        <button
          type="button"
          className="rounded p-2 text-white md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        <ul
          className={`${
            open
              ? "absolute left-0 top-full w-full border-t border-white/10 bg-[#333] py-2 md:static md:flex md:w-auto md:gap-2 md:border-0 md:bg-transparent md:py-0"
              : "hidden md:flex md:gap-2"
          }`}
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
