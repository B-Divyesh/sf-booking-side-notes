# Polish 4 — cumulative finding disposition

All findings from adversarial reviews 1–4 are resolved in the deployed PWA.

## Evidence key

- **C** — fresh clone `/tmp/booking-side-notes-polish4-clean.ONgx6T` at
  `97b5b2bd6b05bf06b7aa9e5f9d4a99abf5dd8932`: locked install with zero
  vulnerabilities, unit 10/10, typecheck, build, all 13 exact claim commands,
  and full E2E 16/16 passed.
- **L** — cold production checks at
  <https://booking-side-notes.sociobot.in> and `/?demo=1` after deploying
  build `97b5b2b` (`index-Dsg9VmHh.js`).
- **A11y** — live Axe checks found zero serious/critical issues on Home, Demo,
  Privacy, Terms, and 404. `verify-url.sh` found one H1, `lang=en`, a main
  landmark, complete alt/button names, and zero console errors.
- **Routes** — the E2E route test and live Home → Privacy → Terms → Back → Back
  check passed titles, metadata, shared footer, H1 focus, and announcements.
- **Shots** — `.factory/evidence/polish-4-live-home-mobile.png`,
  `.factory/evidence/polish-4-live-demo-scrolled-mobile.png`, and
  `.factory/evidence/polish-4-live-404-mobile.png`. Local regression shots are
  `.factory/evidence/polish-4-demo-mobile.png` and
  `.factory/evidence/polish-4-demo-scrolled-mobile.png`.

## Review 4

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-4-1 | Made the demo disclosure a sticky, opaque field strip with a 60px phone layout. The exact disclosure, Reset demo, and Start for real stay visible above editable sample data. Expanded the isolated-demo claim to scroll 1,200px, assert banner geometry, edit demo data, compare real data before/after, reset, and exit. | `@claim:demo-isolated`; local and live scrolled demo shots; L measured the banner at `x=0, y=0, 390×60`; live reset/edit/exit and IndexedDB check passed. |

## Review 1

| Finding | Change retained | Evidence |
| --- | --- | --- |
| F-1-1 | The phone hero states the job, audience, sample action/result, and three facts. | E2E first-viewport test; L facts end at y=645; live home shot. |
| F-1-2 | `?demo=1` and `/demo` open a seeded, isolated sample with persistent disclosure, reset, and exit. | `@claim:demo-isolated`; live demo shot; L. |
| F-1-3 | The claim registry has 13 entries and one unique tagged browser test per entry. | C config test and 13/13 independent claim commands. |
| F-1-4 | Imported appointments and side-note reconciliation are observable in demo. | `@claim:import-reconciliation`. |
| F-1-5 | Side notes leave appointment records unchanged. | `@claim:calendar-unchanged`. |
| F-1-6 | Demo actions and export remain on the product origin. | `@claim:local-no-upload`; L observed one origin. |
| F-1-7 | Added notes retain exactly zero blocked minutes. | `@claim:calendar-unchanged`. |
| F-1-8 | Copy and archives use the exact retained appointment fields. | `@claim:minimal-calendar-fields`. |
| F-1-9 | Linked and whole-day notes create no appointment and resize none. | `@claim:calendar-unchanged`; `@claim:side-note-workflow`. |
| F-1-10 | Print output and text download contain the sample day. | `@claim:daily-brief`. |
| F-1-11 | Backup export works without purchase state. | `@claim:no-purchase-required`. |
| F-1-12 | One backup contains every demo appointment and side note. | `@claim:backup-export`. |
| F-1-13 | Restore cancel preserves data; confirmation replaces it. | `@claim:backup-restore`. |
| F-1-14 | Paid phrase gating was removed; note starters are free. | `@claim:side-note-workflow`; L source/link crawl. |
| F-1-15 | Create, complete, print, and export need no purchase. | `@claim:no-purchase-required`. |
| F-1-16 | The unavailable one-time-purchase promise remains absent. | C source/copy audit; L crawl. |
| F-1-17 | The unverified merchant claim remains absent. | C source/copy audit; L crawl. |
| F-1-18 | The unverified refund/revocation claim remains absent. | C source/copy audit; L crawl. |
| F-1-19 | The editor states and tests that it creates no calendar event. | `@claim:calendar-unchanged`. |
| F-1-20 | Reminder status requests no permission and creates no push subscription. | `@claim:no-notifications`. |
| F-1-21 | The named audience appears on landing and in README. | E2E first-viewport test; live home shot. |
| F-1-22 | ICS-to-side-note flow works without calendar mutation. | `@claim:import-reconciliation`; `@claim:calendar-unchanged`. |
| F-1-23 | Exact retained fields agree in code, UI, README, Privacy, and archive. | `@claim:minimal-calendar-fields`. |
| F-1-24 | Both associations, completion, and reminder states are registered. | `@claim:side-note-workflow`. |
| F-1-25 | Direct calendar-boundary wording replaces contract jargon. | Copy audit; `@claim:calendar-unchanged`. |
| F-1-26 | Print and download both contain sample records. | `@claim:daily-brief`. |
| F-1-27 | Backup export and confirmed restore preserve supported data. | `@claim:backup-export`; `@claim:backup-restore`. |
| F-1-28 | The installed demo reloads and saves offline at phone size. | `@claim:offline-after-first-visit`; L offline edit. |
| F-1-29 | The unavailable paid offer and price remain absent. | C source scan; L crawl. |
| F-1-30 | Side notes, daily brief, and backup remain purchase-free. | `@claim:no-purchase-required`. |
| F-1-31 | Real and demo data remain in separate IndexedDB databases and keys. | `@claim:demo-isolated`; L database comparison. |
| F-1-32 | Account, sync, origin, and file privacy scope is narrow and tested. | `@claim:no-third-party-files`; `@claim:local-no-upload`. |
| F-1-33 | Plain “loads no third-party files” wording remains tested. | `@claim:no-third-party-files`. |
| F-1-34 | `engines.node` declares `>=20`. | C config test and clean build. |
| F-1-35 | The documented `npm run build` command succeeds. | C build. |
| F-1-36 | The build emits `dist/index.html`. | C build. |
| F-1-37 | The stale critical-shell implementation promise remains absent. | C README/source scan. |
| F-1-38 | Playwright remains pinned to 1.58.2. | C package/lockfile and E2E. |
| F-1-39 | Browser installation guidance remains conditional and direct. | README/copy audit. |
| F-1-40 | The dead checkout documentation and URL remain absent. | C source scan; L link crawl. |
| F-1-41 | No payment SDK or provider request is shipped. | `@claim:no-third-party-files`. |
| F-1-42 | Unsupported scheduler wording remains absent. | README/copy audit. |
| F-1-43 | Unsupported recurrence wording remains absent. | README/copy audit. |
| F-1-44 | Notification behavior has a browser-state test. | `@claim:no-notifications`. |
| F-1-45 | Backup-loss guidance remains direct and short. | README/copy audit. |
| F-1-46 | No dead paid control or purchase link remains. | L link crawl; source scan. |
| F-1-47 | Demo URLs are real; an unknown path returns the designed HTTP 404. | Routes; L unknown route returned 404; live 404 shot. |
| F-1-48 | CSP, frame, permissions, nosniff, and referrer protections remain deployed. | C config test; L response-header curl. |
| F-1-49 | Manifest MIME and immutable asset cache rules remain deployed. | C config test; L response-header curl. |
| F-1-50 | Malformed and wrong-shape backups provide a recovery step. | E2E malformed-backup test. |
| F-1-51 | App, demo, legal, and 404 routes retain complete route metadata. | C metadata test; Routes; L. |
| F-1-52 | Shared navigation/footer and H1 focus work through history. | Routes; L history sequence. |
| F-1-53 | Landing retains three verb-led steps and explicit boundaries. | Copy audit; live home check. |
| F-1-54 | README prose remains within the 22-word cap. | `.factory/copy-audit.md`. |
| F-1-55 | The H1 states the appointment-note job. | E2E first-viewport test; live home shot. |
| F-1-56 | “Operational details” remains absent from product copy. | C source/copy scan. |
| F-1-57 | Caption names appointments and side notes directly. | Live home shot. |
| F-1-58 | Appointment empty state gives the next import action. | E2E workflow. |
| F-1-59 | The side-note section has a plain standalone heading. | Live demo check. |
| F-1-60 | Side-note empty state gives examples and an add action. | E2E workflow. |
| F-1-61 | Daily-brief heading names print/export. | `@claim:daily-brief`. |
| F-1-62 | Backup heading names backup/restore. | `@claim:backup-restore`. |
| F-1-63 | The cited README implementation jargon remains absent. | Copy audit. |
| F-1-64 | Capacity prose consistently uses “bookable time.” | Copy audit; `@claim:calendar-unchanged`. |
| F-1-65 | Local work items consistently use “side note.” | Copy audit. |
| F-1-66 | The ambiguous Data & license control remains absent. | C source scan; live home shot. |
| F-1-67 | The unused license verification control remains absent. | C source scan; L. |
| F-1-68 | Every visible phone target remains at least 44×44px. | E2E geometry test; L found zero undersized targets. |
| F-1-69 | Re-import removes missing appointments and retains their notes as unlinked. | `@claim:import-reconciliation`. |

## Review 2

| Finding | Change retained | Evidence |
| --- | --- | --- |
| F-2-1 | Demo opens with an appointment and linked note inside 390×844. | E2E first-viewport test; L bottoms y=406/y=674; local demo shot. |
| F-2-2 | Compact, note, reminder, footer, and legal targets meet 44px. | E2E geometry test; L 200%/target check. |
| F-2-3 | Legal and history navigation restore H1 focus; footers match. | Routes; L history sequence. |
| F-2-4 | Static legal and 404 pages retain complete OG/Twitter fields. | C metadata test; Routes. |
| F-2-5 | Reconciliation starts in demo and leaves real storage unchanged. | `@claim:import-reconciliation`. |
| F-2-6 | Both note associations, completion, and reminder states are registered. | `@claim:side-note-workflow`. |
| F-2-7 | Privacy account/sync/request/font scope is registered. | `@claim:no-third-party-files`. |
| F-2-8 | Third-party file and font scope is plain and tested. | `@claim:no-third-party-files`. |
| F-2-9 | Unsupported scheduling and recurrence claims remain absent. | README/copy audit. |
| F-2-10 | Node 20 support remains declared and exercised. | C config test/build. |
| F-2-11 | Cited README jargon remains replaced with appointment-business language. | Copy audit. |
| F-2-12 | Calendar and bookable-time terminology remains consistent. | Copy audit; `@claim:calendar-unchanged`. |
| F-2-13 | Untestable “clean” daily-brief wording remains absent. | Copy audit; `@claim:daily-brief`. |
| F-2-14 | Quick actions and reminder buttons continue to name their result. | `@claim:side-note-workflow`; live demo shot. |

## Review 3

| Finding | Change retained | Evidence |
| --- | --- | --- |
| F-3-1 | The vague “Private appointment companion” phrase remains absent. | C config regression test; E2E first-viewport test; live home shot. |

## Final verification

- Local Lighthouse mobile: Home **99/100/100/100** and Demo
  **99/100/100/100** for performance/accessibility/best-practices/SEO. Home
  LCP was 1.6s, TBT 110ms, CLS 0; Demo LCP was 1.1s, TBT 140ms, CLS 0.
- Production JS is 28.30kB raw / 9.54kB gzip; CSS is 20.67kB raw / 5.38kB
  gzip. There are no font downloads.
- The live link crawl found ten HTTP destinations, all 200, plus two explicit
  `mailto:` links. Normal routes produced zero console errors or failed
  requests.
- The live mobile audit passed 200% text resize without overflow, dialog focus
  entry/return, reduced motion, offline reload/edit, and zero undersized
  targets.
- No finding of any severity remains.
