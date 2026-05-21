# Phase 1 — Polish & Ship

Goal: take the current site from "works locally" to "production-ready on Vercel at danogrodnik.com," with no embarrassing performance or a11y issues on first review.

Checkpoint before this phase: git tag `v0.1.0-pre-cleanup`.

---

## 1. Image optimization (biggest win) ✅

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

## 2. SEO & social metadata ✅

`layout.tsx` currently has only `title` + `description` + favicon. Need:

- [x] `metadata.openGraph` (title, description, url, siteName, locale, type=website, image)
- [x] `metadata.twitter` (card=summary_large_image, title, description, image)
- [x] `metadata.metadataBase` (`https://danogrodnik.com`)
- [x] `metadata.alternates.canonical`
- [x] `metadata.robots` (index, follow)
- [x] An OG image at `public/og-image.png` (1200×630 — `npm run generate-og`)
- [x] `src/app/robots.ts` (dynamic robots.txt)
- [x] `src/app/sitemap.ts` (dynamic sitemap.xml)

Acceptance: paste danogrodnik.com into LinkedIn/iMessage/Slack and get a rich preview.

---

## 3. Accessibility pass ✅

Quick wins from a manual review of the current components:

- [x] Hero: scroll link has `aria-label="Scroll to About section"`; GitHub link has descriptive `aria-label`
- [x] Nav: `aria-expanded`, `aria-controls`, `aria-label` on nav, `aria-current` on active link, Escape to close, focus first link when opened
- [x] Portfolio: `aria-label` per project card; decorative image `alt=""`; overlay `aria-hidden`
- [x] ParticleBackground: `aria-hidden` on container; `prefers-reduced-motion` static burst unchanged
- [x] Contact form: labels + `aria-busy` on submit; `role="status"` + `aria-live="polite"` for feedback; `autoComplete` on fields
- [x] Color contrast: contact/resume body text bumped to `#9aa5b0` / `#6e7881`
- [x] Skip link: "Skip to main content" as first focusable element; `<main id="main">`

Tool: run `npx @axe-core/cli http://localhost:3000` against the dev server before deploy.

Acceptance: axe clean, keyboard tab order is logical end-to-end, Lighthouse a11y score ≥ 95.

---

## 4. Performance polish ✅

- [x] Client components limited to `Nav`, `ParticleBackground`, `Contact` only; `Hero`, `About`, `Resume`, `Portfolio`, `Footer` are server components
- [x] Fonts via `next/font/google` (`EB_Garamond`, `display: "swap"`) — removes manual `<link>` and ESLint warning
- [x] Canvas skips draw work when tab hidden (`document.visibilityState !== "visible"`)
- [x] Portfolio `next/image` uses accurate `sizes` and 800×400 intrinsic dimensions for responsive srcset

Acceptance: Lighthouse perf ≥ 90 on mobile throttling.

---

## 5. Contact form end-to-end ✅ (code complete — manual DNS + Vercel env pending)

- [x] Resend API route with honeypot, time-trap, validation, per-IP rate limit (3 / 10 min)
- [x] `CONTACT_FROM_EMAIL` documented as `contact@mail.danogrodnik.com`
- [x] [DEPLOY.md](./DEPLOY.md) Step 0 (Resend + Namecheap) and [CONTACT_FORM_TEST.md](./CONTACT_FORM_TEST.md)
- [ ] **You:** Verify `mail.danogrodnik.com` in Resend + Namecheap DNS (DEPLOY.md Step 0)
- [ ] **You:** Set Vercel env vars on deploy (DEPLOY.md Step 2)
- [ ] **You:** Run test checklist on Preview URL (CONTACT_FORM_TEST.md)

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
