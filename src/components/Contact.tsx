"use client";

import { FormEvent, useState } from "react";
import type { SiteProfile } from "@/types";

type ContactProps = {
  profile: SiteProfile;
};

type FormState = "idle" | "submitting" | "success" | "error";

export default function Contact({ profile }: ContactProps) {
  const [status, setStatus] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
        }),
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        throw new Error(data.error ?? "Failed to send message");
      }

      form.reset();
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong"
      );
    }
  }

  return (
    <section id="contact" className="scroll-mt-20 bg-[#151515] py-20 text-[#ccc]">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-4 text-center font-serif text-4xl text-white">
          Get In <span className="text-[#0762f9]">Touch</span>.
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center leading-7">
          {profile.contactMessage}
        </p>

        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm text-white">
                Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full rounded border border-white/20 bg-[#0f0f0f] px-4 py-3 text-white outline-none focus:border-[#0762f9]"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1 block text-sm text-white">
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded border border-white/20 bg-[#0f0f0f] px-4 py-3 text-white outline-none focus:border-[#0762f9]"
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="mb-1 block text-sm text-white"
              >
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                className="w-full rounded border border-white/20 bg-[#0f0f0f] px-4 py-3 text-white outline-none focus:border-[#0762f9]"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="mb-1 block text-sm text-white"
              >
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                className="w-full resize-y rounded border border-white/20 bg-[#0f0f0f] px-4 py-3 text-white outline-none focus:border-[#0762f9]"
              />
            </div>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="rounded border border-[#0762f9] px-8 py-3 text-sm uppercase tracking-widest text-white transition hover:bg-[#0762f9] disabled:opacity-60"
            >
              {status === "submitting" ? "Sending..." : "Submit"}
            </button>

            {status === "success" ? (
              <p className="text-green-400">
                Your message was sent. Thank you!
              </p>
            ) : null}
            {status === "error" ? (
              <p className="text-red-400">{errorMessage}</p>
            ) : null}
          </form>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Contact Details
            </h3>
            <p className="font-semibold text-white">{profile.name}</p>
            <p>
              {profile.address.city}, {profile.address.state}
            </p>
            <p>
              <a
                href={`mailto:${profile.email}`}
                className="text-[#0762f9] hover:underline"
              >
                {profile.email}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
