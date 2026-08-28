# Polish 2 — cumulative finding disposition

All findings in review 2 and every reopened review-1 finding are resolved.
Evidence shorthand:

- **E2E** — clean-clone `npm run test:e2e`: 16/16 passed.
- **claim:​ID** — the clean clone ran that exact `.factory/claims.json`
  command independently and it passed.
- **mobile** — `.factory/evidence/polish-2-live-demo-mobile.png`.
- **live** — cold Chromium check of
  <https://booking-side-notes.sociobot.in/?demo=1> on 2026-08-28.
- **routes** — E2E metadata/footer/back-focus matrix for home, demo, Privacy,
  Terms, and 404.
- **headers** — live curl check for status, CSP, frame, permissions, MIME, and
  caching headers.

## Review 2

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-2-1 / F-1-2 | Demo skips the landing hero and opens with a real sample appointment plus its linked note. Both finish inside 390×844. | E2E first-viewport test; mobile; live bottoms 474/742 px |
| F-2-2 / F-1-68 | Compact, quick-note, reminder, checkbox, skip, footer, and legal targets now have 44×44 px hit areas. | E2E 390 px geometry scan; live found 0 undersized targets |
| F-2-3 / F-1-52 | Added page-show focus restoration and shared complete footers with both legal links and build ID. | routes; live Home→Privacy→Terms→Back→Back |
| F-2-4 / F-1-51 | Added `og:type` and all Twitter title, description, and image fields to Privacy, Terms, and 404. | unit metadata matrix; routes; live metadata crawl |
| F-2-5 / F-1-3 | Reconciliation now begins at `?demo=1`, writes only `booking-side-notes-demo`, and asserts real storage is absent. | claim:​import-reconciliation |
| F-2-6 / F-1-24 | Registered both note associations, completion, and due/acknowledged reminder states. | claim:​side-note-workflow |
| F-2-7 / F-1-32 | Narrowed Privacy copy and registered account, background-sync, request-origin, and font-face checks. | claim:​no-third-party-files |
| F-2-8 / F-1-33 | Replaced CDN jargon with “loads no third-party files” and tested request/font sources. | claim:​no-third-party-files |
| F-2-9 / F-1-42 / F-1-43 | Removed unneeded scheduling/recurrence promises; retained only tested calendar and notification boundaries. | copy audit; claim:​calendar-unchanged; claim:​no-notifications |
| F-2-10 / F-1-34 | Declared `engines.node >=20` and ran unit, type, and build gates on Node 20.20.2. | unit config test; Node 20 gate output |
| F-2-11 / F-1-63 | Replaced every cited jargon phrase with appointment-business language. | `.factory/copy-audit.md`; source scan |
| F-2-12 / F-1-64 | Standardized capacity prose on “bookable time” and calendar boundaries on “does not change your calendar.” | copy audit; claim:​calendar-unchanged |
| F-2-13 | Removed untestable “clean” from daily-brief copy. | claim:​daily-brief; copy audit |
| F-2-14 | Renamed quick actions “Start … note”; reminder state is text and the button says “Mark …”. | claim:​side-note-workflow; mobile |

## Review 1 revalidation

| Finding | Change retained or completed | Evidence |
| --- | --- | --- |
| F-1-1 | Job, audience, action result, and three facts fit the home phone screen. | E2E home/mobile; copy audit |
| F-1-2 | Isolated direct demo now also opens in-use above the fold. | F-2-1; claim:​demo-isolated |
| F-1-3 | Claims registry has one unique tagged demo test per claim. | unit registry test; 13 independent claim runs |
| F-1-4 | Import and reconciliation are observable in the sandbox. | claim:​import-reconciliation |
| F-1-5 | Side notes never alter appointment records. | claim:​calendar-unchanged |
| F-1-6 | Full demo flow remains same-origin. | claim:​local-no-upload |
| F-1-7 | Adding notes retains the measured zero-blocked status. | claim:​calendar-unchanged |
| F-1-8 | Copy and export use the exact retained appointment fields. | claim:​minimal-calendar-fields |
| F-1-9 | Whole-day notes do not create appointments. | claim:​calendar-unchanged; claim:​side-note-workflow |
| F-1-10 | Print and text-download output are asserted. | claim:​daily-brief |
| F-1-11 | Backup export works with no purchase state. | claim:​no-purchase-required |
| F-1-12 | One backup contains every demo appointment and note. | claim:​backup-export |
| F-1-13 | Cancel and confirm restore branches are asserted. | claim:​backup-restore |
| F-1-14 | Removed paid phrase gating; result-naming starters are free. | claim:​side-note-workflow |
| F-1-15 | Create, complete, brief, and backup tools need no purchase. | claim:​no-purchase-required |
| F-1-16 | Removed unavailable purchase promise. | source/copy scan |
| F-1-17 | Removed merchant claim. | source/copy scan |
| F-1-18 | Removed refund/revocation claim. | source/copy scan |
| F-1-19 | Editor states the tested calendar boundary. | claim:​calendar-unchanged |
| F-1-20 | Reminder actions leave notification permission and push untouched. | claim:​no-notifications |
| F-1-21 | Audience appears on the first screen and in README. | home cold read; copy audit |
| F-1-22 | ICS-to-linked-note flow is covered without calendar mutation. | claim:​import-reconciliation; claim:​calendar-unchanged |
| F-1-23 | Exact retained fields agree across UI, README, and Privacy. | claim:​minimal-calendar-fields |
| F-1-24 | Both associations, completion, and reminders are now registered. | F-2-6 |
| F-1-25 | Replaced contract jargon with direct calendar copy. | copy audit |
| F-1-26 | Print and download both contain sample records. | claim:​daily-brief |
| F-1-27 | Backup export and exact restore remain tested. | claim:​backup-export; claim:​backup-restore |
| F-1-28 | Offline demo reload/save and 390 px layout pass. | claim:​offline-after-first-visit; E2E |
| F-1-29 | Removed unavailable paid offer. | source/copy scan |
| F-1-30 | Core flow remains purchase-free. | claim:​no-purchase-required |
| F-1-31 | Real and demo IndexedDB names remain separate. | claim:​demo-isolated |
| F-1-32 | Broader privacy copy is now narrowed and fully tested. | F-2-7 |
| F-1-33 | Third-party file/font promise is now plain and tested. | F-2-8 |
| F-1-34 | Node 20 is declared and exercised. | F-2-10 |
| F-1-35 | Exact `npm run build` passes in a clean clone. | clean-clone build |
| F-1-36 | Build produces `dist/index.html`. | clean-clone build |
| F-1-37 | Stale shell implementation claim remains removed. | README scan |
| F-1-38 | Playwright remains pinned at 1.58.2. | lockfile; clean-clone E2E |
| F-1-39 | Browser install guidance is conditional and direct. | README copy audit |
| F-1-40 | Dead checkout link remains absent. | live link/source crawl |
| F-1-41 | No payment SDK or provider request exists. | claim:​no-third-party-files |
| F-1-42 | Untested scheduling clause removed. | F-2-9 |
| F-1-43 | Untested recurrence clause removed. | F-2-9 |
| F-1-44 | Notification boundary remains observable. | claim:​no-notifications |
| F-1-45 | Backup-loss guidance remains direct. | README copy audit |
| F-1-46 | No dead purchase control or link remains. | live/source crawl |
| F-1-47 | Demo is real; unknown path returns styled HTTP 404. | routes; live 404 status |
| F-1-48 | CSP, frame, permission, nosniff, and referrer policies are live. | headers |
| F-1-49 | Manifest MIME and asset immutable cache are live. | headers |
| F-1-50 | Malformed and wrong-shape backups show actionable recovery copy. | E2E backup-error test |
| F-1-51 | Metadata is complete on app and static routes. | F-2-4 |
| F-1-52 | Header/footer/focus parity is complete. | F-2-3 |
| F-1-53 | Three steps and explicit boundaries remain on landing. | home cold read; copy audit |
| F-1-54 | README prose stays within 22 words per sentence. | copy audit |
| F-1-55 | H1 states the job. | home cold read |
| F-1-56 | Abstract “operational details” remains absent. | source/copy scan |
| F-1-57 | Captions name appointments and side notes. | home visual check |
| F-1-58 | Appointment empty state gives the next action. | E2E workflow |
| F-1-59 | Side-note section uses the product term. | live visual check |
| F-1-60 | Side-note empty state gives concrete examples. | E2E workflow |
| F-1-61 | Daily-brief heading names print/export. | claim:​daily-brief |
| F-1-62 | Backup heading names backup/restore. | claim:​backup-restore |
| F-1-63 | Remaining README jargon is gone. | F-2-11 |
| F-1-64 | Capacity terminology is now consistent. | F-2-12 |
| F-1-65 | “Side note” is used consistently. | copy audit |
| F-1-66 | Ambiguous data/license control remains absent. | live/source check |
| F-1-67 | Unused license verification control remains absent. | live/source check |
| F-1-68 | Every visible target now meets 44×44 px. | F-2-2 |
| F-1-69 | Missing appointments are removed and their notes remain visibly unlinked. | claim:​import-reconciliation |

## Verification summary

Clean clone `/tmp/booking-side-notes-polish2.qkOXH3` at code commit
`40d77a8`: `npm ci` had 0 vulnerabilities; unit 9/9, typecheck, build, and
E2E 16/16 passed. All 13 claim commands passed independently. Node 20.20.2
also passed unit, typecheck, and build. Built JS is 28.28 kB raw / 9.53 kB
gzip; CSS is 20.49 kB raw / 5.33 kB gzip.

Local Lighthouse mobile: home 91/100/100/100 and demo 95/100/100/100 for
performance/accessibility/best-practices/SEO. Home LCP was 1.9 s; demo LCP
1.4 s; both CLS 0. Playwright Axe reported zero serious/critical findings on
home, demo, Privacy, Terms, and 404.

The final live cold check at deployed commit `a6ee126` found one origin only,
zero console errors, zero undersized
targets, zero serious/critical Axe findings, successful offline reload, intact
demo isolation/reset, and working legal/history focus. Live screenshot:
`.factory/evidence/polish-2-live-demo-mobile.png`.
