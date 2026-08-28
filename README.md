# Booking Side Notes

Keep side notes beside appointments without changing bookable time.

Booking Side Notes is for small appointment businesses. Import an `.ics` calendar file. Keep callbacks, access details, delays, and follow-ups beside each appointment.

Try it immediately at [the sample demo](https://booking-side-notes.sociobot.in/?demo=1). The demo uses separate local storage. Leaving it or choosing Reset demo restores the original sample.

## What it does

- Imports appointment ID, name, start and end times, and location from an `.ics` calendar export.
- Adds side notes for one appointment or the whole day. Mark each done and set its reminder status.
- Replaces an imported day after confirmation. Side notes for missing appointments remain clearly marked as unlinked.
- Prints or downloads a daily brief and exports one backup file.

Appointment details and side notes stay in this browser. Side notes do not change appointments or bookable time. The app works offline after the first visit. No purchase is required for side notes, daily briefs, or backups. The app has no account or background sync. It loads no third-party files.

Each product promise is listed and tested in [`.factory/claims.json`](.factory/claims.json).

## Run and test

The package declares Node.js 20 or newer for local development.

```sh
npm ci
npm run dev
```

Open <http://127.0.0.1:5173>.

```sh
npm test
npx tsc --noEmit
npm run build
npm run test:e2e
```

`npm run build` writes the static site to `dist/`, with `dist/index.html` at its root. Playwright is pinned to 1.58.2. If Chromium is not installed, run `npx playwright install chromium` once.

## Deploy

Deploy the contents of `dist/` to an HTTPS static host. `staticwebapp.config.json` contains host settings for routes, security, caching, and the app manifest. Do not deploy source files.

## Boundaries

Side notes do not change appointments or bookable time. The app does not send notifications. Export each appointment you need from your calendar. Browser storage can be cleared, so export a backup regularly.

See [Privacy](https://booking-side-notes.sociobot.in/privacy/) and [Terms](https://booking-side-notes.sociobot.in/terms/). Design rationale and asset provenance are in [`.factory/design.md`](.factory/design.md).

## License

MIT — see [LICENSE](LICENSE).
