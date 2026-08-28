# Handoff — Booking Side Notes polish 3

## Delivered

- Removed the vague, unlisted landing eyebrow “Private appointment companion.”
  The first screen now starts directly with the tested job headline.
- Added a regression check that the removed phrase cannot return.
- Hardened the offline-status label after a service-worker-backed navigation.
  It rechecks browser connectivity after the app renders, so a cached demo
  reload does not briefly retain a stale online label.
- Updated the catalog sentence to: “Keep callback and access notes beside
  appointments without changing bookable time.” It is verb-first and 83
  characters.
- Preserved the local-first PWA, real isolated demo, map-paper visual system,
  routing, legal pages, and all earlier repairs.

## Commits and deployment

- Repair commits: `8d75739` (remove vague privacy claim) and `1fbdcd5`
  (settle offline status after cached navigation).
- Both commits are pushed to `origin/main`.
- Deployed with the injected static work-order configuration using
  `/opt/fleet/lib/deploy-static.sh booking-side-notes dist`.
- Live site: <https://booking-side-notes.sociobot.in>. The final live shell
  references `index-D4EH0llZ.js`, the bundle built from `1fbdcd5`.

## Verification

Fresh clone `/tmp/booking-side-notes-polish3-final.1nKRPq/repo` at
`1fbdcd5726cbd1b108d3a1cf0917191bac455478`:

- `npm ci` passed with 0 audit vulnerabilities.
- `npm test` passed: 10/10.
- `npx tsc --noEmit` passed.
- `npm run build` passed and produced `dist/index.html`.
- Every exact command in `.factory/claims.json` passed independently: 13/13.
- `npm run test:e2e` passed: 16/16, including demo isolation, privacy-origin
  capture, offline reload/edit, route history focus, mobile target geometry,
  and Playwright Axe checks.
- Final built JS: 28,296 B raw / 9,541 B gzip. CSS: 20,524 B raw / 5,346 B
  gzip.

Local Lighthouse mobile, measured against the built app: home 96/100/100/100
and demo 96/100/100/100 for performance/accessibility/best-practices/SEO.
Home LCP was 1.5 s, demo LCP 1.4 s, and both had CLS 0.

The prescribed `verify-url.sh` passed live on both `/` and `/demo`: each had
the right title, `lang=en`, one H1, a main landmark, image alt coverage,
labelled buttons, and zero console errors. The standalone Axe CLI cannot find
a system Chrome in this container; the equivalent Playwright Axe integration
ran locally and live across home, demo, Privacy, Terms, and 404 with zero
serious or critical violations.

Final cold live checks confirmed the first phone screen, demo banner/reset/
exit and real/demo IndexedDB isolation, offline `/demo` reload and local edit,
all real route titles and metadata, HTTP 404, footer/navigation parity,
Home → Privacy → Terms → Back → Back H1 focus, and zero serious/critical Axe
findings. Evidence: `.factory/evidence/polish-3-live-home-mobile.png`,
`.factory/evidence/polish-3-live-demo-mobile.png`, and
`.factory/evidence/polish-3-live-404-mobile.png`.

## Remaining work

None. All review-1, review-2, and review-3 findings are mapped to final
evidence in `.factory/polish-3.md`.
