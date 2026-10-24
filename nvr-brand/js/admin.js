/* ============================================================
   NVR team console
   ------------------------------------------------------------
   Three roles, one page:
     owner     — everything, including payouts and the team
     staff     — orders and listings, no payout details
     co-seller — only their own listings and payouts

   The role shown here is read from public.team after sign-in, but
   the interface is not the lock. Supabase row-level security is.
   Every read and write is filtered by the policies in
   supabase.sql + supabase-team.sql, so hiding a section is a
   courtesy, not the protection.
   ============================================================ */

(function () {
  'use strict';

  var SESSION_KEY = 'nvr_admin_session';
  var OWNER_EMAIL = 'ogiehenifemi@gmail.com';
  var ROLES = ['owner', 'staff', 'co-seller'];

  var state = {
    session: null,
    role: null,
    sellerId: null,
    sellers: [],
    listings: [],
    orders: [],
    payouts: [],
    team: [],
    teamReady: false
  };

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
  function money(n) { return naira(n); }
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
  function sessionEmail(s) {
    return ((s && (s.email || (s.user && s.user.email))) || '').toLowerCase();
  }
  function roleName(role) {
    return role === 'co-seller' ? 'co-seller' : role;
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

  function sessionError() {
    var err = new Error('Your session ended. Sign in again.');
    err.auth = true;
    return err;
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

  function refreshSession() {
    var s = state.session;
    if (!s || !s.refresh_token) return Promise.reject(new Error('no refresh token'));
    return fetch(SUPABASE.supabaseUrl + '/auth/v1/token?grant_type=refresh_token', {
      method: 'POST',
      headers: { 'apikey': SUPABASE.supabaseAnonKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: s.refresh_token })
    }).then(function (r) {
      if (!r.ok) throw new Error('refresh refused');
      return r.json();
    }).then(function (next) {
      saveSession(next);
      return next;
    });
  }

  /* One retry after a token refresh, so an idle tab does not silently
     turn into an empty console after the access token expires. */
  function apiFetch(url, opts, retried) {
    var options = opts || {};
    var headers = Object.assign(authHeaders(), options.headers || {});
    return fetch(url, Object.assign({}, options, { headers: headers })).then(function (r) {
      if ((r.status === 401 || r.status === 403) && !retried && state.session && state.session.refresh_token) {
        return refreshSession().then(function () {
          return apiFetch(url, opts, true);
        }).catch(function () {
          return r;
        });
      }
      return r;
    });
  }

  function get(path) {
    return apiFetch(rest(path)).then(function (r) {
      if (r.status === 404) return [];
      if (r.status === 401) throw sessionError();
      if (!r.ok) throw new Error('Could not load ' + path + ' (' + r.status + ')');
      return r.json();
    });
  }

  function patch(path, body) {
    return apiFetch(rest(path), {
      method: 'PATCH',
      headers: { 'Prefer': 'return=minimal' },
      body: JSON.stringify(body)
    }).then(function (r) {
      if (r.status === 401) throw sessionError();
      if (!r.ok) throw new Error('Could not save (' + r.status + ')');
      return true;
    });
  }

  function post(path, body) {
    return apiFetch(rest(path), {
      method: 'POST',
      headers: { 'Prefer': 'return=minimal' },
      body: JSON.stringify(body)
    }).then(function (r) {
      if (r.status === 401) throw sessionError();
      if (r.status === 409) throw new Error('That email is already on the team.');
      if (!r.ok) throw new Error('Could not save (' + r.status + ')');
      return true;
    });
  }

  function remove(path) {
    return apiFetch(rest(path), {
      method: 'DELETE',
      headers: { 'Prefer': 'return=minimal' }
    }).then(function (r) {
      if (r.status === 401) throw sessionError();
      if (!r.ok) throw new Error('Could not remove (' + r.status + ')');
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
      if (!r.ok) {
        var err = new Error('refused');
        err.refused = true;
        throw err;
      }
      return r.json();
    }).catch(function (err) {
      if (err.refused) {
        // Supabase deliberately returns the same error for a missing account
        // and a wrong password, so name both instead of dead-ending on one.
        throw new Error(
          'Sign-in refused. The password may be wrong, or this address has no ' +
          'sign-in account yet. Accounts are created in Supabase - Authentication - ' +
          'Users, then added under Team.'
        );
      }
      throw new Error('Could not reach Supabase. Check the connection and try again.');
    });
  }

  function resolveRole() {
    var email = sessionEmail(state.session);
    if (!email) return Promise.resolve(null);
    var q = 'team?select=role,seller_id&email=eq.' + encodeURIComponent(email);
    return apiFetch(rest(q)).then(function (r) {
      if (r.status === 401) throw sessionError();
      if (r.status === 404) return { missing: true, rows: [] };
      if (!r.ok) return { missing: false, rows: [] };
      return r.json().then(function (rows) {
        return { missing: false, rows: rows || [] };
      });
    }).then(function (out) {
      var row = out.rows[0];
      var role = null;
      var sellerId = null;
      if (row && ROLES.indexOf(row.role) !== -1) {
        role = row.role;
        sellerId = row.seller_id || null;
      } else if (email === OWNER_EMAIL) {
        role = 'owner';
      }
      if (!role) {
        showDenied(email, out.missing);
        return null;
      }
      state.role = role;
      state.sellerId = sellerId;
      return role;
    }).catch(function (err) {
      if (err.auth) {
        saveSession(null);
        showGate(err.message);
        return null;
      }
      if (email === OWNER_EMAIL) {
        state.role = 'owner';
        state.sellerId = null;
        return 'owner';
      }
      showDenied(email, true);
      return null;
    });
  }

  function showApp() {
    $('gate').hidden = true;
    $('denied').hidden = true;
    $('app').hidden = false;
    $('who').textContent = sessionEmail(state.session) || 'signed in';

    var role = state.role;
    document.body.setAttribute('data-role', role);
    $('roleTag').textContent = roleName(role);
    document.title = 'NVR — ' + (role === 'owner' ? 'Owner' : role === 'staff' ? 'Staff' : 'Co-seller') + ' console';

    var sections = document.querySelectorAll('[data-roles]');
    Array.prototype.forEach.call(sections, function (el) {
      el.hidden = el.getAttribute('data-roles').split(' ').indexOf(role) === -1;
    });

    setRoleCopy();
  }

  function showGate(msg) {
    $('gate').hidden = false;
    $('denied').hidden = true;
    $('app').hidden = true;
    if (msg) say(msg, 'error');
  }

  function showDenied(email, missing) {
    $('gate').hidden = true;
    $('app').hidden = true;
    $('denied').hidden = false;
    $('deniedEmail').textContent = email || 'This account';
    $('deniedHelp').textContent = missing
      ? 'The console role update has not been run yet. Ask the owner to run supabase-team.sql in Supabase, then add this email under Team.'
      : 'Ask the owner to add this email under Team, then sign in again.';
  }

  function signOut(msg) {
    saveSession(null);
    state.role = null;
    state.sellerId = null;
    state.sellers = [];
    state.listings = [];
    state.orders = [];
    state.payouts = [];
    state.team = [];
    showGate(msg || '');
  }

  /* ---------- role-specific copy ---------- */

  function setRoleCopy() {
    var role = state.role;
    if (role === 'owner') {
      $('sellersNote').textContent = 'Applications arrive here. Approving lets a seller list. Payout details stay inside the owner account.';
      $('listingsNote').textContent = 'Approving makes a piece visible on the storefront. Set the shelf price — the seller is paid their floor, the difference is commission.';
      $('ordersNote').textContent = 'Every order that reached the database. Move each one as the work happens: new → confirmed → made → shipped → done.';
      $('payoutsNote').textContent = 'What you hold that belongs to someone else. Mark paid only after the transfer actually goes out.';
    } else if (role === 'staff') {
      $('sellersNote').textContent = 'Read-only directory. You can see who is approved and contact them; only the owner can approve a seller or see payout details.';
      $('listingsNote').textContent = 'Review pieces and set the shelf price. The seller is paid their floor, the difference is commission.';
      $('ordersNote').textContent = 'Move orders through the work: new → confirmed → made → shipped → done.';
    } else {
      $('listingsTitle').textContent = 'My listings';
      $('listingsNote').textContent = 'Every piece you have sent us and where it is. NVR sets the shelf price and handles the sale.';
      $('payoutsNote').textContent = 'What NVR has paid you, and what is still owed. Only NVR can change a payout.';
    }
  }

  /* ---------- data ---------- */

  function loadTeam() {
    return apiFetch(rest('team?select=*&order=created_at.asc')).then(function (r) {
      if (!r.ok) {
        state.team = [];
        state.teamReady = false;
        return;
      }
      return r.json().then(function (rows) {
        state.team = rows || [];
        state.teamReady = true;
      });
    }).catch(function () {
      state.team = [];
      state.teamReady = false;
    });
  }

  function loadAll() {
    banner('');
    if (!state.role) return Promise.resolve();

    var jobs;
    if (state.role === 'owner') {
      jobs = [
        get('sellers?select=*&order=created_at.desc'),
        get('listings?select=*&order=created_at.desc'),
        get('orders?select=*&order=created_at.desc&limit=200'),
        get('payouts?select=*&order=created_at.desc&limit=300')
      ];
    } else if (state.role === 'staff') {
      jobs = [
        get('sellers_directory?select=*&order=created_at.desc'),
        get('listings?select=*&order=created_at.desc'),
        get('orders?select=*&order=created_at.desc&limit=200')
      ];
    } else {
      var sid = state.sellerId || '00000000-0000-0000-0000-000000000000';
      jobs = [
        get('listings?select=*&seller_id=eq.' + encodeURIComponent(sid) + '&order=created_at.desc'),
        get('payouts?select=*&seller_id=eq.' + encodeURIComponent(sid) + '&order=created_at.desc&limit=300')
      ];
    }

    return Promise.all(jobs).then(function (r) {
      if (state.role === 'owner') {
        state.sellers = r[0] || [];
        state.listings = r[1] || [];
        state.orders = r[2] || [];
        state.payouts = r[3] || [];
        return loadTeam();
      }
      if (state.role === 'staff') {
        state.sellers = r[0] || [];
        state.listings = r[1] || [];
        state.orders = r[2] || [];
        state.payouts = [];
        return;
      }
      state.sellers = [];
      state.listings = r[0] || [];
      state.payouts = r[1] || [];
      state.orders = [];
      if (!state.sellerId) {
        banner('This account is not linked to a seller yet. Ask the owner to link it under Team.');
      }
    }).then(renderAll).catch(function (err) {
      if (err.auth) {
        signOut('Your session ended. Sign in again.');
        return;
      }
      banner(err.message);
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
    renderTeam();
  }

  function stat(href, n, label, isMoney) {
    return '<a class="stat' + (isMoney ? ' stat--money' : '') + '" href="' + href + '">' +
      '<span class="stat-n">' + esc(n) + '</span>' +
      '<span class="stat-l">' + esc(label) + '</span>' +
    '</a>';
  }

  function renderStats() {
    var host = $('stats');
    var role = state.role;
    var html = '';

    if (role === 'owner') {
      html += stat('#sellers', state.sellers.filter(function (s) { return s.status === 'pending'; }).length, 'sellers pending');
      html += stat('#listings', state.listings.filter(function (l) { return l.status === 'pending'; }).length, 'listings pending');
      html += stat('#orders', state.orders.length, 'orders');
      html += stat('#payouts', money(owedTotal()), 'owed to sellers', true);
    } else if (role === 'staff') {
      var active = state.orders.filter(function (o) {
        return ['confirmed', 'made', 'shipped'].indexOf(o.status) !== -1;
      }).length;
      html += stat('#listings', state.listings.filter(function (l) { return l.status === 'pending'; }).length, 'listings pending');
      html += stat('#orders', state.orders.filter(function (o) { return o.status === 'new'; }).length, 'new orders');
      html += stat('#orders', active, 'in progress');
      html += stat('#orders', state.orders.length, 'orders loaded');
    } else {
      html += stat('#listings', state.listings.filter(function (l) { return l.status === 'listed'; }).length, 'pieces live');
      html += stat('#listings', state.listings.filter(function (l) { return l.status === 'pending'; }).length, 'in review');
      html += stat('#listings', state.listings.filter(function (l) { return l.status === 'sold'; }).length, 'sold');
      html += stat('#payouts', money(owedTotal()), 'owed to you', true);
    }

    host.innerHTML = html;
  }

  function renderSellers() {
    var body = $('sellersBody');
    if (state.role === 'co-seller') return;
    if (!state.sellers.length) {
      body.innerHTML = '<tr class="empty-row"><td colspan="7">' +
        (state.role === 'staff' ? 'No sellers yet' : 'No applications yet') + '</td></tr>';
      return;
    }

    body.innerHTML = state.sellers.map(function (s) {
      var decide = '';
      if (state.role === 'owner') {
        decide = s.status === 'pending'
          ? '<div class="row-actions">' +
              '<button type="button" class="btn btn--yes" data-seller-approve="' + esc(s.id) + '">Approve</button>' +
              '<button type="button" class="btn btn--no" data-seller-decline="' + esc(s.id) + '">Decline</button>' +
            '</div>'
          : '<span class="mono">' + esc(rel(s.decided_at || s.created_at)) + '</span>';
      } else {
        decide = '<span class="mono">read only</span>';
      }

      return '<tr>' +
        '<td class="mono" data-label="Ref">' + esc(s.reference) + '</td>' +
        '<td class="strong" data-label="Name"><span>' + esc(s.full_name) + (s.tier === 'premium' ? ' <span class="pill" data-s="listed">studio</span>' : '') + '</span></td>' +
        '<td class="mono" data-label="Phone">' + esc(s.phone || '—') + '</td>' +
        '<td class="mono" data-label="City">' + esc(s.city || '—') + '</td>' +
        '<td class="mono owner-col" data-label="Payout to">' + esc(s.payout_to || '—') + '</td>' +
        '<td data-label="Status">' + pill(s.status) + '</td>' +
        '<td class="seller-decide" data-label="Decide">' + decide + '</td>' +
      '</tr>';
    }).join('');
  }

  function renderListings() {
    var body = $('listingsBody');
    if (!state.listings.length) {
      body.innerHTML = '<tr class="empty-row"><td colspan="9">' +
        (state.role === 'co-seller' ? 'You have no pieces with NVR yet' : 'No listings yet') + '</td></tr>';
      return;
    }

    body.innerHTML = state.listings.map(function (l) {
      var s = sellerOf(l.seller_id);
      var who = s ? (s.handle || s.full_name) : '—';

      var decide = '';
      if (state.role === 'co-seller') {
        decide = '<span class="mono">' + esc(rel(l.decided_at || l.created_at)) + '</span>';
      } else if (l.status === 'pending') {
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
        '<td class="mono" data-label="Ref">' + esc(l.reference) + '</td>' +
        '<td class="strong seller-col" data-label="Seller">' + esc(who) + '</td>' +
        '<td data-label="Piece">' + esc(l.brand || '') + ' ' + esc(l.garment) + '</td>' +
        '<td class="mono" data-label="Size">' + esc(l.size || '—') + '</td>' +
        '<td class="mono" data-label="Condition">' + esc(l.condition || '—') + '</td>' +
        '<td class="num" data-label="Asking">' + naira(l.asking_price) + '</td>' +
        '<td class="num" data-label="Shelf">' + (l.list_price ? naira(l.list_price) : '—') + '</td>' +
        '<td data-label="Status">' + pill(l.status) + '</td>' +
        '<td class="staff-decide-col" data-label="Decide">' + decide + '</td>' +
      '</tr>';
    }).join('');
  }

  function renderOrders() {
    var body = $('ordersBody');
    if (!body) return;
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
        '<td class="mono" data-label="Ref">' + esc(o.reference) + '</td>' +
        '<td class="strong" data-label="Customer">' + esc(o.full_name || o.phone || '—') + '</td>' +
        '<td class="mono" data-label="Items">' + esc(first) + ' (' + count + ')</td>' +
        '<td class="num" data-label="Total">' + naira(o.subtotal) + '</td>' +
        '<td class="mono" data-label="Channel">' + esc(o.channel || '—') + '</td>' +
        '<td class="mono" data-label="When">' + esc(rel(o.created_at)) + '</td>' +
        '<td data-label="Status">' + pill(o.status) + '</td>' +
        '<td class="staff-decide-col" data-label="Set"><select class="shelf-input" data-order-status="' + esc(o.reference) + '" aria-label="Status for ' + esc(o.reference) + '">' +
          statuses.map(function (st) {
            return '<option value="' + st + '"' + (o.status === st ? ' selected' : '') + '>' + st + '</option>';
          }).join('') +
        '</select></td>' +
      '</tr>';
    }).join('');
  }

  function renderPayouts() {
    var body = $('payoutsBody');
    if (!body) return;
    if (!state.payouts.length) {
      body.innerHTML = '<tr class="empty-row"><td colspan="7">' +
        (state.role === 'co-seller' ? 'Nothing owed to you right now' : 'Nothing owed') + '</td></tr>';
      return;
    }
    body.innerHTML = state.payouts.map(function (p) {
      var s = sellerOf(p.seller_id);
      var who = s ? (s.handle || s.full_name) : '—';
      var mark = '';
      if (state.role === 'owner') {
        mark = p.status === 'paid'
          ? '<span class="mono">' + esc(when(p.paid_at)) + '</span>'
          : '<button type="button" class="btn btn--yes" data-payout-paid="' + esc(p.id) + '">Mark paid</button>';
      } else {
        mark = '<span class="mono">' + (p.status === 'paid' ? esc(when(p.paid_at)) : 'NVR decides') + '</span>';
      }
      return '<tr>' +
        '<td class="strong seller-col" data-label="Seller">' + esc(who) + '</td>' +
        '<td class="mono" data-label="Order">' + esc(p.order_reference) + '</td>' +
        '<td class="num" data-label="Gross">' + naira(p.gross_amount) + '</td>' +
        '<td class="num" data-label="Cut">' + naira(p.commission_amount) + '</td>' +
        '<td class="num" data-label="Owed">' + naira(p.net_amount) + '</td>' +
        '<td data-label="Status">' + pill(p.status) + '</td>' +
        '<td class="staff-decide-col" data-label="Action">' + mark + '</td>' +
      '</tr>';
    }).join('');
  }

  /* ---------- team ---------- */

  function approvedSellers() {
    return state.sellers.filter(function (s) { return s.status === 'approved'; });
  }

  function sellerOptions(selected, allowEmpty) {
    var rows = approvedSellers();
    var seen = {};
    var html = allowEmpty ? '<option value="">Not linked</option>' : '<option value="">Choose a seller</option>';
    rows.forEach(function (s) {
      seen[s.id] = true;
      html += '<option value="' + esc(s.id) + '"' + (s.id === selected ? ' selected' : '') + '>' +
        esc((s.handle ? '@' + s.handle + ' · ' : '') + s.full_name) + ' (' + esc(s.reference) + ')</option>';
    });
    if (selected && !seen[selected]) {
      html += '<option value="' + esc(selected) + '" selected>Linked seller (not in the approved list)</option>';
    }
    return html;
  }

  function renderTeam() {
    if (state.role !== 'owner') return;
    var setup = $('teamSetup');
    var form = $('teamForm');
    var wrap = $('teamWrap');
    var empty = $('teamEmpty');
    var hint = document.querySelector('.team-hint');

    setup.hidden = state.teamReady;
    form.hidden = !state.teamReady;
    if (hint) hint.hidden = !state.teamReady;

    if (!state.teamReady) {
      wrap.hidden = true;
      empty.hidden = true;
      return;
    }

    var self = sessionEmail(state.session);
    var sellerField = $('teamSellerField');
    if (sellerField) sellerField.hidden = $('teamRole').value !== 'co-seller';

    if (!state.team.length) {
      wrap.hidden = true;
      empty.hidden = false;
      return;
    }

    empty.hidden = true;
    wrap.hidden = false;
    $('teamBody').innerHTML = state.team.map(function (t) {
      var email = String(t.email || '').toLowerCase();
      var isSelf = email === self;
      var roleSelect = '<select class="shelf-input team-role" data-team-role="' + esc(email) + '" aria-label="Role for ' + esc(email) + '"' + (isSelf ? ' disabled' : '') + '>' +
        ROLES.map(function (r) {
          return '<option value="' + r + '"' + (t.role === r ? ' selected' : '') + '>' + roleName(r) + '</option>';
        }).join('') + '</select>';

      var sellerSelect = '<select class="shelf-input" data-team-seller="' + esc(email) + '" aria-label="Linked seller for ' + esc(email) + '"' +
        (t.role === 'co-seller' ? '' : ' disabled') + '>' + sellerOptions(t.seller_id, true) + '</select>';

      var removeBtn = isSelf
        ? '<span class="mono">you</span>'
        : '<button type="button" class="btn btn--no" data-team-remove="' + esc(email) + '">Remove</button>';

      return '<tr>' +
        '<td class="strong" data-label="Email">' + esc(email) + '</td>' +
        '<td data-label="Role">' + roleSelect + '</td>' +
        '<td data-label="Linked seller">' + sellerSelect + '</td>' +
        '<td data-label="Remove">' + removeBtn + '</td>' +
      '</tr>';
    }).join('');
  }

  function refreshTeamSellerField() {
    var role = $('teamRole');
    var field = $('teamSellerField');
    var sel = $('teamSeller');
    if (!role || !field || !sel) return;
    field.hidden = role.value !== 'co-seller';
    sel.innerHTML = sellerOptions(null, false);
  }

  /* ---------- actions ---------- */

  function busy(btn) {
    if (!btn) return;
    btn.disabled = true;
    var old = btn.textContent;
    btn.textContent = '…';
    setTimeout(function () { btn.disabled = false; btn.textContent = old; }, 1200);
  }

  function handleError(err) {
    if (err.auth) {
      signOut('Your session ended. Sign in again.');
      return;
    }
    banner(err.message);
  }

  document.addEventListener('click', function (e) {
    var t = e.target;

    var sApp = t.closest('[data-seller-approve]');
    if (sApp) {
      if (state.role !== 'owner') return;
      busy(t);
      patch('sellers?id=eq.' + encodeURIComponent(sApp.getAttribute('data-seller-approve')),
            { status: 'approved', decided_at: new Date().toISOString() })
        .then(loadAll).catch(handleError);
      return;
    }

    var sDec = t.closest('[data-seller-decline]');
    if (sDec) {
      if (state.role !== 'owner') return;
      busy(t);
      patch('sellers?id=eq.' + encodeURIComponent(sDec.getAttribute('data-seller-decline')),
            { status: 'declined', decided_at: new Date().toISOString() })
        .then(loadAll).catch(handleError);
      return;
    }

    var lApp = t.closest('[data-listing-approve]');
    if (lApp) {
      if (state.role === 'co-seller') return;
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
      }).then(loadAll).catch(handleError);
      return;
    }

    var lDec = t.closest('[data-listing-decline]');
    if (lDec) {
      if (state.role === 'co-seller') return;
      busy(t);
      patch('listings?id=eq.' + encodeURIComponent(lDec.getAttribute('data-listing-decline')),
            { status: 'declined', decided_at: new Date().toISOString() })
        .then(loadAll).catch(handleError);
      return;
    }

    var pPaid = t.closest('[data-payout-paid]');
    if (pPaid) {
      if (state.role !== 'owner') return;
      busy(t);
      patch('payouts?id=eq.' + encodeURIComponent(pPaid.getAttribute('data-payout-paid')), {
        status: 'paid',
        paid_at: new Date().toISOString()
      }).then(loadAll).catch(handleError);
      return;
    }

    var tRemove = t.closest('[data-team-remove]');
    if (tRemove) {
      if (state.role !== 'owner') return;
      var email = tRemove.getAttribute('data-team-remove');
      if (!window.confirm('Remove ' + email + ' from the console? Their sign-in account stays.')) return;
      busy(t);
      remove('team?email=eq.' + encodeURIComponent(email))
        .then(loadAll).catch(handleError);
    }
  });

  document.addEventListener('change', function (e) {
    var sel = e.target.closest('[data-order-status]');
    if (sel) {
      if (state.role === 'co-seller') return;
      patch('orders?reference=eq.' + encodeURIComponent(sel.getAttribute('data-order-status')), {
        status: sel.value
      }).then(loadAll).catch(handleError);
      return;
    }

    var roleSel = e.target.closest('[data-team-role]');
    if (roleSel) {
      if (state.role !== 'owner') return;
      var email = roleSel.getAttribute('data-team-role');
      var role = roleSel.value;
      var body = { role: role };
      if (role !== 'co-seller') body.seller_id = null;
      patch('team?email=eq.' + encodeURIComponent(email), body)
        .then(function () {
          return loadAll().then(function () {
            if (role === 'co-seller') banner('Role saved. Link this co-seller to a seller so they can see their pieces.');
          });
        }).catch(handleError);
      return;
    }

    var sellerSel = e.target.closest('[data-team-seller]');
    if (sellerSel) {
      if (state.role !== 'owner') return;
      patch('team?email=eq.' + encodeURIComponent(sellerSel.getAttribute('data-team-seller')),
            { seller_id: sellerSel.value || null })
        .then(loadAll).catch(handleError);
      return;
    }

    if (e.target.id === 'teamRole') refreshTeamSellerField();
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
      var email = $('auEmail').value.trim().toLowerCase();
      signIn(email, $('auPass').value)
        .then(function (s) {
          saveSession(s);
          return resolveRole();
        })
        .then(function (role) {
          if (!role) return;
          say('');
          showApp();
          return loadAll();
        })
        .catch(function (err) { say(err.message, 'error'); });
    });

    $('refresh').addEventListener('click', function () {
      resolveRole().then(function (role) {
        if (role) {
          showApp();
          return loadAll();
        }
      }).catch(handleError);
    });

    $('signOut').addEventListener('click', function () { signOut(''); });
    $('deniedOut').addEventListener('click', function () { signOut(''); });

    $('teamForm').addEventListener('submit', function (e) {
      e.preventDefault();
      if (state.role !== 'owner') return;
      var email = $('teamEmail').value.trim().toLowerCase();
      var role = $('teamRole').value;
      var sellerId = $('teamSeller').value || null;
      if (!email) return;
      if (role === 'co-seller' && !sellerId) {
        banner('Choose the seller this co-seller belongs to before adding them.');
        return;
      }
      var btn = e.target.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = 'Adding…'; }
      post('team', {
        email: email,
        role: role,
        seller_id: role === 'co-seller' ? sellerId : null
      }).then(function () {
        $('teamEmail').value = '';
        $('teamRole').value = 'staff';
        refreshTeamSellerField();
        banner('');
        return loadAll();
      }).catch(handleError).then(function () {
        if (btn) { btn.disabled = false; btn.textContent = 'Add to team'; }
      });
    });

    var existing = loadSession();
    if (existing && existing.access_token) {
      state.session = existing;
      $('who').textContent = sessionEmail(existing) || 'signed in';
      say('Checking access...');
      resolveRole().then(function (role) {
        if (!role) return;
        say('');
        showApp();
        return loadAll();
      }).catch(function (err) {
        say(err.message, 'error');
      });
    } else {
      showGate('');
    }
  });
})();
