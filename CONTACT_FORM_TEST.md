# Contact form test checklist

Run these against a **Vercel Preview** (or Production) URL **after** Step 0–2 in [DEPLOY.md](./DEPLOY.md) are complete. Local `npm run dev` works only if `.env.local` has a valid `RESEND_API_KEY` and verified `CONTACT_FROM_EMAIL`.

## Prerequisites

- [ ] `mail.danogrodnik.com` shows **Verified** in Resend → Domains
- [ ] Vercel env vars set: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`

---

## Tests

| # | Test | Expected |
|---|------|----------|
| 1 | Valid submission (wait ≥2s after page load, fill all required fields) | HTTP 200, success message, email in inbox within ~30s; **Reply** goes to visitor’s address |
| 2 | Fill honeypot `website` via devtools, submit | HTTP 200, success UI, **no** email sent |
| 3 | Submit within 2s of page load | HTTP 200, success UI, **no** email sent |
| 4 | Four valid submissions within 10 minutes (same network) | 4th returns **429**, message about too many submissions |
| 5 | Submit with empty name or message | HTTP **400**, clear error text |
| 6 | Message longer than 5000 characters | HTTP **400** |
| 7 | Invalid email (e.g. `not-an-email`) | HTTP **400** |
| 8 | Resend dashboard → Emails | Latest message status **Delivered** (not Bounced) |

---

## Quick API checks (optional)

With Preview URL `https://YOUR-PREVIEW.vercel.app`:

```powershell
# Valid shape (replace URL; will send real email if env is configured)
curl -X POST https://YOUR-PREVIEW.vercel.app/api/contact `
  -H "Content-Type: application/json" `
  -d '{"name":"Test","email":"you@example.com","message":"Hello","startedAt":' + ([DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds() - 5000) + '}'

# Honeypot (should NOT send email)
curl -X POST https://YOUR-PREVIEW.vercel.app/api/contact `
  -H "Content-Type: application/json" `
  -d '{"name":"Bot","email":"bot@test.com","message":"spam","website":"filled","startedAt":9999999999999}'
```

---

## Sign-off

- [ ] All 8 table rows passed
- [ ] Ready for `danogrodnik.com` web DNS cutover (DEPLOY.md Step 4)
