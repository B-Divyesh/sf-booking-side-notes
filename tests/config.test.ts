import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

describe('static deployment contract', () => {
  it('ships routing, security headers, immutable assets, and manifest MIME', async () => {
    const config = JSON.parse(await readFile('staticwebapp.config.json', 'utf8'));
    expect(config.navigationFallback.rewrite).toBe('/index.html');
    expect(config.responseOverrides['404']).toMatchObject({ rewrite: '/404.html', statusCode: 404 });
    expect(config.globalHeaders['Content-Security-Policy']).toContain("frame-ancestors 'none'");
    expect(config.globalHeaders['Permissions-Policy']).toContain('camera=()');
    expect(config.mimeTypes['.webmanifest']).toBe('application/manifest+json');
    const assets = config.routes.find((route: { route: string }) => route.route === '/assets/*');
    const manifest = config.routes.find((route: { route: string }) => route.route === '/manifest.webmanifest');
    expect(assets.headers['Cache-Control']).toContain('immutable');
    expect(manifest.headers['Content-Type']).toBe('application/manifest+json');
  });

  it('lists every public route in the sitemap', async () => {
    const sitemap = await readFile('public/sitemap.xml', 'utf8');
    for (const route of ['/', '/demo', '/privacy/', '/terms/']) expect(sitemap).toContain(`booking-side-notes.sociobot.in${route}`);
  });
});
