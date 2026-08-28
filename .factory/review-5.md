# Adversarial first-read review 5 — Booking Side Notes

**Verdict: FAIL**

Reviewed 2026-08-28 at repository and live build `80c9008` against
<https://booking-side-notes.sociobot.in>. Fresh Chromium contexts were used at
390×844 and 1440×900. The first read, populated demo view, real-data isolation,
offline path, registered claim tests, routes, accessibility, and visual identity
pass. One blocking demo-exit defect and one minor copy defect remain.

## Thirty-second cold read

Nothing was scrolled before recording these answers.

| Question | Phone and desktop answer | Exact first-screen evidence |
| --- | --- | --- |
| What does it do? | Keeps side notes beside appointments without changing bookable time. | “Keep side notes beside appointments”; “without changing bookable time.” |
| For whom? | Small appointment businesses that need callbacks and access details. | “For small appointment businesses that need callbacks and access details…” |
| What should I click first? | **Try it with sample data**. | “Opens a sample day with appointments and side notes.” |

This passes. On the phone, the H1 ends at y=273, the audience sentence at
y=386, the sample action at y=456, and all three facts at y=645. The adjacent
real first step, **Import an .ics file**, is also visible. There was no
horizontal overflow or console error.

## Findings — blocking

### F-5-1 / F-1-2 (reopened) — ordinary demo exits retain edits despite “nothing is saved”

**Location / exact quote:** live `/?demo=1` and `/demo`, banner: “Demo — sample
data, nothing is saved.” The header wordmark, browser Back, Privacy, and Terms
leave demo mode without deleting its IndexedDB database. In code,
`#start-real` and `#reset-demo` call `discardDemoData()`, but generic
`navigate('/')`, `popstate`, and external route navigation do not.

**Evidence:** in a fresh live phone context, I created `REVIEW FIVE DEMO NOTE`,
clicked **Booking Side Notes**, and saw the unchanged real note. Re-entering
through **Try demo** restored `REVIEW FIVE DEMO NOTE` from
`booking-side-notes-demo`. A separate Back → Forward check restored
`BACK EXIT PERSISTS`. The real `booking-side-notes` record remained unchanged.
**Reset demo** removed the edit, and **Start for real** deleted the demo
database; those explicit controls work, but ordinary exits do not.

**Why this fails:** the demo contract says leaving demo mode discards demo data.
The obvious route home and standard Back action instead retain it. A later demo
visit therefore shows an earlier edit after the product said “nothing is
saved.” This is an incomplete repair of F-1-2’s original exit requirement.

**Concrete fix:** centralize every transition from demo to a non-demo route.
Delete `booking-side-notes-demo` before the wordmark, Back/Forward, Privacy, and
Terms complete; then load real state. Extend `@claim:demo-isolated`: edit the
sample, leave through the wordmark and browser Back, re-enter directly, and
assert the original three notes return, the demo-only text is absent, and real
storage is byte-for-byte unchanged.

## Findings — minor

### F-5-2 — “appointment instances” is calendar jargon

**Location / exact quote:** README, Boundaries: “Export the appointment
instances you need from your calendar.”

**Why this matters:** “instance” is an implementation term for one occurrence
of a calendar event. An appointment business should not have to translate it.

**Concrete rewrite:** “Export each appointment you need from your calendar.”

## Full copy audit

Counts ignore standalone punctuation and treat hyphenated terms, file
extensions, URLs, and filenames as one word. Repeated navigation labels are
listed once. Dates, counts, and customer/sample records are data, not authored
sentences. No sentence exceeds 22 words, and no banned marketing adjective
appears. The two flags below are the complete copy findings.

### Landing and interactive copy

| Words | Exact sentence or standalone heading | Result |
| ---: | --- | --- |
| 5 | Keep side notes beside appointments | Pass: job H1 |
| 14 | For small appointment businesses that need callbacks and access details without changing bookable time. | Pass: audience and change |
| 9 | Opens a sample day with appointments and side notes. | Pass: action result |
| 4 | Stored on this device | `local-no-upload` |
| 6 | Works offline after the first visit | `offline-after-first-visit` |
| 3 | No purchase required | `no-purchase-required` |
| 5 | Appointments stay on your calendar. | `calendar-unchanged` |
| 4 | Side notes stay here. | `local-no-upload` |
| 3 | No appointments yet | Pass |
| 4 | Import an appointment day | Pass |
| 5 | Choose an .ics calendar export. | Pass |
| 14 | We keep its ID, name, start and end times, and location on this device. | `minimal-calendar-fields` |
| 5 | Side notes for this day | Pass |
| 4 | No side notes yet | Pass |
| 8 | Add a callback, access detail, follow-up, or delay. | Pass |
| 11 | A side note stays beside the day without changing bookable time. | `calendar-unchanged` |
| 3 | How it works | Pass |
| 7 | Keep the day clear in three steps | Pass |
| 2 | Import appointments. | Pass |
| 5 | Choose an .ics calendar export. | Pass |
| 3 | Add side notes. | Pass |
| 9 | Link a callback or access detail to an appointment. | `side-note-workflow` |
| 3 | Print or export. | Pass |
| 10 | Take a plain daily brief or backup file with you. | `daily-brief`, `backup-export` |
| 2 | Your boundaries | Pass |
| 6 | What this tool does not do | Pass |
| 6 | It does not change your calendar. | `calendar-unchanged` |
| 5 | It does not send notifications. | `no-notifications` |
| 10 | It stores appointment details and side notes in this browser. | `local-no-upload` |
| 2 | End-of-day sheet | Pass |
| 6 | Print or export the daily brief | Pass |
| 9 | Print the daily brief or download a plain-text copy. | `daily-brief` |
| 2 | Local backup | Pass |
| 6 | Back up or restore your data | Pass |
| 9 | Export appointments and side notes as one backup file. | `backup-export` |
| 11 | Importing a backup asks before it replaces data on this device. | `backup-restore` |
| 7 | Side notes beside appointments, on this device. | `local-no-upload` |
| 11 | This creates no calendar event and does not change bookable time. | `calendar-unchanged` |
| 13 | For example: “Call before arrival; side gate code is in the job sheet.” | Pass |
| 6 | This only shows a due status. | Pass |
| 5 | This app sends no notifications. | `no-notifications` |
| 4 | An update is ready. | Pass |

### Demo-only copy

| Words | Exact sentence or standalone heading | Result |
| ---: | --- | --- |
| 6 | Demo — sample data, nothing is saved | **F-5-1** |
| 8 | Try edits freely in this separate sample workspace. | Pass |
| 2 | Sample workspace | Pass |
| 5 | Try a sample appointment day | Pass: demo H1 |
| 11 | Review one appointment and its side note, then edit anything below. | Pass |
| 1 | Appointment | Pass |
| 3 | First sample appointment | Pass: screen-reader heading |
| 4 | Side note beside it | Pass |
| 4 | First sample side note | Pass: screen-reader heading |

### Controls and labels

Every unique control uses a result-naming verb or a conventional destination/
form label:

- Try demo (2); Try it with sample data (5); Import an .ics file (4); Import
  calendar (2); Add side note (3); Choose an .ics file (4); Start callback note
  (3); Start access note (3); Start supplier note (3); Start follow-up note
  (3); Add a side note (4).
- Print daily brief (3); Export daily brief (3); Export backup (2); Import
  backup (2); Reset demo (2); Start for real (3); Mark reminder due (3); Mark
  reminder acknowledged (3); Save side note (3); Update app (2); Cancel (1).
- Working day (2), Side note (2), Anchor time (2), Beside appointment (2), and
  For the whole day (4) are clear labels. Edit/Delete icon buttons expose full
  accessible names. Privacy, Terms, Demo, and the wordmark are links.

### README

| Words | Exact sentence or standalone heading | Result |
| ---: | --- | --- |
| 3 | Booking Side Notes | Pass |
| 9 | Keep side notes beside appointments without changing bookable time. | `calendar-unchanged` |
| 8 | Booking Side Notes is for small appointment businesses. | Pass |
| 5 | Import an .ics calendar file. | Pass |
| 10 | Keep callbacks, access details, delays, and follow-ups beside each appointment. | `side-note-workflow` |
| 7 | Try it immediately at the sample demo. | Pass |
| 12 | The demo uses separate local storage and resets to its original sample. | `demo-isolated`; explicit Reset passes |
| 3 | What it does | Pass |
| 15 | Imports appointment ID, name, start and end times, and location from an .ics calendar export. | `minimal-calendar-fields` |
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
| 9 | Each product promise is listed and tested in `.factory/claims.json`. | F-5-1 exposes missing exit-path scope |
| 3 | Run and test | Pass |
| 10 | The package declares Node.js 20 or newer for local development. | Verified developer documentation |
| 2 | Open http://127.0.0.1:5173. | Pass |
| 14 | `npm run build` writes the static site to `dist/`, with `dist/index.html` at its root. | Verified developer documentation |
| 5 | Playwright is pinned to 1.58.2. | Verified developer documentation |
| 11 | If Chromium is not installed, run `npx playwright install chromium` once. | Pass |
| 1 | Deploy | Pass |
| 10 | Deploy the contents of `dist/` to an HTTPS static host. | Pass |
| 12 | `staticwebapp.config.json` contains host settings for routes, security, caching, and the app manifest. | Verified developer documentation |
| 5 | Do not deploy source files. | Pass |
| 1 | Boundaries | Pass |
| 9 | Side notes do not change appointments or bookable time. | `calendar-unchanged` |
| 6 | The app does not send notifications. | `no-notifications` |
| 9 | Export the appointment instances you need from your calendar. | **F-5-2** |
| 10 | Browser storage can be cleared, so export a backup regularly. | Pass |
| 4 | See Privacy and Terms. | Pass |
| 8 | Design rationale and asset provenance are in `.factory/design.md`. | Verified |
| 1 | License | Pass |
| 3 | MIT — see `LICENSE`. | Verified |

Terminology is otherwise consistent: imported records are **appointments**,
local items are **side notes**, capacity is **bookable time**, portable data is
a **backup**, and a removed appointment leaves an **unlinked side note**.

## Demo and sandbox verification

- The landing action enters `/?demo=1` in one click.
- At 390×844, the demo banner occupies y=86–146, the first appointment
  y=259–363, and its linked note y=393–631. The first screen is already in use.
- After scrolling 1,200 px, the banner remains at y=0 with Reset and Start for
  real visible. F-4-1 remains fixed.
- Demo and real use `booking-side-notes-demo` / `demo:state-v1` and
  `booking-side-notes` / `state-v1`. A demo edit did not change the real record.
- Reset restored the shipped sample. Start for real deleted the demo database.
- The wordmark and Back exit paths retained demo edits; see F-5-1.
- After service-worker control, network-offline `/demo` reloaded with its
  sample, banner, and “Offline · on device” state. The live privacy exercise
  made requests only to `https://booking-side-notes.sociobot.in`.

## Claims audit

Every exact command in `.factory/claims.json` was rerun independently in clean
clone `/tmp/booking-side-notes-review5-clean.2x9b0k` at full commit
`80c90083ec7b7f773927d3947cc6fdb7087a6989`.

| Claim id | Result | Observable evidence |
| --- | --- | --- |
| `demo-isolated` | PASS as written; incomplete scope in F-5-1 | Real/demo separation, sticky banner, Reset, and explicit Start passed; wordmark/Back exits are untested. |
| `local-no-upload` | PASS | Demo edit/export stayed same-origin. |
| `calendar-unchanged` | PASS | Added note left appointments and zero blocked minutes unchanged. |
| `offline-after-first-visit` | PASS | Cached demo reloaded and accepted a note offline. |
| `backup-export` | PASS | Download contained all sample appointments and notes. |
| `no-purchase-required` | PASS | Create, complete, print, and export needed no purchase. |
| `import-reconciliation` | PASS | Missing appointment was removed and its note stayed unlinked. |
| `daily-brief` | PASS | Print and text download contained sample records. |
| `backup-restore` | PASS | Cancel preserved data; confirmation replaced it. |
| `minimal-calendar-fields` | PASS | Export retained only the documented fields. |
| `no-notifications` | PASS | Reminder state left permission and push unchanged. |
| `side-note-workflow` | PASS | Both associations, completion, and reminder states worked. |
| `no-third-party-files` | PASS | No account UI, sync tags, remote files, or downloaded fonts appeared. |

No listed command failed. F-5-1 is the remaining coverage problem: the banner’s
absolute wording and demo-exit guarantee are broader than the current test. No
other landing/README product claim is unlisted.

## Structure, accessibility, and visual identity

- `/`, `/demo`, `/privacy/`, `/terms/`, and `/404.html` have route-specific
  titles, descriptions, canonicals, complete OG/Twitter fields, favicon, Apple
  icon, `lang=en`, one H1, and a main landmark. The social image is 1200×630.
- An unknown path returns the designed HTTP 404. The sitemap lists every public
  route. All links from valid routes return 200; two non-HTTP links are explicit
  `mailto:` links.
- Home → Privacy → Terms → Back → Back focuses `#page-title` after every route.
  Shared headers, footers, legal links, skip links, and build ID are present.
- Live Axe scans found no serious/critical issue on Home, Demo, Privacy, Terms,
  or 404. The local phone test found no target below 44×44 px. Reduced motion,
  dialog focus/return, and normal-route console checks pass.
- Live headers confirm CSP, frame denial, permissions policy, nosniff, referrer
  policy, manifest MIME, immutable assets, and no-cache HTML/service worker.
- Survey paper, contour lines, teal appointment rails, orange pins, editorial
  type, original map art, and the styled 404 match `.factory/design.md`. This is
  not a generic SaaS template.

## Earlier-finding verification

Every earlier review, polish record, verification record, and handoff was read.
Each prior finding was rechecked live and in current code/tests. F-1-2 is
reopened through F-5-1; all others remain fixed.

| Earlier id | Current confirmation |
| --- | --- |
| F-1-1 | Fixed — phone hero names job, audience, action, result, and three facts. |
| F-1-2 | **Reopened as F-5-1** — ordinary exits do not discard demo edits. |
| F-1-3 | Fixed — 13 registry entries map to 13 unique passing tests. |
| F-1-4 | Fixed — import/reconciliation works in demo. |
| F-1-5 | Fixed — notes leave appointments unchanged. |
| F-1-6 | Fixed — demo traffic stayed same-origin. |
| F-1-7 | Fixed — blocked minutes remain zero. |
| F-1-8 | Fixed — retained fields agree across copy/code/export. |
| F-1-9 | Fixed — notes create no appointment time. |
| F-1-10 | Fixed — print/download results contain sample records. |
| F-1-11 | Fixed — backup export needs no purchase. |
| F-1-12 | Fixed — backup contains every sample record. |
| F-1-13 | Fixed — restore cancel/confirm branches work. |
| F-1-14 | Fixed — paid phrase gating is absent. |
| F-1-15 | Fixed — core workflow needs no purchase. |
| F-1-16 | Fixed — purchase promise is absent. |
| F-1-17 | Fixed — merchant claim is absent. |
| F-1-18 | Fixed — refund/revocation claim is absent. |
| F-1-19 | Fixed — editor states/tests calendar non-mutation. |
| F-1-20 | Fixed — reminders leave notification/push untouched. |
| F-1-21 | Fixed — named audience appears on landing and README. |
| F-1-22 | Fixed — ICS-to-note flow is tested. |
| F-1-23 | Fixed — exact retained fields agree. |
| F-1-24 | Fixed — both associations, completion, reminders are tested. |
| F-1-25 | Fixed — calendar boundary is plain. |
| F-1-26 | Fixed — daily brief print/download is observable. |
| F-1-27 | Fixed — backup export/restore passes. |
| F-1-28 | Fixed — phone demo works offline. |
| F-1-29 | Fixed — paid offer is absent. |
| F-1-30 | Fixed — core flow is purchase-free. |
| F-1-31 | Fixed — real/demo databases are separate. |
| F-1-32 | Fixed — privacy account/sync/origin scope is tested. |
| F-1-33 | Fixed — third-party file/font scope is tested. |
| F-1-34 | Fixed — Node engine is `>=20`. |
| F-1-35 | Fixed — documented build command passes. |
| F-1-36 | Fixed — build emits `dist/index.html`. |
| F-1-37 | Fixed — stale shell promise is absent. |
| F-1-38 | Fixed — Playwright 1.58.2 is pinned. |
| F-1-39 | Fixed — browser setup guidance is conditional. |
| F-1-40 | Fixed — dead checkout documentation is absent. |
| F-1-41 | Fixed — no payment provider code/request ships. |
| F-1-42 | Fixed — unsupported scheduler wording is absent. |
| F-1-43 | Fixed — recurrence promise is absent. |
| F-1-44 | Fixed — notification boundary is tested. |
| F-1-45 | Fixed — backup-loss guidance is direct. |
| F-1-46 | Fixed — no paid/dead control remains. |
| F-1-47 | Fixed — demo routes and designed HTTP 404 work. |
| F-1-48 | Fixed — security headers are present live. |
| F-1-49 | Fixed — manifest MIME/cache policies are live. |
| F-1-50 | Fixed — malformed backup recovery is actionable. |
| F-1-51 | Fixed — route metadata is complete. |
| F-1-52 | Fixed — shared chrome/history focus works. |
| F-1-53 | Fixed — three steps and boundaries are present. |
| F-1-54 | Fixed — README has no sentence over 22 words. |
| F-1-55 | Fixed — H1 states the job. |
| F-1-56 | Fixed — “operational details” is absent. |
| F-1-57 | Fixed — caption uses actual product terms. |
| F-1-58 | Fixed — appointment empty state has a next step. |
| F-1-59 | Fixed — side-note heading is plain. |
| F-1-60 | Fixed — note empty state has examples/action. |
| F-1-61 | Fixed — daily-brief heading names the result. |
| F-1-62 | Fixed — backup heading names the result. |
| F-1-63 | Fixed — earlier README jargon is absent. |
| F-1-64 | Fixed — capacity uses “bookable time.” |
| F-1-65 | Fixed — local work uses “side note.” |
| F-1-66 | Fixed — ambiguous data/license control is absent. |
| F-1-67 | Fixed — unused verification control is absent. |
| F-1-68 | Fixed — phone targets meet 44×44 px. |
| F-1-69 | Fixed — replacement keeps removed-event notes unlinked. |
| F-2-1 | Fixed — used records fit first demo phone viewport. |
| F-2-2 | Fixed — compact/mobile targets meet 44 px. |
| F-2-3 | Fixed — legal/history focus and footer pass. |
| F-2-4 | Fixed — static social metadata is complete. |
| F-2-5 | Fixed — reconciliation stays inside demo. |
| F-2-6 | Fixed — full note workflow is registered. |
| F-2-7 | Fixed — broad privacy scope is registered. |
| F-2-8 | Fixed — file/font privacy scope is tested. |
| F-2-9 | Fixed — unsupported boundary copy is absent. |
| F-2-10 | Fixed — Node 20 support is declared/checked. |
| F-2-11 | Fixed — cited README jargon is absent. |
| F-2-12 | Fixed — calendar/bookable-time terms are consistent. |
| F-2-13 | Fixed — untestable “clean” wording is absent. |
| F-2-14 | Fixed — quick/reminder controls name results. |
| F-3-1 | Fixed — vague “Private” eyebrow is absent. |
| F-4-1 | Fixed — demo strip stays at y=0 after 1,200 px scroll. |

The polish files’ dispositions were checked through these same IDs. The prior
handoff’s “no known gaps” statement is superseded by F-5-1.

## Quality-gate evidence

- Clean-clone `npm ci`: 60 packages, 0 vulnerabilities.
- `npm test`: 10/10; `npx tsc --noEmit`: pass.
- `npm run build`: pass; `dist/index.html` exists; JS 28.30 kB raw / 9.54 kB
  gzip; CSS 20.67 kB raw / 5.38 kB gzip.
- All 13 exact claim commands passed independently in the clean clone.
- Full `npm run test:e2e`: 16/16. F-5-1 is a missing regression path rather
  than a failure covered by the current suite.

## Missed leverage and AI check

No additional feature finding is warranted. ICS reconciliation, daily-brief
print/download, and backup export/restore cover the obvious implied needs.
Background sync conflicts with the local PII boundary. AI drafting would send
client text and is unnecessary for this deterministic workflow. No decorative
AI, provider key, Azure endpoint, analytics, or third-party runtime was found.

## What would make this perfect

1. Discard demo data on every exit, including wordmark, legal links, Back, and
   Forward; cover every path in `@claim:demo-isolated`.
2. Replace “appointment instances” with “each appointment.”
3. Repeat the independent claim run and live phone exit/re-entry check. PASS is
   appropriate only when both findings are gone and no new finding appears.
