/* ============================================================
   Garment artwork
   ------------------------------------------------------------
   Two jobs:

   1. Show a real photograph the moment one exists.
   2. Until then, show a numbered plate labelled "Photo on request".
      Nothing on the storefront draws a fake garment.

   DROP-IN PHOTOS
   Save a file as  img/products/<product-id>.jpg  and it replaces
   the plate on that product automatically. Nothing to wire.
   .png and .webp are tried too, then p.photoUrl.

   e.g.  img/products/void-05.jpg   ->   VOID/05, the polo.

   Full shooting recipe: img/products/README.md
   ============================================================ */

(function (root) {
  'use strict';

  var PHOTO_DIR = 'img/products/';
  var EXTENSIONS = ['.jpg', '.png', '.webp'];

  /* Leave this false until every product has a file in img/products/.
     Products with an explicit photoUrl already show their photo; turning
     this on would fire a 404 for every piece still waiting on a shoot. */
  var PHOTOS_LIVE = false;

  function esc(s) {
    if (s == null) return '';
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* The honest placeholder: the piece's own number, set as a catalogue
     plate. It reads as "waiting on the shoot", never as a photograph. */
  function plate(p) {
    var code = (p && p.code) || '';
    var parts = code.split('/');
    var prefix = parts.length > 1 ? parts[0] : '';
    var num = parts.length > 1 ? parts[parts.length - 1] : code;

    return '<span class="tile-pending" aria-hidden="true">' +
      (prefix ? '<span class="tile-pending-prefix">' + esc(prefix) + '</span>' : '') +
      '<span class="tile-pending-num">' + esc(num) + '</span>' +
    '</span>' +
    (p && p.name ? '<span class="tile-pending-note">Photo on request</span>' : '');
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
     when the list runs out it swaps in the numbered plate.

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
    host.innerHTML = plate(q);
  }

  /* The single entry point every product view should call. */
  function productArt(p) {
    var list = candidatesFor(p);

    if (!list.length) return plate(p);

    var key = QUEUES.push({ list: list, tried: 0, code: p && p.code, name: p && p.name }) - 1;
    /* Eager, not lazy. A lazy image that never enters the viewport never
       fires its error event, so the fallback to the plate never runs and
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

  root.productArt = productArt;
  root.needsPhoto = needsPhoto;
  root.nvrPhotoFail = nvrPhotoFail;
})(window);