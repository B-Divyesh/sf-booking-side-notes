# Adversarial first-read review 6 — Booking Side Notes

**Verdict: PASS**

Reviewed 2026-08-28 at repository and live build `f7f3f4a` against
<https://booking-side-notes.sociobot.in>. Fresh Chromium contexts were used at
390×844 and 1440×900. There are zero blocking findings, zero minor findings,
and no untested visitor-facing claim.

## Thirty-second cold read

Nothing was scrolled before these answers were recorded.

| Question | Phone and desktop answer | Exact first-screen evidence |
| --- | --- | --- |
| What does this do? | Keeps side notes beside appointments without changing bookable time. | “Keep side notes beside appointments” and “without changing bookable time.” |
| For whom? | Small appointment businesses that need callbacks and access details. | “For small appointment businesses that need callbacks and access details…” |
| What should I click first? | **Try it with sample data**. | The adjacent explanation says “Opens a sample day with appointments and side notes.” |

This passes at both sizes. At 390 px, the H1 ends at y=273, the audience
sentence at y=386, the sample action at y=456, and all three facts at y=645.
The real first step, **Import an .ics file**, is also visible. The page has no
horizontal overflow, failed request, or console error.

## Findings

None.

## Copy audit

Counts treat hyphenated terms, file extensions, URLs, and filenames as one
word. Data values such as dates, counts, customer names, and locations are not
authored sentences. No sentence exceeds 22 words. No banned marketing word,
unexplained jargon, inconsistent product term, contextless heading, or
result-free action was found.

### Landing and workspace prose

| Words | Exact sentence or heading | Result |
| ---: | --- | --- |
| 5 | Keep side notes beside appointments | Job H1; pass |
| 14 | For small appointment businesses that need callbacks and access details without changing bookable time. | Audience and change; pass |
| 9 | Opens a sample day with appointments and side notes. | Pass |
| 4 | Stored on this device | `local-no-upload` |
| 6 | Works offline after the first visit | `offline-after-first-visit` |
| 3 | No purchase required | `no-purchase-required` |
| 5 | Appointments stay on your calendar. | `calendar-unchanged` |
| 4 | Side notes stay here. | `local-no-upload` |
| 3 | No appointments yet | Empty-state heading; pass |
| 4 | Import an appointment day | Empty-state heading; pass |
| 5 | Choose an .ics calendar export. | Pass |
| 14 | We keep its ID, name, start and end times, and location on this device. | `minimal-calendar-fields` |
| 5 | Side notes for this day | Section label; pass |
| 2 | Side notes | Heading; pass |
| 4 | No side notes yet | Empty-state heading; pass |
| 8 | Add a callback, access detail, follow-up, or delay. | Pass |
| 11 | A side note stays beside the day without changing bookable time. | `calendar-unchanged` |
| 3 | How it works | Section label; pass |
| 7 | Keep the day clear in three steps | Heading; pass |
| 2 | Import appointments. | Step heading; pass |
| 5 | Choose an .ics calendar export. | Pass |
| 3 | Add side notes. | Step heading; pass |
| 10 | Link a callback or access detail to an appointment. | `side-note-workflow` |
| 3 | Print or export. | Step heading; pass |
| 11 | Take a plain daily brief or backup file with you. | `daily-brief`, `backup-export` |
| 2 | Your boundaries | Section label; pass |
| 6 | What this tool does not do | Heading; pass |
| 6 | It does not change your calendar. | `calendar-unchanged` |
| 5 | It does not send notifications. | `no-notifications` |
| 10 | It stores appointment details and side notes in this browser. | `local-no-upload` |
| 2 | End-of-day sheet | Section label; pass |
| 6 | Print or export the daily brief | Heading; pass |
| 9 | Print the daily brief or download a plain-text copy. | `daily-brief` |
| 2 | Local backup | Section label; pass |
| 6 | Back up or restore your data | Heading; pass |
| 9 | Export appointments and side notes as one backup file. | `backup-export` |
| 11 | Importing a backup asks before it replaces data on this device. | `backup-restore` |
| 7 | Side notes beside appointments, on this device. | Footer; `local-no-upload` |

### Demo, editor, feedback, and errors

| Words | Exact sentence or heading | Result |
| ---: | --- | --- |
| 6 | Demo — sample data, nothing is saved | Required disclosure; `demo-isolated` |
| 8 | Try edits freely in this separate sample workspace. | Pass |
| 2 | Sample workspace | Section label; pass |
| 5 | Try a sample appointment day | Demo H1; pass |
| 11 | Review one appointment and its side note, then edit anything below. | Pass |
| 1 | Appointment | Record label; pass |
| 3 | First sample appointment | Screen-reader heading; pass |
| 4 | Side note beside it | Relationship label; pass |
| 4 | First sample side note | Screen-reader heading; pass |
| 11 | This creates no calendar event and does not change bookable time. | `calendar-unchanged` |
| 13 | For example: “Call before arrival; side gate code is in the job sheet.” | Pass |
| 6 | This only shows a due status. | Pass |
| 5 | This app sends no notifications. | `no-notifications` |
| 3 | Side note saved. | Pass |
| 6 | Bookable time did not change. | `calendar-unchanged` |
| 4 | An update is ready. | Pass |
| 6 | This backup is not valid JSON. | Specific error; pass |
| 10 | Choose a Booking Side Notes backup exported by this app. | Recovery action; pass |
| 8 | This backup does not have the expected format. | Specific error; pass |
| 7 | This file is not an ICS calendar. | Specific error; pass |
| 8 | No appointments were found in this calendar file. | Specific error; pass |
| 10 | Appointments were found, but none had a readable start time. | Specific error; pass |

### Controls and labels

Each visible control either names its result or is a conventional destination
or cancellation action.

| Word count | Controls |
| --- | --- |
| 1 | Privacy; Terms; Demo; Cancel |
| 2 | Try demo; Working day; Import calendar; Quick note; Side note; Anchor time; Export backup; Import backup; Reset demo; Update app |
| 3 | Add side note; Start callback note; Start access note; Start supplier note; Start follow-up note; Print daily brief; Export daily brief; Start for real; Mark reminder due; Save side note; Beside appointment |
| 4 | Import an .ics file; Choose an .ics file; Add a side note; Mark reminder acknowledged; For the whole day |
| 5 | Try it with sample data |

Edit, Delete, and Close icon controls expose full accessible names. The
terminology is consistent: imported records are **appointments**, local work
items are **side notes**, capacity is **bookable time**, portable data is a
**backup**, and a removed appointment leaves an **unlinked side note**.

### README

| Words | Exact sentence or heading | Result |
| ---: | --- | --- |
| 3 | Booking Side Notes | H1; pass |
| 9 | Keep side notes beside appointments without changing bookable time. | `calendar-unchanged` |
| 8 | Booking Side Notes is for small appointment businesses. | Audience; pass |
| 5 | Import an `.ics` calendar file. | Pass |
| 10 | Keep callbacks, access details, delays, and follow-ups beside each appointment. | `side-note-workflow` |
| 7 | Try it immediately at the sample demo. | Pass |
| 6 | The demo uses separate local storage. | `demo-isolated` |
| 10 | Leaving it or choosing Reset demo restores the original sample. | `demo-isolated` |
| 3 | What it does | Heading; pass |
| 15 | Imports appointment ID, name, start and end times, and location from an `.ics` calendar export. | `minimal-calendar-fields` |
| 10 | Adds side notes for one appointment or the whole day. | `side-note-workflow` |
| 8 | Mark each done and set its reminder status. | `side-note-workflow` |
| 6 | Replaces an imported day after confirmation. | `import-reconciliation` |
| 10 | Side notes for missing appointments remain clearly marked as unlinked. | `import-reconciliation` |
| 11 | Prints or downloads a daily brief and exports one backup file. | `daily-brief`, `backup-export` |
| 9 | Appointment details and side notes stay in this browser. | `local-no-upload` |
| 9 | Side notes do not change appointments or bookable time. | `calendar-unchanged` |
| 8 | The app works offline after the first visit. | `offline-after-first-visit` |
| 11 | No purchase is required for side notes, daily briefs, or backups. | `no-purchase-required` |
| 8 | The app has no account or background sync. | `no-third-party-files` |
| 5 | It loads no third-party files. | `no-third-party-files` |
| 9 | Each product promise is listed and tested in `.factory/claims.json`. | Confirmed below |
| 3 | Run and test | Heading; pass |
| 10 | The package declares Node.js 20 or newer for local development. | Confirmed in `package.json` |
| 2 | Open `http://127.0.0.1:5173`. | Pass |
| 14 | `npm run build` writes the static site to `dist/`, with `dist/index.html` at its root. | Confirmed by clean build |
| 5 | Playwright is pinned to 1.58.2. | Confirmed in package and lockfile |
| 11 | If Chromium is not installed, run `npx playwright install chromium` once. | Setup instruction; pass |
| 1 | Deploy | Heading; pass |
| 10 | Deploy the contents of `dist/` to an HTTPS static host. | Pass |
| 12 | `staticwebapp.config.json` contains host settings for routes, security, caching, and the app manifest. | Confirmed by source test |
| 5 | Do not deploy source files. | Pass |
| 1 | Boundaries | Heading; pass |
| 9 | Side notes do not change appointments or bookable time. | `calendar-unchanged` |
| 6 | The app does not send notifications. | `no-notifications` |
| 9 | Export each appointment you need from your calendar. | Direct guidance; pass |
| 10 | Browser storage can be cleared, so export a backup regularly. | Direct guidance; pass |
| 4 | See Privacy and Terms. | Pass |
| 8 | Design rationale and asset provenance are in `.factory/design.md`. | Confirmed |
| 1 | License | Heading; pass |
| 3 | MIT — see `LICENSE`. | Confirmed |

## Demo and sandbox verification

- The landing action enters `/?demo=1` in one click. `/demo` also enters the
  sandbox directly.
- The first 390×844 demo screen contains the disclosure, Harbour House boiler
  visit, its location and time, and the linked “Call before arrival” note. The
  appointment ends at y=363 and the note at y=631. Desktop is likewise in use
  before scrolling.
- The banner stays at y=0 after scrolling 1,200 px. Reset demo and Start for
  real remain visible in 44 px-high controls.
- Real storage uses `booking-side-notes` / `state-v1`. Demo storage uses
  `booking-side-notes-demo` / `demo:state-v1`. A demo edit did not change the
  real record.
- Reset restored three sample notes. Wordmark, browser Back/Forward, Privacy,
  Terms, and Start for real discarded edits before the next demo entry. Start
  for real deleted the demo record. The real record remained byte-for-byte
  unchanged.
- After service-worker control, `/demo` reloaded with the network disabled,
  displayed “Offline · on device,” and saved a side note. All observed requests
  used only `https://booking-side-notes.sociobot.in`.

## Claims audit

Clean clone: `/tmp/booking-side-notes-review6.ijt0Md` at full commit
`f7f3f4a84675a8fa43bfd8a9566eb066a37aa117`. `npm ci` completed with zero
vulnerabilities. Every exact command in `.factory/claims.json` was run
independently.

| Claim ID | Result | Observable evidence |
| --- | --- | --- |
| `demo-isolated` | PASS | Separate storage, sticky disclosure, Reset, every exit path, and unchanged real data |
| `local-no-upload` | PASS | Demo edit/export requested only the product origin |
| `calendar-unchanged` | PASS | Added note left appointments and zero blocked minutes unchanged |
| `offline-after-first-visit` | PASS | Cached demo reloaded and accepted a note offline |
| `backup-export` | PASS | Download contained all three sample appointments and notes |
| `no-purchase-required` | PASS | Create, complete, print, and export worked without purchase state |
| `import-reconciliation` | PASS | Missing appointment was removed and its note remained unlinked |
| `daily-brief` | PASS | Print and text download contained the sample records |
| `backup-restore` | PASS | Cancel preserved data and confirmation replaced it |
| `minimal-calendar-fields` | PASS | Export retained only ID, name, start/end times, and location |
| `no-notifications` | PASS | Reminder state left permission and push subscription unchanged |
| `side-note-workflow` | PASS | Appointment/whole-day notes, completion, and reminder states worked |
| `no-third-party-files` | PASS | No account, sync tag, remote file, or downloaded font appeared |

No listed test failed. Landing, demo, metadata, Privacy, Terms, and README copy
were cross-checked against the registry. No claim-like sentence is unlisted.

## Quality, structure, and accessibility

- `npm test`: 11/11 passed. `npx tsc --noEmit`: passed. `npm run build`:
  passed and produced `dist/`. Product JS is 29,346 bytes raw / 9.81 kB gzip;
  CSS is 20,673 bytes raw / 5.38 kB gzip. `npm run test:e2e`: 16/16 passed.
- The deployed JS, CSS, service worker, manifest, Privacy, Terms, 404, robots,
  and sitemap files SHA-256-match the clean build. The footer identifies live
  build `f7f3f4a`.
- `/`, `/demo`, `/privacy/`, `/terms/`, `/404.html`, and an unknown path have
  the correct route-specific title, description, canonical, OG/Twitter data,
  favicon, Apple icon, `lang=en`, one H1, main landmark, skip link, header, and
  shared footer. The unknown path returns the designed page with HTTP 404.
- The social image is a real 1200×630 product asset. The sitemap lists every
  public route. Every navigational HTTP link returned 200; both mail links are
  explicit, and same-document skip fragments target `#main`.
- Home → Privacy → Terms → Back → Back focused `#page-title` after each route.
  The live route matrix had zero serious/critical Axe violations. The supplied
  `verify-url.sh` passed Home and Demo with no console errors, missing alt text,
  or unlabelled buttons.
- No visible 390 px control was below 44×44 px. Reduced-motion emulation cut
  animation and transition durations to 0.01 ms. The page did not overflow.
- Live responses include CSP with `frame-ancestors 'none'`, frame denial,
  permissions policy, nosniff, referrer policy, no-cache HTML/service worker,
  correct manifest MIME, and immutable asset caching.
- The landing order is header, complete first screen, working UI, three steps,
  explicit boundaries, brief/backup tools, and footer. There is no paid tier to
  explain.
- Survey paper, contour lines, teal appointment rails, burnt-orange note pins,
  editorial type, original map art, and the matching 404 implement the recorded
  topographic-cartography identity. It is not a generic SaaS template.

## Earlier-finding verification

Every earlier review, polish record, verification record, and handoff was read.
The deployed files match the tested source build, and each prior finding was
rechecked in the live UI and current source/tests.

| Earlier ID | Current confirmation |
| --- | --- |
| F-1-1 | Fixed — the phone hero names job, audience, action, result, and three facts. |
| F-1-2 | Fixed — the seeded demo is isolated and every tested exit discards edits. |
| F-1-3 | Fixed — 13 registry entries map to 13 unique passing browser tests. |
| F-1-4 | Fixed — replacement import is observable in the demo-backed claim. |
| F-1-5 | Fixed — side notes leave appointment records unchanged. |
| F-1-6 | Fixed — the privacy flow remained same-origin. |
| F-1-7 | Fixed — blocked minutes remained exactly zero after note creation. |
| F-1-8 | Fixed — retained-field copy, code, and exported data agree. |
| F-1-9 | Fixed — linked and whole-day notes create no appointment time. |
| F-1-10 | Fixed — print and downloaded brief contain sample records. |
| F-1-11 | Fixed — backup export requires no purchase state. |
| F-1-12 | Fixed — one backup contains every sample appointment and note. |
| F-1-13 | Fixed — restore cancel and confirmation branches pass. |
| F-1-14 | Fixed — paid phrase gating is absent; starters are free. |
| F-1-15 | Fixed — create, complete, print, and export are purchase-free. |
| F-1-16 | Fixed — the unverified purchase promise remains absent. |
| F-1-17 | Fixed — the merchant claim remains absent. |
| F-1-18 | Fixed — the refund/revocation claim remains absent. |
| F-1-19 | Fixed — the editor states and tests calendar non-mutation. |
| F-1-20 | Fixed — reminder actions leave notifications and push untouched. |
| F-1-21 | Fixed — the named audience appears on Home and in README. |
| F-1-22 | Fixed — ICS-to-side-note behavior is covered by passing claims. |
| F-1-23 | Fixed — exact imported fields agree across UI, code, policy, and export. |
| F-1-24 | Fixed — both note associations, completion, and reminders pass. |
| F-1-25 | Fixed — plain calendar-boundary wording replaces contract jargon. |
| F-1-26 | Fixed — daily-brief print and download are observable. |
| F-1-27 | Fixed — backup export and confirmed restoration pass. |
| F-1-28 | Fixed — the phone demo reloads and accepts edits offline. |
| F-1-29 | Fixed — the unavailable paid offer and price remain absent. |
| F-1-30 | Fixed — side notes, daily brief, and backup are purchase-free. |
| F-1-31 | Fixed — real and demo IndexedDB databases and keys remain separate. |
| F-1-32 | Fixed — account, sync, and request privacy scope is tested. |
| F-1-33 | Fixed — third-party file and font scope is tested. |
| F-1-34 | Fixed — `engines.node` declares Node 20 or newer. |
| F-1-35 | Fixed — the documented build command passes. |
| F-1-36 | Fixed — the build emits `dist/index.html`. |
| F-1-37 | Fixed — the stale critical-shell promise remains absent. |
| F-1-38 | Fixed — Playwright remains pinned to 1.58.2. |
| F-1-39 | Fixed — browser installation guidance is conditional and direct. |
| F-1-40 | Fixed — dead checkout documentation remains absent. |
| F-1-41 | Fixed — no payment SDK or provider request ships. |
| F-1-42 | Fixed — unsupported scheduler wording remains absent. |
| F-1-43 | Fixed — unsupported recurrence wording remains absent. |
| F-1-44 | Fixed — notification behavior has a browser-state test. |
| F-1-45 | Fixed — backup-loss guidance remains direct. |
| F-1-46 | Fixed — no paid control or dead purchase link remains. |
| F-1-47 | Fixed — demo URLs work and unknown paths return the designed HTTP 404. |
| F-1-48 | Fixed — CSP, frame, permissions, nosniff, and referrer policies are live. |
| F-1-49 | Fixed — HTML/SW cache rules, immutable assets, and manifest MIME are live. |
| F-1-50 | Fixed — invalid backups give a specific error and recovery action. |
| F-1-51 | Fixed — app, demo, legal, and 404 metadata are complete. |
| F-1-52 | Fixed — shared navigation/footer and history focus pass live. |
| F-1-53 | Fixed — the landing retains three steps and explicit boundaries. |
| F-1-54 | Fixed — no README sentence exceeds 22 words. |
| F-1-55 | Fixed — the H1 states the appointment-note job. |
| F-1-56 | Fixed — “operational details” remains absent. |
| F-1-57 | Fixed — the caption uses appointments and side notes directly. |
| F-1-58 | Fixed — the appointment empty state supplies the import action. |
| F-1-59 | Fixed — the side-note section has a plain heading. |
| F-1-60 | Fixed — the side-note empty state gives examples and an action. |
| F-1-61 | Fixed — the daily-brief heading names print/export. |
| F-1-62 | Fixed — the backup heading names backup/restore. |
| F-1-63 | Fixed — the cited README jargon remains absent. |
| F-1-64 | Fixed — capacity prose consistently uses “bookable time.” |
| F-1-65 | Fixed — the interface consistently uses “side note.” |
| F-1-66 | Fixed — the ambiguous Data & license control remains absent. |
| F-1-67 | Fixed — the unused license verification control remains absent. |
| F-1-68 | Fixed — all visible phone targets are at least 44×44 px. |
| F-1-69 | Fixed — replacement removes a missing appointment and retains its unlinked note. |
| F-2-1 | Fixed — an appointment and linked note fit in the first demo phone viewport. |
| F-2-2 | Fixed — compact, note, reminder, footer, and legal targets meet 44 px. |
| F-2-3 | Fixed — legal/history navigation restores H1 focus and footers match. |
| F-2-4 | Fixed — static legal and 404 OG/Twitter metadata is complete. |
| F-2-5 | Fixed — reconciliation starts in demo and leaves real storage absent. |
| F-2-6 | Fixed — the complete side-note workflow is registered and passes. |
| F-2-7 | Fixed — privacy account/sync/request/font scope is registered. |
| F-2-8 | Fixed — third-party file/font wording is plain and tested. |
| F-2-9 | Fixed — unsupported scheduling and recurrence promises remain absent. |
| F-2-10 | Fixed — Node 20 support remains declared and the clean gates pass. |
| F-2-11 | Fixed — cited README jargon remains replaced. |
| F-2-12 | Fixed — calendar and bookable-time terminology remains consistent. |
| F-2-13 | Fixed — untestable “clean” wording remains absent. |
| F-2-14 | Fixed — quick actions and reminder controls name their result. |
| F-3-1 | Fixed — “Private appointment companion” remains absent. |
| F-4-1 | Fixed — the opaque demo strip remains visible above editable data after scrolling. |
| F-5-1 | Fixed — wordmark, Back/Forward, Privacy, Terms, and Start for real all discard demo edits. |
| F-5-2 | Fixed — README says “Export each appointment you need from your calendar.” |

No earlier finding is reopened.

## Missed leverage and AI check

No missing obvious feature was found. ICS import, daily-brief export, complete
backup export/restore, import reconciliation, and offline use cover the brief’s
expected leverage. Background sync would conflict with the local-first privacy
constraint. AI drafting would require sending appointment/client text and does
not complete a missing step in the core job, so omitting it is appropriate.
There is no decorative AI surface or embedded provider key.

## What would make this perfect

Nothing was identified. At reviewed build `f7f3f4a`, the first read, demo,
sandbox, claims, core workflow, copy, routing, accessibility, privacy,
documentation, and visual identity all meet the supplied zero-findings bar.
