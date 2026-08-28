# Polish 1 — finding disposition

Evidence key: **E2E** is `npm run test:e2e`; **unit** is `npm test`; **build**
is `npm run build`; **desktop** is `.factory/evidence/demo-desktop.png`; and
**mobile** is `.factory/evidence/home-mobile.png`. The live check is recorded
in the handoff after deployment.

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Rewrote the phone-first screen with job, audience, visible demo/import actions, action result, and three facts. | mobile; E2E routes/mobile test |
| F-1-2 | Added `/demo` and `?demo=1`, separate demo IndexedDB, sample day, persistent banner, reset, exit, and documentation. | `@claim:demo-isolated`; desktop |
| F-1-3 | Added `claims.json` and one tagged observable test per retained claim. | all `@claim:` E2E tests |
| F-1-4 | Narrowed import language and test-covered it through reconciliation. | `@claim:import-reconciliation` |
| F-1-5 | Kept the calendar boundary and tested event count plus zero blocked minutes. | `@claim:calendar-unchanged` |
| F-1-6 | Kept the local-data statement and checked all demo-flow request origins. | `@claim:local-no-upload` |
| F-1-7 | Kept the zero-blocked-minutes display and asserted it after note creation. | `@claim:calendar-unchanged` |
| F-1-8 | Corrected retained fields to include ID and end time; added exported-archive field test. | `@claim:minimal-calendar-fields` |
| F-1-9 | Rewrote the note boundary and asserted no event/count change. | `@claim:calendar-unchanged` |
| F-1-10 | Kept print/download as a tested daily-brief result. | `@claim:daily-brief` |
| F-1-11 | Replaced pricing language with no-purchase-required and tested the full free workflow. | `@claim:no-purchase-required` |
| F-1-12 | Kept one-file backup export and tested its complete sample records. | `@claim:backup-export` |
| F-1-13 | Kept confirmation wording and tested cancel and confirm replacement branches. | `@claim:backup-restore` |
| F-1-14 | Removed the unregistered paid quick-phrase promise and dead feature. | E2E no-purchase test |
| F-1-15 | Replaced it with the tested no-purchase-required statement. | `@claim:no-purchase-required` |
| F-1-16 | Removed unverified one-time-purchase copy. | desktop; source review |
| F-1-17 | Removed merchant-of-record copy with the unavailable checkout. | desktop; source review |
| F-1-18 | Removed unverified refund/revocation copy. | desktop; source review |
| F-1-19 | Kept plain note-editor boundary and tested event preservation. | `@claim:calendar-unchanged` |
| F-1-20 | Kept notification boundary and tested permission/push state. | `@claim:no-notifications` |
| F-1-21 | Rewrote README audience in plain language and registered local behavior. | README; `@claim:local-no-upload` |
| F-1-22 | Split README workflow copy and tested import plus note-safe reconciliation. | README; `@claim:import-reconciliation` |
| F-1-23 | Rewrote exact retained fields and tested exported data. | `@claim:minimal-calendar-fields` |
| F-1-24 | Simplified README to tested note/status behavior. | E2E workflow tests |
| F-1-25 | Replaced jargon with direct calendar-boundary copy. | `@claim:calendar-unchanged` |
| F-1-26 | Registered and tested daily brief printing/download. | `@claim:daily-brief` |
| F-1-27 | Kept export/restore language and tested each branch. | `@claim:backup-export`, `@claim:backup-restore` |
| F-1-28 | Narrowed offline/device wording and explicitly tested offline demo at 390 px. | `@claim:offline-after-first-visit` |
| F-1-29 | Removed the unavailable paid offer and price. | desktop; source review |
| F-1-30 | Replaced with tested no-purchase-required copy. | `@claim:no-purchase-required` |
| F-1-31 | Replaced implementation-jargon privacy copy with browser-local behavior. | `@claim:local-no-upload` |
| F-1-32 | Rewrote privacy copy and asserted only same-origin requests in the complete demo action path. | `@claim:local-no-upload` |
| F-1-33 | Retained only technical setup wording, not a visitor promise. | unit/build |
| F-1-34 | Kept Node requirement as development documentation. | `package.json`; build |
| F-1-35 | Kept exact build command and ran it. | build |
| F-1-36 | Kept output-path documentation and verified dist root. | build |
| F-1-37 | Removed stale critical-shell implementation claim. | build/source review |
| F-1-38 | Kept pinned Playwright setup as developer documentation. | `package.json` |
| F-1-39 | Split environment setup wording and removed factory-environment promise. | README |
| F-1-40 | Removed dead checkout documentation. | README/source review |
| F-1-41 | Removed payment integration and its claim entirely. | source review |
| F-1-42 | Rewrote product boundaries in plain language. | README; desktop |
| F-1-43 | Rewrote recurring-calendar boundary in plain language. | README |
| F-1-44 | Kept notification boundary with direct browser-state test. | `@claim:no-notifications` |
| F-1-45 | Rewrote backup advice in plain language. | README |
| F-1-46 | Removed the dead Trail Kit checkout, price, and license UI. | desktop; link crawl E2E |
| F-1-47 | Added `/demo` title/state and a designed `404.html` plus SPA not-found state. | E2E routes/not-found |
| F-1-48 | Added static-host CSP, frame protection, permissions policy, nosniff, and referrer policy. | unit config test; build |
| F-1-49 | Added immutable asset cache policy, no-cache SW, manifest MIME, and copied host config to dist. | unit config test; build |
| F-1-50 | Caught JSON syntax errors and show recovery guidance. | E2E malformed-backup test |
| F-1-51 | Added canonical, OG, Twitter, social image, Apple icon, demo title, 404 metadata, and sitemap demo URL. | E2E routes; build |
| F-1-52 | Added consistent header/nav/footer/skip links and route-title focus/announcement. | E2E routes/focus; mobile |
| F-1-53 | Added three-step “How it works” and direct boundary sections. | desktop |
| F-1-54 | Rewrote README opening into short sentences. | `.factory/copy-audit.md` |
| F-1-55 | Replaced the metaphorical heading with the job headline. | mobile |
| F-1-56 | Replaced “operational details” with callbacks and access details. | mobile |
| F-1-57 | Replaced route/flags instructions with appointment/side-note language. | desktop |
| F-1-58 | Replaced “Uncharted day” with “No appointments yet.” | E2E empty state |
| F-1-59 | Replaced “Margin ledger” with “Side notes for this day.” | desktop |
| F-1-60 | Replaced “The margin is clear” with “No side notes yet.” | E2E empty state |
| F-1-61 | Replaced export metaphor with “Print or export the daily brief.” | desktop |
| F-1-62 | Replaced backup metaphor with “Back up or restore your data.” | desktop |
| F-1-63 | Removed unexplained audience-facing implementation jargon. | README/copy audit |
| F-1-64 | Standardized imported records as “appointments” and capacity as “bookable time.” | copy audit |
| F-1-65 | Standardized local work items as “side notes.” | copy audit |
| F-1-66 | Removed ambiguous Data & license control and dead license surface. | mobile; source review |
| F-1-67 | Removed unused license verification control. | source review |
| F-1-68 | Made header/footer links and controls at least 44 px; mobile layout is checked at 390 px. | mobile; E2E axe/mobile |
| F-1-69 | Added confirmed replacement import that removes missing events and preserves their notes as unlinked. | `@claim:import-reconciliation` |

The retained visual system is the product’s original topographic-cartography
system. The repairs change language and behavior, not its map-paper identity.
