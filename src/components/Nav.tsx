"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/content/site";

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

type NavProps = {
  name: string;
  bookingUrl: string;
};

export default function Nav({ name, bookingUrl }: NavProps) {
  const menuId = useId();
  const overlayRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [opaque, setOpaque] = useState(false);
  const [active, setActive] = useState("#home");
  const [mounted, setMounted] = useState(false);

  const closeMenu = () => setOpen(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu();
        toggleRef.current?.focus();
        return;
      }

      if (e.key === "Tab" && overlayRef.current) {
        const focusables = Array.from(
          overlayRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
        ).filter(
          (el) => !el.hasAttribute("disabled") && el.offsetParent !== null
        );
        if (focusables.length === 0) {
          e.preventDefault();
          return;
        }
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const activeEl = document.activeElement as HTMLElement | null;

        if (e.shiftKey && activeEl === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && activeEl === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const barBg =
    open || opaque
      ? "bg-[#0f0f0f]/95 backdrop-blur-sm"
      : "bg-transparent";

  const mobileOverlay =
    mounted && open
      ? createPortal(
          <div
            ref={overlayRef}
            id={menuId}
            className="nav-mobile-overlay md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Main menu"
          >
            <ul className="flex w-full max-w-sm flex-col items-center gap-1 py-8">
              {navLinks.map((link) => (
                <li key={link.href} className="w-full">
                  <a
                    href={link.href}
                    className={`nav-mobile-link nav-link block w-full py-4 text-center font-serif text-lg uppercase tracking-[0.22em] text-white transition-colors duration-200 hover:text-[#0762f9] ${
                      active === link.href ? "text-[#fe6928]" : ""
                    }`}
                    aria-current={active === link.href ? "page" : undefined}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero-primary mt-6"
              onClick={closeMenu}
            >
              Book a 15-min intro call
            </a>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <nav
        id="nav-wrap"
        aria-label="Main navigation"
        className={`fixed left-0 top-0 z-50 w-full font-serif transition-colors duration-300 ${barBg}`}
      >
        {/* Mobile bar */}
        <div className="relative mx-auto flex h-12 min-h-12 max-w-[1020px] items-center justify-between px-4 md:hidden">
          <a
            href="#home"
            className="nav-mobile-brand font-serif text-sm uppercase tracking-[0.18em] text-white transition-colors hover:text-[#0762f9]"
            onClick={closeMenu}
          >
            {name}
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="rounded p-2 text-white"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
          </button>
        </div>

        {/* Desktop links */}
        <div
          className={`relative mx-auto hidden max-w-[1020px] items-center justify-center px-4 md:flex ${
            opaque ? "bg-[#333]" : "bg-transparent"
          }`}
        >
          <ul className="flex min-h-12">
            {navLinks.map((link) => (
              <li key={link.href} className="inline-block h-12">
                <a
                  href={link.href}
                  className={`nav-link inline-block px-[13px] py-2 text-xs uppercase tracking-[0.25em] leading-8 text-white transition-colors duration-200 hover:text-[#0762f9] ${
                    active === link.href ? "text-[#fe6928]" : ""
                  }`}
                  aria-current={active === link.href ? "page" : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      {mobileOverlay}
    </>
  );
}
