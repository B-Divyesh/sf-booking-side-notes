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

test('imports a booking and pins a nonblocking note end to end', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveCount(1);
  await page.locator('#ics-file').setInputFiles({ name: 'day.ics', mimeType: 'text/calendar', buffer: Buffer.from(ICS) });
  await expect(page.getByText('Boiler service', { exact: true })).toBeVisible();
  await expect(page.locator('.capacity-banner')).toContainText('minutes blocked');

  await page.getByRole('button', { name: /Add side note for Boiler service/ }).click();
  await page.locator('#note-text').fill('Call before arrival; use the side gate.');
  await page.locator('#note-reminder').check();
  await page.getByRole('button', { name: 'Save side note' }).click();

  await expect(page.locator('.note-body > p').filter({ hasText: 'Call before arrival; use the side gate.' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Reminder due' })).toBeVisible();
  await page.locator('.note-check').check();
  await expect(page.getByText('Done', { exact: true })).toBeVisible();
  await page.reload();
  await expect(page.locator('.note-body > p').filter({ hasText: 'Call before arrival; use the side gate.' })).toBeVisible();
});

test('has no serious or critical accessibility violations', async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
  await page.goto('/');
  await expect(page.locator('#app')).not.toBeEmpty();
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter((item) => ['serious', 'critical'].includes(item.impact ?? ''))).toEqual([]);
  expect(consoleErrors).toEqual([]);
});

test('works at 390px and remains available offline after first visit', async ({ page, context }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.waitForFunction(() => Boolean(navigator.serviceWorker?.controller), null, { timeout: 10_000 });
  await page.waitForFunction(async () => {
    const names = await caches.keys();
    if (!names.length) return false;
    const cache = await caches.open(names[0]);
    return Boolean(await cache.match('/'));
  });
  await context.setOffline(true);
  expect(await page.evaluate(async () => (await fetch('/')).ok)).toBe(true);
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Keep the note/ })).toBeVisible();
  await expect(page.getByText('Offline · on device')).toBeVisible();
  await page.getByRole('button', { name: '+ Add side note' }).click();
  await page.locator('#note-text').fill('Offline callback note');
  await page.getByRole('button', { name: 'Save side note' }).click();
  await expect(page.locator('.note-body > p').filter({ hasText: 'Offline callback note' })).toBeVisible();
});
