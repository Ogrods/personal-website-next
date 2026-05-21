# Phase 1 — Polish & Ship

Goal: take the current site from "works locally" to "production-ready on Vercel at danogrodnik.com," with no embarrassing performance or a11y issues on first review.

Checkpoint before this phase: git tag `v0.1.0-pre-cleanup`.

---

## 1. Image optimization (biggest win)

Current portfolio thumbnails are unoptimized PNGs straight from the live site:

| File | Size |
|------|------|
| `uptown.png` | 2.4 MB |
| `fionna.png` | 2.2 MB |
| `nyx.png` | 1.4 MB |
| `piper.png` | 1.2 MB |
| `helios.jpg` | 139 KB |
| `station-preview.jpg` | 178 KB |

Total > 7 MB shipping for one section is unacceptable. Options:

- **A. Convert source files to `.webp`/`.avif`** in the repo (one-time), keep `.png` originals only if needed for portfolio archive
- **B. Lean on `next/image` more aggressively** — it already does runtime resizing when deployed on Vercel, but only if we give it good `sizes` props and an actual `width`/`height` that matches the rendered slot (200px tall, not 200px width)
- **C. Drop intrinsic resolution before commit** — re-export at ~800×500 max, 80% quality

Recommended order: do C (re-export source files), then verify A is unnecessary (`next/image` will auto-serve AVIF on supported browsers).

Acceptance: Lighthouse "properly sized images" + "modern image formats" pass; total portfolio section payload < 500 KB.

---

## 2. SEO & social metadata

`layout.tsx` currently has only `title` + `description` + favicon. Need:

- [ ] `metadata.openGraph` (title, description, url, siteName, locale, type=website, image)
- [ ] `metadata.twitter` (card=summary_large_image, title, description, image)
- [ ] `metadata.metadataBase` (`https://danogrodnik.com`)
- [ ] `metadata.alternates.canonical`
- [ ] `metadata.robots` (index, follow)
- [ ] An OG image at `public/og-image.png` (1200×630, name + subtitle on a dark gradient — can generate via canvas or just compose in Figma)
- [ ] `public/robots.txt`
- [ ] `public/sitemap.xml` *or* dynamic `src/app/sitemap.ts` (single-page site, but still useful)

Acceptance: paste danogrodnik.com into LinkedIn/iMessage/Slack and get a rich preview.

---

## 3. Accessibility pass

Quick wins from a manual review of the current components:

- [ ] Hero: confirm the `ChevronDown` "scroll" button is a real `<a href="#about">` (already is) with `aria-label="Scroll to About"`
- [ ] Nav: mobile menu button needs `aria-expanded`, `aria-controls`, and proper focus management when toggled
- [ ] Portfolio: anchor cards already wrap the whole card — verify each has a meaningful accessible name; right now the `<a>` contains an `<Image alt>` plus heading text, which screen readers will read in order — could tighten with an `aria-label` per project ("Visit {title} — {category}")
- [ ] ParticleBackground: confirm `aria-hidden="true"` on the canvas and `prefers-reduced-motion` path still produces a static, non-blank background
- [ ] Contact form: every input has a `<label htmlFor>`; submit button announces loading state via `aria-busy` or visible text swap; error and success messages get `role="status"` (polite live region)
- [ ] Color contrast: spot-check `#838c95` body text on `#000524` About section, and the muted text on the white Resume section
- [ ] Skip link: add a "Skip to main content" link as the first focusable element

Tool: run `npx @axe-core/cli http://localhost:3000` against the dev server before deploy.

Acceptance: axe clean, keyboard tab order is logical end-to-end, Lighthouse a11y score ≥ 95.

---

## 4. Performance polish

- [ ] Audit which components actually need to be client components. `ParticleBackground` and `Nav` (scroll-spy) clearly do. Confirm `Hero`, `Contact`, others are server-rendered where possible.
- [ ] Verify `font-display: swap` is in effect via the Google Fonts URL (it is — `&display=swap` is set)
- [ ] Confirm canvas particle system pauses or skips work when the tab is hidden (`document.visibilityState`)
- [ ] Trim Tailwind output — Tailwind v4 is JIT by default, but run a build and eyeball the CSS payload

Acceptance: Lighthouse perf ≥ 90 on mobile throttling.

---

## 5. Contact form end-to-end

- [ ] Verify the Resend domain (likely `danogrodnik.com` once it points to Vercel — or a subdomain like `mail.danogrodnik.com`)
- [ ] Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` in Vercel project env (Production + Preview + Development)
- [ ] Add a honeypot field + basic rate limit (`@vercel/firewall` or a simple in-memory limiter) — the current route is wide open
- [ ] Test from a deployed Preview URL with a real submission

Acceptance: a submission from the live site hits the inbox within 30s; spam/bot submissions are rejected silently.

---

## 6. Deploy

Follow `DEPLOY.md`. Suggested order:

1. Push portfolio repo to GitHub (`Ogrods/portfolio-next` or similar)
2. Import on Vercel, set env vars, deploy
3. Validate Preview URL end-to-end (contact form, all anchor links, image loading, mobile)
4. Add custom domain `danogrodnik.com` in Vercel → Domains
5. Update DNS at registrar per Vercel's instructions
6. Once DNS propagates and HTTPS is green: `heroku ps:scale web=0 -a <old-app>` (keep the app, just stop it — easy rollback if needed for 7–14 days, then `heroku apps:destroy`)

Acceptance: `https://danogrodnik.com` resolves to the new site, contact form delivers, old Heroku dyno is scaled to zero.

---

## Out of scope for Phase 1 (Phase 2+ candidates)

- Payload CMS or any other content backend (deferred per earlier decision)
- Blog / writing section
- Project case-study detail pages
- Dark/light theme toggle (currently dark-only by design)
- i18n
- Animations on scroll (deliberately holding off — particles already carry the visual interest)

---

## Suggested execution order

1. Image optimization (largest visible payload win, no design risk)
2. SEO metadata + OG image (cheap, high return on first impression)
3. A11y pass + axe run
4. Perf review + Lighthouse run
5. Contact form hardening
6. Push to GitHub, deploy to Vercel, validate Preview
7. Domain cutover + Heroku wind-down

Tag at the end: `v1.0.0-launch`.
