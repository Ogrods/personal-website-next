# Dan Ogrodnik Portfolio (Next.js 15)

Modern rebuild of [personal-website-react](https://github.com/Ogrods/personal-website-react), targeted at Vercel.

## Stack

- Next.js 15 (App Router) + Turbopack dev server
- TypeScript + Tailwind CSS v4
- Custom HTML Canvas hero particle system (`src/components/ParticleBackground.tsx`)
- `lucide-react` for utility icons; custom SVGs for social icons (`src/components/icons.tsx`)
- Resend contact API (`src/app/api/contact/route.ts`)
- Vercel Analytics + Speed Insights
- Typography: EB Garamond via Google Fonts

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | API key from [Resend](https://resend.com) |
| `CONTACT_TO_EMAIL` | Inbox for form submissions (e.g. `Dan.Ogrodnik@gmail.com`) |
| `CONTACT_FROM_EMAIL` | Verified sender domain in Resend |

See `.env.example`.

## Deploy to Vercel

1. Push this folder to a new GitHub repo (e.g. `portfolio-next`).
2. [vercel.com/new](https://vercel.com/new) → Import repo → Framework: Next.js (auto-detected).
3. Add env vars above → Deploy.
4. Add custom domain `danogrodnik.com` under Vercel → Domains.

Full checklist: `DEPLOY.md`.

## Edit content

| What | Where |
|------|-------|
| Profile / nav | `src/content/site.ts` |
| Resume (work, skills, education) | `src/content/resume.ts` |
| Portfolio projects | `src/content/projects.ts` |
| Images | `public/images/` (project thumbnails in `public/images/portfolio/`) |
| Resume PDF | `public/dan-ogrodnik-resume.pdf` |

## Project structure

```
src/
  app/
    api/contact/route.ts   # Resend handler
    layout.tsx             # Fonts, Analytics, Speed Insights
    page.tsx               # Single-page composition
    globals.css            # Tailwind + design tokens + utilities
  components/
    Hero.tsx               # Hero + ParticleBackground
    ParticleBackground.tsx # Canvas particle system (radial emission, color trails)
    Nav.tsx                # Sticky nav with scroll-spy
    About.tsx, Resume.tsx, Portfolio.tsx, Contact.tsx, Footer.tsx
    SectionHeading.tsx     # Shared heading w/ light/dark/muted variants
    icons.tsx              # Custom social SVG icons
  content/                 # Static site data (typed)
  types/                   # Shared TypeScript types
```

## Roadmap

- `PHASE1.md` / `PHASE1_COMPLETE.md` — initial Next.js rebuild + Vercel launch
- `PHASE2_COMPLETE.md` — case study modal, Trusted by marquee, motion, nav fixes (current)
- Phase 3 backlog: additional case studies (Piper, Greystar), LinkedIn audit, ongoing content updates
