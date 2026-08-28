# Handoff — Booking Side Notes polish 4

## Completed

- Fixed F-4-1 by keeping the exact demo disclosure, Reset demo, and Start for
  real controls visible throughout the editable sample workspace.
- Kept the strip compact at 390px while retaining 44×44px controls and the
  product's topographic field-sheet visual language.
- Expanded `@claim:demo-isolated` to scroll 1,200px, assert the disclosure is
  in view, edit demo data, compare real data before and after, reset, and exit.
- Rechecked every finding in reviews 1–4. The cumulative mapping and evidence
  are in `.factory/polish-4.md`.
- Updated the demo/design/copy records and the verb-first, 67-character catalog
  description.

Repair commit: `97b5b2bd6b05bf06b7aa9e5f9d4a99abf5dd8932`.

## Clean-clone verification

Fresh clone: `/tmp/booking-side-notes-polish4-clean.ONgx6T` at the repair
commit.

- `npm ci`: passed; 60 packages installed, 0 vulnerabilities.
- `npm test`: passed, 10/10.
- `npx tsc --noEmit`: passed.
- `npm run build`: passed; `dist/index.html` exists.
- Every exact command in `.factory/claims.json`: passed independently, 13/13.
- `npm run test:e2e`: passed, 16/16.
- The browser suite covers demo isolation/persistence, offline editing,
  privacy origins, calendar preservation, import reconciliation, backup,
  daily brief, notifications, metadata, 404, focus, mobile geometry, and Axe.

Build budgets: JS 28.30kB raw / 9.54kB gzip; CSS 20.67kB raw / 5.38kB gzip;
no font payload. Local Lighthouse mobile results:

| Route | Performance | Accessibility | Best practices | SEO | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Home | 99 | 100 | 100 | 100 | 1.6s | 110ms | 0 |
| Demo | 99 | 100 | 100 | 100 | 1.1s | 140ms | 0 |

`verify-url.sh` passed locally and live with one H1, `lang=en`, a main
landmark, complete image/button names, and zero console errors. Live Axe found
zero serious/critical issues on Home, Demo, Privacy, Terms, and 404. A 200%
text-size check had no horizontal overflow; dialog focus entered the textarea
and returned to Add side note; reduced-motion transitions were effectively
instant.

## Deployment and production verification

Deployed the repair commit through `/opt/fleet/lib/deploy-static.sh` to
<https://booking-side-notes.sociobot.in>. Production serves
`index-Dsg9VmHh.js`, and the footer reports build `97b5b2b`.

Cold production checks confirmed:

- Home, Demo, Privacy, Terms, 404, manifest, service worker, and app assets
  load; an unknown route returns the designed page with HTTP 404.
- Titles, canonical/description/OG/Twitter metadata, shared navigation/footer,
  legal links, and full history focus work on every route.
- The phone first screen ends at y=645. The first demo appointment and side
  note end at y=406 and y=674, inside the 844px viewport.
- After a 1,200px scroll the demo strip remains at y=0 with a 390×60px box.
  A demo-only note changed no real IndexedDB state. Reset removed it, Start for
  real removed the demo database, and offline reload/edit passed.
- All normal routes had zero console errors or failed requests. Runtime
  requests used only the product origin. Ten crawled HTTP links returned 200;
  the remaining two links are explicit `mailto:` addresses.
- CSP, frame, permissions, nosniff, referrer, immutable asset-cache, manifest
  MIME, and service-worker no-cache policies are live.

Screenshots:

- `.factory/evidence/polish-4-live-home-mobile.png`
- `.factory/evidence/polish-4-live-demo-scrolled-mobile.png`
- `.factory/evidence/polish-4-live-404-mobile.png`
- `.factory/evidence/polish-4-demo-mobile.png`
- `.factory/evidence/polish-4-demo-scrolled-mobile.png`

## Known gaps and next steps

None found in the required scope. All review findings and claim tests pass.
