# Handoff — booking-side-notes-review-1

## Review disposition (2026-08-28)

**FAIL.** The full adversarial first-read review is in `.factory/review-1.md`.
No product code was modified.

The deployed site was checked cold at 390×844 and 1440×1000, with fresh
browser contexts. The review exercised direct demo URLs, IndexedDB isolation,
offline reload, a PII-bearing ICS import under network observation, data
export, malformed backup import, route metadata, unknown routes, history and
focus, all visible links, Axe on all public routes, and the earlier handoff's
known gaps.

Primary blockers are:

- The phone first screen does not name the intended user or expose a first
  workflow action before scrolling.
- There is no one-click sample demo. `/demo` and `?demo=1` read and write the
  real IndexedDB namespace.
- `.factory/claims.json`, claim-tagged tests, and `.factory/demo.md` are absent.
- The advertised Trail Kit checkout returns HTTP 404.
- Unknown routes return the ordinary app with HTTP 200; there is no designed
  404.
- The prior security-policy, caching/manifest-MIME, and malformed-backup-error
  follow-ups remain incomplete.

Clean-clone verification at commit
`22ed815909a06e0a73cfa85d52fdc9076838f336`:

- `npm ci`: passed, 0 vulnerabilities.
- `npm test`: passed, 5/5 tests.
- `npm run build`: passed; `dist/` was produced.
- `npm run test:e2e`: passed, 3/3 Chromium tests.
- Claim commands: not runnable because the claim registry does not exist.

The existing tests are useful regression coverage but do not satisfy the
required per-claim sandbox contract. The next worker should resolve every
finding in `.factory/review-1.md`, then re-run the entire review rather than a
diff-only check.

---

## Prior build handoff retained for review history

# Handoff — booking-side-notes-build-1

## Independent verification disposition (2026-08-28)

**PASS — candidate `83162bd92caf72118ebe0419a34cbbe58adaddf0` is deployed at
<https://booking-side-notes.sociobot.in> and meets the researched brief's
smallest useful product contract.**

Fresh verification from a clean checkout passed `npm ci`, 5/5 unit tests,
strict TypeScript, the exact production build, and 3/3 repository Chromium
tests. Independent Chromium checks exercised invalid-ICS recovery, normal ICS
import, a 500-character anchored/reminder note, zero blocked minutes, export,
refresh persistence, focus/dialog behavior, 390px layout, reduced motion,
offline reload, axe serious/critical findings (none), PWA installability, and
an actual service-worker waiting/update-toast cycle. There were no console
errors or third-party requests on the normal path.

All deployable files (HTML, SW, manifest, legal/offline pages, icons and hero
assets) matched the rebuilt candidate byte-for-byte on the live URL. The full
evidence and reproducible commands are in `.factory/verification.md`.

There are no release-blocking defects. Three low-severity follow-ups remain:
add CSP/frame/permissions response policies, use immutable caching (plus
`application/manifest+json`) for static assets, and replace raw malformed-JSON
parse errors with recovery guidance. These do not prevent the local-first
workflow or PWA install/offline behavior validated above.

## Delivered

- A finished Vite + TypeScript local-first PWA for importing ICS appointments and attaching genuinely nonblocking operational notes.
- IndexedDB persistence for minimized appointment fields and notes; no account, analytics, sync, CDN, or calendar write-back.
- Appointment-linked/general notes with anchor time, completion checkbox, due/acknowledged reminder status, edit, confirmed delete, empty/error/offline states, and responsive 390px layout.
- Printable and downloadable daily brief plus complete JSON backup/restore. Export and accessibility features remain free.
- One-time US $12 Trail Kit add-on with hosted Sociobot checkout, `sb_license:booking-side-notes` capture, daily cached verification, offline-safe optimistic state, invalid-license notice, and paste-to-restore flow. The factory still needs to register the live product.
- Install manifest, 192/512 icons, versioned service-worker shell cache, asset cache, offline fallback, `clientsClaim`, user-triggered `skipWaiting`, and update toast.
- `/privacy/`, `/terms/`, robots and sitemap, expanded README, MIT license, and the topographic-cartography design/provenance record.
- Original generated map illustration reviewed for artifacts and shipped as responsive AVIF/WebP with progressive JPEG fallback. Mobile AVIF is 16 KB; the largest WebP is 100 KB.

## Verification (2026-08-28, local production preview)

- `npm test`: 5/5 unit tests passed (ICS parsing including TZID, errors, backup validation, daily brief).
- `npx tsc --noEmit`: passed with strict TypeScript.
- `npm run build`: passed; `dist/index.html` exists at the static root.
- `npm run test:e2e`: 3/3 Chromium tests passed: ICS → linked note → reminder → completion → refresh persistence; Axe serious/critical scan and console-error check; 390×844 offline navigation with `context.setOffline(true)` and offline note creation.
- `npm audit`: 0 vulnerabilities.
- Lighthouse 12.8.2 mobile: Performance 94, Accessibility 100, Best Practices 100, SEO 100. LCP 1.7 s, FCP 0.6 s, CLS 0, TBT 290 ms. INP requires field interaction data and is not reported by a one-load lab run.
- Production budgets: app JavaScript 25.8 KB uncompressed / 8.9 KB gzip; CSS 17.1 KB / 4.7 KB gzip; no font payload; mobile hero AVIF 16 KB; no third-party runtime requests.
- Visual review completed at 1440×1000 and 390×844. Focus rings, touch targets, reduced-motion behavior, print sheet, legal pages, image alt, one H1, and landmarks are present.

## Known boundaries / next steps

- The app imports VEVENT instances and common UTC, local, all-day, and IANA `TZID` timestamps. It does not expand an `RRULE`; export the desired day/range from the source calendar so recurring instances are included.
- Reminder state is a ledger status only, intentionally not a notification service.
- Data remains in one browser profile until the user exports/imports a JSON backup. Clearing site data deletes it.
- The factory must register the `booking-side-notes` product and confirm the production return URL before the buy flow can complete. No product ID or payment secret is hardcoded.
- Lighthouse timing varies by host; performance/a11y targets passed in the recorded run. Real-user INP should be observed after launch if privacy-respecting measurement is later approved.
