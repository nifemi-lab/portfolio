/* NVR Supply — catalogue data
 * Design rules (BRAND.md): void background + ONE accent per piece.
 * Accent lives on the collection, never on two elements at once.
 * Plain script (no modules) so it also runs when opened over file://.
 */

var TOKENS = {
  void: '#040817',
  bone: '#e6ecff',
  volt: '#c6f24e',
  ultraviolet: '#a78bfa',
  cyan: '#7dd3fc',
  ash: '#8b93a7',
  ascent: '#ff5c2b'
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
    accent: 'ultraviolet',
    accentHex: TOKENS.ultraviolet
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
    accent: 'ascent',
    accentHex: TOKENS.ascent
  }
];

var CATALOG = [
  {
    id: 'void-01',
    code: 'VOID/01',
    name: 'Heavyweight tee',
    collection: 'void',
    price: 58,
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
    price: 128,
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
    price: 118,
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
    price: 128,
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
    price: 168,
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
    price: 42,
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
    price: 88,
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
    price: 62,
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
    price: 66,
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
    price: 112,
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
    price: 72,
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
    price: 148,
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

/* Where a copied order gets sent. Change these to real handles. */
var CONTACT = {
  handle: '@nvr',
  email: 'orders@nvr.example',
  note: 'No payment is taken here. This is a prototype.'
};