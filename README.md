# Booking Side Notes

Keep side notes beside appointments without changing bookable time.

Booking Side Notes is for small appointment businesses. Import an `.ics` calendar file, then keep callbacks, access details, delays, and follow-ups beside the appointment. The app is a browser tool, not a calendar or customer database.

Try it immediately at [the sample demo](https://booking-side-notes.sociobot.in/demo). The demo has a separate local database and can be reset at any time.

## What it does

- Imports appointment ID, name, start and end times, and location from an `.ics` calendar export.
- Adds appointment-linked or day-level side notes with completion and reminder status.
- Replaces an imported day after confirmation. Side notes for missing appointments remain as clearly marked unlinked notes.
- Prints or downloads a daily brief and exports one JSON backup file.

Appointment details and side notes stay in this browser. Side notes do not change appointments or block appointment time. The app works offline after the first visit. No purchase is required for side notes, daily briefs, or backups. Each of these promises is listed and tested in [`.factory/claims.json`](.factory/claims.json).

## Run and test

Use Node.js 20 or newer for local development.

```sh
npm ci
npm run dev
```

Open <http://127.0.0.1:5173>. The project uses system fonts and has no runtime CDN dependencies.

```sh
npm test
npx tsc --noEmit
npm run build
npm run test:e2e
```

`npm run build` writes the static site to `dist/`, with `dist/index.html` at its root. Playwright is pinned to 1.58.2. If Chromium is not already installed, run `npx playwright install chromium` once.

## Deploy

Deploy the contents of `dist/` to an HTTPS static host. The repository includes `staticwebapp.config.json` for routing, security headers, cache policy, and manifest MIME type. Do not deploy source files.

## Boundaries

This tool does not schedule appointments, change calendar availability, send notifications, or expand recurring calendar rules. Export the appointment instances you need from your calendar. Browser storage can be cleared, so export a backup regularly.

See [Privacy](https://booking-side-notes.sociobot.in/privacy/) and [Terms](https://booking-side-notes.sociobot.in/terms/). Design rationale and asset provenance are in [`.factory/design.md`](.factory/design.md).

## License

MIT — see [LICENSE](LICENSE).
