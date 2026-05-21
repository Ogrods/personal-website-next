# Deploy checklist

## 1. Push to GitHub

Create a new repo on GitHub (e.g. `portfolio-next`), then:

```powershell
cd "c:\Users\DanOg\Documents\My Docs\Coding Stuff\employment\portfolio"
git remote add origin https://github.com/Ogrods/portfolio-next.git
git add .
git commit -m "Rebuild portfolio on Next.js 15 for Vercel"
git push -u origin main
```

## 2. Import on Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import `Ogrods/portfolio-next` (or your repo name)
3. Framework: **Next.js** (auto-detected)
4. Root directory: `.` (default)
5. Add environment variables:
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL` = `Dan.Ogrodnik@gmail.com`
   - `CONTACT_FROM_EMAIL` = your verified Resend sender
6. Deploy

## 3. Custom domain (optional)

In Vercel project → **Settings** → **Domains**, add `danogrodnik.com` and update DNS at your registrar per Vercel instructions.

## 4. Decommission Heroku

After Vercel is live and DNS (if any) points to Vercel:

```bash
heroku login
heroku apps
heroku apps:info -a YOUR_APP_NAME
# Optional: keep as backup
heroku ps:scale web=0 -a YOUR_APP_NAME
# Or remove entirely:
heroku apps:destroy -a YOUR_APP_NAME
```
