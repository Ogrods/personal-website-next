"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/content/site";

export default function Nav() {
  const menuId = useId();
  const menuRef = useRef<HTMLUListElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [opaque, setOpaque] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => {
      setOpaque(window.scrollY > 100);

      const sections = navLinks
        .map((l) => document.querySelector(l.href))
        .filter(Boolean) as Element[];

      const scrollPos = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && el.getBoundingClientRect().top + window.scrollY <= scrollPos) {
          setActive(navLinks[i].href);
          break;
        }
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const firstLink = menuRef.current?.querySelector("a");
    firstLink?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <nav
      id="nav-wrap"
      aria-label="Main navigation"
      className={`fixed left-0 top-0 z-50 w-full font-serif text-xs uppercase tracking-[0.25em] transition-colors duration-300 ${
        opaque ? "bg-[#333]" : "bg-transparent"
      }`}
    >
      <div className="relative mx-auto flex max-w-[1020px] items-center justify-center px-4">
        <button
          ref={toggleRef}
          type="button"
          className="absolute left-4 top-3 rounded p-2 text-white md:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
        </button>

        <ul
          ref={menuRef}
          id={menuId}
          className={`${
            open
              ? "absolute left-0 top-full w-full border-t border-white/10 bg-[#333] py-2 md:static md:flex md:w-auto md:border-0 md:bg-transparent md:py-0"
              : "hidden min-h-12 md:flex"
          }`}
        >
          {navLinks.map((link) => (
            <li key={link.href} className="inline-block h-12">
              <a
                href={link.href}
                className={`inline-block px-[13px] py-2 leading-8 text-white transition-colors duration-200 hover:text-[#0762f9] ${
                  active === link.href ? "text-[#fe6928]" : ""
                }`}
                aria-current={active === link.href ? "page" : undefined}
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
