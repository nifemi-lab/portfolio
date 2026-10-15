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
    for (var i = 0; i < COLLECTIONS.length; i++) {
      if (COLLECTIONS[i].id === id) return COLLECTIONS[i];
    }
    return COLLECTIONS[0];
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
    lines.push('No payment taken. Send this with your name and delivery');
    lines.push('address and we will confirm by hand.');

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
    var all = [{ id: 'all', name: 'All' }].concat(COLLECTIONS);
    host.innerHTML = all.map(function (c) {
      return '<button type="button" class="filter" data-filter="' + c.id + '" aria-pressed="' +
        (c.id === activeFilter) + '">' + escapeHtml(c.name) + '</button>';
    }).join('');
  }

  function renderProducts() {
    var host = $('#grid');
    if (!host) return;

    var items = activeFilter === 'all'
      ? CATALOG
      : CATALOG.filter(function (p) { return p.collection === activeFilter; });

    host.innerHTML = items.map(function (p) {
      var c = collectionOf(p.collection);
      var chosen = sizeChoice[p.id] || '';
      var sizes = p.sizes.map(function (s) {
        return '<button type="button" class="size" data-size="' + escapeHtml(s) + '" aria-pressed="' +
          (s === chosen) + '">' + escapeHtml(s) + '</button>';
      }).join('');

      return '' +
        '<article class="card" style="--accent:' + c.accentHex + '" data-id="' + p.id + '">' +
          '<div class="tile-wrap">' +
            '<div class="tile"><span class="tile-mark">' + escapeHtml(c.name) + '</span></div>' +
            '<span class="tile-code">' + escapeHtml(p.code) + '</span>' +
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
      return { ok: res.ok, status: res.status };
    }).catch(function () {
      // Logging must never block the customer's order path.
      return { ok: false, status: 0 };
    });
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
    renderDivisions();
    renderHow();
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
          logOrder('whatsapp');
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
          logOrder('email');
        });
      } else {
        mailBtn.setAttribute('hidden', '');
      }
    }

    // Warning if neither channel is configured — otherwise the bag dead-ends.
    var warn = $('#noChannel');
    if (warn && !CONTACT.whatsapp && !CONTACT.email) warn.removeAttribute('hidden');

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