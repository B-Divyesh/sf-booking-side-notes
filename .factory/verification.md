# Independent verification — booking-side-notes-verify-1

**Result: PASS**

Verified on 2026-08-28 from clean commit
`83162bd92caf72118ebe0419a34cbbe58adaddf0` against
<https://booking-side-notes.sociobot.in>.

## Evidence

### Reproducible local gates

| Check | Result |
| --- | --- |
| `npm ci` | Passed; locked install completed with 0 audit vulnerabilities. |
| `npm test` | Passed: 5/5 Vitest domain tests. |
| `npx tsc --noEmit` | Passed. |
| `npm run build` | Passed and produced `dist/`. |
| `npm run test:e2e` | Passed: 3/3 Chromium tests. |
| Production budget | Built JS is 25,784 B (8,856 B gzip); CSS is 17,141 B (4,716 B gzip); no font payload. Initial inline `index.html` is 43,641 B (13,520 B gzip). This is within the 200 KB JS / 50 KB CSS static-product budgets. |

There is no configured lint script; TypeScript strict checking is the available
repository static check. An independent Lighthouse CLI run could not be
completed because the verifier host's Chrome process crashed before audit
collection; this is recorded as a test-environment limitation, not used as
evidence for this result.

### Independent functional and browser exercise

On the exact production build served locally, a fresh Chromium profile covered:

- Invalid ICS showed “This file is not an ICS calendar.”; a following valid
  two-event import recovered successfully.
- An imported appointment received a 500-character side note anchored at
  08:45, with a due reminder. The capacity banner remained “0 minutes
  blocked”; the daily text export included the same nonblocking guarantee.
- The editor opens as a modal with focus on the operational-note textarea.
  A note survived reload via IndexedDB. Existing end-to-end coverage also
  exercised completion, reminder toggle, and offline note creation.
- A malformed JSON backup showed a parse error; a following valid one-event,
  one-note backup was accepted after native confirmation and restored both
  items. ICS parser and backup-shape failures are also unit tested.
- Axe found zero serious/critical violations at desktop and 390 x 844 mobile.
  The desktop and mobile views were visually reviewed; mobile document width
  equalled 390 px (no horizontal overflow). Tab starts at the skip link and
  all sampled focus targets rendered a solid visible focus outline. With
  reduced motion emulated, button transition duration was `0.00001s`.
- No browser console errors, failed requests, or third-party origins occurred
  in the normal local or live-product paths.

### PWA and privacy

- Chromium `Page.getInstallabilityErrors` returned an empty list on local and
  live builds. The live installed shell had an active controller and the
  versioned `booking-side-notes-B-0Nchm0` cache.
- After first visit, live navigation at 390 px with the context offline loaded
  the app and displayed “Offline · on device”.
- Service-worker update behavior was independently tested against an otherwise
  identical local production server that returned a fresh `sw.js`: the updated
  worker became `waiting`, the “Update app” toast appeared, and the shipped
  activation route is `SKIP_WAITING` plus controller-change reload.
- An ICS containing DESCRIPTION, ATTENDEE, and URL PII fields persisted only
  `{ id, summary, start, location }` for the event in IndexedDB. Browser
  request capture found no analytics, font/CDN, calendar, or PII upload; the
  only configured external endpoint is the opt-in Sociobot license API.

### Deployment identity and HTTP behavior

The following live files SHA-256 matched the newly built `dist/` byte for
byte: app HTML, service worker, manifest, offline and legal pages, robots,
sitemap, app mark, both icons, and every hero-image rendition. The candidate
is therefore deployed; there is no deployment-only failure.

Live responses were HTTPS-only and supplied HSTS, `nosniff`,
`strict-origin-when-cross-origin`, and `public, must-revalidate, max-age=30`.
All expected PWA/legal URLs returned 200. The manifest is served as
`application/octet-stream`, but Chromium reports no installability issue.

## Defects and follow-ups

No blocker, critical, high, or medium defects found.

Low severity deployment hardening:

1. The live host does not send a `Content-Security-Policy`, `Permissions-Policy`,
   or `X-Frame-Options` / CSP `frame-ancestors` header. Because the app handles
   locally stored client PII, add a restrictive static-site CSP and appropriate
   frame/permissions policy at deployment.
2. The host gives every static asset only a 30-second revalidating cache policy
   instead of immutable long-lived caching. The service worker makes repeat
   PWA loads resilient, but immutable/versioned asset caching would improve
   ordinary browser reloads. Serve the manifest as `application/manifest+json`
   at the same time for standards clarity.
3. A syntactically malformed JSON backup exposes the browser's raw JSON parse
   message (for example, “Expected property name…”), rather than the app's
   friendlier backup guidance. Import recovery works, but replace this with a
   concise user-facing message that says to select a valid exported backup.

## Verification commands

```sh
npm ci
npm test
npx tsc --noEmit
npm run build
npm run test:e2e
```

For manual verification, run `npm run preview`, import a normal day ICS,
create a linked side note with an anchor/reminder, reload, then switch the
browser offline and reload once more.
