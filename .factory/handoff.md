# Handoff — booking-side-notes-polish-2

## Delivered

- Repaired every finding in `.factory/review-2.md` and revalidated all 69
  review-1 findings. The complete mapping is in `.factory/polish-2.md`.
- Made `/?demo=1` the visible one-click path. It uses
  `booking-side-notes-demo`, shows a linked appointment and note inside the
  first 390×844 viewport, and provides persistent Reset/Start-for-real controls.
- Completed `.factory/claims.json` with 13 uniquely tagged, observable demo
  tests. Reconciliation no longer touches real storage; note association,
  completion, reminders, privacy scope, file origins, fonts, and background
  sync are now covered.
- Completed 44 px touch targets, result-naming controls, route-title focus and
  announcement, legal/404 metadata, consistent footers/build IDs, CSP-safe
  legal scripts, actionable backup errors, and plain, consistent terminology.
- Preserved the topographic-cartography identity and the original static,
  local-first PWA deployment class.
- Updated README, demo documentation, copy audit, catalog description, and
  Node `>=20` declaration. The catalog line is verb-first and 67 characters.

## Exact verification

Clean clone: `/tmp/booking-side-notes-polish2.qkOXH3` from repair commit
`40d77a8`.

| Gate | Result |
| --- | --- |
| `npm ci` | Passed; 0 vulnerabilities |
| Every command in `.factory/claims.json` | 13/13 passed independently |
| `npm test` | 9/9 passed |
| `npx tsc --noEmit` | Passed |
| `npm run build` | Passed; `dist/index.html` present |
| `npm run test:e2e` | 16/16 Chromium tests passed |
| Node 20.20.2 unit/type/build | Passed |
| Built JS | 28.28 kB raw / 9.53 kB gzip |
| Built CSS | 20.49 kB raw / 5.33 kB gzip |
| Hero mobile AVIF | 12.70 kB |
| Playwright Axe | 0 serious/critical issues on home, demo, Privacy, Terms, 404 |
| Lighthouse mobile home | 91 performance / 100 accessibility / 100 best practices / 100 SEO; LCP 1.9 s; CLS 0 |
| Lighthouse mobile demo | 95 / 100 / 100 / 100; LCP 1.4 s; CLS 0 |

Run the same gates with:

```sh
npm ci
npm test
npx tsc --noEmit
npm run build
npm run test:e2e
```

The route/metadata test checks all social fields, complete footers, 404, and
Home→Privacy→Terms→Back→Back focus. The mobile test scans every visible
interactive element and found none below 44×44 px. The offline claim waits for
service-worker control, disables the network, reloads `?demo=1`, and saves a
note. Request interception covers the complete demo path and sees only the
site origin.

## Deployment and live evidence

Built with the work-order command, pushed to `main`, and deployed with:

```sh
/opt/fleet/lib/deploy-static.sh booking-side-notes dist
```

Final Azure deployment `f6160605-c563-458a-b7d5-e2a36ffa3183` succeeded from
commit `a6ee126`. The custom domain is
<https://booking-side-notes.sociobot.in>.

Fresh live Chromium checks on 2026-08-28 found:

- home and `?demo=1`: verifier passed; one H1, `lang=en`, main landmark,
  complete alt/button names, and zero console errors;
- sample appointment bottom 474 px and linked note bottom 742 px at 390×844;
- 0 targets below 44×44 px and 0 serious/critical Axe findings;
- real data hidden and unchanged in demo, demo reset deterministic, and
  Start for real restored real data;
- offline demo reload retained the banner, sample records, and offline status;
- Home→Privacy→Terms→Back→Back restored focus to each H1;
- `/`, `/demo`, `/privacy/`, `/terms/` returned 200; an unknown route returned
  the styled HTML 404 with HTTP 404;
- every runtime request stayed at `booking-side-notes.sociobot.in`;
- CSP, `DENY` framing, Permissions Policy, nosniff, and referrer policy were
  present; manifest MIME was `application/manifest+json`; assets were
  `max-age=31536000, immutable`.

Evidence screenshot:
`.factory/evidence/polish-2-live-demo-mobile.png`.

## Remaining work

None. No review finding, test failure, TODO, dead link, or known deployment gap
remains.
