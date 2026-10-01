/* CDP screenshot: exact viewport, real-time wait, scroll reset.
   usage: node shot-cdp.mjs <url> <outPath> [width] [height] [waitMs] */
import { writeFileSync } from 'node:fs';

const [, , url, outPath, wArg = '1280', hArg = '769', waitArg = '6000', scrollArg = '0'] = process.argv;
const W = parseInt(wArg, 10), H = parseInt(hArg, 10), WAIT = parseInt(waitArg, 10);
const SCROLL = parseInt(scrollArg, 10) || 0;

const target = await (await fetch('http://127.0.0.1:9333/json/new?' + encodeURIComponent(url), { method: 'PUT' })).json();
const ws = new WebSocket(target.webSocketDebuggerUrl);

let id = 0;
const pending = new Map();
const send = (method, params = {}) => new Promise((res, rej) => {
  const mid = ++id;
  pending.set(mid, { res, rej });
  ws.send(JSON.stringify({ id: mid, method, params }));
  setTimeout(() => { if (pending.has(mid)) { pending.delete(mid); rej(new Error('timeout: ' + method)); } }, 20000);
});

await new Promise((res, rej) => { ws.onopen = res; ws.onerror = (e) => rej(new Error('ws error')); });
ws.onmessage = (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    const p = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? p.rej(new Error(JSON.stringify(msg.error))) : p.res(msg.result);
  }
};

await send('Page.enable');
await send('Network.enable');
await send('Network.setCacheDisabled', { cacheDisabled: true });
await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: false });
await send('Page.navigate', { url });

await new Promise((r) => setTimeout(r, WAIT));

/* reset any auto-scroll the app did on load, then settle */
await send('Runtime.evaluate', { expression: 'window.scrollTo(0,' + SCROLL + '); document.documentElement.scrollTop = ' + SCROLL + ';' });
await new Promise((r) => setTimeout(r, 900));

const state = await send('Runtime.evaluate', {
  expression: `JSON.stringify({scrollY: scrollY, inner: innerWidth + 'x' + innerHeight, fonts: document.fonts && document.fonts.status})`,
  returnByValue: true
});
console.log('state:', state.result.value);

const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
writeFileSync(outPath, Buffer.from(shot.data, 'base64'));
console.log('saved', outPath);
try { await fetch('http://127.0.0.1:9333/json/close/' + target.id); } catch (e) { /* ignore */ }
ws.close();
process.exit(0);
