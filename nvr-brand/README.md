# NVR Supply

A storefront prototype for **NVR**, a clothing label whose stated purpose is to
fund free education through the NVR Academy.

Static HTML, CSS and JavaScript. No build step, no framework, no dependencies
beyond Google Fonts. Runs from the filesystem or any static host.

> **No payment is processed in this project.** The bag produces an order you
> send by WhatsApp or email. It is a design and front-end exercise, not a
> commerce backend.

## Brand system

Built to the **Figma brand board**, which supersedes the older `BRAND.md` where
the two disagree.

### Palette

| Token | Hex | Role |
|---|---|---|
| Obsidian | `#0a0a0a` | Primary background |
| Bone | `#f5f5ee` | Type and logo |
| Volt | `#c7ff00` | **The only accent** — CTAs and SIGNAL only |
| Ash | `#bbbbbb` | Supporting text |
| Slate | `#666666` | Rules and borders only — never small text |

Volt is the single accent and is reserved. Collections are told apart by the
neutral ramp (bone / volt / ash) rather than by five competing hues, so no two
accents ever land on the same piece.

> `BRAND.md` specifies a different palette (Void `#040817`, Bone `#e6ecff`,
> Volt `#c6f24e`, plus Ultraviolet and Cyan). The Figma board wins here. Slate
> is deliberately kept off small text: at `#666` on obsidian it only reaches
> ~3.6:1 and fails WCAG AA.

### Logo

| File | Use |
|---|---|
| `img/logo.svg` | `NVR` wordmark — header, favicon fallback |
| `img/logo-mark.svg` | The N-with-volt-diamond mark — footer, favicon |
| `img/logo-lockup.svg` | Mark + wordmark + `NEVER STOP.` — hero |

The mark's `N` is drawn as an explicit SVG path rather than set as text, so the
volt diamond stays locked to the letterform in every renderer with no font
dependency. Verified by pixel sampling: both counters empty, stems and diagonal
solid, diamond `#c7ff00`.

### Type

Space Grotesk for the logo and headlines (all caps, tight tracking), Inter for
body, JetBrains Mono for data and labels (uppercase, wide tracking — the
"techwear" tell).

### Divisions and taglines

From the board: **NVR Supply** (clothing & products), **NVR Academy** (learning
platform), **NVR Foundation** (impact & community). Taglines: *Never stop.* ·
*Wear the mission.* · *Built for those still becoming.* · *Learn. Build. Repeat.*

## Files

```
nvr-brand/
  index.html      markup and the bag dialog
  css/brand.css   design tokens, layout, components
  js/catalog.js   collections, products, divisions, taglines, contact config
  js/app.js       rendering, filters, bag, order builder, order channels
  img/            wordmark, mark, lockup
  supabase.sql    orders table + RLS policies
  BRAND.md        the earlier brand bible (superseded on palette)
  README.md
```

`catalog.js` is a plain script rather than an ES module on purpose — modules are
blocked by CORS on `file://`, and this project should work when opened from disk.

## How an order reaches you

Three channels, all in the bag drawer. Channels with nowhere to send are hidden
rather than left broken, and a warning appears if **neither** is configured, so
the bag can never dead-end.

1. **WhatsApp** — `https://wa.me/<number>?text=<order>`. Opens WhatsApp with the
   order pre-typed. No backend, no cost. Same pattern as the welding app.
2. **Email** — `mailto:` with subject and body pre-filled.
3. **Supabase** — every order is also `INSERT`ed into an `orders` table so you
   keep a written record even if a customer abandons the chat.

Each order gets a quotable reference like `NVR-7K4Q`. Logging is fire-and-forget
and can never block the customer's order path.

### Current state

WhatsApp and email are **live**:

```js
var CONTACT = { whatsapp: '+2348106285867', email: 'gafarianimation@gmail.com' };
```

Supabase logging is **off** (`supabaseUrl` empty) — orders still arrive by
WhatsApp and email, they just aren't also stored in a database.

The number is pasted with a `+`, which is fine: `whatsappNumber()` strips
non-digits before building the link, and prepends `234` to a bare 10-digit
local number. So any paste format produces a valid `wa.me` URL.

Both channels are real `<a href>` links rather than buttons, so they support
right-click "copy link", middle-click, and show the destination in the status
bar. With an empty bag they carry `aria-disabled="true"` and do nothing.

### Turning on Supabase logging (optional)

1. Run `supabase.sql` once in the Supabase SQL editor.
2. Fill in `SUPABASE` in `js/catalog.js`:

```js
var SUPABASE = { supabaseUrl: 'https://xxx.supabase.co', supabaseAnonKey: 'eyJ...' };
```

Use the **anon** key. Never put the `service_role` key in a public file.

> The SQL grants `select`/`update` to any authenticated user. That is fine while
> the only account is yours. If you ever add customer accounts to this project,
> tighten those two policies first.

## Behaviour

- **Bag** — add, change quantity, remove. Persists to `localStorage`
  (`nvr-supply-bag`) and survives reload. Degrades quietly if storage is
  unavailable (private browsing).
- **Copy order** — Clipboard API, falling back to `execCommand` when the async
  API is denied or unavailable, with a select-and-copy textarea as the last
  resort.
- **Filters** — by collection, with correct `aria-pressed` state.
- **Sizes** — required before an item can be added.

## Accessibility

Lighthouse **100** for accessibility, best practices and SEO; zero console
errors.

- The bag is a labelled modal dialog: focus moves in on open, is trapped while
  open, returns to the trigger on close, and `Escape` dismisses it.
- Bag changes announce through an `aria-live` region.
- `prefers-reduced-motion` disables reveal animations and smooth scrolling.
- Scroll-reveal content stays visible without JavaScript (`no-js` class).

One deliberate deviation from the board: the `.footnote` disclaimer uses ash at
85% opacity rather than 70%. At its rendered size 70% only reaches 3.66:1 and
fails AA; 85% clears it at 4.92:1.

## Known gaps

- **Product tiles are drawn in CSS**, not photographed. Placeholder photos of
  garments that don't exist would break the brand's own third rule. Replace
  `.tile` with real imagery when there is real imagery.
- **`CONTACT` is live** (WhatsApp + email). Supabase logging is still off.
- **Three blocks in "How it works" are scaffold** — *Who runs it*, *How it's
  made*, *Sizing and delivery*. They render with a dashed volt border as a
  visible reminder. Real people, production and logistics were deliberately not
  invented; fill them in `HOW_BLOCKS` in `js/catalog.js`.
- **Catalogue and prices are placeholders.** VOID/04 at $128 is the only piece
  carried over from the Figma prototype.