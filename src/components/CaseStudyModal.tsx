"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import type { CaseStudy } from "@/types";

type CaseStudyModalProps = {
  open: boolean;
  onClose: () => void;
  caseStudy: CaseStudy;
};

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "textarea:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export default function CaseStudyModal({
  open,
  onClose,
  caseStudy,
}: CaseStudyModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement as HTMLElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      closeRef.current?.focus();
    }, 0);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "Tab" && panelRef.current) {
        const focusables = Array.from(
          panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
        ).filter(
          (el) => !el.hasAttribute("disabled") && el.offsetParent !== null
        );
        if (focusables.length === 0) {
          e.preventDefault();
          return;
        }
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;

        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus?.();
    };
  }, [open, onClose]);

  if (!mounted || !open) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const node = (
    <div
      className="cs-modal-root"
      data-state="open"
      role="presentation"
      onMouseDown={handleBackdropClick}
    >
      <div className="cs-modal-backdrop" aria-hidden />

      <div
        ref={panelRef}
        className="cs-modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <header className="cs-modal-header">
          <div className="min-w-0 pr-10">
            <p className="font-serif text-[11px] uppercase tracking-[0.22em] text-[#0762f9]">
              {caseStudy.eyebrow}
            </p>
            <h2
              id={titleId}
              className="mt-1 font-serif text-lg font-bold leading-snug text-[#313131] sm:text-xl"
            >
              {caseStudy.title}
            </h2>
            <p className="mt-1 font-serif text-sm text-[#6e7881]">
              {caseStudy.role}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="cs-modal-close"
            onClick={onClose}
            aria-label="Close case study"
          >
            <X size={22} strokeWidth={1.5} aria-hidden />
          </button>
        </header>

        <div className="cs-modal-body">
          <div className="relative aspect-[16/9] overflow-hidden bg-[#e8ecec]">
            <Image
              src={`/images/portfolio/${caseStudy.heroImage.src}`}
              alt={caseStudy.heroImage.alt}
              width={1200}
              height={675}
              className="h-full w-full object-cover object-top"
              sizes="(max-width: 768px) 100vw, 720px"
            />
          </div>

          <p className="mt-6 font-serif text-base leading-relaxed text-[#313131]">
            {caseStudy.overview}
          </p>

          <ul className="mt-4 flex flex-wrap gap-2">
            {caseStudy.metrics.map((metric) => (
              <li
                key={metric}
                className="rounded-sm bg-[#eef0f0] px-3 py-1 font-serif text-sm text-[#313131]"
              >
                {metric}
              </li>
            ))}
          </ul>

          <section className="mt-8">
            <h3 className="font-serif text-sm font-bold uppercase tracking-[0.14em] text-[#313131]">
              The challenge
            </h3>
            <p className="mt-3 font-serif text-base leading-relaxed text-[#6e7881]">
              {caseStudy.challenge}
            </p>
          </section>

          <section className="mt-8">
            <h3 className="font-serif text-sm font-bold uppercase tracking-[0.14em] text-[#313131]">
              The approach
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 font-serif text-base leading-relaxed text-[#6e7881]">
              {caseStudy.approach.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          {caseStudy.dualAudience ? (
            <section className="mt-8">
              <h3 className="font-serif text-sm font-bold uppercase tracking-[0.14em] text-[#313131]">
                {caseStudy.dualAudience.heading}
              </h3>
              <p className="mt-3 font-serif text-base leading-relaxed text-[#6e7881]">
                {caseStudy.dualAudience.body}
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {caseStudy.dualAudience.images.map((img) => (
                  <figure
                    key={img.src}
                    className="overflow-hidden border border-[#dfe3e3] bg-white"
                  >
                    <div className="relative aspect-[1024/500] bg-[#e8ecec]">
                      <Image
                        src={`/images/portfolio/${img.src}`}
                        alt={img.alt}
                        width={1024}
                        height={500}
                        className="h-full w-full object-cover object-top"
                        sizes="(max-width: 640px) 100vw, 320px"
                      />
                    </div>
                  </figure>
                ))}
              </div>
              <p className="mt-3 text-center font-serif text-sm italic text-[#6e7881]">
                {caseStudy.dualAudience.caption}
              </p>
            </section>
          ) : null}

          <section className="mt-8">
            <h3 className="font-serif text-sm font-bold uppercase tracking-[0.14em] text-[#313131]">
              Stack
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {caseStudy.stack.map((tech) => (
                <li
                  key={tech}
                  className="inline-block bg-[#eef0f0] px-2.5 py-1 font-serif text-sm text-[#313131]"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <footer className="cs-modal-footer">
          <a
            href={caseStudy.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-block text-center"
          >
            Visit live site
          </a>
          <button
            type="button"
            className="font-serif text-sm uppercase tracking-[0.12em] text-[#6e7881] transition hover:text-[#313131]"
            onClick={onClose}
          >
            Close
          </button>
        </footer>
      </div>
    </div>
  );

  return createPortal(node, document.body);
}
