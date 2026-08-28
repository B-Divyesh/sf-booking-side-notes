# Adversarial first-read review 4 — Booking Side Notes

**Verdict: FAIL**

Reviewed 2026-08-28 against live commit `658f96f2d0b264d87785da3594b452c8cdf6abf3` at <https://booking-side-notes.sociobot.in>. This review used fresh Chromium contexts at 390×844 and 1440×1000, a separate clean clone at that commit, and the public production site. The product is clear and usable at first read, but it has one remaining blocking demo-sandbox defect. A visitor can edit sample data after the demo disclosure has disappeared from the phone viewport.

## Thirty-second cold read

No scrolling occurred before recording these answers.

| Question | 390 px phone | Desktop |
| --- | --- | --- |
| What does this do? | Keep callback and access side notes beside appointments without changing bookable time. | Same. |
| For whom? | Small appointment businesses. | Same. |
| What should I click first? | **Try it with sample data**; the adjacent text says it opens a sample day with appointments and side notes. | Same. |

The first phone screen contains the 5-word H1 “Keep side notes beside appointments”, the 14-word audience sentence, the sample action/result, and the three required facts. It has no horizontal overflow. This confirms the cold-read repairs from reviews 1–3.

## Findings — blocking

### F-4-1 — The required demo disclosure is not persistent while sample edits remain available

**Location / exact quote:** live `/demo` and `/?demo=1`, banner: “Demo — sample data, nothing is saved”; source: `src/main.ts` renders `<aside class="demo-banner">`, while `src/styles.css` gives `.demo-banner` normal document-flow styling and no sticky/fixed positioning.

**Evidence:** in a fresh 390×844 context, the banner begins at y=143 with height 114. After one 1,200px phone scroll it is at y=-1057, entirely outside the viewport, while the **Add side note** control and editable sample workspace remain below. The demo banner is initially present, Reset demo restores the original sample, Start for real exits to the isolated real workspace, and the demo database is separate; the defect is specifically persistence of the disclosure.

**Why this fails:** the demo-sandbox contract requires a persistent, unobtrusive “Demo — sample data, nothing is saved” banner with Reset demo and Start for real. Once the disclosure is out of sight, a visitor can edit realistic appointment data without any remaining reminder that those edits will be discarded. That weakens the product’s honest try-out boundary.

**Concrete fix:** keep a compact demo notice visible while the demo workspace is scrollable—for example, make the banner `position: sticky` beneath the site header, retain the exact disclosure, and keep Reset demo / Start for real reachable. Add a 390px Playwright regression: scroll beyond the first viewport, assert the banner remains in the viewport, add a sample note, and assert the real IndexedDB database is still untouched.

## Demo and sandbox checks

- The first-screen **Try it with sample data** action reached `/?demo=1` in one click.
- The first demo phone screen showed three named appointments and a real linked note: “Call before arrival; the side gate is open after 8:00.”
- Reset demo removed an added demo-only note and restored the original three-record sample.
- Direct demo entry created `booking-side-notes-demo`, not `booking-side-notes`; code uses the separate `demo:state-v1` key in `src/db.ts`.
- Live offline exercise passed: after service-worker control, setting the context offline, reloading `/demo`, and adding a note showed the banner, “Offline · on device”, and the saved sample note. Captured requests were only to `https://booking-side-notes.sociobot.in`.
- The non-persistent disclosure in F-4-1 prevents acceptance despite these checks.

## Claims audit

`.factory/claims.json` contains 13 entries. From a clean clone at `658f96f`, `npm ci`, `npm test`, `npx tsc --noEmit`, and `npm run build` passed. Each listed exact claim command completed successfully; the complete `npm run test:e2e` run also passed 16/16 and exercised all 13 tags.

| Claim id | Result | Observable check exercised |
| --- | --- | --- |
| `demo-isolated` | Pass | Real and demo notes stay separate; Reset and Start for real work. |
| `local-no-upload` | Pass | Demo edit/export requests are same-origin only. |
| `calendar-unchanged` | Pass | Adding a note leaves appointments and zero blocked minutes unchanged. |
| `offline-after-first-visit` | Pass | Offline demo reload and note save work. |
| `backup-export` | Pass | One downloaded archive includes all three sample events and notes. |
| `no-purchase-required` | Pass | Create, complete, and brief export work without purchase state. |
| `import-reconciliation` | Pass | Missing appointment is removed and its note becomes unlinked in demo. |
| `side-note-workflow` | Pass | Linked/whole-day notes, completion, and reminder states work. |
| `no-third-party-files` | Pass | No account UI, sync tags, remote files, or downloaded fonts. |
| `daily-brief` | Pass | Print and text download include sample appointments. |
| `backup-restore` | Pass | Cancel preserves data; confirm replaces it. |
| `minimal-calendar-fields` | Pass | Archive excludes unrelated ICS fields. |
| `no-notifications` | Pass | Reminder status leaves permission and push subscription unchanged. |

Landing and README claim-like text was cross-checked against this inventory. Retained capability, privacy, offline, export, notification, and calendar-boundary claims map to an entry above. No additional unlisted-claim finding was found.

## Copy audit

Word counts treat hyphenated terms and file extensions as one word. Interface labels and headings are included where they are meaningful first-read copy; dynamic record names and repeated counter values are omitted. No sentence exceeds 22 words. No banned marketing adjective or jargon from the plain-words checklist was found. Controls use result-naming verbs; icon controls have “Edit …” or “Delete …” accessible names.

### Landing/app copy

| Copy | Words | Check |
| --- | ---: | --- |
| Keep side notes beside appointments | 5 | H1; plain job. |
| For small appointment businesses that need callbacks and access details without changing bookable time. | 14 | Audience and change. |
| Try it with sample data | 5 | Primary action. |
| Opens a sample day with appointments and side notes. | 9 | Result of primary action. |
| Import an .ics file | 4 | Real first step. |
| Stored on this device | 4 | Plain fact. |
| Works offline after the first visit | 6 | Plain fact. |
| No purchase required | 3 | Plain fact. |
| Appointments stay on your calendar. | 5 | Calendar boundary. |
| Side notes stay here. | 4 | Local-data boundary. |
| Working day | 2 | Field label. |
| Import calendar | 2 | Result-naming control. |
| Add side note | 3 | Result-naming control. |
| No appointments yet | 3 | Empty-state status. |
| Import an appointment day | 4 | Empty-state heading. |
| Choose an .ics calendar export. | 5 | Empty-state next step. |
| We keep its ID, name, start and end times, and location on this device. | 14 | Exact field boundary. |
| No side notes yet | 4 | Empty-state status. |
| Add a callback, access detail, follow-up, or delay. | 8 | Concrete examples. |
| A side note stays beside the day without changing bookable time. | 11 | Calendar boundary. |
| Keep the day clear in three steps | 7 | Standalone process heading. |
| Import appointments. | 2 | Step verb. |
| Add side notes. | 3 | Step verb. |
| Link a callback or access detail to an appointment. | 9 | Step detail. |
| Print or export. | 3 | Step verb. |
| Take a plain daily brief or backup file with you. | 10 | Step detail. |
| What this tool does not do | 6 | Standalone boundary heading. |
| It does not change your calendar. | 6 | Boundary. |
| It does not send notifications. | 5 | Boundary. |
| It stores appointment details and side notes in this browser. | 10 | Privacy boundary. |
| Print or export the daily brief | 6 | Standalone section heading. |
| Print the daily brief or download a plain-text copy. | 9 | Export explanation. |
| Back up or restore your data | 6 | Standalone section heading. |
| Export appointments and side notes as one backup file. | 9 | Export explanation. |
| Importing a backup asks before it replaces data on this device. | 11 | Restore explanation. |
| This creates no calendar event and does not change bookable time. | 11 | Editor boundary. |
| For example: “Call before arrival; side gate code is in the job sheet.” | 13 | Concrete editor help. |
| This only shows a due status. | 6 | Reminder boundary. |
| This app sends no notifications. | 5 | Reminder boundary. |
| Side notes beside appointments, on this device. | 6 | Footer one-liner. |

### README copy

| Sentence | Words | Check |
| --- | ---: | --- |
| Keep side notes beside appointments without changing bookable time. | 9 | Plain summary. |
| Booking Side Notes is for small appointment businesses. | 8 | Audience. |
| Import an .ics calendar file. | 5 | Direct task step. |
| Keep callbacks, access details, delays, and follow-ups beside each appointment. | 10 | Concrete examples. |
| Try it immediately at the sample demo. | 7 | Direct demo action. |
| The demo uses separate local storage and resets to its original sample. | 12 | Demo boundary. |
| Imports appointment ID, name, start and end times, and location from an .ics calendar export. | 15 | Capability. |
| Adds side notes for one appointment or the whole day. | 10 | Capability. |
| Mark each done and set its reminder status. | 8 | Capability. |
| Replaces an imported day after confirmation. | 6 | Capability. |
| Side notes for missing appointments remain clearly marked as unlinked. | 10 | Reconciliation outcome. |
| Prints or downloads a daily brief and exports one backup file. | 11 | Capability. |
| Appointment details and side notes stay in this browser. | 9 | Privacy claim. |
| Side notes do not change appointments or bookable time. | 9 | Boundary claim. |
| The app works offline after the first visit. | 8 | Offline claim. |
| No purchase is required for side notes, daily briefs, or backups. | 11 | Price claim. |
| The app has no account or background sync. | 8 | Privacy boundary. |
| It loads no third-party files. | 5 | Privacy boundary. |
| Each product promise is listed and tested in .factory/claims.json. | 9 | Documentation statement. |
| The package declares Node.js 20 or newer for local development. | 10 | Development requirement. |
| npm run build writes the static site to dist/, with dist/index.html at its root. | 14 | Build output. |
| Playwright is pinned to 1.58.2. | 5 | Tooling fact. |
| If Chromium is not installed, run npx playwright install chromium once. | 11 | Recovery step. |
| Deploy the contents of dist/ to an HTTPS static host. | 10 | Deployment instruction. |
| staticwebapp.config.json contains host settings for routes, security, caching, and the app manifest. | 12 | Deployment documentation. |
| Do not deploy source files. | 5 | Deployment instruction. |
| The app does not send notifications. | 6 | Boundary claim. |
| Export the appointment instances you need from your calendar. | 9 | Boundary instruction. |
| Browser storage can be cleared, so export a backup regularly. | 10 | Risk guidance. |
| See Privacy and Terms. | 4 | Route reference. |
| Design rationale and asset provenance are in .factory/design.md. | 8 | Documentation reference. |
| MIT — see LICENSE. | 4 | License reference. |

No copy finding is added. The only demo-copy issue is F-4-1: the clear required disclosure is absent after scrolling, not unclear while visible.

## Structure, accessibility, and live routes

- Live `/`, `/demo`, `/?demo=1`, `/privacy/`, `/terms/`, `/404.html`, robots, sitemap, and manifest returned 200. An unknown route returned the designed 404 with HTTP 404.
- The five rendered routes each had one H1, a route-specific title, description, canonical, OG/Twitter fields, favicon, apple touch icon, `lang="en"`, shared header/footer, Privacy/Terms links, skip link, and build identifier.
- Header navigation and browser Back restored focus to `#page-title` across Home → Privacy → Terms → Back → Back.
- All crawled same-origin links returned 200; the two non-HTTP links are explicit `mailto:` addresses.
- Live headers include CSP, nosniff, referrer policy, permissions policy, frame protection, manifest MIME, and no-cache/immutable asset policies.
- The full clean-clone Playwright run passed Axe serious/critical checks, 390px target geometry, focus routing, reduced-motion behavior, console checks for normal/demonstration routes, metadata, and the styled 404.
- The cartographic paper surface, restrained serif wayfinding, contour-line treatment, teal appointment rails, orange side-note pins, and original map asset match `.factory/design.md`; this is not a generic SaaS-template surface.

## Earlier-review verification matrix

Every earlier finding was rechecked against live behavior and current source/tests, rather than accepted from a prior “fixed” label. “Confirmed” means the cited repair is currently observable and covered by the stated code/test surface. None is reopened; F-4-1 is new.

| Earlier id | Current confirmation |
| --- | --- |
| F-1-1 | Phone hero names job, audience, first action, result, and three facts. |
| F-1-2 | Direct demo seeds a realistic used state with reset/exit and separate storage. |
| F-1-3 | Registry has 13 one-tagged-test entries; all passed in clean clone. |
| F-1-4 | ICS import/reconciliation is tested in demo. |
| F-1-5 | `calendar-unchanged` tests unchanged events and zero blocked minutes. |
| F-1-6 | Same-origin demo request capture passes. |
| F-1-7 | Capacity remains zero after added notes. |
| F-1-8 | UI/export retain the exact documented fields. |
| F-1-9 | Linked and whole-day notes do not create or resize appointments. |
| F-1-10 | Print and downloaded brief contain sample records. |
| F-1-11 | Export is available without purchase state. |
| F-1-12 | Backup contains all demo records. |
| F-1-13 | Restore cancel and confirm branches pass. |
| F-1-14 | Paid phrase gating is absent; starters are free. |
| F-1-15 | Create/complete/print/export workflow needs no purchase. |
| F-1-16 | One-time purchase claim is absent. |
| F-1-17 | Merchant claim is absent. |
| F-1-18 | Refund/revocation claim is absent. |
| F-1-19 | Editor states and tests calendar non-mutation. |
| F-1-20 | Reminder test leaves permission/push untouched. |
| F-1-21 | Named audience appears on landing and README. |
| F-1-22 | ICS-to-side-note flow works without calendar mutation. |
| F-1-23 | Field retention is exact in code, UI, privacy copy, and archive test. |
| F-1-24 | Both note associations, completion, and reminders are tested. |
| F-1-25 | Direct “does not change your calendar” wording replaced contract jargon. |
| F-1-26 | Daily brief print and download are observable. |
| F-1-27 | Backup export and confirmed import pass. |
| F-1-28 | Phone demo reload/edit works offline. |
| F-1-29 | Paid offer and price are absent. |
| F-1-30 | Core workflow is purchase-free. |
| F-1-31 | `booking-side-notes-demo` is distinct from real IndexedDB. |
| F-1-32 | Account/sync/request/font privacy scope is tested. |
| F-1-33 | “No third-party files” is plain and tested. |
| F-1-34 | `engines.node` is `>=20`; clean gates passed. |
| F-1-35 | Exact build command passes from clean clone. |
| F-1-36 | Build emits `dist/index.html`. |
| F-1-37 | Stale critical-shell implementation promise remains absent. |
| F-1-38 | Playwright 1.58.2 is pinned and executed. |
| F-1-39 | Browser-install guidance is conditional and direct. |
| F-1-40 | Dead checkout link is absent from source and crawl. |
| F-1-41 | No payment SDK/request appears in the privacy test. |
| F-1-42 | Untested scheduler wording is absent. |
| F-1-43 | Untested recurrence wording is absent. |
| F-1-44 | Notification boundary has a browser-state test. |
| F-1-45 | Backup-loss guidance is direct and short. |
| F-1-46 | No paid control or dead purchase link is present. |
| F-1-47 | `/demo` is a direct demo; unknown path is styled HTTP 404. |
| F-1-48 | Static config and live CSP/frame/permission/security headers are present. |
| F-1-49 | Manifest MIME and cache policy are present live. |
| F-1-50 | Malformed/wrong-shape backup messages give a recovery step. |
| F-1-51 | App, demo, legal, and 404 metadata are complete. |
| F-1-52 | Shared footer and history focus behavior pass. |
| F-1-53 | Landing has three steps and explicit boundaries. |
| F-1-54 | README audit has no sentence above 22 words. |
| F-1-55 | H1 states the appointment-note job. |
| F-1-56 | “Operational details” is absent from product copy. |
| F-1-57 | Caption uses appointment/side-note terms. |
| F-1-58 | Appointment empty state gives a next action. |
| F-1-59 | Side-note section uses a standalone plain heading. |
| F-1-60 | Side-note empty state gives examples and action. |
| F-1-61 | Daily-brief heading names the action. |
| F-1-62 | Backup heading names backup/restore. |
| F-1-63 | Cited README jargon is absent. |
| F-1-64 | Capacity wording is consistently “bookable time”. |
| F-1-65 | Local work item is consistently “side note”. |
| F-1-66 | Ambiguous Data & license control is absent. |
| F-1-67 | Unused verification control is absent. |
| F-1-68 | Geometry test finds no target below 44px. |
| F-1-69 | Re-import removes missing appointments and retains unlinked notes. |
| F-2-1 | Demo’s first phone viewport includes a sample appointment and note. |
| F-2-2 | Compact/mobile controls meet target geometry checks. |
| F-2-3 | Legal route and history H1 focus are confirmed live. |
| F-2-4 | Static legal/404 OG and Twitter fields are complete. |
| F-2-5 | Reconciliation begins in demo and leaves real DB absent. |
| F-2-6 | Compound side-note workflow is a registered claim. |
| F-2-7 | Privacy account/sync/request scope is registered. |
| F-2-8 | Third-party-file/font scope is registered. |
| F-2-9 | Unsupported scheduling/recurrence claims are absent. |
| F-2-10 | Node 20 declaration and clean build evidence are present. |
| F-2-11 | Cited README jargon is absent. |
| F-2-12 | Calendar/bookable-time terms are consistent. |
| F-2-13 | Untestable “clean” wording is absent. |
| F-2-14 | Quick actions and reminder controls name their results. |
| F-3-1 | “Private appointment companion” remains absent in source and live hero. |

## Missed leverage

No finding. The brief calls for a local ICS companion with notes, daily brief, and backup. Those input/output paths are present. A sync feature would conflict with the stated local-first PII boundary, and an AI drafting/extraction feature is not necessary for this narrow note workflow. No decorative AI or embedded provider key was found.

## What would make this perfect

Make the existing demo disclosure remain visible throughout the demo editing flow, add the 390px scroll regression described in F-4-1, then repeat the clean-clone claim run and live mobile check. With that one repair, this review found no other remaining issue.
