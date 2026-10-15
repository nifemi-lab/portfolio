/* ============================================================
   NVR Supply — catalogue data
   Design rules: obsidian background + ONE accent per piece.
   Plain script (no modules) so it also runs when opened over file://.

   MEASUREMENTS: figures below are industry-standard starting points
   for heavyweight streetwear, NOT measured from real stock. Measure
   an actual garment and correct them before you sell. Every number is
   editable in place. All dimensions are in centimetres.
   ============================================================ */

/* Prices are in Naira — that is what customers actually pay.
   The USD figure is derived, never stored, so changing this one number
   updates every dollar equivalent on the site.
   Update it when the rate moves; don't hardcode a second copy. */
var NGN_PER_USD = 1500;

/* Palette from the Figma brand board.
   Volt is the only accent and is reserved for CTAs and SIGNAL.
   Collections otherwise use the neutral ramp, so no two accents ever sit
   on the same piece. Slate is deliberately not used for small text: at
   #666 on obsidian it only reaches ~3.5:1 and fails WCAG AA. */
var TOKENS = {
  obsidian: '#0a0a0a',
  bone: '#f5f5ee',
  volt: '#c7ff00',
  ash: '#bbbbbb',
  slate: '#666666'
};

var COLLECTIONS = [
  { id: 'void', name: 'VOID', vibe: 'Core, heavyweight basics',
    note: 'The foundation. 300gsm and up, cut boxy.', accent: 'bone', accentHex: TOKENS.bone },
  { id: 'signal', name: 'SIGNAL', vibe: 'High-vis, reflective, street',
    note: 'Seen before you are.', accent: 'volt', accentHex: TOKENS.volt },
  { id: 'orbit', name: 'ORBIT', vibe: 'Cosmic gradient, space prints',
    note: 'Weightless things, heavy cotton.', accent: 'bone', accentHex: TOKENS.bone },
  { id: 'static', name: 'STATIC', vibe: 'Noise, glitch, washed',
    note: 'Every print slightly wrong on purpose.', accent: 'ash', accentHex: TOKENS.ash },
  { id: 'ascent', name: 'ASCENT', vibe: 'Limited drops, numbers',
    note: 'Numbered, then gone.', accent: 'ash', accentHex: TOKENS.ascent }
];

COLLECTIONS[4].accentHex = TOKENS.ash;

/* Reusable measurement sets so identical cuts stay identical. */
var FIT_TOP = 'Body width is measured flat across the chest, then doubled. Length is shoulder to hem, measured flat. Sleeve is shoulder to cuff. Model is 183cm and wears M.';
var FIT_BOTTOM = 'Waist is the full relaxed waistband. Hip is measured flat across the widest point, then doubled. Inseam is the inner leg seam. Leg opening is measured flat, then doubled.';
var FIT_ONE = 'One size, adjustable. Measure around your head just above the ears.';

function topFit(chest, length, sleeve, sizes) {
  var m = {};
  sizes.forEach(function (s, i) {
    m[s] = [chest[i], length[i], sleeve[i]];
  });
  return m;
}

/* ============================================================
 * Storefront pricing and origin
 * Defined before CATALOG because every product below references both.
 * ============================================================ */

/* Charm pricing. NVR only, so it never touches a seller's agreed price -
   sellers name a floor and we publish above it. Round to x,900 so it reads
   as a deliberate price rather than an odd one. */
function charmPrice(amount) {
  if (amount < 10000) return amount;
  var base = Math.floor(amount / 1000) * 1000;
  var candidate = base + 900;
  return candidate < amount ? candidate : base - 100;
}

/* A markdown is only ever shown when there is a genuine prior price.
   Fabricating a "was" price to make a discount look bigger is false
   advertising, and we handle customer money. */
function priceRow(list, wasBefore) {
  var row = { list: list };
  if (wasBefore && wasBefore > list) row.was = wasBefore;
  return row;
}

/* Everything on the storefront is either made by NVR or curated from the
   community. The badge is the trust signal, so it is never optional. */
var ORIGIN = { NVR: 'nvr', SELLER: 'seller' };

var CATALOG = [
  {
    id: 'void-01', code: 'VOID/01', name: 'Heavyweight tee', collection: 'void',
    origin: ORIGIN.NVR, made: true, price: charmPrice(15000), weight: '300gsm', sizes: ['S', 'M', 'L', 'XL'],
    stock: 'In stock',
    blurb: 'Boxy. Drop shoulder. Blank inside and out, both branded.',
    guideNote: FIT_TOP,
    metrics: ['Chest', 'Length', 'Sleeve'],
    measurements: topFit([54, 57, 60, 63], [72, 74, 76, 78], [21, 22, 23, 24], ['S', 'M', 'L', 'XL'])
  },
  {
    id: 'void-02', code: 'VOID/02', name: 'Boxy hoodie', collection: 'void',
    origin: ORIGIN.NVR, made: true, price: charmPrice(32000), weight: '320gsm', sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 'In stock',
    blurb: 'Heavy rib. Oversized back print, one statement, one line.',
    guideNote: FIT_TOP,
    metrics: ['Chest', 'Length', 'Sleeve'],
    measurements: topFit([56, 59, 62, 65, 68], [66, 68, 70, 72, 74], [62, 63, 64, 65, 66], ['S', 'M', 'L', 'XL', 'XXL'])
  },
  {
    id: 'void-03', code: 'VOID/03', name: 'Wide cargo pant', collection: 'void',
    origin: ORIGIN.NVR, made: true, price: charmPrice(28000), weight: '280gsm', sizes: ['S', 'M', 'L', 'XL'],
    stock: 'In stock',
    blurb: 'Utility pocket set. Straight through the leg.',
    guideNote: FIT_BOTTOM,
    metrics: ['Waist', 'Hip', 'Inseam', 'Leg opening'],
    measurements: {
      S: [36, 46, 76, 22], M: [39, 49, 77, 23],
      L: [42, 52, 78, 24], XL: [45, 55, 79, 25]
    }
  },
  {
    id: 'void-04', code: 'VOID/04', name: 'Baggy utility pant', collection: 'void',
    origin: ORIGIN.NVR, made: true, price: charmPrice(30000), weight: '290gsm', sizes: ['S', 'M', 'L'],
    stock: 'In stock',
    blurb: 'The one we build most of. Falls from the hip.',
    guideNote: FIT_BOTTOM,
    metrics: ['Waist', 'Hip', 'Inseam', 'Leg opening'],
    measurements: {
      S: [36, 47, 74, 24], M: [39, 50, 75, 25], L: [42, 53, 76, 26]
    }
  },
  {
    id: 'signal-01', code: 'SIGNAL/01', name: 'Reflective shell', collection: 'signal',
    origin: ORIGIN.NVR, made: true, price: charmPrice(38000), weight: '240gsm', sizes: ['S', 'M', 'L', 'XL'],
    stock: 'In stock',
    blurb: 'Reflective piping front and back. Reads at distance.',
    guideNote: FIT_TOP,
    metrics: ['Chest', 'Length', 'Sleeve'],
    measurements: topFit([55, 58, 61, 64], [68, 70, 72, 74], [63, 64, 65, 66], ['S', 'M', 'L', 'XL'])
  },
  {
    id: 'signal-02', code: 'SIGNAL/02', name: 'Hi-vis cap', collection: 'signal',
    origin: ORIGIN.NVR, made: true, price: charmPrice(9000), weight: 'One size', sizes: ['OS'],
    stock: 'In stock',
    blurb: 'Small wordmark only. Nothing shouty.',
    guideNote: FIT_ONE,
    metrics: ['Head circumference'],
    measurements: { OS: [58] }
  },
  {
    id: 'orbit-01', code: 'ORBIT/01', name: 'Gradient long sleeve', collection: 'orbit',
    origin: ORIGIN.NVR, made: true, price: charmPrice(18000), weight: '260gsm', sizes: ['S', 'M', 'L', 'XL'],
    stock: 'In stock',
    blurb: 'Ultraviolet into cyan. One accent, on purpose.',
    guideNote: FIT_TOP,
    metrics: ['Chest', 'Length', 'Sleeve'],
    measurements: topFit([52, 55, 58, 61], [71, 73, 75, 77], [62, 63, 64, 65], ['S', 'M', 'L', 'XL'])
  },
  {
    id: 'orbit-02', code: 'ORBIT/02', name: 'Orbital print tee', collection: 'orbit',
    origin: ORIGIN.NVR, made: true, price: charmPrice(14000), weight: '280gsm', sizes: ['S', 'M', 'L', 'XL'],
    stock: 'In stock',
    blurb: 'Single-stroke ring. The mark, printed flat.',
    guideNote: FIT_TOP,
    metrics: ['Chest', 'Length', 'Sleeve'],
    measurements: topFit([54, 57, 60, 63], [72, 74, 76, 78], [21, 22, 23, 24], ['S', 'M', 'L', 'XL'])
  },
  {
    id: 'static-01', code: 'STATIC/01', name: 'Glitch washed tee', collection: 'static',
    origin: ORIGIN.NVR, made: true, price: charmPrice(13000), weight: '240gsm', sizes: ['S', 'M', 'L'],
    stock: 'In stock',
    blurb: 'Pigment wash, misregistered print. Every one differs.',
    guideNote: FIT_TOP,
    metrics: ['Chest', 'Length', 'Sleeve'],
    measurements: topFit([53, 56, 59], [70, 72, 74], [21, 22, 23], ['S', 'M', 'L'])
  },
  {
    id: 'static-02', code: 'STATIC/02', name: 'Noise sweat', collection: 'static',
    origin: ORIGIN.NVR, made: true, price: charmPrice(26000), weight: '300gsm', sizes: ['S', 'M', 'L', 'XL'],
    stock: 'In stock',
    blurb: 'Ash body, static white set-in sleeve.',
    guideNote: FIT_TOP,
    metrics: ['Chest', 'Length', 'Sleeve'],
    measurements: topFit([54, 57, 60, 63], [64, 66, 68, 70], [61, 62, 63, 64], ['S', 'M', 'L', 'XL'])
  },
  {
    id: 'ascent-01', code: 'ASCENT/01', name: 'Numbered drop tee', collection: 'ascent',
    origin: ORIGIN.NVR, made: true, price: charmPrice(16000), weight: '290gsm', sizes: ['S', 'M', 'L'],
    stock: 'Numbered run',
    blurb: 'Blood orange, numbered to the run. No restock.',
    guideNote: FIT_TOP,
    metrics: ['Chest', 'Length', 'Sleeve'],
    measurements: topFit([54, 57, 60], [72, 74, 76], [21, 22, 23], ['S', 'M', 'L'])
  },
  {
    id: 'ascent-02', code: 'ASCENT/02', name: 'Limited fleece', collection: 'ascent',
    origin: ORIGIN.NVR, made: true, price: charmPrice(42000), weight: '340gsm', sizes: ['S', 'M', 'L', 'XL'],
    stock: 'Numbered run',
    blurb: 'Heaviest thing we make. Comes with a number.',
    guideNote: FIT_TOP,
    metrics: ['Chest', 'Length', 'Sleeve'],
    measurements: topFit([57, 60, 63, 66], [67, 69, 71, 73], [62, 63, 64, 65], ['S', 'M', 'L', 'XL'])
  }
];

/* The three divisions, as shown on the Figma board's lockups. */
var DIVISIONS = [
  { mark: 'NVR SUPPLY', role: 'Clothing & products', note: 'What you buy.', href: '#shop' },
  { mark: 'NVR ACADEMY', role: 'Learning platform', note: 'Where people learn. Free.', href: '#mission' },
  { mark: 'NVR FOUNDATION', role: 'Impact & community', note: 'What the money does.', href: '#how' }
];

/* Taglines from the Figma board. */
var TAGLINES = [
  'Never stop.',
  'Wear the mission.',
  'Built for those still becoming.',
  'Learn. Build. Repeat.'
];

/* Money flow — accurate to BRAND.md, no invented claims. */
var FLOW = [
  { n: '01', title: 'You buy a piece',
    body: 'Heavyweight cotton, cut boxy, made in a small run. Nothing overproduced.' },
  { n: '02', title: 'The margin funds a course',
    body: 'Part of every sale pays the NVR Academy as course fees for a learner who could not otherwise afford one.' },
  { n: '03', title: 'Someone learns to build',
    body: 'That learner works through the free curriculum and leaves with something they can actually use.' },
  { n: '04', title: 'The tag says so',
    body: 'The garment carries an NVR tag: "This funded a learner\u2019s first course." The claim is on the product, not just the website.' }
];

/* Written only from BRAND.md and the Figma board. No invented people,
   suppliers, shipping times or policies. */
var HOW_BLOCKS = [
  { title: 'Inner Circle',
    body: 'The top tier. A purchase here funds a learner\u2019s course directly. Guest learns for free; Member gets early drops and Academy forever; Inner Circle funds the person behind the next one.' },
  { title: 'Who runs it',
    body: 'NVR is a learning movement expressed through clothing. Supply makes the clothes, the Academy teaches, and the Foundation funds both. Same people, higher standards.' },
  { title: 'How it\u2019s made',
    body: 'Heavyweight 240\u2013340gsm cotton, boxy cut with a drop shoulder. One statement on the back, a small wordmark on the chest or sleeve, and blank inside and out \u2014 both branded. Small runs, so nothing gets overproduced.' },
  { title: 'Sizing and delivery',
    body: 'The cut is deliberately generous and boxy. Every piece lists its measurements in centimetres \u2014 check them against a garment you already own before ordering. Orders are confirmed by hand: send yours and we will come back with delivery details and payment before anything is made.' }
];

/* ============================================================
 * Where an order actually reaches you.
 * ============================================================ */

var CONTACT = {
  /* wa.me needs digits only. Non-digits are stripped in app.js, so any
     paste format is safe. */
  whatsapp: '+2348106285867',

  /* Where orders go by email. Leave '' to hide the email button. */
  email: 'gafarianimation@gmail.com',

  /* Shown in the footer and in the copied order text. */
  handle: '@nvr'
};

/* Supabase order logging.
   Same project as the JAMB Study tracker and NVR Coding, using the same
   public anon key - it is designed to ship in browser code, and
   row-level security is what protects the data.

   REQUIRES: run supabase.sql once in the Supabase SQL editor to create the
   `orders` table. Until you do, logging silently fails and WhatsApp and
   email carry on working exactly as before.
   Never put the service_role key in this file. */
var SUPABASE = {
  supabaseUrl: 'https://mhfxmjaxexgwcyhkoyhz.supabase.co',
  supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oZnhtamF4ZXhnd2N5aGtveWh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA4MDA5MjksImV4cCI6MjEwNjM3NjkyOX0.svtoSR3EUQyW0Du2RPsA6h7eiHNSb6mbub1dYEtbB3A'
};

/* ============================================================
 * Payment: OPay transfer only.
 *
 * OPay receives to a phone number, not a classic account number, so the
 * labels below are configurable. If you switch to a bank account, set
 * providerLabel to 'Bank' and numberLabel to 'Account number'.
 *
 * The site hides this block entirely until all three are filled, so a
 * placeholder can never be mistaken for a real destination.
 * ============================================================ */

var BANK = {
  provider: 'OPay',
  providerLabel: 'Pay to',
  accountName: 'Monisola Omolabake Shodimu',
  accountNumber: '8106285867',
  numberLabel: 'OPay number'
};

/* How the money moves, stated plainly. */
var PAYMENT_STEPS = [
  { n: '01', title: 'Send your order', body: 'On WhatsApp, email, or from your bag. No payment is taken on this site.' },
  { n: '02', title: 'We confirm by hand', body: 'We check stock, confirm your size and delivery details, and reply with the total.' },
  { n: '03', title: 'Transfer to the bank', body: 'We send you the account name and number. Transfer the exact amount and send the receipt.' },
  { n: '04', title: 'We make it', body: 'Payment clears, we cut and print your piece, and send you a dispatch update.' }
];

/* ============================================================
 * Selling with NVR
 *
 * NVR takes a cut of every sale. A seller names their price, NVR lists it,
 * the buyer pays NVR, and the seller's share is paid out on a weekly run.
 * The difference is the commission.
 *
 * 15% covers curation, photography, the storefront and handling without
 * making the fee worth arguing over on a small piece.
 * ============================================================ */

var SELLING = {
  commissionPct: 15,

  /* Shown to applicants. Keep this in step with commissionPct. */
  blurb: 'We take ' + 15 + '% for curation, photography, the storefront and ' +
         'handling. You name your price; we list it; you get paid weekly.',

  photosNeeded: [
    'Front of the garment, flat and well lit',
    'Back of the garment, flat and well lit',
    'The care label, readable',
    'The brand label, readable'
  ],

  note: 'Add as many pieces as you like. Nothing appears on the storefront ' +
        'until we approve it, which usually takes a few days.'
};

/* ============================================================
 * Premium tier
 * ------------------------------------------------------------
 * Premium sells WORK, not ATTENTION.
 *
 * The thing a buyer pays extra for is "someone looked at this and stood
 * behind it". Selling visibility instead would quietly make that untrue: the
 * top slots would stop being the best pieces and start being the ones that
 * paid, and "curated by NVR" would become a claim rather than a fact.
 *
 * So premium unlocks:
 *   - NVR photographs the piece (real work, done by us)
 *   - eligibility for the weekly Featured slot, which NVR picks by hand
 *   - first access to new drops, before they go public
 *   - a lower commission rate
 *
 * It does NOT unlock rank inside search results or a higher position in the
 * grid. Nothing on the storefront moves because of money.
 * ============================================================ */

var PREMIUM = {
  label: 'NVR Studio',

  /* Not yet purchasable. OPay has no recurring billing, so subscriptions
     need Paystack or Flutterwave, which need KYC. Charging someone before
     that exists means either a dead button or a hand-managed renewal list.
     Set priceNaira when the rails are live. */
  priceNaira: null,

  commissionPct: 10,   // standard sellers pay 15

  includes: [
    { title: 'NVR photography', body: 'We shoot the piece ourselves, properly lit, and you get the files. Your listing uses them.' },
    { title: 'First access to drops', body: 'New pieces reach premium sellers before they go public.' },
    { title: 'Featured, by hand', body: 'One slot a week, picked by us for how good the piece is. Never sold, never auctioned.' },
    { title: 'Lower commission', body: '10% instead of 15% on everything you sell through us.' }
  ],

  whatItIsNot: 'Premium does not buy a better position in the shop. Nothing ' +
    'moves up the grid because of money — the featured slot is chosen by a ' +
    'person, and search results are ordered the same for everyone.'
};

/* ============================================================
 * Storefront pricing
 * (charmPrice, priceRow and ORIGIN are defined above CATALOG, which uses them.)
 * ============================================================ */