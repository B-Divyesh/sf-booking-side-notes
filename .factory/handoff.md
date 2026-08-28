# Handoff — booking-side-notes-polish-1

## Delivered

Repair commit `516ceac` is deployed at <https://booking-side-notes.sociobot.in>.

- Rewrote the cold first screen around the appointment-side-note job, its small business audience, and a visible sample action.
- Added a one-click `/demo` and `?demo=1` sandbox with a separate IndexedDB database, realistic sample appointments, persistent banner, reset, and exit.
- Added confirmed appointment-day replacement. Missing appointments disappear; their side notes stay as marked unlinked notes.
- Added claim inventory and 11 observable, demo-first claim tests.
- Removed the unavailable paid checkout and all associated unverified promises.
- Added real demo, privacy, terms, and 404 routes; metadata, social card, Apple icon, consistent navigation/footer, focus movement, and mobile targets.
- Added host CSP/frame/permissions policy, immutable assets, manifest MIME, and a genuine HTTP 404 for unknown routes.

The product retains its original topographic paper/map visual system. See `.factory/polish-1.md` for the finding-by-finding disposition.

## Exact verification evidence

Clean clone: `/tmp/booking-final-clean.ILFeLK` at `516ceac`. It passed `npm ci`, `npm test` (7 tests), `npx tsc --noEmit`, `npm run build`, every command in `.factory/claims.json`, and the full `npm run test:e2e` suite (13/13).

Current local verification at `516ceac`:

- `npm test`: 7/7 passed.
- `npx tsc --noEmit`: passed.
- `npm run build`: passed; `dist/index.html` and `dist/staticwebapp.config.json` exist.
- `npm run test:e2e`: 13/13 Chromium tests passed, including Axe serious and critical findings (none), route focus, malformed backup recovery, 390px layout, and offline demo reload/save.
- Every claim test was run independently from the clean clone; all 11 passed.
- Lighthouse mobile on `/demo`: Performance 91, Accessibility 100, Best Practices 100, SEO 100; LCP 1.4 s and CLS 0.
- Production bundle: JS 27.29 KB raw / 9.29 KB gzip; CSS 18.75 KB raw / 5.03 KB gzip; the mobile hero AVIF is 12.7 KB.

Screenshots:

- `.factory/evidence/home-mobile.png` — local 390×844 first screen.
- `.factory/evidence/demo-desktop.png` — populated demo workspace.
- `.factory/evidence/live-demo-mobile.png` — cold live `/demo`.
- `.factory/evidence/live-404-mobile.png` — cold live missing route.

## Live deployment check

The configured static deployment completed successfully. Cold Chromium checks at the production URL confirmed:

- `/`: title “Booking Side Notes — side notes beside appointments”, one H1, visible sample action, no console errors, and no 390px horizontal overflow.
- `/demo` and `/?demo=1`: title “Demo — Booking Side Notes”, required banner, and the seeded Harbour House sample appointment.
- `/privacy/`: title “Privacy — Booking Side Notes” and correct H1.
- `/not-a-real-route`: styled not-found page and HTTP 404.
- `/assets/app-mark.svg`: immutable one-year cache policy plus CSP, frame, permissions, nosniff, and referrer headers.
- `/manifest.webmanifest`: `application/manifest+json` and one-day cache.

## Run/deploy

```sh
npm ci
npm test
npx tsc --noEmit
npm run build
npm run test:e2e
```

Deploy `dist/` with `staticwebapp.config.json`. No secrets are stored in the repository.

## Known gaps

None. The removed paid add-on is intentionally not offered until a registered product and a verified checkout can be provided.
