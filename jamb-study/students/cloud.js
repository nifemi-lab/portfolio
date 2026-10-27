(function (root) {
  'use strict';

  const CFG = root.STUDY_CONFIG || {};
  const CLOUD_URL = String(CFG.supabaseUrl || '').replace(/\/+$/, '');
  const CLOUD_KEY = CFG.supabaseAnonKey || '';
  const SESSION_KEY = 'learnstack.v1.session';
  const enabled = CFG.syncEnabled !== false && !!CLOUD_URL && !!CLOUD_KEY;

  let session = null;
  try {
    session = JSON.parse(root.localStorage.getItem(SESSION_KEY) || 'null');
  } catch (e) {
    session = null;
  }

  function persistSession() {
    try {
      root.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } catch (e) { /* storage blocked: sync just will not persist */ }
  }

  function clearSession() {
    session = null;
    try {
      root.localStorage.removeItem(SESSION_KEY);
    } catch (e) { /* ignore */ }
  }

  function buildSession(response) {
    return {
      access_token: response.access_token,
      refresh_token: response.refresh_token,
      user_id: (response.user && response.user.id) || response.user_id,
      expires_at: response.expires_at ||
        Math.floor(Date.now() / 1000) + (response.expires_in || 3600)
    };
  }

  async function api(path, options) {
    const opts = options || {};
    const headers = Object.assign({ apikey: CLOUD_KEY }, opts.headers || {});
    if (opts.body) headers['Content-Type'] = 'application/json';
    if (session && session.access_token) {
      headers.Authorization = 'Bearer ' + session.access_token;
    }

    const response = await fetch(CLOUD_URL + path, {
      method: opts.method || 'GET',
      headers,
      body: opts.body
    });

    if (!response.ok) {
      let message = 'HTTP ' + response.status;
      try {
        const body = await response.json();
        message = body.msg || body.message || body.error_description ||
          body.error || message;
      } catch (e) { /* non-JSON error body */ }
      const error = new Error(message);
      error.status = response.status;
      throw error;
    }
    if (response.status === 204) return null;
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  }

  async function ensureSession() {
    if (!enabled) throw new Error('Sync is not configured');

    if (session && session.access_token &&
        session.expires_at > Date.now() / 1000 + 60) {
      return session;
    }

    if (session && session.refresh_token) {
      try {
        const refreshed = await api('/auth/v1/token?grant_type=refresh_token', {
          method: 'POST',
          body: JSON.stringify({ refresh_token: session.refresh_token })
        });
        session = buildSession(refreshed);
        persistSession();
        return session;
      } catch (e) {
        clearSession();
      }
    }

    const created = await api('/auth/v1/signup', {
      method: 'POST',
      body: JSON.stringify({ data: {} })
    });
    session = buildSession(created);
    persistSession();
    return session;
  }

  async function pullProgress() {
    await ensureSession();
    const rows = await api('/rest/v1/learn_progress?user_id=eq.' +
      encodeURIComponent(session.user_id) +
      '&select=lesson_id,status,best_score,attempts,last_seen_at,review_stage,next_review_at');
    return (Array.isArray(rows) ? rows : []).map((row) => ({
      lessonId: row.lesson_id,
      status: row.status,
      bestScore: row.best_score,
      attempts: row.attempts,
      lastSeenAt: row.last_seen_at,
      reviewStage: row.review_stage,
      nextReviewAt: row.next_review_at
    }));
  }

  async function pushProgress(progress) {
    await ensureSession();
    const now = new Date().toISOString();
    const lessons = progress && progress.lessons ? progress.lessons : {};
    const rows = Object.keys(lessons).map((lessonId) => {
      const entry = lessons[lessonId];
      return {
        user_id: session.user_id,
        lesson_id: lessonId,
        status: entry.status,
        best_score: entry.bestScore,
        attempts: entry.attempts,
        last_seen_at: entry.lastSeenAt || now,
        review_stage: entry.reviewStage,
        next_review_at: entry.nextReviewAt
      };
    });
    if (!rows.length) return;
    await api('/rest/v1/learn_progress', {
      method: 'POST',
      headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
      body: JSON.stringify(rows)
    });
  }

  async function deleteProgress() {
    await ensureSession();
    await api('/rest/v1/learn_progress?user_id=eq.' +
      encodeURIComponent(session.user_id), { method: 'DELETE' });
    await signOut();
  }

  async function signOut() {
    if (enabled && session && session.access_token) {
      try {
        await api('/auth/v1/logout', { method: 'POST' });
      } catch (e) { /* token may already be expired */ }
    }
    clearSession();
  }

  root.LearnCloud = {
    enabled,
    ensureSession,
    pullProgress,
    pushProgress,
    deleteProgress,
    signOut,
    userId: function () { return session ? session.user_id : null; }
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);
