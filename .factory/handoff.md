# Handoff — Booking Side Notes review 4

## Completed

- Performed an adversarial fresh-user review of the deployed site at commit
  `658f96f2d0b264d87785da3594b452c8cdf6abf3`.
- Wrote the complete result in `.factory/review-4.md`; no product code was
  modified.
- Rechecked all review-1, review-2, review-3, and polish findings against the
  live site, source, and tests.

## Verification

Fresh clone: `/tmp/booking-side-notes-review-4-clean`.

- `npm ci` passed with 0 audit vulnerabilities.
- `npm test` passed: 10/10.
- `npx tsc --noEmit` passed.
- `npm run build` passed and emitted `dist/index.html`.
- Every exact command listed in `.factory/claims.json` passed independently:
  13/13.
- `npm run test:e2e` passed: 16/16, including Axe serious/critical checks,
  demo isolation, offline reload/save, request-origin privacy checks, mobile
  target geometry, metadata, and route history focus.
- Fresh live phone and desktop checks confirmed the first-read explanation,
  one-click used-state demo, Reset demo, real/demo IndexedDB separation,
  offline demo editing, live headers, metadata, link crawl, and styled HTTP
  404.

## Remaining work

The review verdict is **FAIL** because one blocking issue remains:

- `F-4-1`: the demo banner (“Demo — sample data, nothing is saved”) scrolls
  off screen on a 390px phone while the user can continue editing sample data.
  Make the disclosure persist beneath the header during demo editing and add
  a mobile scroll regression test that also confirms real storage is untouched.

See `.factory/review-4.md` for exact evidence and the concrete repair.
