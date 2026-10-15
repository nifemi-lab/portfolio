/* NVR Supply — storefront behaviour
 * Static prototype. No payment is processed anywhere in this file.
 * Cart lives in localStorage; the "checkout" produces an order you copy and send.
 */

(function () {
  'use strict';

  var STORE_KEY = 'nvr-supply-bag';

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* Naira is the real price; dollars are derived from NGN_PER_USD so there is
   only ever one exchange rate to maintain. */
function money(n) {
  return '₦' + Math.round(n).toLocaleString('en-NG');
  }

  function usd(n) {
    return '~$' + Math.round(n / NGN_PER_USD).toLocaleString('en-US');
  }

  function collectionOf(id) {
    if (id === 'community') return COMMUNITY;
    for (var i = 0; i < COLLECTIONS.length; i++) {
      if (COLLECTIONS[i].id === id) return COLLECTIONS[i];
    }
    return COLLECTIONS[0];
  }

  /* Seller listings, shaped like catalogue items so one grid can render both.
     Only approved AND priced listings appear — until you set a price there
     is nothing to sell, so it stays hidden. */
  var COMMUNITY = { id: 'community', name: 'COMMUNITY', accentHex: '#bbbbbb' };
  var sellerItems = [];

  function normaliseSellerItem(listing, seller) {
    if (!listing.list_price || listing.list_price < 1) return null;
    return {
      id: listing.reference,
      code: listing.reference,
      name: listing.garment,
      collection: 'community',
      origin: ORIGIN.SELLER,
      soldBy: seller ? (seller.handle || seller.full_name) : null,
      sellerRef: seller ? seller.reference : null,
      premium: seller ? seller.tier === 'premium' : false,
      price: listing.list_price,
      weight: listing.condition,
      sizes: listing.size ? [listing.size] : ['OS'],
      stock: 'Curated',
      blurb: listing.notes || (listing.brand ? listing.brand + ' — curated by NVR.' : 'Curated by NVR.'),
      metrics: null,
      measurements: null
    };
  }

  function loadSellerItems() {
    if (!SUPABASE.supabaseUrl || !SUPABASE.supabaseAnonKey) {
      sellerItems = [];
      return Promise.resolve([]);
    }
    var head = {
      apikey: SUPABASE.supabaseAnonKey,
      'Authorization': 'Bearer ' + SUPABASE.supabaseAnonKey
    };
    // RLS on `listings` already limits anon to status 'listed' or 'sold'.
    return fetch(SUPABASE.supabaseUrl + '/rest/v1/listings?status=eq.listed&select=*,seller:sellers(reference,full_name,handle)', { headers: head })
      .then(function (r) { return r.ok ? r.json() : []; })
      .catch(function () { return []; })
      .then(function (rows) {
        sellerItems = (rows || [])
          .map(function (row) {
            var s = Array.isArray(row.seller) ? row.seller[0] : row.seller;
            return normaliseSellerItem(row, s);
          })
          .filter(Boolean);
        return sellerItems;
      });
  }

  function allItems() {
    return CATALOG.concat(sellerItems);
  }

  function productOf(id) {
    for (var i = 0; i < CATALOG.length; i++) {
      if (CATALOG[i].id === id) return CATALOG[i];
    }
    return null;
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---------- bag state ---------- */

  var bag = [];

  function loadBag() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      bag = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(bag)) bag = [];
    } catch (e) {
      bag = [];
    }
  }

  function saveBag() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(bag)); } catch (e) { /* private mode */ }
  }

  function lineKey(id, size) { return id + '::' + size; }

  function bagCount() {
    return bag.reduce(function (n, l) { return n + l.qty; }, 0);
  }

  function bagTotal() {
    return bag.reduce(function (n, l) {
      var p = productOf(l.id);
      return n + (p ? p.price * l.qty : 0);
    }, 0);
  }

  function addToBag(id, size) {
    var key = lineKey(id, size);
    var found = null;
    for (var i = 0; i < bag.length; i++) {
      if (lineKey(bag[i].id, bag[i].size) === key) { found = bag[i]; break; }
    }
    if (found) found.qty += 1;
    else bag.push({ id: id, size: size, qty: 1 });
    currentRef = null; // changed bag means a new order, so a new reference
    saveBag();
  }

  function setQty(id, size, qty) {
    for (var i = 0; i < bag.length; i++) {
      if (lineKey(bag[i].id, bag[i].size) === lineKey(id, size)) {
        if (qty <= 0) bag.splice(i, 1);
        else bag[i].qty = qty;
        break;
      }
    }
    currentRef = null;
    saveBag();
  }

  /* ---------- order reference ---------- */

  var currentRef = null;

  function orderRef() {
    // Human-quotable reference, e.g. NVR-7K4Q. No ambiguous characters.
    var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    var out = '';
    for (var i = 0; i < 4; i++) out += chars[Math.floor(Math.random() * chars.length)];
    return 'NVR-' + out;
  }

  /* ---------- order text ---------- */

  function orderText() {
    if (!bag.length) return '';
    if (!currentRef) currentRef = orderRef();

    var lines = ['NVR SUPPLY — ORDER', currentRef, ''];

    var name = ($('#custName') && $('#custName').value || '').trim();
    var phone = ($('#custPhone') && $('#custPhone').value || '').trim();
    if (name || phone) {
      if (name) lines.push('Name:  ' + name);
      if (phone) lines.push('Phone: ' + phone);
      lines.push('');
    }

    bag.forEach(function (l) {
      var p = productOf(l.id);
      if (!p) return;
      lines.push(p.code + '  ' + p.name);
      lines.push('  Size ' + l.size + '   Qty ' + l.qty + '   ' +
        money(p.price * l.qty) + '  (' + usd(p.price * l.qty) + ')');
    });
    lines.push('');
    lines.push('SUBTOTAL   ' + money(bagTotal()) + '  (' + usd(bagTotal()) + ')');
    lines.push('');
    lines.push('No payment taken here. Send this with your name and delivery');
    lines.push('address, and we will confirm by hand and send bank transfer');
    lines.push('details with your total.');

    if (CONTACT.whatsapp) {
      lines.push('');
      lines.push('WhatsApp: +' + whatsappNumber());
    }
    if (CONTACT.email) {
      lines.push('Email:    ' + CONTACT.email);
    }

    lines.push('');
    lines.push('Every piece funds a learner\u2019s first course.');
    return lines.join('\n');
  }

  /* ---------- rendering ---------- */

  var activeFilter = 'all';
  var sizeChoice = {}; // productId -> size

  function originBadge(p) {
    if (p.origin === ORIGIN.SELLER) {
      var premium = p.premium ? premiumBadge() : '';
      return '<span class="origin-badge origin-badge--seller">Sold by ' +
        escapeHtml(p.soldBy || 'a seller') + '</span>' + premium;
    }
    return '<span class="origin-badge origin-badge--nvr">NVR</span>';
  }

  function renderCollections() {
    var host = $('#collectionGrid');
    if (!host) return;
    host.innerHTML = COLLECTIONS.map(function (c) {
      var count = CATALOG.filter(function (p) { return p.collection === c.id; }).length;
      return '' +
        '<a class="collection-card" href="#shop" style="--accent:' + c.accentHex + '" data-filter="' + c.id + '">' +
          '<span class="tag tag--accent">' + escapeHtml(c.name) + '</span>' +
          '<h3>' + escapeHtml(c.vibe) + '</h3>' +
          '<p class="note">' + escapeHtml(c.note) + '</p>' +
          '<span class="tag">' + count + ' pieces</span>' +
        '</a>';
    }).join('');
  }

  function renderHow() {
    var flow = $('#flow');
    if (flow) {
      flow.innerHTML = FLOW.map(function (s) {
        return '<li class="flow-step">' +
          '<span class="flow-n">' + s.n + '</span>' +
          '<h3>' + escapeHtml(s.title) + '</h3>' +
          '<p>' + escapeHtml(s.body) + '</p>' +
        '</li>';
      }).join('');
    }

    var blocks = $('#howBlocks');
    if (blocks) {
      blocks.innerHTML = HOW_BLOCKS.map(function (b) {
        return '<div class="mission-block" data-reveal>' +
          '<h3>' + escapeHtml(b.title) + '</h3>' +
          '<p>' + escapeHtml(b.body) + '</p>' +
        '</div>';
      }).join('');
    }
  }

  function renderDivisions() {
    var host = $('#divisions');
    if (!host) return;
    host.innerHTML = DIVISIONS.map(function (d) {
      return '<a class="division-card" href="' + d.href + '">' +
        '<span class="division-mark">' + escapeHtml(d.mark) + '</span>' +
        '<span class="division-role">' + escapeHtml(d.role) + '</span>' +
        '<span class="division-note">' + escapeHtml(d.note) + '</span>' +
      '</a>';
    }).join('');
  }

  function renderFilters() {
    var host = $('#filters');
    if (!host) return;
    var all = [{ id: 'all', name: 'All' }, { id: 'nvr', name: 'NVR made' }, { id: 'community', name: 'Community' }].concat(COLLECTIONS);
    host.innerHTML = all.map(function (c) {
      return '<button type="button" class="filter" data-filter="' + c.id + '" aria-pressed="' +
        (c.id === activeFilter) + '">' + escapeHtml(c.name) + '</button>';
    }).join('');
  }

  function renderProducts() {
    var host = $('#grid');
    if (!host) return;

    var source = allItems();
    var items = activeFilter === 'all' ? source
      : activeFilter === 'nvr' ? source.filter(function (p) { return p.origin === ORIGIN.NVR; })
      : activeFilter === 'community' ? source.filter(function (p) { return p.origin === ORIGIN.SELLER; })
      : source.filter(function (p) { return p.collection === activeFilter; });

    host.innerHTML = items.map(function (p) {
      var c = collectionOf(p.collection);
      var chosen = sizeChoice[p.id] || '';
      var sizes = p.sizes.map(function (s) {
        return '<button type="button" class="size" data-size="' + escapeHtml(s) + '" aria-pressed="' +
          (s === chosen) + '">' + escapeHtml(s) + '</button>';
      }).join('');

      var tileArt = p.photoUrl
            ? '<img class="tile-photo" src="' + escapeHtml(p.photoUrl) + '" alt="' +
              escapeHtml(p.name) + '" loading="lazy" decoding="async" />'
            : silhouette(silhouetteFor(p), c.accentHex);

      return '' +
          '<article class="card" style="--accent:' + c.accentHex + '" data-id="' + p.id + '">' +
            '<div class="tile-wrap">' +
              '<div class="tile">' + tileArt + '</div>' +
              '<span class="tile-code">' + escapeHtml(p.code) + '</span>' +
              originBadge(p) +
            '</div>' +
          '<div class="card-body">' +
            '<div class="card-head">' +
              '<span class="card-name">' + escapeHtml(p.name) + '</span>' +
              '<span class="price-stack">' +
                '<span class="card-price">' + money(p.price) + '</span>' +
                '<span class="card-price-usd">' + usd(p.price) + '</span>' +
              '</span>' +
            '</div>' +
            '<p class="card-blurb">' + escapeHtml(p.blurb) + '</p>' +
            '<span class="tag">' + escapeHtml(p.weight) + ' &middot; <span class="stock">' + escapeHtml(p.stock) + '</span></span>' +
            '<div class="sizes" role="group" aria-label="Size for ' + escapeHtml(p.code) + '">' + sizes + '</div>' +
            // The guide only renders when the product actually carries measurements.
// A visitor on a cached older catalogue simply doesn't see the button,
// rather than clicking into an error.
'<button type="button" class="card-add"' + (chosen ? '' : ' disabled') +
              ' data-add="' + p.id + '">Add to bag</button>' +
            (hasGuide(p)
              ? '<button type="button" class="card-guide" data-guide="' + p.id + '">Size guide &amp; measurements</button>'
              : '') +
            '<a class="card-ask" href="' + escapeHtml(enquiryHref(
              'Hi NVR — I have a question about ' + p.code + ' (' + p.name + ').'
            ) || '#') + '" rel="noopener"' + (CONTACT.whatsapp ? '' : ' hidden') +
            '>Ask about this piece</a>' +
          '</div>' +
        '</article>';
    }).join('');
  }

  function renderBag() {
    var body = $('#bagBody');
    var countEl = $('#bagCount');
    var totalEl = $('#bagTotal');
    var totalUsdEl = $('#bagTotalUsd');
    var count = $('#bagItemCount');

    if (countEl) countEl.textContent = String(bagCount());
    if (totalEl) totalEl.textContent = money(bagTotal());
    if (totalUsdEl) totalUsdEl.textContent = usd(bagTotal());
    if (count) count.textContent = bag.length === 1 ? '1 item' : bag.length + ' items';

    if (!body) return;

    if (!bag.length) {
      body.innerHTML = '<p class="empty">Your bag is empty</p>';
    } else {
      body.innerHTML = bag.map(function (l) {
      var p = productOf(l.id);
      if (!p) return '';
      var c = collectionOf(p.collection);
      return '' +
        '<div class="line" style="--accent:' + c.accentHex + '">' +
          '<div class="line-tile" aria-hidden="true">' + escapeHtml(c.name) + '</div>' +
          '<div>' +
            '<p class="line-name">' + escapeHtml(p.name) + '</p>' +
            '<p class="line-meta">' + escapeHtml(p.code) + ' &middot; Size ' + escapeHtml(l.size) + '</p>' +
            '<div class="qty">' +
              '<button type="button" data-dec="' + p.id + '" data-size="' + escapeHtml(l.size) + '" aria-label="Decrease quantity of ' + escapeHtml(p.name) + '">&minus;</button>' +
              '<span aria-live="off">' + l.qty + '</span>' +
              '<button type="button" data-inc="' + p.id + '" data-size="' + escapeHtml(l.size) + '" aria-label="Increase quantity of ' + escapeHtml(p.name) + '">+</button>' +
            '</div>' +
          '</div>' +
          '<div class="line-right">' +
            '<span class="price-stack">' +
              '<span class="line-price">' + money(p.price * l.qty) + '</span>' +
              '<span class="line-price-usd">' + usd(p.price * l.qty) + '</span>' +
            '</span>' +
            '<button type="button" class="line-remove" data-rm="' + p.id + '" data-size="' + escapeHtml(l.size) + '">Remove</button>' +
          '</div>' +
        '</div>';
    }).join('');
    }

    var text = orderText();
    var out = $('#orderOut');
    if (out) out.value = text;

    // Keep the real hrefs in sync so they can be copied or opened without JS.
    var wa = $('#sendWhatsApp');
    var mail = $('#sendEmail');
    if (wa) {
      var waHref = bag.length ? whatsappHref() : null;
      wa.setAttribute('href', waHref || '#');
      wa.setAttribute('aria-disabled', waHref ? 'false' : 'true');
    }
    if (mail) {
      var mailHref = bag.length ? mailtoHref() : null;
      mail.setAttribute('href', mailHref || '#');
      mail.setAttribute('aria-disabled', mailHref ? 'false' : 'true');
    }
  }

  /* ---------- drawer ---------- */

  var lastFocus = null;

  function openDrawer() {
    var d = $('#bagDrawer');
    var s = $('#scrim');
    if (!d) return;
    // Only one dialog at a time.
    var g = $('#guideDrawer');
    if (g && g.getAttribute('data-open') === 'true') {
      g.setAttribute('data-open', 'false');
      g.setAttribute('aria-hidden', 'true');
      var gs = $('#guideScrim');
      if (gs) gs.setAttribute('data-open', 'false');
    }
    lastFocus = document.activeElement;
    d.setAttribute('data-open', 'true');
    d.removeAttribute('aria-hidden');
    if (s) s.setAttribute('data-open', 'true');
    document.body.style.overflow = 'hidden';
    var fab = $('#enquiryFab');
    if (fab) fab.classList.add('is-hidden');
    var close = $('[data-close]', d);
    if (close) close.focus();
  }

  function closeDrawer() {
    var d = $('#bagDrawer');
    var s = $('#scrim');
    if (!d) return;
    d.setAttribute('data-open', 'false');
    d.setAttribute('aria-hidden', 'true');
    if (s) s.setAttribute('data-open', 'false');
    document.body.style.overflow = '';
    var fab = $('#enquiryFab');
    if (fab) fab.classList.remove('is-hidden');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function trapFocus(e) {
    if (e.key !== 'Tab') return;
    // Whichever dialog is open owns the trap; only one can be at a time.
    var d = $('#bagDrawer');
    if (!d || d.getAttribute('data-open') !== 'true') d = $('#guideDrawer');
    if (!d || d.getAttribute('data-open') !== 'true') return;

    var focusable = $$('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])', d)
      .filter(function (el) { return el.offsetParent !== null; });

    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  /* ---------- responsive nav ---------- */

  function initNav() {
    var toggle = $('#navToggle');
    var nav = $('#primaryNav');
    if (!toggle || !nav) return;

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      nav.classList.toggle('is-open', open);
    }

    function isOpen() {
      return toggle.getAttribute('aria-expanded') === 'true';
    }

    toggle.addEventListener('click', function () {
      setOpen(!isOpen());
    });

    // Following a link should leave the menu closed behind you.
    nav.addEventListener('click', function (e) {
      if (e.target.closest('.nav-link')) setOpen(false);
    });

    document.addEventListener('click', function (e) {
      if (!isOpen()) return;
      if (e.target.closest('#primaryNav') || e.target.closest('#navToggle')) return;
      setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen()) {
        setOpen(false);
        toggle.focus();
      }
    });

    // A resize past the breakpoint hides the desktop nav again; make sure the
    // panel does not stay "open" while it is hidden.
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900 && isOpen()) setOpen(false);
    });
  }

  /* ---------- order tracking ---------- */

  var STATUS_COPY = {
    'new': 'Received',
    'confirmed': 'Confirmed',
    'made': 'Being made',
    'shipped': 'Dispatched',
    'done': 'Delivered',
    'cancelled': 'Cancelled'
  };

  function lookupOrder(ref, phone) {
    if (!SUPABASE.supabaseUrl || !SUPABASE.supabaseAnonKey) {
      return Promise.resolve({ unavailable: true });
    }

    return fetch(SUPABASE.supabaseUrl + '/rest/v1/rpc/lookup_order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE.supabaseAnonKey,
        'Authorization': 'Bearer ' + SUPABASE.supabaseAnonKey
      },
      body: JSON.stringify({ p_reference: ref, p_phone: phone })
    }).then(function (res) {
      // The function lives in supabase.sql. Until it has been run, PostgREST
      // answers 404 and we say so rather than leaving a form that does nothing.
      if (res.status === 404) return { unavailable: true };
      if (!res.ok) return { error: true, status: res.status };
      return res.json();
    }).catch(function () {
      return { error: true, status: 0 };
    });
  }

  function renderTrackedOrder(order) {
    var items = Array.isArray(order.items) ? order.items : [];
    var status = order.status || 'new';

    var lines = items.map(function (it) {
      return '<li class="track-line">' +
        '<span>' + escapeHtml(it.code) + ' &middot; Size ' + escapeHtml(it.size) +
          ' &times; ' + escapeHtml(String(it.qty)) + '</span>' +
        '<span>' + money(it.line) + '</span>' +
      '</li>';
    }).join('');

    var when = '';
    if (order.created_at) {
      var d = new Date(order.created_at);
      if (!isNaN(d.getTime())) {
        when = d.toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' });
      }
    }

    return '<div class="track-card">' +
      '<div class="track-head">' +
        '<div>' +
          '<p class="tag" style="margin:0 0 .25rem">Reference</p>' +
          '<p class="track-ref">' + escapeHtml(order.reference) + '</p>' +
        '</div>' +
        '<span class="track-status-pill" data-status="' + escapeHtml(status) + '">' +
          escapeHtml(STATUS_COPY[status] || status) + '</span>' +
      '</div>' +
      '<ul class="track-lines">' + lines + '</ul>' +
      '<div class="track-total"><span>Total</span><span>' + money(order.subtotal) + '</span></div>' +
      (when ? '<p class="track-when">Ordered ' + escapeHtml(when) + '</p>' : '') +
    '</div>';
  }

  function initTracking() {
    var form = $('#trackForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ref = ($('#trackRef').value || '').trim();
      var phone = ($('#trackPhone').value || '').trim();
      var status = $('#trackStatus');
      var out = $('#trackResult');

      if (!ref || !phone) {
        if (status) status.textContent = 'Enter both your reference and your phone number.';
        if (out) out.innerHTML = '';
        return;
      }

      if (status) status.textContent = 'Looking...';
      if (out) out.innerHTML = '';

      lookupOrder(ref, phone).then(function (result) {
        if (result && result.unavailable) {
          if (status) status.textContent = 'Order tracking is not switched on yet. Message us on WhatsApp and we will check for you.';
          return;
        }
        if (!result) {
          if (status) status.textContent = 'We could not find that. Check the reference and phone number.';
          return;
        }
        if (result.error) {
          if (status) status.textContent = 'Something went wrong on our side. Message us on WhatsApp instead.';
          return;
        }
        if (status) status.textContent = '';
        if (out) out.innerHTML = renderTrackedOrder(result);
      });
    });
  }

  /* ---------- photo upload ---------- */

  var MAX_PHOTOS = 6;
  var MAX_BYTES = 8 * 1024 * 1024;
  var OK_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
  var stagedPhotos = [];   // { file, url, key, state }

  function photoError(msg) {
    var el = $('#photoError');
    if (el) el.textContent = msg || '';
  }

  function renderPhotoGrid() {
    var grid = $('#photoGrid');
    if (!grid) return;
    grid.innerHTML = stagedPhotos.map(function (p, i) {
      return '<li class="photo-item' + (p.state === 'uploading' ? ' is-uploading' : '') + '">' +
        '<img src="' + p.url + '" alt="Garment photo ' + (i + 1) + '" loading="lazy" />' +
        '<button type="button" class="photo-remove" data-photo-remove="' + i + '" aria-label="Remove photo ' + (i + 1) + '">&times;</button>' +
      '</li>';
    }).join('');
  }

  function validateFiles(files) {
    var accepted = [];
    var rejected = [];
    Array.prototype.slice.call(files).forEach(function (f) {
      if (stagedPhotos.length + accepted.length >= MAX_PHOTOS) {
        rejected.push(f.name + ' — over the ' + MAX_PHOTOS + ' photo limit');
        return;
      }
      if (OK_TYPES.indexOf(f.type) === -1) {
        rejected.push(f.name + ' — not a JPEG, PNG or WebP');
        return;
      }
      if (f.size > MAX_BYTES) {
        rejected.push(f.name + ' — larger than 8MB');
        return;
      }
      accepted.push(f);
    });
    return { accepted: accepted, rejected: rejected };
  }

  function uploadOne(file, key) {
    return fetch(SUPABASE.supabaseUrl + '/storage/v1/object/listing-photos/' + key, {
      method: 'POST',
      headers: {
        'Content-Type': file.type,
        'apikey': SUPABASE.supabaseAnonKey,
        'Authorization': 'Bearer ' + SUPABASE.supabaseAnonKey,
        'x-upsert': 'false'
      },
      body: file
    }).then(function (res) {
      if (!res.ok) throw new Error('upload failed ' + res.status);
      return key;
    }).catch(function () {
      throw new Error('Could not upload ' + file.name);
    });
  }

  function handleFiles(files) {
    var check = validateFiles(files);

    check.accepted.forEach(function (file) {
      var item = { file: file, url: URL.createObjectURL(file), key: null, state: 'ready' };
      stagedPhotos.push(item);
    });

    renderPhotoGrid();

    if (check.rejected.length) {
      photoError(check.rejected.join(' · '));
    } else if (check.accepted.length) {
      photoError('');
    }

    if (!check.accepted.length) return;

    // Upload only once the seller row exists, so files land under their ref.
    if (!stagedPhotos[0].key) return;

    uploadPending(check.accepted);
  }

  function uploadPending() {
    if (!SUPABASE.supabaseUrl || !SUPABASE.supabaseAnonKey) return Promise.resolve();
    var sellerRef = stagedPhotos._sellerRef;
    if (!sellerRef) return Promise.resolve();

    var jobs = stagedPhotos
      .filter(function (p) { return p.state === 'ready'; })
      .map(function (p) {
        p.state = 'uploading';
        renderPhotoGrid();
        var ext = (p.file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg';
        var key = sellerRef + '/' + Math.random().toString(36).slice(2, 10) + '.' + ext;
        return uploadOne(p.file, key).then(function (k) {
          p.key = k;
          p.state = 'done';
        }).catch(function () {
          p.state = 'failed';
        });
      });

    return Promise.all(jobs).then(renderPhotoGrid);
  }

  function initPhotos() {
    var input = $('#photoInput');
    var drop = $('#photoDrop');
    if (!input || !drop) return;

    input.addEventListener('change', function () {
      handleFiles(input.files);
      input.value = '';   // so the same file can be re-picked
    });

    ['dragenter', 'dragover'].forEach(function (ev) {
      drop.addEventListener(ev, function (e) {
        e.preventDefault();
        drop.classList.add('is-over');
      });
    });
    ['dragleave', 'drop'].forEach(function (ev) {
      drop.addEventListener(ev, function (e) {
        e.preventDefault();
        drop.classList.remove('is-over');
      });
    });
    drop.addEventListener('drop', function (e) {
      if (e.dataTransfer && e.dataTransfer.files) handleFiles(e.dataTransfer.files);
    });

    var grid = $('#photoGrid');
    if (grid) {
      grid.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-photo-remove]');
        if (!btn) return;
        var i = parseInt(btn.getAttribute('data-photo-remove'), 10);
        if (stagedPhotos[i] && stagedPhotos[i].url) URL.revokeObjectURL(stagedPhotos[i].url);
        stagedPhotos.splice(i, 1);
        renderPhotoGrid();
        photoError('');
      });
    }
  }

  /* ---------- garment silhouettes ---------- */

  /* Not photography, and not pretending to be. These are honest garment
     outlines so a product card reads as clothing rather than an empty grey
     box, until real photos arrive. Anything drawn from CSS tiles was the
     weakest part of the storefront. */
  function silhouette(kind, accent) {
    var c = accent || '#f5f5ee';
    var parts = {
      tee: '<path d="M60 26 L86 38 L112 54 L100 78 L88 72 L88 150 L32 150 L32 72 L20 78 L8 54 L34 38 Z" ' +
           'fill="' + c + '" opacity=".9"/><path d="M46 26 Q60 44 74 26" fill="none" stroke="#0a0a0a" stroke-width="4"/>',
      hoodie: '<path d="M60 24 L88 38 L112 56 L100 80 L88 74 L88 152 L32 152 L32 74 L20 80 L8 56 L32 38 Z" ' +
           'fill="' + c + '" opacity=".9"/>' +
           '<path d="M44 26 Q60 46 76 26" fill="none" stroke="#0a0a0a" stroke-width="4"/>' +
           '<path d="M40 96 L80 96 L74 128 L46 128 Z" fill="#0a0a0a" opacity=".35"/>' +
           '<path d="M58 44 L54 76 M64 44 L68 76" stroke="#0a0a0a" stroke-width="3" stroke-linecap="round"/>',
      pant: '<path d="M36 40 L84 40 L88 70 L84 152 L64 152 L60 96 L56 152 L36 152 L32 70 Z" ' +
           'fill="' + c + '" opacity=".9"/><path d="M36 50 L84 50" stroke="#0a0a0a" stroke-width="3" opacity=".4"/>',
      cap: '<path d="M22 104 Q22 52 78 48 Q112 46 116 78 L116 92 L64 92 Z" fill="' + c + '" opacity=".9"/>' +
           '<path d="M22 104 Q60 88 116 92 L116 106 Q60 100 22 116 Z" fill="' + c + '" opacity=".55"/>' +
           '<circle cx="78" cy="48" r="5" fill="#0a0a0a" opacity=".5"/>',
      shell: '<path d="M60 24 L88 38 L114 56 L102 82 L90 76 L90 150 L30 150 L30 76 L18 82 L6 56 L32 38 Z" ' +
           'fill="' + c + '" opacity=".9"/>' +
           '<path d="M60 26 L60 150" stroke="#0a0a0a" stroke-width="3" opacity=".35"/>' +
           '<path d="M34 60 L86 60 M34 70 L86 70" stroke="#0a0a0a" stroke-width="2.5" opacity=".28"/>',
      crew: '<path d="M60 24 L88 38 L112 56 L100 80 L88 74 L88 150 L32 150 L32 74 L20 80 L8 56 L32 38 Z" ' +
           'fill="' + c + '" opacity=".9"/>' +
           '<path d="M44 27 Q60 46 76 27" fill="none" stroke="#0a0a0a" stroke-width="6" opacity=".55"/>',
      fleece: '<path d="M60 24 L88 38 L112 56 L100 80 L88 74 L88 152 L32 152 L32 74 L20 80 L8 56 L32 38 Z" ' +
           'fill="' + c + '" opacity=".9"/>' +
           '<path d="M42 28 Q60 50 78 28" fill="none" stroke="#0a0a0a" stroke-width="9" opacity=".55"/>' +
           '<path d="M44 104 L76 104 L72 132 L48 132 Z" fill="#0a0a0a" opacity=".3"/>'
    };
    var shape = parts[kind] || parts.tee;
    return '<svg class="tile-art" viewBox="0 0 120 176" width="120" height="176" aria-hidden="true" focusable="false">' +
      shape + '</svg>';
  }

  function silhouetteFor(p) {
    var n = (p.name || '').toLowerCase();
    if (/cap|hat/.test(n)) return 'cap';
    if (/hoodie|sweat|fleece|sweatshirt/.test(n)) return /fleece/.test(n) ? 'fleece' : (/hoodie/.test(n) ? 'hoodie' : 'crew');
    if (/pant|trouser|jean/.test(n)) return 'pant';
    if (/shell|jacket|coat/.test(n)) return 'shell';
    return 'tee';
  }

  /* ---------- premium / NVR Studio ---------- */

  function renderStudio() {
    var grid = $('#studioGrid');
    if (grid) {
      grid.innerHTML = PREMIUM.includes.map(function (f) {
        return '<div class="studio-card">' +
          '<span class="studio-n">' + escapeHtml(PREMIUM.label) + '</span>' +
          '<h3>' + escapeHtml(f.title) + '</h3>' +
          '<p>' + escapeHtml(f.body) + '</p>' +
        '</div>';
      }).join('');
    }

    var not = $('#studioNot');
    if (not) not.textContent = PREMIUM.whatItIsNot;

    var cta = $('#studioCta');
    if (cta) {
      // Never render a checkout that cannot take payment. Until a recurring
      // billing provider is wired up, the only honest action is "apply".
      if (PREMIUM.priceNaira) {
        cta.textContent = PREMIUM.label + ' — ' + money(PREMIUM.priceNaira);
        cta.setAttribute('href', '#sell');
      } else {
        cta.textContent = PREMIUM.label + ' — enquire';
        cta.setAttribute('href', whatsappHref() ||
          'https://wa.me/' + whatsappNumber() + '?text=' + encodeURIComponent(
            'Hi NVR — tell me about NVR Studio and how to join.'));
      }
    }
  }

  /* Premium is a service badge, not a position. It says who did the work. */
  function premiumBadge() {
    return '<span class="studio-badge">Shot by NVR</span>';
  }

  /* ---------- sell with NVR ---------- */

  function shortRef(prefix) {
    var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    var out = '';
    for (var i = 0; i < 4; i++) out += chars[Math.floor(Math.random() * chars.length)];
    return prefix + out;
  }

  var val = function (id) {
    var el = $(id);
    return el ? String(el.value || '').trim() : '';
  };

  function postJson(path, body) {
    if (!SUPABASE.supabaseUrl || !SUPABASE.supabaseAnonKey) {
      return Promise.resolve({ unavailable: true });
    }
    return fetch(SUPABASE.supabaseUrl + '/rest/v1/' + path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE.supabaseAnonKey,
        'Authorization': 'Bearer ' + SUPABASE.supabaseAnonKey,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(body)
    }).then(function (res) {
      // sellers/listings come from supabase.sql. Until it is run the endpoint
      // answers 404 and the application falls back to WhatsApp.
      if (res.status === 404) return { unavailable: true };
      if (res.status === 409) return { duplicate: true };
      if (!res.ok) return { error: true, status: res.status };
      return { ok: true };
    }).catch(function () {
      return { error: true, status: 0 };
    });
  }

  function initSelling() {
    var form = $('#sellForm');
    if (!form) return;

    var photos = $('#sellPhotos');
    if (photos) {
      photos.innerHTML = SELLING.photosNeeded.map(function (p) {
        return '<li>' + escapeHtml(p) + '</li>';
      }).join('');
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var err = $('#sellError');
      var setErr = function (m) { if (err) err.textContent = m; };

      var name = val('#sName');
      var phone = val('#sPhone');
      var brand = val('#lBrand');
      var garment = val('#lGarment');
      var condition = val('#lCondition');
      var price = parseInt(val('#lPrice'), 10);

      if (!name || !phone) { setErr('We need your name and a phone number.'); return; }
      if (!brand || !garment) { setErr('Tell us the brand and the garment.'); return; }
      if (!condition) { setErr('Choose a condition.'); return; }
      if (!price || price < 1) { setErr('Put a price on it, in naira.'); return; }

      setErr('');
      var net = Math.round(price * (1 - SELLING.commissionPct / 100));
      var sref = shortRef('SLR-');

      var sellerPayload = {
        reference: sref,
        full_name: name,
        phone: phone,
        email: val('#sEmail') || null,
        city: val('#sCity') || null,
        handle: val('#sHandle') || null,
        bio: val('#sBio') || null,
        payout_to: val('#sPayout') || null,
        status: 'pending'
      };

      postJson('sellers', sellerPayload).then(function (res) {
        if (res && res.unavailable) {
          // Database not set up. Don't lose the application — hand it over
          // as a ready-to-send WhatsApp message instead.
          var body = [
            'NVR SELLER APPLICATION',
            'Name: ' + name,
            'Phone: ' + phone,
            'City: ' + (sellerPayload.city || '-'),
            'Handle: ' + (sellerPayload.handle || '-'),
            'Payout: ' + (sellerPayload.payout_to || '-'),
            'About: ' + (sellerPayload.bio || '-'),
            '',
            'Brand: ' + brand,
            'Garment: ' + garment,
            'Size: ' + (val('#lSize') || '-'),
            'Condition: ' + condition,
            'Asking: N' + price + ' (NVR keeps ' + SELLING.commissionPct + '%, you get N' + net + ')',
            'Notes: ' + (val('#lNotes') || '-'),
            '',
            'Photos to follow: ' + SELLING.photosNeeded.join('; '),
            'Photos attached to the form: ' + stagedPhotos.length
          ].join('\n');

          $('#sellResult').innerHTML =
            '<div class="track-card">' +
              '<p class="tag tag--accent" style="margin:0 0 .5rem">Not connected yet</p>' +
              '<p>Applications are not being stored on the website yet. Send yours straight to us on WhatsApp — it is filled in for you.</p>' +
              '<a class="btn btn--volt btn--block" href="https://wa.me/' + whatsappNumber() +
                '?text=' + encodeURIComponent(body) + '" rel="noopener">Send on WhatsApp</a>' +
            '</div>';
          form.hidden = true;
          return;
        }

        if (res && res.error) {
          setErr('Something went wrong on our side. Message us on WhatsApp and we will take it from there.');
          return;
        }

        // Seller exists, so photos can now be filed under their reference.
        stagedPhotos._sellerRef = sref;
        uploadPending();

        // The seller row exists. The listing needs seller_id, which a minimal
        // insert does not return, so read it back by reference.
        fetch(SUPABASE.supabaseUrl + '/rest/v1/sellers?reference=eq.' + encodeURIComponent(sref) + '&select=id', {
          headers: {
            'apikey': SUPABASE.supabaseAnonKey,
            'Authorization': 'Bearer ' + SUPABASE.supabaseAnonKey
          }
        }).then(function (r) { return r.ok ? r.json() : []; })
          .catch(function () { return []; })
          .then(function (rows) {
            var sellerId = rows && rows[0] ? rows[0].id : null;
            if (!sellerId) return null;
            return postJson('listings', {
              reference: shortRef('LST-'),
              seller_id: sellerId,
              brand: brand,
              garment: garment,
              size: val('#lSize') || null,
              condition: condition,
              asking_price: price,
              commission_pct: SELLING.commissionPct,
              payout_amount: net,
              notes: val('#lNotes') || null,
              has_label_photo: false,
              has_back_photo: false,
              status: 'pending'
            });
          })
          .then(function () {
            var wa = 'https://wa.me/' + whatsappNumber() + '?text=' + encodeURIComponent(
              'Hi NVR — I just applied to sell with NVR. My reference is ' + sref +
              '. Photos to follow: ' + SELLING.photosNeeded.join('; ') + '.'
            );
            $('#sellResult').innerHTML =
              '<div class="track-card">' +
                '<p class="tag tag--accent" style="margin:0 0 .5rem">Application sent</p>' +
                '<p>Keep this reference. Send your four photos on WhatsApp and quote it.</p>' +
                '<p class="track-ref">' + sref + '</p>' +
                '<a class="btn btn--volt btn--block" href="' + wa + '" rel="noopener">Send the photos</a>' +
                '<p class="details-note" style="margin-top:1rem">' + escapeHtml(SELLING.note) + '</p>' +
              '</div>';
            form.hidden = true;
          });
      });
    });
  }

  /* ---------- payment + enquiries ---------- */

  function bankReady() {
    return !!(BANK.provider && BANK.accountName && BANK.accountNumber);
  }

  function enquiryHref(message) {
    if (!CONTACT.whatsapp) return null;
    return 'https://wa.me/' + whatsappNumber() + '?text=' + encodeURIComponent(message);
  }

  function renderPayment() {
    var flow = $('#payFlow');
    if (flow) {
      flow.innerHTML = PAYMENT_STEPS.map(function (s) {
        return '<li class="flow-step">' +
          '<span class="flow-n">' + s.n + '</span>' +
          '<h3>' + escapeHtml(s.title) + '</h3>' +
          '<p>' + escapeHtml(s.body) + '</p>' +
        '</li>';
      }).join('');
    }

    var block = $('#bankBlock');
    if (!block) return;

    // Never show a placeholder account number. Until it is filled in, say so.
    if (!bankReady()) {
      block.innerHTML =
        '<div class="bank-inner">' +
          '<span class="tag tag--accent">How to pay</span>' +
          '<p class="bank-missing">Transfer details are not published yet. ' +
          'Ask on WhatsApp and we will send them with your order confirmation.</p>' +
        '</div>';
      return;
    }

    block.innerHTML =
      '<div class="bank-inner">' +
        '<span class="tag tag--accent">How to pay</span>' +
        '<dl class="bank-list">' +
          '<div class="bank-row"><dt>' + escapeHtml(BANK.providerLabel) + '</dt>' +
            '<dd>' + escapeHtml(BANK.provider) + '</dd></div>' +
          '<div class="bank-row"><dt>Account name</dt>' +
            '<dd>' + escapeHtml(BANK.accountName) + '</dd></div>' +
          '<div class="bank-row"><dt>' + escapeHtml(BANK.numberLabel) + '</dt><dd>' +
            '<span id="bankNumber">' + escapeHtml(BANK.accountNumber) + '</span>' +
            '<button type="button" class="bank-copy" id="copyBank">Copy</button>' +
          '</dd></div>' +
        '</dl>' +
        '<p class="bank-note">Transfer the exact amount to the ' +
          escapeHtml(BANK.provider) + ' number above, then send the receipt on ' +
          'WhatsApp so we can match it to your order. We only start once the ' +
          'transfer shows.</p>' +
      '</div>';
  }

  function setEnquiryFab() {
    var fab = $('#enquiryFab');
    if (!fab) return;
    var href = enquiryHref('Hi NVR — I have a question about a piece.');
    if (!href) {
      fab.setAttribute('hidden', '');
      return;
    }
    fab.setAttribute('href', href);
  }

  /* ---------- size guide ---------- */

  function hasGuide(p) {
    if (!p || !Array.isArray(p.metrics) || !p.measurements || !Array.isArray(p.sizes)) return false;
    return p.sizes.every(function (s) {
      return Array.isArray(p.measurements[s]) && p.measurements[s].length === p.metrics.length;
    });
  }

  function openGuide(id) {
    var p = productOf(id);
    var body = $('#guideBody');
    var drawer = $('#guideDrawer');
    var scrim = $('#guideScrim');
    if (!p || !body || !drawer) return;
    if (!hasGuide(p)) return;

    var rows = p.metrics.map(function (label, i) {
      var cells = p.sizes.map(function (s) {
        var vals = p.measurements[s] || [];
        var v = vals[i];
        return '<td>' + (v === undefined ? '—' : v) + '</td>';
      }).join('');
      return '<tr><th scope="row">' + escapeHtml(label) + '</th>' + cells + '</tr>';
    }).join('');

    body.innerHTML =
      '<p class="tag tag--accent">' + escapeHtml(p.code) + '</p>' +
      '<h3 class="guide-name">' + escapeHtml(p.name) + '</h3>' +
      '<table class="guide-table">' +
        '<caption class="skip-link">Measurements in centimetres</caption>' +
        '<thead><tr><th scope="col">cm</th>' +
          p.sizes.map(function (s) { return '<th scope="col">' + escapeHtml(s) + '</th>'; }).join('') +
        '</tr></thead>' +
        '<tbody>' + rows + '</tbody>' +
      '</table>' +
      '<p class="guide-note">' + escapeHtml(p.guideNote) + '</p>' +
      '<p class="guide-cta">' +
        '<button type="button" class="btn btn--volt btn--block" data-guide-pick="' + escapeHtml(p.id) + '">' +
          '<span>Choose a size</span> <span aria-hidden="true">&rarr;</span>' +
        '</button>' +
      '</p>';

    guideProduct = id;
    lastFocus = document.activeElement;
    drawer.setAttribute('data-open', 'true');
    drawer.removeAttribute('aria-hidden');
    if (scrim) scrim.setAttribute('data-open', 'true');
    document.body.style.overflow = 'hidden';
    var fabEl = $('#enquiryFab');
    if (fabEl) fabEl.classList.add('is-hidden');
    var close = $('[data-guide-close]', drawer);
    if (close) close.focus();
  }

  function closeGuide() {
    var drawer = $('#guideDrawer');
    var scrim = $('#guideScrim');
    if (!drawer) return;
    drawer.setAttribute('data-open', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    if (scrim) scrim.setAttribute('data-open', 'false');
    document.body.style.overflow = '';
    var fab = $('#enquiryFab');
    if (fab) fab.classList.remove('is-hidden');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  var guideProduct = null;

  /* ---------- send channels ---------- */

  function mailtoHref() {
    if (!CONTACT.email) return null;
    return 'mailto:' + CONTACT.email +
      '?subject=' + encodeURIComponent('NVR order ' + currentRef) +
      '&body=' + encodeURIComponent(orderText());
  }

  /* wa.me rejects +, spaces and dashes, so normalise whatever was pasted. */
  function whatsappNumber() {
    if (!CONTACT.whatsapp) return '';
    var digits = String(CONTACT.whatsapp).replace(/\D/g, '');
    // A bare 10-digit local number gets the Nigeria country code prepended.
    if (digits.length === 10) digits = (digits[0] === '0' ? '234' + digits.slice(1) : '234' + digits);
    return digits;
  }

  function whatsappHref() {
    var num = whatsappNumber();
    if (!num) return null;
    return 'https://wa.me/' + num + '?text=' + encodeURIComponent(orderText());
  }

  function orderItems() {
    return bag.map(function (l) {
      var p = productOf(l.id);
      if (!p) return null;
      return {
        code: p.code,
        name: p.name,
        size: l.size,
        qty: l.qty,
        price: p.price,
        line: +(p.price * l.qty).toFixed(2)
      };
    }).filter(Boolean);
  }

  /* ---------- Supabase logging ---------- */

  function logOrder(channel) {
    // No project configured: skip silently. The other channels still work.
    if (!SUPABASE.supabaseUrl || !SUPABASE.supabaseAnonKey) {
      return Promise.resolve({ skipped: true });
    }

    var payload = {
      reference: currentRef,
      full_name: ($('#custName') && $('#custName').value || '').trim() || null,
      phone: ($('#custPhone') && $('#custPhone').value || '').trim() || null,
      items: orderItems(),
      item_count: bagCount(),
      subtotal: bagTotal(),
      channel: channel,
      status: 'new'
    };

    return fetch(SUPABASE.supabaseUrl + '/rest/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE.supabaseAnonKey,
        'Authorization': 'Bearer ' + SUPABASE.supabaseAnonKey,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(payload)
    }).then(function (res) {
      // 404 means the table hasn't been created yet - the usual case
      // until supabase.sql has been run once.
      return { ok: res.ok, status: res.status, missing: res.status === 404 };
    }).catch(function () {
      // Logging must never block the customer's order path.
      return { ok: false, status: 0, missing: false };
    });
  }

  function reportLogging(result) {
    var el = $('#logStatus');
    if (!el) return;
    if (!result || result.skipped) { el.textContent = ''; return; }
    if (result.ok) {
      el.textContent = 'Order saved to our records.';
    } else if (result.missing) {
      el.textContent = 'Sent. (Order not logged — database not set up yet.)';
    } else {
      el.textContent = 'Sent.';
    }
  }

  /* ---------- copy order ---------- */

  function copyOrder() {
    var text = orderText();
    var status = $('#orderStatus');
    var out = $('#orderOut');
    if (!text) return;

    function done(ok) {
      if (!status) return;
      status.textContent = ok
        ? 'Order copied. Send it to NVR by DM or email.'
        : 'Copy blocked — select the order above and copy manually.';
    }

    /* Fallback for file://, insecure contexts, and denied clipboard permission. */
    function legacyCopy() {
      if (!out) return false;
      try {
        out.focus();
        out.select();
        out.setSelectionRange(0, out.value.length);
        return document.execCommand('copy');
      } catch (e) {
        return false;
      }
    }

    // A rejected promise here is common (denied permission, no user gesture),
    // so fall through to legacyCopy rather than giving up.
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        function () { done(true); },
        function () { done(legacyCopy()); }
      );
      return;
    }

    done(legacyCopy());
  }

  /* ---------- reveal on scroll ---------- */

  function initReveal() {
    document.documentElement.classList.remove('no-js');

    var els = $$('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var delay = entry.target.getAttribute('data-reveal-delay');
        if (delay) entry.target.style.transitionDelay = delay + 'ms';
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- wiring ---------- */

  function init() {
    loadBag();
    renderCollections();
    renderStudio();
    loadSellerItems().then(function () {
      renderProducts();
      var note = $('#communityNote');
      if (note) {
        note.hidden = sellerItems.length === 0;
        var n = $('#communityCount');
        if (n) n.textContent = sellerItems.length;
      }
    });
    renderDivisions();
    renderHow();
    renderPayment();
    setEnquiryFab();
    renderFilters();
    renderProducts();
    renderBag();

    var grid = $('#grid');
    if (grid) {
      grid.addEventListener('click', function (e) {
        var guideBtn = e.target.closest('[data-guide]');
        if (guideBtn) {
          openGuide(guideBtn.getAttribute('data-guide'));
          return;
        }

        var sizeBtn = e.target.closest('[data-size]');
        var card = e.target.closest('.card');
        if (!card) return;

        var id = card.getAttribute('data-id');

        if (sizeBtn) {
          var s = sizeBtn.getAttribute('data-size');
          sizeChoice[id] = (sizeChoice[id] === s) ? '' : s;
          renderProducts();
          return;
        }

        var addBtn = e.target.closest('[data-add]');
        if (addBtn && sizeChoice[id]) {
          addToBag(id, sizeChoice[id]);
          renderBag();
          announce('Added ' + productOf(id).code + ' size ' + sizeChoice[id] + ' to your bag.');
          openDrawer();
        }
      });
    }

    var filters = $('#filters');
    if (filters) {
      filters.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-filter]');
        if (!btn) return;
        activeFilter = btn.getAttribute('data-filter');
        renderFilters();
        renderProducts();
      });
    }

    var collections = $('#collectionGrid');
    if (collections) {
      collections.addEventListener('click', function (e) {
        var card = e.target.closest('[data-filter]');
        if (!card) return;
        e.preventDefault();
        activeFilter = card.getAttribute('data-filter');
        renderFilters();
        renderProducts();
        var shop = $('#shop');
        if (shop) shop.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    var body = $('#bagBody');
    if (body) {
      body.addEventListener('click', function (e) {
        var inc = e.target.closest('[data-inc]');
        var dec = e.target.closest('[data-dec]');
        var rm = e.target.closest('[data-rm]');
        var btn = inc || dec || rm;
        if (!btn) return;
        var id, size, qty = 1;

        if (inc) {
          id = inc.getAttribute('data-inc'); size = inc.getAttribute('data-size');
          var cur = 0;
          for (var i = 0; i < bag.length; i++) {
            if (lineKey(bag[i].id, bag[i].size) === lineKey(id, size)) { cur = bag[i].qty; break; }
          }
          qty = cur + 1;
        } else if (dec) {
          id = dec.getAttribute('data-dec'); size = dec.getAttribute('data-size');
          var cur2 = 1;
          for (var j = 0; j < bag.length; j++) {
            if (lineKey(bag[j].id, bag[j].size) === lineKey(id, size)) { cur2 = bag[j].qty; break; }
          }
          qty = cur2 - 1;
        } else {
          id = rm.getAttribute('data-rm'); size = rm.getAttribute('data-size'); qty = 0;
        }

        setQty(id, size, qty);
        renderBag();
      });
    }

    var openBtn = $('#bagOpen');
    if (openBtn) openBtn.addEventListener('click', openDrawer);

    $$('[data-close]').forEach(function (el) { el.addEventListener('click', closeDrawer); });

    var scrim = $('#scrim');
    if (scrim) scrim.addEventListener('click', closeDrawer);

    // Size guide: open from the card, close via button, scrim or Escape.
    $$('[data-guide-close]').forEach(function (el) {
      el.addEventListener('click', closeGuide);
    });

    var guideScrim = $('#guideScrim');
    if (guideScrim) guideScrim.addEventListener('click', closeGuide);

    var guideBody = $('#guideBody');
    if (guideBody) {
      guideBody.addEventListener('click', function (e) {
        var pick = e.target.closest('[data-guide-pick]');
        if (!pick) return;
        closeGuide();
        // Send focus to the size buttons for the garment just measured.
        var card = document.querySelector('#grid .card[data-id="' + pick.getAttribute('data-guide-pick') + '"]');
        if (!card) return;
        var firstSize = card.querySelector('.size');
        if (firstSize) {
          firstSize.focus();
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    }

    // Copy the account number without making the customer select it by hand.
    var bankBlock = $('#bankBlock');
    if (bankBlock) {
      bankBlock.addEventListener('click', function (e) {
        if (!e.target.closest('#copyBank')) return;
        var num = $('#bankNumber');
        if (!num) return;
        var done = function (ok) {
          var btn = $('#copyBank');
          if (btn) btn.textContent = ok ? 'Copied' : 'Press Ctrl+C';
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(num.textContent.trim()).then(
            function () { done(true); }, function () { done(false); }
          );
          return;
        }
        var range = document.createRange();
        range.selectNodeContents(num);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        done(document.execCommand('copy'));
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        var g = $('#guideDrawer');
        if (g && g.getAttribute('data-open') === 'true') { closeGuide(); return; }
        var d = $('#bagDrawer');
        if (d && d.getAttribute('data-open') === 'true') closeDrawer();
      }
      trapFocus(e);
    });

    var copyBtn = $('#copyOrder');
    if (copyBtn) copyBtn.addEventListener('click', copyOrder);

    // Channels with nowhere to send are hidden rather than left broken.
    var waBtn = $('#sendWhatsApp');
    var mailBtn = $('#sendEmail');

    if (waBtn) {
      if (CONTACT.whatsapp) {
        waBtn.addEventListener('click', function (e) {
          // Anchors navigate on their own; JS only records the order.
          if (waBtn.getAttribute('aria-disabled') === 'true') {
            e.preventDefault();
            return;
          }
          logOrder('whatsapp').then(reportLogging);
        });
      } else {
        waBtn.setAttribute('hidden', '');
      }
    }

    if (mailBtn) {
      if (CONTACT.email) {
        mailBtn.addEventListener('click', function (e) {
          if (mailBtn.getAttribute('aria-disabled') === 'true') {
            e.preventDefault();
            return;
          }
          logOrder('email').then(reportLogging);
        });
      } else {
        mailBtn.setAttribute('hidden', '');
      }
    }

    // Warning if neither channel is configured — otherwise the bag dead-ends.
    var warn = $('#noChannel');
    if (warn && !CONTACT.whatsapp && !CONTACT.email) warn.removeAttribute('hidden');

    // Remember who is ordering, so they only type it once.
    ['#custName', '#custPhone'].forEach(function (sel) {
      var el = $(sel);
      if (!el) return;
      var key = 'nvr-cust-' + sel.replace('#cust', '').toLowerCase();
      try { el.value = localStorage.getItem(key) || ''; } catch (e) { /* private mode */ }
      el.addEventListener('input', function () {
        try { localStorage.setItem(key, el.value); } catch (e) { /* private mode */ }
        // Keep the copied order text in step with what they have typed.
        var out = $('#orderOut');
        if (out && bag.length) out.value = orderText();
      });
    });

    initNav();
    initTracking();
    initSelling();
    initPhotos();
    renderStudio();
    initReveal();
  }

  function announce(msg) {
    var live = $('#live');
    if (live) live.textContent = msg;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();