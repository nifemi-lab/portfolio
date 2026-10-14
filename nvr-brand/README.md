# NVR Supply

A storefront prototype for **NVR**, a clothing label whose stated purpose is to
fund free education through the NVR Academy.

Static HTML, CSS and JavaScript. No build step, no framework, no dependencies
beyond Google Fonts. Runs from the filesystem or any static host.

> **No payment is processed in this project.** The bag produces an order you
> copy and send by DM or email. It is a design and front-end exercise, not a
> commerce backend.

## Why it looks the way it does

Everything follows `BRAND.md`, the brand bible:

| Rule | How it's applied |
|---|---|
| Void background + **one accent per piece** | Each collection owns exactly one accent, set via a single `--accent` custom property per card |
| Headlines: Space Grotesk, ALL CAPS, tight tracking | `h1`–`h3` and `.wordmark` |
| Body: Inter, sentence case | Default body copy |
| Data/labels: mono, uppercase, wide tracking | `.tag`, `.size`, `.card-price`, `.bag-count` |
| Never salesy | No countdowns, no "limited stock!", no discount language |
| Never ship something that doesn't fund the mission | The NVR tag line is on every order |

Accent tokens:

| Token | Hex | Collection |
|---|---|---|
| Bone | `#e6ecff` | VOID |
| Volt | `#c6f24e` | SIGNAL |
| Ultraviolet | `#a78bfa` | ORBIT |
| Ash | `#8b93a7` | STATIC |
| Blood orange | `#ff5c2b` | ASCENT |

## Files

```
nvr-brand/
  index.html      markup and the bag dialog
  css/brand.css   design tokens, layout, components
  js/catalog.js   collections, products, tiers, rules  (plain script, no modules)
  js/app.js       rendering, filters, bag, order builder, reveal-on-scroll
  img/            wordmark and mark
  BRAND.md        the brand bible this was built to
```

`catalog.js` is a plain script rather than an ES module on purpose — modules are
blocked by CORS on `file://`, and this project should work when opened straight
from disk.

## Behaviour

- **Bag** — add, change quantity, remove. Persists to `localStorage`
  (`nvr-supply-bag`) and survives reload. Degrades quietly if storage is
  unavailable (private browsing).
- **Checkout** — builds a plain-text order and copies it to the clipboard,
  falling back to `execCommand` if the async Clipboard API is denied or
  unavailable. The order is also shown in a textarea, so it can be selected and
  copied manually as a last resort.
- **Filters** — by collection, with correct `aria-pressed` state.
- **Sizes** — required before an item can be added; the add button stays
  disabled until one is picked.

## Accessibility

- Lighthouse **100** for accessibility, best practices and SEO; zero console errors.
- The bag is a labelled modal dialog: focus moves in on open, is trapped while
  open, returns to the trigger on close, and `Escape` dismisses it.
- Bag changes announce through an `aria-live` region.
- `prefers-reduced-motion` disables reveal animations and smooth scrolling.
- Scroll-reveal content is visible if JavaScript is unavailable (`no-js` class).

One deliberate deviation from the brand bible: the `.footnote` disclaimer uses
ash at 85% opacity rather than 70%. At its rendered size, 70% only reaches a
3.66:1 contrast ratio and fails WCAG AA; 85% clears it at 4.92:1.

## Placeholder imagery

Product tiles are drawn in CSS rather than stocked with photographs. Placeholder
photos of garments that don't exist would break the brand's own third rule.
Replace `.tile` with real imagery when there is real imagery.

## Contact placeholders

`CONTACT` in `js/catalog.js` holds `@nvr` and `orders@nvr.example`. Swap these
for real handles before showing this to anyone.