# Handoff — adversarial review 5

## Completed

- Reviewed live build `80c9008` cold at 390×844 and 1440×900.
- Audited landing/demo/README copy, all 13 claims, demo storage and offline
  behavior, routes, links, metadata, focus, accessibility, security headers,
  visual identity, missed leverage, and every earlier finding.
- Wrote `.factory/review-5.md` with verdict **FAIL**, one blocking finding and
  one minor finding.
- Did not modify product code.

## Verification

- Separate clean clone:
  `/tmp/booking-side-notes-review5-clean.2x9b0k` at
  `80c90083ec7b7f773927d3947cc6fdb7087a6989`.
- `npm ci`: passed, 0 vulnerabilities.
- Every exact `.factory/claims.json` command: passed independently, 13/13.
- Main clean worktree: `npm test` 10/10; `npx tsc --noEmit` passed;
  `npm run build` passed; `npm run test:e2e` 16/16.
- Live normal routes had no console errors, no serious/critical Axe findings,
  and no dead HTTP links. Unknown routes return the designed HTTP 404.
- Live privacy/offline exercise used only the product origin; cached `/demo`
  reloaded offline with sample data.

## Findings left for the repair round

- **F-5-1 / F-1-2 reopened (blocking):** demo edits survive the wordmark and
  browser Back exit paths and reappear on re-entry. Only Reset demo and Start
  for real currently delete `booking-side-notes-demo`.
- **F-5-2 (minor):** README uses the calendar jargon “appointment instances.”

The concrete repairs and regression-test requirements are in
`.factory/review-5.md`.
