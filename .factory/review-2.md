# Adversarial first-read review 2 — Booking Side Notes

**Verdict: FAIL**

Reviewed 2026-08-28 at commit `2db913529c0c7e82662758a884990132c6fdec5b` against <https://booking-side-notes.sociobot.in>. The deployed HTML, service worker, manifest, legal/404 pages, JS, and CSS byte-match a clean build. The first read is clear, the storage sandbox is isolated, and all listed claim commands pass, but blocking findings remain.

## Thirty-second cold read

Fresh Chromium contexts were opened at 390×844 and 1440×1000 without scrolling.

| Question | Answer in my own words | Exact first-screen evidence |
| --- | --- | --- |
| What does it do? | Keeps operational side notes beside appointments without consuming capacity. | “Keep side notes beside appointments”; “without changing bookable time.” |
| For whom? | Small appointment businesses that need callbacks and access details. | “For small appointment businesses…” |
| What should I click first? | Try the safe sample. | “Try it with sample data”; “Opens a sample day with appointments and side notes.” |

This check passes at both sizes. The phone also shows “Stored on this device,” “Works offline after the first visit,” and “No purchase required.” There was no overflow or console error.

## Blocking findings

### F-2-1 / F-1-2 (reopened) — the first demo screen does not show the product in use

**Location/quote:** live `/demo` at 390×844 shows “Demo — sample data, nothing is saved,” then repeats the landing hero and another “Try it with sample data.” The first sample appointment, “Harbour House boiler visit,” starts at y=1309.

**Why:** the sandbox is seeded, but a phone visitor must scroll 465 px past the viewport before seeing any sample record. This fails the required immediate used-state demo.

**Fix:** open `/demo` at the populated workspace. Keep the banner, place one appointment and one linked note inside the initial 844 px, remove/collapse the repeated hero and self-link, and add a viewport-intersection test.

### F-2-2 / F-1-68 (reopened) — touch targets remain below 44×44 px

**Location:** live demo phone measurements: demo controls and appointment “Add side note” buttons are 40 px high; quick-note buttons 36 px; reminder buttons 28 px; footer links are 35–43 px wide. Source confirms these values in `.button.compact`, `.quick-strip button`, and `.reminder-status`.

**Why:** these controls fail the explicit mobile target baseline; the earlier finding was only partly fixed.

**Fix:** give every visible interactive element a 44×44 px hit box and add a 390 px geometry assertion.

### F-2-3 / F-1-52 (reopened) — route focus and shared footers remain incomplete

**Location:** after Home → Privacy → Terms → Back → Back, live focus is `BODY`, not the home H1. Privacy and Terms footers each omit one legal link and the build ID; the 404 footer also omits the build ID.

**Why:** keyboard/screen-reader users lose the destination heading, and the required consistent footer is not shared across routes.

**Fix:** focus/announce the H1 after every navigation and history restoration. Put the one-liner, Privacy, Terms, factory credit, and build ID in every footer; test the full back sequence.

### F-2-4 / F-1-51 (reopened) — static-route metadata is incomplete

**Location:** `public/privacy/index.html`, `public/terms/index.html`, and `public/404.html` have only `twitter:card`; they omit `twitter:title`, `twitter:description`, `twitter:image`, and `og:type`.

**Why:** the prior metadata repair covered the app shell but not every route.

**Fix:** add the missing fields and assert the complete metadata matrix for each built route.

### F-2-5 / F-1-3 (reopened) — a claim test bypasses the demo sandbox

**Location:** `@claim:import-reconciliation` starts with `page.goto('/')` and writes the real `booking-side-notes` database. Its registry sandbox says only “Fresh context.”

**Why:** the command passes, but the claims contract requires verification through the demo entry point and namespace.

**Fix:** start through `/demo`, perform both imports there, assert real storage is unchanged, and name the demo namespace in `claims.json`.

### F-2-6 / F-1-24 (reopened) — the complete side-note workflow is unlisted

**Quote:** README: “Adds appointment-linked or day-level side notes with completion and reminder status.”

**Why:** no claim entry/test proves both association modes, completion, and both reminder states. “Each of these promises is listed and tested” is therefore inaccurate.

**Fix:** add one `side-note-workflow` demo test covering all four outcomes, or narrow the sentence to registered behavior.

### F-2-7 / F-1-32 (reopened) — the privacy page has an unlisted compound claim

**Quote:** “The app has no account, analytics, advertising, background sync, or third-party fonts.”

**Why:** `local-no-upload` checks origins during one path; it does not inventory this five-part claim or assert account UI/background-sync absence.

**Fix:** add a scoped entry/test for UI, registrations, request origins, and computed fonts, or retain only the narrower tested same-origin statement.

### F-2-8 / F-1-33 (reopened) — the README repeats an unlisted runtime claim

**Quote:** “The project uses system fonts and has no runtime CDN dependencies.”

**Why:** readers can rely on this privacy/runtime promise, but it has no claim entry; “runtime CDN dependencies” is jargon.

**Fix:** register/test “The app loads no third-party files,” including request origins and font sources, and use that wording in README and Privacy.

### F-2-9 / F-1-42 and F-1-43 (reopened) — README boundaries are only partly registered

**Quote:** “This tool does not schedule appointments, change calendar availability, send notifications, or expand recurring calendar rules.”

**Why:** calendar mutation and notifications are listed; scheduling and recurrence expansion are not.

**Fix:** split the sentence. Add tagged demo fixtures for the two missing boundaries or remove those clauses.

### F-2-10 / F-1-34 (reopened) — Node 20 support lacks Node 20 evidence

**Quote:** “Use Node.js 20 or newer for local development.”

**Why:** `package.json` has no `engines` field or version matrix, and this review ran on Node 22.23.2.

**Fix:** declare `engines.node: ">=20"` and run gates on Node 20, or state the exact tested version.

### F-2-11 / F-1-63 (reopened) — README jargon remains

**Quotes:** “appointment-linked,” “day-level,” “JSON backup file,” “runtime CDN dependencies,” and “manifest MIME type.”

**Why:** the README still makes an appointment-business reader translate implementation terms.

**Fix:** use “for one appointment or the whole day,” “one backup file,” “loads no third-party files,” and “host settings for routes, security, caching, and the app manifest.”

### F-2-12 / F-1-64 (reopened) — the capacity concept still has four names

**Locations:** landing/README use “bookable time,” “appointment time,” “calendar availability,” and “minutes blocked.”

**Why:** the core distinction is less stable than the earlier required terminology.

**Fix:** use “bookable time” in prose and “does not change your calendar” for the boundary. Reserve “0 minutes blocked” for the measured status.

## Minor findings

### F-2-13 — “clean” is untestable copy

**Quote:** “Print a clean daily brief or download a plain-text copy.” The test proves print/download content, not “clean.”

**Fix:** “Print the daily brief or download a plain-text copy.”

### F-2-14 — state/phrase controls do not name their UI result

**Controls:** “Call back,” “Confirm access details,” “Check supplier timing,” and “Send follow-up” only open a prefilled editor; “Reminder due” and “Reminder acknowledged” toggle state without naming the action.

**Why:** the first group sounds as though it performs the real-world action; the second group exposes state instead of result.

**Fix:** use “Start callback/access/supplier/follow-up note.” Show reminder state as text and label the button “Mark reminder acknowledged/due.”

## Full copy audit

Counts treat hyphenated terms, extensions, and URLs as one word. Repeated identical nav labels are listed once. No sentence exceeds 22 words and no supplied banned word appears. Flags refer to findings above; unmarked entries pass.

### Landing and demo

| Ref | Words | Exact sentence or standalone text | Flag |
|---|---:|---|---|
| L1 | 3 | Private appointment companion | — |
| L2 | 5 | Keep side notes beside appointments | — |
| L3 | 14 | For small appointment businesses that need callbacks and access details without changing bookable time. | — |
| L4 | 9 | Opens a sample day with appointments and side notes. | F-2-1 |
| L5–L7 | 4 / 6 / 3 | Stored on this device / Works offline after the first visit / No purchase required | listed claims |
| L8–L9 | 4 / 5 | Appointments keep their time. / Side notes sit beside them. | F-2-12 on L8 |
| L10–L13 | 2 / 2 / 4 / 4 | Working day / minutes blocked / by 0 side notes / 0 open side notes | — |
| L14–L16 | 3 / 4 / 5 | No appointments yet / Import an appointment day / Choose an .ics calendar export. | — |
| L17 | 14 | We keep its ID, name, start and end times, and location on this device. | listed claim |
| L18–L21 | 5 / 2 / 2 / 4 | Side notes for this day / Side notes / Quick note / No side notes yet | — |
| L22 | 8 | Add a callback, access detail, follow-up, or delay. | — |
| L23 | 13 | A side note stays beside the day and does not block appointment time. | F-2-12 |
| L24–L25 | 3 / 7 | How it works / Keep the day clear in three steps | — |
| L26–L27 | 2 / 5 | Import appointments. / Choose an .ics calendar export. | — |
| L28–L29 | 3 / 9 | Add side notes. / Link a callback or access detail to an appointment. | — |
| L30–L31 | 3 / 10 | Print or export. / Take a plain daily brief or backup file with you. | — |
| L32–L33 | 2 / 6 | Your boundaries / What this tool does not do | — |
| L34–L36 | 9 / 5 / 10 | It does not change your calendar or bookable time. / It does not send notifications. / It stores appointment details and side notes in this browser. | listed claims |
| L37–L38 | 2 / 6 | End-of-day sheet / Print or export the daily brief | — |
| L39 | 10 | Print a clean daily brief or download a plain-text copy. | F-2-13 |
| L40–L41 | 2 / 6 | Local backup / Back up or restore your data | — |
| L42–L43 | 9 / 11 | Export appointments and side notes as one backup file. / Importing a backup asks before it replaces data on this device. | listed claims |
| L44 | 7 | Side notes beside appointments, on this device. | — |
| L45 | 10 | This creates no calendar event and blocks no appointment time. | F-2-12 |
| L46 | 13 | For example: “Call before arrival; side gate code is in the job sheet.” | — |
| L47–L50 | 3 / 3 / 6 / 5 | General day note / Mark reminder due / This only shows a due status. / This app sends no notifications. | F-2-11 on L47 |
| L51 | 4 | An update is ready. | — |
| L52–L53 | 6 / 8 | Demo — sample data, nothing is saved / Try edits freely in this separate sample workspace. | sandbox verified |

Control audit: Try demo, Try it with sample data, all Import/Add/Save/Print/Export/Reset/Start/Update controls, Cancel, and Close/Edit/Delete accessible names use result verbs. Quick-phrase and reminder controls fail F-2-14. Compact controls also fail F-2-2.

### README

| Ref | Words | Exact sentence or standalone text | Flag |
|---|---:|---|---|
| R1–R3 | 3 / 9 / 8 | Booking Side Notes / Keep side notes beside appointments without changing bookable time. / Booking Side Notes is for small appointment businesses. | — |
| R4 | 16 | Import an .ics calendar file, then keep callbacks, access details, delays, and follow-ups beside the appointment. | — |
| R5 | 12 | The app is a browser tool, not a calendar or customer database. | — |
| R6–R7 | 7 / 14 | Try it immediately at the sample demo. / The demo has a separate local database and can be reset at any time. | listed demo claim |
| R8 | 3 | What it does | — |
| R9 | 15 | Imports appointment ID, name, start and end times, and location from an .ics calendar export. | listed claim |
| R10 | 11 | Adds appointment-linked or day-level side notes with completion and reminder status. | F-2-6, F-2-11 |
| R11–R12 | 6 / 11 | Replaces an imported day after confirmation. / Side notes for missing appointments remain as clearly marked unlinked notes. | listed claim |
| R13 | 12 | Prints or downloads a daily brief and exports one JSON backup file. | F-2-11; capabilities listed |
| R14 | 9 | Appointment details and side notes stay in this browser. | listed claim |
| R15 | 10 | Side notes do not change appointments or block appointment time. | F-2-12; behavior listed |
| R16–R17 | 8 / 11 | The app works offline after the first visit. / No purchase is required for side notes, daily briefs, or backups. | listed claims |
| R18 | 10 | Each of these promises is listed and tested in .factory/claims.json. | false while F-2-6–F-2-9 remain |
| R19 | 3 | Run and test | — |
| R20 | 8 | Use Node.js 20 or newer for local development. | F-2-10 |
| R21 | 2 | Open http://127.0.0.1:5173. | — |
| R22 | 11 | The project uses system fonts and has no runtime CDN dependencies. | F-2-8, F-2-11 |
| R23 | 14 | npm run build writes the static site to dist/, with dist/index.html at its root. | verified |
| R24–R25 | 5 / 12 | Playwright is pinned to 1.58.2. / If Chromium is not already installed, run npx playwright install chromium once. | verified / clear setup |
| R26 | 1 | Deploy | — |
| R27 | 10 | Deploy the contents of dist/ to an HTTPS static host. | — |
| R28 | 14 | The repository includes staticwebapp.config.json for routing, security headers, cache policy, and manifest MIME type. | F-2-11 |
| R29–R30 | 5 / 1 | Do not deploy source files. / Boundaries | — |
| R31 | 16 | This tool does not schedule appointments, change calendar availability, send notifications, or expand recurring calendar rules. | F-2-9, F-2-12 |
| R32–R33 | 9 / 10 | Export the appointment instances you need from your calendar. / Browser storage can be cleared, so export a backup regularly. | — |
| R34–R37 | 4 / 8 / 1 / 3 | See Privacy and Terms. / Design rationale and asset provenance are in .factory/design.md. / License / MIT — see LICENSE. | — |

Terminology: imported records consistently use **appointment**; operational items use **side note** except “general day note/day-level”; capacity incorrectly varies as **bookable time / appointment time / calendar availability / minutes blocked**; portable data varies as **backup / JSON / archive**. See F-2-11 and F-2-12.

## Demo and sandbox evidence

In a fresh live context I created `REAL REVIEW 2 NOTE` on `/`, entered `/demo`, and saw 3 appointments and 3 notes with no real note. A demo edit persisted only in `booking-side-notes-demo`; Reset removed it and restored 3/3. Start for real deleted that database and restored the unchanged real note. `/?demo=1` also seeded the sample. Requests stayed on `https://booking-side-notes.sociobot.in`.

After service-worker control, an intercepted offline reload retained the banner, all three appointments, “Offline · on device,” and local editing. Isolation passes; first-viewport presentation fails F-2-1. No runtime AI endpoint, provider key, analytics, or third-party request was observed.

## Claim execution

Clean GitHub clone: `/tmp/booking-review2-clean.mnEQiP`, exact reviewed commit. Every ID has exactly one tag.

| Claim | Result/evidence |
|---|---|
| `demo-isolated` | PASS — real note hidden/unchanged; demo reset; real mode restored |
| `local-no-upload` | PASS — create/export requests stayed same-origin |
| `calendar-unchanged` | PASS — event count and zero-blocked state unchanged |
| `offline-after-first-visit` | PASS — offline demo reload/save at 390 px |
| `backup-export` | PASS — 3 appointments and 3 notes downloaded |
| `no-purchase-required` | PASS — create, complete, and brief export without purchase UI |
| `import-reconciliation` | PASS command, invalid sandbox — starts at `/`; F-2-5 |
| `daily-brief` | PASS — print and text download contain sample data |
| `backup-restore` | PASS — cancel preserved; confirm replaced |
| `minimal-calendar-fields` | PASS — exact retained field set |
| `no-notifications` | PASS — permission unchanged; no push subscription |

Unlisted claims are recorded in F-2-6 through F-2-9. No listed command failed.

## Structure, accessibility, and identity

Home/demo titles, `lang`, one H1, main, descriptions, canonicals, favicon, 180 px Apple icon, and 1200×630 original social image pass. Privacy/Terms titles follow the required pattern. Unknown routes return a styled HTTP 404. All crawled internal links/assets returned 200; mail links were explicit. The sitemap lists all four public routes.

The live verification script passed with zero console errors, one H1, main, alt coverage, and labeled buttons. Playwright Axe found zero violations on home, demo, Privacy, Terms, and 404. Focus rings, reduced-motion CSS, contrast, and 390 px overflow pass; target geometry and history focus fail F-2-2/F-2-3.

The topographic paper, contour lines, teal appointment rails, orange pins, editorial art, and serif/sans pairing match `.factory/design.md` and are recognizably product-specific. This is not a generic SaaS template. The landing skeleton contains the header, clear first screen, workspace, three steps, boundaries, and footer.

## Earlier-finding verification

Every finding in review 1 and every disposition in polish 1, the earlier verification, and handoff was checked against both the matching live build and current source. “Fixed” below means the replacement copy/behavior exists live and its source/test evidence was rechecked.

| Earlier ID | Status | Confirmation |
|---|---|---|
| F-1-1 | Fixed | Complete phone first screen |
| F-1-2 | **Reopened: F-2-1** | Isolated demo exists; used state remains below fold |
| F-1-3 | **Reopened: F-2-5** | Registry passes; one test bypasses demo |
| F-1-4 | Fixed | Narrow import/reconciliation copy and test |
| F-1-5 | Fixed | Calendar boundary/test |
| F-1-6 | Fixed | Local copy and origin capture |
| F-1-7 | Fixed | Zero-blocked state after add |
| F-1-8 | Fixed | Exact fields copy/test |
| F-1-9 | Fixed | Note does not alter events |
| F-1-10 | Fixed | Print/download test |
| F-1-11 | Fixed | No-purchase flow |
| F-1-12 | Fixed | Complete sample backup |
| F-1-13 | Fixed | Restore cancel/confirm |
| F-1-14 | Fixed | Paid claim removed; phrases free |
| F-1-15 | Fixed | Free workflow test |
| F-1-16 | Fixed | Purchase copy removed |
| F-1-17 | Fixed | Merchant copy removed |
| F-1-18 | Fixed | Refund copy removed |
| F-1-19 | Fixed | Dialog boundary/event preservation |
| F-1-20 | Fixed | Permission/push test |
| F-1-21 | Fixed | Audience visible; local claim listed |
| F-1-22 | Fixed | Import workflow works live |
| F-1-23 | Fixed | Exact retained fields agree |
| F-1-24 | **Reopened: F-2-6** | Compound workflow still unlisted |
| F-1-25 | Fixed | Plain calendar boundary |
| F-1-26 | Fixed | Daily-brief test |
| F-1-27 | Fixed | Export/restore tests |
| F-1-28 | Fixed | Offline/mobile checks |
| F-1-29 | Fixed | Paid offer removed |
| F-1-30 | Fixed | Free workflow listed/tested |
| F-1-31 | Fixed | Separate local DB source confirmed |
| F-1-32 | **Reopened: F-2-7** | Broader privacy claim unlisted |
| F-1-33 | **Reopened: F-2-8** | CDN/font sentence unlisted |
| F-1-34 | **Reopened: F-2-10** | Node 20 not declared/tested |
| F-1-35 | Fixed | Clean build command passes |
| F-1-36 | Fixed | `dist/index.html` exists |
| F-1-37 | Fixed | Stale shell claim removed |
| F-1-38 | Fixed | Playwright 1.58.2 pinned |
| F-1-39 | Fixed | Conditional setup wording |
| F-1-40 | Fixed | Checkout docs removed |
| F-1-41 | Fixed | Payment integration absent |
| F-1-42 | **Reopened: F-2-9** | Scheduling clause unlisted |
| F-1-43 | **Reopened: F-2-9** | Recurrence clause unlisted |
| F-1-44 | Fixed | Notification test |
| F-1-45 | Fixed | Direct backup warning |
| F-1-46 | Fixed | No dead paid action |
| F-1-47 | Fixed | Real demo and HTTP 404 |
| F-1-48 | Fixed | Live CSP/frame/permissions/nosniff/referrer headers |
| F-1-49 | Fixed | Immutable assets, no-cache SW, manifest MIME |
| F-1-50 | Fixed | Actionable malformed-backup error |
| F-1-51 | **Reopened: F-2-4** | Static Twitter/OG fields incomplete |
| F-1-52 | **Reopened: F-2-3** | Back focus/footer incomplete |
| F-1-53 | Fixed | Three steps and boundaries present |
| F-1-54 | Fixed | No README line over 22 words |
| F-1-55 | Fixed | Job H1 replaces metaphor |
| F-1-56 | Fixed | Hero jargon removed |
| F-1-57 | Fixed | Caption names real concepts |
| F-1-58 | Fixed | Appointment empty state |
| F-1-59 | Fixed | Side-note section label |
| F-1-60 | Fixed | Side-note empty state |
| F-1-61 | Fixed | Export heading names result |
| F-1-62 | Fixed | Backup heading names result |
| F-1-63 | **Reopened: F-2-11** | Jargon remains |
| F-1-64 | **Reopened: F-2-12** | Capacity terms still vary |
| F-1-65 | Fixed | Primary UI uses side note |
| F-1-66 | Fixed | Data/license control removed |
| F-1-67 | Fixed | Verify control removed |
| F-1-68 | **Reopened: F-2-2** | Live targets under 44 px |
| F-1-69 | Fixed | Live demo removed cancelled event and kept note unlinked |

## Quality gates

Clean-clone results: `npm ci` passed with 0 vulnerabilities; `npm test` passed 7/7; `npx tsc --noEmit` passed; `npm run build` produced `dist/`; `npm run test:e2e` passed 13/13. All 11 claim commands passed independently. Built JS is 27.29 kB raw / 9.29 kB gzip.

`/opt/fleet/lib/verify-url.sh` passed the live home. Live source/build identity checks passed for the shell, service worker, manifest, legal pages, 404, JS, and CSS.

## Missed leverage and AI check

No additional AI feature is justified. The job is deterministic import, local notes, and export; model use would add privacy/reliability cost. Replacement import with preserved unlinked notes, daily brief export, and backup/restore cover the obvious implied leverage. Background sync would conflict with the brief. No decorative AI, provider key, Azure endpoint, or model call exists.

## What would make this perfect

Put populated sample records in the first demo viewport; make every target 44×44 px; finish route metadata, footers, and history focus; move reconciliation verification into `/demo`; register or remove every remaining claim; replace the flagged jargon and terminology; correct the quick-note/reminder labels; verify Node 20 or narrow the documentation; and rerun the full review. PASS requires zero findings.
