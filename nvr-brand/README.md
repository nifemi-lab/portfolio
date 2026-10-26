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
  index.html        markup and the bag dialog
  lagos.html        The Lagos Collection index (20 pieces, WhatsApp enquiries)
  bottoms.html      Bottoms & Shorts index (25 pieces, departments)
  jorts.html        Jorts Collection index (25 pieces, departments)
  admin.html        team console (owner / staff / co-seller)
  setup.html        one-click copier for both SQL files
  css/brand.css     design tokens, layout, components
  css/range.css     shared numbered-range layout (Lagos, Bottoms, Jorts)
  css/admin.css     console desk, review queues, order board
  js/garments.js    photo resolver + numbered "Photo on request" plate
  js/catalog.js     collections, products, divisions, taglines, contact config
  js/app.js         rendering, filters, bag, order builder, order channels
  js/admin.js       session, roles, data loading, console rendering
  img/products/     drop real photographs in here (see its own README)
  img/              wordmark, mark, lockup
  supabase.sql      storefront tables + RLS policies
  supabase-team.sql team roles + role-based RLS (run after supabase.sql)
  BRAND.md          the earlier brand bible (superseded on palette)
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

Supabase is configured too (`SUPABASE` in `js/catalog.js`), so an order is
written to the database as well as sent by WhatsApp or email.

The number is pasted with a `+`, which is fine: `whatsappNumber()` strips
non-digits before building the link, and prepends `234` to a bare 10-digit
local number. So any paste format produces a valid `wa.me` URL.

Both channels are real `<a href>` links rather than buttons, so they support
right-click "copy link", middle-click, and show the destination in the status
bar. With an empty bag they carry `aria-disabled="true"` and do nothing.

### Turning on Supabase logging (optional)

1. Open `setup.html` and click **Copy SQL**. It loads `supabase.sql` and
   `supabase-team.sql` and copies them as one script. Paste into the Supabase SQL
   editor and run.
2. Fill in `SUPABASE` in `js/catalog.js`:

```js
var SUPABASE = { supabaseUrl: 'https://xxx.supabase.co', supabaseAnonKey: 'eyJ...' };
```

Use the **anon** key. Never put the `service_role` key in a public file.

> `setup.html` fetches the two `.sql` files, so it has to be opened through a web
> server. Double-clicking it shows an error with the local-server command instead
> of a half-empty box.

Access is not granted to "any authenticated user". It is granted by role through
`public.team` — see [Team console](#team-console).

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
3. Paste the whole of [`supabase-team.sql`](supabase-team.sql) and run it
4. Done — new orders appear immediately, and order tracking switches on

`setup.html` does steps 2 and 3 for you: it loads both files and copies them as
one script.

> The owner email is baked into both files (`ogiehenifemi@gmail.com`) and is
> also the bootstrap owner in `public.team`. If you sign in to Supabase with a
> different address, change it in both files before running them — otherwise
> nobody can read orders or open the console. That fails closed, not open.

To read them: Supabase → **Table editor** → `orders`. Or use the console.

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

> Read and update are limited to the console team by `supabase-team.sql`. A
> customer account, if you ever add one, gets nothing.

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

## Selling with NVR

A **Sell with NVR** section where outside sellers apply. Curated, not open:
nothing is listed until you approve it.

### Why a form and not a marketplace

Curation only became expensive when it was unstructured — a seller messages
you and you interrogate them one question at a time. The form asks for
everything needed to judge, up front, so a submission arrives finished:

- name, phone, city, handle, payout number
- brand, garment, size, condition (dropdown), asking price, notes
- whether they have sold through NVR before

Photos stay on **WhatsApp**, deliberately. Hosting them would mean a bucket,
resizing, moderation queues and storage — for a flow you already run. The form
asks for exactly four: front, back, **care label**, **brand label**. The last
two are the anti-counterfeit check, and let you judge authenticity and
condition without a call.

Every application gets a reference like `SLR-4K9P` so photos and replies stay
matched.

### Commission

```js
var SELLING = { commissionPct: 15 };
```

The seller names their price; NVR lists it and the buyer pays NVR. The
difference is the commission. 15% covers curation, photography, the storefront
and handling without making the fee worth arguing over on a small piece.

When the `sellers` and `listings` tables do not exist yet, submitting the form
does not fail silently — it builds the whole application as a pre-filled
WhatsApp message so nobody loses what they typed.

### Payout ledger

`payouts` is not optional. When a buyer pays NVR, the seller's share is a
**liability, not income**. Without a row per order recording gross, commission,
net and whether it has been paid, that money goes untracked and eventually gets
paid twice.

`lookup_seller_balance(reference, phone)` lets a seller check what they're owed
without an account — same reference-plus-phone pattern as order tracking,
aggregating only their own rows.

> Because NVR holds customer money before paying sellers, this is a real
> business with obligations. Get the registration right and check CACPC and
> tax position before running it at volume.

### Storefront: NVR pieces and community pieces together

One grid, two origins, and a badge that says which is which on every single
card — **NVR** or **Sold by @handle**. A buyer must never have to guess whether
a piece came from the studio or from someone else, because "curated by NVR"
only means something if it is distinguishable.

Filters gained **NVR made** and **Community** alongside the collections.

A seller listing appears only when it is `status = 'listed'` **and** has a
`list_price`. Until you approve it *and* price it there is nothing to sell, so
it stays invisible. `supabase.sql` also gives `anon` select access to
`listings` only where `status in ('listed','sold')`, so pending work is never
reachable from the browser even if someone asks for it directly.

### Pricing

NVR publishes **one clean price**. The seller's asking price is a floor, not a
displayed number, and the difference between floor and shelf price is the
commission. Buyers never see a fee and never see the seller quoted a lower
figure.

NVR's own pieces run through `charmPrice()` — round to `x,900` — so ₦15,000
displays as ₦14,900. It never applies to a seller's agreed price.

> `priceRow(list, wasBefore)` only ever produces a "was" price when
> `wasBefore` is a genuine prior price. Inventing a reference price to make a
> discount look larger is false advertising, and now that NVR holds customer
> money that is a real exposure. No markdown is currently displayed anywhere.

## Photography

There is no stock imagery and no AI-generated garment. Until a real photograph
exists, a product tile shows a **numbered plate** — the piece code split into
prefix and number, set in the collection accent, plus a **Photo on request**
label bottom-right.

The site never draws a garment. An outline of "a hoodie" is not a photograph of
*the* hoodie, and a shopper can mistake it for one. A numbered plate reads as a
catalogue entry and can't be mistaken for the product, which is the honest
option while the photograph is missing.

The ranges are handled differently: Lagos, Bottoms & Shorts and the Jorts
Collection each get a page showing the **full, uncropped studio sheet** with a
numbered index beside it. Sheet cells are only a few hundred pixels wide, so
cutting them into product cards would produce blurry, upscaled images. The sheet
stays whole and every number has its own WhatsApp ask instead.

### Dropping in a real photo

Save a file as `img/products/<product-id>.jpg` and it appears. No code change.

```
img/products/void-05.jpg   →   VOID/05, the heavyweight polo
```

`.jpg`, `.png` and `.webp` are all tried in turn, then a seller's stored
`photoUrl`, and finally the numbered plate. `img/products/README.md` has the
full product-id table and how to shoot each one.

`PHOTOS_LIVE` in `js/garments.js` is `false` while no photos exist. That is
what stops the site firing one 404 per product on every page load for files
that were never going to be there. **Flip it to `true` when you commit your
first real photo** and every product starts looking for its own.

### Seller uploads

The other half of the cold start. Sellers photographing the garment they
actually own solves it without a stock library or a licensing question,
because the picture is guaranteed to be that exact piece.

`initPhotos()` handles drag-and-drop or file picking, up to 6 photos, 8MB
each, JPEG/PNG/WebP. Type, size and count are all checked in the browser before
anything is uploaded, and rejected files are named back to the seller. iPhone
HEIC is refused rather than silently failing — most browsers cannot display it.

Uploaded files go to a **private** `listing-photos` bucket under the seller's
reference. The bucket is deliberately not public: approved photos are served
via signed URLs issued at approval time, so a pending applicant's pictures are
never publicly reachable and there is no permanent URL to scrape.

## NVR Studio (premium)

Premium sells **work, not attention**. It unlocks:

| | |
|---|---|
| **NVR photography** | We shoot the piece and they get the files |
| **First access to drops** | New pieces reach premium sellers first |
| **Featured, by hand** | One slot a week, picked by a person |
| **Lower commission** | 10% instead of 15% |

It unlocks **nothing about position**. Nothing sorts by tier — verified: NVR's own
twelve pieces still lead the grid, and seller items stay in listing order
regardless of tier. A premium item gets a `Shot by NVR` badge under the origin
badge, which states who did the work, not how much they paid.

The featured slot lives in a `featured` table with `picked_by` recorded, and
its read policy only exposes a row inside its window and only while the
underlying listing is still live. There is no rank score and no auction.

> **If this ever becomes "highest bidder wins", stop.** The promise that NVR
> curates the shop is the only reason a marketplace is worth more than a
> WhatsApp group. Paying for position makes that promise untrue, and the whole
> tier stops making sense.

### Not purchasable yet

`PREMIUM.priceNaira` is `null`, and the CTA reads *"NVR Studio — enquire"*
linking to WhatsApp. That is deliberate: **OPay has no recurring billing.**
Subscriptions need Paystack or Flutterwave, which need KYC and take real time
to approve. A "Buy premium" button that silently fails, or worse, a
hand-managed renewal list in a spreadsheet, is worse than no button at all.

Set `priceNaira` once the rails exist and the CTA switches itself to show the
price.

## Team console

`admin.html` — one console, three roles, enforced in the database rather than
only hidden in the page.

The page is laid out like a shift desk, not a database admin. A role-aware
**Today** panel says what needs attention, then the same six areas follow:

| Area | Owner | Staff | Co-seller |
|---|---|---|---|
| **Today** | whole shop, money included | new orders, pieces to price, work in progress | own pieces and money |
| **Sellers** | applications and the directory, payout account included | approved/paused directory, no payout account | no |
| **Listings** | price, list, decline | price, list, decline | own pieces, read-only |
| **Orders** | five-stage board | same board | no |
| **Payouts** | grouped by seller, mark paid | no | own history |
| **Team** | roster, roles, seller links | no | no |

| Role | Sees | Can change |
|---|---|---|
| **Owner** | everything | sellers, listings, orders, payouts, team |
| **Staff** | approved sellers, listings, orders | price and publish listings, move order status |
| **Co-seller** | own listings and own payouts | nothing — it is a read-only view of their account |

### How the desk works

- **Today** counts what is waiting, not everything ever loaded. Staff see
  new orders, pieces to price and orders in progress; the owner also sees
  applications and money owed; a co-seller sees own pieces and what is owed.
- **Sellers** — applications arrive as review cards with phone, handle and
  payout destination. The decision queue runs oldest first, so nothing gets
  buried. Approving is one click. The directory below lists approved and
  paused sellers.
- **Listings** — a pending piece is a price card. The same oldest-first queue
  keeps the shelf clear. The shelf input recalculates seller net and NVR cut
  as you type, and listing is refused when the seller would clear less than
  their floor. Recent decisions sit underneath.
- **Orders** — five lanes from **new** to **done**, with back and next actions.
  The board wraps to three columns on smaller laptops, two on tablets and one
  on phones, so a stage is never pushed off-screen. Cancel is available only
  before **shipped**, needs a second click, and cancelled orders move to a
  drawer.
- **Money out** — grouped per seller with open money first. Mark paid also
  needs a second click; paid history stays in place as the record.
- **Team** — each member gets a permission line, a role control and, for
  co-sellers, a linked seller. Your own role is locked, the last owner cannot
  be demoted or removed, and removal needs a second click. If `public.team`
  is missing, the console names the SQL file to run instead of showing a form
  that cannot save.

Roles live in `public.team`, keyed by email. Two things follow from that:

- the console hides sections a role has no business in, and
- `supabase-team.sql` backs it with RLS, so the same restriction applies to
  anyone calling the API directly. Hiding a table in CSS is not security.

### Staff can see sellers without seeing payout accounts

Staff need the seller's name, phone and city to judge an application. They do
not need the OPay number. Reading the `sellers` table directly would hand it
over, so staff read `public.sellers_directory` — a view that omits `payout_to`.
Only the owner reads the real table.

### Adding someone

1. Supabase → **Authentication → Users → Add user**, with the email they will
   sign in with.
2. Sign in to `admin.html` as the owner, open **Team**, enter that email and
   pick a role card. Each card says what that role can see and change.
3. A co-seller must be linked to their seller row, or the console says so and
   shows them nothing until it is. The link is part of the same Team row.

An email in `public.team` is not login credentials — both must exist. Until
`supabase-team.sql` has been run, **Team** shows a setup note naming that file
and keeps the rest of the console owner-only.

### There is no admin key

The page uses the same **anon** key as the storefront and signs in through
Supabase Auth. Every read and write is filtered by RLS, keyed to the role in
`public.team`. There is no `service_role` key in any file, and no bypass.
Someone who signs up on their own gets the "No console access" panel and
nothing else.

The page is `noindex, nofollow`. The storefront header links it as **Team
login**, so staff can find it without being sent a URL by hand.

### The seller floor cannot be quietly broken

`shelfFor(floor)` rounds the shelf price **up** to the next hundred, because
rounding down would leave the seller short of what they agreed to. A ₦30,000
floor becomes ₦35,300 at 15% commission, paying the seller ₦30,005.

If you type a lower price, the console refuses and tells you the minimum:

> At ₦31,000 the seller gets ₦26,350, below the ₦30,000 they asked for.
> Raise it to at least ₦35,300.

Publishing also writes `payout_amount` and `commission_pct` onto the listing so
the payout ledger has a number to work from.

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

- **Product tiles without a photograph show a numbered plate**, not a drawing.
  The plates are honest but they are not a shop: a customer cannot judge cut or
  colour from one. Real `img/products/<id>.jpg` files are the fix, and three of
  the studio sheets (Lagos, Bottoms, Jorts) are live as numbered range pages in
  the meantime.
- **`CONTACT` is live** (WhatsApp + email). **`BANK` is live** (OPay).
- **Supabase is configured; the tables and team roles come from the two SQL
  files.** Open `setup.html` and copy them in once. Until then logging fails
  silently and nothing is lost — orders still arrive on WhatsApp.
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