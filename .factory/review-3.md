# Adversarial first-read review 3 — Booking Side Notes

**Verdict: FAIL**

Reviewed 2026-08-28 at deployed commit `0cadc1a50e9ef6aa09230231c5a5cb381e8fc2ce` against <https://booking-side-notes.sociobot.in>. The first-read flow, demo sandbox, registered claims, routes, and earlier repairs were rechecked from scratch. One minor, unlisted privacy/marketing phrase remains; this review must therefore fail under the zero-findings standard.

## Thirty-second cold read

Fresh Chromium contexts at 390×844 and 1440×1000 were opened without scrolling.

| Question | Answer from the first screen | Exact evidence |
| --- | --- | --- |
| What does it do? | It keeps follow-up and access notes beside appointments, without changing bookable time. | “Keep side notes beside appointments” and “without changing bookable time.” |
| For whom? | Small appointment businesses that need callbacks and access details. | “For small appointment businesses that need callbacks and access details…” |
| What should I click first? | Try the sample day. | “Try it with sample data” and “Opens a sample day with appointments and side notes.” |

This passes at both sizes. At 390 px the three facts—“Stored on this device,” “Works offline after the first visit,” and “No purchase required”—are also visible before scrolling. There was no horizontal overflow or console error.

## Finding

### F-3-1 — “Private” is an unlisted, vague privacy claim

**Severity:** minor

**Location/quote:** landing hero eyebrow: “Private appointment companion.”

**Why this needs correction:** “Private” is a visitor-facing privacy adjective but does not say what is private or how. The registered `local-no-upload` claim proves the narrower statement that appointment details and side notes stay in this browser and that demo requests are same-origin; it does not define or test the broad adjective “private.” The phrase also adds no first-read information beyond the following, clearer copy.

**Concrete fix:** remove the eyebrow, or replace it with “Appointment notes stored on this device” and include that exact location in `local-no-upload` in `.factory/claims.json`. The existing same-origin/local-storage test can then be kept as the observable test.

## Full copy audit

Counts treat hyphenated terms, `.ics`, URLs, and quoted examples as one word. “Sentence” includes standalone labels and headings where a screen-reader visitor encounters them; code blocks and filenames are excluded. No entry exceeds 22 words and none contains a supplied banned marketing word. `F-3-1` is the only flag.

### Landing page

| Ref | Words | Exact text | Result |
| --- | ---: | --- | --- |
| L1 | 3 | Private appointment companion | F-3-1 |
| L2 | 5 | Keep side notes beside appointments | Pass |
| L3 | 14 | For small appointment businesses that need callbacks and access details without changing bookable time. | Pass |
| L4 | 6 | Try it with sample data | Pass — result-naming action |
| L5 | 9 | Opens a sample day with appointments and side notes. | `demo-isolated` |
| L6 | 4 / 4 / 6 / 3 | Import an .ics file / Stored on this device / Works offline after the first visit / No purchase required | Pass; registered claims where applicable |
| L7 | 5 / 4 | Appointments stay on your calendar. / Side notes stay here. | `calendar-unchanged` / `local-no-upload` |
| L8 | 2 / 2 / 3 / 2 | Working day / Import calendar / Add side note / minutes blocked | Pass; controls name their result |
| L9 | 4 / 4 | by 0 side notes / 0 open side notes | `calendar-unchanged` |
| L10 | 1 / 3 / 4 | Appointments / No appointments yet / Import an appointment day | Pass |
| L11 | 5 / 14 | Choose an .ics calendar export. / We keep its ID, name, start and end times, and location on this device. | `minimal-calendar-fields` |
| L12 | 5 / 2 / 2 | Side notes for this day / Side notes / Quick note | Pass |
| L13 | 3 / 3 / 3 / 3 | Start callback note / Start access note / Start supplier note / Start follow-up note | Pass — result-naming actions |
| L14 | 4 / 8 / 11 | No side notes yet / Add a callback, access detail, follow-up, or delay. / A side note stays beside the day without changing bookable time. | `side-note-workflow`; `calendar-unchanged` |
| L15 | 3 / 7 | How it works / Keep the day clear in three steps | Pass |
| L16 | 2 / 5 | Import appointments. / Choose an .ics calendar export. | Pass |
| L17 | 3 / 10 | Add side notes. / Link a callback or access detail to an appointment. | `side-note-workflow` |
| L18 | 3 / 11 | Print or export. / Take a plain daily brief or backup file with you. | `daily-brief`; `backup-export` |
| L19 | 2 / 6 | Your boundaries / What this tool does not do | Pass |
| L20 | 6 / 5 / 10 | It does not change your calendar. / It does not send notifications. / It stores appointment details and side notes in this browser. | `calendar-unchanged`; `no-notifications`; `local-no-upload` |
| L21 | 2 / 6 / 9 | End-of-day sheet / Print or export the daily brief / Print the daily brief or download a plain-text copy. | `daily-brief` |
| L22 | 2 / 6 / 9 / 11 | Local backup / Back up or restore your data / Export appointments and side notes as one backup file. / Importing a backup asks before it replaces data on this device. | `backup-export`; `backup-restore` |
| L23 | 7 | Side notes beside appointments, on this device. | `local-no-upload` |
| L24 | 1 / 1 / 1 / 5 | Demo / Privacy / Terms / Built by Param Factory · build 0cadc1a | Pass |

The hidden note editor was also checked: “This creates no calendar event and does not change bookable time.” (11), the example (13), the notification explanation (6 and 5), and all Add/Save/Cancel/Mark/Edit/Delete labels are plain and result-naming. The icon buttons expose “Edit …” and “Delete …” accessible names.

### README

| Ref | Words | Exact text | Result |
| --- | ---: | --- | --- |
| R1 | 3 | Booking Side Notes | Pass |
| R2 | 9 | Keep side notes beside appointments without changing bookable time. | `calendar-unchanged` |
| R3 | 8 | Booking Side Notes is for small appointment businesses. | Pass |
| R4 | 5 / 10 | Import an .ics calendar file. / Keep callbacks, access details, delays, and follow-ups beside each appointment. | `import-reconciliation`; `side-note-workflow` |
| R5 | 7 | Try it immediately at the sample demo. | Pass |
| R6 | 12 | The demo uses separate local storage and resets to its original sample. | `demo-isolated` |
| R7 | 3 | What it does | Pass |
| R8 | 15 | Imports appointment ID, name, start and end times, and location from an .ics calendar export. | `minimal-calendar-fields` |
| R9 | 10 / 8 | Adds side notes for one appointment or the whole day. / Mark each done and set its reminder status. | `side-note-workflow` |
| R10 | 6 / 10 | Replaces an imported day after confirmation. / Side notes for missing appointments remain clearly marked as unlinked. | `import-reconciliation` |
| R11 | 10 | Prints or downloads a daily brief and exports one backup file. | `daily-brief`; `backup-export` |
| R12 | 9 / 9 / 8 / 11 | Appointment details and side notes stay in this browser. / Side notes do not change appointments or bookable time. / The app works offline after the first visit. / No purchase is required for side notes, daily briefs, or backups. | Registered claims |
| R13 | 9 / 7 | The app has no account or background sync. / It loads no third-party files. | `no-third-party-files` |
| R14 | 10 | Each product promise is listed and tested in `.factory/claims.json`. | Confirmed for all product promises above |
| R15 | 3 | Run and test | Pass |
| R16 | 10 | The package declares Node.js 20 or newer for local development. | Developer documentation; `engines.node` confirms it |
| R17 | 2 | Open http://127.0.0.1:5173. | Pass |
| R18 | 14 | npm run build writes the static site to `dist/`, with `dist/index.html` at its root. | Confirmed by build |
| R19 | 5 / 12 | Playwright is pinned to 1.58.2. / If Chromium is not installed, run npx playwright install chromium once. | Confirmed setup documentation |
| R20 | 1 / 10 | Deploy / Deploy the contents of `dist/` to an HTTPS static host. | Pass |
| R21 | 11 | `staticwebapp.config.json` contains host settings for routes, security, caching, and the app manifest. | Confirmed by source/build |
| R22 | 5 | Do not deploy source files. | Pass |
| R23 | 1 / 9 | Boundaries / Side notes do not change appointments or bookable time. | `calendar-unchanged` |
| R24 | 6 / 9 | The app does not send notifications. / Export the appointment instances you need from your calendar. | `no-notifications`; clear guidance |
| R25 | 9 | Browser storage can be cleared, so export a backup regularly. | Clear guidance |
| R26 | 4 / 8 | See Privacy and Terms. / Design rationale and asset provenance are in `.factory/design.md`. | Pass |
| R27 | 1 / 3 | License / MIT — see LICENSE. | Pass |

Terminology is consistent: **appointment**, **side note**, **bookable time**, **does not change your calendar**, **backup**, **for the whole day**, and **unlinked side note**. No landing/README button is “Submit,” “Go,” or similarly result-free.

## Demo and sandbox verification

The landing’s one-click `Try it with sample data` action opens `/?demo=1`. The first 390×844 screen includes the persistent “Demo — sample data, nothing is saved” banner, Reset demo, Start for real, Harbour House boiler visit, and its realistic linked note. The desktop demo likewise opens in use.

In a fresh live context, I created a real note, entered demo, and confirmed it was absent while the real and demo IndexedDB databases were distinct. I created `REVIEW3 DEMO NOTE`, reset the demo, and confirmed the edit disappeared while the shipped sample returned. Start for real removed `booking-side-notes-demo` and restored the saved real note. After service-worker control, `context.setOffline(true)` plus reload retained the banner, sample appointment, and “Offline · on device.” Runtime requests remained solely at `https://booking-side-notes.sociobot.in`.

## Claims execution

Fresh GitHub clone: `/tmp/booking-side-notes-review3.SFrI58`, commit `0cadc1a50e9ef6aa09230231c5a5cb381e8fc2ce`; `npm ci` completed with 0 vulnerabilities. Every exact command listed in `.factory/claims.json` passed independently:

| Claim ID | Result |
| --- | --- |
| `demo-isolated` | PASS |
| `local-no-upload` | PASS |
| `calendar-unchanged` | PASS |
| `offline-after-first-visit` | PASS |
| `backup-export` | PASS |
| `no-purchase-required` | PASS |
| `import-reconciliation` | PASS |
| `daily-brief` | PASS |
| `backup-restore` | PASS |
| `minimal-calendar-fields` | PASS |
| `no-notifications` | PASS |
| `side-note-workflow` | PASS |
| `no-third-party-files` | PASS |

The clean clone also passed `npm test` (9 tests), `npx tsc --noEmit`, `npm run build` (with `dist/index.html`), and `npm run test:e2e` (16 tests). The only unlisted claim-like wording is F-3-1.

## Structure, accessibility, and identity

`/`, `/?demo=1`, `/demo`, `/privacy/`, `/terms/`, `/404.html`, and an unknown path were checked live. The first six return 200; the unknown path returns a designed HTML 404 with HTTP 404. All have `lang=en`, exactly one meaningful H1, a main landmark, description, canonical, complete OG/Twitter fields, favicon, Apple touch icon, and the shared footer with Demo/Privacy/Terms/build ID. Titles are respectively product/job, Demo/Product, Privacy/Product, Terms/Product, and Page-not-found/Product.

All 12 discovered link destinations were crawled: same-origin destinations returned 200 and the two mail links are explicit. The tested Home → Privacy → Terms → Back → Back sequence moved focus to the H1 at every route restoration. The full E2E suite also found zero serious/critical Axe issues and verified 44 px interactive targets at 390 px.

The warm map-paper field sheet, contour-line treatment, teal appointment rails, orange annotation pins, editorial serif/sans pairing, original topographic hero art, and styled 404 match `.factory/design.md`. This is distinct from a generic SaaS template. The landing order is header, clear first screen, working UI, three-step explanation, boundaries, backup/brief actions, and footer.

## Missed leverage

No missing AI feature is found. The brief calls for a local-first companion for operational notes; optional AI drafting would require sending appointment/client text and does not make the core import-note-brief job more complete. ICS import, backup export/restore, daily brief export, and offline use are present. Background sync would conflict with the stated local-first/privacy constraint.

## Earlier-finding verification

All earlier review, polish, and handoff files were read. The following matrix records a fresh live/code confirmation for every prior finding; no earlier ID is reopened.

| Earlier ID(s) | Status | Fresh confirmation |
| --- | --- | --- |
| F-1-1 | Fixed | Home phone first screen answers job, audience, and first action. |
| F-1-2 | Fixed | In-use isolated demo fits an appointment and linked note in the first phone viewport. |
| F-1-3 | Fixed | Registry has 13 unique tagged demo tests; all were rerun independently. |
| F-1-4, F-1-69 | Fixed | ICS replacement and preserved unlinked notes pass `import-reconciliation`. |
| F-1-5, F-1-7, F-1-9, F-1-19 | Fixed | Note creation retains appointments and zero blocked minutes. |
| F-1-6, F-1-31, F-1-32 | Fixed | Separate databases and same-origin demo requests verified live and by claims. |
| F-1-8, F-1-23 | Fixed | Retained field copy and exported-field assertion agree. |
| F-1-10, F-1-26, F-1-61 | Fixed | Daily brief print/download is tested and plainly named. |
| F-1-11, F-1-15, F-1-30 | Fixed | Complete core workflow is purchase-free. |
| F-1-12, F-1-13, F-1-27, F-1-62 | Fixed | Backup export and confirmed restore are tested and plainly named. |
| F-1-14, F-1-16, F-1-17, F-1-18, F-1-29, F-1-40, F-1-41, F-1-46, F-1-66, F-1-67 | Fixed | No paid/license/checkout surface, provider, or dead purchase link remains. |
| F-1-20, F-1-44 | Fixed | Reminder status leaves notification permission and push state untouched. |
| F-1-21, F-1-54, F-1-55, F-1-56, F-1-57 | Fixed | Audience, short job H1, and direct appointment/side-note copy are live. |
| F-1-22, F-1-24 | Fixed | Appointment/whole-day note workflow, completion, and reminder states pass. |
| F-1-25, F-1-64, F-1-65 | Fixed | Copy audit confirms calendar/bookable-time/side-note terminology. |
| F-1-28, F-1-68 | Fixed | Offline demo reload and 390 px target geometry pass. |
| F-1-33, F-1-34, F-1-35, F-1-36, F-1-37, F-1-38, F-1-39 | Fixed | Node 20 engine, self-hosted files, current docs, build output, and pinned Playwright were confirmed. |
| F-1-42, F-1-43, F-1-45 | Fixed | README has only the tested calendar/notification boundaries and clear backup guidance. |
| F-1-47, F-1-50, F-1-51, F-1-52, F-1-53 | Fixed | Designed 404, recovery errors, metadata, shared navigation/history focus, and three-step landing structure pass. |
| F-1-48, F-1-49 | Fixed | Static-host policy/cache/manifest configuration is present and live resources respond correctly. |
| F-1-58, F-1-59, F-1-60 | Fixed | Appointment and side-note empty states use direct, actionable wording. |
| F-1-63 | Fixed | README has no cited implementation jargon. |
| F-2-1 | Fixed | Demo first view is populated at 390 px. |
| F-2-2 | Fixed | Geometry test finds no visible target below 44×44 px. |
| F-2-3 | Fixed | Shared footer and H1 focus work through full history restoration. |
| F-2-4 | Fixed | OG/Twitter matrix is complete for legal and 404 routes. |
| F-2-5 | Fixed | Reconciliation begins in demo and asserts real DB absence. |
| F-2-6 | Fixed | `side-note-workflow` covers both associations, completion, and reminder states. |
| F-2-7, F-2-8 | Fixed | Account/background-sync/font/request scope is registered and tested. |
| F-2-9 | Fixed | Untested scheduling/recurrence promises are removed. |
| F-2-10 | Fixed | `engines.node` declares `>=20`; clean-clone gates pass. |
| F-2-11, F-2-12 | Fixed | Plain copy and terminology table are consistent. |
| F-2-13 | Fixed | “clean” was removed from daily-brief copy. |
| F-2-14 | Fixed | Quick actions and reminder buttons now name their resulting UI action. |

## What would make this perfect

Remove or narrow the single vague “Private appointment companion” eyebrow as specified in F-3-1, then rerun the existing local/privacy claim test and full copy audit. No product-function, demo, claim-test, routing, accessibility, or visual-identity change is otherwise indicated by this round.
