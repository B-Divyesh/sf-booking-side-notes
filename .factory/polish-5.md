# Polish 5 — cumulative finding disposition

All findings in reviews 1–5 are resolved. This round repaired the reopened demo
exit defect, removed the last calendar jargon, and revalidated every earlier
finding from a clean clone and on the deployed PWA.

## Evidence key

- **C** — final clean clone
  `/tmp/booking-side-notes-polish5-final.LCRuzP` at `3e911517`; locked install,
  11 unit/config tests, typecheck, build, all 13 exact claim commands, and the
  full 16-test Playwright suite passed.
- **Claim** — the named exact command in `.factory/claims.json` passed alone
  from that clean clone.
- **L** — cold live production check at
  <https://booking-side-notes.sociobot.in> after the final static upload.
- **Shots** — `polish-5-live-home/screenshot-mobile.png`,
  `polish-5-live-demo/screenshot-mobile.png`,
  `polish-5-live-demo-exit-mobile.png`, and
  `polish-5-live-offline-mobile.png` in `.factory/evidence/`.
- **A11y** — live Axe found zero serious/critical findings on Home, Demo,
  Privacy, Terms, and 404. `verify-url.sh` found no normal-route console error.

## Review 5

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-5-1 / F-1-2 | Centralized demo exit cleanup in `discardDemoBeforeExit`; intercepted wordmark/legal navigation; a pagehide marker clears a demo document before Back/Forward can restore it. The one claim now exercises Reset, wordmark, Back/Forward, Privacy, Terms, and Start for real. | Claim `demo-isolated`; C E2E; L live exit check; `polish-5-live-demo-exit-mobile.png`; `/?demo=1` |
| F-5-2 | Rewrote README to “Export each appointment you need from your calendar.” Added a source regression assertion. | C config test; README; <https://github.com/B-Divyesh/sf-booking-side-notes/blob/main/README.md> |

## Review 1

| Finding ID | Retained final change | Evidence |
| --- | --- | --- |
| F-1-1 | Home first screen states the job, audience, sample action/result, and three facts. | C E2E; L Home; Shots |
| F-1-2 | Isolated, one-click, seeded `?demo=1`/`/demo` now discards every exit path. | Claim `demo-isolated`; L; Shots |
| F-1-3 | Registry has 13 unique tagged observable demo tests. | C config test; all Claims |
| F-1-4 | Replacing an imported day is observable from demo data. | Claim `import-reconciliation` |
| F-1-5 | Side notes leave appointments and bookable time unchanged. | Claim `calendar-unchanged` |
| F-1-6 | Demo edits/export stay local and same-origin. | Claim `local-no-upload`; L |
| F-1-7 | Added notes retain exactly zero blocked minutes. | Claim `calendar-unchanged` |
| F-1-8 | UI, archive, privacy copy, and README use the exact retained fields. | Claim `minimal-calendar-fields` |
| F-1-9 | Linked and whole-day notes create or resize no appointments. | Claims `calendar-unchanged`, `side-note-workflow` |
| F-1-10 | Daily-brief print and text download are observable. | Claim `daily-brief` |
| F-1-11 | Backups work without purchase state. | Claim `no-purchase-required` |
| F-1-12 | One backup contains every sample appointment and side note. | Claim `backup-export` |
| F-1-13 | Restore asks first; cancel preserves and confirm replaces. | Claim `backup-restore` |
| F-1-14 | Paid phrase gating was removed; free starters name their result. | Claim `side-note-workflow`; L |
| F-1-15 | Create, complete, print, and export stay purchase-free. | Claim `no-purchase-required` |
| F-1-16 | Unavailable one-time-purchase claim remains absent. | C source audit; L crawl |
| F-1-17 | Unverified merchant claim remains absent. | C source audit; L crawl |
| F-1-18 | Unverified refund/revocation claim remains absent. | C source audit; L crawl |
| F-1-19 | Editor states and tests the calendar boundary. | Claim `calendar-unchanged` |
| F-1-20 | Reminder status requests no permission or push subscription. | Claim `no-notifications` |
| F-1-21 | Named audience appears on Home and README. | C E2E; L Home |
| F-1-22 | ICS-to-side-note workflow works without calendar mutation. | Claims `import-reconciliation`, `calendar-unchanged` |
| F-1-23 | Imported field retention is exact and plain. | Claim `minimal-calendar-fields` |
| F-1-24 | Appointment/whole-day notes, completion, and reminders are registered. | Claim `side-note-workflow` |
| F-1-25 | Direct calendar-boundary wording replaced contract jargon. | Claim `calendar-unchanged`; copy audit |
| F-1-26 | Print and download contain sample records. | Claim `daily-brief` |
| F-1-27 | Backup export and confirmed restoration are tested. | Claims `backup-export`, `backup-restore` |
| F-1-28 | PWA demo reloads and saves offline on a phone viewport. | Claim `offline-after-first-visit`; L offline Shot |
| F-1-29 | Unavailable paid offer and price remain absent. | C source audit; L crawl |
| F-1-30 | Side notes, brief, and backup are purchase-free. | Claim `no-purchase-required` |
| F-1-31 | Real and demo IndexedDB databases and keys remain separate. | Claim `demo-isolated`; L |
| F-1-32 | Account/sync/origin privacy scope is narrow and tested. | Claims `no-third-party-files`, `local-no-upload` |
| F-1-33 | “Loads no third-party files” remains tested plain wording. | Claim `no-third-party-files` |
| F-1-34 | `engines.node` declares Node 20 or newer. | C config test |
| F-1-35 | Documented `npm run build` succeeds. | C build |
| F-1-36 | Build emits `dist/index.html`. | C build |
| F-1-37 | Stale critical-shell promise remains removed. | C README audit |
| F-1-38 | Playwright remains pinned to 1.58.2. | C package/lockfile; C E2E |
| F-1-39 | Browser-install guidance is conditional and direct. | C README audit |
| F-1-40 | Dead checkout documentation/link remains absent. | C source audit; L crawl |
| F-1-41 | No embedded payment SDK or provider request is shipped. | Claim `no-third-party-files` |
| F-1-42 | Untested scheduler promise remains absent. | C README audit |
| F-1-43 | Untested recurrence promise remains absent. | C README audit |
| F-1-44 | Notification boundary has a browser-state test. | Claim `no-notifications` |
| F-1-45 | Backup-loss guidance is direct. | C README audit |
| F-1-46 | No dead paid control or link remains. | L crawl |
| F-1-47 | Demo URLs are real and unknown paths use designed HTTP 404. | C E2E; L `/demo`, unknown URL |
| F-1-48 | CSP, frame, permissions, nosniff, and referrer policies ship. | C config test; L headers |
| F-1-49 | HTML entry routes and SW are no-cache; manifest MIME and immutable assets are correct. | C config test; L headers |
| F-1-50 | Invalid backups give a recovery action. | C E2E |
| F-1-51 | App, legal, demo, and 404 metadata remain complete. | C config/E2E; L routes |
| F-1-52 | Shared nav/footer plus H1 focus work through history. | C E2E; L routes |
| F-1-53 | Landing retains three plain steps and explicit boundaries. | C copy audit; L Home |
| F-1-54 | README prose remains within 22 words per sentence. | C copy audit |
| F-1-55 | H1 names the appointment-note job. | C E2E; L Home |
| F-1-56 | “Operational details” remains absent. | C source audit |
| F-1-57 | Caption names appointments and side notes directly. | L Home Shot |
| F-1-58 | Appointment empty state gives an import action. | C E2E |
| F-1-59 | Side-note section uses the product term. | L Demo Shot |
| F-1-60 | Side-note empty state gives examples and an action. | C E2E |
| F-1-61 | Daily-brief heading names print/export. | Claim `daily-brief` |
| F-1-62 | Backup heading names backup/restore. | Claim `backup-restore` |
| F-1-63 | Cited README jargon is gone. | C copy audit |
| F-1-64 | Capacity wording stays “bookable time.” | C copy audit; Claim `calendar-unchanged` |
| F-1-65 | “Side note” is the consistent product term. | C copy audit |
| F-1-66 | Ambiguous data/license control remains absent. | C source audit; L Home |
| F-1-67 | Unused license verification control remains absent. | C source audit; L |
| F-1-68 | Visible phone targets are at least 44 px. | C E2E; L A11y |
| F-1-69 | Re-import removes missing appointments and preserves unlinked notes. | Claim `import-reconciliation` |

## Reviews 2–4

| Finding ID | Retained final change | Evidence |
| --- | --- | --- |
| F-2-1 | Demo opens with an appointment and linked note inside 390×844. | C E2E; L Demo Shot |
| F-2-2 | Compact, note, reminder, footer, and legal targets meet 44 px. | C E2E; L A11y |
| F-2-3 | Legal/history navigation restores H1 focus; footers match. | C E2E; L routes |
| F-2-4 | Legal/404 OG and Twitter metadata remain complete. | C config/E2E; L routes |
| F-2-5 | Reconciliation begins in demo and leaves real storage unchanged. | Claim `import-reconciliation` |
| F-2-6 | Full side-note workflow is registered. | Claim `side-note-workflow` |
| F-2-7 | Privacy account/sync/request/font scope is registered. | Claim `no-third-party-files` |
| F-2-8 | Third-party file/font wording is plain and tested. | Claim `no-third-party-files` |
| F-2-9 | Unsupported scheduling/recurrence claims remain absent. | C README audit |
| F-2-10 | Node 20 support remains declared. | C config test |
| F-2-11 | Cited README jargon remains replaced. | C copy audit |
| F-2-12 | Calendar/bookable-time terms remain consistent. | C copy audit; Claim `calendar-unchanged` |
| F-2-13 | Untestable “clean” wording remains absent. | C copy audit; Claim `daily-brief` |
| F-2-14 | Quick actions and reminder controls name their result. | Claim `side-note-workflow`; L Demo |
| F-3-1 | Vague “Private appointment companion” remains absent. | C config/E2E; L Home |
| F-4-1 | Sticky, opaque demo strip stays visible while editable data remains available. | Claim `demo-isolated`; C E2E; L Demo Shot |

No finding of any severity remains.
