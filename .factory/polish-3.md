# Polish 3 — final cumulative finding disposition

All findings from reviews 1–3 are resolved in the deployed PWA.

## Evidence key

- **C** — fresh clone at `1fbdcd5726cbd1b108d3a1cf0917191bac455478`:
  `npm ci`, unit (10/10), typecheck, build, every exact claim command (13/13),
  and full E2E (16/16) passed.
- **claim:ID** — the exact `claims.json` command passed independently in that
  clean clone.
- **E2E** — the 16-test browser suite, including Playwright Axe, 390 px target
  geometry, demo first viewport, history focus, malformed backup, and 404.
- **L** — final cold production check at
  <https://booking-side-notes.sociobot.in> after deployment of `1fbdcd5`
  (`index-D4EH0llZ.js`). It covered sample isolation/reset/exit, cached
  offline `/demo`, live routes, metadata, HTTP 404, headers, focus, and live
  Axe.
- **shots** — `.factory/evidence/polish-3-live-home-mobile.png`,
  `.factory/evidence/polish-3-live-demo-mobile.png`, and
  `.factory/evidence/polish-3-live-404-mobile.png`.

## Review 1

| Finding | Final change | Evidence |
| --- | --- | --- |
| F-1-1 | Plain job H1, named audience, sample action/result, and three facts fit the phone screen. | E2E; L; shots |
| F-1-2 | `?demo=1` and `/demo` seed a separate, in-use sample workspace with banner, Reset, and Start for real. | claim:demo-isolated; L; shots |
| F-1-3 | Added the 13-entry claim registry with one unique tagged demo test per entry. | C unit registry test; C claims 13/13 |
| F-1-4 | ICS replacement/import behavior is observable from demo state. | claim:import-reconciliation |
| F-1-5 | Side notes leave appointment records and bookable time unchanged. | claim:calendar-unchanged |
| F-1-6 | Demo actions and export remain same-origin/local. | claim:local-no-upload; L |
| F-1-7 | Capacity remains exactly zero blocked minutes after notes. | claim:calendar-unchanged |
| F-1-8 | UI, privacy copy, and export use the exact retained appointment fields. | claim:minimal-calendar-fields |
| F-1-9 | Whole-day or linked notes do not create or resize appointments. | claim:calendar-unchanged; claim:side-note-workflow |
| F-1-10 | Daily brief print output and text download are tested. | claim:daily-brief |
| F-1-11 | Backup export remains usable without purchase state. | claim:no-purchase-required |
| F-1-12 | One backup contains every demo appointment and note. | claim:backup-export |
| F-1-13 | Restore asks first; cancel preserves and confirm replaces. | claim:backup-restore |
| F-1-14 | Removed paid phrase gating; free quick-note starters name their result. | claim:side-note-workflow |
| F-1-15 | Create, complete, print, and export remain purchase-free. | claim:no-purchase-required |
| F-1-16 | Removed unavailable one-time-purchase promise. | C copy audit; L crawl |
| F-1-17 | Removed unverified merchant claim. | C copy audit; L crawl |
| F-1-18 | Removed unverified refund/revocation claim. | C copy audit; L crawl |
| F-1-19 | Editor states and tests that it creates no calendar event. | claim:calendar-unchanged |
| F-1-20 | Reminder status never requests permission or registers push. | claim:no-notifications |
| F-1-21 | Audience is stated on landing and README. | C copy audit; L home |
| F-1-22 | ICS-to-attached-side-note flow is live without calendar mutation. | claim:import-reconciliation; claim:calendar-unchanged |
| F-1-23 | Imported field retention is exact and documented plainly. | claim:minimal-calendar-fields |
| F-1-24 | Appointment and whole-day notes, completion, and reminder states are registered. | claim:side-note-workflow |
| F-1-25 | Replaced contract jargon with direct calendar-boundary copy. | C copy audit; claim:calendar-unchanged |
| F-1-26 | Print and download contain realistic sample records. | claim:daily-brief |
| F-1-27 | Backup export and confirmed restoration are tested. | claim:backup-export; claim:backup-restore |
| F-1-28 | PWA demo reload/edit works offline at phone size. | claim:offline-after-first-visit; L |
| F-1-29 | Removed unavailable paid offer and price. | C copy audit; L crawl |
| F-1-30 | Core notes, brief, and backup remain free. | claim:no-purchase-required |
| F-1-31 | Real and demo IndexedDB databases are separate. | claim:demo-isolated; L |
| F-1-32 | Narrowed privacy wording and tested account/sync/origin scope. | claim:no-third-party-files |
| F-1-33 | Replaced CDN jargon with tested “loads no third-party files.” | claim:no-third-party-files |
| F-1-34 | Declared `engines.node >=20`. | C unit config test |
| F-1-35 | Exact build command succeeds from a clean clone. | C `npm run build` |
| F-1-36 | Build emits `dist/index.html`. | C build |
| F-1-37 | Removed stale implementation promise. | C README/copy audit |
| F-1-38 | Playwright remains pinned to 1.58.2. | C package/lockfile; C E2E |
| F-1-39 | Browser-install guidance is conditional and direct. | C README/copy audit |
| F-1-40 | Removed dead checkout documentation/link. | C source scan; L crawl |
| F-1-41 | No embedded payment SDK or provider request exists. | claim:no-third-party-files |
| F-1-42 | Removed untested scheduler boundary. | C README/copy audit |
| F-1-43 | Removed untested recurrence promise. | C README/copy audit |
| F-1-44 | Notification boundary is observable. | claim:no-notifications |
| F-1-45 | Backup-loss guidance is direct and plain. | C README/copy audit |
| F-1-46 | No dead paid control remains. | L crawl |
| F-1-47 | Direct demo routes work and unknown paths return designed HTTP 404. | E2E; L; 404 shot |
| F-1-48 | CSP, frame, permissions, nosniff, and referrer policies ship in static config. | C config test; L headers |
| F-1-49 | Manifest MIME and immutable asset cache policy ship in static config. | C config test; L headers |
| F-1-50 | Invalid backup errors give a recovery step. | E2E malformed-backup test |
| F-1-51 | App, legal, demo, and 404 routes have title/canonical/OG/Twitter metadata. | C metadata test; E2E; L |
| F-1-52 | Shared navigation/footer plus H1 focus and announcement work across history. | E2E; L Home→Privacy→Terms→Back→Back |
| F-1-53 | Landing includes three plain steps and explicit boundaries. | C copy audit; L home |
| F-1-54 | README sentences are within the 22-word cap. | C copy audit |
| F-1-55 | H1 names the appointment-note job. | C copy audit; L home |
| F-1-56 | Removed abstract “operational details.” | C copy audit |
| F-1-57 | Caption names appointments and side notes directly. | L home shot |
| F-1-58 | Appointment empty state names the next step. | E2E workflow |
| F-1-59 | Side-note heading uses the product term. | L demo shot |
| F-1-60 | Side-note empty state gives examples and action. | E2E workflow |
| F-1-61 | Daily-brief heading names print/export. | claim:daily-brief |
| F-1-62 | Backup heading names backup/restore. | claim:backup-restore |
| F-1-63 | Cited README jargon is gone. | C copy audit |
| F-1-64 | Capacity wording is consistent: “bookable time.” | C copy audit; claim:calendar-unchanged |
| F-1-65 | “Side note” is the consistent product term. | C copy audit |
| F-1-66 | Removed ambiguous data/license control. | L home |
| F-1-67 | Removed unused license verification control. | L home |
| F-1-68 | All visible targets are at least 44×44 px. | E2E geometry test; L mobile |
| F-1-69 | Re-import removes missing appointments and preserves their notes as unlinked. | claim:import-reconciliation |

## Review 2

| Finding | Final change | Evidence |
| --- | --- | --- |
| F-2-1 | Demo opens with a sample appointment and linked note inside 390×844. | E2E first-viewport test; L; demo shot |
| F-2-2 | Compact, quick-note, reminder, checkbox, skip, header, footer, and legal targets meet 44 px. | E2E geometry test; L mobile |
| F-2-3 | Legal pages restore H1 focus on navigation and history; all routes share footer content. | E2E; L focus sequence |
| F-2-4 | Added complete static OG/Twitter fields. | C metadata test; E2E; L routes |
| F-2-5 | Reconciliation begins in demo and asserts real storage remains absent. | claim:import-reconciliation |
| F-2-6 | Registered the formerly compound note workflow claim. | claim:side-note-workflow |
| F-2-7 | Registered the account/background-sync/request/font privacy scope. | claim:no-third-party-files |
| F-2-8 | Registered and tested third-party-file/font scope. | claim:no-third-party-files |
| F-2-9 | Removed untested scheduling and recurrence wording. | C README/copy audit |
| F-2-10 | Node 20 is declared and validated by config/build checks. | C unit config test; C build |
| F-2-11 | Rewrote cited README jargon in plain appointment-business language. | C copy audit |
| F-2-12 | Standardized calendar/bookable-time terminology. | C copy audit; claim:calendar-unchanged |
| F-2-13 | Removed untestable “clean” daily-brief wording. | C copy audit; claim:daily-brief |
| F-2-14 | Quick actions and reminder controls name the action they take. | claim:side-note-workflow; L demo |

## Review 3

| Finding | Final change | Evidence |
| --- | --- | --- |
| F-3-1 | Removed “Private appointment companion” rather than adding a vague privacy promise. Added source and browser regression checks. | C config regression test; E2E mobile test; L home; home shot |

## Final check

No product claims appear on the landing page or README without a matching
claim inventory entry and observable demo test. The final cold production
check found no remaining review finding at any severity.
