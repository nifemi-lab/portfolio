# Fiverr gig images

Ready-to-upload artwork for the three gigs in `fiverr-profile.md`.
Every PNG is exactly **1280 × 769** (Fiverr's recommended gig image size).

## Title cards (designed)

| File | Gig | Headline |
|---|---|---|
| `gig1.png` | 1. Responsive website with HTML, CSS & JS | Clean, fast, responsive websites |
| `gig2.png` | 2. Fix bugs and errors in HTML, CSS & JS | Your broken page, working again |
| `gig3.png` | 3. Convert Figma to clean HTML and CSS | Your design, pixel-perfect in code |

Sources: `gig1.html` / `gig2.html` / `gig3.html` + `cards.css` (same brand tokens as the
portfolio: `#0a0c11` background, `#7b9cff → #64f0c7` gradient, Space Grotesk + Inter).

## Portfolio screenshots

| File | Shows |
|---|---|
| `shot-dashboard.png` | JAMB Study Tracker dashboard with demo data (stats, timer, plan) |
| `shot-coalhouse.png` | Coalhouse restaurant site — food gallery (top of page) |
| `shot-coalhouse2.png` | Coalhouse restaurant site — "The Whole Family, One Long Table" section |
| `shot-welding.png` | Uncle's Welding Works hero (builder badge edited out) |

## Suggested gallery per gig

- **Gig 1:** `gig1.png` → `shot-coalhouse2.png` → `shot-dashboard.png`
- **Gig 2:** `gig2.png` → `shot-welding.png` → `shot-coalhouse.png`
- **Gig 3:** `gig3.png` → `shot-dashboard.png` → `shot-coalhouse2.png`

## Regenerating

Title cards (headless Chrome, exact size):

```
chrome --headless=new --window-size=1280,769 --hide-scrollbars \
  --virtual-time-budget=12000 --screenshot=gigN.png http://localhost:8000/fiverr-images/gigN.html
```

Screenshots (needs Node 22+; starts a CDP-driven Chrome for exact viewport control):

```
# start Chrome once:
chrome --headless=new --remote-debugging-port=9333 --user-data-dir=%TEMP%\chrome-cdp-profile \
  --hide-scrollbars --window-size=1280,769 about:blank

# then:
node shot-cdp.mjs <url> <out.png> 1280 769 6000 [scrollY]
```

The dashboard shot seeds demo data first via `shot-seed.html?demo` (that page refuses to
touch existing data unless `?demo` is passed). It writes `jamb_study_db_v1::me` on the
current origin, so only run it against a throwaway browser profile.
