# Booking Side Notes

Booking Side Notes is a local-first companion for small appointment businesses. Import a day of appointments from an ICS file, then pin callbacks, access details, supplier delays, and follow-ups beside those bookings without creating fake events or blocking availability.

Live product: <https://booking-side-notes.sociobot.in>

## What it does

- Imports ICS appointments locally and retains only the UID, name, time, and location.
- Adds time-anchored or appointment-linked notes with completion and reminder status.
- Makes the nonblocking contract explicit: side notes never write to the source calendar.
- Prints or downloads a plain-text daily brief.
- Exports and restores the complete local archive as JSON.
- Installs as an offline PWA and works at phone and desktop sizes.
- Offers an optional US $12 one-time Trail Kit license for one-tap note phrases. Core notes, print, and data export are free.

Calendar data and notes are stored in IndexedDB on the current device. There is no account, analytics, background sync, or data upload. See the in-product [privacy policy](https://booking-side-notes.sociobot.in/privacy/).

## Develop

Requires Node.js 20 or newer.

```sh
npm install
npm run dev
```

Open <http://127.0.0.1:5173>. The app uses system fonts and has no runtime CDN dependencies.

## Test and build

```sh
npm test             # domain and ICS unit tests
npm run test:e2e     # Chromium: workflow, axe, 390px, and offline mode
npx tsc --noEmit     # strict type check
npm run build        # production output -> dist/
```

The exact deployment build command is `npm run build`. Static output is written to `dist/`, with `dist/index.html` at its root. The post-build step inlines the small critical app shell and injects the hashed assets into the service worker cache list.

For a clean-clone verification:

```sh
npm ci
npm test
npm run build
```

Playwright is pinned to 1.58.2. In the factory image its Chromium build is already available through `PLAYWRIGHT_BROWSERS_PATH`; elsewhere, run `npx playwright install chromium` once.

## Deployment and billing

Deploy the contents of `dist/` to a static host with HTTPS. Do not deploy repository or source files. The optional purchase link uses the Sociobot hosted checkout at `/api/v1/products/booking-side-notes/checkout`; the factory must register the product before release. No payment provider is embedded here.

## Product boundaries

This is not a scheduler, CRM, calendar host, or notification service. It does not expand recurring-event rules itself; import an ICS export containing the instances you need. It does not send SMS, email, or push reminders. Browser storage can be cleared by the user or device, so regular JSON backups are recommended.

Design rationale and asset provenance are in [`.factory/design.md`](.factory/design.md). The work-order verification record is in [`.factory/handoff.md`](.factory/handoff.md).

## License

MIT — see [LICENSE](LICENSE).
