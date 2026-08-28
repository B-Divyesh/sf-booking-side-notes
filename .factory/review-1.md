# Adversarial first-read review 1 — Booking Side Notes

**Verdict: FAIL**

Reviewed 2026-08-28 against deployed commit `22ed815909a06e0a73cfa85d52fdc9076838f336` at <https://booking-side-notes.sociobot.in>. The site is visually distinctive and the core unlicensed workflow works, but it does not meet the required cold-read, demo, claims, routing, or live-purchase contracts. There are blocking findings and minor findings; therefore this cannot pass.

## Thirty-second cold read

Fresh contexts were used at 390×844 and 1440×1000. Nothing was scrolled before answering.

| Question | 390 px phone | Desktop |
| --- | --- | --- |
| What does this do? | I could infer “imports appointments and keeps related details outside calendar availability” only after reading both hero sentences. “Operational details” and the map metaphor slow that inference. | Same. The empty product workspace is visible, but no used example explains it. |
| For whom? | Cannot answer. No audience appears in the first screen. | Cannot answer. No audience appears in the first screen. |
| What should I click first? | Cannot answer. The first workflow controls begin below the 844 px fold. The only visible button is “Data & license,” which is not a sensible first step. | “Import calendar” and “+ Add side note” are visible, but neither is a safe try-out and the page does not choose one. |

The exact first-screen copy that failed is “A field map for the working day,” “Keep the note. Keep the slot open,” and “Import appointments, pin the operational details beside them, and stay bookable.” It does not name “small appointment businesses,” and it provides no “Try it with sample data” action or explanation of what that action will show.

## Findings — blocking

### F-1-1 — The first screen does not identify the user or a first action

**Location/quote:** landing hero, quoted above. At 390 px the date/import controls start below the fold; “Data & license” is the only visible button.

**Why this fails:** a new visitor cannot answer two of the three mandatory questions. The headline is a promise, not the job in the visitor’s words. The first screen also has only one fact (“Local by default”), not the required privacy/offline/price facts.

**Concrete fix:** use a job headline such as “Keep side notes beside appointments”; follow with “For small appointment businesses that need callbacks and access details without blocking bookable time.” Put “Try it with sample data” beside “Import an ICS file,” explain the result (“Opens a sample day with appointments and notes”), and show three short facts: “Stored on this device,” “Works offline after first visit,” and “Core tools free; Trail Kit $12 once.” Ensure these fit at 390×844.

### F-1-2 — There is no demo, and the apparent demo URLs mutate real data

**Location/quote:** no demo action on `/`; no `.factory/demo.md`; `/demo` and `/?demo=1` both render the ordinary app.

**Evidence:** in one context I created `REAL CUSTOMER NOTE` on `/`, opened both candidate demo URLs, and saw that real note. Neither route had sample data, “Demo — sample data, nothing is saved,” “Reset demo,” or “Start for real.” Adding `DEMO SHOULD BE ISOLATED` on `/?demo=1` wrote it into IndexedDB database `booking-side-notes`, store `local-data`, key `state-v1`; both notes then appeared on `/`.

**Why this fails:** there is no one-click try-out, no immediate used-state example, no reset, and no storage boundary. A catalog verifier or visitor using the conventional demo URL can alter real local data while believing it is a sandbox.

**Concrete fix:** add a visible one-click `/demo` path seeded with several realistic appointments and side notes; use a separate `demo:` database/key namespace; show the required persistent banner and controls; reset deterministically; discard demo state on exit; document all of this in `.factory/demo.md`; test that real data is unreadable and unchanged before and after every demo action, including offline actions.

### F-1-3 — The required claim inventory and claim tests do not exist

**Location:** `.factory/claims.json` is absent. No test contains an `@claim:` tag.

**Evidence:** there were zero listed claim commands to run. A clean clone did pass the existing 5 unit tests and 3 Playwright tests, but those tests are untagged and do not provide the required one-entry/one-observable-test mapping. The claimed demo sandbox cannot be used because it does not exist.

**Why this fails:** every visitor-facing promise is unregistered and untestable through the required clean sandbox. “No untested claim” cannot be established.

**Concrete fix:** create valid `.factory/claims.json`; give every retained claim below exactly one tagged test; run each from a fresh `/demo`; remove statements that cannot be tested.

### Unlisted claim findings

Each row is a separate unlisted-claim finding. The common failure is the absent registry; the final column gives the observable test or correction needed.

| ID | Exact quote and location | Concrete fix/test |
| --- | --- | --- |
| F-1-4 | Landing: “Import appointments, pin the operational details beside them, and stay bookable.” | Register import + note creation; import a fixture, add an attached note, and assert the appointment remains present and unchanged. |
| F-1-5 | Landing: “Nothing here changes your calendar availability.” | Register and assert that no calendar write request occurs and exported source data is unchanged. |
| F-1-6 | Landing: “Local by default — client details stay in this browser.” | Register a network-interception test covering import, edit, export, reload, and offline use; allow only same-origin asset requests. |
| F-1-7 | Landing status: “0 minutes blocked by 0 side notes.” | Register a test that adds multiple anchored notes and asserts blocked minutes stays exactly zero. |
| F-1-8 | Landing empty state: “We retain only the appointment name, time, and location on this device.” | This is false: the live store also retained UID `private-customer-17`. Rewrite to “We keep the appointment ID, name, start and end times, and location on this device,” then test the exact field set. |
| F-1-9 | Landing: “It will be anchored to the day without occupying a booking slot.” | Register a test that adds an anchored note and asserts no appointment is created or resized. |
| F-1-10 | Landing: “Print a clean daily brief or save a plain-text copy.” | Register separate print-render and downloaded-text assertions, or narrow the sentence to the behavior covered by one test. |
| F-1-11 | Landing: “Data export is always free.” | Register an unlicensed-context test that downloads the data archive without a license/API call. |
| F-1-12 | Landing: “Back up or move every imported appointment and note as one JSON file.” | Register an export/import round-trip asserting every supported field and record. |
| F-1-13 | Landing: “Importing a backup replaces the data on this device only after confirmation.” | Register cancel and confirm branches; assert no mutation on cancel and exact replacement on confirm. |
| F-1-14 | Landing: “Unlock one-tap phrases for callbacks, access checks, suppliers, and follow-ups.” | Register a recorded valid-license fixture and assert each promised phrase is available and inserts text. |
| F-1-15 | Landing: “The complete note workflow, print, and exports stay free.” | Register a clean, unlicensed workflow test for create/edit/complete/delete, print, brief export, and archive export. |
| F-1-16 | Landing: “One-time purchase.” | Register the billing product terms response or remove this unverified commercial promise. |
| F-1-17 | Landing: “Sociobot/Dodo is the merchant of record.” | Register checkout-response evidence or remove the sentence until the live checkout exists. |
| F-1-18 | Landing: “Refunds are handled there and revoke the license.” | Register a recorded refunded-license verification test plus checkout policy evidence, or remove the claim. |
| F-1-19 | Note dialog: “This creates no calendar event and blocks no time.” | Register a before/after event-list and outbound-request assertion after saving a note. |
| F-1-20 | Note dialog: “This app sends no notifications.” | Register that note/reminder actions request no notification permission, create no push subscription, and make no outbound notification request. |
| F-1-21 | README: “Booking Side Notes is a local-first companion for small appointment businesses.” | Register local-storage/network behavior and name the same audience on the landing screen. |
| F-1-22 | README: “Import a day of appointments from an ICS file, then pin callbacks, access details, supplier delays, and follow-ups beside those bookings without creating fake events or blocking availability.” | Register the complete ICS-to-attached-note workflow and assert the event set/capacity is unchanged. |
| F-1-23 | README: “Imports ICS appointments locally and retains only the UID, name, time, and location.” | Register exact retained/discarded fields. Keep this wording consistent with the corrected landing copy. |
| F-1-24 | README: “Adds time-anchored or appointment-linked notes with completion and reminder status.” | Register both association modes, completion toggling, and both reminder states. |
| F-1-25 | README: “Makes the nonblocking contract explicit: side notes never write to the source calendar.” | Register no calendar mutation/outbound request; rewrite “nonblocking contract” in plain language. |
| F-1-26 | README: “Prints or downloads a plain-text daily brief.” | Register print and download content, including one row per sample record. |
| F-1-27 | README: “Exports and restores the complete local archive as JSON.” | Register exact round-trip equality from demo data. |
| F-1-28 | README: “Installs as an offline PWA and works at phone and desktop sizes.” | Register manifest/installability, offline demo reload, and explicit 390 px/desktop viewport checks. |
| F-1-29 | README: “Offers an optional US $12 one-time Trail Kit license for one-tap note phrases.” | Register the live product/price and a fixture-backed license-unlock test. |
| F-1-30 | README: “Core notes, print, and data export are free.” | Register the complete unlicensed flow. |
| F-1-31 | README: “Calendar data and notes are stored in IndexedDB on the current device.” | Register the exact database/store/key and absence of remote data writes. |
| F-1-32 | README: “There is no account, analytics, background sync, or data upload.” | Register absence of account UI, analytics calls, sync registration, and cross-origin data requests during the complete demo. |
| F-1-33 | README: “The app uses system fonts and has no runtime CDN dependencies.” | Register computed font sources and network origins during a complete flow. |
| F-1-34 | README: “Requires Node.js 20 or newer.” | Add a supported-engine declaration and CI matrix assertion, or rewrite as the tested development version. |
| F-1-35 | README: “The exact deployment build command is `npm run build`.” | Register a clean-clone build test using exactly that command. |
| F-1-36 | README: “Static output is written to `dist/`, with `dist/index.html` at its root.” | Register the post-build path assertion. |
| F-1-37 | README: “The post-build step inlines the small critical app shell and injects the hashed assets into the service worker cache list.” | Register assertions against built `dist/index.html` and `dist/sw.js`. |
| F-1-38 | README: “Playwright is pinned to 1.58.2.” | Register/assert the lockfile and package version, or treat this as generated dependency documentation. |
| F-1-39 | README: “In the factory image its Chromium build is already available through `PLAYWRIGHT_BROWSERS_PATH`; elsewhere, run `npx playwright install chromium` once.” | Split the sentence and verify the documented setup in CI; do not promise an environment state the repository cannot control. |
| F-1-40 | README: “The optional purchase link uses the Sociobot hosted checkout at `/api/v1/products/booking-side-notes/checkout`; the factory must register the product before release.” | Register a live, non-404 checkout test before release; the present endpoint fails. |
| F-1-41 | README: “No payment provider is embedded here.” | Register bundle/source and runtime-origin checks for payment-provider SDKs/requests. |
| F-1-42 | README: “This is not a scheduler, CRM, calendar host, or notification service.” | Register absence of calendar writes/notification activity and keep the statement as a boundary rather than capability marketing. |
| F-1-43 | README: “It does not expand recurring-event rules itself; import an ICS export containing the instances you need.” | Register an RRULE fixture that remains unexpanded and a clear in-product warning. |
| F-1-44 | README: “It does not send SMS, email, or push reminders.” | Register network, permission, and service-worker push assertions during reminder actions. |
| F-1-45 | README: “Browser storage can be cleared by the user or device, so regular JSON backups are recommended.” | Test browser-storage deletion and restore guidance, or narrow this to documented browser behavior. |

### F-1-46 — The live paid action is dead

**Location/quote:** “Buy Trail Kit — $12” links to `https://api.sociobot.in/api/v1/products/booking-side-notes/checkout`.

**Evidence:** a clean GET returned HTTP 404 with `application/json`. Internal crawl targets `/`, `/privacy/`, `/terms/`, and the SVG favicon returned 200.

**Why this fails:** the page offers a paid result that cannot be bought. This also confirms the earlier handoff’s “factory must register the live product” next step was not completed before deployment.

**Concrete fix:** register the product and return a functioning hosted checkout, or remove/disable the buy action and price until registration is complete. Add a non-destructive live-link claim check.

### F-1-47 — Unknown and demo routes masquerade as the home page

**Location:** `/definitely-not-a-real-route` and `/demo`.

**Evidence:** both returned HTTP 200, title “Booking Side Notes — notes without blocked slots,” and the normal home H1. There is no designed 404 route. `/demo` has neither its own title nor demo state.

**Why this fails:** broken links look valid, crawlers index false pages, and a visitor cannot distinguish an invalid address from the product. Demo deep linking is broken.

**Concrete fix:** add a styled not-found page with a route home and correct 404 response where the host permits it; implement `/demo` as a real route titled “Demo — Booking Side Notes”; add both routing cases to tests and include real routes in the sitemap.

### F-1-48 — Earlier security-header follow-up remains incomplete

**Location:** prior `.factory/handoff.md`, “add CSP/frame/permissions response policies.”

**Evidence:** live responses now include `Referrer-Policy` and `X-Content-Type-Options`, but no `Content-Security-Policy`, frame restriction (`frame-ancestors` or `X-Frame-Options`), or `Permissions-Policy`. No `staticwebapp.config.json` exists in the repository.

**Why this fails:** the historical gap is only partly fixed and the review instructions make an unfixed earlier finding blocking again.

**Concrete fix:** commit host configuration with a CSP matching the app’s actual same-origin resources and Sociobot billing connection, `frame-ancestors`, and a minimal `Permissions-Policy`; verify response headers on every HTML route.

### F-1-49 — Earlier caching and manifest-MIME follow-up remains unfixed

**Location:** prior `.factory/handoff.md`, “use immutable caching (plus `application/manifest+json`) for static assets.”

**Evidence:** `/assets/app-mark.svg` returns `cache-control: public, must-revalidate, max-age=30`; `/manifest.webmanifest` returns `application/octet-stream` with the same 30-second policy.

**Why this fails:** this is an explicitly recorded historical gap and remains unfixed.

**Concrete fix:** serve hashed immutable assets with a long immutable policy, serve the manifest as `application/manifest+json`, retain short/no-cache behavior for HTML and service-worker entry points, and add response-header tests.

### F-1-50 — Earlier malformed-backup error remains raw and unactionable

**Location:** prior `.factory/handoff.md`; live “Import backup.”

**Evidence:** importing `{not valid` displays `Expected property name or '}' in JSON at position 1 (line 1 column 2)`.

**Why this fails:** it exposes parser language and does not say what happened, why, and what to do next. This historical gap remains unfixed.

**Concrete fix:** catch JSON syntax errors separately and show “This backup is not valid JSON. Choose a Booking Side Notes backup exported by this app.” Add a browser test for malformed and structurally invalid files.

## Findings — minor

### F-1-51 — Route metadata is incomplete

**Location:** all live routes.

**Evidence:** `/`, `/privacy/`, and `/terms/` each have a suitable title, description, language, one H1, and an SVG favicon. None has a canonical URL, Open Graph metadata, Twitter card metadata, a 1200×630 social image, or an Apple touch icon. `/demo` and the false 404 reuse the home title. The sitemap lists only `/`, `/privacy/`, and `/terms/`.

**Concrete fix:** add per-route canonical/OG/Twitter fields, original 1200×630 art, Apple touch icon, correct demo/404 titles, and a complete sitemap.

### F-1-52 — Header, footer, and route focus are not consistent

**Location:** home, privacy, and terms routes.

**Evidence:** the home header has no navigation and hides the wordmark text at 390 px; legal headers contain only the wordmark. Legal pages have no skip link. Footers use different structures and omit “Built by Param Factory” and a version/build ID. After keyboard navigation from home to Privacy, focus was on `BODY`, not the new H1; Back returned home but again left focus on `BODY`.

**Concrete fix:** share one header/nav/skip-link/footer component or equivalent static markup on every route; include Demo, Privacy, and Terms as appropriate; include the required factory/build footer text; focus and announce the H1 after navigation and history traversal.

### F-1-53 — The landing structure omits required explanation sections

**Location:** landing page between the live workspace and pricing/data controls.

**Evidence:** there is no “How it works” sequence in three plain verb-led steps and no dedicated plain-language “What it does not do / privacy” section. Boundaries exist only in README/legal copy, while the landing jumps from an empty workspace to export and paid controls.

**Concrete fix:** after a used live preview, add three concise steps (“Import appointments,” “Pin side notes,” “Print or export the day”) and a short boundary section (“Does not change your calendar,” “Does not send reminders,” “Stores data in this browser”).

### F-1-54 — One README sentence exceeds the 22-word cap

**Location/quote:** README opening, 28 words: “Import a day of appointments from an ICS file, then pin callbacks, access details, supplier delays, and follow-ups beside those bookings without creating fake events or blocking availability.”

**Concrete fix:** “Import a day’s appointments from an ICS file. Pin callbacks, access details, delays, and follow-ups without blocking bookable time.”

### F-1-55 — “A field map for the working day” is a metaphorical heading

**Why this fails:** out of context it describes a map, not an appointment-note tool.

**Concrete fix:** “Side notes for an appointment day.”

### F-1-56 — “Operational details” is abstract jargon

**Location:** hero sentence.

**Concrete fix:** “Import appointments and pin callbacks, access details, delays, and follow-ups beside them.”

### F-1-57 — “Appointments are the route. Side notes are the flags.” substitutes two new terms

**Why this fails:** the visual caption makes visitors translate route→appointments and flags→side notes.

**Concrete fix:** “Appointments keep their time. Side notes sit beside them.”

### F-1-58 — “Uncharted day” does not describe the empty state

**Concrete fix:** “No appointments yet.”

### F-1-59 — “Margin ledger” does not make sense as a standalone heading

**Concrete fix:** “Side notes for this day.”

### F-1-60 — “The margin is clear” hides the empty-state result

**Concrete fix:** “No side notes yet.”

### F-1-61 — “Take the route with you” does not name the export job

**Concrete fix:** “Print or export the daily brief.”

### F-1-62 — “Your data, in your hands” does not name the backup job

**Concrete fix:** “Back up or restore your data.”

### F-1-63 — README uses unexplained product and implementation jargon

**Location/quotes:** “local-first companion,” “ICS,” “UID,” “time-anchored,” “appointment-linked,” “nonblocking contract,” “PWA,” “IndexedDB,” and “runtime CDN dependencies.”

**Why this fails:** the audience description mixes owner-facing language with implementation terms before defining them.

**Concrete fix:** open with “A browser tool for small appointment businesses. Import an `.ics` calendar file and keep side notes on this device.” Keep UID/IndexedDB/PWA/CDN details in a clearly technical section and rewrite “nonblocking contract” as “Side notes never change the source calendar.”

### F-1-64 — “Appointment” and “booking” are used for the same record

**Location:** “Import appointments,” “0 bookings,” “booking slot,” README “those bookings.”

**Concrete fix:** use “appointment” everywhere except the product name; use “bookable time” only for availability.

### F-1-65 — The interface renames a side note as an action, flag, pin, marker, and margin entry

**Location:** “0 open actions,” “Side notes are the flags,” “Quick pin,” “Nonblocking marker,” and “Margin ledger.”

**Concrete fix:** use “side note” consistently: “0 open side notes,” “Quick note,” “Add a side note,” and “Side notes for this day.” Reserve the map vocabulary for decoration, not instructions.

### F-1-66 — “Data & license” is not a result-naming button

**Location:** the first and only visible phone button in the header.

**Concrete fix:** “Manage data and license,” or split it into destination links with explicit names.

### F-1-67 — “Verify” does not name what will be verified

**Location:** license restore form.

**Concrete fix:** “Verify license.”

### F-1-68 — Several phone targets are smaller than 44 px

**Location/evidence:** at 390 px the home wordmark link is 40×40, “Data & license” is 123×40, and footer Privacy/Terms links have 14 px-high boxes. Axe reported no serious/critical rule violations, but these fail the explicit 44 px touch-target baseline.

**Concrete fix:** give every interactive target at least a 44×44 CSS box, including header and footer links; retain the visible 3 px focus treatment.

### F-1-69 — Re-importing an updated day leaves cancelled appointments behind

**Location:** ICS import workflow; missed-leverage check implied by “imports a day’s ICS events.”

**Evidence:** I imported `Kept appointment` plus `Cancelled appointment`, then imported a newer same-day ICS containing only `Kept appointment`. The live page still showed both appointments. There is no appointment/day deletion control.

**Why this matters:** a normal appointment business expects a refreshed day export to reflect cancellations. Stale appointments can attach work to a booking that no longer exists.

**Concrete fix:** offer a previewed “Replace this day’s appointments” import mode that removes missing events after confirmation; preserve attached notes as clearly marked unlinked notes or ask how to handle them. Add a reconciliation test. An AI feature is not justified here; deterministic import reconciliation is the useful missing step. No Azure/provider key is embedded in the current code.

## Full copy audit

Counts treat hyphenated terms and URLs as one word. The cold rendered landing page contains 30 sentences/headline fragments, 207 words, average 6.9 words. README contains 34 prose statements, 357 words, average 10.5 words. Only README item R2 exceeds 22 words. “Flag” references the finding that supplies its rewrite; `C` identifies an unlisted claim above.

### Landing page

| Ref | Words | Exact sentence or standalone heading | Audit |
| --- | ---: | --- | --- |
| L1 | 7 | A field map for the working day | F-1-55 |
| L2 | 3 | Keep the note. | F-1-1 |
| L3 | 4 | Keep the slot open. | F-1-1 |
| L4 | 11 | Import appointments, pin the operational details beside them, and stay bookable. | F-1-4, F-1-56 |
| L5 | 6 | Nothing here changes your calendar availability. | F-1-5 |
| L6 | 9 | Local by default — client details stay in this browser. | F-1-6; “local by default” is less direct than “Stored in this browser” |
| L7 | 4 | Appointments are the route. | F-1-57 |
| L8 | 5 | Side notes are the flags. | F-1-57, F-1-65 |
| L9 | 6 | No appointments imported for this date | Clear |
| L10 | 7 | Choose an ICS file from your calendar. | “ICS” is undefined; say “Choose an `.ics` calendar export.” |
| L11 | 12 | We retain only the appointment name, time, and location on this device. | F-1-8; factually incomplete |
| L12 | 4 | The margin is clear | F-1-60 |
| L13 | 8 | Add a callback, access detail, follow-up, or delay. | Clear |
| L14 | 12 | It will be anchored to the day without occupying a booking slot. | F-1-9, F-1-64; rewrite “The side note stays beside the day and does not block appointment time.” |
| L15 | 5 | Take the route with you | F-1-61 |
| L16 | 10 | Print a clean daily brief or save a plain-text copy. | F-1-10 |
| L17 | 5 | Data export is always free. | F-1-11 |
| L18 | 5 | Your data, in your hands | F-1-62 |
| L19 | 13 | Back up or move every imported appointment and note as one JSON file. | F-1-12; define JSON as “backup file” first |
| L20 | 12 | Importing a backup replaces the data on this device only after confirmation. | F-1-13 |
| L21 | 4 | Pin routine notes faster | Clear, but standardize “add” versus “pin” under F-1-65 |
| L22 | 10 | Unlock one-tap phrases for callbacks, access checks, suppliers, and follow-ups. | F-1-14 |
| L23 | 9 | The complete note workflow, print, and exports stay free. | F-1-15 |
| L24 | 3 | Have a license? | Clear |
| L25 | 2 | Restore it. | Clear |
| L26 | 2 | One-time purchase. | F-1-16 |
| L27 | 6 | Sociobot/Dodo is the merchant of record. | F-1-17; unexplained commercial term; rewrite “Sociobot/Dodo handles payment and receipts.” |
| L28 | 8 | Refunds are handled there and revoke the license. | F-1-18; “there” has an unclear referent; rewrite “Sociobot/Dodo handles refunds. A refund disables Trail Kit.” |
| L29 | 10 | Booking Side Notes · A private field map for your day | F-1-55; rewrite footer one-liner with the actual job |
| L30 | 5 | Illustration generated for this product. | Clear |

Initial-dialog copy was also checked: “This creates no calendar event and blocks no time.” (9, F-1-19); “For example: ‘Call before arrival; side gate code is in the job sheet.’” (12, clear); “Marks it due in the ledger; this app sends no notifications.” (10, F-1-20 and “ledger” jargon). No banned marketing adjective from the supplied plain-words list appears.

### README

| Ref | Words | Exact sentence or standalone statement | Audit |
| --- | ---: | --- | --- |
| R1 | 11 | Booking Side Notes is a local-first companion for small appointment businesses. | F-1-21, F-1-63 |
| R2 | 28 | Import a day of appointments from an ICS file, then pin callbacks, access details, supplier delays, and follow-ups beside those bookings without creating fake events or blocking availability. | F-1-22, F-1-54, F-1-64 |
| R3 | 4 | Live product: https://booking-side-notes.sociobot.in | Clear |
| R4 | 13 | Imports ICS appointments locally and retains only the UID, name, time, and location. | F-1-23, F-1-63 |
| R5 | 10 | Adds time-anchored or appointment-linked notes with completion and reminder status. | F-1-24, F-1-63 |
| R6 | 13 | Makes the nonblocking contract explicit: side notes never write to the source calendar. | F-1-25, F-1-63 |
| R7 | 7 | Prints or downloads a plain-text daily brief. | F-1-26 |
| R8 | 9 | Exports and restores the complete local archive as JSON. | F-1-27 |
| R9 | 12 | Installs as an offline PWA and works at phone and desktop sizes. | F-1-28, F-1-63 |
| R10 | 13 | Offers an optional US $12 one-time Trail Kit license for one-tap note phrases. | F-1-29 |
| R11 | 8 | Core notes, print, and data export are free. | F-1-30 |
| R12 | 12 | Calendar data and notes are stored in IndexedDB on the current device. | F-1-31, F-1-63 |
| R13 | 10 | There is no account, analytics, background sync, or data upload. | F-1-32 |
| R14 | 5 | See the in-product privacy policy. | Clear |
| R15 | 5 | Requires Node.js 20 or newer. | F-1-34 |
| R16 | 3 | Open http://127.0.0.1:5173. | Clear |
| R17 | 11 | The app uses system fonts and has no runtime CDN dependencies. | F-1-33, F-1-63 |
| R18 | 9 | The exact deployment build command is `npm run build`. | F-1-35 |
| R19 | 11 | Static output is written to `dist/`, with `dist/index.html` at its root. | F-1-36 |
| R20 | 20 | The post-build step inlines the small critical app shell and injects the hashed assets into the service worker cache list. | F-1-37; technical but appropriate in build section |
| R21 | 4 | For a clean-clone verification: | Clear |
| R22 | 5 | Playwright is pinned to 1.58.2. | F-1-38 |
| R23 | 21 | In the factory image its Chromium build is already available through `PLAYWRIGHT_BROWSERS_PATH`; elsewhere, run `npx playwright install chromium` once. | F-1-39; two ideas—split after the semicolon |
| R24 | 11 | Deploy the contents of `dist/` to a static host with HTTPS. | Clear instruction |
| R25 | 7 | Do not deploy repository or source files. | Clear instruction |
| R26 | 19 | The optional purchase link uses the Sociobot hosted checkout at `/api/v1/products/booking-side-notes/checkout`; the factory must register the product before release. | F-1-40; two ideas—split; release prerequisite is currently unmet |
| R27 | 6 | No payment provider is embedded here. | F-1-41 |
| R28 | 11 | This is not a scheduler, CRM, calendar host, or notification service. | F-1-42; “CRM” is undefined; say “customer database” |
| R29 | 16 | It does not expand recurring-event rules itself; import an ICS export containing the instances you need. | F-1-43; “recurring-event rules/instances” is technical; split and give a concrete export instruction |
| R30 | 9 | It does not send SMS, email, or push reminders. | F-1-44 |
| R31 | 16 | Browser storage can be cleared by the user or device, so regular JSON backups are recommended. | F-1-45; rewrite “Your browser or device can erase local data. Export a backup regularly.” |
| R32 | 8 | Design rationale and asset provenance are in `.factory/design.md`. | Clear |
| R33 | 7 | The work-order verification record is in `.factory/handoff.md`. | Clear |
| R34 | 3 | MIT — see `LICENSE`. | Clear |

### Terminology table

| Concept | Terms currently used | Required single term |
| --- | --- | --- |
| Imported calendar record | appointment, booking, route | appointment |
| Local operational item | note, side note, action, flag, pin, marker, margin entry | side note |
| Availability | slot, booking slot, calendar availability, bookable time | bookable time (with “does not change your calendar” where precision is needed) |
| Reminder state | reminder, reminder due, reminder sent, acknowledged | reminder status; use “due” and “acknowledged” consistently |

### Controls

The result-naming controls that pass are “Import calendar,” “Add side note,” “Choose an ICS file,” “Print daily brief,” “Export daily brief,” “Export all data,” “Import backup,” “Buy Trail Kit — $12,” “Save side note,” “Update app,” and the edit/delete accessible names. “Data & license” and “Verify” fail as recorded in F-1-66 and F-1-67. “Cancel” is a conventional result-naming verb.

## Demo, privacy, offline, and accessibility evidence

- Demo isolation: **FAIL**, with demonstrated cross-read and cross-write into the real IndexedDB namespace (F-1-2).
- Offline: after one live visit and service-worker control, `context.setOffline(true)`, `fetch('/')`, reload, and local note creation succeeded. The status changed to “Offline · on device.” This behavior remains an unlisted claim.
- Privacy exercise: from a fresh unlicensed context, importing an ICS fixture containing a client name, address, UID, description, and attendee; adding a note; and exporting data produced only same-origin image requests after initial load. Stored data discarded description/attendee but retained UID, name, start/end, location, and note. This confirms the network behavior for that path but exposes F-1-8 and does not replace a claim test.
- Accessibility: Axe reported no serious/critical violations on `/`, `/privacy/`, or `/terms/`. One H1, `lang`, `main`, alt handling, visible 3 px focus, dialog Escape/return focus, reduced-motion CSS, and no 390 px horizontal overflow were confirmed. Touch targets and route focus still fail F-1-52/F-1-68.
- Console: no console errors on fresh mobile or desktop load.
- Visual identity: **PASS**. The topographic paper/map art, survey marks, serif/sans pairing, burnt-orange pins, and teal route language are recognizable and match `.factory/design.md`; this is not a generic gradient/card SaaS template. The wording overuses the metaphor, but the visual system itself is distinct.
- AI: no decorative AI runtime feature, Azure endpoint, or provider key was found. AI is not an obvious fit for this deterministic local workflow. The missed leverage is calendar reconciliation (F-1-69), not an AI bolt-on.

## Claim and quality-gate execution

Clean clone: `/tmp/booking-clean.Q8SPu5` at the reviewed commit.

| Check | Result | Evidence |
| --- | --- | --- |
| Commands listed by `.factory/claims.json` | **NOT RUN / BLOCKED** | File absent; zero listed claims; F-1-3 through F-1-45 remain untested. |
| `npm ci` | PASS | 60 packages installed; 0 vulnerabilities. |
| `npm test` | PASS | 5/5 Vitest tests. |
| `npm run build` | PASS | `dist/` produced; JS 25.78 kB raw / 8.86 kB gzip; CSS 17.14 kB raw / 4.70 kB gzip. |
| `npm run test:e2e` | PASS | 3/3 Chromium tests: core import/note flow, axe scan, and 390 px offline reload. |
| Live link crawl | FAIL | Purchase URL 404; ordinary internal links 200; false routes also incorrectly 200. |

Passing broad tests does not offset missing claim tests or the unsafe/missing demo.

## History verification

No earlier `.factory/review-*.md` or `.factory/polish-*.md` files exist. The earlier `.factory/handoff.md` was read in full and checked on both live deployment and code.

| Earlier handoff item | Current result |
| --- | --- |
| Add CSP/frame/permissions policies | Partly fixed only: referrer/nosniff exist; CSP/frame/permissions remain absent. **BLOCKING: F-1-48.** |
| Add immutable caching and correct manifest MIME | Still 30-second revalidation; manifest is octet-stream. **BLOCKING: F-1-49.** |
| Replace raw malformed-JSON error | Reproduced verbatim. **BLOCKING: F-1-50.** |
| Register live billing product | Checkout returns 404. **BLOCKING: F-1-46.** |
| Core import/note/offline/axe claims in verification narrative | Rechecked and broadly reproduced, but remain unlisted and not demo-sandboxed. **BLOCKING: F-1-3 through F-1-45.** |

## What would make this perfect

Nothing should remain after the next pass. Specifically:

1. Make the phone first screen state the job, audience, first action, and three facts without scrolling.
2. Ship a real one-click, prefilled, offline-capable `/demo` with isolated storage, banner, reset, exit, documentation, and isolation tests.
3. Create the complete claim registry and make every retained landing/README promise pass its tagged observable test from that demo.
4. Register or remove the dead paid offer.
5. Add real demo and 404 routing, full per-route metadata, consistent navigation/footer, route focus, security headers, correct caching/MIME, and 44 px targets.
6. Apply every copy rewrite, standardize terminology, and make malformed-import recovery actionable.
7. Reconcile replaced/cancelled appointments on repeat day imports with a preview and explicit note handling.
8. Re-run this entire checklist from fresh mobile/desktop contexts and return `PASS` only with zero findings and zero untested claims.
