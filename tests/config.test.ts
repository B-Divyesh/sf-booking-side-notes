import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

describe('static deployment contract', () => {
  it('ships routing, security headers, immutable assets, and manifest MIME', async () => {
    const config = JSON.parse(await readFile('staticwebapp.config.json', 'utf8'));
    expect(config.navigationFallback).toMatchObject({ rewrite: '/index.html', exclude: ['/*'] });
    expect(config.responseOverrides['404']).toMatchObject({ rewrite: '/404.html', statusCode: 404 });
    expect(config.globalHeaders['Content-Security-Policy']).toContain("frame-ancestors 'none'");
    expect(config.globalHeaders['Permissions-Policy']).toContain('camera=()');
    expect(config.mimeTypes['.webmanifest']).toBe('application/manifest+json');
    expect(config.routes.find((route: { route: string }) => route.route === '/demo')).toMatchObject({ rewrite: '/index.html' });
    const assets = config.routes.find((route: { route: string }) => route.route === '/assets/*');
    const manifest = config.routes.find((route: { route: string }) => route.route === '/manifest.webmanifest');
    expect(assets.headers['Cache-Control']).toContain('immutable');
    expect(manifest.headers['Content-Type']).toBe('application/manifest+json');
  });

  it('lists every public route in the sitemap', async () => {
    const sitemap = await readFile('public/sitemap.xml', 'utf8');
    for (const route of ['/', '/demo', '/privacy/', '/terms/']) expect(sitemap).toContain(`booking-side-notes.sociobot.in${route}`);
  });

  it('ships complete metadata and shared footer content on every static route', async () => {
    for (const path of ['public/privacy/index.html', 'public/terms/index.html', 'public/404.html']) {
      const html = await readFile(path, 'utf8');
      for (const marker of ['property="og:type"', 'property="og:title"', 'property="og:description"', 'property="og:image"', 'name="twitter:card"', 'name="twitter:title"', 'name="twitter:description"', 'name="twitter:image"']) {
        expect(html, `${path} lacks ${marker}`).toContain(marker);
      }
      expect(html).toContain('Side notes beside appointments, on this device.');
      expect(html).toContain('href="/privacy/"');
      expect(html).toContain('href="/terms/"');
      expect(html).toContain('Built by Param Factory · build __BUILD_ID__');
    }
  });

  it('declares Node 20 support and maps every claim to exactly one browser test', async () => {
    const pkg = JSON.parse(await readFile('package.json', 'utf8'));
    expect(pkg.engines.node).toBe('>=20');
    const claims = JSON.parse(await readFile('.factory/claims.json', 'utf8')) as Array<{ id: string; test: string; sandbox: string }>;
    const browserTests = await readFile('tests/e2e/app.spec.ts', 'utf8');
    for (const claim of claims) {
      expect(claim.test).toContain(`@claim:${claim.id}`);
      expect(browserTests.match(new RegExp(`@claim:${claim.id}`, 'g'))).toHaveLength(1);
      expect(claim.sandbox).toMatch(/\?demo=1/);
    }
  });
});
