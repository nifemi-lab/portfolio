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

> `BRAND.md` was updated to match, so both NVR properties now read from the
> same palette. Slate is deliberately kept off small text: at `#666` on
> obsidian it only reaches ~3.5:1 and fails WCAG AA.

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

## Pricing

Prices are in **Naira**, because that is what customers actually pay. The dollar
figure shown beneath is **derived at runtime** from a single constant:

```js
var NGN_PER_USD = 1500; // in js/catalog.js
```

Nothing is stored twice, so when the rate moves you change that one line and
every dollar equivalent on the site updates with it. Storing a separate `usd`
price per product would drift out of sync within a week.

| Piece | NGN | ~USD |
|---|---:|---:|
| SIGNAL/02 Hi-vis cap | ₦9,000 | ~$6 |
| STATIC/01 Glitch washed tee | ₦13,000 | ~$9 |
| ORBIT/02 Orbital print tee | ₦14,000 | ~$9 |
| VOID/01 Heavyweight tee | ₦15,000 | ~$10 |
| ASCENT/01 Numbered drop tee | ₦16,000 | ~$11 |
| ORBIT/01 Gradient long sleeve | ₦18,000 | ~$12 |
| STATIC/02 Noise sweat | ₦26,000 | ~$17 |
| VOID/03 Wide cargo pant | ₦28,000 | ~$19 |
| VOID/04 Baggy utility pant | ₦30,000 | ~$20 |
| VOID/02 Boxy hoodie | ₦32,000 | ~$21 |
| SIGNAL/01 Reflective shell | ₦38,000 | ~$25 |
| ASCENT/02 Limited fleece | ₦42,000 | ~$28 |

Naira shows on the card, in every bag line, in the running total, and in the
copied order. USD shows beneath each in a quieter weight so the real price leads.

## Size guide

Every product carries a **Size guide & measurements** button that opens a dialog
with a real measurement table in centimetres — chest, length and sleeve for
tops; waist, hip, inseam and leg opening for bottoms; head circumference for
the cap.

Each table states how it was measured (flat then doubled, relaxed waistband,
and so on) and notes the model is 183cm wearing M, so "M" means something.

The guide button is only rendered when a product actually has measurements for
every one of its sizes. A visitor whose browser still has an older `catalog.js`
cached simply doesn't see the button instead of clicking into a broken dialog.

> **The numbers are starting points, not measurements from real stock.** They
> follow industry-standard heavyweight streetwear specs so the guide is usable
> immediately, but measure an actual garment and correct `measurements` in
> `CATALOG` (`js/catalog.js`) before you sell. Every figure is editable in
> place.

## Payment: OPay transfer

There is no checkout gateway and no payment processor. The flow is:

1. Customer sends their order (WhatsApp, email, or copy).
2. NVR confirms stock, size and delivery by hand.
3. Customer transfers to the OPay number, sending the receipt.
4. NVR makes the piece and sends a dispatch update.

The **How you pay** section states this and shows the live details:

| Label | Value |
|---|---|
| Pay to | OPay |
| Account name | Monisola Omolabake Shodimu |
| OPay number | `8106285867` |

The number has a copy button. OPay receives to a phone number rather than a
classic account number, so the labels are configurable in `BANK` — if you ever
switch to a bank account, set `providerLabel` to `"Bank"` and `numberLabel` to
`"Account number"`.

`bankReady()` requires all three fields. If any is missing the site shows
"Transfer details are not published yet — ask on WhatsApp" rather than
rendering a half-filled block that could be paid to the wrong place.

## Enquiries

Customers can ask about a piece three ways:

- **Per product** — "Ask about this piece" on every card, opening WhatsApp with
  that product's code pre-filled (*"I have a question about VOID/04 (Baggy
  utility pant)"*).
- **Site-wide** — a floating "Ask about a piece" button, fixed to the
  bottom-right, available on every page at every scroll position. It hides
  while a dialog is open so it never covers the bag.
- **By email** — the bag drawer.

All WhatsApp links are built through one `whatsappNumber()` helper, so the
number is entered once.

## Order records (Supabase)

Every order is also written to a Supabase `orders` table, so you keep a record
even if someone abandons the WhatsApp chat.

It uses the **same Supabase project** as the JAMB Study tracker and NVR Coding
(project ref `mhfxmjaxexgwcyhkoyhz`) and the same public anon key. That key is
designed to ship in browser code; row-level security is what protects the data.

### One-time setup

**Until you do this, logging silently fails and WhatsApp and email carry on
working unchanged.** The customer sees "Sent. (Order not logged — database not
set up yet.)"

1. Open your Supabase project → **SQL Editor** → **New query**
2. Paste the whole of [`supabase.sql`](supabase.sql) and run it
3. Done — new orders appear immediately, and order tracking switches on

> `supabase.sql` also **tightens the admin policies**. Before, any signed-in
> Supabase user could read every order. It now matches on your Supabase account
> email — so **replace `REPLACE-WITH-YOUR-SUPABASE-EMAIL`** with the address
> you sign in to Supabase with. Until you do, nobody can read orders at all,
> which is safe but inconvenient for you.

To read them: Supabase → **Table editor** → `orders`. Or **Data** → **Orders**.

### What gets stored

| Column | Value |
|---|---|
| `reference` | quotable reference, e.g. `NVR-7K4Q` |
| `full_name`, `phone` | from the bag form, if the customer filled it in |
| `items` | JSONB — code, name, size, qty, price, line total |
| `item_count`, `subtotal` | integers and numeric, in naira |
| `channel` | `whatsapp` or `email` |
| `status` | `new` → `confirmed` → `made` → `shipped` → `done`, or `cancelled` |

`status` has a check constraint, so typos are rejected rather than silently
stored. There is no delete policy: orders are a record, cancel by status.

> The SQL grants `select`/`update` to any authenticated Supabase user. That is
> fine while the only account is yours. If you ever add customer accounts to
> this project, tighten those two policies first.

### Customer details

The bag asks for a name and phone number, both optional, remembered in
`localStorage` after the first time. Without them a logged order can't be
matched to a WhatsApp message — which is most of the point of logging.

Logging is fire-and-forget and can never block or delay the customer's order.

## Order tracking

A **Track your order** section where a customer enters their reference and the
phone number they gave, and sees what they bought, the total and where it has
got to — `Received` → `Confirmed` → `Being made` → `Dispatched` → `Delivered`,
or `Cancelled`.

No account needed. That is deliberate: the only question a clothing customer
actually asks is "where's my parcel", and this answers it without passwords,
email verification or recovery flows in front of a sale.

### Why this is a database function, not a query

A reference is only four characters — roughly a million combinations — so
letting anyone `select` rows by reference alone would expose the entire order
book. RLS cannot compare a submitted phone number against the stored one, so the
match has to happen inside the database.

`supabase.sql` creates `lookup_order(p_reference, p_phone)` as a
`SECURITY DEFINER` function: it returns a row **only** when both match. Phone
comparison strips non-digits, so `"0801 234 5678"` matches `"08012345678"`.
Execution is granted to `anon` only; the function returns nothing else.

Customer data is escaped on render — verified against injected markup.

Until `supabase.sql` has been run the endpoint answers 404 and the form says
*"Order tracking is not switched on yet. Message us on WhatsApp"* rather than
failing silently.

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
- **`CONTACT` is live** (WhatsApp + email). **`BANK` is live** (OPay).
- **Supabase is configured but the `orders` table does not exist yet.** Run
  `supabase.sql` once. Until then logging fails silently and nothing is lost —
  orders still arrive on WhatsApp.
- **People and logistics are described only where they're sourced.** The
  *How it works* copy comes from `BRAND.md` and the Figma board — garment
  weights, the boxy drop-shoulder cut, the division structure, the taglines. No
  names, suppliers, shipping times or return policy were invented. Two spots
  would be stronger with real detail: adding your name to *Who runs it*, and
  actual delivery areas and turnaround in *Sizing and delivery*. Both live in
  `HOW_BLOCKS` in `js/catalog.js`.
- **Catalogue is a placeholder range.** Prices are set at plausible Nigerian
  streetwear rates but are not your final pricing — move them freely in
  `CATALOG` in `js/catalog.js`.