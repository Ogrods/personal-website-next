# Dan Ogrodnik Portfolio (Next.js 15)

Modern rebuild of [personal-website-react](https://github.com/Ogrods/personal-website-react), deployed on Vercel.

## Stack

- Next.js 15 (App Router) + TypeScript + Tailwind CSS v4
- `react-tsparticles` hero background (ported from legacy `Header.js`)
- Resend contact API (`/api/contact`)
- Vercel Analytics + Speed Insights

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables (Vercel)

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | API key from [Resend](https://resend.com) |
| `CONTACT_TO_EMAIL` | Inbox for form submissions (e.g. `Dan.Ogrodnik@gmail.com`) |
| `CONTACT_FROM_EMAIL` | Verified sender domain in Resend |

## Deploy to Vercel

1. Push this folder to a new GitHub repo (e.g. `portfolio-next`).
2. [vercel.com/new](https://vercel.com/new) → Import repo → Framework: Next.js.
3. Add env vars above → Deploy.
4. Optional: add custom domain `danogrodnik.com` in Vercel → Domains.

## Decommission Heroku

After the Vercel site is live and DNS points to Vercel:

```bash
heroku apps
heroku apps:info -a <your-app-name>
heroku apps:destroy -a <your-app-name>   # irreversible
```

Or scale to zero: `heroku ps:scale web=0 -a <your-app-name>`.

## Edit content

- Profile / nav: `src/content/site.ts`
- Resume: `src/content/resume.ts`
- Projects: `src/content/projects.ts`
- Images: `public/images/`
