# Deploy checklist

Do these in order. Resend DNS can be configured **before** the site goes live on Vercel — it only affects `mail.danogrodnik.com`, not your current Heroku site.

---

## Step 0 — Resend + Namecheap (contact form)

### 0a. Resend account

1. Sign in at [resend.com](https://resend.com).
2. **Domains** → **Add Domain** → enter `mail.danogrodnik.com`.
3. Copy the DNS records Resend shows (keep this tab open).
4. **API Keys** → **Create API Key** → scope **Sending access** on `mail.danogrodnik.com`.
5. Save the `re_...` key for Vercel (Step 2).

### 0b. Namecheap DNS

1. [Namecheap](https://www.namecheap.com) → **Domain List** → `danogrodnik.com` → **Manage** → **Advanced DNS**.
2. **Add New Record** for each row from Resend (exact host/value from Resend dashboard):

| Type | Host (Namecheap) | Value |
|------|------------------|-------|
| TXT | `mail` | *(SPF / verification string from Resend)* |
| CNAME | `resend._domainkey.mail` | *(DKIM target from Resend)* |
| TXT | `_dmarc.mail` | *(DMARC from Resend, e.g. `v=DMARC1; p=none;`)* |

3. TTL: **Automatic** → **Save**.
4. Back in Resend → **Verify DNS Records**. Usually &lt;5 minutes on Namecheap; can take up to an hour.

These records do **not** change where `danogrodnik.com` points for the website.

### 0c. Local dev (optional)

```powershell
cd "c:\Users\DanOg\Documents\My Docs\Coding Stuff\employment\portfolio"
copy .env.example .env.local
# Edit .env.local with your re_... key and verified FROM address
```

---

## Step 1 — Push to GitHub

Create a new repo on GitHub (e.g. `portfolio-next`), then:

```powershell
cd "c:\Users\DanOg\Documents\My Docs\Coding Stuff\employment\portfolio"
git remote add origin https://github.com/Ogrods/portfolio-next.git
git push -u origin main
```

(If `origin` already exists, use `git push`.)

---

## Step 2 — Import on Vercel

1. [vercel.com/new](https://vercel.com/new) → Import your repo.
2. Framework: **Next.js** (auto-detected).
3. Root directory: `.` (default).
4. **Environment Variables** (Production + Preview + Development):

| Name | Value |
|------|-------|
| `RESEND_API_KEY` | `re_...` from Step 0a |
| `CONTACT_TO_EMAIL` | `Dan.Ogrodnik@gmail.com` |
| `CONTACT_FROM_EMAIL` | `Dan Ogrodnik <contact@mail.danogrodnik.com>` |

5. **Deploy**.

---

## Step 3 — Test contact form on Preview URL

Before changing web DNS, run the checklist in [CONTACT_FORM_TEST.md](./CONTACT_FORM_TEST.md) against your Vercel **Preview** deployment URL.

---

## Step 4 — Custom domain (web)

1. Vercel project → **Settings** → **Domains** → add `danogrodnik.com` (and `www` if desired).
2. At **Namecheap** → **Advanced DNS**, update **web** records per Vercel’s instructions (typically A/CNAME for `@` and `www`). This is separate from the `mail` subdomain records in Step 0b.
3. Wait for HTTPS to show green in Vercel.

---

## Step 5 — Decommission Heroku

After the new site is live and you’ve received a real contact form submission:

```bash
heroku login
heroku apps
# Keep as backup for 7–14 days:
heroku ps:scale web=0 -a YOUR_APP_NAME
# Or remove entirely:
heroku apps:destroy -a YOUR_APP_NAME
```

---

## Step 6 — Decommission EmailJS (optional)

On the old CRA site, EmailJS used `service_2mscrzb`. After launch, disable that service or delete the EmailJS account.

---

## Tag release

```bash
git tag -a v1.0.0-launch -m "Portfolio live on Vercel"
git push origin v1.0.0-launch
```
