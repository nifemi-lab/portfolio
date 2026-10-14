# Draft GitHub issue for BasedHardware/omi

**Repo:** https://github.com/BasedHardware/omi/issues/new/choose
(Pick the bug template, then paste the title + body below.)

---

## Title

```
Windows v1.0.33: startup crash "Cannot find module 'ms'" (missing from app.asar) + unsigned helper EXEs blocked by Smart App Control
```

## Body

```markdown
### Environment
- App: omi-windows v1.0.33 (Electron, Windows 11, installed via release installer)
- Install path: `%LOCALAPPDATA%\Programs\omi-windows`

### Bug 1 — main process crashes at startup: `Cannot find module 'ms'`

```
Uncaught Exception:
Error: Cannot find module 'ms'
Require stack:
- ...resources\app.asar\node_modules\debug\src\common.js
- ...resources\app.asar\node_modules\debug\src\node.js
- ...resources\app.asar\node_modules\debug\src\index.js
- ... RequireInTheMiddleSingleton.js / instrumentation.js / instrument.js / http.js ...
```

**Diagnosis:** `node_modules/ms` (a direct dependency of `debug`) is missing from the shipped `app.asar`.
Verified with `npx @electron/asar list resources/app.asar` — 36,316 entries, no `node_modules/ms` anywhere.
`app.asar.unpacked\node_modules` has `debug` but also no `ms`.

This is the known electron-builder/pnpm dependency-walker bug (electron-userland/electron-builder#9654,
plus the pnpm 10.29.3 regression, fixed in electron-builder 26.8.2) that also broke ClawX, airi, iptvnator
and Element Nightly with the identical error.

**Local workaround applied:** placing `ms@2.1.3` at `resources\node_modules\ms` fixes resolution for every
require inside the archive (no asar repack needed). App launches normally afterwards.

**Suggested fix:** declare `ms` (and `debug`) as direct `dependencies` in package.json so electron-builder
walks them reliably, and/or bump electron-builder to >= 26.8.2 + verify `ms` is in the asar in CI
(`npx asar list resources/app.asar | findstr node_modules/ms`).

### Bug 2 — Smart App Control blocks the helper EXEs (all unsigned)

Windows Security shows: *"Part of this app has been blocked — we can't confirm who published
win-ocr-helper.exe that the app tried to load."*

```
win-ocr-helper.exe        Authenticode: NotSigned
win-audio-helper.exe      Authenticode: NotSigned
win-automation-helper.exe Authenticode: NotSigned
```

On Windows 11 with Smart App Control enabled (enforced), unsigned EXEs are blocked with no
per-app whitelist available — users must disable a one-way system security toggle to use
OCR / audio / computer-control features.

**Suggested fix:** code-sign the three helper binaries (EV Authenticode cert preferred for
immediate Smart App Control reputation), or document the limitation in the Windows install docs.

### Impact
- Bug 1: app crashes/dialog on every launch until worked around.
- Bug 2: OCR, audio and automation features silently unavailable on SAC-enabled Windows 11 machines.
```
