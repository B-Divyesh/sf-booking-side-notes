import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const ICS = `BEGIN:VCALENDAR\r
VERSION:2.0\r
BEGIN:VEVENT\r
UID:job-42\r
DTSTART:20260828T090000Z\r
DTEND:20260828T100000Z\r
SUMMARY:Boiler service\r
LOCATION:14 Market Lane\r
END:VEVENT\r
END:VCALENDAR`;
const FIRST_DAY = `BEGIN:VCALENDAR\r
VERSION:2.0\r
BEGIN:VEVENT\r
UID:kept\r
DTSTART:20260828T090000Z\r
SUMMARY:Kept appointment\r
END:VEVENT\r
BEGIN:VEVENT\r
UID:cancelled\r
DTSTART:20260828T100000Z\r
SUMMARY:Cancelled appointment\r
END:VEVENT\r
END:VCALENDAR`;
const SECOND_DAY = `BEGIN:VCALENDAR\r
VERSION:2.0\r
BEGIN:VEVENT\r
UID:kept\r
DTSTART:20260828T090000Z\r
SUMMARY:Kept appointment\r
END:VEVENT\r
END:VCALENDAR`;

async function goDemo(page: import('@playwright/test').Page) {
  await page.goto('/demo');
  await expect(page.getByText('Demo — sample data, nothing is saved')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Harbour House boiler visit' })).toBeVisible();
}

test('@claim:demo-isolated demo starts with sample data, resets it, and never reads real data', async ({ page }) => {
  await page.goto('/');
  await page.locator('#add-note').click();
  await page.locator('#note-text').fill('REAL CUSTOMER NOTE');
  await page.getByRole('button', { name: 'Save side note' }).click();
  await expect(page.locator('.note-body > p').filter({ hasText: 'REAL CUSTOMER NOTE' })).toBeVisible();
  await goDemo(page);
  await expect(page.getByText('REAL CUSTOMER NOTE')).toHaveCount(0);
  await page.locator('#add-note').click();
  await page.locator('#note-text').fill('DEMO ONLY NOTE');
  await page.getByRole('button', { name: 'Save side note' }).click();
  await expect(page.locator('.note-body > p').filter({ hasText: 'DEMO ONLY NOTE' })).toBeVisible();
  await page.getByRole('button', { name: 'Reset demo' }).click();
  await expect(page.getByText('DEMO ONLY NOTE')).toHaveCount(0);
  await page.getByRole('button', { name: 'Start for real' }).click();
  await expect(page.locator('.note-body > p').filter({ hasText: 'REAL CUSTOMER NOTE' })).toBeVisible();
});

test('@claim:local-no-upload demo actions request only this site', async ({ page }) => {
  const origins = new Set<string>();
  page.on('request', (request) => origins.add(new URL(request.url()).origin));
  await goDemo(page);
  await page.locator('#add-note').click();
  await page.locator('#note-text').fill('Call before arrival.');
  await page.getByRole('button', { name: 'Save side note' }).click();
  await page.getByRole('button', { name: 'Export backup' }).click();
  expect([...origins]).toEqual(['http://127.0.0.1:4173']);
});

test('@claim:calendar-unchanged adding a side note keeps appointments and blocked minutes unchanged', async ({ page }) => {
  await goDemo(page);
  const count = await page.locator('.appointment').count();
  await page.locator('#add-note').click();
  await page.locator('#note-text').fill('Check the meter photo.');
  await page.getByRole('button', { name: 'Save side note' }).click();
  await expect(page.locator('.appointment')).toHaveCount(count);
  await expect(page.locator('.capacity-banner')).toContainText('0');
  await expect(page.locator('.capacity-banner')).toContainText('minutes blocked');
});

test('@claim:offline-after-first-visit demo reloads and saves notes offline', async ({ page, context }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await goDemo(page);
  await page.waitForFunction(() => Boolean(navigator.serviceWorker?.controller), null, { timeout: 10_000 });
  await page.waitForFunction(async () => {
    const names = await caches.keys();
    const required = ['/demo', ...[...document.querySelectorAll<HTMLScriptElement | HTMLLinkElement>('script[src],link[rel="stylesheet"]')].map((item) => new URL(item instanceof HTMLScriptElement ? item.src : item.href).pathname)];
    return (await Promise.all(names.map(async (name) => {
      const cache = await caches.open(name);
      return (await Promise.all(required.map((path) => cache.match(path)))).every(Boolean);
    }))).some(Boolean);
  });
  await context.setOffline(true);
  await page.goto('/demo');
  await expect(page.getByText('Demo — sample data, nothing is saved')).toBeVisible();
  await expect(page.getByText('Offline · on device')).toBeVisible();
  await page.locator('#add-note').click();
  await page.locator('#note-text').fill('Offline callback note');
  await page.getByRole('button', { name: 'Save side note' }).click();
  await expect(page.locator('.note-body > p').filter({ hasText: 'Offline callback note' })).toBeVisible();
});

test('@claim:backup-export exports the complete demo archive without a purchase', async ({ page }) => {
  await goDemo(page);
  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export backup' }).click();
  const file = await download;
  expect(file.suggestedFilename()).toMatch(/^booking-side-notes-backup-.*\.json$/);
  const saved = await file.path();
  expect(saved).not.toBeNull();
  const archive = JSON.parse(await (await import('node:fs/promises')).readFile(saved!, 'utf8'));
  expect(archive.events).toHaveLength(3);
  expect(archive.notes).toHaveLength(3);
});

test('@claim:no-purchase-required creates, completes, prints, and exports from a clean demo', async ({ page }) => {
  await goDemo(page);
  await expect(page.getByText(/Trail Kit|Buy Trail Kit/)).toHaveCount(0);
  await page.locator('#add-note').click();
  await page.locator('#note-text').fill('Free workflow note');
  await page.getByRole('button', { name: 'Save side note' }).click();
  await page.locator('.note-check').last().check();
  await expect(page.getByText('Done', { exact: true }).last()).toBeVisible();
  const brief = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export daily brief' }).click();
  expect((await brief).suggestedFilename()).toMatch(/\.txt$/);
});

test('@claim:import-reconciliation replaces missing appointments and preserves their notes as unlinked', async ({ page }) => {
  await page.goto('/');
  await page.locator('#ics-file').setInputFiles({ name: 'first.ics', mimeType: 'text/calendar', buffer: Buffer.from(FIRST_DAY) });
  await page.getByRole('button', { name: /Add side note for Cancelled appointment/ }).click();
  await page.locator('#note-text').fill('Keep this even if cancelled.');
  await page.getByRole('button', { name: 'Save side note' }).click();
  page.once('dialog', (dialog) => dialog.accept());
  await page.locator('#ics-file').setInputFiles({ name: 'second.ics', mimeType: 'text/calendar', buffer: Buffer.from(SECOND_DAY) });
  await expect(page.getByText('Cancelled appointment', { exact: true })).toHaveCount(0);
  await expect(page.locator('.note-body > p').filter({ hasText: 'Keep this even if cancelled.' })).toBeVisible();
  await expect(page.getByText('Unlinked side note')).toBeVisible();
});

test('@claim:daily-brief exposes the complete demo day for printing and download', async ({ page }) => {
  await goDemo(page);
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('.print-brief')).toContainText('Harbour House boiler visit');
  await expect(page.locator('.print-brief')).toContainText('0 minutes blocked by notes');
  await page.emulateMedia({ media: 'screen' });
  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export daily brief' }).click();
  const saved = await (await download).path();
  expect(await (await import('node:fs/promises')).readFile(saved!, 'utf8')).toContain('Riverside Salon access check');
});

test('@claim:backup-restore cancels safely and replaces only after confirmation', async ({ page }) => {
  await goDemo(page);
  const replacement = JSON.stringify({ version: 1, events: [{ id: 'restored', summary: 'Restored appointment', start: '2026-08-28T16:00:00.000Z' }], notes: [] });
  page.once('dialog', (dialog) => dialog.dismiss());
  await page.locator('#json-file').setInputFiles({ name: 'backup.json', mimeType: 'application/json', buffer: Buffer.from(replacement) });
  await expect(page.getByRole('heading', { name: 'Harbour House boiler visit' })).toBeVisible();
  page.once('dialog', (dialog) => dialog.accept());
  await page.locator('#json-file').setInputFiles({ name: 'backup.json', mimeType: 'application/json', buffer: Buffer.from(replacement) });
  await expect(page.getByRole('heading', { name: 'Restored appointment' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Harbour House boiler visit' })).toHaveCount(0);
});

test('@claim:minimal-calendar-fields discards unrelated calendar fields from the archive', async ({ page }) => {
  await goDemo(page);
  const privateIcs = `BEGIN:VCALENDAR\r\nBEGIN:VEVENT\r\nUID:private-customer-17\r\nDTSTART:20260829T090000Z\r\nDTEND:20260829T100000Z\r\nSUMMARY:Private customer visit\r\nLOCATION:14 Market Lane\r\nDESCRIPTION:Secret description\r\nATTENDEE:mailto:customer@example.test\r\nEND:VEVENT\r\nEND:VCALENDAR`;
  await page.locator('#day-picker').fill('2026-08-29');
  await page.locator('#ics-file').setInputFiles({ name: 'private.ics', mimeType: 'text/calendar', buffer: Buffer.from(privateIcs) });
  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export backup' }).click();
  const saved = await (await download).path();
  const archive = JSON.parse(await (await import('node:fs/promises')).readFile(saved!, 'utf8'));
  const event = archive.events.find((item: { id: string }) => item.id === 'private-customer-17');
  expect(Object.keys(event).sort()).toEqual(['end', 'id', 'location', 'start', 'summary']);
  expect(JSON.stringify(event)).not.toContain('Secret description');
  expect(JSON.stringify(event)).not.toContain('customer@example.test');
});

test('@claim:no-notifications leaves browser notification permission and push subscriptions untouched', async ({ page }) => {
  await goDemo(page);
  const before = await page.evaluate(() => ({ permission: typeof Notification === 'undefined' ? 'unsupported' : Notification.permission }));
  await page.locator('#add-note').click();
  await page.locator('#note-text').fill('Reminder status only.');
  await page.locator('#note-reminder').check();
  await page.getByRole('button', { name: 'Save side note' }).click();
  const after = await page.evaluate(async () => ({ permission: typeof Notification === 'undefined' ? 'unsupported' : Notification.permission, subscription: await navigator.serviceWorker.ready.then((registration) => registration.pushManager.getSubscription()) }));
  expect(after.permission).toBe(before.permission);
  expect(after.subscription).toBeNull();
});

test('has correct routes, titles, focus, 390px layout, and no serious axe findings', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page).toHaveTitle(/side notes beside appointments/i);
  await expect(page.locator('h1')).toHaveCount(1);
  await page.getByRole('link', { name: 'Try demo' }).click();
  await expect(page).toHaveURL(/\/demo$/);
  await expect(page).toHaveTitle('Demo — Booking Side Notes');
  await expect(page.locator('#page-title')).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter((item) => ['serious', 'critical'].includes(item.impact ?? ''))).toEqual([]);
  expect(errors).toEqual([]);
});

test('handles malformed backups with recovery guidance and renders a real not-found route', async ({ page }) => {
  await page.goto('/');
  await page.locator('#json-file').setInputFiles({ name: 'broken.json', mimeType: 'application/json', buffer: Buffer.from('{not valid') });
  await expect(page.getByText('This backup is not valid JSON. Choose a Booking Side Notes backup exported by this app.')).toBeVisible();
  await page.goto('/not-a-real-route');
  await expect(page).toHaveTitle('Page not found — Booking Side Notes');
  await expect(page.getByRole('heading', { name: 'This page was not found' })).toBeVisible();
});
