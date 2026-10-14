// NVR Coding — optional cloud sync via Supabase (keys in config.js)
const Auth = {
  user: null,
  enabled: !!(window.NVR_CONFIG && window.NVR_CONFIG.SUPABASE_URL && window.NVR_CONFIG.SUPABASE_ANON_KEY),

  init() {
    if (!this.enabled) return;
    try { this.user = JSON.parse(localStorage.getItem('nvr_sb_session') || 'null'); } catch (e) { this.user = null; }
    this.renderButton();
    if (this.user) this.pull();
  },

  async api(path, opts) {
    opts = opts || {};
    const h = Object.assign({
      'apikey': window.NVR_CONFIG.SUPABASE_ANON_KEY,
      'Authorization': 'Bearer ' + (this.user ? this.user.access_token : window.NVR_CONFIG.SUPABASE_ANON_KEY),
      'Content-Type': 'application/json'
    }, opts.headers || {});
    const res = await fetch(window.NVR_CONFIG.SUPABASE_URL + path, Object.assign({}, opts, { headers: h }));
    if (!res.ok) throw new Error('API error ' + res.status);
    return res.json();
  },

  async signup(email, password) {
    this.user = await this.api('/auth/v1/signup', { method: 'POST', body: JSON.stringify({ email: email, password: password }) });
    localStorage.setItem('nvr_sb_session', JSON.stringify(this.user));
    this.renderButton();
    this.push();
  },

  async login(email, password) {
    this.user = await this.api('/auth/v1/token?grant_type=password', { method: 'POST', body: JSON.stringify({ email: email, password: password }) });
    localStorage.setItem('nvr_sb_session', JSON.stringify(this.user));
    this.renderButton();
    this.pull();
  },

  logout() {
    this.user = null;
    localStorage.removeItem('nvr_sb_session');
    this.renderButton();
  },

  async push() {
    if (!this.user || !this.enabled) return;
    const payload = {
      xp: store.get('xp', 0),
      streak: store.get('streak', 0),
      done: store.get('done', []),
      srs: store.get('srs', []),
      activity: store.get('activity', {}),
      updated_at: new Date().toISOString()
    };
    try {
      await this.api('/rest/v1/' + window.NVR_CONFIG.TABLE + '?on_conflict=email', {
        method: 'POST',
        headers: { 'Prefer': 'resolution=merge-duplicates' },
        body: JSON.stringify({ email: this.user.email, data: payload })
      });
    } catch (e) { /* offline - local data is safe */ }
  },

  async pull() {
    if (!this.user || !this.enabled) return;
    try {
      const rows = await this.api('/rest/v1/' + window.NVR_CONFIG.TABLE + '?select=data&email=eq.' + encodeURIComponent(this.user.email));
      if (rows && rows[0] && rows[0].data) {
        const d = rows[0].data;
        ['xp', 'streak', 'done', 'srs', 'activity'].forEach(function (k) { if (d[k] !== undefined) store.set(k, d[k]); });
        renderPills(); renderBadges(); renderProgress(); renderHeatmap();
      }
    } catch (e) { /* first run or offline - keep local */ }
  },

  renderButton() {
    const el = document.getElementById('authBtn');
    if (!el) return;
    el.classList.add('pill');
    if (!this.enabled) {
      el.textContent = '☁️ Cloud off';
      el.title = 'Cloud sync is off. Add your Supabase URL and anon key to config.js to enable accounts.';
      el.style.cursor = 'help';
      el.onclick = () => alert('☁️ Cloud sync is off.\n\nAdd your Supabase URL and anon key to config.js to enable cloud accounts.\nProgress still saves in this browser either way.');
      return;
    }
    el.textContent = this.user ? '👤 ' + this.user.email : '👤 Sign in';
    el.title = this.user ? 'Signed in — click to sign out' : 'Sign in to sync progress across devices';
    el.style.cursor = 'pointer';
    el.onclick = () => { if (this.user) this.logout(); else this.showModal(); };
  },

  showModal() {
    let m = document.getElementById('authModal');
    if (m) { m.style.display = 'flex'; return; }
    m = document.createElement('div');
    m.id = 'authModal';
    m.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;z-index:100';
    m.innerHTML = '<div style="background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:24px;width:min(340px,90vw)">'
      + '<h2 style="margin-bottom:12px">Cloud account</h2>'
      + '<input id="auEmail" placeholder="Email" style="width:100%;padding:10px;margin-bottom:8px;border-radius:8px;border:1px solid var(--border);background:var(--bg);color:var(--text)">'
      + '<input id="auPass" type="password" placeholder="Password" style="width:100%;padding:10px;margin-bottom:12px;border-radius:8px;border:1px solid var(--border);background:var(--bg);color:var(--text)">'
      + '<div style="display:flex;gap:8px"><button class="btn primary" id="auLogin">Log in</button>'
      + '<button class="btn ghost" id="auSignup">Sign up</button>'
      + '<button class="btn ghost" id="auClose">X</button></div>'
      + '<p id="auMsg" class="tiny" style="margin-top:10px"></p></div>';
    document.body.appendChild(m);
    m.querySelector('#auClose').onclick = () => { m.remove(); };
    m.querySelector('#auLogin').onclick = async () => {
      try { await this.login(m.querySelector('#auEmail').value, m.querySelector('#auPass').value); m.remove(); }
      catch (e) { m.querySelector('#auMsg').textContent = 'Error: ' + e.message; }
    };
    m.querySelector('#auSignup').onclick = async () => {
      try { await this.signup(m.querySelector('#auEmail').value, m.querySelector('#auPass').value); m.remove(); }
      catch (e) { m.querySelector('#auMsg').textContent = 'Error: ' + e.message; }
    };
  }
};

document.addEventListener('DOMContentLoaded', function () { Auth.init(); });
