"use client";

import { FormEvent, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import type { SiteProfile } from "@/types";

type ContactProps = {
  profile: SiteProfile;
};

type FormState = "idle" | "submitting" | "success" | "error";

function stripCrLf(value: string): string {
  return value.replace(/[\r\n]/g, "");
}

export default function Contact({ profile }: ContactProps) {
  const startedAtRef = useRef<number>(Date.now());
  const [status, setStatus] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const subjectRaw = String(formData.get("subject") ?? "");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: stripCrLf(subjectRaw),
          message: formData.get("message"),
          website: formData.get("website"),
          startedAt: startedAtRef.current,
        }),
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        throw new Error(data.error ?? "Failed to send message");
      }

      form.reset();
      startedAtRef.current = Date.now();
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong"
      );
    }
  }

  return (
    <Reveal as="section"
      id="contact"
      className="scroll-mt-20 bg-[#191919] pb-[102px] pt-24 text-[#b5c0cb]"
    >
      <div className="container-site">
        <div className="section-head mb-10">
          <h2 className="mb-1.5 font-serif text-lg uppercase tracking-[0.2em] text-[#ebeeee]">
            Get In Touch.
          </h2>
          <p className="max-w-3xl font-serif text-xl leading-9 text-[#b5c0cb]">
            {profile.contactMessage}
          </p>
          <p className="mt-6">
            <a
              href={profile.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Book a 15-min intro call
            </a>
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-12">
          <form onSubmit={handleSubmit} className="relative lg:col-span-8" noValidate>
            {/* Honeypot: visually hidden, not in tab order; no aria-hidden on focusable */}
            <label htmlFor="contact-website-hp" className="honeypot-field">
              Leave this field blank
              <input
                id="contact-website-hp"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </label>

            <div className="mb-10 flex flex-col gap-1 sm:flex-row sm:items-start">
              <label
                htmlFor="name"
                className="mb-0 w-full shrink-0 font-serif text-[15px] font-bold leading-6 text-[#ebeeee] sm:w-[26%]"
              >
                Name <span className="text-[#0762f9]">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                maxLength={120}
                autoComplete="name"
                className="field-input sm:w-[65%]"
              />
            </div>
            <div className="mb-10 flex flex-col gap-1 sm:flex-row sm:items-start">
              <label
                htmlFor="email"
                className="mb-0 w-full shrink-0 font-serif text-[15px] font-bold leading-6 text-[#ebeeee] sm:w-[26%]"
              >
                Email <span className="text-[#0762f9]">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                maxLength={200}
                autoComplete="email"
                className="field-input sm:w-[65%]"
              />
            </div>
            <div className="mb-10 flex flex-col gap-1 sm:flex-row sm:items-start">
              <label
                htmlFor="subject"
                className="mb-0 w-full shrink-0 font-serif text-[15px] font-bold leading-6 text-[#ebeeee] sm:w-[26%]"
              >
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                maxLength={200}
                autoComplete="off"
                className="field-input sm:w-[65%]"
              />
            </div>
            <div className="mb-10 flex flex-col gap-1 sm:flex-row sm:items-start">
              <label
                htmlFor="message"
                className="mb-0 w-full shrink-0 font-serif text-[15px] font-bold leading-6 text-[#ebeeee] sm:w-[26%]"
              >
                Message <span className="text-[#0762f9]">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                maxLength={5000}
                rows={8}
                className="field-input min-h-[220px] resize-y sm:w-[65%]"
              />
            </div>
            <div className="sm:pl-[26%]">
              <button
                type="submit"
                disabled={status === "submitting"}
                aria-busy={status === "submitting"}
                className="btn-submit"
              >
                {status === "submitting" ? "Sending..." : "Submit"}
              </button>
            </div>

            <div role="status" aria-live="polite" aria-atomic="true">
              {status === "success" ? (
                <p
                  id="message-success"
                  className="mt-6 bg-[#0f0f0f] px-6 py-6 text-[#0762f9] sm:ml-[26%] sm:w-[65%]"
                >
                  Your message was sent, thank you!
                </p>
              ) : null}
              {status === "error" ? (
                <p
                  id="message-warning"
                  className="mt-6 bg-[#0f0f0f] px-6 py-6 text-[#d72828] sm:ml-[26%] sm:w-[65%]"
                >
                  {errorMessage}
                </p>
              ) : null}
            </div>
          </form>

          <div className="lg:col-span-4">
            <h3 className="mb-1.5 font-serif text-base font-bold leading-6 text-[#ebeeee]">
              Contact Details
            </h3>
            <p className="font-bold text-[#ebeeee]">{profile.name}</p>
            <p>
              {profile.address.city}, {profile.address.state}
            </p>
            <p>
              <a
                href={`mailto:${profile.email}`}
                className="text-[#0762f9] transition hover:text-white"
              >
                {profile.email}
              </a>
            </p>
            {profile.phone ? (
              <p>
                <a
                  href={`tel:${profile.phone.replace(/[^0-9+]/g, "")}`}
                  className="text-[#0762f9] transition hover:text-white"
                >
                  {profile.phone}
                </a>
              </p>
            ) : null}
            <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
              {profile.social.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0762f9] transition hover:text-white"
                >
                  {link.name === "github"
                    ? "GitHub"
                    : link.name === "linkedin"
                      ? "LinkedIn"
                      : link.name === "instagram"
                        ? "Instagram"
                        : link.name}
                </a>
              ))}
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}


