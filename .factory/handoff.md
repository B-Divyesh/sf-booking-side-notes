# Handoff — polish round 5

## Released repair

- Fixed **F-5-1 / F-1-2**. Every non-demo exit now clears the isolated demo
  database before continuing. This includes the wordmark, Start for real,
  Privacy, Terms, in-app history, and a browser Back from a separately loaded
  demo document. A page-exit marker covers BFCache restoration before a demo
  can be shown again.
- Fixed **F-5-2**. README now says “Export each appointment you need from your
  calendar.”
- Tightened the retained cache policy: all HTML entry routes, including the
  designed 404, are no-cache; the manifest is served as
  `application/manifest+json`; immutable assets remain immutable.
- The catalog sentence remains compliant: “Keep side notes beside appointments
  without changing bookable time.” It is verb-first and 67 characters.

Repair commits: `1b4ff6d4c8351fc58167fac009ba49edcfdc0a35`,
`1e267ee`, and `3e91151794d81d127be9b57dd50270ecf46d5c82`.

## Verification

Final clean clone: `/tmp/booking-side-notes-polish5-final.LCRuzP` at
`3e91151794d81d127be9b57dd50270ecf46d5c82`.

- `npm ci`: passed, 0 vulnerabilities.
- `npm test`: 11/11 passed.
- `npx tsc --noEmit`: passed.
- `npm run build`: passed and produced `dist/index.html`; product JS is
  29.35 kB raw / 9.81 kB gzip and CSS is 20.67 kB raw / 5.38 kB gzip.
- Every exact `.factory/claims.json` command passed independently (13/13):
  `demo-isolated`, `local-no-upload`, `calendar-unchanged`,
  `offline-after-first-visit`, `backup-export`, `no-purchase-required`,
  `import-reconciliation`, `daily-brief`, `backup-restore`,
  `minimal-calendar-fields`, `no-notifications`, `side-note-workflow`, and
  `no-third-party-files`.
- Final clean-clone `npm run test:e2e`: 16/16 passed. It includes Axe,
  keyboard/focus history, 390 px target geometry, demo isolation, privacy,
  malformed backups, routes, and offline behavior.
- Local mobile Lighthouse: Home **97/100/100/100** and Demo
  **99/100/100/100** (performance/accessibility/best-practices/SEO); LCP 1.9 s
  and 1.4 s respectively, CLS 0. JSON reports are
  `.factory/evidence/polish-5-lighthouse-home.json` and
  `.factory/evidence/polish-5-lighthouse-demo.json`.

## Deployment and live recheck

Deployed with `/opt/fleet/lib/deploy-static.sh booking-side-notes dist`.
The final production upload completed successfully; live production serves
`assets/index-DsS6RljX.js` from
<https://booking-side-notes.sociobot.in>.

- `verify-url.sh` cold checks passed for Home and `?demo=1`: title, `lang=en`,
  one H1, main landmark, image alts, labelled buttons, and zero console errors.
  Evidence: `.factory/evidence/polish-5-live-home/verify.json` and
  `.factory/evidence/polish-5-live-demo/verify.json`.
- Cold live browser check created real data, edited sample data, exited via
  wordmark, browser Back/Forward, Privacy, Terms, and Start for real, then
  re-entered a three-note original sample every time. Real data was unchanged.
  Evidence: `.factory/evidence/polish-5-live-demo-exit-mobile.png`.
- Live Axe found zero serious/critical issues on Home, Demo, Privacy, Terms,
  and designed 404. The 390 px target scan found no control under 44 px.
- After service-worker cache readiness, live `/demo` reloaded offline and saved
  a side note. Evidence: `.factory/evidence/polish-5-live-offline-mobile.png`.
- Live HTTP checks: `/`, `/demo`, `/privacy/`, and `/terms/` return 200 with
  `Cache-Control: no-cache`; an unknown path returns designed HTTP 404 with the
  same policy; manifest is `application/manifest+json`; service worker is
  no-cache; `/assets/app-mark.svg` is immutable.

## Known gaps and next steps

None. The product remains a local-first, offline PWA with no analytics,
third-party runtime files, payment surface, background sync, or unaddressed
review finding.
