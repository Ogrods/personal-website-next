# Phase 2 — Complete

**Completed:** May 21, 2026
**Live site:** https://danogrodnik.com
**Repository:** https://github.com/Ogrods/personal-website-next.git
**Latest commit on `main`:** `93b0f86` — *Phase 2 portfolio polish: case study modal, client logos, motion, and nav fixes.*

## Shipped

| Area | Notes |
|------|-------|
| Section reorder | `Hero → MetricStrip → Portfolio → TrustedBy → About → Resume → Contact` puts proof above the fold |
| Animated metric strip | Scroll-triggered count-up via `requestAnimationFrame`; respects `prefers-reduced-motion` |
| FIRST case study modal | Portal-based, focus trap, Esc to close, body scroll lock; full overview / metrics / challenge / approach / dual-audience visuals / stack |
| Trusted by marquee | 7 client logos (Greystar, ASU, Starbucks, FIRST, Piper, Helios, Milton); auto-scroll with hover-pause and reduced-motion fallback |
| Scroll reveal | `useInView` + `Reveal` wrapper drives fade-up on About / Resume / Contact / Portfolio / Trusted by |
| Hero CTAs | Added LinkedIn button alongside Book-a-call and Download resume; matched hover treatments across resume + LinkedIn buttons |
| Skill compression | Resume skills consolidated from 5 buckets to 3 |
| Nav scroll-spy | `navLinks` order realigned to new DOM order; growing-underline hover/active state |
| Client logo asset pipeline | New `scripts/fix-logo-bg.mjs` (chroma-key + darken) + `optimize-images.mjs` produces WebP from user-supplied PNGs |
| Encoding cleanup | Fixed `+30–50 pt Lighthouse` mojibake on Alta Uptown tile |
| Next.js 16 forward-compat | `images.qualities` registered in `next.config.ts` |

## Architecture additions

- `src/lib/useInView.ts` — IntersectionObserver hook (one-shot or repeating)
- `src/components/Reveal.tsx` — generic scroll-reveal wrapper
- `src/components/TrustedBy.tsx` — marquee section
- `src/components/CaseStudyModal.tsx` — portal modal with focus management
- `src/content/clients.ts` — client logo registry
- `src/content/caseStudies.ts` — structured case study content (FIRST seeded)
- `src/types/index.ts` — `Project` extended with `featured`, `featuredBlurb`, `caseStudySlug`; new `CaseStudy` and `CaseStudyImage` types
- `scripts/fix-logo-bg.mjs` — pixel-level background removal + optional darken pass

## Pending — manual / deploy-time QA

- Live PageSpeed Insights pass; address any Performance / SEO / A11y dips
- Google Search Console — resubmit `sitemap.xml` after deploy
- Responsiveness sweep on live site at 320 / 768 / 1024 px (hero CTAs, marquee, modal, MetricStrip, Portfolio grid)
- Real-device test of FIRST case study modal (Esc, backdrop tap, focus trap, body scroll lock)

## Phase 3 backlog

- Piper Trust case study (modal + featured tile)
- Greystar / Alta Uptown case study (modal + featured tile)
- Lighthouse before/after screenshot artifacts (Piper, Helios, Alta, NYX) for interview reference
- LinkedIn full audit (separate track in `JOB_SEARCH_PLAN.html`)
