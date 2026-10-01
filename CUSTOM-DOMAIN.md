# Custom domain — availability + setup runbook

Checked via RDAP on **1 October 2026** ("available" = not currently registered;
re-check at checkout, since registrations can change by the minute).

## What's free right now

| Domain | Status | Rough price/yr | Note |
|---|---|---|---|
| **nifemi.dev** | available | $12–15 | **Recommended** — your name, developer TLD, short |
| nifemilab.com | available | $10–12 | Matches the "Nifemi Labs" Supabase org |
| ogiehe.com | available | $10–12 | Full surname option |
| nifemilab.dev | available | $12–15 | |
| nifemi.co | available | $25–30 | |
| nifemi.me | available | $15–20 | |
| nifemi.design / nifemilab.io | available | $25–40 | |
| nifemi.com | **taken** | — | |
| nifemi.ng, nifemilab.com.ng, ogiehe.com.ng | available | varies | Local-option backup |
| jambtracker.com, jambstudytracker.com | available | $10–12 | Could be a dedicated app domain later |

I can't purchase a domain for you — buying takes a payment card on the
registrar's site and should be in **your** name anyway. Everything else below
is ready to go the moment you've bought one.

## After you buy (order matters)

### 1. Tell me the domain
I'll push the one-line `CNAME` file to the repo root (GitHub Pages reads it and
sets the custom domain automatically). Nothing else in the code changes —
all links are already relative.

### 2. Add DNS at your registrar
For **`nifemi.dev`** (substitute your domain):

| Type | Host | Value |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `nifemi-lab.github.io` |

### 3. Verify + activate in GitHub
1. Repo **Settings → Pages → Custom domain** shows the domain from the `CNAME`.
2. GitHub first asks you to prove ownership: it shows a **TXT** record
   (`_github-pages-challenge.<yourdomain>`) — add it to your DNS, come back,
   press **Refresh/Save**. This only happens once.
3. After "DNS check successful", tick **Enforce HTTPS** (a certificate is
   issued automatically, usually within 15–60 minutes).

### 4. What the URLs become
A custom domain is always served from the **root**, so the `/portfolio/`
prefix disappears:

- Portfolio: `https://nifemi.dev/`
- Study app: `https://nifemi.dev/jamb-study/`
- `nifemi-lab.github.io/portfolio/` keeps working in parallel.

`.dev` is on the browser HSTS preload list, so it **must** be HTTPS-only —
GitHub Pages handles that for you, so no extra work.

### 5. Small follow-up (I'll do it on request)
Once the domain is live I'd update the hardcoded links in `fiverr-profile.md`,
the portfolio footer/about links, and the Fiverr profile links section to the
new address.

## Buying tips
- Cheapest: **Cloudflare Registrar** (at-cost) or **Porkbun**; **Namecheap** is
  the familiar middle option. Avoid auto-add-ons (ID protection is usually
  worth ~$2, privacy is free at Cloudflare/Porkbun).
- Buy it under your own email/password manager — never under a client's or
  agency account.
- Re-confirm `nifemi.dev` at checkout before paying; RDAP data can lag.
