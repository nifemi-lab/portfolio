/* ============================================================
   NVR team console
   ------------------------------------------------------------
   Three roles, one desk:
     owner     — everything, including payouts and the team
     staff     — sellers, orders and listings, no payout details
     co-seller — only their own pieces and payouts

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
  var ROLE_LABEL = { owner: 'Owner', staff: 'Staff', 'co-seller': 'Co-seller' };
  var ORDER_FLOW = ['new', 'confirmed', 'made', 'shipped', 'done'];
  var ORDER_LABEL = {
    new: 'New',
    confirmed: 'Confirmed',
    made: 'Made',
    shipped: 'Shipped',
    done: 'Done',
    cancelled: 'Cancelled'
  };

  var state = {
    session: null,
    role: null,
    sellerId: null,
    sellers: [],
    listings: [],
    orders: [],
    payouts: [],
    team: [],
    teamReady: false,
    lastSync: null
  };

  /* ---------- helpers ---------- */

  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s === null || s === undefined ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function naira(n) {
    var value = Number(n);
    if (!isFinite(value)) value = 0;
    return '₦' + Math.round(value).toLocaleString('en-NG');
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
  function clock(date) {
    return date.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' });
  }
  function sessionEmail(s) {
    return ((s && (s.email || (s.user && s.user.email))) || '').toLowerCase();
  }
  function roleName(role) {
    return ROLE_LABEL[role] || 'Member';
  }
  function statusOf(row) {
    return String((row && row.status) || '').toLowerCase();
  }
  function noun(n, singular, plural) {
    return n + ' ' + (n === 1 ? singular : (plural || singular + 's'));
  }
  function joinAnd(parts) {
    if (!parts.length) return '';
    if (parts.length === 1) return parts[0];
    if (parts.length === 2) return parts[0] + ' and ' + parts[1];
    return parts.slice(0, -1).join(', ') + ' and ' + parts[parts.length - 1];
  }
  function initials(email) {
    var text = String(email || '').split('@')[0].replace(/[^a-z0-9]+/gi, ' ').trim();
    var parts = text ? text.split(/\s+/) : [];
    if (parts.length > 1) return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
    return (parts[0] || 'NVR').slice(0, 2).toUpperCase();
  }
  function sellerName(s) {
    return s ? (s.handle || s.full_name || '') : '';
  }
  function handleAt(handle) {
    var h = String(handle || '').trim();
    if (!h) return '';
    return h.charAt(0) === '@' ? h : '@' + h;
  }
  function sellerAt(s) {
    if (!s) return '';
    return handleAt(s.handle) || s.full_name || '';
  }
  function sellerContact(s) {
    if (!s) return '—';
    var parts = [];
    if (s.handle) parts.push(handleAt(s.handle));
    if (s.city) parts.push(s.city);
    if (s.phone) parts.push(s.phone);
    return parts.length ? parts.join(' · ') : '—';
  }
  function listingName(l) {
    return [l.brand, l.garment].filter(Boolean).join(' ');
  }

  function say(msg, kind) {
    var el = $('gateMsg');
    if (!el) return;
    el.textContent = msg || '';
    el.setAttribute('data-kind', kind || 'info');
  }

  function banner(msg, kind) {
    var el = $('banner');
    if (!el) return;
    if (!msg) {
      el.hidden = true;
      el.textContent = '';
      return;
    }
    el.textContent = msg;
    el.setAttribute('data-kind', kind || 'error');
    el.setAttribute('role', kind === 'info' ? 'status' : 'alert');
    el.hidden = false;
  }

  var toast = null;
  var toastTimer = null;

  function flash(msg) {
    if (!msg) return;
    if (!toast) {
      toast = document.createElement('p');
      toast.className = 'toast';
      toast.setAttribute('role', 'status');
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      if (toast) toast.remove();
      toast = null;
    }, 3400);
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
    document.title = 'NVR — ' + roleName(role) + ' console';

    var sections = document.querySelectorAll('[data-roles]');
    Array.prototype.forEach.call(sections, function (el) {
      el.hidden = el.getAttribute('data-roles').split(' ').indexOf(role) === -1;
    });

    renderDesk(true);
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
    state.teamReady = false;
    state.lastSync = null;
    document.body.removeAttribute('data-role');
    showGate(msg || '');
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

    if ($('synced')) $('synced').textContent = 'Syncing…';

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
        state.team = [];
        state.teamReady = false;
        return;
      }
      state.sellers = [];
      state.listings = r[0] || [];
      state.payouts = r[1] || [];
      state.orders = [];
      state.team = [];
      state.teamReady = false;
      if (!state.sellerId) {
        banner('This account is not linked to a seller yet. Ask the owner to link it under Team.', 'info');
      }
    }).then(function () {
      state.lastSync = new Date();
      renderAll();
    }).catch(function (err) {
      if (err.auth) {
        signOut('Your session ended. Sign in again.');
        return;
      }
      state.lastSync = null;
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

  function oldestFirst(rows) {
    return rows.slice().sort(function (a, b) {
      return new Date(a.created_at || 0) - new Date(b.created_at || 0);
    });
  }

  function pendingSellers() {
    return oldestFirst(state.sellers.filter(function (s) { return statusOf(s) === 'pending'; }));
  }

  function directorySellers() {
    return state.sellers.filter(function (s) {
      var st = statusOf(s);
      return st === 'approved' || st === 'paused';
    });
  }

  function approvedSellers() {
    return state.sellers.filter(function (s) { return statusOf(s) === 'approved'; });
  }

  function pendingListings() {
    return oldestFirst(state.listings.filter(function (l) { return statusOf(l) === 'pending'; }));
  }

  function otherListings() {
    return state.listings.filter(function (l) { return statusOf(l) !== 'pending'; });
  }

  function activeOrders() {
    return state.orders.filter(function (o) {
      return ORDER_FLOW.indexOf(statusOf(o)) !== -1 && statusOf(o) !== 'done';
    });
  }

  function inProgressOrders() {
    return state.orders.filter(function (o) {
      return ['confirmed', 'made', 'shipped'].indexOf(statusOf(o)) !== -1;
    });
  }

  function cancelledOrders() {
    return state.orders.filter(function (o) { return statusOf(o) === 'cancelled'; });
  }

  function openPayouts() {
    return state.payouts.filter(function (p) {
      var st = statusOf(p);
      return st === 'owed' || st === 'scheduled';
    });
  }

  function paidPayouts() {
    return state.payouts.filter(function (p) { return statusOf(p) === 'paid'; });
  }

  function netTotal(rows) {
    return rows.reduce(function (n, p) { return n + (Number(p.net_amount) || 0); }, 0);
  }

  function owedTotal() {
    return netTotal(openPayouts());
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

  /* ---------- small render helpers ---------- */

  function pill(status) {
    var st = String(status || 'unknown').toLowerCase();
    return '<span class="pill" data-s="' + esc(st) + '">' + esc(st) + '</span>';
  }

  function roleChip(role) {
    var r = ROLES.indexOf(role) !== -1 ? role : 'staff';
    return '<span class="role-chip" data-role="' + esc(r) + '">' + esc(ROLE_LABEL[r]) + '</span>';
  }

  function stat(opts) {
    var tag = opts.href ? 'a' : 'div';
    var cls = 'stat' + (opts.hot ? ' is-hot' : '') + (opts.money ? ' stat--money' : '');
    var attrs = opts.href ? ' href="' + esc(opts.href) + '"' : '';
    return '<' + tag + ' class="' + cls + '"' + attrs + '>' +
      '<span class="stat-kicker">' + esc(opts.kicker) + '</span>' +
      '<span class="stat-n">' + esc(opts.n) + '</span>' +
      '<span class="stat-l">' + esc(opts.label) + '</span>' +
      '<span class="stat-go">' + esc(opts.go) + '</span>' +
    '</' + tag + '>';
  }

  function navChip(href, label, count) {
    return '<a class="nav-chip" href="' + esc(href) + '">' + esc(label) +
      (count === undefined || count === null ? '' : ' <span class="count">' + esc(count) + '</span>') +
    '</a>';
  }

  function showEmpty(el, msg) {
    if (!el) return;
    el.textContent = msg || '';
    el.hidden = !msg;
  }

  function lockButton(btn, label) {
    if (!btn) return function () {};
    var previous = btn.innerHTML;
    btn.disabled = true;
    btn.textContent = label || 'Saving…';
    return function () {
      btn.disabled = false;
      btn.innerHTML = previous;
    };
  }

  function armButton(btn, label) {
    if (!btn) return false;
    if (btn.getAttribute('data-armed') === '1') return true;

    btn.setAttribute('data-armed', '1');
    btn.setAttribute('data-previous-label', btn.textContent);
    btn.classList.add('is-armed');
    btn.textContent = label || 'Confirm?';
    var timer = setTimeout(function () {
      if (!btn.isConnected) return;
      btn.removeAttribute('data-armed');
      btn.classList.remove('is-armed');
      btn.textContent = btn.getAttribute('data-previous-label') || 'Confirm?';
    }, 4000);
    btn.setAttribute('data-arm-timer', timer);
    return false;
  }

  function consumeArmed(btn) {
    if (!btn) return;
    clearTimeout(Number(btn.getAttribute('data-arm-timer')) || 0);
    var previous = btn.getAttribute('data-previous-label');
    btn.removeAttribute('data-armed');
    btn.removeAttribute('data-arm-timer');
    btn.classList.remove('is-armed');
    if (previous !== null) btn.textContent = previous;
  }

  /* ---------- render ---------- */

  function setSynced() {
    var el = $('synced');
    if (!el) return;
    el.textContent = state.lastSync ? 'Synced ' + clock(state.lastSync) : 'Not synced';
  }

  function renderAll() {
    renderDesk(false);
    renderSectionHeads();
    renderStats();
    renderSellers();
    renderListings();
    renderOrders();
    renderPayouts();
    renderTeam();
    setSynced();
  }

  function deskSentence() {
    var role = state.role;

    if (role === 'owner') {
      var ps = pendingSellers().length;
      var pl = pendingListings().length;
      var moves = activeOrders().length;
      var bits = [];
      if (ps) bits.push(noun(ps, 'seller application'));
      if (pl) bits.push(noun(pl, 'listing'));
      if (moves) bits.push(noun(moves, 'order'));
      if (bits.length) return 'Needs you: ' + joinAnd(bits) + '. The ledger is below.';
      var owed = owedTotal();
      if (owed > 0) {
        return 'No reviews waiting. ' + money(owed) + ' is still owed across ' +
          noun(openPayouts().length, 'open payout') + '.';
      }
      return 'Nothing is waiting. The shop is steady.';
    }

    if (role === 'staff') {
      var pending = pendingListings().length;
      var fresh = state.orders.filter(function (o) { return statusOf(o) === 'new'; }).length;
      var working = inProgressOrders().length;
      var parts = [];
      if (pending) parts.push(noun(pending, 'listing'));
      if (fresh) parts.push(noun(fresh, 'new order'));
      if (parts.length) {
        return 'On your plate: ' + joinAnd(parts) + '.' +
          (working ? ' ' + noun(working, 'order') + ' already in progress.' : '');
      }
      if (working) return 'No new reviews. ' + noun(working, 'order') + ' already in progress.';
      return 'Nothing is waiting. The floor is clear.';
    }

    if (!state.sellerId) {
      return 'This account is not linked to a seller yet. Ask the owner to link it under Team.';
    }
    var live = state.listings.filter(function (l) { return statusOf(l) === 'listed'; }).length;
    var review = pendingListings().length;
    var sold = state.listings.filter(function (l) { return statusOf(l) === 'sold'; }).length;
    var owing = owedTotal();
    var pieces = [];
    if (live) pieces.push(noun(live, 'piece') + ' live');
    if (review) pieces.push(noun(review, 'piece') + ' in review');
    if (sold) pieces.push(noun(sold, 'piece') + ' sold');
    if (owing > 0) pieces.push(money(owing) + ' owed to you');
    if (pieces.length) return joinAnd(pieces) + '.';
    return 'No pieces with NVR yet. Send your first piece to get started.';
  }

  function renderDesk(scaffold) {
    if (!state.role) return;
    var role = state.role;
    var email = sessionEmail(state.session) || 'signed in';

    $('deskTitle').textContent = role === 'owner' ? 'Owner desk' :
      role === 'staff' ? 'Staff desk' : 'Seller desk';
    $('deskEmail').textContent = email;
    $('todayNote').textContent = role === 'owner'
      ? 'The queue across the whole shop, money included.'
      : role === 'staff'
        ? 'What needs you now. Everything else can wait.'
        : 'Your pieces and what NVR owes you.';

    if (scaffold) {
      $('deskState').textContent = 'Checking the desk…';
      $('deskNav').innerHTML = '';
      $('synced').textContent = 'Syncing…';
      return;
    }

    $('deskState').textContent = deskSentence();

    var html = '';
    if (role === 'owner') {
      html += navChip('#sellers', 'Applications', pendingSellers().length);
      html += navChip('#listings', 'Listings', pendingListings().length);
      html += navChip('#orders', 'Orders', activeOrders().length);
      html += navChip('#payouts', 'Payouts', openPayouts().length);
      html += navChip('#team', 'Team', state.teamReady ? state.team.length : 0);
    } else if (role === 'staff') {
      html += navChip('#sellers', 'Sellers', directorySellers().length);
      html += navChip('#listings', 'Listings', pendingListings().length);
      html += navChip('#orders', 'Orders', activeOrders().length);
    } else {
      html += navChip('#listings', 'Listings', state.listings.length);
      html += navChip('#payouts', 'Payouts', openPayouts().length);
    }
    $('deskNav').innerHTML = html;
  }

  function renderSectionHeads() {
    var role = state.role;
    if (!role) return;

    if ($('sellerApplications')) $('sellerApplications').hidden = role !== 'owner';

    if (role === 'owner') {
      $('sellersTitle').textContent = 'Applications';
      $('sellerCount').textContent = pendingSellers().length + ' waiting';
      $('sellersNote').textContent = 'Read the application, check the payout destination, then decide. Approved sellers can list immediately.';
    } else {
      $('sellersTitle').textContent = 'Sellers';
      $('sellerCount').textContent = noun(directorySellers().length, 'seller') + ' on file';
      $('sellersNote').textContent = 'The approved and paused sellers you can work with. Applications are handled by the owner.';
    }

    if (role === 'co-seller') {
      $('listingsTitle').textContent = 'My listings';
      $('listingCount').textContent = noun(state.listings.length, 'piece');
      $('listingsNote').textContent = 'Every piece you have sent us and where it is. NVR sets the shelf price and handles the sale.';
      $('listingArchiveTitle').textContent = 'Past pieces';
      $('payoutsTitle').textContent = 'Your money';
      $('payoutsNote').textContent = 'What NVR has paid you, and what is still owed. Only NVR can change a payout.';
    } else {
      $('listingsTitle').textContent = 'Listings';
      $('listingCount').textContent = pendingListings().length + ' to review';
      $('listingsNote').textContent = 'A piece goes live when you set its shelf price. The seller clears their floor; NVR keeps the difference.';
      $('listingArchiveTitle').textContent = 'Recent decisions';
      $('payoutsTitle').textContent = 'Money out';
      $('payoutsNote').textContent = 'What NVR holds that belongs to someone else. Mark paid only after the transfer has actually gone out.';
    }

    $('orderCount').textContent = activeOrders().length + ' to move';
    $('ordersNote').textContent = 'Move each order as the work happens. Every change saves immediately; cancel is the only destructive step.';

    $('payoutCount').textContent = openPayouts().length + ' open';
    var teamTotal = state.teamReady ? state.team.length : 0;
    $('teamCount').textContent = state.teamReady ? noun(teamTotal, 'member') : 'setup needed';
    if ($('teamRosterCount')) {
      $('teamRosterCount').textContent = state.teamReady ? noun(teamTotal, 'member') : 'setup needed';
    }
  }

  function renderStats() {
    var host = $('stats');
    if (!host) return;
    var role = state.role;
    var html = '';

    if (role === 'owner') {
      var ps = pendingSellers().length;
      var pl = pendingListings().length;
      var moves = activeOrders().length;
      html += stat({
        href: '#sellers', kicker: '01 / Sellers', n: ps,
        label: ps === 1 ? 'application waiting' : 'applications waiting',
        go: ps ? 'Review the seller →' : 'No applications waiting', hot: ps > 0
      });
      html += stat({
        href: '#listings', kicker: '02 / Listings', n: pl,
        label: pl === 1 ? 'piece to review' : 'pieces to review',
        go: pl ? 'Price and list →' : 'Queue is clear', hot: pl > 0
      });
      html += stat({
        href: '#orders', kicker: '03 / Orders', n: moves,
        label: moves === 1 ? 'order to move' : 'orders to move',
        go: moves ? 'Open the flow →' : 'No orders to move'
      });
      html += stat({
        href: '#payouts', kicker: '04 / Money', n: money(owedTotal()),
        label: 'owed to sellers',
        go: openPayouts().length ? 'Open the ledger →' : 'Nothing owed',
        money: true
      });
    } else if (role === 'staff') {
      var fresh = state.orders.filter(function (o) { return statusOf(o) === 'new'; }).length;
      var review = pendingListings().length;
      var working = inProgressOrders().length;
      html += stat({
        href: '#orders', kicker: '01 / Orders', n: fresh,
        label: fresh === 1 ? 'new order' : 'new orders',
        go: fresh ? (fresh === 1 ? 'Confirm it →' : 'Confirm them →') : 'Nothing new', hot: fresh > 0
      });
      html += stat({
        href: '#listings', kicker: '02 / Listings', n: review,
        label: review === 1 ? 'piece to review' : 'pieces to review',
        go: review ? 'Price and list →' : 'Queue is clear', hot: review > 0
      });
      html += stat({
        href: '#orders', kicker: '03 / Fulfilment', n: working,
        label: 'in progress',
        go: working ? 'Move them forward →' : 'Nothing in progress'
      });
    } else {
      var live = state.listings.filter(function (l) { return statusOf(l) === 'listed'; }).length;
      var inReview = pendingListings().length;
      var sold = state.listings.filter(function (l) { return statusOf(l) === 'sold'; }).length;
      html += stat({
        href: '#listings', kicker: '01 / Pieces', n: live,
        label: live === 1 ? 'piece live' : 'pieces live',
        go: 'See your pieces →'
      });
      html += stat({
        href: '#listings', kicker: '02 / Review', n: inReview,
        label: 'in review',
        go: inReview ? 'Waiting on NVR' : 'Nothing in review'
      });
      html += stat({
        href: '#listings', kicker: '03 / Sold', n: sold,
        label: sold === 1 ? 'piece sold' : 'pieces sold',
        go: 'See what sold →'
      });
      html += stat({
        href: '#payouts', kicker: '04 / Money', n: money(owedTotal()),
        label: 'owed to you',
        go: openPayouts().length ? 'Open your ledger →' : 'Nothing owed',
        money: true
      });
    }

    host.innerHTML = html;
  }

  function renderSellers() {
    if (state.role === 'co-seller' || !state.role) return;

    var owner = state.role === 'owner';
    var pending = pendingSellers();
    var directory = directorySellers();
    var queue = $('sellerQueue');
    var queueEmpty = $('sellerQueueEmpty');

    if ($('sellerPendingCount')) {
      $('sellerPendingCount').textContent = pending.length ? 'oldest first' : 'clear';
    }

    if (owner) {
      queue.innerHTML = pending.map(function (s) {
        var tier = s.tier === 'premium' ? ' <span class="tag">studio</span>' : '';
        var account = s.tier === 'premium' ? 'a studio seller account' : 'a standard seller account';
        return '<article class="review-card is-pending">' +
          '<div class="card-top">' +
            '<span class="mono">' + esc(s.reference || '—') + '</span>' +
            '<span class="card-age">' + esc(rel(s.created_at)) + '</span>' +
          '</div>' +
          '<h3 class="card-title">' + esc(s.full_name || 'Unnamed seller') + tier + '</h3>' +
          '<p class="card-sub">' + esc(s.city || 'City not given') + ' · applied for ' + esc(account) + '</p>' +
          '<dl class="fact-row">' +
            '<div><dt>Phone</dt><dd>' + esc(s.phone || '—') + '</dd></div>' +
            '<div><dt>Handle</dt><dd>' + esc(handleAt(s.handle) || '—') + '</dd></div>' +
            '<div><dt>Pays to</dt><dd>' + esc(s.payout_to || '—') + '</dd></div>' +
          '</dl>' +
          '<div class="card-actions">' +
            '<button type="button" class="btn btn--volt" data-seller-approve="' + esc(s.id) + '">Approve seller</button>' +
            '<button type="button" class="btn btn--quiet" data-seller-decline="' + esc(s.id) + '">Decline</button>' +
          '</div>' +
        '</article>';
      }).join('');
      showEmpty(queueEmpty, pending.length ? '' : 'No applications waiting.');
    }

    $('sellerDirectoryCount').textContent = noun(directory.length, 'seller');
    $('sellerDirectory').innerHTML = directory.map(function (s) {
      var tier = s.tier === 'premium' ? ' <span class="tag">studio</span>' : '';
      var payout = owner
        ? '<span class="roster-cell"><span class="label">Pays to</span>' + esc(s.payout_to || '—') + '</span>'
        : '';
      return '<div class="roster-row">' +
        '<div class="roster-main">' +
          '<span class="mono">' + esc(s.reference || '—') + '</span>' +
          '<strong>' + esc(s.full_name || 'Unnamed seller') + '</strong>' +
          tier + ' ' + pill(statusOf(s)) +
        '</div>' +
        '<span class="roster-cell">' + esc(sellerContact(s)) + '</span>' +
        payout +
        '<span class="roster-age">since ' + esc(when(s.decided_at || s.created_at)) + '</span>' +
      '</div>';
    }).join('');
    showEmpty($('sellerDirectoryEmpty'), directory.length ? '' : 'No approved sellers yet.');
    $('sellerDirectory').hidden = !directory.length;
  }

  function renderListings() {
    var role = state.role;
    if (!role) return;

    var canReview = role !== 'co-seller';
    var pending = pendingListings();
    var past = otherListings();
    var queue = $('listingQueue');
    var archiveWrap = $('listingArchiveWrap');

    queue.innerHTML = pending.map(function (l) {
      var floor = Number(l.asking_price) || 0;
      var name = listingName(l) || 'Piece';
      var seller = sellerOf(l.seller_id);
      var sub = [
        l.size || 'Size not given',
        l.condition || 'Condition not given',
        canReview ? (sellerAt(seller) || '—') : ''
      ].filter(Boolean).join(' · ');

      if (!canReview) {
        return '<article class="review-card is-pending">' +
          '<div class="card-top">' +
            '<span class="mono">' + esc(l.reference || '—') + '</span>' +
            '<span class="card-age">' + esc(rel(l.created_at)) + '</span>' +
          '</div>' +
          '<h3 class="card-title">' + esc(name) + '</h3>' +
          '<p class="card-sub">' + esc(sub) + '</p>' +
          '<dl class="fact-row">' +
            '<div><dt>You asked</dt><dd>' + esc(naira(floor)) + '</dd></div>' +
            '<div><dt>Size</dt><dd>' + esc(l.size || '—') + '</dd></div>' +
            '<div><dt>Condition</dt><dd>' + esc(l.condition || '—') + '</dd></div>' +
          '</dl>' +
          '<p class="personal-note">Waiting for NVR to set the shelf price. You will see it here when the piece goes live.</p>' +
        '</article>';
      }

      var price = Number(l.list_price) || shelfFor(floor);
      var net = sellerNet(price);
      var cut = price - net;
      var minimum = shelfFor(floor);
      var short = net < floor;
      var hint = short
        ? 'Below the seller floor. Raise the shelf to at least ' + money(minimum) + '.'
        : 'Seller clears their floor. Minimum shelf: ' + money(minimum) + '.';

      return '<article class="review-card is-pending">' +
        '<div class="card-top">' +
          '<span class="mono">' + esc(l.reference || '—') + '</span>' +
          '<span class="card-age">' + esc(rel(l.created_at)) + '</span>' +
        '</div>' +
        '<h3 class="card-title">' + esc(name) + '</h3>' +
        '<p class="card-sub">' + esc(sub) + '</p>' +
        '<div class="price-panel">' +
          '<div class="price-field">' +
            '<label for="price-' + esc(l.id) + '">Shelf price</label>' +
            '<div class="price-input">' +
              '<span>₦</span>' +
              '<input id="price-' + esc(l.id) + '" type="number" min="' + minimum + '" step="100" ' +
                'value="' + price + '" data-price data-floor="' + floor + '" ' +
                'aria-label="Shelf price for ' + esc(l.reference || name) + '">' +
            '</div>' +
          '</div>' +
          '<div class="price-facts">' +
            '<div><span>Seller asked</span><strong>' + esc(money(floor)) + '</strong></div>' +
            '<div><span>Seller gets</span><strong data-net>' + esc(money(net)) + '</strong></div>' +
            '<div><span>NVR cut</span><strong data-cut>' + esc(money(cut)) + '</strong></div>' +
          '</div>' +
        '</div>' +
        '<p class="price-hint' + (short ? ' is-short' : '') + '">' + esc(hint) + '</p>' +
        '<div class="card-actions">' +
          '<button type="button" class="btn btn--volt" data-listing-approve="' + esc(l.id) + '" data-floor="' + floor + '">List piece</button>' +
          '<button type="button" class="btn btn--quiet" data-listing-decline="' + esc(l.id) + '">Decline</button>' +
        '</div>' +
      '</article>';
    }).join('');

    showEmpty($('listingQueueEmpty'), pending.length ? '' :
      (canReview ? 'Nothing waiting for review.' : 'No pieces in review right now.'));

    if (past.length) {
      archiveWrap.hidden = false;
      $('listingArchiveCount').textContent = noun(past.length, 'piece');
      $('listingArchive').innerHTML = past.map(function (l) {
        var seller = sellerOf(l.seller_id);
        var sub = canReview
          ? (sellerAt(seller) || '—')
          : [l.size, l.condition].filter(Boolean).join(' · ');
        var shelf = Number(l.list_price) ? 'Shelf ' + money(l.list_price) : 'No shelf';
        return '<div class="archive-row">' +
          '<span class="mono ref">' + esc(l.reference || '—') + '</span>' +
          '<div class="archive-main">' +
            '<strong>' + esc(listingName(l) || 'Piece') + '</strong>' +
            '<span>' + esc(sub) + '</span>' +
          '</div>' +
          '<span class="archive-money">' + esc(shelf) + '</span>' +
          pill(statusOf(l)) +
          '<span class="archive-age">' + esc(when(l.decided_at || l.created_at)) + '</span>' +
        '</div>';
      }).join('');
    } else {
      archiveWrap.hidden = true;
      $('listingArchive').innerHTML = '';
      $('listingArchiveCount').textContent = '';
    }
  }

  function orderItems(o) {
    var items = Array.isArray(o.items) ? o.items : [];
    var qty = items.reduce(function (n, it) { return n + (Number(it && it.qty) || 0); }, 0);
    if (!qty) qty = Number(o.item_count) || 0;
    var codes = items.map(function (it) { return it && it.code ? String(it.code) : ''; })
      .filter(Boolean);
    var label = codes.length
      ? codes[0] + (codes.length > 1 ? ' +' + (codes.length - 1) : '')
      : (qty ? noun(qty, 'item') : '—');
    return { label: label, qty: qty, count: qty ? noun(qty, 'item') : '' };
  }

  function renderOrders() {
    if (state.role === 'co-seller' || !state.role) return;

    var flowOrders = state.orders.filter(function (o) {
      return ORDER_FLOW.indexOf(statusOf(o)) !== -1;
    });
    var cancelled = cancelledOrders();
    var board = $('orderBoard');
    var empty = $('orderEmpty');

    if (!flowOrders.length) {
      board.innerHTML = '';
      board.hidden = true;
      showEmpty(empty, cancelled.length ? 'No active orders. Cancelled orders are below.' : 'No orders yet.');
    } else {
      board.hidden = false;
      showEmpty(empty, '');
      board.innerHTML = ORDER_FLOW.map(function (stage, stageIndex) {
        var rows = flowOrders.filter(function (o) { return statusOf(o) === stage; });
        var cards = rows.map(function (o) {
          var items = orderItems(o);
          var idx = ORDER_FLOW.indexOf(statusOf(o));
          var track = ORDER_FLOW.map(function (_, i) {
            var cls = i < idx ? 'is-done' : i === idx ? 'is-now' : '';
            return '<span' + (cls ? ' class="' + cls + '"' : '') + '></span>';
          }).join('');
          var actions = '';
          if (idx > 0) {
            var back = ORDER_FLOW[idx - 1];
            actions += '<button type="button" class="btn btn--back btn--quiet" ' +
              'data-order-back="' + esc(o.reference) + '" data-order-target="' + esc(back) + '" ' +
              'aria-label="Move ' + esc(o.reference) + ' back to ' + esc(back) + '">‹ Back</button>';
          }
          if (idx < ORDER_FLOW.length - 1) {
            var next = ORDER_FLOW[idx + 1];
            actions += '<button type="button" class="btn btn--volt" ' +
              'data-order-next="' + esc(o.reference) + '" data-order-target="' + esc(next) + '">' +
              'Mark ' + esc(next) + '</button>';
          }
          if (idx < 3) {
            actions += '<button type="button" class="btn btn--quiet" ' +
              'data-order-cancel="' + esc(o.reference) + '">Cancel</button>';
          }

          return '<article class="order-card">' +
            '<div class="order-top">' +
              '<span class="mono">' + esc(o.reference || '—') + '</span>' +
              '<span class="order-age">' + esc(rel(o.created_at)) + '</span>' +
            '</div>' +
            '<h4 class="order-name">' + esc(o.full_name || o.phone || 'Customer') + '</h4>' +
            '<p class="order-items">' + esc(items.label) + (items.count ? ' · ' + esc(items.count) : '') + '</p>' +
            '<div class="order-bottom">' +
              '<span class="order-total">' + esc(naira(o.subtotal)) + '</span>' +
              '<span class="order-channel">' + esc(o.channel || 'direct') + '</span>' +
            '</div>' +
            '<div class="stage-track" aria-hidden="true">' + track + '</div>' +
            '<div class="order-actions">' + actions + '</div>' +
          '</article>';
        }).join('');

        return '<section class="lane" data-stage="' + esc(stage) + '">' +
          '<header class="lane-head">' +
            '<span class="lane-dot"></span>' +
            '<h3>' + esc(ORDER_LABEL[stage]) + '</h3>' +
            '<span class="lane-count">' + rows.length + '</span>' +
          '</header>' +
          '<div class="lane-body">' +
            (cards || '<p class="lane-empty">Empty</p>') +
          '</div>' +
        '</section>';
      }).join('');
    }

    if (cancelled.length) {
      $('cancelledDrawer').hidden = false;
      $('cancelledCount').textContent = cancelled.length;
      $('cancelledList').innerHTML = cancelled.map(function (o) {
        var items = orderItems(o);
        return '<div class="archive-row">' +
          '<span class="mono ref">' + esc(o.reference || '—') + '</span>' +
          '<div class="archive-main">' +
            '<strong>' + esc(o.full_name || o.phone || 'Customer') + '</strong>' +
            '<span>' + esc(items.label) + (items.count ? ' · ' + esc(items.count) : '') + '</span>' +
          '</div>' +
          '<span class="archive-money">' + esc(naira(o.subtotal)) + '</span>' +
          pill('cancelled') +
          '<span class="archive-age">' + esc(rel(o.created_at)) + '</span>' +
        '</div>';
      }).join('');
    } else {
      $('cancelledDrawer').hidden = true;
      $('cancelledCount').textContent = '0';
      $('cancelledList').innerHTML = '';
    }
  }

  function payoutRow(p, owner) {
    var st = statusOf(p);
    var isOpen = st === 'owed' || st === 'scheduled';
    var netLabel = st === 'paid' ? 'Paid' : st === 'void' ? 'Void' : 'Owed';
    var action = '';
    if (owner) {
      if (isOpen) {
        action = '<button type="button" class="btn btn--volt btn--sm" data-payout-paid="' + esc(p.id) + '">Mark paid</button>';
      } else if (st === 'paid') {
        action = '<span class="mono">' + esc(when(p.paid_at)) + '</span>';
      } else {
        action = '<span class="mono">void</span>';
      }
    } else {
      action = st === 'paid'
        ? '<span class="mono">paid ' + esc(when(p.paid_at)) + '</span>'
        : st === 'void'
          ? '<span class="mono">void</span>'
          : '<span class="mono">NVR decides</span>';
    }

    return '<div class="payout-row">' +
      '<span class="payout-ref">' + esc(p.order_reference || '—') + '</span>' +
      '<span class="payout-cell"><span>Gross</span><strong>' + esc(naira(p.gross_amount)) + '</strong></span>' +
      '<span class="payout-cell"><span>NVR cut</span><strong>' + esc(naira(p.commission_amount)) + '</strong></span>' +
      '<span class="payout-cell is-net"><span>' + esc(netLabel) + '</span><strong>' + esc(naira(p.net_amount)) + '</strong></span>' +
      '<span class="payout-status">' + pill(st) + '</span>' +
      '<span class="payout-action">' + action + '</span>' +
    '</div>';
  }

  function renderPayouts() {
    if (state.role !== 'owner' && state.role !== 'co-seller') return;

    var owner = state.role === 'owner';
    var open = openPayouts();
    var paid = paidPayouts();
    var summary = $('payoutSummary');
    var board = $('payoutBoard');
    var openSellers = {};

    open.forEach(function (p) { openSellers[p.seller_id] = true; });
    var sellerCount = Object.keys(openSellers).length;

    summary.innerHTML =
      stat({
        kicker: 'Owed now',
        n: money(netTotal(open)),
        label: owner
          ? (sellerCount ? 'to ' + noun(sellerCount, 'seller') : 'nothing owed')
          : 'owed to you',
        go: open.length ? 'Across ' + noun(open.length, 'open payout') : 'Nothing open',
        money: true
      }) +
      stat({
        kicker: 'Paid out',
        n: money(netTotal(paid)),
        label: owner ? 'loaded history' : 'paid to you',
        go: paid.length ? noun(paid.length, 'completed payout') : 'No payouts yet'
      });

    if (!state.payouts.length) {
      board.innerHTML = '';
      showEmpty($('payoutEmpty'), owner ? 'No payouts in the loaded ledger.' : 'No payouts yet.');
      return;
    }
    showEmpty($('payoutEmpty'), '');

    if (!owner) {
      board.innerHTML = '<article class="payout-group">' +
        '<header class="payout-head">' +
          '<div><h3>Payout history</h3><p>' + esc(noun(state.payouts.length, 'payout')) + ' loaded</p></div>' +
          '<div class="payout-total"><span>Owed</span><strong>' + esc(money(netTotal(open))) + '</strong></div>' +
        '</header>' +
        state.payouts.map(function (p) { return payoutRow(p, false); }).join('') +
      '</article>';
      return;
    }

    var groups = {};
    state.payouts.forEach(function (p) {
      var key = p.seller_id || 'unlinked';
      if (!groups[key]) groups[key] = { sellerId: p.seller_id, rows: [] };
      groups[key].rows.push(p);
    });

    var keys = Object.keys(groups);
    keys.sort(function (a, b) {
      var aOpen = netTotal(groups[a].rows.filter(function (p) {
        var st = statusOf(p); return st === 'owed' || st === 'scheduled';
      }));
      var bOpen = netTotal(groups[b].rows.filter(function (p) {
        var st = statusOf(p); return st === 'owed' || st === 'scheduled';
      }));
      if ((aOpen > 0) !== (bOpen > 0)) return aOpen > 0 ? -1 : 1;
      return bOpen - aOpen;
    });

    board.innerHTML = keys.map(function (key) {
      var group = groups[key];
      var seller = sellerOf(group.sellerId);
      var name = seller ? seller.full_name : 'Unlinked seller';
      var handle = seller && seller.handle ? handleAt(seller.handle) + ' · ' : '';
      var openRows = group.rows.filter(function (p) {
        var st = statusOf(p); return st === 'owed' || st === 'scheduled';
      });
      return '<article class="payout-group">' +
        '<header class="payout-head">' +
          '<div>' +
            '<h3>' + esc(name) + '</h3>' +
            '<p>' + esc(handle + noun(group.rows.length, 'payout')) + '</p>' +
          '</div>' +
          '<div class="payout-total"><span>Owed</span><strong>' + esc(money(netTotal(openRows))) + '</strong></div>' +
        '</header>' +
        group.rows.map(function (p) { return payoutRow(p, true); }).join('') +
      '</article>';
    }).join('');
  }

  function permissionLine(role) {
    if (role === 'owner') return 'Full control: sellers, listings, orders, payouts and this roster.';
    if (role === 'co-seller') return 'Sees only their own pieces and what they are owed.';
    return 'Reviews listings and moves orders. No payouts, no team.';
  }

  function teamOwnerCount() {
    var self = sessionEmail(state.session);
    var hasSelf = state.team.some(function (t) {
      return String(t.email || '').toLowerCase() === self;
    });
    var count = state.team.filter(function (t) { return t.role === 'owner'; }).length;
    if (self === OWNER_EMAIL && !hasSelf) count += 1;
    return count;
  }

  function sellerOptions(selected, allowEmpty) {
    var rows = approvedSellers();
    var seen = {};
    var html = '<option value="">' + (allowEmpty ? 'Not linked' : 'Choose a seller') + '</option>';
    if (!rows.length && !allowEmpty) {
      return '<option value="">No approved sellers yet</option>';
    }
    rows.forEach(function (s) {
      seen[s.id] = true;
      html += '<option value="' + esc(s.id) + '"' + (s.id === selected ? ' selected' : '') + '>' +
        esc((s.handle ? handleAt(s.handle) + ' · ' : '') + s.full_name + ' (' + s.reference + ')') +
      '</option>';
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
    var roster = $('teamRoster');
    var empty = $('teamEmpty');

    setup.hidden = state.teamReady;
    form.hidden = !state.teamReady;

    if (!state.teamReady) {
      roster.hidden = true;
      empty.hidden = true;
      roster.innerHTML = '';
      return;
    }

    var self = sessionEmail(state.session);
    var owners = teamOwnerCount();

    if (!state.team.length) {
      roster.hidden = true;
      empty.hidden = false;
      roster.innerHTML = '';
      return;
    }

    empty.hidden = true;
    roster.hidden = false;
    roster.innerHTML = state.team.map(function (t) {
      var email = String(t.email || '').toLowerCase();
      var role = ROLES.indexOf(t.role) !== -1 ? t.role : 'staff';
      var isSelf = email === self;
      var isLastOwner = role === 'owner' && owners === 1;
      var roleLocked = isSelf || isLastOwner;
      var seller = sellerOf(t.seller_id);

      var tags = '';
      if (isSelf) tags += '<span class="member-tag">you</span>';
      if (isLastOwner) tags += '<span class="member-tag member-tag--last">last owner</span>';

      var linked = '';
      if (role === 'co-seller') {
        if (t.seller_id && seller) {
          linked = '<div class="member-link">Linked to <strong>' +
            esc((seller.handle ? handleAt(seller.handle) + ' · ' : '') + seller.full_name) +
            '</strong> (' + esc(seller.reference) + ')</div>';
        } else if (t.seller_id) {
          linked = '<div class="member-link is-missing">Linked seller is not in the loaded directory. Pick another below.</div>';
        } else {
          linked = '<div class="member-link is-missing">No seller linked yet. They cannot see any pieces until you link one.</div>';
        }
      }

      var roleField = '<label class="field' + (role === 'co-seller' ? '' : ' field--wide') + '">' +
        '<span>Role</span>' +
        '<select data-team-role="' + esc(email) + '" aria-label="Role for ' + esc(email) + '"' +
          (roleLocked ? ' disabled' : '') + '>' +
          ROLES.map(function (r) {
            return '<option value="' + esc(r) + '"' + (r === role ? ' selected' : '') + '>' +
              esc(ROLE_LABEL[r]) + '</option>';
          }).join('') +
        '</select>' +
      '</label>';

      var sellerField = role === 'co-seller'
        ? '<label class="field">' +
            '<span>Linked seller</span>' +
            '<select data-team-seller="' + esc(email) + '" aria-label="Linked seller for ' + esc(email) + '">' +
              sellerOptions(t.seller_id, true) +
            '</select>' +
          '</label>'
        : '';

      var removeCell = isSelf
        ? '<span class="mono">This is you</span>'
        : isLastOwner
          ? '<span class="mono">Last owner</span>'
          : '<button type="button" class="btn btn--quiet" data-team-remove="' + esc(email) + '">Remove</button>';

      return '<article class="member-card">' +
        '<div class="member-top">' +
          '<span class="avatar">' + esc(initials(email)) + '</span>' +
          '<div class="member-id">' +
            '<h3>' + esc(email) + tags + '</h3>' +
            '<p class="member-perm">' + esc(permissionLine(role)) + '</p>' +
          '</div>' +
          roleChip(role) +
        '</div>' +
        linked +
        '<div class="member-controls">' + roleField + sellerField +
          '<div class="member-remove-row">' + removeCell + '</div>' +
        '</div>' +
      '</article>';
    }).join('');
  }

  function refreshTeamSellerField() {
    var checked = document.querySelector('input[name="teamRole"]:checked');
    var field = $('teamSellerField');
    var sel = $('teamSeller');
    if (!field || !sel) return;
    field.hidden = !checked || checked.value !== 'co-seller';
    sel.innerHTML = sellerOptions(null, false);
  }

  /* ---------- actions ---------- */

  function handleError(err) {
    if (err && err.auth) {
      signOut('Your session ended. Sign in again.');
      return;
    }
    banner((err && err.message) || 'Something went wrong. Try again.');
  }

  function findOrder(reference) {
    for (var i = 0; i < state.orders.length; i++) {
      if (state.orders[i].reference === reference) return state.orders[i];
    }
    return null;
  }

  function findMember(email) {
    for (var i = 0; i < state.team.length; i++) {
      if (String(state.team[i].email || '').toLowerCase() === email) return state.team[i];
    }
    return null;
  }

  function moveOrder(reference, target, btn) {
    if (!reference || ORDER_FLOW.indexOf(target) === -1) return;
    var unlock = lockButton(btn, 'Saving…');
    patch('orders?reference=eq.' + encodeURIComponent(reference), { status: target })
      .then(function () {
        return loadAll().then(function () {
          flash('Order ' + reference + ' moved to ' + target + '.');
        });
      })
      .catch(function (err) {
        unlock();
        handleError(err);
      });
  }

  document.addEventListener('click', function (e) {
    var t = e.target;

    var sApp = t.closest('[data-seller-approve]');
    if (sApp) {
      if (state.role !== 'owner') return;
      var approveUnlock = lockButton(sApp, 'Approving…');
      patch('sellers?id=eq.' + encodeURIComponent(sApp.getAttribute('data-seller-approve')),
            { status: 'approved', decided_at: new Date().toISOString() })
        .then(function () {
          return loadAll().then(function () { flash('Seller approved.'); });
        })
        .catch(function (err) {
          approveUnlock();
          handleError(err);
        });
      return;
    }

    var sDec = t.closest('[data-seller-decline]');
    if (sDec) {
      if (state.role !== 'owner') return;
      var declineUnlock = lockButton(sDec, 'Declining…');
      patch('sellers?id=eq.' + encodeURIComponent(sDec.getAttribute('data-seller-decline')),
            { status: 'declined', decided_at: new Date().toISOString() })
        .then(function () {
          return loadAll().then(function () { flash('Application declined.'); });
        })
        .catch(function (err) {
          declineUnlock();
          handleError(err);
        });
      return;
    }

    var lApp = t.closest('[data-listing-approve]');
    if (lApp) {
      if (state.role === 'co-seller') return;
      var id = lApp.getAttribute('data-listing-approve');
      var input = $('price-' + id);
      var price = input ? parseInt(input.value, 10) : 0;
      var floor = parseInt(lApp.getAttribute('data-floor'), 10) || 0;

      if (!price || price < 1) {
        banner('Set a shelf price before listing.');
        return;
      }

      var net = sellerNet(price);
      if (net < floor) {
        banner('At ' + money(price) + ' the seller gets ' + money(net) +
          ', below the ' + money(floor) + ' they asked for. Raise it to at least ' +
          money(shelfFor(floor)) + '.');
        return;
      }

      var listUnlock = lockButton(lApp, 'Listing…');
      patch('listings?id=eq.' + encodeURIComponent(id), {
        list_price: price,
        payout_amount: net,
        commission_pct: Math.round(commissionRate() * 100),
        status: 'listed',
        decided_at: new Date().toISOString()
      }).then(function () {
        return loadAll().then(function () {
          flash('Piece listed at ' + money(price) + '.');
        });
      }).catch(function (err) {
        listUnlock();
        handleError(err);
      });
      return;
    }

    var lDec = t.closest('[data-listing-decline]');
    if (lDec) {
      if (state.role === 'co-seller') return;
      var declineListUnlock = lockButton(lDec, 'Declining…');
      patch('listings?id=eq.' + encodeURIComponent(lDec.getAttribute('data-listing-decline')),
            { status: 'declined', decided_at: new Date().toISOString() })
        .then(function () {
          return loadAll().then(function () { flash('Listing declined.'); });
        })
        .catch(function (err) {
          declineListUnlock();
          handleError(err);
        });
      return;
    }

    var nextOrder = t.closest('[data-order-next]');
    if (nextOrder) {
      if (state.role === 'co-seller') return;
      moveOrder(nextOrder.getAttribute('data-order-next'), nextOrder.getAttribute('data-order-target'), nextOrder);
      return;
    }

    var backOrder = t.closest('[data-order-back]');
    if (backOrder) {
      if (state.role === 'co-seller') return;
      moveOrder(backOrder.getAttribute('data-order-back'), backOrder.getAttribute('data-order-target'), backOrder);
      return;
    }

    var cancelOrder = t.closest('[data-order-cancel]');
    if (cancelOrder) {
      if (state.role === 'co-seller') return;
      if (!armButton(cancelOrder, 'Confirm cancel')) return;
      consumeArmed(cancelOrder);
      var cancelUnlock = lockButton(cancelOrder, 'Cancelling…');
      var cancelRef = cancelOrder.getAttribute('data-order-cancel');
      patch('orders?reference=eq.' + encodeURIComponent(cancelRef), { status: 'cancelled' })
        .then(function () {
          return loadAll().then(function () { flash('Order ' + cancelRef + ' cancelled.'); });
        })
        .catch(function (err) {
          cancelUnlock();
          handleError(err);
        });
      return;
    }

    var pPaid = t.closest('[data-payout-paid]');
    if (pPaid) {
      if (state.role !== 'owner') return;
      if (!armButton(pPaid, 'Confirm paid?')) return;
      consumeArmed(pPaid);
      var paidUnlock = lockButton(pPaid, 'Saving…');
      patch('payouts?id=eq.' + encodeURIComponent(pPaid.getAttribute('data-payout-paid')), {
        status: 'paid',
        paid_at: new Date().toISOString()
      }).then(function () {
        return loadAll().then(function () { flash('Payout marked paid.'); });
      }).catch(function (err) {
        paidUnlock();
        handleError(err);
      });
      return;
    }

    var tRemove = t.closest('[data-team-remove]');
    if (tRemove) {
      if (state.role !== 'owner') return;
      var email = tRemove.getAttribute('data-team-remove');
      var member = findMember(email);
      var owners = teamOwnerCount();
      if (!member) return;
      if (email === sessionEmail(state.session)) {
        banner('You cannot remove your own console access.');
        return;
      }
      if (member.role === 'owner' && owners === 1) {
        banner('The last owner cannot be removed.');
        return;
      }
      if (!armButton(tRemove, 'Confirm remove')) return;
      consumeArmed(tRemove);
      var removeUnlock = lockButton(tRemove, 'Removing…');
      remove('team?email=eq.' + encodeURIComponent(email))
        .then(function () {
          return loadAll().then(function () { flash(email + ' removed from the team.'); });
        })
        .catch(function (err) {
          removeUnlock();
          handleError(err);
        });
    }
  });

  document.addEventListener('change', function (e) {
    var roleSelect = e.target.closest('[data-team-role]');
    if (roleSelect) {
      if (state.role !== 'owner') return;
      var email = roleSelect.getAttribute('data-team-role');
      var role = roleSelect.value;
      var member = findMember(email);
      if (!member || ROLES.indexOf(role) === -1) return;
      var self = sessionEmail(state.session);
      var owners = teamOwnerCount();

      if (email === self) {
        renderTeam();
        banner('You cannot change your own role from this console.');
        return;
      }
      if (member.role === 'owner' && owners === 1) {
        renderTeam();
        banner('The last owner cannot be demoted.');
        return;
      }
      if ((member.role === 'owner') !== (role === 'owner')) {
        var question = role === 'owner'
          ? 'Give ' + email + ' full owner access, including money and the team?'
          : 'Remove owner access from ' + email + '?';
        if (!window.confirm(question)) {
          renderTeam();
          return;
        }
      }

      roleSelect.disabled = true;
      var body = { role: role };
      if (role !== 'co-seller') body.seller_id = null;
      patch('team?email=eq.' + encodeURIComponent(email), body)
        .then(function () {
          return loadAll().then(function () {
            flash('Role saved for ' + email + '.');
            if (role === 'co-seller' && !member.seller_id) {
              banner('Role saved. Link this co-seller to a seller so they can see their pieces.', 'info');
            }
          });
        })
        .catch(function (err) {
          renderTeam();
          handleError(err);
        });
      return;
    }

    var sellerSelect = e.target.closest('[data-team-seller]');
    if (sellerSelect) {
      if (state.role !== 'owner') return;
      sellerSelect.disabled = true;
      patch('team?email=eq.' + encodeURIComponent(sellerSelect.getAttribute('data-team-seller')),
            { seller_id: sellerSelect.value || null })
        .then(function () {
          return loadAll().then(function () { flash('Seller link saved.'); });
        })
        .catch(function (err) {
          renderTeam();
          handleError(err);
        });
      return;
    }

    var teamRoleRadio = e.target.closest('input[name="teamRole"]');
    if (teamRoleRadio) {
      refreshTeamSellerField();
    }
  });

  document.addEventListener('input', function (e) {
    var input = e.target.closest('[data-price]');
    if (!input) return;
    var card = input.closest('.review-card');
    if (!card) return;
    var netOut = card.querySelector('[data-net]');
    var cutOut = card.querySelector('[data-cut]');
    var hint = card.querySelector('.price-hint');
    if (!netOut || !cutOut || !hint) return;

    var price = Math.max(0, Math.round(Number(input.value) || 0));
    var floor = Number(input.getAttribute('data-floor')) || 0;
    var net = sellerNet(price);
    var cut = price - net;
    var minimum = shelfFor(floor);
    var short = net < floor;

    netOut.textContent = money(net);
    cutOut.textContent = money(cut);
    hint.classList.toggle('is-short', short);
    hint.textContent = short
      ? 'Below the seller floor. Raise the shelf to at least ' + money(minimum) + '.'
      : 'Seller clears their floor. Minimum shelf: ' + money(minimum) + '.';
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
        if (!role) return;
        showApp();
        return loadAll().then(function () {
          flash('Console synced.');
        });
      }).catch(handleError);
    });

    $('signOut').addEventListener('click', function () { signOut(''); });
    $('deniedOut').addEventListener('click', function () { signOut(''); });

    $('teamForm').addEventListener('submit', function (e) {
      e.preventDefault();
      if (state.role !== 'owner') return;
      var checked = document.querySelector('input[name="teamRole"]:checked');
      var role = checked ? checked.value : 'staff';
      var email = $('teamEmail').value.trim().toLowerCase();
      var sellerId = $('teamSeller').value || null;
      if (!email) return;
      if (role === 'co-seller' && !sellerId) {
        banner('Choose the seller this co-seller belongs to before adding them.');
        return;
      }
      var btn = e.target.querySelector('button[type="submit"]');
      var unlock = lockButton(btn, 'Adding…');
      post('team', {
        email: email,
        role: role,
        seller_id: role === 'co-seller' ? sellerId : null
      }).then(function () {
        $('teamEmail').value = '';
        var staff = document.querySelector('input[name="teamRole"][value="staff"]');
        if (staff) staff.checked = true;
        refreshTeamSellerField();
        unlock();
        return loadAll().then(function () { flash(email + ' added to the team.'); });
      }).catch(function (err) {
        unlock();
        handleError(err);
      });
    });

    refreshTeamSellerField();

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
