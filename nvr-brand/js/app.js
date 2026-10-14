/* NVR Supply — storefront behaviour
 * Static prototype. No payment is processed anywhere in this file.
 * Cart lives in localStorage; the "checkout" produces an order you copy and send.
 */

(function () {
  'use strict';

  var STORE_KEY = 'nvr-supply-bag';

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  function money(n) { return '$' + n.toFixed(2); }

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
    saveBag();
  }

  /* ---------- order text ---------- */

  function orderText() {
    if (!bag.length) return '';
    var lines = ['NVR SUPPLY — ORDER', ''];
    bag.forEach(function (l) {
      var p = productOf(l.id);
      if (!p) return;
      lines.push(p.code + '  ' + p.name);
      lines.push('  Size ' + l.size + '   Qty ' + l.qty + '   ' + money(p.price * l.qty));
    });
    lines.push('');
    lines.push('SUBTOTAL   ' + money(bagTotal()));
    lines.push('');
    lines.push('No payment taken. Send this order to NVR by DM or email:');
    lines.push('  ' + CONTACT.handle + '   /   ' + CONTACT.email);
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
              '<span class="card-price">' + money(p.price) + '</span>' +
            '</div>' +
            '<p class="card-blurb">' + escapeHtml(p.blurb) + '</p>' +
            '<span class="tag">' + escapeHtml(p.weight) + ' &middot; <span class="stock">' + escapeHtml(p.stock) + '</span></span>' +
            '<div class="sizes" role="group" aria-label="Size for ' + escapeHtml(p.code) + '">' + sizes + '</div>' +
            '<button type="button" class="card-add"' + (chosen ? '' : ' disabled') +
              ' data-add="' + p.id + '">Add to bag</button>' +
          '</div>' +
        '</article>';
    }).join('');
  }

  function renderBag() {
    var body = $('#bagBody');
    var countEl = $('#bagCount');
    var totalEl = $('#bagTotal');
    var count = $('#bagItemCount');

    if (countEl) countEl.textContent = String(bagCount());
    if (totalEl) totalEl.textContent = money(bagTotal());
    if (count) count.textContent = bag.length === 1 ? '1 item' : bag.length + ' items';

    if (!body) return;

    if (!bag.length) {
      body.innerHTML = '<p class="empty">Your bag is empty</p>';
      return;
    }

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
            '<span class="line-price">' + money(p.price * l.qty) + '</span>' +
            '<button type="button" class="line-remove" data-rm="' + p.id + '" data-size="' + escapeHtml(l.size) + '">Remove</button>' +
          '</div>' +
        '</div>';
    }).join('');

    var text = orderText();
    var out = $('#orderOut');
    if (out) out.value = text;
  }

  /* ---------- drawer ---------- */

  var lastFocus = null;

  function openDrawer() {
    var d = $('#bagDrawer');
    var s = $('#scrim');
    if (!d) return;
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
    var d = $('#bagDrawer');
    if (!d || d.getAttribute('data-open') !== 'true') return;
    if (e.key !== 'Tab') return;

    var focusable = $$('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])', d)
      .filter(function (el) { return el.offsetParent !== null; });

    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
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
    renderFilters();
    renderProducts();
    renderBag();

    var grid = $('#grid');
    if (grid) {
      grid.addEventListener('click', function (e) {
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

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        var d = $('#bagDrawer');
        if (d && d.getAttribute('data-open') === 'true') closeDrawer();
      }
      trapFocus(e);
    });

    var copyBtn = $('#copyOrder');
    if (copyBtn) copyBtn.addEventListener('click', copyOrder);

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