/* NVR Supply — catalogue data
 * Design rules (BRAND.md): void background + ONE accent per piece.
 * Accent lives on the collection, never on two elements at once.
 * Plain script (no modules) so it also runs when opened over file://.
 */

/* Prices are in Naira — that is what customers actually pay.
   The USD figure is derived, never stored, so changing this one number
   updates every dollar equivalent on the site.
   Update it when the rate moves; don't hardcode a second copy. */
var NGN_PER_USD = 1500;

/* Palette from the Figma brand board.
   Volt is the only accent and is reserved for CTAs and SIGNAL.
   Collections otherwise use the neutral ramp, so no two accents ever sit
   on the same piece. Slate is deliberately not used for small text: at
   #666 on obsidian it only reaches ~3.6:1 and fails WCAG AA. */
var TOKENS = {
  obsidian: '#0a0a0a',
  bone: '#f5f5ee',
  volt: '#c7ff00',
  ash: '#bbbbbb',
  slate: '#666666'
};

var COLLECTIONS = [
  {
    id: 'void',
    name: 'VOID',
    vibe: 'Core, heavyweight basics',
    note: 'The foundation. 300gsm and up, cut boxy.',
    accent: 'bone',
    accentHex: TOKENS.bone
  },
  {
    id: 'signal',
    name: 'SIGNAL',
    vibe: 'High-vis, reflective, street',
    note: 'Seen before you are.',
    accent: 'volt',
    accentHex: TOKENS.volt
  },
  {
    id: 'orbit',
    name: 'ORBIT',
    vibe: 'Cosmic gradient, space prints',
    note: 'Weightless things, heavy cotton.',
    accent: 'bone',
    accentHex: TOKENS.bone
  },
  {
    id: 'static',
    name: 'STATIC',
    vibe: 'Noise, glitch, washed',
    note: 'Every print slightly wrong on purpose.',
    accent: 'ash',
    accentHex: TOKENS.ash
  },
  {
    id: 'ascent',
    name: 'ASCENT',
    vibe: 'Limited drops, numbers',
    note: 'Numbered, then gone.',
    accent: 'ash',
    accentHex: TOKENS.ash
  }
];

var CATALOG = [
  {
    id: 'void-01',
    code: 'VOID/01',
    name: 'Heavyweight tee',
    collection: 'void',
    price: 15000,
    weight: '300gsm',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 'In stock',
    blurb: 'Boxy. Drop shoulder. Blank inside and out, both branded.'
  },
  {
    id: 'void-02',
    code: 'VOID/02',
    name: 'Boxy hoodie',
    collection: 'void',
    price: 32000,
    weight: '320gsm',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 'In stock',
    blurb: 'Heavy rib. Oversized back print, one statement, one line.'
  },
  {
    id: 'void-03',
    code: 'VOID/03',
    name: 'Wide cargo pant',
    collection: 'void',
    price: 28000,
    weight: '280gsm',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 'In stock',
    blurb: 'Utility pocket set. Straight through the leg.'
  },
  {
    id: 'void-04',
    code: 'VOID/04',
    name: 'Baggy utility pant',
    collection: 'void',
    price: 30000,
    weight: '290gsm',
    sizes: ['S', 'M', 'L'],
    stock: 'In stock',
    blurb: 'The one we build most of. Falls from the hip.'
  },
  {
    id: 'signal-01',
    code: 'SIGNAL/01',
    name: 'Reflective shell',
    collection: 'signal',
    price: 38000,
    weight: '240gsm',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 'In stock',
    blurb: 'Reflective piping front and back. Reads at distance.'
  },
  {
    id: 'signal-02',
    code: 'SIGNAL/02',
    name: 'Hi-vis cap',
    collection: 'signal',
    price: 9000,
    weight: 'One size',
    sizes: ['OS'],
    stock: 'In stock',
    blurb: 'Small wordmark only. Nothing shouty.'
  },
  {
    id: 'orbit-01',
    code: 'ORBIT/01',
    name: 'Gradient long sleeve',
    collection: 'orbit',
    price: 18000,
    weight: '260gsm',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 'In stock',
    blurb: 'Ultraviolet into cyan. One accent, on purpose.'
  },
  {
    id: 'orbit-02',
    code: 'ORBIT/02',
    name: 'Orbital print tee',
    collection: 'orbit',
    price: 14000,
    weight: '280gsm',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 'In stock',
    blurb: 'Single-stroke ring. The mark, printed flat.'
  },
  {
    id: 'static-01',
    code: 'STATIC/01',
    name: 'Glitch washed tee',
    collection: 'static',
    price: 13000,
    weight: '240gsm',
    sizes: ['S', 'M', 'L'],
    stock: 'In stock',
    blurb: 'Pigment wash, misregistered print. Every one differs.'
  },
  {
    id: 'static-02',
    code: 'STATIC/02',
    name: 'Noise sweat',
    collection: 'static',
    price: 26000,
    weight: '300gsm',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 'In stock',
    blurb: 'Ash body, static white set-in sleeve.'
  },
  {
    id: 'ascent-01',
    code: 'ASCENT/01',
    name: 'Numbered drop tee',
    collection: 'ascent',
    price: 16000,
    weight: '290gsm',
    sizes: ['S', 'M', 'L'],
    stock: 'Numbered run',
    blurb: 'Blood orange, numbered to the run. No restock.'
  },
  {
    id: 'ascent-02',
    code: 'ASCENT/02',
    name: 'Limited fleece',
    collection: 'ascent',
    price: 42000,
    weight: '340gsm',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 'Numbered run',
    blurb: 'Heaviest thing we make. Comes with a number.'
  }
];

var TIERS = [
  { name: 'Guest', meaning: 'Learning for free at the Academy.' },
  { name: 'Member', meaning: 'Gets early drops and Academy forever.' },
  { name: 'Inner Circle', meaning: 'Funds a learner\u2019s course per purchase.' }
];

var RULES = [
  'Never use fake urgency or discount spam.',
  'Never post content you wouldn\u2019t wear.',
  'Never ship something that doesn\u2019t fund the mission.'
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
    body: 'The cut is deliberately generous and boxy. Orders are confirmed by hand: send yours and we will come back with delivery details and payment before anything is made.' }
];

/* ============================================================
 * Where an order actually reaches you.
 * Every value here is a placeholder until you replace it.
 * ============================================================ */

var CONTACT = {
  /* Full international number, digits only, no + or spaces.
     Nigeria: 234 then the local number. Leave '' to hide the WhatsApp button. */
  /* wa.me needs digits only. Non-digits are stripped in app.js, so any
     paste format is safe. */
  whatsapp: '+2348106285867',

  /* Where orders go by email. Leave '' to hide the email button. */
  email: 'gafarianimation@gmail.com',

  /* Shown in the footer and in the copied order text. */
  handle: '@nvr'
};

/* Supabase order logging. Leave supabaseUrl as '' to skip logging entirely —
   WhatsApp and email keep working with no backend at all.
   Use the anon key. Never put the service_role key in a public file. */
var SUPABASE = {
  supabaseUrl: '',
  supabaseAnonKey: ''
};