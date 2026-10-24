/* ============================================================
   Garment artwork
   ------------------------------------------------------------
   Two jobs:

   1. Show a real photograph the moment one exists.
   2. Until then, draw an honest garment outline instead of a
      grey box - and label it as an illustration, never as a photo.

   DROP-IN PHOTOS
   Save a file as  img/products/<product-id>.jpg  and it replaces
   the illustration on that product automatically. Nothing to wire.
   .png and .webp are tried too, then p.photoUrl, then the drawing.

   e.g.  img/products/void-05.jpg   ->   VOID/05, the polo.

   Full shooting recipe: img/products/README.md
   ============================================================ */

(function (root) {
  'use strict';

  var PHOTO_DIR = 'img/products/';
  var EXTENSIONS = ['.jpg', '.png', '.webp'];

  /* There are no product photos yet.
     Leave this false until you have committed at least one real file into
     img/products/, then flip it to true and every product will look for its
     own photo automatically.

     While it is false we draw the garment and issue no network requests at
     all. Probing for photos we know do not exist would put one 404 per
     product on every page load, which is noise in the console and a lie
     about how the site works. */
  var PHOTOS_LIVE = false;

  /* Figma board palette. Volt is the only accent; everything else is a
     neutral, so two pieces never end up wearing the same colour. */
  var INK = '#0a0a0a';

  function esc(s) {
    if (s == null) return '';
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ------------------------------------------------------------
     Garment shapes. Each returns SVG paths for a 140 x 190 box.
     Deliberately schematic - enough structure to read as the
     right kind of clothing, not enough to pass for a photo.
     ------------------------------------------------------------ */
  function garmentPath(kind, c) {
    var shapes = {

      tee:
        '<path d="M58 22 L30 34 L8 52 L22 76 L38 68 L38 168 L102 168 L102 68 L118 76 L132 52 L110 34 L82 22 Z" fill="' + c + '"/>' +
        '<path d="M46 24 Q70 52 94 24" fill="none" stroke="' + INK + '" stroke-width="7" stroke-linecap="round"/>' +
        '<path d="M38 68 L38 168 M102 68 L102 168" stroke="' + INK + '" stroke-width="2" opacity=".22" fill="none"/>',

      crew:
        '<path d="M58 22 L30 34 L8 52 L22 76 L38 68 L38 168 L102 168 L102 68 L118 76 L132 52 L110 34 L82 22 Z" fill="' + c + '"/>' +
        '<path d="M44 24 Q70 50 96 24" fill="none" stroke="' + INK + '" stroke-width="10" stroke-linecap="round"/>' +
        '<path d="M38 68 L38 168 M102 68 L102 168" stroke="' + INK + '" stroke-width="2" opacity=".22" fill="none"/>',

      polo:
        /* The heavy one. Ribbed collar, three-button placket, dropped
           shoulder, straight hem - the cut people actually buy. */
        '<path d="M58 26 L32 38 L10 54 L24 76 L40 68 L40 166 L100 166 L100 68 L116 76 L130 54 L108 38 L82 26 Z" fill="' + c + '"/>' +
        '<path d="M49 27 L70 60 L91 27 L100 31 L70 74 L40 31 Z" fill="' + c + '" stroke="' + INK + '" stroke-width="2.5" stroke-linejoin="round"/>' +
        '<path d="M70 60 L70 96" stroke="' + INK + '" stroke-width="3" stroke-linecap="round" opacity=".5"/>' +
        '<circle cx="70" cy="80" r="3.4" fill="' + INK + '" opacity=".55"/>' +
        '<circle cx="70" cy="92" r="3.4" fill="' + INK + '" opacity=".55"/>' +
        '<path d="M56 116 L84 116 L82 126 L58 126 Z" fill="' + INK + '" opacity=".2"/>' +
        '<path d="M40 68 L40 166 M100 68 L100 166" stroke="' + INK + '" stroke-width="2" opacity=".22" fill="none"/>',

      hoodie:
        '<path d="M58 20 L28 34 L6 54 L22 80 L38 70 L38 170 L102 170 L102 70 L118 80 L134 54 L112 34 L82 20 Z" fill="' + c + '"/>' +
        '<path d="M44 22 Q70 54 96 22" fill="none" stroke="' + INK + '" stroke-width="9" stroke-linecap="round"/>' +
        '<path d="M50 46 L46 86 M90 46 L94 86" stroke="' + INK + '" stroke-width="4" stroke-linecap="round"/>' +
        '<circle cx="46" cy="90" r="4" fill="' + INK + '"/><circle cx="94" cy="90" r="4" fill="' + INK + '"/>' +
        '<path d="M44 112 L96 112 L90 152 L50 152 Z" fill="' + INK + '" opacity=".28"/>' +
        '<path d="M38 70 L38 170 M102 70 L102 170" stroke="' + INK + '" stroke-width="2" opacity=".22" fill="none"/>',

      fleece:
        '<path d="M58 20 L28 34 L6 54 L22 80 L38 70 L38 172 L102 172 L102 70 L118 80 L134 54 L112 34 L82 20 Z" fill="' + c + '"/>' +
        '<path d="M42 24 Q70 56 98 24" fill="none" stroke="' + INK + '" stroke-width="13" stroke-linecap="round"/>' +
        '<path d="M46 116 L94 116 L88 152 L52 152 Z" fill="' + INK + '" opacity=".26"/>' +
        '<path d="M38 70 L38 172 M102 70 L102 172" stroke="' + INK + '" stroke-width="2" opacity=".22" fill="none"/>',

      shell:
        '<path d="M58 20 L28 34 L4 54 L20 82 L38 72 L38 168 L102 168 L102 72 L120 82 L136 54 L112 34 L82 20 Z" fill="' + c + '"/>' +
        '<path d="M70 24 L70 168" stroke="' + INK + '" stroke-width="3.5" opacity=".38" fill="none"/>' +
        '<path d="M40 58 L100 58 M40 70 L100 70" stroke="' + INK + '" stroke-width="3" opacity=".2" fill="none"/>' +
        '<path d="M44 100 L62 100 L60 118 L46 118 Z" fill="' + INK + '" opacity=".18"/>' +
        '<path d="M78 100 L96 100 L94 118 L80 118 Z" fill="' + INK + '" opacity=".18"/>',

      pant:
        '<path d="M40 40 L100 40 L104 72 L100 176 L70 176 L70 106 L64 176 L36 176 L32 72 Z" fill="' + c + '"/>' +
        '<path d="M40 52 L100 52" stroke="' + INK + '" stroke-width="3" opacity=".32" fill="none"/>' +
        '<path d="M44 66 L36 82 M96 66 L104 82" stroke="' + INK + '" stroke-width="2" opacity=".18" fill="none"/>' +
        '<path d="M70 106 L70 176" stroke="' + INK + '" stroke-width="2" opacity=".18" fill="none"/>',

      cap:
        '<path d="M26 106 Q26 54 80 48 Q118 44 124 82 L124 96 L62 96 Z" fill="' + c + '"/>' +
        '<path d="M26 106 Q62 88 124 96 L124 110 Q62 102 26 122 Z" fill="' + c + '" opacity=".55"/>' +
        '<path d="M56 92 L60 56 M80 90 L82 54" stroke="' + INK + '" stroke-width="2" opacity=".2" fill="none"/>' +
        '<circle cx="80" cy="48" r="6" fill="' + INK + '" opacity=".5"/>'
    };

    return shapes[kind] || shapes.tee;
  }

  function silhouette(kind, accent) {
    return '<svg class="tile-art" viewBox="0 0 140 190" width="140" height="190" ' +
      'aria-hidden="true" focusable="false">' + garmentPath(kind, accent || '#f5f5ee') + '</svg>';
  }

  /* Which drawing suits a given product. */
  function silhouetteFor(p) {
    var n = ((p && p.name) || '').toLowerCase();
    if (/cap|hat|beanie/.test(n)) return 'cap';
    if (/polo/.test(n)) return 'polo';
    if (/fleece/.test(n)) return 'fleece';
    if (/hoodie/.test(n)) return 'hoodie';
    if (/sweat|crew|jumper/.test(n)) return 'crew';
    if (/pant|trouser|jean|cargo/.test(n)) return 'pant';
    if (/shell|jacket|coat|wind/.test(n)) return 'shell';
    if (/tee|shirt|long ?sleeve/.test(n)) return 'tee';
    return 'tee';
  }

  /* ------------------------------------------------------------
     Photo resolution.

     A queue per rendered tile so the onerror handler knows what to
     try next, and what to fall back to once every candidate is
     exhausted. Kept off `document` deliberately - two tiles of the
     same product share a queue entry, which is harmless.
     ------------------------------------------------------------ */
  var QUEUES = [];

  function candidatesFor(p) {
    var list = [];
    if (p.photoUrl) list.push(p.photoUrl);
    if (!PHOTOS_LIVE) return list;
    if (p.id) EXTENSIONS.forEach(function (ext) { list.push(PHOTO_DIR + p.id + ext); });
    return list;
  }

  /* Called from the img onerror attribute. Advances to the next candidate;
     when the list runs out it swaps in the drawing plus an honest label.

     An index rather than a shift, because a single-candidate product (one
     with a stored photoUrl) would otherwise be handed the exact same URL
     again, the browser would treat it as unchanged, no second error would
     ever fire, and the tile would stay a broken image for good. */
  function nvrPhotoFail(el, key) {
    var q = QUEUES[key];
    if (!q) return;

    q.tried++;
    if (q.tried < q.list.length) {
      el.src = q.list[q.tried];
      return;
    }

    var host = el.parentNode;
    if (!host) return;
    host.innerHTML = silhouette(q.kind, q.accent) +
      (q.name ? '<span class="tile-art-note">Illustration</span>' : '');
  }

  /* The single entry point every product view should call. */
  function productArt(p, accent) {
    var list = candidatesFor(p);
    var kind = silhouetteFor(p);

    if (!list.length) {
      return silhouette(kind, accent) +
        (p && p.name ? '<span class="tile-art-note">Illustration</span>' : '');
    }

    var key = QUEUES.push({ list: list, tried: 0, kind: kind, accent: accent, name: p && p.name }) - 1;
    /* Eager, not lazy. A lazy image that never enters the viewport never
       fires its error event, so the fallback to the drawing never runs and
       the tile stays an empty frame. Product images at the top of the
       page are not worth that trade. */
    return '<img class="tile-photo" src="' + esc(list[0]) + '" alt="' + esc(p && p.name) + '" ' +
      'decoding="async" onerror="nvrPhotoFail(this,' + key + ')" />';
  }

  /* True when a product has no real photograph behind it yet. Used to
     offer the "send me a photo" WhatsApp route instead of pretending. */
  function needsPhoto(p) {
    return !(p && p.photoUrl);
  }

  root.garmentPath = garmentPath;
  root.silhouette = silhouette;
  root.silhouetteFor = silhouetteFor;
  root.productArt = productArt;
  root.needsPhoto = needsPhoto;
  root.nvrPhotoFail = nvrPhotoFail;
})(window);