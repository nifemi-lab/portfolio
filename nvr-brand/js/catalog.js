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

var CATALOG = [
  {
    id: 'void-01', code: 'VOID/01', name: 'Heavyweight tee', collection: 'void',
    price: 15000, weight: '300gsm', sizes: ['S', 'M', 'L', 'XL'],
    stock: 'In stock',
    blurb: 'Boxy. Drop shoulder. Blank inside and out, both branded.',
    guideNote: FIT_TOP,
    metrics: ['Chest', 'Length', 'Sleeve'],
    measurements: topFit([54, 57, 60, 63], [72, 74, 76, 78], [21, 22, 23, 24], ['S', 'M', 'L', 'XL'])
  },
  {
    id: 'void-02', code: 'VOID/02', name: 'Boxy hoodie', collection: 'void',
    price: 32000, weight: '320gsm', sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 'In stock',
    blurb: 'Heavy rib. Oversized back print, one statement, one line.',
    guideNote: FIT_TOP,
    metrics: ['Chest', 'Length', 'Sleeve'],
    measurements: topFit([56, 59, 62, 65, 68], [66, 68, 70, 72, 74], [62, 63, 64, 65, 66], ['S', 'M', 'L', 'XL', 'XXL'])
  },
  {
    id: 'void-03', code: 'VOID/03', name: 'Wide cargo pant', collection: 'void',
    price: 28000, weight: '280gsm', sizes: ['S', 'M', 'L', 'XL'],
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
    price: 30000, weight: '290gsm', sizes: ['S', 'M', 'L'],
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
    price: 38000, weight: '240gsm', sizes: ['S', 'M', 'L', 'XL'],
    stock: 'In stock',
    blurb: 'Reflective piping front and back. Reads at distance.',
    guideNote: FIT_TOP,
    metrics: ['Chest', 'Length', 'Sleeve'],
    measurements: topFit([55, 58, 61, 64], [68, 70, 72, 74], [63, 64, 65, 66], ['S', 'M', 'L', 'XL'])
  },
  {
    id: 'signal-02', code: 'SIGNAL/02', name: 'Hi-vis cap', collection: 'signal',
    price: 9000, weight: 'One size', sizes: ['OS'],
    stock: 'In stock',
    blurb: 'Small wordmark only. Nothing shouty.',
    guideNote: FIT_ONE,
    metrics: ['Head circumference'],
    measurements: { OS: [58] }
  },
  {
    id: 'orbit-01', code: 'ORBIT/01', name: 'Gradient long sleeve', collection: 'orbit',
    price: 18000, weight: '260gsm', sizes: ['S', 'M', 'L', 'XL'],
    stock: 'In stock',
    blurb: 'Ultraviolet into cyan. One accent, on purpose.',
    guideNote: FIT_TOP,
    metrics: ['Chest', 'Length', 'Sleeve'],
    measurements: topFit([52, 55, 58, 61], [71, 73, 75, 77], [62, 63, 64, 65], ['S', 'M', 'L', 'XL'])
  },
  {
    id: 'orbit-02', code: 'ORBIT/02', name: 'Orbital print tee', collection: 'orbit',
    price: 14000, weight: '280gsm', sizes: ['S', 'M', 'L', 'XL'],
    stock: 'In stock',
    blurb: 'Single-stroke ring. The mark, printed flat.',
    guideNote: FIT_TOP,
    metrics: ['Chest', 'Length', 'Sleeve'],
    measurements: topFit([54, 57, 60, 63], [72, 74, 76, 78], [21, 22, 23, 24], ['S', 'M', 'L', 'XL'])
  },
  {
    id: 'static-01', code: 'STATIC/01', name: 'Glitch washed tee', collection: 'static',
    price: 13000, weight: '240gsm', sizes: ['S', 'M', 'L'],
    stock: 'In stock',
    blurb: 'Pigment wash, misregistered print. Every one differs.',
    guideNote: FIT_TOP,
    metrics: ['Chest', 'Length', 'Sleeve'],
    measurements: topFit([53, 56, 59], [70, 72, 74], [21, 22, 23], ['S', 'M', 'L'])
  },
  {
    id: 'static-02', code: 'STATIC/02', name: 'Noise sweat', collection: 'static',
    price: 26000, weight: '300gsm', sizes: ['S', 'M', 'L', 'XL'],
    stock: 'In stock',
    blurb: 'Ash body, static white set-in sleeve.',
    guideNote: FIT_TOP,
    metrics: ['Chest', 'Length', 'Sleeve'],
    measurements: topFit([54, 57, 60, 63], [64, 66, 68, 70], [61, 62, 63, 64], ['S', 'M', 'L', 'XL'])
  },
  {
    id: 'ascent-01', code: 'ASCENT/01', name: 'Numbered drop tee', collection: 'ascent',
    price: 16000, weight: '290gsm', sizes: ['S', 'M', 'L'],
    stock: 'Numbered run',
    blurb: 'Blood orange, numbered to the run. No restock.',
    guideNote: FIT_TOP,
    metrics: ['Chest', 'Length', 'Sleeve'],
    measurements: topFit([54, 57, 60], [72, 74, 76], [21, 22, 23], ['S', 'M', 'L'])
  },
  {
    id: 'ascent-02', code: 'ASCENT/02', name: 'Limited fleece', collection: 'ascent',
    price: 42000, weight: '340gsm', sizes: ['S', 'M', 'L', 'XL'],
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

/* Supabase order logging. Still unconfigured — the store works without it.
   Set supabaseUrl to turn on logging; WhatsApp and email are unaffected.
   Use the anon key. Never put the service_role key in a public file. */
var SUPABASE = {
  supabaseUrl: '',
  supabaseAnonKey: ''
};

/* ============================================================
 * Payment: bank transfer only.
 *
 * TODO: replace every placeholder below with your real details.
 * Until bankName and accountNumber are filled, the site hides the
 * transfer block entirely and tells customers to ask instead of
 * showing a fake account number.
 * ============================================================ */

var BANK = {
  bankName: '',
  accountName: '',
  accountNumber: ''
};

/* How the money moves, stated plainly. */
var PAYMENT_STEPS = [
  { n: '01', title: 'Send your order', body: 'On WhatsApp, email, or from your bag. No payment is taken on this site.' },
  { n: '02', title: 'We confirm by hand', body: 'We check stock, confirm your size and delivery details, and reply with the total.' },
  { n: '03', title: 'Transfer to the bank', body: 'We send you the account name and number. Transfer the exact amount and send the receipt.' },
  { n: '04', title: 'We make it', body: 'Payment clears, we cut and print your piece, and send you a dispatch update.' }
];