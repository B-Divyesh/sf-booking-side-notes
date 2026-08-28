# Booking Side Notes — visual thesis

## Direction: topographic cartography

This product is a field map for a working day. Bookings are fixed landmarks; side notes are removable annotations pinned beside the route. The interface borrows the quiet precision of an Ordnance Survey sheet—contour lines, coordinate ticks, paper fibres, route markers—without pretending that a note occupies calendar territory. This makes the central product distinction visible: an appointment has duration, while an operational note has an anchor and no capacity.

The direction is deliberately single-mode. A warm, explicitly painted paper surface is integral to the “working field map” metaphor; it is tuned for long daytime use and print. Native form controls declare `color-scheme: light`.

## Palette

All color is encoded as CSS custom properties.

| Token | Value | Use |
| --- | --- | --- |
| `--paper` | `#F3EFDF` | page/map stock |
| `--paper-raised` | `#FFFCF1` | inputs and floating sheets |
| `--ink` | `#172D29` | primary text; deep survey green |
| `--ink-soft` | `#49605A` | supporting text |
| `--contour` | `#B9B29A` | map lines and quiet borders |
| `--trail` | `#B84D2C` | primary actions and note markers |
| `--trail-dark` | `#7E2E18` | active/hover state |
| `--lake` | `#176B70` | appointment landmarks and links |
| `--moss` | `#386A3E` | complete/ready status |
| `--sun` | `#A35D00` | reminders/warnings |
| `--danger` | `#A02E2E` | destructive/error state |

The minimum body-text contrast is 7:1 on paper. Color is never the only state cue: status always has text, shape, or an icon.

## Type and spacing

- Display and wayfinding: Georgia, Cambria, `Times New Roman`, serif. The cartographic/editorial character belongs to headings only.
- Operational text and controls: Inter-like native system stack (`ui-sans-serif`, system UI, sans-serif). No font downloads, no CDN, no layout shift.
- Scale: 14px label, 16px body, 18px lead, 24px section, clamp(32–54px) title.
- Body line height: 1.55; reading measure: 68 characters.
- Spacing follows a 4px base with primary stops at 8, 12, 16, 24, 32, 48, and 64px.
- Controls are at least 44px in both axes. Page content is capped at 1180px.

## Interaction grammar

- Appointments are horizontal teal “landmarks” with a solid time rail.
- Notes are burnt-orange numbered pins connected to a dotted side rail. They never visually fill a time range.
- Completed notes fade and receive a line-through; a clear text label carries the state.
- Editing happens in a small field-sheet dialog that opens from the originating marker and returns focus there on close.
- Primary actions are solid trail-orange. Secondary actions resemble outlined map stamps. Text links use lake teal and underline.
- Desktop shows itinerary and note ledger side by side. At 820px the ledger stacks beneath the day route; at 390px metadata compresses and actions become full-width where useful.
- Empty and error states are map legends with a single explicit next step. Offline status is always visible in the masthead.

## Motion

State transitions use 180–240ms opacity and translate changes: sheets lift by 4px, pins settle from their anchor, and the update toast enters from the bottom edge. Nothing loops. Under `prefers-reduced-motion: reduce`, animation and smooth scrolling are removed and all state changes are instantaneous. Print has no motion or decorative contours.

## Asset plan and provenance

The hero image is an original AI-generated editorial still-life that clarifies the product metaphor: an appointment card is a map landmark, while removable note flags sit beside it without covering the route. UI icons and the app mark are original hand-authored SVG linework.

### Prompt sheet

- Use case: stylized-concept
- Asset: compact landing/workspace hero illustration, 3:2 landscape
- Subject: an overhead topographic paper map of a working day, one clean teal appointment route card, several small burnt-orange annotation flags positioned beside the route, pencil and brass map pin
- World/materials: tactile cream survey paper, embossed contour lines, screen-printed ink, subtle paper grain
- Light/lens: soft north-window light, straight overhead editorial composition, gentle realistic shadows
- Palette words: warm parchment, forest ink, deep teal water, burnt-orange trail marker, aged brass
- Composition: useful calm negative space; no interface screenshot
- Negative list: no people, hands, brands, logos, readable text, letters, numbers, calendar grid, watermark, neon gradients, glossy 3D, clutter

Generated with the factory Azure image deployment (`/opt/fleet/lib/gen-image.sh`), 2026-08-28. The selected source and exact prompt live in `assets/src/hero-map.json`; responsive output is optimized to AVIF and WebP with a progressive JPEG fallback. Generated imagery is original for this product under the project’s MIT distribution.
