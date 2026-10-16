/* ============================================================
   NVR owner console
   ------------------------------------------------------------
   There is no admin secret and no service_role key here. The page
   signs in as you through Supabase Auth and every read and write is
   filtered by the RLS policies in supabase.sql, which only match your
   account email. If someone else opens this page they can sign in as
   themselves and see nothing.
   ============================================================ */

(function () {
  'use strict';

  var SESSION_KEY = 'nvr_admin_session';

  var state = { session: null, sellers: [], listings: [], orders: [], payouts: [] };

  /* ---------- helpers ---------- */

  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s === null || s === undefined ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function naira(n) {
    return '₦' + Math.round(Number(n) || 0).toLocaleString('en-NG');
  }
  function money(n) {
    return '₦' + Math.round(Number(n) || 0).toLocaleString('en-NG');
  }
  function when(iso) {
    if (!iso) return '—';
    var d = new Date(iso);
    if (isNaN(d.getTime())) return '—';
    return d.toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' });
  }
  function rel(iso) {
    if (!iso) return '';
    var d = new Date(iso);
    if (isNaN(d.getTime())) return '';
    var mins = Math.round((Date.now() - d.getTime()) / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return mins + 'm ago';
    if (mins < 1440) return Math.round(mins / 60) + 'h ago';
    return Math.round(mins / 1440) + 'd ago';
  }

  function say(msg, kind) {
    var el = $('gateMsg');
    if (!el) return;
    el.textContent = msg || '';
    el.setAttribute('data-kind', kind || 'info');
  }

  function banner(msg) {
    var el = $('banner');
    if (!el) return;
    if (!msg) { el.hidden = true; return; }
    el.textContent = msg;
    el.hidden = false;
  }

  /* ---------- api ---------- */

  function authHeaders() {
    var h = {
      'apikey': SUPABASE.supabaseAnonKey,
      'Content-Type': 'application/json'
    };
    if (state.session && state.session.access_token) {
      h['Authorization'] = 'Bearer ' + state.session.access_token;
    }
    return h;
  }

  function rest(path) {
    return SUPABASE.supabaseUrl + '/rest/v1/' + path;
  }

  function get(path) {
    return fetch(rest(path), { headers: authHeaders() })
      .then(function (r) {
        if (r.status === 404) return [];
        if (r.status === 401 || r.status === 403) throw new Error('Not signed in as the owner.');
        if (!r.ok) throw new Error('Could not load ' + path + ' (' + r.status + ')');
        return r.json();
      });
  }

  function patch(path, body) {
    return fetch(rest(path), {
      method: 'PATCH',
      headers: Object.assign(authHeaders(), { 'Prefer': 'return=minimal' }),
      body: JSON.stringify(body)
    }).then(function (r) {
      if (!r.ok) throw new Error('Could not save (' + r.status + ')');
      return true;
    });
  }

  /* ---------- auth ---------- */

  function saveSession(s) {
    try { s ? localStorage.setItem(SESSION_KEY, JSON.stringify(s)) : localStorage.removeItem(SESSION_KEY); } catch (e) {}
    state.session = s;
  }

  function loadSession() {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); } catch (e) { return null; }
  }

  function signIn(email, password) {
    return fetch(SUPABASE.supabaseUrl + '/auth/v1/token?grant_type=password', {
      method: 'POST',
      headers: { 'apikey': SUPABASE.supabaseAnonKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password })
    }).then(function (r) {
      if (!r.ok) throw new Error('refused');
      return r.json();
    }).catch(function () {
      // Supabase returns an identical error whether the account is missing or
      // the password is wrong, on purpose. So do not guess which - name both
      // causes and let them check, rather than dead-ending on "wrong password".
      throw new Error(
        'Sign-in refused. Either the password is wrong, or no sign-in account ' +
        'exists for this address yet. Create one at Supabase, Authentication, ' +
        'Users, Add user - then come back.'
      );
    });
  }

  function showApp() {
    $('gate').hidden = true;
    $('app').hidden = false;
    $('who').textContent = state.session && state.session.email
      ? state.session.email : 'signed in';
  }

  function showGate(msg) {
    $('gate').hidden = false;
    $('app').hidden = true;
    if (msg) say(msg, 'error');
  }

  /* ---------- data ---------- */

  function loadAll() {
    banner('');
    return Promise.all([
      get('sellers?select=*&order=created_at.desc'),
      get('listings?select=*&order=created_at.desc'),
      get('orders?select=*&order=created_at.desc&limit=200'),
      get('payouts?select=*&order=created_at.desc&limit=300')
    ]).then(function (r) {
      state.sellers = r[0] || [];
      state.listings = r[1] || [];
      state.orders = r[2] || [];
      state.payouts = r[3] || [];
      renderAll();
    }).catch(function (e) {
      if (/Not signed in/.test(e.message)) {
        saveSession(null);
        showGate('Your session expired. Sign in again.');
        return;
      }
      banner(e.message + ' — if this is the first run, run supabase.sql in the Supabase SQL editor first.');
      renderAll();
    });
  }

  function sellerOf(id) {
    for (var i = 0; i < state.sellers.length; i++) {
      if (state.sellers[i].id === id) return state.sellers[i];
    }
    return null;
  }

  /* The seller must receive at least their asking price. Round the shelf price
     UP to the next hundred so a rounding artefact can never quietly pay them
     less than they agreed to. */
  function commissionRate() {
    return (SELLING.commissionPct || 0) / 100;
  }

  function sellerNet(shelf) {
    return Math.round(shelf * (1 - commissionRate()));
  }

  function shelfFor(floor) {
    if (!floor) return 100;
    var exact = floor / (1 - commissionRate());
    return Math.ceil(exact / 100) * 100;
  }

  function owedTotal() {
    return state.payouts.reduce(function (n, p) {
      return n + ((p.status === 'owed' || p.status === 'scheduled') ? (Number(p.net_amount) || 0) : 0);
    }, 0);
  }

  /* ---------- render ---------- */

  function pill(status) {
    return '<span class="pill" data-s="' + esc(status) + '">' + esc(status) + '</span>';
  }

  function renderAll() {
    renderStats();
    renderSellers();
    renderListings();
    renderOrders();
    renderPayouts();
  }

  function renderStats() {
    $('sPendingSellers').textContent = state.sellers.filter(function (s) { return s.status === 'pending'; }).length;
    $('sPendingListings').textContent = state.listings.filter(function (l) { return l.status === 'pending'; }).length;
    $('sOrders').textContent = state.orders.length;
    $('sOwed').textContent = money(owedTotal());
  }

  function renderSellers() {
    var body = $('sellersBody');
    if (!state.sellers.length) {
      body.innerHTML = '<tr class="empty-row"><td colspan="7">No applications yet</td></tr>';
      return;
    }
    body.innerHTML = state.sellers.map(function (s) {
      var decide = s.status === 'pending'
        ? '<div class="row-actions">' +
            '<button type="button" class="btn btn--yes" data-seller-approve="' + esc(s.id) + '">Approve</button>' +
            '<button type="button" class="btn btn--no" data-seller-decline="' + esc(s.id) + '">Decline</button>' +
          '</div>'
        : '<span class="mono">' + esc(rel(s.decided_at || s.created_at)) + '</span>';

      return '<tr>' +
        '<td class="mono">' + esc(s.reference) + '</td>' +
        '<td class="strong">' + esc(s.full_name) + (s.tier === 'premium' ? ' <span class="pill" data-s="listed">studio</span>' : '') + '</td>' +
        '<td class="mono">' + esc(s.phone || '—') + '</td>' +
        '<td class="mono">' + esc(s.city || '—') + '</td>' +
        '<td class="mono">' + esc(s.payout_to || '—') + '</td>' +
        '<td>' + pill(s.status) + '</td>' +
        '<td>' + decide + '</td>' +
      '</tr>';
    }).join('');
  }

  function renderListings() {
    var body = $('listingsBody');
    if (!state.listings.length) {
      body.innerHTML = '<tr class="empty-row"><td colspan="9">No listings yet</td></tr>';
      return;
    }
    body.innerHTML = state.listings.map(function (l) {
      var s = sellerOf(l.seller_id);
      var who = s ? (s.handle || s.full_name) : '—';

      var decide;
      if (l.status === 'pending') {
        var floor = Number(l.asking_price) || 0;
        var suggested = shelfFor(floor);
        decide =
          '<div class="row-actions">' +
            '<input class="shelf-input" type="number" min="' + Math.ceil(floor) + '" step="100" ' +
              'id="shelf-' + esc(l.id) + '" value="' + (l.list_price || suggested) + '" ' +
              'aria-label="Shelf price for ' + esc(l.reference) + '">' +
            '<button type="button" class="btn btn--yes" data-listing-approve="' + esc(l.id) + '" ' +
              'data-floor="' + floor + '">List</button>' +
            '<button type="button" class="btn btn--no" data-listing-decline="' + esc(l.id) + '">Decline</button>' +
          '</div>';
      } else {
        decide = '<span class="mono">' + esc(rel(l.decided_at || l.created_at)) + '</span>';
      }

      return '<tr>' +
        '<td class="mono">' + esc(l.reference) + '</td>' +
        '<td class="strong">' + esc(who) + '</td>' +
        '<td>' + esc(l.brand || '') + ' ' + esc(l.garment) + '</td>' +
        '<td class="mono">' + esc(l.size || '—') + '</td>' +
        '<td class="mono">' + esc(l.condition || '—') + '</td>' +
        '<td class="num">' + naira(l.asking_price) + '</td>' +
        '<td class="num">' + (l.list_price ? naira(l.list_price) : '—') + '</td>' +
        '<td>' + pill(l.status) + '</td>' +
        '<td>' + decide + '</td>' +
      '</tr>';
    }).join('');
  }

  function renderOrders() {
    var body = $('ordersBody');
    if (!state.orders.length) {
      body.innerHTML = '<tr class="empty-row"><td colspan="8">No orders yet</td></tr>';
      return;
    }
    var statuses = ['new', 'confirmed', 'made', 'shipped', 'done', 'cancelled'];
    body.innerHTML = state.orders.map(function (o) {
      var items = Array.isArray(o.items) ? o.items : [];
      var count = items.reduce(function (n, it) { return n + (Number(it.qty) || 0); }, 0);
      var first = items[0] ? (items[0].code + (items.length > 1 ? ' +' + (items.length - 1) : '')) : '—';
      return '<tr>' +
        '<td class="mono">' + esc(o.reference) + '</td>' +
        '<td class="strong">' + esc(o.full_name || o.phone || '—') + '</td>' +
        '<td class="mono">' + esc(first) + ' (' + count + ')</td>' +
        '<td class="num">' + naira(o.subtotal) + '</td>' +
        '<td class="mono">' + esc(o.channel || '—') + '</td>' +
        '<td class="mono">' + esc(rel(o.created_at)) + '</td>' +
        '<td>' + pill(o.status) + '</td>' +
        '<td><select class="shelf-input" data-order-status="' + esc(o.reference) + '" aria-label="Status for ' + esc(o.reference) + '">' +
          statuses.map(function (st) {
            return '<option value="' + st + '"' + (o.status === st ? ' selected' : '') + '>' + st + '</option>';
          }).join('') +
        '</select></td>' +
      '</tr>';
    }).join('');
  }

  function renderPayouts() {
    var body = $('payoutsBody');
    if (!state.payouts.length) {
      body.innerHTML = '<tr class="empty-row"><td colspan="7">Nothing owed</td></tr>';
      return;
    }
    body.innerHTML = state.payouts.map(function (p) {
      var s = sellerOf(p.seller_id);
      var who = s ? (s.handle || s.full_name) : '—';
      var mark = p.status === 'paid'
        ? '<span class="mono">' + esc(when(p.paid_at)) + '</span>'
        : '<button type="button" class="btn btn--yes" data-payout-paid="' + esc(p.id) + '">Mark paid</button>';
      return '<tr>' +
        '<td class="strong">' + esc(who) + '</td>' +
        '<td class="mono">' + esc(p.order_reference) + '</td>' +
        '<td class="num">' + naira(p.gross_amount) + '</td>' +
        '<td class="num">' + naira(p.commission_amount) + '</td>' +
        '<td class="num">' + naira(p.net_amount) + '</td>' +
        '<td>' + pill(p.status) + '</td>' +
        '<td>' + mark + '</td>' +
      '</tr>';
    }).join('');
  }

  /* ---------- actions ---------- */

  function busy(btn) {
    if (!btn) return;
    btn.disabled = true;
    var old = btn.textContent;
    btn.textContent = '…';
    setTimeout(function () { btn.disabled = false; btn.textContent = old; }, 1200);
  }

  document.addEventListener('click', function (e) {
    var t = e.target;

    var sApp = t.closest('[data-seller-approve]');
    if (sApp) {
      busy(t);
      patch('sellers?id=eq.' + encodeURIComponent(sApp.getAttribute('data-seller-approve')),
            { status: 'approved', decided_at: new Date().toISOString() })
        .then(loadAll).catch(function (err) { banner(err.message); });
      return;
    }

    var sDec = t.closest('[data-seller-decline]');
    if (sDec) {
      busy(t);
      patch('sellers?id=eq.' + encodeURIComponent(sDec.getAttribute('data-seller-decline')),
            { status: 'declined', decided_at: new Date().toISOString() })
        .then(loadAll).catch(function (err) { banner(err.message); });
      return;
    }

    var lApp = t.closest('[data-listing-approve]');
    if (lApp) {
      var id = lApp.getAttribute('data-listing-approve');
      var input = $('shelf-' + id);
      var price = input ? parseInt(input.value, 10) : 0;
      var floor = parseInt(lApp.getAttribute('data-floor'), 10) || 0;

      if (!price || price < 1) { banner('Set a shelf price before listing.'); return; }

      var net = sellerNet(price);
      if (net < floor) {
        banner('At ' + money(price) + ' the seller gets ' + money(net) +
          ', below the ' + money(floor) + ' they asked for. Raise it to at least ' +
          money(shelfFor(floor)) + '.');
        return;
      }
      busy(t);
      patch('listings?id=eq.' + encodeURIComponent(id), {
        list_price: price,
        payout_amount: net,
        commission_pct: Math.round(commissionRate() * 100),
        status: 'listed',
        decided_at: new Date().toISOString()
      }).then(loadAll).catch(function (err) { banner(err.message); });
      return;
    }

    var lDec = t.closest('[data-listing-decline]');
    if (lDec) {
      busy(t);
      patch('listings?id=eq.' + encodeURIComponent(lDec.getAttribute('data-listing-decline')),
            { status: 'declined', decided_at: new Date().toISOString() })
        .then(loadAll).catch(function (err) { banner(err.message); });
      return;
    }

    var pPaid = t.closest('[data-payout-paid]');
    if (pPaid) {
      busy(t);
      patch('payouts?id=eq.' + encodeURIComponent(pPaid.getAttribute('data-payout-paid')), {
        status: 'paid',
        paid_at: new Date().toISOString()
      }).then(loadAll).catch(function (err) { banner(err.message); });
      return;
    }
  });

  document.addEventListener('change', function (e) {
    var sel = e.target.closest('[data-order-status]');
    if (!sel) return;
    patch('orders?reference=eq.' + encodeURIComponent(sel.getAttribute('data-order-status')), {
      status: sel.value
    }).then(loadAll).catch(function (err) { banner(err.message); });
  });

  /* ---------- wire ---------- */

  document.addEventListener('DOMContentLoaded', function () {
    if (!SUPABASE.supabaseUrl || !SUPABASE.supabaseAnonKey) {
      showGate('Supabase is not configured. Check js/catalog.js.');
      return;
    }

    $('gateForm').addEventListener('submit', function (e) {
      e.preventDefault();
      say('Signing in...');
      signIn($('auEmail').value.trim(), $('auPass').value)
        .then(function (s) {
          saveSession(s);
          showApp();
          say('');
          loadAll();
        })
        .catch(function (err) { say(err.message, 'error'); });
    });

    $('refresh').addEventListener('click', loadAll);

    $('signOut').addEventListener('click', function () {
      saveSession(null);
      showGate('');
    });

    var existing = loadSession();
    if (existing && existing.access_token) {
      state.session = existing;
      showApp();
      loadAll();
    } else {
      showGate('');
    }
  });
})();